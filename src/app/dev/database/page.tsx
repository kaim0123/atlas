import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  DocsFooter,
  IndexGrid,
  IndexCard,
  RelatedNav,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "データベース(開発者向け)",
};

const topics = [
  { href: "/dev/database/physical", title: "物理設計と運用", desc: "インデックス・RAID・レプリケーション・バックアップ・リカバリ" },
  { href: "/dev/database/history", title: "データベースの歴史", desc: "階層型・網型からRDB、そしてNoSQLへの流れ" },
];

const foundations = [
  { href: "/database/basics", title: "役割と種類", desc: "DBMSの役割と、関係DB・NoSQLなど方式の概要" },
  { href: "/database/model", title: "関係モデルと3層スキーマ", desc: "テーブル・キー・関連と、外部・概念・内部スキーマ" },
  { href: "/database/design", title: "ER図と正規化", desc: "要件からテーブルを導く設計手順" },
  { href: "/database/sql", title: "SQLとデータ操作", desc: "DDL・DMLとSELECT・JOIN・集計" },
  { href: "/database/transaction", title: "トランザクションと整合性", desc: "ACID・ロック・ログ・バックアップ" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発</Eyebrow>
        <h1>データベース ― 開発者向けの追補</h1>
        <Lead>
          関係モデル・設計・SQL・トランザクションといった<Term>データベースの土台</Term>は、独立した「データベース」セクションにまとめました。このページは、そこから一歩踏み込んだ<strong>開発・インフラ寄りの追補</strong> ― 物理設計や運用、そして歴史 ― への入口です。まず土台を押さえたい場合は、下の「データベースの基礎」から読み進めてください。
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

      <RelatedNav>
        <RelatedList>
          {foundations.map((f) => (
            <RelatedLink key={f.href} href={f.href} tag="データベース">
              {f.title}
            </RelatedLink>
          ))}
          <RelatedLink href="/security/sqli" tag="セキュリティ">SQLインジェクション対策</RelatedLink>
        </RelatedList>
      </RelatedNav>

      <DocsFooter>Atlas &middot; 開発 &middot; データベース</DocsFooter>
    </DocsPage>
  );
}
