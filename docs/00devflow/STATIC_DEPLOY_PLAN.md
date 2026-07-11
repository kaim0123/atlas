# Atlas 静的サイト化 実装計画

最終更新: 2026-07-09

**位置づけ**: [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md)は「ファイルアップロード式の個人Wiki」という当初のMVP([`REQUIREMENTS.md`](../01requirements/REQUIREMENTS.md))を前提にした実装ロードマップだったが、実際には[`05content-plan/CONTENT_STRUCTURE.md`](../05content-plan/CONTENT_STRUCTURE.md)のコンテンツが`page.tsx`として直接コード化される形で先行し、現状`page.tsx`が108ページに達している。この規模になった時点で、アップロード機能をこのアプリに持たせる意義が薄くなった(コンテンツは常にリポジトリ内で執筆・レビューされ、実行時アップロードは実質使わない想定)。

**決定事項**: アップロード機能はAtlasに実装せず、必要になった時点で別アプリとして切り出す。Atlasは現状のコンテンツ(解説サイト)をそのまま**静的サイトとしてビルド・デプロイ**する方針に切り替える。

## 0. 本計画の対象範囲

| 対象 | IN / OUT |
|---|---|
| 静的Export化(`next build`のみでホスティング可能な状態にする) | IN |
| 全文検索(Pagefind導入) | IN |
| 静的ホスティングへのデプロイ設定 | IN |
| ファイルアップロード・タグ編集・裏リンクのAPI化(`M1`,`M3`,`M4`一部,`M7`) | OUT(別アプリ検討。本計画では着手しない) |
| Cognito認証・招待共有 | OUT(アップロード機能とセットで別アプリ側の課題とする) |

`REQUIREMENTS.md`・`IMPLEMENTATION_PLAN.md`・[`CLOUD_DEPLOYMENT_DESIGN.md`](../04CICD/CLOUD_DEPLOYMENT_DESIGN.md)(Lambda + OpenNext前提)は、アップロードアプリを別途着手する際に再利用する想定で残す。本計画はそれらを置き換えるのではなく、「今のAtlas(解説サイト)をどうリリースするか」を別に定義するもの。

## 1. 現状確認

- `next.config.ts`は初期状態(`output`未指定)で、`src/app`配下にAPI Route・`middleware.ts`・Server Actions・`dynamic = "force-dynamic"`等の動的機能は存在しない → 静的Export化のブロッカーは現時点でなし
- `src/components/layout/app-header.tsx`にダミーの「アップロード」ボタンと、`/search?q=`へ遷移する検索フォームが既に存在する(検索結果ページ`/search`自体は未実装)

## 2. 実装ステップ

### Step 1: 静的Export化

- `next.config.ts`に`output: "export"`を設定
- `next build`を実行し、動的機能に依存している箇所がないかエラーで確認する
- `app-header.tsx`の「アップロード」ボタンを削除する(OUTスコープの機能導線を残さない)

### Step 2: Pagefind導入

- `devDependencies`に`pagefind`を追加
- `package.json`の`build`スクリプトを`next build && pagefind --site out`のようにpostbuild化する
- `/search`ページを実装し、Pagefindのブラウザ内検索(`/pagefind/pagefind.js`を動的import)を使って検索結果を表示する。既存の`app-header.tsx`の検索フォーム(`/search?q=`遷移)をそのまま入力導線として使う
- 日本語コンテンツが中心のため、分かち書きなしの日本語に対するPagefindのトークナイズ精度をStep 2の早い段階で軽く検証する(問題があれば`--force-language ja`指定や見出し単位でのインデックス調整を検討)

### Step 3: 静的ホスティングへのデプロイ

- デプロイ先を決定する(候補: Cloudflare Pages / Vercel(static) / GitHub Pages。§3の未決事項)
- 選定したホスティングのビルド設定(ビルドコマンド`npm run build`、公開ディレクトリ`out`)を用意する
- カスタムドメインを使うかどうかを決定する

### Step 4: 関連ドキュメントの整理

- `REQUIREMENTS.md`・`IMPLEMENTATION_PLAN.md`の冒頭に、本計画への参照と「アップロード関連は別アプリ検討としてスコープ外化した」旨を追記する(本計画とは別Issueで実施)

## 3. 未決事項

- デプロイ先(Cloudflare Pages / Vercel / GitHub Pages)
- カスタムドメインの要否
- Pagefindの日本語検索精度が実用に足りない場合の代替方針(Lunr.js等への切り替え、または見出し・タイトル重み付けの調整)
- アップロードアプリを別アプリとして切り出す時期・スコープ(現時点ではメモのみ、着手判断はしない)
