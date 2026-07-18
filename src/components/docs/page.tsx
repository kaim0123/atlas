import type { ReactNode } from "react";
import { PageFooter } from "@/components/layout/page-footer";

export function DocsPage({ children }: { children: ReactNode }) {
  return (
    <div className="docs mx-auto w-full max-w-[840px] px-5 py-10 sm:px-10 sm:py-16">
      {children}
    </div>
  );
}

export function Hero({ children }: { children: ReactNode }) {
  return <header className="mb-10 border-b border-border pb-7">{children}</header>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="mb-4 inline-block rounded-full border border-primary/35 bg-primary/10 px-2.5 py-1 text-[13px] tracking-wide text-primary">
      {children}
    </span>
  );
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className="m-0 text-[1.05rem] text-muted-foreground">{children}</p>;
}

export function Term({ children }: { children: ReactNode }) {
  return <span className="font-semibold text-primary">{children}</span>;
}

export function Heading({ num, children }: { num: ReactNode; children: ReactNode }) {
  return (
    <h2 className="mt-14 mb-2 border-l-4 border-primary pl-3.5 text-xl tracking-wide">
      <span className="mr-2 tabular-nums text-primary">{num}</span>
      {children}
    </h2>
  );
}

// フッターは PageFooter が nav.ts から自動生成する(前へ/次へ・関連ページ・
// セクション目次・メタ)。related を渡した場合のみ関連ページを手動で上書きする。
// children(旧メタ文字列)は後方互換のため受け取るが使用しない。
export function DocsFooter({
  related,
}: {
  related?: ReactNode;
  children?: ReactNode;
}) {
  return <PageFooter related={related} />;
}
