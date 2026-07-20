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
  title: "ユーザーインタフェース",
};

const topics = [
  { href: "/ui/basics", title: "UI・ユーザビリティ・アクセシビリティ", desc: "使いやすさの基本用語と、情報の見せ方" },
  { href: "/ui/gui", title: "GUIの部品", desc: "ウィンドウ・アイコンと、フォームの標準部品" },
  { href: "/ui/design", title: "画面設計と入力チェック", desc: "画面構成・入力値の検査・コード設計" },
  { href: "/ui/web", title: "Web UIデザイン", desc: "スタイルシート・ワイヤーフレーム・レスポンシブ" },
  { href: "/ui/hcd", title: "人間中心設計と評価", desc: "ユニバーサルデザイン・WCAG・ユーザビリティ評価" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ユーザーインタフェース</Eyebrow>
        <h1>ユーザーインタフェース</h1>
        <Lead>
          人がシステムを使うときの「触れる部分」の設計です。使いやすさ(ユーザビリティ)や誰もが使える配慮(アクセシビリティ)といった基本用語から、GUI部品、画面設計、Web UI、そして利用者を中心に据える設計と評価まで、順に見ていきます。
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

      <DocsFooter />
    </DocsPage>
  );
}
