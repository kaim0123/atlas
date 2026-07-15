import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  DocsFooter,
  IndexGrid,
  IndexCard,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "開発",
};

const topics = [
  { href: "/dev/workspace", title: "開発環境", desc: "ターミナルとシェル ― 文字でコンピュータと話す" },
  { href: "/dev/language-basics", title: "プログラミング言語の仕組み", desc: "コンパイル・インタプリタ ― 言語はどう動くか" },
  { href: "/dev/language", title: "JavaScript・TypeScript", desc: "実際に書く言語 ― 型と表現力を手に入れる" },
  { href: "/dev/web-basics", title: "Web基礎", desc: "HTML・CSS・DOM ― ブラウザが描く土台" },
  { href: "/dev/runtime", title: "ランタイム", desc: "Node・ブラウザ ― コードが動く実行環境" },
  { href: "/dev/http", title: "HTTP通信", desc: "Fetch API・axios ― JavaScriptからサーバーと話す" },
  { href: "/dev/tooling", title: "パッケージ管理とビルド", desc: "npm・pnpm・Vite ― コードから動くアプリへ" },
  { href: "/dev/environments", title: "環境の全体像", desc: "「環境」という言葉の4つの意味を整理する" },
  { href: "/dev/framework", title: "フレームワーク・ライブラリ", desc: "React・Next.js・Tailwindで組み立てる" },
  { href: "/dev/stack", title: "技術スタックの組み合わせ", desc: "フロント・API・ORM・DB ― 相性で選ぶおすすめ構成" },
  { href: "/dev/implementation", title: "実装", desc: "コーディング標準・命名規則・構造化プログラミング・部品化・デバッグ" },
  { href: "/dev/cache", title: "キャッシュの全体像", desc: "場所や規模が変わっても変わらない、キャッシュの定義" },
  { href: "/sdlc/overview", title: "開発の流れ", desc: "要件定義から保守まで、開発工程の全体像(開発技術セクション)" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発</Eyebrow>
        <h1>開発</h1>
        <Lead>
          コードを書いて動かすための技術と道具を、学ぶ順に並べています。ターミナル・シェルで環境を整えるところから、言語・Web基礎・ランタイム、パッケージ管理、フレームワーク、そして横断的なキャッシュの考え方まで。
        </Lead>
      </Hero>

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

      <DocsFooter>Atlas &middot; 開発</DocsFooter>
    </DocsPage>
  );
}
