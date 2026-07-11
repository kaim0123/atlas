import type { ReactNode } from "react";

export function Timeline({ children }: { children: ReactNode }) {
  return (
    <div className="my-7 overflow-x-auto pb-3">
      <div className="flex min-w-max gap-0 px-1 pt-2">{children}</div>
    </div>
  );
}

export function TimelineItem({ era, children }: { era: ReactNode; children: ReactNode }) {
  return (
    <div className="relative w-[168px] flex-none pr-3.5 pb-5 before:absolute before:top-[22px] before:left-0 before:h-0.5 before:w-full before:bg-border before:content-[''] first:before:left-1/2 first:before:w-1/2 last:before:w-1/2">
      <div className="text-center text-[0.95rem] font-bold tabular-nums text-primary">{era}</div>
      <div className="relative mx-auto my-4 h-3 w-3 rounded-full bg-primary ring-4 ring-primary/15" />
      <div className="px-1.5 text-center text-[0.82rem] text-muted-foreground">{children}</div>
    </div>
  );
}

export function TimelineLabel({ children }: { children: ReactNode }) {
  return <p className="mt-6 text-[0.85rem] text-muted-foreground">{children}</p>;
}
