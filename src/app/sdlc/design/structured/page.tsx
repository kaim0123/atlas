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
  title: "構造化設計",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発技術</Eyebrow>
        <h1>構造化設計 ― 処理の流れを中心に分割する</h1>
        <Lead>
          <Term>構造化設計</Term>は、システムを「処理（機能）の流れ」に着目して分割していく設計手法です。データの流れを<Term>DFD</Term>で描き、処理を段階的に細かくしていき、最後にプログラムのモジュール構造へ落とし込みます。試験で問われる図の種類と、代表的な分割技法を押さえましょう。
        </Lead>
      </Hero>

      <Aside label="⚠️ 混同に注意">
        名前が似ていますが、ここで扱うのは構造化<strong>設計</strong>（どんなモジュール構造にするか）です。順次・分岐・反復の3構造でロジックを書く構造化<strong>プログラミング</strong>は実装側の話で、<Link href="/design/paradigm/structured">構造化パラダイム</Link>で扱います。
      </Aside>

      <Heading num="01">流れを描く図</Heading>
      <p>構造化設計では、処理やデータの流れを図で表現します。代表的なものは次の4つです。</p>

      <table>
        <thead>
          <tr><th>図</th><th>表すもの</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">流れ図（フローチャート）</td><td>処理の手順を、順次・分岐・反復の記号でたどる</td></tr>
          <tr><td className="hl">DFD（データフロー図）</td><td>データがどこから来て、どの処理を経て、どこへ流れるか</td></tr>
          <tr><td className="hl">状態遷移図</td><td>「今どの状態か」と、イベントによる状態の移り変わり</td></tr>
          <tr><td className="hl">決定表（デシジョンテーブル）</td><td>条件の組み合わせと、それぞれに対する動作を表で整理</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        DFDは「工場のベルトコンベア図」に似ています。原材料（入力データ）がどの機械（処理）を通り、途中でどんな在庫（データストア）に置かれ、最終製品（出力）として出ていくか。人ではなく「モノの流れ」だけを描くことで、処理の抜けや無駄が見えてきます。
      </Analogy>

      <Heading num="02">段階的に詳しくする ― 段階的詳細化</Heading>
      <p><Term>段階的詳細化</Term>（トップダウン設計）は、まず大きな処理のかたまりを描き、それを少しずつ細かい処理へ分解していく進め方です。いきなり細部から作るのではなく、全体の骨組みを決めてから中身を詰めるため、見通しよく設計できます。</p>
      <p>データ構造の形をもとに処理構造を導く技法もあります。<Term>ジャクソン法</Term>は入出力データの構造からプログラム構造を導き、<Term>ワーニエ法</Term>は入力データの集合の構造に着目して設計します。いずれも「データの形が処理の形を決める」という発想です。</p>

      <Heading num="03">モジュールへ分割する ― STS分割・TR分割</Heading>
      <p>DFDで描いた処理を、実際のモジュール構造へ落とし込むときの代表的な分割法です。</p>

      <table>
        <thead>
          <tr><th>分割法</th><th>考え方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">STS分割</td><td>処理を「入力（Source）→変換（Transform）→出力（Sink）」の流れで3つに分ける</td></tr>
          <tr><td className="hl">TR分割（トランザクション分割）</td><td>入力の種類（取引の種類）ごとに処理を振り分けて分割する</td></tr>
          <tr><td className="hl">共通機能分割</td><td>複数の処理で使う共通部分を、独立したモジュールとして切り出す</td></tr>
        </tbody>
      </table>

      <p>こうして分割したモジュールは、<Link href="/sdlc/design/basics">設計の全体像</Link>で見た「低結合・高凝集」を満たすほど、変更に強い構造になります。</p>

      <Heading num="まとめ">構造化設計で押さえたいこと</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>流れを図にする</h4><p>流れ図・DFD・状態遷移図・決定表で、処理とデータの流れを可視化します。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>大きく描いて細かくする</h4><p>段階的詳細化で全体の骨組みから中身へ。ジャクソン法・ワーニエ法はデータ構造起点。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>流れをモジュールに落とす</h4><p>STS分割・TR分割・共通機能分割で、DFDを実装単位へ分けます。</p></Card>
      </CardGrid>

      <RelatedNav>
        <RelatedList>
          <RelatedLink href="/sdlc/design/basics" tag="開発技術">設計の全体像</RelatedLink>
          <RelatedLink href="/design/paradigm/structured" tag="設計">構造化（プログラミング）</RelatedLink>
          <RelatedLink href="/sdlc/design/data-centered" tag="開発技術">データ中心設計</RelatedLink>
        </RelatedList>
      </RelatedNav>

      <DocsFooter>Atlas &middot; 開発技術 &middot; 構造化設計</DocsFooter>
    </DocsPage>
  );
}
