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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "副作用（Effects）",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; React &middot; Hooks</Eyebrow>
        <h1>副作用（Effects） ― 純粋な描画と、外の世界との境界</h1>
        <Lead>
          コンポーネントの描画は<Link href="/dev/framework/react/functional">純粋</Link>であるべきですが、実際のアプリはサーバー通信・購読・タイマーなど「外の世界」に触れなければ動きません。この純粋でない処理=<Term>副作用</Term>を、描画本体から切り離して置く場所が<code>useEffect</code>です。ここでは「そもそもEffectが要るのか」の見極めから、依存配列とクリーンアップまでを扱います。
        </Lead>
      </Hero>

      <Heading num="01">純粋な描画と副作用の境界</Heading>
      <p>コンポーネント本体(描画)は、propsとstateから見た目を計算するだけの純粋な処理に保ちます。「レンダリングの結果として外部と同期する必要がある処理」― 例えば「この画面が表示されている間だけ、あるチャットルームに接続する」― を担うのが<Term>Effect</Term>です。Effectは描画が終わって画面に反映された<Term>後</Term>に実行されます。</p>

      <Heading num="02">useEffectと依存配列</Heading>
      <p><code>useEffect</code>は「実行したい副作用」と「<Term>依存配列</Term>」を受け取ります。依存配列に並べた値のどれかが前回と変わったときだけ、Effectが再実行されます。空配列<code>[]</code>なら初回だけ、配列を省略すると毎回の描画後に実行されます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`useEffect(() => {
  document.title = \`\${count}件\`;
}, [count]);  // count が変わったときだけ実行`}</code>
      </pre>
      <table>
        <thead>
          <tr><th>依存配列</th><th>実行タイミング</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>[]</code></td><td>初回マウント時のみ</td></tr>
          <tr><td className="hl"><code>[a, b]</code></td><td>aまたはbが変わったとき</td></tr>
          <tr><td className="hl">省略</td><td>毎回の描画後(多くの場合バグの元)</td></tr>
        </tbody>
      </table>

      <Heading num="03">exhaustive-deps ― 使った値は全部依存に入れる</Heading>
      <p>Effectの中で読んだprops・stateは、<Term>すべて依存配列に入れる</Term>のが原則です。入れ忘れると、Effectが古い値を握ったまま更新されない(stale)バグになります。ESLintの<Term>exhaustive-deps</Term>ルールがこの入れ忘れを警告します。警告を消すために配列から削るのではなく、「なぜその値が要らないのか」を考え、要らないなら関数の外に出すか設計を見直します。</p>

      <Heading num="04">クリーンアップ関数</Heading>
      <p>購読・タイマー・接続のように「始めたら終わらせる」必要がある副作用では、Effectから<Term>クリーンアップ関数</Term>を返します。これは、次にEffectが再実行される前と、コンポーネントが消えるときに呼ばれます。開始と後始末を1つのEffectにまとめて書けるのが、この設計の要点です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`useEffect(() => {
  const timer = setInterval(tick, 1000);
  return () => clearInterval(timer);  // 後始末
}, []);

// データ取得は AbortController でキャンセル可能に
useEffect(() => {
  const ctrl = new AbortController();
  fetch(url, { signal: ctrl.signal }).then(/* ... */);
  return () => ctrl.abort();          // 途中でアンマウントされたら中断
}, [url]);`}</code>
      </pre>

      <Heading num="05">Effect vs イベントハンドラ ― どちらに書くか</Heading>
      <p>初心者が最も間違えるのが「副作用は全部useEffect」という思い込みです。判断基準は<Term>きっかけ</Term>です。「ユーザーが操作したから起きる」処理はイベントハンドラに、「画面がこの状態で表示されていること自体から必要になる」同期処理はEffectに置きます。</p>
      <table>
        <thead>
          <tr><th>処理</th><th>置き場所</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">送信ボタンでPOSTする</td><td>イベントハンドラ(ユーザー操作が起点)</td></tr>
          <tr><td className="hl">表示中だけチャットに接続する</td><td>Effect(表示状態との同期)</td></tr>
          <tr><td className="hl">URLが変わったらデータを取り直す</td><td>Effect(外部との同期) ※専用ライブラリ推奨</td></tr>
        </tbody>
      </table>
      <p>なお、Effect内でのデータ取得は「取得の重複」「競合(レースコンディション)」「キャッシュ不在」といった課題を抱えます。実務では<Link href="/dev/framework/react/logic-reuse">Custom Hooks</Link>に切り出すか、TanStack Queryのような専用ライブラリに任せるのが定石です。</p>

      <Heading num="06">useLayoutEffectとStrict Mode</Heading>
      <p>ほとんどのケースは<code>useEffect</code>で足ります。DOMのサイズを測ってから位置を微調整するなど、<Term>画面に見える前に同期的に</Term>行いたい処理だけ<code>useLayoutEffect</code>を使います(ちらつき防止)。ただしブラウザの描画をブロックするため乱用は禁物です。</p>
      <p>開発時の<Term>Strict Mode</Term>では、Effectが「実行→クリーンアップ→再実行」と<Term>二重に走ります</Term>。これはクリーンアップの書き忘れを炙り出すためのテストです。クリーンアップを正しく書いていれば、二重実行でも購読が重複したりせず、正しく動きます。</p>

      <Heading num="07">「Effect内でsetStateしない」原則と例外</Heading>
      <p>Effectの中で、他のstateから計算できる値をsetStateするのは避けます ― それは<Link href="/dev/framework/react/state">派生state</Link>であり、描画中に計算すべきものです。Effect→setState→再描画→Effect…と無駄なループを生みます。例外は「外部システムと同期した結果を取り込む」場合(取得したデータをstateに入れる等)で、これは本来のEffectの役割です。</p>

      <Analogy label="💡 たとえるなら">
        イベントハンドラは「客がボタンを押したから動く自動販売機」、Effectは「開店している間ずっと外の気温に合わせて空調を保つ仕組み」です。前者は操作という明確なきっかけがあり、後者は「開いている状態そのもの」と外界を同期し続けます。そして空調は閉店時に必ず切る ― この後始末がクリーンアップ関数です。切り忘れれば、店を閉じても空調が回り続けます。
      </Analogy>

      <Heading num="まとめ">Effectは外界との同期、後始末までが一組</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>依存配列に使った値を全部入れる</h4><p>入れ忘れはstaleバグ。exhaustive-depsに従う。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>始めたら終わらせる</h4><p>購読・タイマー・接続はクリーンアップ関数で後始末。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>操作起点はハンドラへ</h4><p>「全部useEffect」を疑う。データ取得は専用ライブラリが定石。</p></Card>
      </CardGrid>
      <p>Effectと並ぶもう1つの脱出口、再描画を起こさずに値やDOMへ触れる<Link href="/dev/framework/react/ref">Ref</Link>を次に見ます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/framework/react/ref" tag="開発">Ref</RelatedLink>
            <RelatedLink href="/dev/framework/react/state" tag="開発">Stateと更新</RelatedLink>
            <RelatedLink href="/dev/framework/react/logic-reuse" tag="開発">ロジックを再利用する</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
