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
  title: "ネットワーク",
};

const topics = [
  { href: "/network/protocols", title: "通信プロトコル", desc: "OSI参照モデルとTCP/IP ― 通信を階層で捉える" },
  { href: "/network/ip", title: "IPアドレスとルーティング", desc: "宛先を決めてパケットを届ける、ネットワーク層の仕事" },
  { href: "/network/port", title: "ポートの全体像", desc: "TCP・UDPとポート番号 ― どのアプリに届けるか" },
  { href: "/network/cabling", title: "ケーブルと規格", desc: "LANケーブル・光ファイバー・コネクタと給電" },
  { href: "/network/devices", title: "ネットワーク機器の役割", desc: "ルーター・スイッチ・ファイアウォールが何をするか" },
  { href: "/network/wifi", title: "Wi-Fiの仕組み", desc: "電波・規格・セキュリティまで、無線LANの実務" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>ネットワーク</h1>
        <Lead>
          複数のコンピュータをつなぐ仕組みを、OSI参照モデルの各層で捉えます。プロトコルの概念からIP・ポート、その上で動く配線・機器・無線まで、下の層から順に見ていきます。
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

      <DocsFooter>Atlas &middot; ネットワーク</DocsFooter>
    </DocsPage>
  );
}
