# Atlas 詳細設計 (アプリケーション) v0.1

最終更新: 2026-07-03

> **注記(2026-07-10)**: 本書が前提とするアップロードAPI・タグ編集・裏リンク等はAtlas本体には実装しない方針に変更した(shadcn/uiの採用自体は継続、`src/components/ui/`に導入済み)。現在のAtlasの実際のコンポーネント構成は [`site-detail.md`](./site-detail.md) を参照。本書は将来アップロード機能を別アプリとして切り出す場合の参考資料として残している。

前提: [`app-basic.md`](../02basic-design/app-basic.md) の基本設計に基づき、実装レベルまで具体化する。UIコンポーネントライブラリは **shadcn/ui** を採用する。

## 0. shadcn/ui採用に伴う技術的補足

shadcn/uiはnpmパッケージとしてインストールするのではなく、CLI (`npx shadcn@latest add <component>`) でコンポーネントのソースコードを `src/components/ui/` に生成する方式。Radix UIプリミティブ + Tailwind CSSがベース(TailwindはNext.js作成時に導入済み)。

- 初期化: `npx shadcn@latest init` で `components.json` を生成し、`src/lib/utils.ts` に `cn()`(clsx + tailwind-merge)を追加する
- アイコン: shadcnのデフォルトである `lucide-react` を採用する
- 通知: 旧 `Toast` ではなく、shadcnが現在推奨する `sonner` を使う
- 導入するコンポーネント一覧(初期): `button`, `dialog`, `input`, `badge`, `command`, `popover`, `sidebar`, `separator`, `scroll-area`, `skeleton`, `sonner`, `dropdown-menu`
- shadcn/uiには「タグ入力(multi-select)」や「ツリービュー」の既製コンポーネントは無いため、`command` + `popover` を組み合わせた自作コンポーネント(§2.2)として実装する

## 1. ディレクトリ構成

```
src/
  app/
    layout.tsx                      -- RootLayout(Header+Sidebarの共通レイアウト)
    page.tsx                        -- ホーム画面 "/"
    files/[id]/page.tsx             -- ファイル詳細画面
    search/page.tsx                 -- 検索結果画面
    api/
      files/route.ts                -- GET(一覧)/POST(アップロード)
      files/[id]/route.ts           -- GET(詳細)
      files/[id]/tags/route.ts      -- PATCH(タグ更新)
      files/[id]/backlinks/route.ts -- GET(裏リンク)
      tags/route.ts                 -- GET(タグツリー)
      search/route.ts               -- GET(検索)
  components/
    ui/                             -- shadcn/uiが生成するコンポーネント群
    layout/
      app-header.tsx                -- ロゴ、検索ボックス、アップロードボタン
      app-sidebar.tsx                -- タグツリー(shadcnの Sidebar + Collapsible)
    files/
      file-list.tsx                 -- ファイル一覧(ホーム/検索結果で共用)
      file-list-item.tsx
      file-viewer-markdown.tsx      -- remark/rehypeでの描画
      file-viewer-html.tsx          -- iframe sandbox埋め込み
      tag-editor.tsx                -- タグの追加/削除(Command+Popover)
      backlinks-panel.tsx
      duplicate-title-banner.tsx    -- 同名ファイル注意表示
    upload/
      upload-dialog.tsx             -- shadcn Dialogベース
      upload-dropzone.tsx           -- D&D + ファイル選択
  lib/
    utils.ts                        -- cn()
    data/
      files-repository.ts           -- index.jsonの読み書き・排他制御
      tag-tree.ts                   -- タグ階層構築・正規化
      wikilink.ts                   -- [[Page]] 解析・解決
      backlinks.ts                  -- 裏リンク計算
      search.ts                     -- 検索ロジック
    markdown/
      render.ts                     -- remark/rehypeパイプライン設定
    validation.ts                   -- アップロードのバリデーション
  types/
    file.ts                         -- FileMeta等の型定義
data/                                -- 実データ(.gitignore対象)
  files/
  index.json
```

## 2. UIコンポーネント構成

### 2.1 共通レイアウト(`layout.tsx`)

- `AppSidebar`(shadcnの`Sidebar`/`SidebarProvider`を使用): タグツリーを`SidebarGroup`+`SidebarMenu`で表現し、階層の開閉は`Collapsible`と組み合わせる。各ノードにファイル件数をバッジ表示
- `AppHeader`: `Input`(検索ボックス、Enterで`/search?q=...`へ遷移)、`Button`(アップロード起動、`upload-dialog`を開く)
- `<Toaster />`(sonner)をレイアウト直下に配置し、アップロード成功/失敗・タグ更新結果などをトーストで通知する

### 2.2 タグエディタ(`tag-editor.tsx`)

アップロードダイアログ・ファイル詳細画面の両方で使い回す共通コンポーネント。

- 選択済みタグは `Badge`(削除用の×アイコン付き)で横並び表示
- 「+ タグを追加」`Button`を押すと`Popover`が開き、中に`Command`(`CommandInput`+`CommandList`)を配置
- `/api/tags` から取得した既存タグパス一覧を候補として表示し、入力文字列で絞り込む
- 入力文字列が既存候補に完全一致しない場合は「"xxx" を新規作成」という`CommandItem`を末尾に表示し、選択すると新規タグとして追加する
- props: `{ value: string[]; onChange: (tags: string[]) => void }` (フォーム内でもファイル詳細のインライン編集でも同じ形で使える)

### 2.3 ファイル一覧(`file-list.tsx` / `file-list-item.tsx`)

- shadcnの`Card`は使わず、`Table`相当の軽量リスト(divベース)にタイトル・`Badge`によるタグ表示・アップロード日時を並べる(必須要件のみで十分なため、テーブルコンポーネント導入は見送り)
- タイトル(=filename)が同一のファイルが複数存在する場合、日時をより強調して区別できるようにする(§2.6)
- 読み込み中は`Skeleton`でプレースホルダ表示

### 2.4 ファイル詳細(`files/[id]/page.tsx`)

- Main領域: `format === "md"` なら`file-viewer-markdown`、`format === "html"` なら`file-viewer-html`
- `file-viewer-html`は `<iframe sandbox srcDoc={html} />` を返すだけの薄いコンポーネント(§3.2)
- 右側 or 下部パネル: `tag-editor`(即時保存、`PATCH /api/files/:id/tags`を呼ぶ)、`backlinks-panel`(`GET /api/files/:id/backlinks`の結果をリンク一覧表示)
- 同名ファイルが他にも存在する場合、`duplicate-title-banner`を上部に表示("同名の別ファイルが他に${n}件あります"+一覧へのリンク)

### 2.5 アップロードダイアログ(`upload-dialog.tsx` / `upload-dropzone.tsx`)

- shadcnの`Dialog`内に`upload-dropzone`(HTML5 D&D + `<input type="file" multiple>`のフォールバック)を配置
- 選択したファイル一覧をダイアログ内にリスト表示(ファイル名・拡張子アイコン)、拡張子が`.md`/`.html`以外のものは選択時点で弾いてsonnerでエラー通知する
- 共通タグ入力欄として`tag-editor`を配置(このダイアログでは全選択ファイルに同じタグが付与される)
- 「アップロード」`Button`押下で`POST /api/files`を呼び、成功後はダイアログを閉じてホームへ遷移、対象ファイルをハイライトする

### 2.6 同名ファイルの見せ方

基本設計§7で未決だった論点への回答。物理ファイルはUUIDで衝突しないため、同名アップロードは**エラーにせず両方保存する**。UI上は以下で区別可能にする。

- 一覧: タイトルが重複する場合、サブテキストに `アップロード日時` を常に表示(通常は日時を省略するデザインでも、重複時は自動で表示する)
- 詳細画面: `duplicate-title-banner` で同名の他ファイルへのリンクを提示

## 3. 主要ロジックの処理フロー

### 3.1 Markdown描画・ウィキリンク解決(`lib/markdown/render.ts`, `lib/data/wikilink.ts`)

パイプライン: `remark-parse` → `remark-gfm` → 自作remarkプラグイン(`remarkWikilink`) → `remark-rehype` → `rehype-sanitize` → `rehype-stringify`

`remarkWikilink`の処理:

```
mdastツリーのtextノードを走査
  正規表現 /\[\[([^\]]+)\]\]/g でマッチした箇所を検出
  マッチした`ページ名`について、index.json内のfilename(拡張子除く)と大文字小文字を無視して一致するファイルを検索
    0件 → リンク切れとして <span class="wikilink-missing"> に変換(クリック不可、視覚的にリンク切れと分かる表示)
    1件 → <a href="/files/{id}"> に変換
    2件以上 → uploadedAt降順(最新)を優先してリンク先に採用し、リンクに「複数候補あり」を示す視覚マーカーを付与する(§3.1末尾)
  マッチしなかった部分はそのままtextノードとして残す
```

- ウィキリンク衝突時の解決優先順位(基本設計§7の未決事項への回答): **最新アップロード優先**。将来的に手動での曖昧さ解消UIを追加する余地は残すが、MVPでは実装しない

### 3.2 HTML表示(`file-viewer-html.tsx`)

- `GET /api/files/:id` で取得した本文をそのまま `srcDoc` に渡す。サニタイズは行わない(iframeの`sandbox`属性による隔離が前提。`allow-scripts`は付与しない)
- iframeの高さはコンテンツに応じて可変にしたいが、サンドボックス化されたiframeの高さ自動調整は同一オリジンでない限り困難なため、MVPでは固定の大きめ高さ(例: `calc(100vh - header分)`)+ iframe内スクロールとする

### 3.3 裏リンク計算(`lib/data/backlinks.ts`)

```
function getBacklinks(targetId):
  target = index.files.find(id === targetId)
  targetTitle = filenameWithoutExt(target.filename)
  results = []
  for file in index.files (target自身は除く):
    body = readFile(file)
    if file.format === "md":
      本文中の [[targetTitleと一致するウィキリンク]] を正規表現で検索
    if file.format === "html":
      本文中の <a href="..."> のhrefがtarget.filenameと一致するものを検索(簡易正規表現、DOMパースはしない)
    一致すれば results に file のメタデータを追加
  return results
```

- 都度全ファイルを読み込んでスキャンする(§3.4の検索と同様、個人規模の数百ファイルなら許容範囲。キャッシュはMVPでは行わない)

### 3.4 検索(`lib/data/search.ts`)

基本設計§7の未決事項への回答: **都度スキャン方式を採用する**(簡易転置インデックスは作らない)。理由: 個人利用規模(数百ファイル)であれば、リクエストごとに全ファイルを読み込んでもレスポンスタイムは問題にならない想定のため、実装の単純さを優先する。

```
function search(query):
  q = normalize(query)  // 小文字化のみ。形態素解析はしない(単純部分一致)
  for file in index.files:
    title = filenameWithoutExt(file.filename)
    if normalize(title).includes(q) → マッチ(スコア高)
    if file.tags.some(tag => normalize(tag).includes(q)) → マッチ(スコア中)
    body = readFile(file)
    if normalize(body).includes(q) → マッチ(スコア低)
  スコア順に並べて返す
```

- 日本語の形態素解析・あいまい検索は行わない(MVPスコープ外、将来必要になれば検討)

### 3.5 タグツリー構築・正規化(`lib/data/tag-tree.ts`)

基本設計§7の未決事項への回答:

- 正規化ルール: タグ文字列は「前後空白のtrim」「全角スペース→半角スペースへ変換」を行った上で `/` 区切りでパースする
- 同一判定(ツリーのノードをまとめる際の重複排除)は **小文字化して比較**する。例: `Prog/React` と `prog/react` は同じノードとして扱う
- 表示ラベルは、そのタグパスに**最初に登録された表記**を採用する(後から表記ゆれで追加されても表示は変わらない)
- ツリーは`index.json`から都度メモリ上に再構築する(永続化しない)

### 3.6 `index.json` の排他制御(`lib/data/files-repository.ts`)

ローカル実行(`next dev`/`next start`、単一Node.jsプロセス)が前提のため、OSレベルのファイルロックは使わず、**プロセス内の非同期キュー(Promiseチェーンによるミューテックス)**で書き込みを直列化する。

```
let writeQueue = Promise.resolve()

function updateIndex(mutateFn):
  writeQueue = writeQueue.then(async () => {
    current = await readIndexJson()
    next = mutateFn(current)
    await writeIndexJsonAtomically(next)  // 一時ファイルに書いてからrename
    return next
  })
  return writeQueue
```

- 書き込みは一時ファイルへの書き込み後に`rename`する形にし、書き込み途中でプロセスが落ちても`index.json`が壊れないようにする

## 4. APIルート詳細

| エンドポイント | 処理概要 |
|---|---|
| `POST /api/files` | `multipart/form-data`をパース → 各ファイルの拡張子/サイズを`validation.ts`でチェック(不正なものは個別にスキップしエラー内容を結果に含める) → UUID発行 → `data/files/`に保存 → `updateIndex`でメタデータ追加 → 作成分のメタデータ配列を返す |
| `GET /api/files` | `updateIndex`不要、`readIndexJson`のみ。`tag`クエリがあればそのタグ配下(前方一致)に絞り込み |
| `GET /api/files/:id` | メタデータ+本文(`fs.readFile`)を返す。存在しなければ404 |
| `PATCH /api/files/:id/tags` | リクエストボディの`tags`を`tag-tree.ts`の正規化ルールに通してから`updateIndex`で置き換え |
| `GET /api/files/:id/backlinks` | §3.3のロジックを呼ぶ |
| `GET /api/tags` | 全ファイルの`tags`から§3.5のロジックでツリーを構築して返す |
| `GET /api/search` | §3.4のロジックを呼ぶ |

## 5. バリデーション・エラーハンドリング方針

- **アップロード**: 拡張子は`.md`/`.html`のみ許可(それ以外は個別に拒否、他の正常なファイルの処理は継続する)。ファイルサイズ上限は**1ファイルあたり5MB**とする(個人のメモ・ドキュメント用途を想定した目安値)
- **文字コード**: UTF-8のみ想定。それ以外のエンコーディングは文字化けを許容し、MVPでは自動変換を行わない
- **APIの共通エラーレスポンス形式**: `{ "error": { "code": string, "message": string } }`。存在しないリソースは404、バリデーションエラーは400、サーバー内部エラーは500を返す
- **フロントエンドでのエラー表示**: API呼び出し失敗時は`sonner`でエラートーストを表示する(基本的にモーダルでのブロッキング表示は行わない)

## 6. 主要な型定義

```ts
// types/file.ts
type FileFormat = "md" | "html"

interface FileMeta {
  id: string
  filename: string       // 拡張子込みの元ファイル名(タイトルはここから拡張子を除いて導出)
  storedAs: string        // "<id>.md" | "<id>.html"
  format: FileFormat
  tags: string[]           // 正規化前の表示用表記をそのまま保持
  uploadedAt: string        // ISO8601
}

interface TagTreeNode {
  label: string             // 表示用ラベル(最初の登録表記)
  path: string               // 正規化済みの完全パス(例: "prog/react")
  count: number                // このノード配下(自身含む)のファイル数
  children: TagTreeNode[]
}
```

## 7. 基本設計からの未決論点への回答まとめ

| 論点 | 回答 |
|---|---|
| 検索の実装方式 | 都度スキャン(§3.4)。形態素解析は行わない |
| タグ名の正規化ルール | 前後空白trim・全角→半角スペース変換、同一判定は小文字比較(§3.5) |
| 同名ファイル再アップロード時の見せ方 | エラーにせず両方保存、UI上は日時で区別(§2.6) |
| ウィキリンク衝突時の解決優先順位 | 最新アップロード優先、複数候補ありを視覚的に明示(§3.1) |

## 8. 詳細設計で新たに残った論点

- HTMLファイルのiframeの高さを、将来的に`postMessage`ベースの高さ通知(`allow-scripts`を限定的に許可する等)で可変にするかどうかは保留
- アップロードサイズ上限(5MB)は暫定値。実際の利用で不足する場合は見直す
- タグの「削除」を行った際、そのタグを使っている他ファイルへの影響はない(タグはファイル単位の属性であり、タグ自体を管理するマスタは存在しないため、最後の1ファイルからタグを外せばツリーからも自然に消える)という理解でよいか、運用しながら確認する
