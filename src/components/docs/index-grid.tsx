import Link from "next/link";
import type { ReactNode } from "react";

export function IndexGrid({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-3.5">
      {children}
    </div>
  );
}

export function IndexCard({
  href,
  num,
  title,
  children,
}: {
  href: string;
  num: ReactNode;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-border bg-card p-[18px] px-5 text-foreground no-underline transition-colors hover:border-primary"
    >
      <span className="mb-1.5 block text-[0.85rem] font-bold text-primary">{num}</span>
      <h3 className="mb-1.5 text-base font-semibold">{title}</h3>
      <p className="m-0 text-[0.85rem] text-muted-foreground">{children}</p>
    </Link>
  );
}
