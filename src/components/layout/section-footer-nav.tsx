"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sections, type NavNode } from "@/lib/nav";
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

export function SectionFooterNav() {
  const pathname = usePathname();

  const section = sections.find(
    (s) => pathname === s.href || pathname.startsWith(`${s.href}/`)
  );
  // ホームやセクション未該当、セクションのトップページでは表示しない
  if (!section || pathname === section.href) return null;

  const Icon = section.icon;

  return (
    <nav className="mt-16 border-t border-border pt-6">
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
  );
}
