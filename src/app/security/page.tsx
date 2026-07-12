import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DocsFooter,
  Analogy,
  IndexGrid,
  IndexCard,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "セキュリティ",
};

const topics = [
  { href: "/security/injection", title: "インジェクション攻撃の基本形", desc: "入力を「命令」として誤解釈させる、すべての脆弱性の入り口" },
  { href: "/security/xss", title: "XSSと出力エスケープ", desc: "ページに悪意あるスクリプトを埋め込まれる攻撃" },
  { href: "/security/sqli", title: "SQLインジェクション対策", desc: "入力値でデータベースへの命令を書き換えられる攻撃" },
  { href: "/security/csrf", title: "CSRF対策", desc: "ログイン中のユーザーに、意図しない操作をさせる攻撃" },
  { href: "/security/auth", title: "認証", desc: "「あなたは誰か」をどう確認するか" },
  { href: "/security/authz", title: "認可", desc: "「何をしてよいか」をどう判定するか" },
  { href: "/security/session", title: "セッションとCookie管理", desc: "「ログイン状態」をどう安全に維持するか" },
  { href: "/security/session-cookie", title: "セッション・Cookieの全体像", desc: "ログイン状態だけの言葉ではない" },
  { href: "/security/token", title: "トークンの全体像", desc: "「何を証明するための紙切れか」で意味が変わる" },
  { href: "/security/identity", title: "認証プロトコルの変遷", desc: "LDAPからPasskeyまで、「誰か」を確かめる仕組みの移り変わり" },
  { href: "/security/cache", title: "キャッシュ制御", desc: "個人向けのページが、他人の画面に表示されてしまう事故" },
  { href: "/security/logging", title: "ログ出力設計", desc: "攻撃の予兆に気づき、事後に調査できる記録の残し方" },
  { href: "/security/headers", title: "セキュリティヘッダ", desc: "配信の入口でヘッダを足し、XSSやクリックジャッキングを抑える" },
  { href: "/security/network-defense", title: "ネットワーク層の防御", desc: "EDR/XDR・ゼロトラスト・IDS/IPSで守る、コードの外側" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>セキュリティ</h1>
        <Lead>
          「攻撃者は何を狙い、開発者は何を守ればいいのか」を、通信の階層ごとに整理してから、Webアプリでよく出会う9つのテーマ、そして「セッション・Cookie」「トークン」という混同しやすい言葉の整理を図解と例え話で見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">多層防御 ― 1つの壁だけに頼らない</Heading>
      <p>セキュリティ対策は「これさえやれば安全」という単一の魔法ではありません。通信は<Term>物理層</Term>から<Term>アプリケーション層</Term>まで複数の階層を経て届くため、それぞれの階層に別々の脅威があり、それぞれに対策が必要です。この考え方を<Term>多層防御(Defense in Depth)</Term>と呼びます。</p>

      <table>
        <thead>
          <tr><th>階層(OSI参照モデル)</th><th>代表的な脅威</th><th>代表的な対策</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">アプリケーション層</td><td>SQLi、XSS、CSRF、認可不備、不正API利用</td><td>入力検証、出力エスケープ、認証・認可、レート制限、WAF</td></tr>
          <tr><td className="hl">プレゼンテーション層</td><td>盗聴・改ざん、不正な符号化</td><td>TLSによる暗号化</td></tr>
          <tr><td className="hl">セッション層</td><td>セッションハイジャック、固定化、なりすまし</td><td>セッション管理、Cookie管理</td></tr>
          <tr><td className="hl">トランスポート層</td><td>ポートスキャン、不正なTCP通信</td><td>不要ポート閉鎖、ファイアウォール、TLS終端の適切な配置</td></tr>
          <tr><td className="hl">ネットワーク層</td><td>不正ルーティング、IPスプーフィング、DDoS</td><td>ファイアウォール、VPN、IDS/IPS、セグメンテーション</td></tr>
          <tr><td className="hl">データリンク層</td><td>不正端末の接続、ARPスプーフィング</td><td>VLAN分割、内部NW分離、ポートセキュリティ</td></tr>
          <tr><td className="hl">物理層</td><td>機器への不正アクセス、ケーブル盗聴</td><td>入退室管理、ラック施錠</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        多層防御は「城の守り方」に似ています。城壁(ネットワーク層の防御)を突破されても、堀(トランスポート層)があり、さらに天守閣の鍵(アプリケーション層の認証・認可)があります。1つの壁が破られても、次の壁が食い止める ― これが「1つの対策に頼らない」ということの意味です。本サイトでは、この中でも開発者が直接コードで対処できる<strong>アプリケーション層</strong>と<strong>セッション層</strong>のテーマを重点的に扱います。
      </Analogy>

      <p>ここから先は、「入力を汚染する攻撃(インジェクション系)」→「ログイン状態を乗っ取る攻撃(CSRF・セッション)」→「誰が・何をしてよいかの判定(認証・認可)」→「周辺の運用観点(キャッシュ・ログ)」という順番で見ていきます。</p>

      <IndexGrid>
        {topics.map((topic, i) => (
          <IndexCard
            key={topic.href}
            href={topic.href}
            num={String(i + 1).padStart(2, "0")}
            title={topic.title}
          >
            {topic.desc}
          </IndexCard>
        ))}
      </IndexGrid>

      <DocsFooter>Atlas &middot; セキュリティ</DocsFooter>
    </DocsPage>
  );
}
