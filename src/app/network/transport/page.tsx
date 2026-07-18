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
  title: "トランスポート層",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>トランスポート層 ― TCPとUDP、そしてポート番号</h1>
        <Lead>
          「<Link href="/network/layers">階層モデル</Link>」で見たトランスポート層は、端末から端末へデータを届ける層です。ここには「確実さ」を優先するTCPと「速さ」を優先するUDPという2つの選択肢があり、どちらを使うかはポート番号とセットで指定されます。
        </Lead>
      </Hero>

      <Heading num="01">TCPとUDP ― 確実さと速さの2択</Heading>
      <p><Term>TCP(Transmission Control Protocol)</Term>は、届いたかどうかを確認し合いながら確実にデータを届ける方式です。相手と事前に接続を確立し(コネクション型)、順序保証・再送によってデータの欠けや入れ替わりを防ぎます。Web(HTTP)やメール送信など、1文字でも欠けたら困る通信に使われます。</p>
      <p>一方の<Term>UDP(User Datagram Protocol)</Term>は、確認を省いてとにかく速く送る方式です。接続の確立をせず(コネクションレス型)、ヘッダも軽いため遅延を抑えられます。多少の欠けよりも遅延の少なさが大事な音声・動画のストリーミングや、DNSの問い合わせのような1往復で済む通信に向いています。</p>

      <table>
        <tbody>
          <tr><th></th><th>TCP</th><th>UDP</th></tr>
          <tr><td className="hl">接続</td><td>コネクション型(事前に確立)</td><td>コネクションレス型</td></tr>
          <tr><td className="hl">信頼性</td><td>順序保証・再送あり</td><td>保証なし(送りっぱなし)</td></tr>
          <tr><td className="hl">速度・軽さ</td><td>確認のぶん重い</td><td>ヘッダが軽く低遅延</td></tr>
          <tr><td className="hl">向く用途</td><td>Web・メール・ファイル転送</td><td>音声・動画・DNS・ゲーム</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        TCPは「配達を確認する書留郵便」、UDPは「ポストに投函するだけの普通郵便」です。書留は確実に届く代わりに手続きが増え、普通郵便は速く手軽な代わりに届いたかは保証されません。
      </Analogy>

      <Heading num="02">ポート番号 ― 1台の中の「部屋番号」</Heading>
      <p>1台のコンピュータは、Webサーバーもメールサーバーも同時に動かせます。そこで「今来た通信がどのアプリ宛てか」を区別するのが<Term>ポート番号</Term>です。<Term>0〜65535</Term>の範囲があり、IPアドレスが「建物の住所」だとすれば、ポート番号は「部屋番号」にあたります。1つの住所(IP)の中に、Webサーバー用の部屋(80番)、メールサーバー用の部屋(25番)が同時に存在できるイメージです。</p>
      <p>どのTCP/UDP通信も、宛先のIPアドレスに加えてこのポート番号を指定することで、正しいアプリケーションへ届きます。よく使われるサービスには、あらかじめ決まった番号(ウェルノウンポート)が割り当てられています。</p>
      <table>
        <tbody>
          <tr><th>ポート番号</th><th>プロトコル</th></tr>
          <tr><td className="hl">80</td><td>HTTP</td></tr>
          <tr><td className="hl">443</td><td>HTTPS</td></tr>
          <tr><td className="hl">21</td><td>FTP</td></tr>
          <tr><td className="hl">22</td><td>SSH</td></tr>
          <tr><td className="hl">25</td><td>SMTP(メール送信)</td></tr>
          <tr><td className="hl">53</td><td>DNS</td></tr>
          <tr><td className="hl">110 / 143</td><td>POP3 / IMAP(メール受信)</td></tr>
        </tbody>
      </table>
      <p>URLの<code>https://example.com:8080</code>のように、コロンに続けて書かれる数字も、この意味のポート番号です(「<Link href="/internet/web">Webの仕組み</Link>」参照)。</p>

      <Aside label="紛らわしい「ポート」">
        同じ「ポート」でも、USBポートのような<strong>物理的な差込口</strong>や、Hexagonal Architectureの<strong>設計上のインターフェース</strong>は、この通信のポート番号とは技術的に無関係です。「テーブル」が家具の机とDBの表を同時に指すのと同じで、言葉が同じでも実体は別物です。設計上のポートは「<Link href="/design/architecture/app/domain-centric">ドメイン中心アーキテクチャ系</Link>」で扱います。
      </Aside>

      <Heading num="まとめ">覚えておきたい3つのポイント</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>TCPは確実、UDPは高速</h4><p>順序保証・再送のTCPと、軽さ・低遅延のUDP。用途で使い分けます。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>ポート番号は部屋番号</h4><p>1台のIPアドレスの中で、どのアプリ宛ての通信かを0〜65535で区別します。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>番号は決まっている</h4><p>80=HTTP、443=HTTPS、25=SMTPなど、主要サービスにはウェルノウンポートがあります。</p></Card>
      </CardGrid>
      <p>次は、このポートの先で実際にやり取りされているHTTPなどのアプリケーション層プロトコルを見ていきましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/network/applications" tag="ネットワーク">アプリケーション層のプロトコル</RelatedLink>
                    <RelatedLink href="/network/layers" tag="ネットワーク">階層モデル</RelatedLink>
                    <RelatedLink href="/internet/web" tag="インターネット">Webの仕組み</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
