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
  Diagram,
  RelatedNav,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "通信プロトコル",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>通信プロトコル ― コンピュータ同士の「会話のルール」</h1>
        <Lead>
          「インターネットの歴史」ではTCP/IPが共通言語として採用された経緯を、「OSの仕組み」「メモリの仕組み」「プログラミング言語の仕組み」では1台のコンピュータ内部の動きを見てきました。ここからは再び視点を広げ、コンピュータ同士がどんな共通言語(プロトコル)でやり取りしているのかを、OSI参照モデルとTCP/IPモデルを軸に整理します。
        </Lead>
      </Hero>

      <Heading num="01">プロトコルとは ― 送受信のルール</Heading>
      <p><Term>プロトコル</Term>とは、コンピュータ同士が通信するときに従う「約束事」です。人間同士の会話でも、片方が日本語、もう片方が全く知らない言語で話しかけたら会話は成立しません。コンピュータの通信も同じで、「どんな形式でデータを送るか」「相手にどう返事をするか」を事前に決めておかないと、正しくやり取りできません。</p>
      <p>この約束事は1つではなく、役割ごとにいくつもの層に積み重なっています。代表的な整理の仕方が<Term>OSI参照モデル</Term>(7層)と、実際のインターネットで使われている<Term>TCP/IPモデル</Term>(4層)です。</p>

      <Heading num="02">OSI参照モデル ― 7層の教科書的モデル</Heading>
      <Diagram caption="OSI参照モデル(7層)。データは送信時に上から下へ、受信時に下から上へ流れる">
        <svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg">
          <g fontSize="13" fill="#f2f2f2">
            <rect x={60} y={10} width={520} height={38} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={80} y={34}>7 アプリケーション層</text><text x={420} y={34} fill="#9a9a9a" fontSize="12">HTTP・SMTP・FTP・DNS</text>

            <rect x={60} y={48} width={520} height={38} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={80} y={72}>6 プレゼンテーション層</text><text x={420} y={72} fill="#9a9a9a" fontSize="12">文字コード・暗号化・圧縮</text>

            <rect x={60} y={86} width={520} height={38} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={80} y={110}>5 セッション層</text><text x={420} y={110} fill="#9a9a9a" fontSize="12">接続の開始・維持・終了</text>

            <rect x={60} y={124} width={520} height={38} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={80} y={148}>4 トランスポート層</text><text x={420} y={148} fill="#9a9a9a" fontSize="12">TCP・UDP(ポート番号)</text>

            <rect x={60} y={162} width={520} height={38} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={80} y={186}>3 ネットワーク層</text><text x={420} y={186} fill="#9a9a9a" fontSize="12">IP・ICMP・ARP(パケット)</text>

            <rect x={60} y={200} width={520} height={38} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={80} y={224}>2 データリンク層</text><text x={420} y={224} fill="#9a9a9a" fontSize="12">イーサネット・MACアドレス(フレーム)</text>

            <rect x={60} y={238} width={520} height={38} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={80} y={262}>1 物理層</text><text x={420} y={262} fill="#9a9a9a" fontSize="12">ケーブル・電気信号・電波(ビット)</text>
          </g>
          <text x={320} y={292} fill="#9a9a9a" fontSize="12" textAnchor="middle">上に行くほど人間に近い意味のある情報、下に行くほど電気信号そのものに近い</text>
        </svg>
      </Diagram>

      <p>各層は「自分より下の層がどう動いているか気にせず、自分の役割だけに専念する」ように設計されています。これにより、例えば物理層がケーブルからWi-Fiに変わっても、その上のアプリケーション層(ブラウザなど)は何も変更する必要がありません。</p>

      <Analogy label="💡 たとえるなら">
        手紙を送る手順に例えられます。<strong>アプリケーション層</strong>は「手紙の内容を書く」こと。<strong>プレゼンテーション層</strong>は「読める言語・文字で書く」こと。<strong>セッション層</strong>は「電話で相手の在宅を確認してから郵便を出す」ようなやり取り。<strong>トランスポート層</strong>は「書留にするか普通郵便にするか選ぶ」こと。<strong>ネットワーク層</strong>は「封筒に住所を書く」こと。<strong>データリンク層</strong>は「近所の郵便局までバイク便で運ぶ」こと。<strong>物理層</strong>はその道路や配達員そのものです。
      </Analogy>

      <Heading num="03">TCP/IPモデル ― 実際に使われている4層</Heading>
      <p>OSI参照モデルは体系立った「教科書的なモデル」であるのに対し、実際のインターネットで使われているのはよりシンプルな<Term>TCP/IPモデル</Term>(4層)です。</p>

      <Diagram caption="OSI参照モデルとTCP/IPモデルの対応関係">
        <svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg">
          <g fontSize="12" fill="#9a9a9a" textAnchor="middle">
            <text x={140} y={20}>OSI参照モデル(7層)</text>
            <text x={480} y={20}>TCP/IPモデル(4層)</text>
          </g>
          <g fontSize="11" fill="#f2f2f2">
            <rect x={40} y={30} width={200} height={26} fill="none" stroke="#5f5f5f" /><text x={140} y={47} textAnchor="middle">7 アプリケーション</text>
            <rect x={40} y={56} width={200} height={26} fill="none" stroke="#5f5f5f" /><text x={140} y={73} textAnchor="middle">6 プレゼンテーション</text>
            <rect x={40} y={82} width={200} height={26} fill="none" stroke="#5f5f5f" /><text x={140} y={99} textAnchor="middle">5 セッション</text>
            <rect x={40} y={112} width={200} height={30} fill="none" stroke="#5f5f5f" /><text x={140} y={131} textAnchor="middle">4 トランスポート</text>
            <rect x={40} y={146} width={200} height={30} fill="none" stroke="#5f5f5f" /><text x={140} y={165} textAnchor="middle">3 ネットワーク</text>
            <rect x={40} y={180} width={200} height={26} fill="none" stroke="#5f5f5f" /><text x={140} y={197} textAnchor="middle">2 データリンク</text>
            <rect x={40} y={206} width={200} height={26} fill="none" stroke="#5f5f5f" /><text x={140} y={223} textAnchor="middle">1 物理層</text>
          </g>
          <g fontSize="12" fill="#f2f2f2">
            <rect x={400} y={30} width={200} height={78} fill="none" stroke="#39ff6a" strokeWidth="1.5" /><text x={500} y={73} textAnchor="middle">アプリケーション層</text>
            <rect x={400} y={112} width={200} height={30} fill="none" stroke="#39ff6a" strokeWidth="1.5" /><text x={500} y={131} textAnchor="middle">トランスポート層</text>
            <rect x={400} y={146} width={200} height={30} fill="none" stroke="#39ff6a" strokeWidth="1.5" /><text x={500} y={165} textAnchor="middle">インターネット層</text>
            <rect x={400} y={180} width={200} height={52} fill="none" stroke="#39ff6a" strokeWidth="1.5" /><text x={500} y={209} textAnchor="middle">ネットワーク</text><text x={500} y={223} textAnchor="middle" fontSize="11" fill="#9a9a9a">インターフェース層</text>
          </g>
          <g stroke="#5f5f5f" strokeDasharray="3 3">
            <line x1={240} y1={43} x2={400} y2={69} />
            <line x1={240} y1={69} x2={400} y2={69} />
            <line x1={240} y1={95} x2={400} y2={69} />
            <line x1={240} y1={127} x2={400} y2={127} />
            <line x1={240} y1={161} x2={400} y2={161} />
            <line x1={240} y1={193} x2={400} y2={206} />
            <line x1={240} y1={219} x2={400} y2={206} />
          </g>
          <text x={320} y={270} fill="#9a9a9a" fontSize="11" textAnchor="middle">アプリ〜セッション層をまとめて「アプリケーション層」、データリンク〜物理層をまとめて「ネットワークインターフェース層」として扱う</text>
        </svg>
      </Diagram>

      <p>TCP/IPモデルは、OSIの7層のうちアプリケーション・プレゼンテーション・セッションの3層を「アプリケーション層」としてまとめ、データリンク・物理層を「ネットワークインターフェース層」としてまとめた、より実践的な4層構成です。</p>
      <table>
        <tbody>
          <tr><th>層</th><th>代表的な要素</th></tr>
          <tr><td className="hl">アプリケーション層</td><td>HTTP、DNS、SMTP、FTP</td></tr>
          <tr><td className="hl">トランスポート層</td><td>TCP、UDP</td></tr>
          <tr><td className="hl">インターネット層</td><td>IP、ICMP</td></tr>
          <tr><td className="hl">ネットワークインターフェース層</td><td>イーサネット、Wi-Fi</td></tr>
        </tbody>
      </table>

      <h3>データは層を通るたびに「封筒」に包まれていく</h3>
      <p>送信するデータは、上の層から下の層へ渡るたびに、その層独自の管理情報(ヘッダ)で包まれていきます。これを<Term>カプセル化</Term>と呼びます。受信側ではこの逆に、下から上へ1枚ずつ封筒を開けながらデータを取り出していきます。</p>

      <Analogy label="💡 たとえるなら">
        カプセル化は「ロシアの入れ子人形(マトリョーシカ)」のようなものです。一番小さい人形(本文データ)を、トランスポート層という人形で包み、その上からインターネット層という人形でさらに包み…と、送るたびに包みが増えていきます。受け取った側は、外側から順番に人形を開けていき、最後に本文だけが残ります。
      </Analogy>

      <Heading num="04">主要なプロトコルたち</Heading>

      <h3>IP(Internet Protocol) ― 宛先を決める</h3>
      <p>ネットワーク層(インターネット層)を担当し、通信相手を特定するための住所である<Term>IPアドレス</Term>を扱います。従来の<strong>IPv4</strong>は32ビット(例: <code>192.168.1.1</code>のように8ビットずつ4つに区切った表記)で、割り当てられる組み合わせの数に限りがあります。アドレス枯渇に備え、128ビットでけた違いに広い空間を持つ<strong>IPv6</strong>への移行が進んでいます。</p>

      <h3>ルーター・プライベートIP・グローバルIP・DHCP</h3>
      <p><Term>ルーター</Term>は異なるネットワーク同士をつなぐ機器です。家庭内など閉じたネットワークの中だけで通用する<Term>プライベートIPアドレス</Term>と、インターネット全体で一意に識別できる<Term>グローバルIPアドレス</Term>があり、ルーターがこの間を変換しています。また、機器がネットワークに接続するたびに空いているIPアドレスを自動で割り当てる仕組みを<Term>DHCP</Term>と呼びます。</p>

      <Analogy label="💡 たとえるなら">
        DHCPは「ホテルのチェックイン」です。毎回同じ部屋(IPアドレス)を専有するのではなく、チェックインのたびに空いている部屋番号を割り当ててもらいます。
      </Analogy>

      <h3>TCP と UDP ― トランスポート層の2つの選択肢</h3>
      <p>「インターネットの歴史」でも触れた通り、<strong>TCP</strong>は届いたかどうかを確認し合いながら確実にデータを届ける方式、<strong>UDP</strong>は確認を省いてとにかく速く送る方式です。どちらの方式を使うかは、通信の宛先を表す<Term>ポート番号</Term>とセットで指定されます。</p>
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
      <p>同じ1台のコンピュータでも、IPアドレスが「建物の住所」だとすれば、ポート番号は「部屋番号」にあたります。1つの住所(IP)の中に、Webサーバー用の部屋(80番)、メールサーバー用の部屋(25番)が同時に存在できるイメージです。</p>

      <h3>HTTP ― ポート80/443番に乗って流れるやり取り</h3>
      <p>ポート80番・443番の先で実際にやり取りされているのが<Term>HTTP(HyperText Transfer Protocol)</Term>です。ブラウザ(クライアント)がリクエストを送り、サーバーがレスポンスを返す、という1往復が基本単位になります。</p>
      <p>リクエストの先頭には<Term>メソッド</Term>が指定され、サーバーに何をしてほしいかを伝えます。特によく使うのが<strong>GET</strong>と<strong>POST</strong>です。</p>
      <table>
        <tbody>
          <tr><th>メソッド</th><th>用途</th><th>データの送り方</th></tr>
          <tr><td className="hl">GET</td><td>データの取得(検索・閲覧)</td><td>URLの<Term>クエリ文字列</Term>に付加する。URLに残るため、履歴やブックマークにも残る</td></tr>
          <tr><td className="hl">POST</td><td>データの送信・登録(フォーム送信など)</td><td><Term>リクエストボディ</Term>に格納する。URLには残らず、送れる量の制限も緩い</td></tr>
          <tr><td className="hl">PUT</td><td>データの置き換え(更新)</td><td>リクエストボディに格納する</td></tr>
          <tr><td className="hl">DELETE</td><td>データの削除</td><td>基本的にボディなし</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        GETは「本棚から本を探して読む」ような、相手の状態を変えない操作。POSTは「注文用紙に記入して提出する」ような、相手に何かを作成・変更してもらう操作です。パスワードのようにURLに残ってほしくない情報は、GETではなくPOSTで送るのが基本です。
      </Analogy>

      <h3>Hiddenパラメータ ― フォームに隠れた値</h3>
      <p>HTMLフォームには<code>&lt;input type=&quot;hidden&quot;&gt;</code>という、画面には表示されないが送信データには含まれる項目を仕込めます。これを<Term>Hiddenパラメータ</Term>と呼びます。「どのページから来たか」や「セッションを識別するトークン」など、ユーザーに見せる必要のない値を一緒に送るために使われます。</p>
      <p>ただし「画面に表示されない」だけで、ブラウザの開発者ツールを使えば誰でも中身を確認・書き換えできてしまいます。Hiddenパラメータは値を「隠す」ためではなく「一緒に運ぶ」ための仕組みであり、金額や権限といった重要な値をそのまま信用してはいけない、という点はセキュリティ上の注意点です。</p>

      <h3>MIMEタイプとHTTPレスポンスヘッダ</h3>
      <p>レスポンスボディの中身が「HTMLなのか、画像なのか、JSONなのか」をブラウザに伝えるのが<Term>MIMEタイプ</Term>です。レスポンスヘッダの<code>Content-Type</code>に<code>種類/詳細</code>という形式で入っています。</p>
      <table>
        <tbody>
          <tr><th>MIMEタイプ</th><th>意味</th></tr>
          <tr><td className="hl">text/html</td><td>HTML文書</td></tr>
          <tr><td className="hl">application/json</td><td>JSON形式のデータ</td></tr>
          <tr><td className="hl">image/png・image/jpeg</td><td>画像ファイル</td></tr>
          <tr><td className="hl">text/css・application/javascript</td><td>CSSファイル・JavaScriptファイル</td></tr>
          <tr><td className="hl">application/octet-stream</td><td>種類を特定できない、汎用のバイナリデータ</td></tr>
        </tbody>
      </table>
      <p>MIMEタイプ以外にも、<Term>HTTPレスポンスヘッダ</Term>にはサーバーからブラウザへの様々な指示が含まれます。</p>
      <table>
        <tbody>
          <tr><th>ヘッダ名</th><th>意味</th></tr>
          <tr><td className="hl">Content-Type</td><td>レスポンスボディのMIMEタイプ(例: <code>text/html; charset=utf-8</code>)</td></tr>
          <tr><td className="hl">Content-Length</td><td>レスポンスボディのバイト数</td></tr>
          <tr><td className="hl">Set-Cookie</td><td>ブラウザに保存させたいCookieの値</td></tr>
          <tr><td className="hl">Cache-Control</td><td>ブラウザやCDNにどれくらいキャッシュしてよいかの指示</td></tr>
          <tr><td className="hl">Location</td><td>リダイレクト先のURL(3xxレスポンスとセットで使う)</td></tr>
        </tbody>
      </table>

      <h3>ARPとEthernet ― 同じ建物内(LAN)での通信</h3>
      <p>IPアドレスだけでは、実は同じLAN(構内ネットワーク)内の「どの機器か」までは特定できません。そこで<Term>ARP(Address Resolution Protocol)</Term>がIPアドレスから、機器に固有の識別番号である<Term>MACアドレス</Term>を調べます。この通信は有線LANの標準規格である<Term>Ethernet(イーサネット)</Term>の仕組みの中で行われます。</p>
      <p>IPアドレスは「引っ越すと変わる住所」なのに対し、MACアドレスは機器に工場出荷時から刻み込まれた「変わらない製造番号」のようなものです。</p>

      <h3>ファイアウォールの種類</h3>
      <p>ネットワークの境界で通信を監視・制限する仕組みが<Term>ファイアウォール</Term>です。検査の深さによっていくつかの種類があります。</p>
      <table>
        <tbody>
          <tr><th>種類</th><th>検査する内容</th></tr>
          <tr><td className="hl">パケットフィルタ型</td><td>送信元/宛先IP、ポート番号、プロトコルなどヘッダ情報だけで判断する、最もシンプルな方式</td></tr>
          <tr><td className="hl">ステートフルインスペクション型</td><td>通信の状態(どの通信がやり取りの途中か)を記憶し、文脈に沿った通信かを判断する</td></tr>
          <tr><td className="hl">アプリケーションゲートウェイ(WAF)</td><td>HTTPの中身(送られてきたデータそのもの)まで検査し、SQLインジェクションなどの攻撃を防ぐ</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        パケットフィルタ型は「入館証の色だけを見る警備員」。ステートフルインスペクション型は「誰が今どのフロアにいるかを把握している警備員」。アプリケーションゲートウェイ(WAF)は「持ち物検査までする警備員」です。検査が細かくなるほど、より巧妙な不正を見抜けます。
      </Analogy>

      <Heading num="まとめ">層で分けるからこそ、進化できる</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>役割ごとに層が分かれている</h4><p>OSI参照モデル(7層)・TCP/IPモデル(4層)はどちらも「自分の層の仕事だけに専念する」設計です。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>データは包まれ、開かれる</h4><p>送信時は層を降りるごとにヘッダで包まれ(カプセル化)、受信時は層を上がるごとに開かれます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>住所には2種類ある</h4><p>ネットワーク全体で通用するIPアドレスと、同じLAN内の機器を識別するMACアドレスは役割が異なります。</p></Card>
      </CardGrid>
      <p>最後は、これらのプロトコルが実際にブラウザでURLを開く瞬間、どんな順序で動いているのかを一つずつ追いかける「Webの仕組み」を見ていきましょう。</p>

      <RelatedNav>
        <RelatedList>
          <RelatedLink href="/internet/web" tag="インターネット">Webの仕組み ― URLからレンダリングまで</RelatedLink>
          <RelatedLink href="/dev/language-basics" tag="開発">プログラミング言語の仕組み</RelatedLink>
          <RelatedLink href="/internet/history" tag="インターネット">インターネットの歴史</RelatedLink>
        </RelatedList>
      </RelatedNav>

      <DocsFooter>Atlas &middot; ネットワーク &middot; 通信プロトコル</DocsFooter>
    </DocsPage>
  );
}
