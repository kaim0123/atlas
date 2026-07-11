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
  Aside,
  RelatedNav,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "ポートの全体像",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>ポートの全体像 ― 差込口なのか、番号なのか、設計思想なのか</h1>
        <Lead>
          「<Link href="/network/protocols">通信プロトコル</Link>」で見たポート番号のほかにも、USBポートのような物理的な差込口、そしてソフトウェア設計の世界で登場する「ポート」という言葉があります。この3つは見た目が似ているだけで、技術的な実体はまったくの別物です。
        </Lead>
      </Hero>

      <Heading num="01">意味1: 物理ポート ― ケーブルを挿す差込口</Heading>
      <p>最も直感的な意味です。<Term>USBポート</Term>・<Term>DisplayPort</Term>・<Term>LANポート</Term>など、パソコン本体にケーブルを挿し込む実際の端子を指します。目で見て、指で触れる、物理的な「入り口」です。</p>

      <Heading num="02">意味2: ネットワークポート番号 ― 1台の中の「部屋番号」</Heading>
      <p>「<Link href="/network/protocols">通信プロトコル</Link>」で扱った通り、1台のコンピュータが同時に複数の通信を扱えるように、<Term>0〜65535</Term>の番号で通信の宛先を区別する仕組みです。IPアドレスが「建物の住所」なら、ポート番号は「部屋番号」にあたります。HTTPなら80番、HTTPSなら443番というように、サービスごとに使う番号が決まっています。URLの<code>https://example.com:8080</code>のような表記でオリジンの一部になっていたのも、この意味のポートです(「<Link href="/internet/web">Webの仕組み</Link>」参照)。</p>

      <Heading num="03">意味3: ソフトウェア設計の「ポート」 ― ネットワークとは無関係</Heading>
      <p>ここが最大の罠です。「<Link href="/design/architecture/app/domain-centric">ドメイン中心アーキテクチャ系</Link>」で扱った<Term>Hexagonal Architecture(ポート&amp;アダプタ)</Term>における「ポート」は、ドメインが外部の技術(DB・UI・外部APIなど)とやり取りするために自ら定義する<Term>インターフェース</Term>を指す言葉です。通信のポート番号とは何の関係もありません。</p>
      <p>なぜ同じ「ポート」という言葉が使われるのかというと、どちらも「外部とつながるための、決まった形の入り口」というイメージを比喩として借りているだけだからです。比喩の出どころが同じなだけで、技術的なつながりはゼロだと考えてください。</p>

      <table>
        <tbody>
          <tr><th>種類</th><th>何を指すか</th><th>登場する場面</th></tr>
          <tr><td className="hl">物理ポート</td><td>ケーブルを挿す実際の差込口</td><td>パソコン本体・周辺機器</td></tr>
          <tr><td className="hl">ネットワークポート番号</td><td>1台のマシン内で通信の宛先を区別する番号</td><td>TCP/IP通信全般</td></tr>
          <tr><td className="hl">設計上の「ポート」</td><td>ドメインが外部とやり取りするためのインターフェース</td><td>Hexagonal Architecture</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        「テーブル」という言葉が、家具の「机」とデータベースの「表」ほど無関係な意味を同時に持つのと同じ現象です。ポートも、物理的な差込口・通信の部屋番号・設計上のインターフェースという、互いに技術的なつながりのない3つの意味を1つの単語が背負っています。
      </Analogy>

      <Aside label="豆知識">
        「ポートを閉じる」と言えばほぼ確実に意味2(ファイアウォールで特定のネットワークポート番号への通信を遮断する)を指しますが、「ポートを実装する」と言えばほぼ確実に意味3(Hexagonal Architectureのインターフェースを実装する)を指します。動詞と一緒に使われる文脈で、9割方どちらの意味か判別できます。
      </Aside>

      <Heading num="まとめ">覚えておきたい3つのポイント</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>物理ポート</h4><p>ケーブルを挿す、目に見える実際の差込口。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>ネットワークポート番号</h4><p>1台のマシン内で通信の宛先を区別する0〜65535の番号。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>設計上の「ポート」は無関係</h4><p>Hexagonal Architectureのインターフェースを指す言葉で、通信とは技術的なつながりがない。</p></Card>
      </CardGrid>
      <p>これで「コンピュータ基礎」カテゴリは一通り完結です。歴史(コンピュータ・インターネット)、内部構造(OS・メモリ・プログラミング言語)、通信(プロトコル・Web)を一通り見たあと、キャッシュ・サーバー・オブジェクト・ポートという、同じ言葉が文脈によって姿を変える4つの概念を横断的に整理しました。次のカテゴリ「開発基盤」では、実際に手を動かして開発を始めるための道具(ターミナル・パッケージ管理)を扱います。</p>

      <RelatedNav>
        <RelatedList>
          <RelatedLink href="/network/protocols" tag="ネットワーク">通信プロトコル</RelatedLink>
          <RelatedLink href="/internet/web" tag="インターネット">Webの仕組み</RelatedLink>
          <RelatedLink href="/design/architecture/app/domain-centric" tag="設計">ドメイン中心アーキテクチャ系</RelatedLink>
        </RelatedList>
      </RelatedNav>

      <DocsFooter>Atlas &middot; ネットワーク &middot; ポートの全体像</DocsFooter>
    </DocsPage>
  );
}
