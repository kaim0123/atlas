import type { ReactNode } from "react";

export function CardGrid({ children }: { children: ReactNode }) {
  return (
    <div className="my-5 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
      {children}
    </div>
  );
}

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 px-[18px]">{children}</div>
  );
}

export function CardNumber({ children }: { children: ReactNode }) {
  return (
    <div className="mb-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 font-bold text-primary">
      {children}
    </div>
  );
}

export function Analogy({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div className="my-5 rounded-xl border border-primary/30 bg-primary/[0.06] p-4 px-[18px]">
      <div className="mb-1.5 flex items-center gap-2 text-[0.95rem] font-bold text-primary">
        {label}
      </div>
      <p className="m-0 text-foreground/90">{children}</p>
    </div>
  );
}

export function Aside({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div className="my-5 rounded-xl border border-dashed border-border p-3.5 px-4 text-[0.94rem] text-muted-foreground">
      <span className="mr-1.5 font-bold text-foreground">{label}</span>
      {children}
    </div>
  );
}

export function Diagram({ caption, children }: { caption: ReactNode; children: ReactNode }) {
  return (
    <div className="my-6 rounded-xl border border-border bg-card p-5 text-center">
      {children}
      <div className="mt-2.5 text-[0.85rem] text-muted-foreground">{caption}</div>
    </div>
  );
}

export function Steps({ children }: { children: ReactNode }) {
  return <ol className="docs-steps my-5 list-none p-0">{children}</ol>;
}

export function CodeCompare({ js, ts }: { js: string; ts: string }) {
  return (
    <div className="my-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border bg-muted px-4 py-1.5 text-[0.75rem] font-bold tracking-wide text-muted-foreground">
          JavaScript
        </div>
        <pre className="overflow-x-auto p-4 px-[18px] text-[0.85rem] leading-relaxed">
          <code>{js}</code>
        </pre>
      </div>
      <div className="overflow-hidden rounded-xl border border-primary/30 bg-card">
        <div className="border-b border-primary/30 bg-primary/[0.08] px-4 py-1.5 text-[0.75rem] font-bold tracking-wide text-primary">
          TypeScript
        </div>
        <pre className="overflow-x-auto p-4 px-[18px] text-[0.85rem] leading-relaxed">
          <code>{ts}</code>
        </pre>
      </div>
    </div>
  );
}
