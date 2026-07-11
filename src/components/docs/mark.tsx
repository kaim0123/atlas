import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tier = "must" | "niche" | "legacy";

const tierClasses: Record<Tier, string> = {
  must: "bg-primary/15 text-primary border-primary/40",
  niche: "bg-foreground/5 text-muted-foreground border-border",
  legacy: "bg-[#ffb43c]/12 text-[#ffb43c] border-[#ffb43c]/35",
};

export function Mark({ tier, children }: { tier: Tier; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-block rounded-full border px-2.5 py-0.5 text-[0.72rem] font-bold tracking-wide whitespace-nowrap",
        tierClasses[tier],
      )}
    >
      {children}
    </span>
  );
}

export function MarkNote({ children }: { children: ReactNode }) {
  return <span className="mt-1 block text-[0.78rem] text-muted-foreground">{children}</span>;
}
