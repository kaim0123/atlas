import type { Metadata } from "next";
import Link from "next/link";
import { DocsPage, Hero, Eyebrow, Lead, DocsFooter } from "@/components/docs";
import { sections, type NavNode } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Atlas",
};

// 子孫を辿って最初のリンク先を返す(グループ自体にhrefが無い場合の遷移先)
function firstHref(node: NavNode): string | undefined {
  if (node.href) return node.href;
  for (const child of node.children ?? []) {
    const href = firstHref(child);
    if (href) return href;
  }
  return undefined;
}

export default function Home() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>Atlas</Eyebrow>
        <h1>知識地図</h1>
        <Lead>
          コンピュータ・ネットワークの基礎から、開発・設計・セキュリティ、インフラ実務まで分野ごとに整理しています。
        </Lead>
      </Hero>

      <div className="my-8 flex flex-col gap-8">
        {sections.map((section, i) => {
          const Icon = section.icon;
          return (
            <section key={section.href}>
              <Link
                href={section.href}
                className="group flex items-center gap-2.5 text-foreground no-underline"
              >
                <span className="text-[0.8rem] font-bold tabular-nums text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon className="size-[18px] text-primary" aria-hidden />
                <h2 className="m-0 text-lg font-semibold group-hover:text-primary">
                  {section.title}
                </h2>
              </Link>

              <ul className="mt-2.5 flex flex-wrap gap-2 border-l-2 border-border pl-4 sm:ml-[9px]">
                {section.tree.map((node) => {
                  const href = firstHref(node);
                  const key = node.href ?? node.title;
                  const className =
                    "inline-block rounded-md border border-border bg-card px-2.5 py-1 text-[0.85rem] text-muted-foreground no-underline transition-colors hover:border-primary hover:text-primary";
                  return (
                    <li key={key}>
                      {href ? (
                        <Link href={href} className={className}>
                          {node.title}
                        </Link>
                      ) : (
                        <span className={className}>{node.title}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <DocsFooter />
    </DocsPage>
  );
}
