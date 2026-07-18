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
  title: "アプリケーション層のプロトコル",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>アプリケーション層のプロトコル ― HTTP・メール・名前解決</h1>
        <Lead>
          「<Link href="/network/transport">トランスポート層</Link>」のTCP/UDPとポート番号の上で、利用者が直接触れるプロトコルが動いています。ここではその代表であるHTTPを中心に、メールやDNSなどアプリケーション層のプロトコルの入口を整理します。より詳しい通信手順は「インターネット」セクションへ委ねます。
        </Lead>
      </Hero>

      <Heading num="01">アプリケーション層のプロトコルたち</Heading>
      <p>アプリケーション層には、用途ごとにさまざまなプロトコルがあります。Webページのやり取りには<Term>HTTP/HTTPS</Term>、メールの送信には<Term>SMTP</Term>、受信には<Term>POP3/IMAP</Term>、ドメイン名からIPアドレスを調べるには<Term>DNS</Term>、機器へIPアドレスを自動で割り当てるには<Term>DHCP</Term>、ファイル転送には<Term>FTP</Term>、遠隔操作には<Term>Telnet/SSH</Term>が使われます。いずれもトランスポート層のポート番号に紐づいて動きます。</p>

      <Heading num="02">HTTP ― リクエストとレスポンスの1往復</Heading>
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

      <Aside label="くわしくは">
        HTTPS(TLS)による暗号化・証明書の通信手順や、URLを開いてから画面が表示されるまでの一連の流れは「<Link href="/internet/web">Webの仕組み</Link>」で、DNSによる名前解決は「<Link href="/internet/dns">DNS</Link>」で詳しく扱います。
      </Aside>

      <Heading num="03">メールのプロトコル ― 送信と受信で役割が違う</Heading>
      <p>メールは、送る側と受け取る側で使うプロトコルが分かれています。<Term>SMTP</Term>はメールを送信・転送するためのプロトコル(ポート25など)、<Term>POP3</Term>と<Term>IMAP</Term>はメールサーバーから手元にメールを受信するためのプロトコル(ポート110/143)です。POP3が端末にダウンロードして管理するのに対し、IMAPはサーバー上のメールを複数端末から同じように見られる点が違います。メール本文に画像や添付ファイルなど多様なデータを載せる仕組みが<Term>MIME</Term>です。</p>

      <Aside label="くわしくは">
        メールの配送経路や迷惑メール対策(SPF・DKIM・DMARC)などの運用面は「<Link href="/internet/mail">メールの仕組み</Link>」で扱います。
      </Aside>

      <Heading num="まとめ">覚えておきたい3つのポイント</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>HTTPはリクエスト/レスポンス</h4><p>メソッド(GET/POSTなど)で「何をしてほしいか」を伝え、サーバーがレスポンスを返します。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>MIMEタイプで中身を伝える</h4><p>レスポンスヘッダのContent-Typeが、ボディがHTMLか画像かJSONかをブラウザに知らせます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>メールは送信と受信で別</h4><p>送信はSMTP、受信はPOP3/IMAP。用途で使うプロトコルが分かれています。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/internet/web" tag="インターネット">Webの仕組み</RelatedLink>
                    <RelatedLink href="/internet/mail" tag="インターネット">メールの仕組み</RelatedLink>
                    <RelatedLink href="/network/transport" tag="ネットワーク">トランスポート層</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
