export type OutcomeStatus = "pending" | "met" | "unmet" | "skipped";

export interface OutcomeBadgeProps {
  status: OutcomeStatus;
  label?: string;
}

const DEFAULT_LABEL: Record<OutcomeStatus, string> = {
  pending: "Pending",
  met: "Met",
  unmet: "Unmet",
  skipped: "Skipped",
};

const STATUS_TONE: Record<OutcomeStatus, string> = {
  pending: "border-steel/50 text-steel",
  met: "border-acid-green/60 text-acid-green",
  unmet: "border-safety-red/70 text-safety-red",
  skipped: "border-steel/30 text-muted",
};

export function OutcomeBadge({ status, label }: OutcomeBadgeProps) {
  const text = label ?? DEFAULT_LABEL[status];
  return (
    <span
      role="status"
      data-status={status}
      aria-label={`Outcome ${DEFAULT_LABEL[status].toLowerCase()}`}
      className={`inline-flex items-center rounded border px-2 py-0.5 font-telemetry text-[11px] uppercase tracking-[0.12em] ${STATUS_TONE[status]}`}
    >
      {text}
    </span>
  );
}
