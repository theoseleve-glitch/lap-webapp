import { useId, type KeyboardEvent } from "react";

export interface PrescriptionCardProps {
  title: string;
  rationale: string;
  drillHref: string;
  drillLabel?: string;
  pending?: boolean;
  onAccept: () => void;
  onSkip: () => void;
}

export function PrescriptionCard({
  title,
  rationale,
  drillHref,
  drillLabel = "Start drill",
  pending = false,
  onAccept,
  onSkip,
}: PrescriptionCardProps) {
  const headingId = useId();

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (pending) return;
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const key = event.key.toLowerCase();
    if (key === "a") {
      onAccept();
    } else if (key === "s") {
      onSkip();
    }
  };

  return (
    <article
      aria-labelledby={headingId}
      onKeyDown={handleKeyDown}
      className="flex flex-col gap-3 rounded border border-steel/30 bg-concrete p-4"
    >
      <h3
        id={headingId}
        className="font-monument text-chalk text-lg leading-[var(--lh-heading)] tracking-[var(--ls-display)]"
      >
        {title}
      </h3>

      <p className="font-body text-chalk text-sm leading-[var(--lh-body)]">{rationale}</p>

      <a
        href={drillHref}
        className="font-telemetry text-pit-orange text-[11px] uppercase tracking-[0.12em] no-underline hover:underline"
      >
        {drillLabel}
      </a>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onAccept}
          disabled={pending}
          className="font-telemetry text-[11px] uppercase tracking-[0.12em] rounded border border-acid-green/60 text-acid-green px-3 py-1 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={onSkip}
          disabled={pending}
          className="font-telemetry text-[11px] uppercase tracking-[0.12em] rounded border border-steel/50 text-steel px-3 py-1 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Skip
        </button>
      </div>
    </article>
  );
}
