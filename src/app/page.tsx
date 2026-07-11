import type { Metadata } from "next";
import { DocsPage, Hero, Eyebrow, Lead, DocsFooter, IndexGrid, IndexCard } from "@/components/docs";

export const metadata: Metadata = {
  title: "Atlas",
};

const sections = [
  { href: "/computer", num: "01", title: "コンピュータ", desc: "OS・メモリの仕組みから、PCハードウェアの基礎・端末管理まで" },
  { href: "/network", num: "02", title: "ネットワーク", desc: "OSI参照モデル・IP・ポートから、配線・機器・Wi-Fiまで" },
  { href: "/internet", num: "03", title: "インターネット", desc: "DNS・Web・メールの仕組みから、サーバー・ISP接続まで" },
  { href: "/dev", num: "04", title: "開発", desc: "言語・フレームワーク・DBから、パッケージ管理・開発環境まで" },
  { href: "/design", num: "05", title: "設計", desc: "パラダイムから9つのアーキテクチャ、設計原則まで" },
  { href: "/test", num: "06", title: "テスト", desc: "静的解析からE2E、パフォーマンス、CI/CDまでの品質計画" },
  { href: "/security", num: "07", title: "セキュリティ", desc: "インジェクション攻撃から認証・認可まで" },
  { href: "/infra", num: "08", title: "インフラ", desc: "仮想化・クラウド(AWS)・ストレージから、基盤の監視・障害切り分けまで" },
  { href: "/ops", num: "09", title: "運用", desc: "デプロイ・監視・パフォーマンスから、分析・コスト・コンプライアンスまで" },
];

export default function Home() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>Atlas</Eyebrow>
        <h1>個人の知識地図</h1>
        <Lead>コンピュータ・ネットワークの基礎から、開発・設計・セキュリティ、インフラ実務まで分野ごとに整理しています。</Lead>
      </Hero>

      <IndexGrid>
        {sections.map((section) => (
          <IndexCard key={section.href} href={section.href} num={section.num} title={section.title}>
            {section.desc}
          </IndexCard>
        ))}
      </IndexGrid>

      <DocsFooter>Atlas</DocsFooter>
    </DocsPage>
  );
}
