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
  title: "トランザクションと整合性",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>データベース</Eyebrow>
        <h1>トランザクションと整合性 ― まとめて成功か、まとめて取り消しか</h1>
        <Lead>
          銀行の振込は「Aの口座から引く」「Bの口座に足す」という2つの更新が、どちらも成功するか、どちらも取り消されるかでなければ困ります。この「分けられない一連の処理の単位」が<Term>トランザクション</Term>です。ここではその性質(ACID)、同時実行を安全にするロック、障害から回復するログとバックアップを整理します。
        </Lead>
      </Hero>

      <Heading num="01">ACID特性 ― トランザクションが守る4つの約束</Heading>
      <p><Term>トランザクション</Term>は「まとめて成功するか、まとめて取り消すか」の処理単位です。信頼できるトランザクションが満たすべき性質を、頭文字をとって<Term>ACID特性</Term>と呼びます。</p>
      <table>
        <thead>
          <tr><th>頭文字</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><strong>A</strong>tomicity(原子性)</td><td>全体が実行されるか、全体が取り消されるか。中途半端な状態を残さない</td></tr>
          <tr><td className="hl"><strong>C</strong>onsistency(一貫性)</td><td>制約を満たした整合的な状態が、処理の前後で保たれる</td></tr>
          <tr><td className="hl"><strong>I</strong>solation(独立性)</td><td>並行して動くトランザクションが互いに不適切に影響しない</td></tr>
          <tr><td className="hl"><strong>D</strong>urability(永続性)</td><td>コミットした結果は、その後に障害が起きても失われない</td></tr>
        </tbody>
      </table>
      <p>処理を確定させることを<Term>コミット</Term>、途中で取り消して元に戻すことを<Term>ロールバック</Term>と呼びます。原子性は、どこかで失敗したら自動でロールバックすることで守られます。</p>

      <Analogy label="💡 たとえるなら">
        原子性は「送金ボタンを押したら、引き落としと入金の両方が完了するか、どちらも起きなかったことになるか」の保証です。「引き落とされたのに相手に届かない」という中途半端が絶対に起きないよう、DBMSが2つの更新を1つの塊として扱ってくれます。
      </Analogy>

      <Heading num="02">同時実行制御 ― ロックとデッドロック</Heading>
      <p>複数のトランザクションが同じデータを同時に更新すると、一方の更新がもう一方に上書きされるなどの不整合が起こりえます。これを防ぐのが<Term>ロック</Term>です。データを更新する前にロックをかけ、他のトランザクションからの操作を待たせることで、独立性(Isolation)を守ります。</p>
      <table>
        <thead>
          <tr><th>ロックの種類</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">共有ロック(読み取りロック)</td><td>複数が同時に読める。他者の更新はブロックする</td></tr>
          <tr><td className="hl">専有ロック(書き込みロック)</td><td>1つのトランザクションだけが占有し、他者の読み書きをブロックする</td></tr>
        </tbody>
      </table>
      <p>ただしロックには落とし穴があります。トランザクションAがデータ1をロックしてデータ2を待ち、トランザクションBがデータ2をロックしてデータ1を待つ ― 互いに相手のロック解放を待ち続けて動けなくなる状態を<Term>デッドロック</Term>と呼びます。多くのDBMSはデッドロックを検知して、片方のトランザクションを強制的にロールバックさせることで解消します。</p>

      <Aside label="補足">
        独立性をどこまで厳密にするかは<Term>分離レベル(隔離性水準)</Term>で調整でき、緩めるほど並行性は上がりますが、ダーティリードや反復不能読み取りといった副作用が起こりやすくなります。厳密さと性能のトレードオフです。
      </Aside>

      <Heading num="03">障害回復 ― ログとロールフォワード</Heading>
      <p>永続性(Durability)と原子性(Atomicity)を支えるのが<Term>ログ(トランザクションログ)</Term>です。DBMSは、更新の前後の値や操作内容をログに記録してから実際のデータを書き換えます。このログがあることで、障害が起きても2方向の回復ができます。</p>
      <table>
        <thead>
          <tr><th>操作</th><th>使う場面</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ロールバック</td><td>コミット前に失敗したトランザクションを、ログを使って更新前の状態へ<strong>戻す</strong></td></tr>
          <tr><td className="hl">ロールフォワード</td><td>バックアップ復元後に、コミット済みの更新をログから<strong>再実行</strong>して障害直前まで進める</td></tr>
        </tbody>
      </table>
      <p>ロールバックは「取り消し(元に戻す)」、ロールフォワードは「やり直し(進める)」と覚えると混同しにくくなります。</p>

      <Heading num="04">バックアップ ― 完全・差分・増分</Heading>
      <p>ログによる回復と別に、過去のある時点の状態そのものを保存しておくのが<Term>バックアップ</Term>です。取得する範囲によって3方式があります。</p>
      <table>
        <thead>
          <tr><th>方式</th><th>取得する範囲</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">完全バックアップ</td><td>その時点のデータ全体をまるごと</td><td>復元は簡単だが、取得の容量・時間が大きい</td></tr>
          <tr><td className="hl">差分バックアップ</td><td>直前の<strong>完全</strong>バックアップからの変更分</td><td>復元は「完全＋最新の差分」の2つで済む</td></tr>
          <tr><td className="hl">増分バックアップ</td><td>直前の(方式を問わない)バックアップからの変更分</td><td>取得は軽量だが、復元は完全＋すべての増分を順に適用する</td></tr>
        </tbody>
      </table>
      <p>完全バックアップを復元(リストア)したうえで、そこから障害直前までのログを再生(ロールフォワード)すれば、直近の状態まで復旧できます。RAIDによるディスク冗長化やレプリケーションなど、より実務的な物理設計・運用は「<Link href="/dev/database/physical">物理設計と運用</Link>」で詳しく扱います。</p>

      <Heading num="まとめ">一貫性を守る3つの仕組み</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>ACIDがトランザクションの品質を定義する</h4><p>原子性・一貫性・独立性・永続性の4つを満たすことで、安全な更新が保証されます。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>ロックで同時実行を調停する</h4><p>共有・専有ロックで独立性を守り、デッドロックはDBMSが検知して解消します。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ログとバックアップで失わない</h4><p>ロールバック/ロールフォワードとバックアップの組み合わせで、障害から回復します。</p></Card>
      </CardGrid>

      <RelatedNav>
        <RelatedList>
          <RelatedLink href="/database/sql" tag="データベース">SQLとデータ操作</RelatedLink>
          <RelatedLink href="/dev/database/physical" tag="開発">物理設計と運用</RelatedLink>
          <RelatedLink href="/database/advanced/index" tag="データベース">索引とアクセス制御</RelatedLink>
        </RelatedList>
      </RelatedNav>

      <DocsFooter>Atlas &middot; データベース &middot; トランザクションと整合性</DocsFooter>
    </DocsPage>
  );
}
