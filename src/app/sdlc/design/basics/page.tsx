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
  title: "設計の全体像",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発技術</Eyebrow>
        <h1>設計の全体像 ― どう作るかを決める</h1>
        <Lead>
          要件で「何を作るか」が決まったら、次は「どう作るか」を決める設計です。設計は利用者から見える<Term>外部設計</Term>と、内部の仕組みを決める<Term>内部設計</Term>に分かれ、その土台には<Term>モジュール化</Term>の考え方があります。ここでは全体像と代表的な設計手法の位置づけを押さえます。
        </Lead>
      </Hero>

      <Heading num="01">外部設計と内部設計</Heading>
      <p>設計は視点の違いで2段階に分けられます。まず利用者や外部システムから見える部分を決め、次にそれを実現する内部の構造を決めます。</p>

      <table>
        <thead>
          <tr><th>区分</th><th>決めること</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">外部設計</td><td>利用者から見える仕様</td><td>画面レイアウト、帳票、入出力、操作の流れ</td></tr>
          <tr><td className="hl">内部設計</td><td>それを実現する内部構造</td><td>モジュール分割、内部データ構造、DB物理設計</td></tr>
        </tbody>
      </table>

      <Heading num="02">モジュール化 ― 結合度と凝集度</Heading>
      <p>内部設計の要は、システムを適切な単位（<Term>モジュール</Term>）に分けることです。良い分け方の指標が2つあります。モジュール間のつながりを弱くする<Term>結合度</Term>（低いほど良い）と、1つのモジュール内のまとまりを強くする<Term>凝集度</Term>（高いほど良い）です。この考え方は<Link href="/design/principles/cohesion">保守性の基本4原則</Link>で詳しく扱います。</p>

      <Analogy label="💡 たとえるなら">
        モジュール化は「引き出しの整理」に似ています。1つの引き出しには関連するものだけを入れ（高凝集）、引き出し同士が中身を細かく依存し合わないようにする（低結合）と、片付けも入れ替えも楽になります。設計も同じで、変更の影響を小さく閉じ込めるのが狙いです。
      </Analogy>

      <Heading num="03">代表的な設計手法の位置づけ</Heading>
      <p>「どう分けて構造化するか」には、いくつかの代表的なアプローチがあります。それぞれ専用ページで扱うので、ここでは地図として並べておきます。</p>

      <table>
        <thead>
          <tr><th>手法</th><th>着眼点</th><th>詳細</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">構造化設計</td><td>処理の流れ（機能）を中心に分割</td><td><Link href="/sdlc/design/structured">構造化設計</Link></td></tr>
          <tr><td className="hl">データ中心設計</td><td>データ構造を先に決めてから処理を設計</td><td><Link href="/sdlc/design/data-centered">データ中心設計</Link></td></tr>
          <tr><td className="hl">オブジェクト指向設計</td><td>データと処理をまとめたクラスで構造化</td><td><Link href="/sdlc/design/object">オブジェクト指向設計</Link></td></tr>
        </tbody>
      </table>

      <p>これらを可視化する共通言語が<Term>UML</Term>（ユースケース図・クラス図・シーケンス図・状態遷移図など）です。また、システム全体をどう構成するかは<Link href="/sdlc/design/architecture">システム構成とアーキテクチャ</Link>で扱います。</p>

      <Heading num="まとめ">設計の入口で押さえたいこと</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>外部と内部を分ける</h4><p>利用者から見える仕様（外部設計）と、内部の構造（内部設計）を段階的に決めます。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>低結合・高凝集</h4><p>モジュール間は弱く、モジュール内は強くまとめると、変更に強い構造になります。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>手法は着眼点の違い</h4><p>構造化・データ中心・オブジェクト指向は、何を軸に分割するかが異なります。</p></Card>
      </CardGrid>

      <RelatedNav>
        <RelatedList>
          <RelatedLink href="/sdlc/design/structured" tag="開発技術">構造化設計</RelatedLink>
          <RelatedLink href="/sdlc/design/data-centered" tag="開発技術">データ中心設計</RelatedLink>
          <RelatedLink href="/design/principles/cohesion" tag="設計">保守性の基本4原則</RelatedLink>
        </RelatedList>
      </RelatedNav>

      <DocsFooter>Atlas &middot; 開発技術 &middot; 設計の全体像</DocsFooter>
    </DocsPage>
  );
}
