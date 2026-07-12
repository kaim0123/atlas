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
  { href: "/network/basics", title: "ネットワークの全体像", desc: "LAN・WAN・パケット交換・転送速度 ― 階層に入る前の地図" },
  { href: "/network/layers", title: "階層モデル", desc: "OSI参照モデルとTCP/IP ― 通信を階層で捉える" },
  { href: "/network/topology", title: "トポロジと接続装置", desc: "ネットワークの形と、ルーター・スイッチなどの機器" },
  { href: "/network/ip", title: "IPアドレスと経路", desc: "住所づけからサブネット・NAT・ルーティングまで" },
  { href: "/network/transport", title: "トランスポート層", desc: "TCP・UDPとポート番号 ― どのアプリに届けるか" },
  { href: "/network/link", title: "データリンク層と物理層", desc: "MAC・イーサネット・ケーブル・光ファイバー・給電" },
  { href: "/network/link/wireless", title: "無線LAN(Wi-Fi)", desc: "電波・規格・セキュリティまで、無線LANの実務" },
  { href: "/network/applications", title: "アプリケーション層", desc: "HTTP・メール・DNS ― 利用者が触れるプロトコル" },
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
