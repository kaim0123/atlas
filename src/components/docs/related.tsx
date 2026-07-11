import Link from "next/link";
import type { ReactNode } from "react";

export function RelatedNav({ children }: { children: ReactNode }) {
  return (
    <nav className="mt-16 border-t border-border pt-6">
      <h2 className="mb-4 text-xl">関連ページ</h2>
      {children}
    </nav>
  );
}

export function RelatedList({ children }: { children: ReactNode }) {
  return (
    <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-2.5 p-0">
      {children}
    </ul>
  );
}

export function RelatedLink({
  href,
  tag,
  children,
}: {
  href: string;
  tag: ReactNode;
  children: ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="block rounded-lg border border-border bg-card p-3.5 px-4 text-foreground no-underline hover:border-primary"
      >
        <span className="mb-1 block text-[0.78rem] text-primary">{tag}</span>
        {children}
      </Link>
    </li>
  );
}
