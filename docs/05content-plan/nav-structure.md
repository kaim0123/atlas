# 現行ナビゲーション構造(スナップショット)

最終更新: 2026-07-12

**位置づけ**: [`src/lib/nav.ts`](../../src/lib/nav.ts)の`sections`定義から、現時点のナビゲーション(サイドバー)ツリーをそのまま書き出したもの。全体的なディレクトリ再考の土台とするための現状把握用。パスは各ページの`href`、見出しレベルはツリーの階層に対応する。`href`を持たない項目(グルーピング用の見出し)は「📁」で示す。

> **⚠️ この§1のスナップショットは再考前(14セクション)の状態**。下記「ディレクトリ再考の提案」は **2026-07-12 に実行済み**で、現行は **17セクション**。実行後の最終構成は末尾「実行結果」を参照。`nav.ts`の最新が常に正となる。

セクション数(再考前): **14**

---

## 1. 情報科学 `/theory`(icon: Sigma)

- 数と基数変換 `/theory/numbers`
  - 浮動小数点と演算精度 `/theory/numbers/floating`
- 論理と真理値表 `/theory/logic`
- 確率・統計と情報理論 `/theory/probability`
  - 推定と仮説検定 `/theory/probability/inference`
- 文字コード `/theory/encoding`
- アルゴリズムとデータ構造 `/theory/algorithms`
  - グラフと最短経路 `/theory/algorithms/graphs`
- 形式言語 `/theory/formal`

## 2. コンピュータ `/computer`(icon: Cpu)

- コンピュータの歴史 `/computer/history`
- PCハードウェアの基礎 `/computer/basics`
- 📁 半導体
  - 半導体の全体像 `/computer/semiconductor`
  - トランジスタの正体 `/computer/semiconductor/transistor`
  - 直列と並列で論理をつくる `/computer/semiconductor/logic`
  - 足し算をつくる `/computer/semiconductor/adder`
- 📁 CPU
  - CPUと命令実行 `/computer/cpu`
  - 性能と高速化 `/computer/cpu/performance`
- 📁 メモリ
  - メモリの仕組み `/computer/memory`
  - 仮想メモリとソフトウェアの肥大化 `/computer/memory/virtual`
  - 速さの壁 ― キャッシュ・帯域・HBM `/computer/memory/speed`
  - スタックと関数呼び出しの舞台裏 `/computer/memory/stack`
  - 記憶装置の歴史 `/computer/memory/history`
- 📁 入出力
  - バス `/computer/io/bus`
  - 入出力インタフェース `/computer/io/interface`
  - 入出力装置 `/computer/io/devices`
- 📁 OS
  - OSの仕組み `/computer/os`
  - カーネルの役割と設計 `/computer/os/kernel`
  - プロセスとスレッド `/computer/os/process`
  - 記憶管理と仮想記憶 `/computer/os/memory`
  - システムコール `/computer/os/syscall`
  - シェル `/computer/os/shell`
  - ファイルシステム `/computer/os/filesystem`
  - 📁 歴史と系譜
    - UNIXの歴史と哲学 `/computer/os/unix`
    - UNIX・BSD・Linuxの違い `/computer/os/posix`
    - GNUとフリーソフトウェア `/computer/os/gnu`
    - Linuxの歴史 `/computer/os/linux`
- 📁 システム構成
  - 処理形態とシステム構成 `/computer/system/architecture`
  - 信頼性と冗長化 `/computer/system/reliability`
  - 性能と経済性の評価 `/computer/system/metrics`
- クライアント管理の実務 `/computer/client`
- プリンターの仕組み `/computer/printer`

## 3. ネットワーク `/network`(icon: Network)

- ネットワークの全体像 `/network/basics`
- 階層モデル `/network/layers`
- トポロジと接続装置 `/network/topology`
- IPアドレスと経路 `/network/ip`
- トランスポート層 `/network/transport`
- 📁 データリンク層と物理層
  - データリンク層と物理層 `/network/link`
  - 無線LAN(Wi-Fi) `/network/link/wireless`
- アプリケーション層 `/network/applications`

## 4. インターネット `/internet`(icon: Globe)

- インターネットの歴史 `/internet/history`
- DNS `/internet/dns`
- Webの仕組み `/internet/web`
- メールの仕組み `/internet/mail`
- ISP接続とCDN `/internet/isp`
- サーバーの全体像 `/internet/server`
  - サーバー構築の実務 `/internet/server/build`

## 5. データベース `/database`(icon: Database)

- 役割と種類 `/database/basics`
- 関係モデルと3層スキーマ `/database/model`
- ER図と正規化 `/database/design`
- SQLとデータ操作 `/database/sql`
- トランザクションと整合性 `/database/transaction`
- 索引とアクセス制御 `/database/advanced/index`

## 6. 開発技術 `/sdlc`(icon: Workflow)

- 開発の全体像 `/sdlc/overview`
- 開発プロセスと手法 `/sdlc/process`
  - スクラムとアジャイル実践 `/sdlc/process/agile`
- 要件定義 `/sdlc/requirements`
  - 要件の表現方法 `/sdlc/requirements/modeling`
- 📁 設計
  - 設計の全体像 `/sdlc/design/basics`
  - 構造化設計 `/sdlc/design/structured`
  - データ中心設計 `/sdlc/design/data-centered`
  - オブジェクト指向設計 `/sdlc/design/object`
  - システム構成とアーキテクチャ `/sdlc/design/architecture`
- 実装 `/sdlc/implementation`
- 📁 テスト
  - テストの段階 `/sdlc/testing/levels`
  - テスト技法 `/sdlc/testing/techniques`
- レビューと品質確認 `/sdlc/review`
- 導入と受入れ `/sdlc/deployment`
- 保守 `/sdlc/maintenance`
- 📁 開発管理
  - 構成管理 `/sdlc/management/config`
  - 変更管理 `/sdlc/management/change`
  - 知的財産とライセンス `/sdlc/management/ip`
- プロセス成熟度(発展) `/sdlc/process/advanced`

## 7. 開発 `/dev`(icon: Code2)

- 開発環境 `/dev/workspace`
- 環境の全体像 `/dev/environments`
- プログラミング言語の仕組み `/dev/language-basics`
  - プログラミング言語の歴史 `/dev/language-basics/history`
- JavaScript・TypeScript `/dev/language`
- Web基礎 `/dev/web-basics`
- ランタイム `/dev/runtime`
- パッケージ管理とビルド `/dev/tooling`
- 📁 フレームワーク・ライブラリ
  - フレームワーク・ライブラリ概要 `/dev/framework`
  - 📁 React
    - React概要 `/dev/framework/react`
    - ロジックを再利用する `/dev/framework/react/logic-reuse`
    - コンポーネントを組み合わせる `/dev/framework/react/composition`
    - フォームの値を管理する `/dev/framework/react/forms`
  - 📁 Next.js
    - Next.js概要 `/dev/framework/nextjs`
    - Server/Clientコンポーネントの境界 `/dev/framework/nextjs/components`
    - データフェッチ・キャッシュ・再検証 `/dev/framework/nextjs/data`
    - 配信を最適化する `/dev/framework/nextjs/rendering`
  - Tailwind CSS `/dev/framework/tailwind`
- 📁 データベース(追補)
  - データベース(開発者向け) `/dev/database`
  - 物理設計と運用 `/dev/database/physical`
  - データベースの歴史 `/dev/database/history`
- キャッシュの全体像 `/dev/cache`

## 8. 設計 `/design`(icon: Shapes)

- 📁 パラダイム
  - パラダイム一覧 `/design/paradigm`
  - 手続き型 `/design/paradigm/procedural`
  - 構造化 `/design/paradigm/structured`
  - 📁 オブジェクト指向
    - オブジェクト指向 `/design/paradigm/oop`
    - GoF: 生成を工夫する `/design/paradigm/oop/gof/creation`
    - GoF: 構造を包む・繋ぐ `/design/paradigm/oop/gof/structure`
    - GoF: 振る舞いをオブジェクト化する `/design/paradigm/oop/gof/algorithms`
    - GoF: 連携・通知・走査 `/design/paradigm/oop/gof/collaboration`
  - 📁 関数型
    - 関数型 `/design/paradigm/functional`
    - 純粋関数とイミュータビリティ `/design/paradigm/functional/foundations`
    - 関数を組み合わせる `/design/paradigm/functional/composition`
    - 引数を固定する `/design/paradigm/functional/currying`
    - 安全に分岐する `/design/paradigm/functional/safety`
- 📁 設計原則
  - 設計原則一覧 `/design/principles`
  - 黎明期の原則 `/design/principles/foundations`
  - 保守性の基本4原則 `/design/principles/cohesion`
  - SOLID `/design/principles/solid`
  - 現代の原則 `/design/principles/modern`
- 📁 設計思想・方法論
  - 設計思想・方法論一覧 `/design/methodology`
  - 情報隠蔽 `/design/methodology/info-hiding`
  - データ中心設計 `/design/methodology/data-centric`
  - オブジェクト中心設計 `/design/methodology/object-centric`
  - 契約による設計 `/design/methodology/contract`
  - 責務駆動設計 `/design/methodology/responsibility-driven`
  - ユースケース中心設計 `/design/methodology/use-case-driven`
  - 📁 ドメイン駆動設計
    - ドメイン駆動設計 `/design/methodology/ddd`
    - 戦術的DDDをコードに書く `/design/methodology/ddd/tactical`
- 📁 アーキテクチャ
  - アーキテクチャ一覧 `/design/architecture`
  - 📁 システム視点
    - レイヤードアーキテクチャ `/design/architecture/sys/layered`
    - パイプラインアーキテクチャ `/design/architecture/sys/pipeline`
    - マイクロカーネルアーキテクチャ `/design/architecture/sys/microkernel`
    - オーケストレーション駆動SOA `/design/architecture/sys/soa`
    - イベント駆動アーキテクチャ `/design/architecture/sys/event-driven`
    - スペースベースアーキテクチャ `/design/architecture/sys/space-based`
    - サービスベースアーキテクチャ `/design/architecture/sys/service-based`
    - マイクロサービスアーキテクチャ `/design/architecture/sys/microservices`
    - モジュラーモノリス `/design/architecture/sys/modular-monolith`
  - 📁 アプリケーション視点
    - レイヤー系 `/design/architecture/app/layered`
    - GUI系 `/design/architecture/app/gui`
    - Web系 `/design/architecture/app/web`
    - 📁 ドメインモデル系
      - ドメインモデル系 `/design/architecture/app/domain-model`
      - 業務ロジックの置き場所 `/design/architecture/app/domain-model/patterns`
    - 📁 データアクセス系
      - データアクセス系 `/design/architecture/app/data-access`
      - 永続化層の定石 `/design/architecture/app/data-access/patterns`
    - ドメイン中心アーキテクチャ系 `/design/architecture/app/domain-centric`
    - 高度な設計系 `/design/architecture/app/cqrs`
- 設計パターン(横断インデックス) `/design/patterns`
- 実装パターン・イディオム `/design/idioms`
- オブジェクトの全体像 `/design/object`
- 📁 コーディング規約・スタイル
  - コーディング規約・スタイル一覧 `/design/conventions`
  - 関数・イベントハンドラの命名 `/design/conventions/functions`
  - 変数・略語の命名 `/design/conventions/variables`
  - クラス・接尾辞の命名 `/design/conventions/classes`
  - ファイル・ディレクトリの命名 `/design/conventions/files`

## 9. テスト `/test`(icon: FlaskConical)

- 品質計画 `/test/quality-plan`
- 品質戦略とテストピラミッド `/test/strategy`
- テスト設計技法 `/test/design-techniques`
- Unitテスト `/test/unit`
- Integrationテスト `/test/integration`
- E2Eテスト `/test/e2e`
- Vitest・Playwright `/test/tools`
- テストパターン `/test/patterns`
- レビュー観点 `/test/review`
- コードレビュー `/test/code-review`

## 10. セキュリティ `/security`(icon: ShieldCheck)

- 情報セキュリティの目的と脅威 `/security/basics`
- 📁 攻撃手法
  - 攻撃手法の概観 `/security/attacks`
  - インジェクション攻撃 `/security/injection`
  - XSSと出力エスケープ `/security/xss`
  - SQLインジェクション対策 `/security/sqli`
  - CSRF対策 `/security/csrf`
- 📁 暗号技術
  - 暗号の歴史と公開鍵暗号 `/security/crypto`
  - ハッシュ関数と衝突攻撃 `/security/hash`
- 📁 認証・認可
  - 認証 `/security/auth`
  - 認可 `/security/authz`
  - セッションとCookie管理 `/security/session`
  - セッション・Cookieの全体像 `/security/session-cookie`
  - トークンの全体像 `/security/token`
  - 認証プロトコルの変遷 `/security/identity`
- リスクマネジメント `/security/management`
- 📁 セキュリティ対策・実装
  - セキュリティ対策の概観 `/security/countermeasures`
  - ネットワーク層の防御 `/security/network-defense`
  - セキュリティヘッダ `/security/headers`
  - キャッシュ制御 `/security/cache`
  - ログ出力設計 `/security/logging`

## 11. ユーザーインタフェース `/ui`(icon: AppWindow)

- UI・ユーザビリティ・アクセシビリティ `/ui/basics`
- GUIの部品 `/ui/gui`
- 画面設計と入力チェック `/ui/design`
- Web UIデザイン `/ui/web`
- 人間中心設計と評価 `/ui/hcd`

## 12. 情報メディア `/media`(icon: Palette)

- マルチメディアの全体像 `/media/basics`
- 音声フォーマット `/media/audio`
- 画像フォーマット `/media/image`
- 動画フォーマット `/media/video`
- 圧縮の考え方 `/media/compression`
- 色・解像度・グラフィックス応用 `/media/graphics`

## 13. インフラ `/infra`(icon: Server)

- 仮想化の仕組み `/infra/virtualization`
- 📁 コンテナ
  - コンテナの仕組み `/infra/container`
  - Docker `/infra/container/docker`
  - Kubernetes `/infra/container/kubernetes`
  - オブザーバビリティ `/infra/container/observability`
  - コンテナセキュリティ `/infra/container/security`
- ストレージの仕組み `/infra/storage`
- バックアップと復旧 `/infra/storage/backup`
- インフラの監視 `/infra/monitoring`
- インフラ障害の切り分け `/infra/incident`
- 📁 AWS
  - AWS概要 `/infra/aws`
  - AWSの基礎 `/infra/aws/basics`
  - 📁 コンピューティング
    - コンピューティング概要 `/infra/aws/compute`
    - Lambda `/infra/aws/compute/lambda`
  - 📁 ストレージ
    - ストレージ概要 `/infra/aws/storage`
    - S3 `/infra/aws/storage/s3`
  - 📁 ネットワーキングとコンテンツ配信
    - ネットワーキングとコンテンツ配信概要 `/infra/aws/network`
    - Route 53 `/infra/aws/network/route53`
    - CloudFront `/infra/aws/network/cloudfront`
    - ACM `/infra/aws/network/acm`
  - 📁 セキュリティ、アイデンティティ、コンプライアンス
    - セキュリティ、アイデンティティ、コンプライアンス概要 `/infra/aws/security`
    - Secrets Manager `/infra/aws/security/secrets-manager`
  - データベース `/infra/aws/database`
  - 📁 モニタリングと管理
    - モニタリングと管理概要 `/infra/aws/monitoring`
    - CloudWatch `/infra/aws/monitoring/cloudwatch`
  - コンテナ `/infra/aws/container`
  - 📁 CI/CD
    - CI/CD概要 `/infra/aws/cicd`
    - CodeBuild `/infra/aws/cicd/codebuild`
    - CodePipeline `/infra/aws/cicd/codepipeline`
  - 📁 アプリケーション統合
    - アプリケーション統合概要 `/infra/aws/integration`
    - SQS `/infra/aws/integration/sqs`
    - SNS `/infra/aws/integration/sns`
    - EventBridge `/infra/aws/integration/eventbridge`
  - IaC `/infra/aws/iac`

## 14. 運用 `/ops`(icon: Settings2)

- インフラとデプロイ `/ops/deploy`
- 監視・保守 `/ops/monitoring`
- パフォーマンス `/ops/performance`
- データ管理 `/ops/data`
- 分析・改善 `/ops/analytics`
- コンテンツ管理 `/ops/content`
- コスト管理 `/ops/cost`
- 法令・コンプライアンス `/ops/compliance`

---

## 再考にあたっての観点メモ

現行構造を俯瞰したときに、ディレクトリ再考の論点になりそうな重複・境界の曖昧さを列挙しておく(結論ではなく叩き台)。

- **設計の重複**: `/sdlc/design/*`(開発技術としての設計工程)と `/design/*`(設計パラダイム・原則・アーキテクチャの体系)が「設計」を二重に扱う。特に `/sdlc/design/architecture` と `/design/architecture/*`、`/sdlc/design/object` と `/design/paradigm/oop`。
- **テストの重複**: `/sdlc/testing/*`(開発工程としてのテスト)と `/test/*`(独立セクション)が並存。`/test/code-review`・`/test/review` と `/sdlc/review` も近い。
- **データベースの重複**: `/database/*`(独立セクション)と `/dev/database/*`(開発者向け追補)。
- **セキュリティの分散**: `/security/*`(アプリセキュリティ)、`/infra/aws/security`、`/infra/container/security`、`/security/network-defense` などレイヤーごとに散在。
- **監視の分散**: `/infra/monitoring`(インフラ監視)、`/ops/monitoring`(運用の監視・保守)、`/infra/container/observability`。
- **キャッシュの分散**: `/dev/cache`、`/security/cache`。
- **AWS の粒度**: `/infra/aws/*` だけで30ページ超あり、`infra` セクション内で突出。独立セクション化やクラウド総論の要否。
- **`/computer` の肥大**: 半導体〜OS〜システム構成まで単一セクションに集約されており、最大の階層深度を持つ。
- **開発技術 `/sdlc` の位置づけ**: 工程軸(要件→設計→実装→テスト→保守)で横断的にまとめており、他セクション(design/test/dev)と主題が重なる。「工程の地図」として残すか、各セクションへ吸収するか。

---

## ディレクトリ再考の提案

### 基本方針

`/sdlc`(開発技術)と `/dev`(開発)はいずれも「開発」を扱い、扱う範囲が広く肥大しがち。そこで両者を **軸で切り分け直す**:

- **`/sdlc`(工程・管理軸)** … 「開発をどう進める / 管理するか」。要件→設計→実装→テスト→保守→管理という**プロセスの地図**。
- **`/dev`(実装技術軸)** … 「実際に何でどう作るか」。言語・ランタイム・ツール・フレームワークという**具体技術**。

この2軸に沿って、**中身のある実体(設計・テスト・実装・DB)は既存の主題セクションへ吸収**し、`/sdlc` には工程・管理の骨格だけを残す。これにより設計・テストの二重が解消される。あわせて肥大トピック(OS・AWS)を昇格し、トップレベルを主題単位で並べ直す。

### 1. 開発技術×開発 — サブの昇格・再配置

| 現行 | 提案 | 理由 |
|---|---|---|
| `/sdlc/design/*` | **`/design` へ吸収**(主題セクション) | 設計の二重解消。工程としての設計も体系としての設計も1か所に |
| `/sdlc/testing/*` | **`/test` へ吸収**(主題セクション) | テストの二重解消。`/sdlc/review` の一部も `/test/review` と統合 |
| `/sdlc/implementation` | **`/dev`(実装技術軸)へ吸収** | 「実装」は具体技術セクションが本籍 |
| `/sdlc/requirements`(+modeling) | `/sdlc` に残す(工程の上流) | 要件の表現(UML等)は工程の一部。設計と密結合だが入口は工程側 |
| `/sdlc` 残り(overview / process / review / deployment / maintenance / management) | **`/sdlc` に残し「開発プロセス・管理」へリネーム** | ソフトウェア開発管理技術=工程・管理の骨格。`overview` が各主題セクションへのハブになる |
| `/dev/framework/*`(React/Next/Tailwind) | 当面 `/dev` 内に維持(**昇格候補**) | 今は主題1つ分。ページが増えたら「フロントエンド」主題として昇格 |
| `/dev/language-basics` `/language` `/runtime` `/tooling` `/workspace` `/environments` `/web-basics` | `/dev`(実装技術軸)の中核として維持 | ここが `/dev` の本体 |

**結果**: `/sdlc` は工程・管理だけの軽いセクションに、`/dev` は実装技術だけの軽いセクションになり、両者の「似ている」状態が解消。

### 2. データベース — おすすめ:主題セクションに一本化

`/dev/database/*`(物理設計と運用・データベースの歴史)を **`/database` に吸収**し、DBは1セクションに統一する。

- `/database/physical`(← `/dev/database/physical`)
- `/database/history`(← `/dev/database/history`)
- `/dev/database`(開発者向け概要)は `/database` 既存ページと重複するため統合・削除

理由: `/database` は既に basics/model/design/sql/transaction/advanced を持ち十分な主題セクション。開発者向けの深掘りも同じ本棚に「基礎→物理・運用」の深さのグラデーションとして並べるのが自然。

### 3. セキュリティ — 主題セクション維持(方針確定)

`/security` はメインのまま。分散している `/infra/container/security` `/infra/aws/security` `/security/network-defense` はそれぞれの文脈(コンテナ/AWS/ネットワーク層)に置いたまま、`/security` の多層防御ページから**相互リンクで束ねる**。物理移動はしない。

### 4. 監視 — おすすめ:主題セクションに集約(`/monitoring` 新設)

現在 `/infra/monitoring`・`/ops/monitoring`・`/infra/container/observability` に三分している。監視・オブザーバビリティは**レイヤー違いの同一トピック**なので、主題単位で1セクションに集約するのがおすすめ:

- **`/monitoring` を新設**し、メトリクス・ログ・トレース・アラート・オブザーバビリティを主本籍にする
- インフラ機器のヘルスチェック(`/infra/monitoring`)、コンテナ可観測性(`/infra/container/observability`)は集約 or 相互リンク
- 代替案(集約しない): 現状維持で「アプリ可観測性=ops」「機器監視=infra」と役割で線引きし相互リンクのみ。セクション数を増やしたくない場合はこちら

### 5. キャッシュ — おすすめ:昇格せず現状の本籍を明確化

キャッシュは横断概念(`/computer/memory/speed` CPU/メモリ、`/dev/cache` アプリ/CDN、`/security/cache` Cache-Controlの安全設計、`/internet/isp` CDN)。**主題セクションにするには小さすぎる**。

- 概念の本籍= **`/dev/cache`(キャッシュの全体像)** に集約
- `/security/cache` はセキュリティ文脈固有の扱いとして残し、`/dev/cache` へ相互リンク
- 昇格はしない

### 6. AWS — おすすめ:`/cloud` として主題昇格

`/infra/aws/*`(30ページ超・今後も増加)を **`/infra` から出して `/cloud` 主題セクションへ昇格**する。

- `/cloud/aws/*`(内部の compute/storage/network… 構成は維持)
- `/cloud` トップに将来 IaaS/PaaS/SaaS 総論・他クラウド比較を置く余地を作る
- `/infra` は仮想化・コンテナ・ストレージ・監視・障害対応という**オンプレ/基盤寄り**に絞られ、粒度の突出が解消

### 7. コンピュータの肥大 — おすすめ:OSを主題昇格し「ハードウェア」と分離

`/computer` は 半導体〜CPU〜メモリ〜入出力〜OS〜システム構成 が1セクションに集中(最深階層)。**OSを切り出す**のが最も効く:

- **`/os` を新設**(← `/computer/os/*`、11ページ:os/kernel/process/memory/syscall/shell/filesystem + UNIX/BSD/Linux史)。OSは独立した大主題
- `/computer` は 半導体・CPU・メモリ・入出力・システム構成・basics・history・client・printer = **ハードウェア主題**として残す(必要ならセクション名を「ハードウェア」に寄せる)
- これで「ハードウェア」と「OS」が対等な主題として並び、深さが平準化される

### 提案後のトップレベル構成(案・17セクション)

| # | セクション | 変更 | 主な由来 |
|---|---|---|---|
| 1 | 情報科学 `/theory` | 維持 | |
| 2 | コンピュータ(ハードウェア)`/computer` | 縮小 | OSを分離 |
| 3 | **OS `/os`** | 🆕昇格 | ← `/computer/os/*` |
| 4 | ネットワーク `/network` | 維持 | |
| 5 | インターネット `/internet` | 維持 | |
| 6 | データベース `/database` | 拡張 | ← `/dev/database/*` を吸収 |
| 7 | 開発(実装技術)`/dev` | 縮小・再定義 | ← `/sdlc/implementation` 吸収、DB除外 |
| 8 | 設計 `/design` | 拡張 | ← `/sdlc/design/*` を吸収 |
| 9 | テスト `/test` | 拡張 | ← `/sdlc/testing/*`・`/sdlc/review` を吸収 |
| 10 | 開発プロセス・管理 `/sdlc` | 縮小・リネーム | overview/process/requirements/deployment/maintenance/management |
| 11 | セキュリティ `/security` | 維持 | |
| 12 | UI `/ui` | 維持 | |
| 13 | 情報メディア `/media` | 維持 | |
| 14 | インフラ `/infra` | 縮小 | AWSを分離 |
| 15 | **クラウド `/cloud`** | 🆕昇格 | ← `/infra/aws/*` |
| 16 | **監視 `/monitoring`** | 🆕集約(任意) | ← `/infra/monitoring`・`/ops/monitoring`・`/infra/container/observability` |
| 17 | 運用 `/ops` | 縮小 | 監視を分離(集約案を採る場合) |

※ 16(監視集約)は「増やしたくなければ現状維持+相互リンク」の代替可。それ以外の昇格(OS・クラウド)と吸収(設計・テスト・DB)は推奨。

### 移行時の主な影響(実装メモ)

- `src/lib/nav.ts` の `sections` 再編、`src/app/**` のディレクトリ移動、全ページの `href` / `RelatedLink` / `Eyebrow` / `DocsFooter` のパス・セクション名一括更新
- `src/app/page.tsx`(ホーム)のセクション一覧更新、旧パスからの `redirect` 手当て
- `npx tsc --noEmit` / `npx next build`(静的Export)確認
- 旧構成を記述した [`DIRECTORY_STRUCTURE.md`](./DIRECTORY_STRUCTURE.md) は現状と乖離済み。再編確定後に本書へ統合 or 破棄を判断

---

## 実行結果(2026-07-12 実施済み)

上記提案を実行し、**14 → 17 セクション**に再編した。ビルド(`next build` 静的Export・267ページ)・`tsc --noEmit`・`eslint` はすべてグリーン。デッドリンク0(実行中に既存のタイプミス `infrafront/infrawatch` → `cloudfront/cloudwatch` も是正)。

### 最終セクション構成(17)

| # | セクション | href | 変更 |
|---|---|---|---|
| 1 | 情報科学 | `/theory` | 維持 |
| 2 | コンピュータ | `/computer` | OSを分離 |
| 3 | **OS** | `/os` | 🆕 `/computer/os/*` を昇格 |
| 4 | ネットワーク | `/network` | 維持 |
| 5 | インターネット | `/internet` | 維持 |
| 6 | データベース | `/database` | `/dev/database/{physical,history}` を吸収 |
| 7 | **開発工程・管理** | `/sdlc` | 「開発技術」から改称。設計/テストは各セクションへ集約、実装は/devへ |
| 8 | 開発 | `/dev` | `/dev/implementation` を新設(← /sdlc/implementation)、DB追補を除外 |
| 9 | 設計 | `/design` | 維持(/sdlc/design/* のリダイレクト先) |
| 10 | テスト | `/test` | 維持(/sdlc/testing/* のリダイレクト先) |
| 11 | セキュリティ | `/security` | 維持(メイン) |
| 12 | ユーザーインタフェース | `/ui` | 維持 |
| 13 | 情報メディア | `/media` | 維持 |
| 14 | インフラ | `/infra` | AWS・監視を分離 |
| 15 | **クラウド** | `/cloud` | 🆕 `/infra/aws/*` を昇格 + クラウド総論を landing 化 |
| 16 | **監視** | `/monitoring` | 🆕 `/ops/monitoring`(→landing)+`/infra/monitoring`(→/monitoring/infra)を集約 |
| 17 | 運用 | `/ops` | 監視を分離 |

### 主なディレクトリ移動

| 移動元 | 移動先 |
|---|---|
| `src/app/computer/os/*` | `src/app/os/*` |
| `src/app/infra/aws/*` | `src/app/cloud/aws/*`(+ `src/app/cloud/page.tsx` 新設) |
| `src/app/dev/database/{physical,history}` | `src/app/database/{physical,history}` |
| `src/app/sdlc/implementation` | `src/app/dev/implementation` |
| `src/app/ops/monitoring` | `src/app/monitoring` |
| `src/app/infra/monitoring` | `src/app/monitoring/infra` |

### リダイレクトスタブ(旧URL保持・`RedirectTo`)

- `/sdlc/design/basics` → `/design`、`/sdlc/design/structured` → `/design/paradigm/structured`、`/sdlc/design/data-centered` → `/design/methodology/data-centric`、`/sdlc/design/object` → `/design/paradigm/oop`、`/sdlc/design/architecture` → `/design/architecture`
- `/sdlc/testing/levels` → `/test/strategy`、`/sdlc/testing/techniques` → `/test/design-techniques`
- `/dev/database` → `/database`(`/dev/database/design` は従来どおり `/database/design`)

### 据え置き(相互リンクのみ・構造変更なし)

- **セキュリティ**: メイン維持。`/infra/container/security`・`/cloud/aws/security` 等は各文脈に残置
- **キャッシュ**: `/dev/cache` を本籍、`/security/cache` はセキュリティ文脈に残置。両者を相互リンク化(本作業で `/security/cache` → `/dev/cache` の戻りリンクを追加)
- **オブザーバビリティ**: `/infra/container/observability` はコンテナ文脈に残置、`/monitoring` から相互リンク

### 残課題

- `/dev/framework/*`(React/Next/Tailwind)は将来ページ増加時に「フロントエンド」主題として昇格候補(今回は据え置き)
- `docs/05content-plan/DIRECTORY_STRUCTURE.md`・`PREREQ_GAPS.md` 等の旧パス参照は未更新(機能への影響なし)
- 移動ページ本文の一部に旧セクション前提のナビ文(例:OSページ冒頭「前のページまでで…」)が残存。表示・内容の追い込みは別途
