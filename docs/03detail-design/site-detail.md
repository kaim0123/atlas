# Atlas 詳細設計 (静的サイト版)

最終更新: 2026-07-10

**位置づけ**: [`app-detail.md`](./app-detail.md)・[`app-basic.md`](../02basic-design/app-basic.md)・[`REQUIREMENTS.md`](../01requirements/REQUIREMENTS.md)は「アップロード式の個人Wiki」だった当初案の設計書(参考資料として保持)。本書は[`00devflow/STATIC_DEPLOY_PLAN.md`](../00devflow/STATIC_DEPLOY_PLAN.md)の決定を受けた**現在のAtlas(静的な解説サイト)の実際の構成**を記述する。実装が変わったら本書を更新すること。

## 1. アプリの性質

Atlasはコンピュータ・ソフトウェア開発の解説コンテンツを `page.tsx` として直接コード化した**静的サイト**。アップロード・DB・認証は持たない。コンテンツはリポジトリ内で執筆・レビューし、`next build`(静的Export)でビルドしたものをそのままホスティングする。

## 2. ディレクトリ構成

```
src/
  app/
    <section>/.../page.tsx    -- コンテンツページ本体(下記§3参照)
    layout.tsx                -- RootLayout(re-export: src/components/layout/layout.tsx)
    page.tsx                  -- ホーム "/"
    search/page.tsx           -- 検索結果画面(Pagefind、§5)
  components/
    docs/                     -- コンテンツページ共通部品(§4)。index.tsからまとめてimport
    layout/                   -- app-header.tsx / app-sidebar.tsx / breadcrumbs.tsx / mobile-bottom-nav.tsx / layout.tsx
    search/                   -- search-results.tsx
    ui/                       -- shadcn/uiが生成した部品(button, dialog, sidebar等)
  lib/
    nav.ts                    -- ナビゲーション構造の単一の情報源(§3.1)
    utils.ts                  -- cn()
  hooks/
    use-pagefind-search.ts
```

セクション(トップレベルの分野)は現在 `cs` `hardware` `network` `internet` `server` `dev` `impl` `design` `security` `test` `cloud` `monitoring` `ops` の13。2026-07-11に、開発者視点(旧`cs`/`aws`/`sec`/`ops`の一部)とインフラ視点(`インフラ.md`)をトピック単位で統合する形で再編した([`05content-plan/DIRECTORY_STRUCTURE.md`](../05content-plan/DIRECTORY_STRUCTURE.md)参照)。

## 3. コンテンツページの作り方

### 3.1 `src/lib/nav.ts` が唯一の情報源

サイドバー(`app-sidebar.tsx`)・モバイル下部ナビ(`mobile-bottom-nav.tsx`)・パンくず(`breadcrumbs.tsx`の`getBreadcrumbTrail`)は、すべて `nav.ts` の `sections` 配列だけを見て描画する。

**新しいページを追加したら、`page.tsx` を作るのと同時に必ず `nav.ts` の該当セクションの `tree` にもエントリを追加すること。** これを忘れるとページ自体はビルドされるが、サイドバーから辿り着けない孤立ページになる(実際に `/aws/basics` がこの状態になっていたことがあり、2026-07-10に修正済み)。

### 3.2 ページ数・連番をハードコードしない

過去、`Eyebrow`(例: `AWS · 3 / 23`)やIndexCardの`num`(例: `20 / 23`)、見出しの「全38ページ」、本文中の「次の7ページで」のような**サイト/セクション全体の総ページ数**をあちこちに手書きしていたが、ページを追加・削除するたびに関係する全ファイルを手で更新する必要があり、実際にズレて放置されていた(2026-07-10に全面削除・是正済み)。

**ルール**:
- `Eyebrow` にはセクション名(・サブカテゴリ名)だけを書く。ページ番号・総数は書かない
- 本文でも「全◯ページ」「次の◯ページで」のような総数表現は使わない
- `IndexCard` の `num` のような連番バッジは、**その配列・そのグリッド単体で完結する連番(`01`, `02`, ...)のみ**にする。他の見出しグループやセクション全体を通した連番、`/ 総数` の付与はしない

### 3.3 共通コンポーネント (`src/components/docs/`)

すべてのコンテンツページは `@/components/docs` からimportして組み立てる。独自マークアップの再実装はしない(ホームページ `src/app/page.tsx` がこれを怠って浮いていたため2026-07-10に統一済み)。

| ファイル | 主なコンポーネント | 用途 |
|---|---|---|
| `page.tsx` | `DocsPage`, `Hero`, `Eyebrow`, `Lead`, `Term`, `Heading`, `DocsFooter` | ページの骨格。全ページ共通 |
| `content.tsx` | `CardGrid`/`Card`/`CardNumber`, `Analogy`, `Aside`, `Diagram`, `Steps`, `CodeCompare` | 1ページ内の補足コンテンツ(非リンク) |
| `index-grid.tsx` | `IndexGrid`/`IndexCard` | **子ページへのリンク一覧**(セクショントップ・カテゴリ一覧ページ用)。`href`必須 |
| `arch.tsx` | `ArchList`/`ArchRow`/`ArchTitle`/`ArchFeature`/`ArchProblem` 等 | 年代・提唱者などメタデータ付きの比較表(design配下の中間インデックスで使用) |
| `mark.tsx` | `Mark`, `MarkNote` | 必修/専門/史などのタグ表示 |
| `timeline.tsx` | `Timeline`/`TimelineItem`/`TimelineLabel` | 横スクロールの年表 |
| `related.tsx` | `RelatedNav`/`RelatedList`/`RelatedLink` | ページ末尾の関連リンク |

**使い分け**: 子ページへのリンク一覧(何かをクリックすると別ページに飛ぶ)は必ず `IndexGrid`/`IndexCard`。ページ内で完結する補足情報のグルーピングは `CardGrid`/`Card`。年代・提唱者・重要度などのメタデータを併記した一覧(現状 design 配下の `methodology`/`principles`/`paradigm`/`architecture` の中間インデックスのみ)は `ArchList` 系を使ってよい。

### 3.4 各ページの標準構成

```tsx
import type { Metadata } from "next";
import { DocsPage, Hero, Eyebrow, Lead, Heading, DocsFooter, /* ... */ } from "@/components/docs";

export const metadata: Metadata = { title: "ページタイトル" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セクション名</Eyebrow>
        <h1>見出し</h1>
        <Lead>導入文</Lead>
      </Hero>

      <Heading num="01">最初のトピック</Heading>
      {/* 本文・図解・カード等 */}

      <RelatedNav>{/* 任意: 関連ページ */}</RelatedNav>
      <DocsFooter>Atlas &middot; セクション名 &middot; ページ名</DocsFooter>
    </DocsPage>
  );
}
```

`Heading` の `num`(`01`, `02`, ...)は**そのページ内だけで完結する見出し連番**であり、§3.2で禁止しているサイト全体のページ連番とは別物(他ファイルの更新は不要なので問題ない)。

## 4. 検索 (Pagefind)

- `npm run build` は `next build && pagefind --site out` を実行し、静的HTMLからPagefindの検索インデックスを生成する(`postbuild`的な扱い)
- `/search` ページと `src/hooks/use-pagefind-search.ts` が `pagefind.js` をブラウザ上で動的importして検索する
- 日本語は分かち書きなしのため語幹一致は効かない(部分一致中心)。精度が問題になれば代替案を検討する

## 5. ビルド・デプロイ

- `next.config.ts` で `output: "export"` を指定した静的Export構成(API Route・Server Actions・`middleware.ts`等の動的機能は使わない)
- ホスティング先の確定・カスタムドメインの要否は未決([`00devflow/STATIC_DEPLOY_PLAN.md`](../00devflow/STATIC_DEPLOY_PLAN.md) §3)

## 6. 参考: 廃止した設計

アップロード・タグ管理・裏リンク・DB・認証を前提とした旧設計([`REQUIREMENTS.md`](../01requirements/REQUIREMENTS.md)、[`app-basic.md`](../02basic-design/app-basic.md)、[`app-detail.md`](./app-detail.md)、[`00devflow/IMPLEMENTATION_PLAN.md`](../00devflow/IMPLEMENTATION_PLAN.md)、[`04CICD/CLOUD_DEPLOYMENT_DESIGN.md`](../04CICD/CLOUD_DEPLOYMENT_DESIGN.md))はAtlas本体には実装しない。将来アップロード機能を別アプリとして切り出す場合の参考として残してある。
