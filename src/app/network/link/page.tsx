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
  title: "データリンク層と物理層",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>データリンク層と物理層 ― 隣の機器へ、そしてケーブルで</h1>
        <Lead>
          「<Link href="/network/layers">階層モデル</Link>」の一番下、隣接する機器の間でデータをやり取りするのがデータリンク層、実際に電気や光の信号を流すのが物理層です。前半でMACアドレスやイーサネットといったデータリンク層の仕組みを、後半でその土台となるケーブルや配線の規格を見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">データリンク層 ― 同じLAN内で隣へ届ける</Heading>
      <p>IPアドレスは「ネットワーク全体での住所」ですが、同じLAN(構内ネットワーク)の中で「どの機器か」を直接特定するには、別の識別子が必要です。それが機器に固有の<Term>MACアドレス</Term>で、ネットワーク機器の製造時に割り当てられる48ビットの番号です。IPアドレスが「引っ越すと変わる住所」なのに対し、MACアドレスは工場出荷時から刻み込まれた「変わらない製造番号」にあたります。</p>
      <p>有線LANでこのやり取りを担う標準規格が<Term>Ethernet(イーサネット)</Term>です。データリンク層では、データを<Term>フレーム</Term>という単位にまとめ、宛先MACアドレスを付けて隣の機器へ送ります。</p>

      <h3>ARP ― IPアドレスからMACアドレスを調べる</h3>
      <p>送信側はまず宛先のIPアドレスを知っていますが、同じLAN内で実際に届けるにはMACアドレスが要ります。この「IPアドレス → MACアドレス」の対応を問い合わせる仕組みが<Term>ARP(Address Resolution Protocol)</Term>です。「このIPアドレスの持ち主は誰?」とLAN内に問いかけ、該当する機器が自分のMACアドレスを返します。</p>

      <h3>CSMA/CD ― 昔の共有ケーブルでの譲り合い</h3>
      <p>かつてのイーサネットは1本のケーブルを複数の機器で共有していたため、同時に送信すると信号が衝突(<Term>コリジョン</Term>)しました。そこで「送信前に回線が空いているか確認し、衝突を検知したら時間をずらして送り直す」方式<Term>CSMA/CD</Term>が使われました。現在はスイッチが機器ごとに回線を分けるため衝突自体が起きにくくなっていますが、考え方は試験でよく問われます。</p>

      <h3>VLAN ― 1台のスイッチを論理的に分ける</h3>
      <p><Term>VLAN(Virtual LAN)</Term>は、物理的には1台のスイッチにつながっていても、設定によって複数の独立したネットワークに分ける技術です。配線を変えずに部署ごとにネットワークを分離でき、通信範囲やセキュリティを柔軟に管理できます。</p>

      <Analogy label="💡 たとえるなら">
        IPアドレスが「郵便の住所」なら、MACアドレスは機器の「指紋」。ARPは「この住所の人、指紋を教えて」と尋ねる作業です。VLANは、1つの大部屋にパーティションを立てて複数の会議室として使い分けるようなものです。
      </Analogy>

      <Heading num="02">LANケーブルの規格 ― Cat(カテゴリ)</Heading>
      <p>オフィスや家庭で目にする、両端に透明なコネクタが付いた線が<Term>LANケーブル(より対線ケーブル)</Term>です。見た目はどれも似ていますが、内部の作りによって対応できる速度・距離が<Term>カテゴリ(Cat)</Term>という規格で分けられています。番号が大きいほど新しく、高速・高性能です。</p>
      <table>
        <tbody>
          <tr><th>規格</th><th>最大速度</th><th>最大距離の目安</th><th>備考</th></tr>
          <tr><td className="hl">Cat5e</td><td>1 Gbps</td><td>100m</td><td>長らく標準だった規格。現在も広く現役</td></tr>
          <tr><td className="hl">Cat6</td><td>1 Gbps(条件次第で10 Gbpsも短距離で可)</td><td>100m(10 Gbpsは~55m程度)</td><td>ノイズ対策が強化されている</td></tr>
          <tr><td className="hl">Cat6A</td><td>10 Gbps</td><td>100m</td><td>Cat6の弱点だった長距離10 Gbpsに対応</td></tr>
          <tr><td className="hl">Cat7</td><td>10 Gbps</td><td>100m</td><td>各線対をシールドで覆い、ノイズに強い。コネクタ形状が特殊</td></tr>
          <tr><td className="hl">Cat8</td><td>25~40 Gbps</td><td>30m程度</td><td>データセンターのサーバー間接続など、短距離・超高速向け</td></tr>
        </tbody>
      </table>
      <p>数字だけ見ると「とりあえず一番新しいCat8にしておけば安心」と思いがちですが、Cat8は伝送距離が短く、価格も高いという明確なトレードオフがあります。オフィスの壁内配線のように距離が伸びる用途ではCat6A、サーバーラック内の機器同士のような短距離・超高速な用途ではCat8、という具合に、距離と必要な速度に応じて選ぶのが実務での基本です。</p>

      <Aside label="豆知識">
        ケーブル自体の規格がCat6Aでも、途中の壁の配線パネルや差込口(モジュラージャック)、両端のコネクタ部分がCat5e対応のままでは、その区間全体の性能はより古い規格に引きずられてしまいます。ケーブル1本だけでなく、経路上のすべての部材の規格をそろえる必要があります。
      </Aside>

      <Heading num="03">RJ45 ― コネクタの形状の名前であって、規格ではない</Heading>
      <p>LANケーブルの先端についている透明なプラスチックのコネクタの名称が<Term>RJ45</Term>です。ここで混同しやすいのが、「RJ45対応」という表現があっても、それは<strong>コネクタの形状の話</strong>であり、Cat5eやCat6Aのような<strong>通信速度・性能の規格ではない</strong>という点です。Cat5eのケーブルにもCat6Aのケーブルにも、同じ形状のRJ45コネクタが使われます。</p>
      <p>つまり「RJ45だから速い/遅い」という判断はできず、実際の速度・距離の性能を左右しているのはコネクタの形ではなく、その内部のカテゴリ(Cat)規格の方です。機器の仕様書などで「RJ45ポート」とだけ書かれている場合は、接続できる物理的な形状を示しているにすぎず、対応速度は別途Cat規格やポート自体のスペックを確認する必要があります。</p>

      <Heading num="04">光ファイバー ― 電気ではなく光で送る</Heading>
      <p>LANケーブル(銅線)は電気信号でデータを送りますが、<Term>光ファイバー</Term>はガラスやプラスチックの細い線の中に光を通してデータを送ります。銅線と比べて次のような違いがあります。</p>
      <table>
        <tbody>
          <tr><th></th><th>銅線(LANケーブル)</th><th>光ファイバー</th></tr>
          <tr><td className="hl">伝送距離</td><td>数十~100m程度が実用範囲</td><td>数km~数十kmまで劣化が少ない</td></tr>
          <tr><td className="hl">速度・帯域</td><td>規格ごとに上限がある</td><td>非常に高速・大容量に対応しやすい</td></tr>
          <tr><td className="hl">ノイズの影響</td><td>電磁ノイズの影響を受けやすい</td><td>光を使うため電磁ノイズの影響を受けにくい</td></tr>
          <tr><td className="hl">コスト・取り扱い</td><td>安価で扱いやすい</td><td>高価で、接続・敷設に専門知識が要る</td></tr>
        </tbody>
      </table>
      <p>この特性から、オフィス内の机からスイッチまでといった短距離は銅線のLANケーブル、拠点間やデータセンター間、海底ケーブルのような長距離・大容量が必要な区間は光ファイバー、という使い分けが一般的です。</p>

      <Heading num="05">PoE ― ケーブル1本で電力も送る</Heading>
      <p><Term>PoE(Power over Ethernet)</Term>は、LANケーブルの中を通っている信号線を使って、データ通信と同時に電力も供給できる仕組みです。天井に設置する無線LANアクセスポイントや、ネットワークカメラ、IP電話機などでよく使われます。</p>
      <p>PoE対応の機器であれば、電源コンセントが近くにない場所でも、LANケーブル1本を配線するだけで設置できます。電源工事が不要になる分、設置の自由度が大きく上がるのがメリットです。ただし、給電側の機器(スイッチなど)がPoEに対応している必要があり、給電できる電力量にも上限があるため、大量の機器を1台のPoEスイッチにぶら下げる場合は、合計の消費電力が上限内に収まるか確認が必要です。</p>

      <Analogy label="💡 たとえるなら">
        PoEは「LANケーブルが電源タップも兼ねている」ようなものです。本来は別々に必要な「データの線」と「電源の線」を1本にまとめてしまうことで、機器を置きたい場所の自由度がぐっと広がります。
      </Analogy>

      <Heading num="06">SFP ― 光ファイバーをつなぐ着脱式の変換モジュール</Heading>
      <p>スイッチやルーターの中には、あらかじめRJ45ポートが並んでいるのではなく、四角い小さな差し込み口だけが並んでいる機種があります。ここに挿して使う、着脱可能な小型のトランシーバー(送受信)モジュールが<Term>SFP(Small Form-factor Pluggable)</Term>です。</p>
      <p>SFPモジュール自体にケーブルの種類ごとの端子が付いており、光ファイバー用のSFPを挿せば光の区間に、銅線用のSFPを挿せばLANケーブルの区間に対応できます。つまりスイッチ本体は「差し込み口の規格」だけを決めておき、実際に何のケーブルを使うかはSFPモジュールの選択に委ねる、という柔軟な設計です。データセンターや拠点間接続のように、後から回線の種類や速度を変更する可能性がある場所でよく使われます。</p>

      <Heading num="まとめ">覚えておきたい3つのポイント</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>Cat規格が速度の天井を決める</h4>
          <p>Cat5e~Cat8は数字が大きいほど高速ですが、距離とコストのトレードオフもあるため用途で選びます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>RJ45は形状、Catは性能</h4>
          <p>コネクタの形(RJ45)と通信性能の規格(Cat)は別の話です。両方を混同しないことが重要です。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>光ファイバー・PoE・SFPは目的が違う</h4>
          <p>長距離大容量は光ファイバー、電源配線の省略はPoE、柔軟な接続の切り替えはSFPが担います。</p>
        </Card>
      </CardGrid>

      <p>ケーブルを使わず電波で隣へ届ける無線LANは、次の「無線LAN」で見ていきます。</p>

      <RelatedNav>
        <RelatedList>
          <RelatedLink href="/network/link/wireless" tag="ネットワーク">無線LAN ― Wi-Fiの仕組み</RelatedLink>
          <RelatedLink href="/network/topology" tag="ネットワーク">トポロジと接続装置</RelatedLink>
          <RelatedLink href="/network/layers" tag="ネットワーク">階層モデル</RelatedLink>
        </RelatedList>
      </RelatedNav>

      <DocsFooter>Atlas &middot; ネットワーク &middot; データリンク層と物理層</DocsFooter>
    </DocsPage>
  );
}
