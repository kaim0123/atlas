import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DocsFooter,
  Card,
  CardGrid,
  CardNumber,
  Analogy,
  Diagram,
  RelatedNav,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "データベース",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発</Eyebrow>
        <h1>データベース ― データを構造化して保存する</h1>
        <Lead>
          アプリが扱うデータは、メモリ上の変数に置いたままではプロセスが終了した瞬間に消えてしまいます。再起動しても、複数の利用者が同時にアクセスしても失われない場所にデータを置く仕組みが<Term>データベース(DB)</Term>です。なかでも、データを行と列を持つ表(テーブル)として扱う<Term>リレーショナルデータベース(RDB)</Term>は、Webアプリのデータ永続化における事実上の標準です。このページではRDBの土台となる考え方を押さえ、続く2ページでテーブルの設計手順と、実際にDBMS上で動かすための物理設計・運用を見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">データベースとは ― なぜファイルではなくRDBMSを使うのか</Heading>
      <p>データをCSVやJSONのファイルに保存するだけでも、記録すること自体はできます。しかし複数の利用者が同時に書き込もうとしたときの競合や、「この列は必ず入力されている」といった整合性の保証、大量データからの高速な検索、複数の更新を1つの塊として扱う仕組みは、自前のファイル操作では作り込むのが困難です。<Term>DBMS(データベース管理システム)</Term>は、これらの課題をまとめて解決するために発展してきたソフトウェアです。</p>
      <p>現在主流の<Term>RDBMS(リレーショナルデータベース管理システム)</Term>は、1970年にIBMのE. F. Coddが提唱した<Term>関係モデル</Term>にもとづきます。データをすべて行と列を持つ「関係(テーブル)」として表現し、<Term>SQL</Term>という共通の問い合わせ言語で操作するという考え方です。MySQL・PostgreSQL・Oracle Database・SQL Serverなど、現在広く使われるDBMSの多くがこのモデルを実装しています。</p>
      <table>
        <thead>
          <tr><th>観点</th><th>ファイル管理(CSV/JSONなど)</th><th>RDBMS</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">同時アクセス</td><td>複数プロセスの同時書き込みで壊れやすい</td><td>ロックや<Term>トランザクション</Term>で安全に調停する</td></tr>
          <tr><td className="hl">整合性</td><td>チェックする仕組みを自前で書く必要がある</td><td><Term>制約(NOT NULL・UNIQUEなど)</Term>をDBMS自身が強制する</td></tr>
          <tr><td className="hl">検索</td><td>基本は全件読み込んで自前でフィルタ</td><td>SQLと<Term>インデックス</Term>で必要な行だけ高速に取得</td></tr>
          <tr><td className="hl">更新の原子性</td><td>途中で失敗すると中途半端な状態が残る</td><td>トランザクションが「全部成功か全部失敗か」を保証</td></tr>
        </tbody>
      </table>

      <Heading num="02">3層スキーマ ― 外部・概念・内部という3つの視点</Heading>
      <p>RDBを設計・運用するとき、データの「構造」は1つではなく、見る立場によって3つの階層(<Term>3層スキーマ</Term>、ANSI/SPARCアーキテクチャ)に分けて考えます。</p>
      <Diagram caption="利用者は外部スキーマだけを見ており、概念スキーマや内部スキーマが変わっても、外部スキーマさえ保てば影響を受けない(データ独立性)">
        <svg viewBox="0 0 620 260" xmlns="http://www.w3.org/2000/svg">
          <text x={310} y={16} fill="#9a9a9a" fontSize="12" textAnchor="middle">外部スキーマ ― アプリ・利用者ごとの見え方</text>
          <rect x={40} y={28} width={250} height={44} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={165} y={54} fill="#f2f2f2" fontSize="11" textAnchor="middle">画面Aが見るビュー(SELECT結果)</text>
          <rect x={330} y={28} width={250} height={44} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={455} y={54} fill="#f2f2f2" fontSize="11" textAnchor="middle">管理画面が見るビュー</text>

          <line x1={165} y1={72} x2={280} y2={110} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowSchema)" />
          <line x1={455} y1={72} x2={340} y2={110} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowSchema)" />

          <text x={310} y={102} fill="#9a9a9a" fontSize="12" textAnchor="middle">概念スキーマ ― 全体の論理構造(エンティティ・関連・制約)</text>
          <rect x={140} y={114} width={340} height={46} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={310} y={141} fill="#f2f2f2" fontSize="11" textAnchor="middle">テーブル定義・正規化された論理設計</text>

          <line x1={310} y1={160} x2={310} y2={192} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowSchema)" />

          <text x={310} y={186} fill="#9a9a9a" fontSize="12" textAnchor="middle">内部スキーマ ― 物理的な保存形式</text>
          <rect x={140} y={198} width={340} height={46} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={310} y={225} fill="#f2f2f2" fontSize="11" textAnchor="middle">テーブルファイル・インデックス・RAID構成</text>

          <defs>
            <marker id="arrowSchema" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f5f5f" />
            </marker>
          </defs>
        </svg>
      </Diagram>
      <p><Term>外部スキーマ</Term>は、アプリや利用者ごとに見えるデータの形(特定のSELECT結果やビュー)です。<Term>概念スキーマ</Term>は、DB全体でただ1つ定義される論理構造で、どんなエンティティがあり、どんな関連・制約を持つかを表します。<Term>内部スキーマ</Term>は、それを実際にディスク上でどう保存するか(ファイル形式・インデックス・冗長構成)という物理的な構造です。</p>
      <p>3層に分ける狙いは<Term>データ独立性</Term>です。概念スキーマに列を1つ足しても、既存のビュー(外部スキーマ)に影響を与えなければアプリ側の修正は不要ですし(<Term>論理的データ独立性</Term>)、インデックスの張り方やストレージ構成(内部スキーマ)を変えても、テーブルの論理構造(概念スキーマ)が変わらなければSQLは書き換えずに済みます(<Term>物理的データ独立性</Term>)。次のページ「<Link href="/dev/database/design">概念設計と正規化</Link>」では概念スキーマの作り方を、その次の「<Link href="/dev/database/physical">物理設計と運用</Link>」では内部スキーマの作り方を、それぞれ詳しく見ていきます。</p>

      <Heading num="03">テーブルの構造 ― 行・列・キーと制約</Heading>
      <p>RDBの最小単位は<Term>テーブル</Term>です。テーブルは横方向の<Term>行(レコード/タプル)</Term>と、縦方向の<Term>列(カラム/属性)</Term>から成る表で、1行が1件のデータ、1列がそのデータの1つの性質に対応します。</p>
      <table>
        <thead>
          <tr><th>用語</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">主キー(Primary Key)</td><td>テーブル内で行を一意に特定する列(複数列の組み合わせでもよい)。<code>NULL</code>不可・重複不可</td></tr>
          <tr><td className="hl">外部キー(Foreign Key)</td><td>他のテーブルの主キーを参照し、テーブル同士を関連づける列</td></tr>
          <tr><td className="hl"><code>NOT NULL</code></td><td>その列に<code>NULL</code>(値なし)を許さない制約</td></tr>
          <tr><td className="hl"><code>UNIQUE</code></td><td>その列の値がテーブル内で重複しないことを保証する制約</td></tr>
          <tr><td className="hl"><code>CHECK</code></td><td>「価格は0以上」のような、値が満たすべき条件を指定する制約</td></tr>
          <tr><td className="hl"><code>DEFAULT</code></td><td>値が指定されなかったときに自動で入る初期値</td></tr>
        </tbody>
      </table>
      <p>これらは<code>CREATE TABLE</code>文で宣言します。次の例は、顧客テーブルと、それを外部キーで参照する注文テーブルです。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`CREATE TABLE customers (
  id            INTEGER PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(255) NOT NULL UNIQUE,
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id            INTEGER PRIMARY KEY,
  customer_id   INTEGER NOT NULL REFERENCES customers(id),
  total_price   INTEGER NOT NULL CHECK (total_price >= 0),
  ordered_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);`}</code>
      </pre>
      <p><code>orders.customer_id</code>が外部キーとして<code>customers.id</code>を参照することで、「存在しない顧客IDの注文は作れない」という整合性がDBMS自身によって保証されます。</p>

      <Heading num="04">テーブル同士の関連 ― 1対1・1対多・多対多</Heading>
      <p>テーブル間の関連は、外部キーがどちら向きに・何個貼られるかによって3つのパターンに分類できます。</p>
      <table>
        <thead>
          <tr><th>関連</th><th>例</th><th>外部キーの持ち方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">1対1</td><td>利用者(users)と、その詳細プロフィール(user_profiles)</td><td>どちらか一方に、もう一方の主キーを<code>UNIQUE</code>な外部キーとして持たせる</td></tr>
          <tr><td className="hl">1対多</td><td>顧客(customers)と、その顧客が行った複数の注文(orders)</td><td>「多」側(orders)に「1」側(customers)の主キーを外部キーとして持たせる</td></tr>
          <tr><td className="hl">多対多</td><td>注文(orders)と商品(products) ― 1つの注文には複数の商品、1つの商品も複数の注文に登場しうる</td><td>どちらのテーブルにも外部キーを直接は持たせられないため、<Term>中間テーブル(注文明細など)</Term>を挟み、2本の1対多に分解する</td></tr>
        </tbody>
      </table>
      <p>多対多だけは、テーブル自体に外部キーを直接持たせる方法がありません。RDBのテーブルは1つの列に複数の値を入れられないため、「注文Aに含まれる商品のIDを配列で持つ」といった表現ができないからです。そこで<Term>中間テーブル(連関エンティティ)</Term>を新たに作り、「注文ID + 商品ID」の組を1行として持たせることで、多対多を「注文への1対多」と「商品への1対多」という2本の1対多に分解します。次のページでは、この中間テーブル(注文明細)を実例に、要件からテーブルを導き出す手順を詳しく見ていきます。</p>

      <Analogy label="💡 たとえるなら">
        1対多は「1人の担任(顧客)が複数の生徒(注文)を受け持つ」ようなものです。多対多は「複数の生徒が複数の部活動を掛け持ちする」関係に近く、生徒テーブルにも部活動テーブルにも相手を直接書き込めないため、「誰がどの部活に入っているか」を記録する名簿(中間テーブル)を別に用意する必要があります。
      </Analogy>

      <Heading num="まとめ">3つの視点とテーブルの基本形</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>RDBMSは制約と同時実行を保証する道具</h4><p>ファイル管理では作り込みづらい整合性・同時アクセス・検索・原子性をDBMS自身が担います。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>3層スキーマで変更の影響を閉じ込める</h4><p>外部・概念・内部の3層に分けることで、片方の変更がもう片方に波及しにくくなります。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>テーブルは行・列・キーで構成される</h4><p>主キーで一意に特定し、外部キーで他テーブルと関連づけ、制約で不正なデータを防ぎます。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>関連は1対1・1対多・多対多の3パターン</h4><p>多対多だけは中間テーブルを挟んで2本の1対多に分解する必要があります。</p></Card>
      </CardGrid>
      <p>次のページ「<Link href="/dev/database/design">概念設計と正規化</Link>」では、業務要件からエンティティを抽出し、ER図を経て、テーブルを段階的に分割していく<Term>正規化</Term>という手順を、この後で見ていきます。</p>

      <RelatedNav>
        <RelatedList>
          <RelatedLink href="/dev/database/design" tag="開発">概念設計と正規化</RelatedLink>
          <RelatedLink href="/dev/database/physical" tag="開発">物理設計と運用</RelatedLink>
          <RelatedLink href="/dev/framework" tag="開発">フレームワーク・ライブラリ</RelatedLink>
          <RelatedLink href="/security/sqli" tag="セキュリティ">SQLインジェクション対策</RelatedLink>
          <RelatedLink href="/ops/data" tag="運用">データ管理 ― バックアップ・マイグレーション</RelatedLink>
        </RelatedList>
      </RelatedNav>

      <DocsFooter>Atlas &middot; 開発 &middot; データベース</DocsFooter>
    </DocsPage>
  );
}
