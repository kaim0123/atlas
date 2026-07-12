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
  RelatedNav,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "データ中心設計",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発技術</Eyebrow>
        <h1>データ中心設計 ― データの構造を先に決める</h1>
        <Lead>
          <Link href="/sdlc/design/structured">構造化設計</Link>が「処理の流れ」から出発したのに対し、<Term>データ中心設計</Term>（DOA）は「データの構造」を先に固め、処理はそのデータをどう使うかとして後から設計します。業務で扱うデータは処理よりも変わりにくいため、安定した土台になるという発想です。中心となるのが<Term>ER図</Term>と<Term>正規化</Term>です。
        </Lead>
      </Hero>

      <Heading num="01">データを実体と関連でとらえる ― ER図</Heading>
      <p>データ中心設計では、業務のデータを<Term>実体</Term>（エンティティ）と<Term>関連</Term>（リレーションシップ）でモデル化します。「顧客」「注文」「商品」といったモノが実体、「顧客が注文する」「注文に商品が含まれる」といったつながりが関連です。これを図にしたものが<Term>ER図</Term>で、実体・関連・属性を書き表します。</p>

      <Analogy label="💡 たとえるなら">
        ER図づくりは「登場人物の相関図を描く」作業に似ています。ドラマの脚本（処理）を書く前に、まず誰と誰がどんな関係か（実体と関連）を整理しておくと、話の筋が破綻しにくくなります。業務システムでも、データの相関を先に固めておくと、後から機能が増えても土台が揺らぎません。
      </Analogy>

      <Heading num="02">重複をなくす ― 正規化の入口</Heading>
      <p><Term>正規化</Term>は、データの重複や矛盾を防ぐために、テーブルを適切な形に分割していく手順です。試験で頻出なのは第1〜第3正規形までです。</p>

      <table>
        <thead>
          <tr><th>正規形</th><th>満たす条件</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">第1正規形</td><td>繰り返し項目をなくし、1つのマスに1つの値にする</td></tr>
          <tr><td className="hl">第2正規形</td><td>主キーの一部だけで決まる項目を別テーブルに分ける（部分関数従属の除去）</td></tr>
          <tr><td className="hl">第3正規形</td><td>主キー以外の項目で決まる項目を別テーブルに分ける（推移的関数従属の除去）</td></tr>
        </tbody>
      </table>

      <p>ここでは設計の視点から入口だけを扱います。正規化の手順やER図の詳しい書き方、物理設計への落とし込みは<Link href="/database/design">ER図と正規化</Link>で深掘りします。</p>

      <Heading num="まとめ">データ中心設計で押さえたいこと</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>データを先に固める</h4><p>変わりにくいデータ構造を土台にし、処理は後から設計します。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>実体と関連でモデル化</h4><p>ER図で、モノ（実体）とつながり（関連）を可視化します。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>正規化で重複を防ぐ</h4><p>第1〜第3正規形まで、テーブルを分割して矛盾を避けます。</p></Card>
      </CardGrid>

      <RelatedNav>
        <RelatedList>
          <RelatedLink href="/sdlc/design/basics" tag="開発技術">設計の全体像</RelatedLink>
          <RelatedLink href="/database/design" tag="データベース">ER図と正規化</RelatedLink>
          <RelatedLink href="/design/methodology/data-centric" tag="設計">データ中心設計（設計思想）</RelatedLink>
        </RelatedList>
      </RelatedNav>

      <DocsFooter>Atlas &middot; 開発技術 &middot; データ中心設計</DocsFooter>
    </DocsPage>
  );
}
