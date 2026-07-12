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
  title: "オブジェクト指向設計",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発技術</Eyebrow>
        <h1>オブジェクト指向設計 ― データと処理をまとめて考える</h1>
        <Lead>
          <Link href="/sdlc/design/structured">構造化設計</Link>が処理の流れを軸に分割したのに対し、<Term>オブジェクト指向設計</Term>は「データ」と「そのデータを扱う処理」を1つにまとめた<Term>オブジェクト</Term>を単位に組み立てます。ここでは試験で問われる中心概念 ― クラス・カプセル化・継承・多相性と、それを表す<Term>クラス図</Term> ― を押さえます。
        </Lead>
      </Hero>

      <Heading num="01">クラス・インスタンス・メソッド</Heading>
      <p>オブジェクト指向のいちばん基礎になる3つの言葉です。ものの「設計図」と「実体」、そして「できること」の関係で理解します。</p>

      <table>
        <thead>
          <tr><th>用語</th><th>意味</th><th>例（自動車）</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">クラス</td><td>データと処理をまとめた設計図（型）</td><td>「自動車」という種類の定義</td></tr>
          <tr><td className="hl">インスタンス</td><td>クラスから作られた実体（オブジェクト）</td><td>ナンバー「品川300」の実車</td></tr>
          <tr><td className="hl">メソッド</td><td>オブジェクトが持つ処理（できること）</td><td>「走る」「止まる」</td></tr>
        </tbody>
      </table>

      <p>クラスが内部に持つデータは<Term>属性</Term>（フィールド）、処理は<Term>メソッド</Term>と呼びます。属性とメソッドをひとまとめにして扱うのが、オブジェクト指向の出発点です。</p>

      <Heading num="02">3つの柱 ― カプセル化・継承・多相性</Heading>
      <p>オブジェクト指向を支える代表的な性質が3つあります。試験でも頻出です。</p>

      <table>
        <thead>
          <tr><th>性質</th><th>内容</th><th>ねらい</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">カプセル化</td><td>データを内部に隠し、決められたメソッド経由でのみ操作させる</td><td>不正な変更を防ぎ、内部の作りを外から切り離す</td></tr>
          <tr><td className="hl">継承</td><td>既存クラスの性質を引き継いで新しいクラスを作る</td><td>共通部分を再利用し、差分だけを書く</td></tr>
          <tr><td className="hl">多相性（ポリモーフィズム）</td><td>同じ呼び出しでも、オブジェクトの種類ごとに違う動きをする</td><td>呼ぶ側が種類を意識せずに扱える</td></tr>
        </tbody>
      </table>

      <p>継承では、元になるクラスを<Term>スーパークラス</Term>、引き継いで作る側を<Term>サブクラス</Term>と呼びます。「動物 → 犬・猫」のように、一般的な概念から具体的な概念へと枝分かれさせる関係です。</p>

      <Analogy label="💡 たとえるなら">
        カプセル化は「自動販売機」に似ています。中の在庫や釣り銭の仕組みは見えず、私たちは「ボタンを押す」という決まった操作だけができます。継承は「基本モデルを元に上位グレードを作る」こと、多相性は「同じ“再生ボタン”でも機器ごとに動きが違う」ことにたとえられます。
      </Analogy>

      <Heading num="03">クラス図と汎化 ― 構造を図で表す</Heading>
      <p>クラス同士の関係を表す<Term>UML</Term>の図が<Term>クラス図</Term>です。クラスを「クラス名・属性・メソッド」の3段の箱で描き、線で関係を結びます。継承の関係は<Term>汎化</Term>（一般化）と呼ばれ、サブクラスからスーパークラスへ白抜き三角の矢印で表します。「サブクラスはスーパークラスの一種である（is-a）」という関係を示します。</p>

      <p>要件定義で洗い出した<Link href="/sdlc/requirements/modeling">ユースケース</Link>は、「誰が何をするか」を表します。そこに登場する“もの”をクラスとして抽出していくことで、要件とクラス設計がつながります。</p>

      <p>ここで扱ったのは試験向けの概念です。オブジェクト指向の実装上の考え方やGoFデザインパターンのコード例は、<Link href="/design/paradigm/oop">オブジェクト指向</Link>や<Link href="/design/object">オブジェクトの全体像</Link>で詳しく扱います。</p>

      <Heading num="まとめ">オブジェクト指向設計で押さえたいこと</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>クラスとインスタンス</h4><p>設計図がクラス、そこから作られた実体がインスタンス。属性とメソッドをまとめて持ちます。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>3つの柱</h4><p>カプセル化・継承・多相性が、再利用性と変更のしやすさを支えます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>クラス図で構造化</h4><p>汎化（is-a）などの関係をクラス図で可視化し、要件のユースケースとつなげます。</p></Card>
      </CardGrid>

      <RelatedNav>
        <RelatedList>
          <RelatedLink href="/sdlc/design/basics" tag="開発技術">設計の全体像</RelatedLink>
          <RelatedLink href="/design/paradigm/oop" tag="設計">オブジェクト指向</RelatedLink>
          <RelatedLink href="/design/object" tag="設計">オブジェクトの全体像</RelatedLink>
        </RelatedList>
      </RelatedNav>

      <DocsFooter>Atlas &middot; 開発技術 &middot; オブジェクト指向設計</DocsFooter>
    </DocsPage>
  );
}
