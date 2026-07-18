"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  getFooterMeta,
  getPager,
  getRelated,
  normalizePath,
  sections,
  type NavNode,
  type PageRef,
} from "@/lib/nav";
import { cn } from "@/lib/utils";

// 子孫を辿って最初のリンク先を返す(グループ自体にhrefが無い場合の遷移先)
function firstHref(node: NavNode): string | undefined {
  if (node.href) return node.href;
  for (const child of node.children ?? []) {
    const href = firstHref(child);
    if (href) return href;
  }
  return undefined;
}

// このノード(または子孫)が現在のパスを含むか
function containsPath(node: NavNode, pathname: string): boolean {
  if (node.href && (pathname === node.href || pathname.startsWith(`${node.href}/`))) {
    return true;
  }
  return (node.children ?? []).some((child) => containsPath(child, pathname));
}

// 前へ/次へのカード。next 側を主導線として強調する。
function PagerCard({ page, dir }: { page: PageRef; dir: "prev" | "next" }) {
  const isNext = dir === "next";
  return (
    <Link
      href={page.href}
      className={cn(
        "group flex flex-col gap-1 rounded-lg border p-4 no-underline transition-colors",
        isNext
          ? "items-end border-primary/60 bg-primary/5 text-right hover:border-primary hover:bg-primary/10"
          : "items-start border-border bg-card hover:border-primary"
      )}
    >
      <span
        className={cn(
          "flex items-center gap-1.5 text-[0.78rem] text-muted-foreground",
          isNext && "flex-row-reverse"
        )}
      >
        {isNext ? (
          <ArrowRight className="size-3.5 text-primary" aria-hidden />
        ) : (
          <ArrowLeft className="size-3.5" aria-hidden />
        )}
        {isNext ? "次へ" : "前へ"}
      </span>
      <span className="text-[0.95rem] font-semibold text-foreground group-hover:text-primary">
        {page.title}
      </span>
    </Link>
  );
}

// 関連ページのカード(自動導出用)。手動上書き時は related プロップをそのまま描画する。
function RelatedCard({ page }: { page: PageRef }) {
  return (
    <li>
      <Link
        href={page.href}
        className="block rounded-lg border border-border bg-card p-3.5 px-4 text-foreground no-underline hover:border-primary"
      >
        <span className="mb-1 block text-[0.78rem] text-primary">{page.sectionTitle}</span>
        {page.title}
      </Link>
    </li>
  );
}

export function PageFooter({ related }: { related?: ReactNode }) {
  const pathname = normalizePath(usePathname());

  const section = sections.find(
    (s) => pathname === s.href || pathname.startsWith(`${s.href}/`)
  );
  // ホームやセクション未該当では何も出さない
  if (!section) return null;

  const { prev, next } = getPager(pathname);
  const autoRelated = getRelated(pathname);
  const showRelated = related != null || autoRelated.length > 0;
  const Icon = section.icon;

  return (
    <>
      {/* 主導線: 前へ / 次へ */}
      {(prev || next) && (
        <nav className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {prev ? <PagerCard page={prev} dir="prev" /> : <span />}
          {next ? <PagerCard page={next} dir="next" /> : <span />}
        </nav>
      )}

      {/* 副導線: 他のページ(関連ページ + セクション目次) */}
      {showRelated && (
        <section className="mt-14">
          <h2 className="mb-4 text-xl">関連ページ</h2>
          {related ?? (
            <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-2.5 p-0">
              {autoRelated.map((page) => (
                <RelatedCard key={page.href} page={page} />
              ))}
            </ul>
          )}
        </section>
      )}

      {/* セクション目次(現在地マップ) */}
      <nav className="mt-12 border-t border-border pt-6">
        <Link
          href={section.href}
          className="group mb-3 flex items-center gap-2 text-foreground no-underline"
        >
          <Icon className="size-4 text-primary" aria-hidden />
          <span className="text-[0.9rem] font-semibold group-hover:text-primary">
            {section.title}
          </span>
        </Link>
        <ul className="flex flex-wrap gap-2">
          {section.tree.map((node) => {
            const href = firstHref(node);
            const key = node.href ?? node.title;
            const active = containsPath(node, pathname);
            const className = cn(
              "inline-block rounded-md border px-2.5 py-1 text-[0.85rem] no-underline transition-colors",
              active
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
            );
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
      </nav>

      {/* メタ行 */}
      <footer className="mt-12 text-[0.82rem] text-muted-foreground">
        {getFooterMeta(pathname)}
      </footer>
    </>
  );
}
