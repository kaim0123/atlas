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
  RelatedNav,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "クライアント管理の実務",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ</Eyebrow>
        <h1>クライアント管理の実務 ― 従業員のPCをどう管理するか</h1>
        <Lead>
          「サーバーの全体像」で見た<Term>クライアント・サーバーモデル</Term>における「クライアント」を、今度は情報システム部門(情シス)の視点から見てみます。従業員が使うPCやスマートフォンは、届いた瞬間から退職・廃棄されるまで、組織として管理し続ける必要がある「資産」です。その一連の流れを時系列で追っていきます。
        </Lead>
      </Hero>

      <Heading num="01">キッティング ― PCが手元に届くまで</Heading>
      <p><Term>キッティング</Term>とは、購入したPCを従業員がすぐ使える状態にするための初期セットアップ作業のことです。箱から出したままのPCには、OSの初期設定はあっても、会社で使うためのアカウント設定・業務アプリ・セキュリティソフト・各種証明書などは入っていません。これらを1台ずつ手作業でインストール・設定していては、台数が増えるほど大きな負担になります。</p>
      <p>そこで多くの組織では、あらかじめ必要なアプリや設定を詰め込んだ「マスターイメージ」を作っておき、それを新しいPCに丸ごと展開する、あるいはMDMなどのツールを使って自動的にアプリを配布・設定する仕組みを整えています。従業員から見れば「電源を入れたら会社のPCとしてすぐ使える」状態を、裏側で情シスが作り込んでいるわけです。</p>

      <Diagram caption="PCが従業員の手元に届くまで(キッティング)から、日常の管理、紛失時の備えまでの流れ">
        <svg viewBox="0 0 640 160" xmlns="http://www.w3.org/2000/svg">
          <rect x={20} y={55} width={140} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={90} y={78} fill="#f2f2f2" fontSize="12" textAnchor="middle">キッティング</text>
          <text x={90} y={94} fill="#9a9a9a" fontSize="10" textAnchor="middle">初期セットアップ</text>

          <line x1={160} y1={80} x2={210} y2={80} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowCl)" />

          <rect x={210} y={30} width={220} height={100} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x={320} y={48} fill="#9a9a9a" fontSize="11" textAnchor="middle">日常の管理</text>
          <text x={320} y={68} fill="#f2f2f2" fontSize="11" textAnchor="middle">資産管理・端末管理・MDM</text>
          <text x={320} y={88} fill="#f2f2f2" fontSize="11" textAnchor="middle">ソフト配布・更新管理</text>
          <text x={320} y={108} fill="#9a9a9a" fontSize="10" textAnchor="middle">(利用期間中、継続的に)</text>

          <line x1={430} y1={80} x2={480} y2={80} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowCl)" />

          <rect x={480} y={55} width={140} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={550} y={78} fill="#f2f2f2" fontSize="12" textAnchor="middle">BitLocker</text>
          <text x={550} y={94} fill="#9a9a9a" fontSize="10" textAnchor="middle">紛失・盗難時の備え</text>

          <defs>
            <marker id="arrowCl" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f5f5f" />
            </marker>
          </defs>
        </svg>
      </Diagram>

      <Heading num="02">資産管理 ― 「何を、誰が、どこで使っているか」を把握する</Heading>
      <p><Term>資産管理</Term>は、組織が保有するPC・スマートフォン・ソフトウェアライセンスなどを台帳として管理することです。型番やシリアル番号、購入日、利用者、設置場所といった情報を記録しておくことで、「このPCはいつ買ったものか」「ライセンスは何台分残っているか」「保証期限はいつまでか」といった問いにすぐ答えられるようにします。監査や税務上の減価償却の管理にも欠かせません。</p>

      <Heading num="03">端末管理・MDM ― PCとスマホの状態を遠隔から把握・制御する</Heading>
      <p><Term>端末管理</Term>は、資産としての台帳管理よりさらに一歩進んで、実際に稼働しているPCの状態(OSのバージョン、インストール済みソフト、セキュリティ設定など)を継続的に把握し、必要に応じて遠隔から制御することを指します。特にスマートフォンやタブレットを対象にしたものを<Term>MDM(Mobile Device Management)</Term>と呼び、遠隔でのアプリ配布・設定変更・紛失時のリモートロックやデータ消去といった操作ができます。近年ではPCも含めて統合的に管理するMDM製品も広く使われています。</p>

      <Heading num="04">ソフト配布と更新管理 ― 全台に同じ状態を保つ</Heading>
      <p>会社で使う業務アプリを1台ずつ手動でインストールするのは非現実的です。<Term>ソフト配布</Term>は、MDMなどの管理ツールを通じて、対象のPC群に一括でアプリケーションをインストール・アップデートする仕組みです。新入社員向けの標準構成の展開や、業務アプリのバージョンアップを組織全体に一斉展開する際に使われます。</p>
      <p>OSやソフトウェアには日々脆弱性が発見されており、それを修正する<Term>パッチ(修正プログラム)</Term>が定期的に配布されます。この適用作業を計画的に行うのが<Term>更新管理(パッチ管理)</Term>です。パッチを放置すれば既知の脆弱性を突かれるリスクが残り、逆に検証なしに即時適用すれば業務アプリとの相性問題で不具合が起きることもあります。多くの組織では、まず一部の端末で検証してから段階的に全台へ展開する運用を取ります。</p>

      <Heading num="05">BitLocker ― 紛失・盗難に備えるディスク暗号化</Heading>
      <p>ノートPCは社外に持ち出される分、紛失や盗難のリスクが常につきまといます。PC自体が第三者の手に渡っても、中のデータを読み取られなければ被害は最小限に抑えられます。<Term>BitLocker</Term>は、Windowsに標準で搭載されているディスク全体の<Term>暗号化</Term>機能で、ディスクの中身をまるごと暗号化しておくことで、正規のログイン情報(または回復キー)なしにはデータを読み出せないようにします。</p>

      <Analogy label="💡 たとえるなら">
        <strong>キッティング</strong>は新しい従業員に机と文房具一式を用意すること、<strong>資産管理</strong>は会社の備品台帳をつけること、<strong>端末管理・MDM</strong>は各机の状態を巡回チェックして必要なら遠隔で調整すること、<strong>ソフト配布・更新管理</strong>は全社員に同じマニュアルの最新版を一斉に配ること、そして<strong>BitLocker</strong>は「机ごと盗まれても、鍵付きの引き出しの中身までは読めない」ようにしておく備えにあたります。
      </Analogy>

      <Aside label="豆知識">
        MDMは元々スマートフォン管理から広まった言葉ですが、現在ではPCも含めた端末全般を対象にする製品が主流です。組織によっては「MDM」と「PC管理ツール」を別々に運用していることもあれば、1つの製品でPC・スマホ両方をまとめて管理していることもあります。
      </Aside>

      <Heading num="まとめ">覚えておきたい3つのポイント</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>PCの管理は「届く前」から「手放すまで」続く</h4>
          <p>キッティングで使える状態を作り、利用期間中は資産管理・端末管理で状態を把握し続けます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>ソフト配布と更新管理で全台の状態を揃える</h4>
          <p>手作業では追いつかない台数のPCに、一括で同じ設定・同じバージョンを届ける仕組みが不可欠です。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>BitLockerは「持ち出す端末」への最後の備え</h4>
          <p>ディスクを暗号化しておくことで、PC本体を紛失・盗難されてもデータの流出を防げます。</p>
        </Card>
      </CardGrid>

      <RelatedNav>
        <RelatedList>
          <RelatedLink href="/internet/server" tag="インターネット">サーバーの全体像</RelatedLink>
          <RelatedLink href="/infra/virtualization" tag="インフラ">仮想化の仕組み</RelatedLink>
          <RelatedLink href="/infra/storage" tag="インフラ">ストレージの仕組み ― NAS・SAN・RAID</RelatedLink>
        </RelatedList>
      </RelatedNav>

      <DocsFooter>Atlas &middot; コンピュータ &middot; クライアント管理の実務</DocsFooter>
    </DocsPage>
  );
}
