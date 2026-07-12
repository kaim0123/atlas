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
  title: "テスト技法",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発技術</Eyebrow>
        <h1>テスト技法 ― 網羅の基準と品質の見える化</h1>
        <Lead>
          <Link href="/sdlc/testing/levels">テストの段階</Link>で「どの範囲を検証するか」を押さえたら、次は「どんなケースをどこまで作れば十分か」です。プログラムの内部構造に着目する<Term>ホワイトボックステスト</Term>には、どこまで通したかを測る<Term>網羅率（カバレッジ）</Term>の基準があります。ここでは試験で頻出の網羅基準と、品質を可視化する<Term>バグ曲線</Term>を扱います。
        </Lead>
      </Hero>

      <Heading num="01">ブラックボックスとホワイトボックス</Heading>
      <p>テスト技法は、何に着目するかで2つに大別されます。</p>
      <table>
        <thead>
          <tr><th>技法</th><th>着目点</th><th>代表的な手法</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ブラックボックステスト</td><td>入力と出力（仕様）。内部は見ない</td><td>同値分割・境界値分析・決定表</td></tr>
          <tr><td className="hl">ホワイトボックステスト</td><td>プログラムの内部構造（制御の流れ）</td><td>命令網羅・条件網羅などの網羅基準</td></tr>
        </tbody>
      </table>
      <p>入力・出力に着目する同値分割・境界値分析などは、実務と共通するため<Link href="/test/design-techniques">テスト設計技法</Link>で詳しく扱います。本ページは、試験で問われる<strong>ホワイトボックスの網羅基準</strong>に絞ります。</p>

      <Heading num="02">網羅基準 ― どこまで通せば十分か</Heading>
      <p>ホワイトボックステストでは「テストケース群がプログラムのどこまでを通したか」を網羅率で測ります。基準は緩いものから厳しいものへ、次のように段階があります。判定に <code>if (A and B)</code> のような複合条件があるとき、その扱いで差が出ます。</p>
      <table>
        <thead>
          <tr><th>網羅基準</th><th>満たす条件</th><th>厳しさ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">命令網羅</td><td>すべての命令を少なくとも1回実行する</td><td>最も緩い</td></tr>
          <tr><td className="hl">判定条件網羅（分岐網羅）</td><td>各判定の真・偽の両方を通す</td><td>命令網羅より強い</td></tr>
          <tr><td className="hl">条件網羅</td><td>各条件（A・B）それぞれの真・偽を通す</td><td>分岐と直交する観点</td></tr>
          <tr><td className="hl">複数条件網羅</td><td>条件の真偽の全組み合わせを通す</td><td>最も厳しい</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        網羅基準は「街の道をどこまで歩いて確かめたか」に似ています。命令網羅は「すべての家（命令）を1回は訪ねた」。判定条件網羅は「すべての分かれ道で左右どちらにも進んだ」。複数条件網羅は「交差点の信号（複数の条件）のすべての点灯パターンを試した」。厳しいほど見逃しは減りますが、その分ケース数は増えます。
      </Analogy>

      <p>網羅率は高いほど安心ですが、複数条件網羅はケース数が組み合わせで爆発します。どこまで求めるかは<Link href="/test/strategy">品質戦略</Link>のリスク判断で決めるのが実務です。</p>

      <Heading num="03">誤りの作り込みを測る ― エラー埋込法</Heading>
      <p><Term>エラー埋込法</Term>（バグ埋め込み法）は、あらかじめ既知の誤りをプログラムに故意に埋め込み、テストで何件見つかったかから、まだ潜在している本物の欠陥数を推定する手法です。埋め込んだバグの発見率と、本物のバグの発見率が同じと仮定して総数を見積もります。</p>

      <Heading num="04">バグ曲線とバグ管理図 ― 品質を可視化する</Heading>
      <p>テストがどれだけ進み、品質が収束してきたかを見える化するのが<Term>バグ曲線</Term>（信頼度成長曲線）です。横軸にテスト時間・件数、縦軸に累積バグ発見数をとると、初めは急に増え、やがて緩やかになりS字を描きます。曲線が寝てきた（新たなバグが出にくくなった）ことが、品質が安定してきた目安になります。</p>
      <p><Term>バグ管理図</Term>では、発見したバグ数と解決（修正）したバグ数の推移を並べて管理します。発見に対して解決が追いついているか、未解決が積み上がっていないかを監視できます。</p>

      <Heading num="まとめ">テスト技法で押さえたいこと</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>BBとWBを分ける</h4><p>仕様に着目するブラックボックスと、内部構造に着目するホワイトボックス。網羅基準は後者の観点です。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>網羅は段階で強くなる</h4><p>命令 → 判定条件 → 条件 → 複数条件の順に厳しくなり、ケース数も増えます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>品質を曲線で見る</h4><p>バグ曲線とバグ管理図で、収束の度合いと未解決の残りを可視化します。</p></Card>
      </CardGrid>

      <RelatedNav>
        <RelatedList>
          <RelatedLink href="/test/design-techniques" tag="テスト">テスト設計技法（同値・境界値）</RelatedLink>
          <RelatedLink href="/sdlc/testing/levels" tag="開発技術">テストの段階</RelatedLink>
          <RelatedLink href="/test/strategy" tag="テスト">品質戦略とテストピラミッド</RelatedLink>
        </RelatedList>
      </RelatedNav>

      <DocsFooter>Atlas &middot; 開発技術 &middot; テスト技法</DocsFooter>
    </DocsPage>
  );
}
