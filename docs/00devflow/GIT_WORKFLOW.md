# Atlas Git/GitHub運用設計 (Issue駆動開発 + CI + AIレビューペルソナ)

最終更新: 2026-07-03

**位置づけ**: [`DEVELOPMENT_FLOW.md`](./DEVELOPMENT_FLOW.md) が「開発の工程」を扱うのに対し、本書はその工程をGitHub上でどう回すか(Issue → ブランチ → PR → CI → マージ)という**Gitオペレーションの実装計画**。まだ未実装で、これから `.github/` 配下に設定を追加していく想定。

## 0. やりたいことの整理

1. **Issue駆動開発**: 作業はIssueを起点にし、Issueに紐づくブランチを作成して進める
2. **CI**: PR作成時にLint / TypeCheck / Buildを自動実行する
3. **ブランチ自動削除**: PRマージ後、マージ元ブランチを自動削除する
4. **PRレビューペルソナのAI提案**: PR作成時、変更内容に応じて「どのペルソナ(専門観点)でのレビューが必要か」をAIが提案する。**セキュリティエンジニアの観点でのレビューは常に必須**とする

現状はリモートリポジトリ未作成([`git remote -v`](.) が空)のため、以下は「GitHubリポジトリ作成後に実装する」前提の計画。

## 1. Issue駆動のブランチ運用

### 1.1 Issueテンプレート

`.github/ISSUE_TEMPLATE/` にYAML formsを配置し、Issueの種類を分類する。

| テンプレート | 用途 |
|---|---|
| `feature.yml` | 機能追加(例: タグ検索の実装) |
| `bug.yml` | 不具合報告 |
| `chore.yml` | 依存更新・設定変更などコード変更を伴わない/小さい作業 |

各テンプレートに「関連ドキュメント(`docs/`配下のどのファイルに対応するか)」の入力欄を設け、`REQUIREMENTS.md` などとのトレーサビリティを確保する。

### 1.2 ブランチ命名規則

```
<type>/<issue番号>-<短い説明(kebab-case)>
```

例: `feat/12-tag-tree-view`, `fix/15-backlink-scan-bug`, `chore/3-eslint-config`

`type` は Conventional Commits に合わせて `feat` / `fix` / `chore` / `docs` / `refactor` / `test` / `ci` を使う。

### 1.3 Issue→ブランチの作成方法

GitHub UIのIssue画面右側「Development」パネルから「Create a branch」を使うか、CLIで:

```bash
gh issue develop <issue番号> --checkout
```

これによりIssueとブランチ・PRが自動的にリンクされ、GitHub上でトレーサビリティが確保される。

### 1.4 PRとIssueの紐付け

PR本文に `Closes #<issue番号>` を必ず含める(§4のPRテンプレートに項目を用意)。これによりPRマージ時にIssueが自動クローズされる。

## 2. CI: Lint / TypeCheck / Build

### 2.1 現状の準備状況

`package.json` には `lint` と `build` スクリプトはあるが、`typecheck` 相当のスクリプトがまだ無い。実装時に追加する:

```json
"scripts": {
  "typecheck": "tsc --noEmit"
}
```

### 2.2 ワークフロー案 (`.github/workflows/ci.yml`)

`pull_request`(対象: `main`)と `main` への `push` をトリガーにする。3ジョブを並列実行し、それぞれ個別のステータスチェックとしてブランチ保護から参照できるようにする。

```yaml
name: CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint

  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run typecheck

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
```

Node.jsのバージョンはリポジトリに `.nvmrc` を追加して固定し、ワークフロー側もそれを参照する形にするとローカル/CIでのズレを防げる(実装時に追加)。

> **注意 (AGENTS.md準拠)**: このプロジェクトのNext.jsは通常のNext.jsと破壊的変更がある版。`build` ジョブがCIで失敗する場合、`node_modules/next/dist/docs/` のビルド関連ドキュメントを確認してから原因を切り分けること。

### 2.3 ブランチ保護ルール (`main`)

GitHub Settings → Branches → Add rule で以下を設定:

- Require a pull request before merging(承認数は §4.4 参照)
- Require status checks to pass before merging: `lint` / `typecheck` / `build`(§4で追加する `security-review` も後で含める)
- Require branches to be up to date before merging
- Allow force pushes: 無効 / Allow deletions: 無効(`main` 自体は保護、削除されるのは各作業ブランチのみ。§3参照)

## 3. マージ後のブランチ自動削除

これはワークフローではなく**リポジトリ設定**で完結する。

- GitHub UI: Settings → General → Pull Requests → **Automatically delete head branches** をON
- または CLIで一括設定:

```bash
gh repo edit --delete-branch-on-merge
```

Issueに紐づくブランチ運用(§1)と組み合わせることで、「Issue作成→ブランチ作成→実装→PR→マージ→ブランチ自動削除→Issue自動クローズ」が一通り自動化される。

## 4. PRレビューペルソナのAI提案 + セキュリティレビュー必須化

### 4.1 ペルソナ一覧(Atlasのドメインに合わせた案)

現在のAtlasは静的サイト([`site-detail.md`](../03detail-design/site-detail.md)参照、API Route・DB・アップロードなし)であることを前提にしたペルソナ表。

| ペルソナ | 観点 | 対象になりやすい変更 |
|---|---|---|
| 🔒 **セキュリティエンジニア(必須・全PR共通)** | 依存脆弱性、外部リンク・埋め込みの安全性、シークレット管理 | 全PR |
| 🗺️ 情報設計レビュアー | `nav.ts`とページの整合性(§3.1)、ページ数のハードコード有無(§3.2) | `src/lib/nav.ts`、新規`page.tsx` |
| 🎨 フロントエンド/UXレビュアー | `components/docs`の使い分け、画面構成の一貫性 | `app/**/page.tsx`、`components/**` |
| ♿ アクセシビリティレビュアー | セマンティックHTML、キーボード操作、コントラスト | UI変更全般 |
| ☁️ インフラ/CI-CDレビュアー | GitHub Actionsの権限、静的ホスティング設定 | `.github/workflows/**`、[`STATIC_DEPLOY_PLAN.md`](./STATIC_DEPLOY_PLAN.md)関連 |
| ⚡ パフォーマンスレビュアー | ビルド時間、Pagefindインデックスサイズ | ビルド設定・検索まわり |

**セキュリティエンジニアは常に必須**とし、他のペルソナは変更内容に応じてAIが推奨する形にする。

### 4.2 PRテンプレート (`.github/PULL_REQUEST_TEMPLATE.md`)

```markdown
## 概要
<!-- 何を・なぜ変更したか -->

Closes #

## レビューペルソナ
<!-- AIによる提案(下記ワークフローが自動でコメント追記/チェック)。人間側で過不足あれば手動調整可 -->

- [ ] 🔒 セキュリティエンジニア(必須)
- [ ] ⚙️ バックエンド/API
- [ ] 🗄️ データ設計
- [ ] 🎨 フロントエンド/UX
- [ ] ♿ アクセシビリティ
- [ ] ☁️ インフラ/CI-CD
- [ ] ⚡ パフォーマンス

## 動作確認
<!-- 何をどう確認したか -->
```

### 4.3 AIによるペルソナ提案ワークフロー案 (`.github/workflows/pr-persona-review.yml`)

`pull_request` の `opened` / `synchronize` をトリガーに、Claude(Anthropic APIまたは公式の `claude-code-action`)にPRの差分を渡し、§4.1のペルソナ表に基づいて「このPRに必要なペルソナ」を判定させ、PRへのコメント追記・ラベル付与を行う。

```yaml
name: PR Persona Review Suggestion

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  suggest-personas:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
      contents: read
    steps:
      - uses: actions/checkout@v4
      - name: Suggest review personas via Claude
        uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: |
            このPRの差分(docs/00devflow/GIT_WORKFLOW.md §4.1のペルソナ表)を読み、
            必要なレビューペルソナを判定してPRにコメントしてください。
            セキュリティエンジニアは常に必須として含めてください。
```

実装時に確定させる点:

- `ANTHROPIC_API_KEY` をリポジトリ/Organization Secretsに登録する
- 公式の `claude-code-action`(またはClaude Code CLIをActions上で実行する形)の具体的な導入方法は、実装着手時に最新のセットアップ手順を確認する
- コメントだけでなく、判定結果をラベル(`persona:security`, `persona:frontend` 等)としても付与し、後述§4.4のステータスチェックから参照できるようにする

### 4.4 「セキュリティレビュー必須」をどう強制するか

Atlasは現状ソロ開発のため、GitHubの「他人によるApprove必須」だけでは強制力にならない。実装時は以下の組み合わせを想定:

1. **自動セキュリティレビューを必須ステータスチェック化**: §4.3のワークフローに加え、セキュリティ観点専用のジョブ(`security-review`)を用意し、Claudeにセキュリティレビュー(XSS/認可/シークレット/依存脆弱性など)を実施させ、問題なければ成功、要修正なら失敗するチェックにする。これをブランチ保護の必須ステータスチェックに追加する(§2.3)
2. **PRテンプレートのチェックリスト自己申告**(§4.2): 最低限、人間(自分)が「セキュリティ観点を確認した」ことを明示するチェックボックスを残す
3. **将来コラボレーターが増えた場合**: `.github/CODEOWNERS` でセキュリティ関連パス(アップロードAPI、認証まわり、`next.config.*` 等)に対して特定の人/チームを必須レビュアーに指定し、「Require review from Code Owners」を有効化する。現段階では雛形だけ用意しておく

## 5. 段階導入プラン

| フェーズ | 内容 |
|---|---|
| **フェーズ1** | GitHubリポジトリ作成、Issueテンプレート・PRテンプレート・ブランチ命名規則の導入(自動化なし) |
| **フェーズ2** | `ci.yml`(lint/typecheck/build)導入、`main`のブランチ保護設定、ブランチ自動削除設定 |
| **フェーズ3** | §4.1のペルソナ表をPRテンプレートに反映(手動チェックのみ、AI連携なし) |
| **フェーズ4** | `pr-persona-review.yml` 導入(AIによるペルソナ提案コメント/ラベル付け) |
| **フェーズ5** | `security-review` 必須ステータスチェックの導入、ブランチ保護へ追加 |

## 6. 未決の論点

- `claude-code-action` (またはAnthropic API直接呼び出し)の認証情報の管理方法とAPI利用コストの見積もり
- ソロ開発中の「Require pull request reviews」の運用方法(自分自身のPRを自分で承認する必要があり、GitHub側の設定で許可されるか実装時に要確認)
- `security-review` ジョブが「問題あり」と判定した場合のPRブロックの厳格さ(警告止まりにするか、マージ自体をブロックするか)
- Lint/TypeCheck/Buildの実行時間が伸びてきた場合のキャッシュ戦略(Next.jsのビルドキャッシュ含む)
- 将来コラボレーターが増えた際の`CODEOWNERS`の具体的なパス設計
