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
  title: "インターネット",
};

const topics = [
  { href: "/internet/history", title: "インターネットの歴史", desc: "つながる網はどのように世界規模になったか" },
  { href: "/internet/dns", title: "DNS", desc: "名前からアドレスへ ― 名前解決とCDN・プロキシ" },
  { href: "/internet/web", title: "Webの仕組み", desc: "URLからレンダリングまで、HTTPとHTTPSの流れ" },
  { href: "/internet/mail", title: "メールの仕組み", desc: "SMTP・POP・IMAPとなりすまし対策" },
  { href: "/internet/isp", title: "ISP接続とCDN", desc: "LANの外へ ― ISP・PPPoE・IPoEで公衆網につなぐ" },
  { href: "/internet/server", title: "サーバーの全体像", desc: "DNS・Web・メール…どんなサーバーがあるか、構築まで" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インターネット</Eyebrow>
        <h1>インターネット</h1>
        <Lead>
          LANの外、世界規模の網へ出る仕組みです。名前解決やWebの流れといったアプリ開発者が知るべき仕組みから、ISP接続やアドレス体系まで、外部とつながり安全に通信する方法を見ていきます。
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
