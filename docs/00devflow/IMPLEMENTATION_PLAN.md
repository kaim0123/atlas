# Atlas 実装ロードマップ (Issue化のたたき台)

最終更新: 2026-07-03

> **注記(2026-07-10)**: 本書はアップロード機能(M1・M3・M4一部・M7)を前提としたロードマップだが、[`STATIC_DEPLOY_PLAN.md`](./STATIC_DEPLOY_PLAN.md) の決定によりAtlas本体にアップロード機能は実装しない方針になった。Issue駆動開発の土台(M0)・共通レイアウト(M2)など機能非依存の部分は今も有効。将来アップロード機能を別アプリとして切り出す際の参考資料として残している。

**位置づけ**: [`DEVELOPMENT_FLOW.md`](./DEVELOPMENT_FLOW.md) の「4. 実装」工程に入るにあたり、[`app-detail.md`](../03detail-design/app-detail.md) の詳細設計を実装順・Issue単位に分解したもの。ここに並んでいる項目をそのままGitHub Issueに変換していく想定。番号(`M0-1`など)はIssueタイトルの接頭辞として使ってよい。

## 0. 現状整理

### 0.1 設計ドキュメントの状況

| ドキュメント | 状態 |
|---|---|
| [`REQUIREMENTS.md`](../01requirements/REQUIREMENTS.md) | 完了 |
| [`app-basic.md`](../02basic-design/app-basic.md) | 完了 |
| [`app-detail.md`](../03detail-design/app-detail.md) | 完了(実装レベルまで具体化済み) |
| `infra-basic.md` / `infra-detail.md` | **infra-detail.mdが空(中身なし)**。MVPはローカル実行のみでインフラを持たないため、意図的に空なのか書き漏れなのか要確認(§4) |
| [`DEVELOPMENT_FLOW.md`](./DEVELOPMENT_FLOW.md) / [`GIT_WORKFLOW.md`](./GIT_WORKFLOW.md) | 運用方針は決まっているが**未実装**(`.github/`なし、リモートリポジトリなし) |
| クラウド展開設計(`00devflow/CLOUD_DEPLOYMENT_DESIGN.md` v0.1 / `04CICD/CLOUD_DEPLOYMENT_DESIGN.md` v0.2) | MVPスコープ外の将来設計。**同名ファイルが2箇所に重複して残っている**(§4) |

### 0.2 実コードの状況

- `create-next-app` 直後の状態(`src/app/{layout,page}.tsx` のデフォルトのみ)
- `package.json` に `remark`/`rehype`系、`shadcn/ui`関連、`uuid` 等、設計で前提としている依存が**未インストール**
- `npm run typecheck` スクリプトが未追加(`GIT_WORKFLOW.md` §2.1で既知)
- `git remote` 未設定、`.github/` 未作成 → Issue駆動開発・CIの土台がまだ無い

### 0.3 結論

「設計は終わっている、土台(Git運用・依存関係)とコードがゼロ」という状態。したがって最初にやるべきは実装機能そのものではなく、**Issue駆動開発を回すための土台作り(M0)**。これが無いと「Issueを立てて進める」という今回の目的自体が回らない。

## 1. 進め方の方針

- [`GIT_WORKFLOW.md`](./GIT_WORKFLOW.md) のフェーズ1・2(Issue/PRテンプレート、ブランチ命名、CI、ブランチ保護)を最初に済ませる。フェーズ3〜5(AIペルソナ提案、`security-review`必須化)はMVP実装が一段落してからでよい
- 以降は [`DEVELOPMENT_FLOW.md`](./DEVELOPMENT_FLOW.md) 末尾の方針どおり、**機能単位で縦に小さく切って**実装する(アップロード→タグ→検索…と一つずつ動く状態にしていく)
- 各Issueは `type`(`feat`/`chore`/`docs`)・依存Issue・参照設計箇所を明記し、`GIT_WORKFLOW.md` のブランチ命名規則(`<type>/<issue番号>-<説明>`)にそのまま乗せられる粒度にしてある
- クラウド展開(`04CICD/`)は本ロードマップの対象外(§3)

## 2. マイルストーン & Issue候補

### M0. Git/GitHub運用基盤(`GIT_WORKFLOW.md` フェーズ1・2相当)

| # | type | タイトル案 | 依存 | 概要 |
|---|------|-----------|------|------|
| M0-1 | chore | GitHubリポジトリ作成 & remote設定 | - | リモート作成、`git push -u origin main`。以降のIssue/PR運用の前提 |
| M0-2 | chore | Issueテンプレート追加 | M0-1 | `.github/ISSUE_TEMPLATE/{feature,bug,chore}.yml`(`GIT_WORKFLOW.md` §1.1) |
| M0-3 | chore | PRテンプレート追加 | M0-1 | `.github/PULL_REQUEST_TEMPLATE.md`(§4.2)。ペルソナ欄は雛形として入れるが運用開始はM後回しでよい |
| M0-4 | chore | CI: lint/typecheck/build workflow追加 | M0-1 | `npm run typecheck` スクリプト追加、`.nvmrc` 追加、`.github/workflows/ci.yml`(§2.2) |
| M0-5 | chore | ブランチ保護 + 自動削除設定 | M0-4 | `main`のブランチ保護ルール、`gh repo edit --delete-branch-on-merge`(§2.3, §3) |

### M1. プロジェクト基盤セットアップ

| # | type | タイトル案 | 依存 | 概要 |
|---|------|-----------|------|------|
| M1-1 | chore | 依存関係追加(remark/rehype系) | M0-4 | `remark-parse`/`remark-gfm`/`remark-rehype`/`rehype-sanitize`/`rehype-stringify`/`uuid` 等(app-detail.md §3.1) |
| M1-2 | chore | shadcn/ui初期化 | M0-4 | `npx shadcn@latest init`、初期コンポーネント一式導入(app-detail.md §0) |
| M1-3 | chore | `/data`ディレクトリと型定義の準備 | M1-1 | `/data/.gitkeep`・`.gitignore`確認、`types/file.ts`(`FileMeta`/`TagTreeNode`) |
| M1-4 | feat | `files-repository.ts`(index.json読み書き・排他制御) | M1-3 | 非同期キュー+atomic write(app-detail.md §3.6) |
| M1-5 | chore | `validation.ts`(拡張子・サイズ検証) | M1-3 | `.md`/`.html`のみ許可、5MB上限(app-detail.md §5) |

### M2. 共通レイアウト

| # | type | タイトル案 | 依存 | 概要 |
|---|------|-----------|------|------|
| M2-1 | feat | RootLayout実装(Header+Sidebar shell) | M1-2 | `layout.tsx`、`<Toaster />`配置(app-detail.md §2.1) |
| M2-2 | feat | AppHeader実装 | M2-1 | 検索ボックス・アップロードボタン(API接続は後続Issue) |
| M2-3 | feat | AppSidebar skeleton | M2-1 | タグツリー表示部の枠のみ(データ接続はM4) |

### M3. アップロード機能

| # | type | タイトル案 | 依存 | 概要 |
|---|------|-----------|------|------|
| M3-1 | feat | `POST /api/files` 実装 | M1-4, M1-5 | 複数ファイル+共通タグアップロード(app-detail.md §4) |
| M3-2 | feat | `tag-editor.tsx` 共通コンポーネント | M1-2 | Command+Popoverによるタグ入力(app-detail.md §2.2) |
| M3-3 | feat | アップロードダイアログ実装 | M3-1, M3-2, M2-2 | `upload-dialog`/`upload-dropzone`、成功後ホーム遷移+ハイライト(app-detail.md §2.5) |

### M4. タグツリー & ホーム画面

| # | type | タイトル案 | 依存 | 概要 |
|---|------|-----------|------|------|
| M4-1 | feat | `tag-tree.ts`(構築・正規化ロジック) | M1-4 | trim・全角半角変換・小文字比較(app-detail.md §3.5) |
| M4-2 | feat | `GET /api/tags` 実装 | M4-1 | タグツリー+件数を返す |
| M4-3 | feat | AppSidebarとタグツリーの接続 | M4-2, M2-3 | クリックでホームを絞り込み |
| M4-4 | feat | `GET /api/files` 実装(一覧・タグ絞り込み) | M1-4 | `tag`クエリ対応 |
| M4-5 | feat | `file-list`/`file-list-item`実装、ホーム画面完成 | M4-4, M4-3 | ホーム画面(`/`)として一通り閲覧できる状態にする |

### M5. ファイル詳細 & Markdown表示

| # | type | タイトル案 | 依存 | 概要 |
|---|------|-----------|------|------|
| M5-1 | feat | `GET /api/files/:id` 実装 | M1-4 | メタデータ+本文取得、404対応 |
| M5-2 | feat | `markdown/render.ts`(remark/rehypeパイプライン) | M1-1 | サニタイズ込みのレンダリング(app-detail.md §3.1) |
| M5-3 | feat | `wikilink.ts`(ウィキリンク解析・解決) | M5-2 | 未一致/複数一致の扱い含む(app-detail.md §3.1) |
| M5-4 | feat | `file-viewer-markdown.tsx` + ファイル詳細ページ組み立て | M5-1, M5-3 | `/files/[id]` としてmd表示が動く状態 |

### M6. HTML表示

| # | type | タイトル案 | 依存 | 概要 |
|---|------|-----------|------|------|
| M6-1 | feat | `file-viewer-html.tsx`(iframe sandbox) | M5-1 | `allow-scripts`なし、`srcDoc`埋め込み(app-detail.md §3.2) |

### M7. タグ編集 & 裏リンク

| # | type | タイトル案 | 依存 | 概要 |
|---|------|-----------|------|------|
| M7-1 | feat | `PATCH /api/files/:id/tags` 実装 + 詳細画面での`tag-editor`再利用 | M3-2, M5-4 | 即時保存、サイドバーのタグツリーへの反映 |
| M7-2 | feat | `backlinks.ts` + `GET /api/files/:id/backlinks` | M5-3 | md/html双方の裏リンク計算(app-detail.md §3.3) |
| M7-3 | feat | `backlinks-panel.tsx` | M7-2 | 詳細画面への組み込み |

### M8. 検索

| # | type | タイトル案 | 依存 | 概要 |
|---|------|-----------|------|------|
| M8-1 | feat | `search.ts` + `GET /api/search` | M1-4 | 都度スキャン方式(app-detail.md §3.4) |
| M8-2 | feat | 検索結果ページ(`/search`) | M8-1, M2-2 | ヘッダー検索ボックスからの遷移込み |

### M9. 仕上げ・非機能要件

| # | type | タイトル案 | 依存 | 概要 |
|---|------|-----------|------|------|
| M9-1 | feat | `duplicate-title-banner`・同名ファイルの見せ方 | M4-5, M5-4 | app-detail.md §2.6 |
| M9-2 | feat | エラーハンドリング統一 | 全API実装後 | 共通エラーレスポンス形式、sonnerトースト(app-detail.md §5) |
| M9-3 | chore | 非機能要件の確認(セキュリティ観点) | 全機能実装後 | `rehype-sanitize`/`iframe sandbox`/拡張子制限の動作確認(app-basic.md §6) |
| M9-4 | docs | README更新 | - | `create-next-app`デフォルト文面をAtlas向けに置き換え |

## 3. 対象外(本ロードマップに含めない)

- クラウド展開(`04CICD/CLOUD_DEPLOYMENT_DESIGN.md`)は将来フェーズ。MVP(M0〜M9)が動いてから改めて着手判断する
- `GIT_WORKFLOW.md` フェーズ3〜5(AIレビューペルソナ提案、`security-review`必須化)もMVP実装が一段落してから

## 4. 先に解消しておきたい小さな懸案

Issue化の前に、方針だけ決めておくとブレないもの。

- **`infra-detail.md` が空**: MVPはインフラを持たない(ローカル実行のみ)ため、「対象なし」である旨を一行書いて明示するか、`app-detail.md`のみで完結させて本ファイルを削除するかを決める(`M0`系のchore Issueとして1件切ってよい)
- **クラウド展開設計の重複**: `00devflow/CLOUD_DEPLOYMENT_DESIGN.md`(v0.1)と`04CICD/CLOUD_DEPLOYMENT_DESIGN.md`(v0.2)が同名で2箇所に存在する。内容はv0.2がv0.1の更新版に見えるため、`04CICD/`側に一本化し`00devflow/`側は削除 or リダイレクト用の短い注記に置き換えるのが良さそう(これもchore Issue化推奨)
