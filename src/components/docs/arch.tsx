import type { ReactNode } from "react";

export function ArchList({ children }: { children: ReactNode }) {
  return <div className="my-5 mb-8">{children}</div>;
}

export function ArchRow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 rounded-xl border border-border bg-card p-4 px-5">{children}</div>
  );
}

export function ArchRowHead({ children }: { children: ReactNode }) {
  return (
    <div className="mb-2 flex flex-wrap items-center justify-between gap-2.5">{children}</div>
  );
}

export function ArchRowMeta({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-2">{children}</div>;
}

export function ArchEra({ children }: { children: ReactNode }) {
  return (
    <span className="text-[0.82rem] font-semibold tabular-nums text-muted-foreground">
      {children}
    </span>
  );
}

export function FamilyTag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-primary/25 bg-primary/10 px-2 text-[0.78rem] text-primary">
      {children}
    </span>
  );
}

export function ArchTitle({ children }: { children: ReactNode }) {
  return <h3 className="mb-2 text-[1.05rem] font-semibold [&_a]:text-foreground [&_a:hover]:text-primary [&_a]:no-underline">{children}</h3>;
}

export function ArchFeature({ children }: { children: ReactNode }) {
  return <p className="mb-2">{children}</p>;
}

export function ArchProblem({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <p className="m-0 text-[0.88rem] text-muted-foreground">
      <span className="mr-1 font-semibold text-foreground">{label}</span>
      {children}
    </p>
  );
}
