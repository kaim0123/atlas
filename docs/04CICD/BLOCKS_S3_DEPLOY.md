# Atlas を AWS Blocks で S3 に静的デプロイする手順

最終更新: 2026-07-10

**位置づけ**: [`STATIC_DEPLOY_PLAN.md`](../00devflow/STATIC_DEPLOY_PLAN.md)でAtlasは静的Export(`output: "export"`)化が決まり、ファイルアップロード機能は別アプリ検討としてスコープ外化された。これに伴いDB・認証(ログイン)機能も不要になったため、[`CLOUD_DEPLOYMENT_DESIGN.md`](./CLOUD_DEPLOYMENT_DESIGN.md)(SSR + 認証 + DB前提の旧v0.2設計)はAtlas本体の展開先としては採用しない。本書は「今のAtlas(静的サイト)を最安構成でS3にデプロイし、継続運用する」ための実務手順。

## 0. 前提

- `next.config.ts`に`output: "export"`, `trailingSlash: true`設定済み。`npm run build`で`out/`配下に静的HTML/CSS/JS + Pagefindインデックスが出力される
- API Route・middleware・Server Actions等の動的機能なし
- DB・認証・ファイルアップロード機能は使わない(必要なくなった)
- コスト方針: 個人の解説サイト・低トラフィック想定で、極力安く。ただし運用に最低限必要な監視・ロールバック手段は削らない

## 1. スタック構成

デプロイ基盤を3つの論理スタックに分けて考える(AWS Blocksが内部でCDKスタックとして生成するか、GitHub Actions等で代替するかは§5で判断)。

| スタック | 役割 | 主なリソース |
|---|---|---|
| **HostingStack** | 静的ファイルの配信 | S3(非公開)、CloudFront、OAC、CloudFront Function、(独自ドメイン時)ACM証明書 |
| **PipelineStack** | ビルド・デプロイの自動化 | GitHub Actions(推奨)またはCodePipeline+CodeBuild、OIDC用IAMロール |
| **MonitoringStack** | 運用監視・コスト管理 | CloudWatch Alarm、(任意)Synthetics Canary、AWS Budgets、SNS Topic |

### 1.1 HostingStack

```
ブラウザ
  │ HTTPS
  ▼
CloudFront (Always Free tier: 1TB/月データ転送 + 1,000万リクエスト/月が恒久無料)
  │ OAC (Origin Access Control) 経由のみアクセス許可
  │ CloudFront Function: URI末尾が "/" なら "index.html" を付加(下記参照)
  │ カスタムエラーレスポンス: 403 → /404.html (404で返す)
  ▼
S3 (非公開バケット, out/ の静的ファイルのみ、バージョニング有効)
```

**インデックス解決に関する注意**: OACはS3の「REST APIオリジン」に対してのみ有効で、S3の「静的website hosting機能(ウェブサイトエンドポイント)」とは併用できない。一方、Next.jsは`trailingSlash: true`により`/foo/`のようなディレクトリ形式のURLで`out/foo/index.html`を生成するため、REST APIオリジンのままだと`/foo/`へのリクエストがS3上のオブジェクトに解決されない。そのため、**CloudFront Function(またはLambda@Edge)でリクエストURIの末尾が`/`の場合に`index.html`を付加するリライトを挟む**(無料枠: 200万リクエスト/月、以降$0.10/100万リクエスト。個人サイトの規模ではほぼ$0で収まる)。

**404ページ**: S3非公開バケット+OAC構成では、存在しないオブジェクトへのアクセスはS3が403を返す(404ではない)。CloudFrontのカスタムエラーレスポンスで403を404.html(Next.jsの静的Exportが生成)にマッピングし、HTTPステータスも404として返すよう設定する。

**キャッシュ戦略**: `_next/static/`配下はファイル名にハッシュが含まれるためCache-Control: `public, max-age=31536000, immutable`で長期キャッシュ。HTMLファイルは`no-cache`または短いmax-ageにし、デプロイの都度CloudFrontのキャッシュを無効化(invalidation)して反映させる。

### 1.2 PipelineStack

CI/CDは**GitHub Actionsで完結させ、CodePipelineは使わない**ことを推奨する。理由: CodePipelineは稼働中のパイプライン1本あたり約$1/月の固定費が発生するのに対し、GitHub Actions単体(AWS側はOIDCロールのみ)はAWS側の固定費がゼロ。AWS Blocksのデプロイコマンドが内部でCodePipeline/CodeBuildを自動生成する可能性があるため、**§3 Step 3の検証で「PipelineStack相当のリソースが生成されていないか」を必ず確認**し、生成される場合はGitHub Actionsからの直接デプロイ(`aws s3 sync` + `aws cloudfront create-invalidation`)に切り替える。

GitHub Actionsワークフローの内容:

1. `npm run build`(Next.js build + Pagefindインデックス生成)
2. `aws s3 sync out/ s3://<bucket> --delete`(パスパターンごとに`--cache-control`を出し分け)
3. `aws cloudfront create-invalidation --distribution-id <id> --paths "/*"`(月1,000パスまで無料、`/*`は1パス扱いなので無料枠内)
4. デプロイ直後にCloudFrontのURLへ`curl`し、200が返ることを確認するスモークテスト(失敗時はワークフローを失敗させ、壊れたデプロイに気づけるようにする)

認証はGitHub Secretsへの長期アクセスキー保存ではなく、**OIDC連携によるAssumeRole**を使う(IAMロールはS3の当該バケットとCloudFrontの当該ディストリビューションのみに権限を絞る)。

### 1.3 MonitoringStack

| 項目 | 内容 | コスト目安 |
|---|---|---|
| CloudFrontエラー率アラーム | 標準メトリクス(5分粒度、無料)の`4xxErrorRate`/`5xxErrorRate`にCloudWatch Alarmを設定し、SNS経由でメール通知 | $0(標準メトリクスは無料、SNSメール通知も低頻度なら無料枠内) |
| デプロイ直後のスモークテスト | §1.2のGitHub Actions内`curl`チェック。悪いデプロイをその場で検知する一次防衛線 | $0 |
| (任意)死活監視 | CloudWatch Synthetics Canaryで15〜60分間隔にサイトへHTTPリクエストし、失敗時にアラーム。常時稼働の死活監視が欲しい場合のみ | 1回あたり約$0.0012。1時間間隔(約730回/月)で無料枠(100回/月)差し引き後 月$0.5〜1程度 |
| (任意・独自ドメイン時)Route53ヘルスチェック | Canaryより簡易なHTTPステータス監視。独自ドメインを使う場合の代替 | $0.5/月 |
| コストガードレール | AWS Budgetsで低めの閾値(例: 月$1〜3)にアラーム設定 | $0(Budgetsアラーム自体は無料) |

継続的な死活監視(Canary/Route53ヘルスチェック)は小さいながら毎月固定費が発生するため、「最安構成」を優先するなら**まずはCloudFrontエラー率アラーム+デプロイ時スモークテストのみで運用し、実際に見えない障害(CloudFront/S3側の障害でエラー率アラームが発火しないケース等)が気になった時点でCanaryを追加する**、という段階導入を推奨する。

## 2. ACM証明書について

- **独自ドメインを使わない場合(`*.cloudfront.net`のデフォルトドメインで運用)**: ACM証明書は不要。CloudFrontのデフォルト証明書で無料・自動的にHTTPS化される
- **独自ドメインを使う場合**: ACM証明書が必須。CloudFrontにアタッチする証明書は**`us-east-1`リージョンで発行したものである必要がある**(CloudFrontの制約。他のAWSサービスと違いリージョン固定)。DNS検証で発行する場合、Route53にホストゾーンがあれば検証用CNAMEレコードの追加も自動化しやすい
- 証明書自体の発行・更新(自動更新込み)はACMの無料機能であり、追加課金は発生しない。コストが発生するのはRoute53のホストゾーン($0.5/月)とドメイン登録費のみ

現時点で独自ドメインを使うかが未定であれば、最初はデフォルトドメインでACMなしにデプロイし、必要になった段階で§3 Step 5(独自ドメイン設定)を追加すれば良い。

## 3. デプロイ手順

### Step 0: ビルド確認

```bash
npm run build   # next build + Pagefindインデックス生成 → out/ に静的ファイル一式
```

### Step 1: AWS Blocksプロジェクトの初期化

- Blocksをリポジトリに導入する
- 使用機能をhostingのみに絞る(auth / database / file-upload / background-jobs / realtime / ai-agentは有効化しない)

### Step 2: hosting設定を静的Export出力に接続

- Blocksのhosting設定で公開対象ディレクトリを`out/`に指定する
- Next.js SSRモード(Lambda生成)ではなく、静的ファイル配信モードとして扱われるよう設定する
- URIリライト(末尾`/`→`index.html`)とカスタムエラーレスポンス(403→404.html)がBlocksの標準設定で表現できるか確認する。表現できない場合はBlocksのCDKエスケープハッチでCloudFront Function/カスタムエラーレスポンスを追加する

### Step 3: デプロイ前検証(重要)

デプロイ前に生成されるCDKスタック相当の内容(`cdk diff`等)を確認し、以下を満たすか検証する。

- [ ] HostingStack相当がS3 + CloudFrontのみで構成されている(Lambda・Cognito・RDS/Aurora等の不要なリソースが含まれていない)
- [ ] S3バケットが非公開設定(OAC経由のみアクセス可)になっている
- [ ] S3バケットのバージョニングが有効になっている(ロールバック用)
- [ ] PipelineStack相当(CodePipeline/CodeBuild)が意図せず生成されていないか(生成される場合は月額固定費が発生するため、§1.2の通りGitHub Actionsへの切り替えを検討)
- [ ] 独自ドメインを使う場合、ACM証明書が`us-east-1`で発行されているか

意図しないリソース(Lambda常時稼働、DB、CodePipeline等)が含まれる場合は、Blocksのhosting機能を使わずCDK/Terraformで直接HostingStackを構築する代替案に切り替える。

### Step 4: デプロイ実行

- `npm run build`実行後、Blocksのデプロイコマンド(またはGitHub Actionsからの直接デプロイ)を実行
- S3へのアップロードとCloudFrontディストリビューションの作成/更新が行われる
- 初回デプロイ後、CloudFrontのデフォルトドメイン(`https://xxxx.cloudfront.net`)でアクセス確認する。トップページだけでなく、ネストしたページ(`/foo/`)と存在しないパス(404確認)も確認する

### Step 5(任意): 独自ドメイン設定

- Route53でホストゾーンを作成し、ドメインのネームサーバーを向ける
- ACM証明書を`us-east-1`リージョンで発行する(§2参照)
- CloudFrontのAlternate Domain Name(CNAME)に設定し、Route53のAレコード(Alias)をCloudFrontに向ける

### Step 6: CI/CD(PipelineStack, GitHub Actions)

§1.2の内容をワークフローとして実装する。`main`ブランチへのpush時にビルド・同期・キャッシュ無効化・スモークテストまでを自動実行する。

### Step 7: 監視設定(MonitoringStack)

§1.3の内容を設定する。最低限、CloudFrontエラー率アラーム(SNS通知)とAWS Budgetsのコストアラームは初回デプロイ時に必ず設定する。

## 4. 運用チェックリスト

- [ ] ロールバック手段: S3バージョニングを有効化し、悪いデプロイ時に前バージョンへ戻せるようにする(または直前のビルド成果物を保持し再デプロイする運用でも可)
- [ ] セキュリティヘッダー: CloudFrontのResponse Headers Policy(マネージドポリシーで可)でHSTS等の基本的なセキュリティヘッダーを付与する
- [ ] アクセスログ: 障害調査用にCloudFrontアクセスログのS3出力を有効化するか検討する(個人サイト規模ではストレージコストは軽微だが、常時オンにするかは任意)
- [ ] コストの定点観測: デプロイ後1ヶ月程度は実際の請求額をCost Explorerで確認し、想定(§1.3のコスト目安)と乖離がないか見る

## 5. AWS Blocksの利用方針

AWS Blocksはauth・database・file-upload・background-jobs・realtime・AIエージェント等を含むフルスタックフレームワークだが、Atlasは静的ファイル配信(hosting)しか必要ない。**hosting機能だけを使い、他の機能はコードから一切参照しない**(参照しなければ該当リソースは生成されない想定)。

一方で、CloudFront Functionによるインデックス解決やカスタムエラーレスポンス、PipelineStackをGitHub Actionsに寄せる判断など、今回必要な設定は「DB/認証込みのフルスタックアプリのホスティング」というBlocksの主眼からするとやや細かいCDN設定に踏み込む。Blocksの高レベル設定で表現しきれない場合は§0のCDKエスケープハッチに降りることを前提にする。

> Blocksはプレビュー段階のフレームワークで、CLI/API名称は変更され得る。以下の手順は現時点の想定フローであり、着手時に公式ドキュメントで最新のコマンド・設定項目を確認すること。

## 6. 未決事項・要検証

- AWS Blocksが`output: "export"`の静的サイトを純粋な静的配信(SSR用Lambdaを生成しない)としてサポートしているか(§3 Step 3で確認)
- AWS Blocksのデプロイコマンドが内部でCodePipeline/CodeBuildを自動生成するか、GitHub Actionsのみで完結できるか(§1.2、§3 Step 3で確認)
- BlocksのCloudFront設定でCloudFront Function/カスタムエラーレスポンスをどこまで宣言的に扱えるか(§3 Step 2)
- Blocksの正式なCLI/設定項目名は執筆時点のプレビュー版を前提にした想定であり、実装着手時に公式ドキュメントで再確認が必要
- 独自ドメインを使うかどうか(未定なら§3 Step 5・§2の独自ドメイン分岐はスキップ可)
- 継続的な死活監視(Canary/Route53ヘルスチェック)を最初から導入するか、§1.3の通り段階導入にするか

## 7. 関連ドキュメント

- [`STATIC_DEPLOY_PLAN.md`](../00devflow/STATIC_DEPLOY_PLAN.md): 静的Export化・Pagefind導入の経緯、デプロイ先未決事項
- [`CLOUD_DEPLOYMENT_DESIGN.md`](./CLOUD_DEPLOYMENT_DESIGN.md): SSR + 認証 + DB前提の旧設計(ファイルアップロード機能スコープ外化により現状は不採用。アップロードアプリを別途着手する際の参考として残置)
