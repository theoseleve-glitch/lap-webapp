import { useId } from "react";

export type WeaknessSeverity = "low" | "medium" | "high" | "critical";

export interface WeaknessEpisodeCardProps {
  title: string;
  severity: WeaknessSeverity;
  confidence: number;
  evidence: readonly string[];
}

const SEVERITY_TONE: Record<WeaknessSeverity, string> = {
  low: "border-steel/50 text-steel",
  medium: "border-marshal-yellow/60 text-marshal-yellow",
  high: "border-pit-orange/60 text-pit-orange",
  critical: "border-safety-red/70 text-safety-red",
};

function formatConfidence(value: number): string {
  const clamped = Math.max(0, Math.min(1, value));
  return `${Math.round(clamped * 100)}%`;
}

function formatEvidenceCount(count: number): string {
  return `${count} supporting ${count === 1 ? "observation" : "observations"}`;
}

export function WeaknessEpisodeCard({
  title,
  severity,
  confidence,
  evidence,
}: WeaknessEpisodeCardProps) {
  const headingId = useId();
  const hasEvidence = evidence.length > 0;

  return (
    <article
      aria-labelledby={headingId}
      className="flex flex-col gap-3 rounded border border-steel/30 bg-concrete p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <h3
          id={headingId}
          className="font-monument text-chalk text-lg leading-[var(--lh-heading)] tracking-[var(--ls-display)]"
        >
          {title}
        </h3>
        <span
          className={`shrink-0 inline-block rounded border px-2 py-0.5 font-telemetry text-[11px] uppercase tracking-[0.12em] ${SEVERITY_TONE[severity]}`}
        >
          {severity}
        </span>
      </div>

      <dl className="flex items-center gap-4 font-telemetry text-steel text-[11px] uppercase tracking-[0.12em]">
        <div className="flex items-center gap-2">
          <dt>Confidence</dt>
          <dd className="tabular-nums text-chalk">{formatConfidence(confidence)}</dd>
        </div>
      </dl>

      {hasEvidence ? (
        <div className="flex flex-col gap-2">
          <p className="font-telemetry text-steel text-[11px] uppercase tracking-[0.12em]">
            {formatEvidenceCount(evidence.length)}
          </p>
          <ul className="flex flex-col gap-1 font-body text-chalk text-sm">
            {evidence.map((item) => (
              <li key={item} className="text-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="font-telemetry text-steel text-[11px] uppercase tracking-[0.12em]">
          No supporting observations yet
        </p>
      )}
    </article>
  );
}
