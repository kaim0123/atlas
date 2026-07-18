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
  Diagram,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "IPアドレスと経路",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>IPアドレスと経路 ― 住所づけからルーティングまで</h1>
        <Lead>
          「<Link href="/network/layers">階層モデル</Link>」で見たネットワーク層(インターネット層)の主役がIPアドレスです。まず試験でも問われる基礎(IPv4/IPv6・グローバル/プライベート・DHCP)を押さえ、その上で実務で使うサブネット設計・NAT・診断コマンドへと進みます。
        </Lead>
      </Hero>

      <Heading num="01">IPアドレスとは ― ネットワーク上の住所</Heading>
      <p><Term>IPアドレス</Term>は、通信相手を特定するためのネットワーク上の「住所」です。従来の<Term>IPv4</Term>は32ビットで、<code>192.168.1.1</code>のように8ビットずつ4つに区切って表記します。組み合わせは約43億通りで、世界的なアドレス枯渇に備え、128ビットでけた違いに広い空間を持つ<Term>IPv6</Term>への移行が進んでいます。</p>
      <p>用途によって2種類に分かれます。インターネット全体で一意に通用するのが<Term>グローバルIPアドレス</Term>、家庭や社内など閉じたネットワークの中だけで通用するのが<Term>プライベートIPアドレス</Term>(例: <code>192.168.x.x</code>)です。プライベートIPはそのままではインターネットに出られず、後述のNATでグローバルIPに変換されます。また、機器がネットワークに接続するたびに空いているIPアドレスを自動で割り当てる仕組みを<Term>DHCP</Term>と呼びます。</p>

      <Analogy label="💡 たとえるなら">
        グローバルIPは「郵便が届く正式な住所」、プライベートIPは「社内の内線番号や座席番号」です。内線番号のままでは外から郵便は届かず、代表住所(グローバルIP)を経由する必要があります。DHCPは「出社のたびに空いている席を割り当てるフリーアドレス制」のようなものです。
      </Analogy>

      <Heading num="02">サブネットとCIDR ― ネットワークをどう「区切る」か</Heading>
      <p>1つのネットワークに機器を無制限につなぐのではなく、部署やフロアといった単位でネットワークを小さく区切ることを<Term>サブネット化(サブネッティング)</Term>と呼びます。区切ることで、通信の混雑を抑えたり、トラブルの影響範囲を限定したりできます。</p>

      <h3>サブネットマスクとCIDR表記</h3>
      <p>IPアドレスのうち、どこまでが「ネットワークを識別する部分(ネットワーク部)」で、どこからが「そのネットワーク内の機器を識別する部分(ホスト部)」かを表すのが<Term>サブネットマスク</Term>です。<code>192.168.1.0/24</code>のように、IPアドレスのあとにスラッシュと数字を続けて書く方式を<Term>CIDR(サイダー)表記</Term>と呼び、その数字は「先頭から何ビットがネットワーク部か」を表します。</p>
      <p>例えば<code>192.168.1.0/24</code>の場合、32ビットのうち先頭24ビットがネットワーク部です。これをサブネットマスクの形で書くと<code>255.255.255.0</code>になり、残りの8ビットがそのネットワーク内の機器に割り当てられるホスト部になります。8ビットで表現できる組み合わせは256個ですが、先頭(ネットワークアドレス)と末尾(ブロードキャストアドレス)は機器に割り当てられないため、実際に使えるのは254個です。</p>

      <table>
        <tbody>
          <tr><th>CIDR表記</th><th>サブネットマスク</th><th>ホスト部のビット数</th><th>割当可能な機器数</th></tr>
          <tr><td className="hl">/30</td><td>255.255.255.252</td><td>2</td><td>2(拠点間の専用回線などに使用)</td></tr>
          <tr><td className="hl">/24</td><td>255.255.255.0</td><td>8</td><td>254</td></tr>
          <tr><td className="hl">/16</td><td>255.255.0.0</td><td>16</td><td>65,534</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        CIDR表記は「郵便番号の桁数」に似ています。桁数が多いほど絞り込まれた狭い地域を指し、桁数が少ないほど広い地域をまとめて指します。<code>/24</code>は「町名まで」、<code>/16</code>は「市区までしか区切っていない」ようなイメージです。
      </Analogy>

      <Heading num="03">デフォルトゲートウェイとルーティング ― 次にどこへ渡すか</Heading>
      <p>同じサブネット内の機器同士は直接通信できますが、別のネットワークにいる相手と通信するには、いったん「出口」を経由する必要があります。この出口の役割を果たす機器のアドレスが<Term>デフォルトゲートウェイ</Term>です。多くの家庭用ネットワークでは、ルーターのLAN側アドレス(例: <code>192.168.1.1</code>)がこれにあたります。</p>

      <h3>ルーティングテーブル ― 「次にどこへ渡すか」の一覧表</h3>
      <p>ルーターや各機器のOSは、内部に<Term>ルーティングテーブル</Term>という一覧表を持っています。「宛先のネットワークがどこか」に応じて「次にどの機器へパケットを渡すか」を決めるための表で、一致する行が見つからない宛先は、最終的にデフォルトゲートウェイへ送られます。</p>

      <table>
        <tbody>
          <tr><th>宛先ネットワーク</th><th>ゲートウェイ</th><th>用途</th></tr>
          <tr><td className="hl">192.168.1.0/24</td><td>(直接接続)</td><td>同じサブネット内は経由なしで直接届く</td></tr>
          <tr><td className="hl">0.0.0.0/0</td><td>192.168.1.1</td><td>どの行にも一致しない宛先はすべてここ(デフォルトルート)へ</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        ルーティングテーブルは、交差点に立つ標識のようなものです。「この行き先ならこちらの道」と決まった案内がなければ、とりあえず「幹線道路(デフォルトゲートウェイ)」へ進むよう指示されます。
      </Analogy>

      <Heading num="04">NAT ― プライベートIPとグローバルIPの変換</Heading>
      <p>家庭やオフィスの中では、ルーターの配下にある機器へ<Term>プライベートIPアドレス</Term>(例: <code>192.168.1.10</code>)が割り当てられています。しかしインターネット上で一意に通用するのは<Term>グローバルIPアドレス</Term>だけです。この変換を担うのが<Term>NAT(Network Address Translation)</Term>です。</p>
      <p>例えば社内の機器<code>192.168.1.10</code>がWebサイトへアクセスするとき、ルーターは送信元アドレスを自分のグローバルIPアドレス(例: <code>203.0.113.5</code>)に書き換えて外部へ送信します。応答が返ってくると、ルーターは「どの内部機器からの通信だったか」を対応表をもとに、正しい内部機器へ届け直します。ポート番号まで使って複数の内部機器を同時に区別する方式は、特に<Term>NAPT(IPマスカレード)</Term>と呼ばれます。</p>

      <Diagram caption="送信元IPを書き換えて外部と通信するNATの仕組み(模式図)">
        <svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
          <rect x={20} y={20} width={220} height={210} fill="none" stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 3" />
          <text x={130} y={40} fill="#9a9a9a" fontSize="12" textAnchor="middle">社内LAN</text>

          <rect x={50} y={60} width={160} height={50} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={130} y={82} fill="#f2f2f2" fontSize="13" textAnchor="middle">PC A</text>
          <text x={130} y={100} fill="#9a9a9a" fontSize="11" textAnchor="middle">192.168.1.10</text>

          <rect x={50} y={150} width={160} height={50} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={130} y={172} fill="#f2f2f2" fontSize="13" textAnchor="middle">PC B</text>
          <text x={130} y={190} fill="#9a9a9a" fontSize="11" textAnchor="middle">192.168.1.11</text>

          <rect x={280} y={105} width={160} height={60} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={360} y={128} fill="#f2f2f2" fontSize="13" textAnchor="middle">ルーター(NAT)</text>
          <text x={360} y={146} fill="#9a9a9a" fontSize="11" textAnchor="middle">203.0.113.5</text>

          <rect x={500} y={105} width={120} height={60} fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={560} y={128} fill="#f2f2f2" fontSize="13" textAnchor="middle">インター</text>
          <text x={560} y={146} fill="#f2f2f2" fontSize="13" textAnchor="middle">ネット</text>

          <line x1={210} y1={85} x2={280} y2={125} stroke="#39ff6a" strokeWidth="1" />
          <line x1={210} y1={175} x2={280} y2={145} stroke="#39ff6a" strokeWidth="1" />
          <line x1={440} y1={135} x2={500} y2={135} stroke="#39ff6a" strokeWidth="1" />

          <text x={320} y={230} fill="#9a9a9a" fontSize="11" textAnchor="middle">送信元IPを192.168.1.10 → 203.0.113.5に書き換えて送信</text>
        </svg>
      </Diagram>

      <Analogy label="💡 たとえるなら">
        NATは会社の郵便室のようなものです。社員それぞれの席(プライベートIP)は社外には知られていませんが、外部への発送はすべて会社の代表住所(グローバルIP)から行われます。返信が届くと、郵便室が宛先を見て正しい社員の席まで配ります。
      </Analogy>

      <Heading num="05">つながらないときに使う診断コマンド</Heading>
      <p>「インターネットにつながらない」というトラブルが起きたとき、闇雲に再起動するのではなく、どの段階でつまずいているかを切り分けるためのコマンド群があります。</p>

      <table>
        <tbody>
          <tr><th>コマンド</th><th>主なOS</th><th>何を調べるか</th></tr>
          <tr><td className="hl">ping</td><td>共通</td><td>相手に到達できるか、応答速度はどれくらいか</td></tr>
          <tr><td className="hl">ipconfig</td><td>Windows</td><td>自分のIPアドレス・サブネットマスク・デフォルトゲートウェイを確認する</td></tr>
          <tr><td className="hl">ifconfig</td><td>macOS / Linux</td><td>ipconfigに相当。自分のネットワーク設定を確認する</td></tr>
          <tr><td className="hl">tracert / traceroute</td><td>Windows / macOS・Linux</td><td>相手までの経路上、どの中継地点で止まっているかを確認する</td></tr>
          <tr><td className="hl">netstat</td><td>共通</td><td>自分のマシンが今どんな通信(ポート)を開いているかを確認する</td></tr>
          <tr><td className="hl">nslookup</td><td>共通</td><td>ホスト名からIPアドレスへの変換(DNS)結果を確認する</td></tr>
          <tr><td className="hl">dig</td><td>macOS / Linux</td><td>nslookupより詳細なDNS情報を確認する</td></tr>
        </tbody>
      </table>

      <Aside label="豆知識">
        DNSの名前解決そのものの仕組みは「<Link href="/internet/dns">DNS</Link>」で詳しく扱っています。nslookup・digは、その仕組みが実際に正しく動いているかを手元で確認するためのコマンドです。
      </Aside>

      <Heading num="まとめ">覚えておきたい3つのポイント</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>CIDRは「区切り方の言語」</h4>
          <p><code>/24</code>のような表記で、ネットワーク部とホスト部の境界を表します。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>ゲートウェイとルーティングは「出口の判断」</h4>
          <p>別ネットワークへの通信は、ルーティングテーブルに従って出口(デフォルトゲートウェイ)へ渡されます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>NATは住所の使い回し</h4>
          <p>複数の内部機器が1つのグローバルIPを共有し、対応表(ポート番号)で区別されます。</p>
        </Card>
      </CardGrid>
      <p>ここまでで、住所づけ(IP)から経路の判断(ルーティング・NAT)までを見てきました。次は、その1つ上でデータの届け先アプリを選ぶトランスポート層へ進みましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/network/transport" tag="ネットワーク">トランスポート層 ― TCPとUDP</RelatedLink>
                    <RelatedLink href="/network/layers" tag="ネットワーク">階層モデル</RelatedLink>
                    <RelatedLink href="/network/topology" tag="ネットワーク">トポロジと接続装置</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
