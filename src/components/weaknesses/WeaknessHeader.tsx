import { useId } from "react";
import type { WeaknessSeverity } from "@/components/coaching/WeaknessEpisodeCard";

export type WeaknessStatus = "open" | "resolved";

export interface WeaknessHeaderProps {
  title: string;
  category: string;
  severity: WeaknessSeverity;
  status: WeaknessStatus;
}

const SEVERITY_TONE: Record<WeaknessSeverity, string> = {
  low: "border-steel/50 text-steel",
  medium: "border-marshal-yellow/60 text-marshal-yellow",
  high: "border-pit-orange/60 text-pit-orange",
  critical: "border-safety-red/70 text-safety-red",
};

const STATUS_TONE: Record<WeaknessStatus, string> = {
  open: "border-pit-orange/60 text-pit-orange",
  resolved: "border-acid-green/60 text-acid-green",
};

const STATUS_LABEL: Record<WeaknessStatus, string> = {
  open: "Open",
  resolved: "Resolved",
};

const CHIP_BASE =
  "inline-block rounded border px-2 py-0.5 font-telemetry text-[11px] uppercase tracking-[0.12em]";

export function WeaknessHeader({ title, category, severity, status }: WeaknessHeaderProps) {
  const titleId = useId();
  return (
    <section
      role="region"
      aria-labelledby={titleId}
      className="flex flex-col gap-3 rounded border border-steel/30 bg-concrete p-5"
    >
      <h1
        id={titleId}
        className="font-monument text-chalk text-2xl leading-[var(--lh-heading)] tracking-[var(--ls-display)]"
      >
        {title}
      </h1>
      <div className="flex flex-wrap items-center gap-2">
        <span className={`${CHIP_BASE} border-steel/50 text-steel`}>{category}</span>
        <span className={`${CHIP_BASE} ${SEVERITY_TONE[severity]}`}>{severity}</span>
        <span className={`${CHIP_BASE} ${STATUS_TONE[status]}`}>{STATUS_LABEL[status]}</span>
      </div>
    </section>
  );
}
