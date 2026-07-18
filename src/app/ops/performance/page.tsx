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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "パフォーマンス",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>運用</Eyebrow>
        <h1>パフォーマンス ― 速く表示する</h1>
        <Lead>
          機能が正しく動いていても、表示が遅ければユーザーは離脱します。「速さ」を感覚ではなく<Term>指標</Term>で測り、キャッシュと画像最適化という2つの主要な手段で改善する、という流れを見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">Core Web Vitals ― 「速さ」を測る3つの指標</Heading>
      <p>Googleが提唱する<Term>Core Web Vitals</Term>は、ユーザーが体感する「速さ」を3つの指標に分解したものです。SEO評価にも直接影響するため、パフォーマンス改善のゴールとして扱われます。</p>

      <table>
        <thead>
          <tr><th>指標</th><th>何を測るか</th><th>良好とされる目安</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">LCP(Largest Contentful Paint)</td><td>最大コンテンツ(画像・見出し等)が表示されるまでの時間</td><td>2.5秒以内</td></tr>
          <tr><td className="hl">INP(Interaction to Next Paint)</td><td>クリック等の操作から画面が反応するまでの遅延</td><td>200ms以内</td></tr>
          <tr><td className="hl">CLS(Cumulative Layout Shift)</td><td>読み込み中にレイアウトがどれだけガタつくか</td><td>0.1未満</td></tr>
        </tbody>
      </table>

      <Aside label="補足:">以前は「INP」の代わりに入力遅延だけを測る「FID(First Input Delay)」が使われていましたが、2024年にINPへ置き換わり、より広い操作全体の応答性を評価するようになりました。</Aside>

      <Heading num="02">キャッシュ戦略 ― 同じ計算・同じ転送を繰り返さない</Heading>
      <p>パフォーマンス改善の中心は「本来不要な処理・転送を省く」ことで、その主な手段が<Term>キャッシュ</Term>です。キャッシュという概念自体の全体像は<Link href="/dev/cache">キャッシュの全体像</Link>で扱っているため、ここではWebサイト運用の文脈で登場する3層を整理します。</p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ブラウザキャッシュ</h4>
          <p>`Cache-Control`ヘッダーで、一度取得した静的ファイル(JS/CSS/画像)をブラウザに保存させ、再訪問時のネットワーク転送を省く。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>CDNキャッシュ</h4>
          <p>オリジンサーバーの手前でCDNがレスポンスを保持し、2人目以降のユーザーにはCDNから即座に返す。地理的に近い拠点から配信されるぶん、往復時間(RTT)も短縮される。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>ビルド時キャッシュ(SSG/ISR)</h4>
          <p>Next.jsのSSG(静的生成)は、リクエストのたびにレンダリングせずビルド時に生成したHTMLを使い回す、最も強力なキャッシュ。ISRは一定間隔で再生成することで「静的な速さ」と「内容の鮮度」を両立する。</p>
        </Card>
      </CardGrid>

      <p>個人向けページを他人に配信してしまう<Term>キャッシュ事故</Term>については、セキュリティの観点から<Link href="/security/cache">キャッシュ制御</Link>ページで扱っています。</p>

      <Heading num="03">画像・アセット最適化</Heading>
      <p>多くのサイトで転送量の大半を占めるのは画像です。適切なフォーマット・サイズ・読み込みタイミングを選ぶだけで、LCPを大きく改善できます。</p>

      <table>
        <thead>
          <tr><th>手段</th><th>効果</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">次世代フォーマット(WebP/AVIF)</td><td>同等の画質でJPEG/PNGよりファイルサイズを大幅に削減する</td></tr>
          <tr><td className="hl">レスポンシブ配信</td><td>画面サイズに応じて複数解像度の画像を用意し、必要な分だけ転送する</td></tr>
          <tr><td className="hl">遅延読み込み(lazy loading)</td><td>画面外の画像は表示直前まで読み込まず、初期表示を軽くする</td></tr>
          <tr><td className="hl">サイズ指定(width/height)</td><td>画像の枠を事前に確保し、読み込み中のレイアウトのガタつき(CLS)を防ぐ</td></tr>
        </tbody>
      </table>

      <p>Next.jsの`next/image`コンポーネントは、この4つを標準機能として提供します。詳細は<Link href="/dev/framework/nextjs">Next.js</Link>ページを参照してください。</p>

      <Analogy label="💡 たとえるなら">
        画像最適化は「引っ越しの荷造り」に似ています。大きな家具をそのまま運ぶ(未圧縮の画像をそのまま配信)のではなく、分解して圧縮パックに詰め(次世代フォーマットへの変換)、必要な部屋の荷物から先に運び(レイアウトに合わせたサイズ配信)、今すぐ使わない荷物は後回しにする(遅延読み込み)ことで、トラック1台(転送量)に収まる量を最小化します。
      </Analogy>

      <Heading num="04">計測ツール</Heading>
      <p>改善は測定してこそ意味を持ちます。<Term>Lighthouse</Term>(Chrome DevTools内蔵)はページを模擬計測してスコア化し、<Term>PageSpeed Insights</Term>は実ユーザーデータ(CrUX)とLighthouseの両方を提示します。実際の訪問者の体感を継続的に追いたい場合は、Real User Monitoring(RUM)ツールで本番トラフィックのCore Web Vitalsを収集します。</p>

      <Heading num="まとめ">測る→キャッシュする→軽くする</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Core Web Vitalsで測る</h4><p>LCP・INP・CLSという体感速度の指標を基準にする。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>キャッシュで転送・処理を省く</h4><p>ブラウザ・CDN・ビルド時の3層で、同じ処理を繰り返さない。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>画像を最適化する</h4><p>フォーマット・サイズ・読み込みタイミングを最適化し、転送量最大の要因に対処する。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/cache" tag="開発">キャッシュの全体像</RelatedLink>
                    <RelatedLink href="/security/cache" tag="セキュリティ">キャッシュ制御</RelatedLink>
                    <RelatedLink href="/dev/framework/nextjs" tag="開発">Next.js</RelatedLink>
                    <RelatedLink href="/ops/analytics" tag="運用">分析・改善</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
