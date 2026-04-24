const DEFAULT_COHORT_SIZE = 20;

export interface ArchetypeBadgeProps {
  archetype: string | null;
  cohortSize?: number;
}

export function ArchetypeBadge({ archetype, cohortSize }: ArchetypeBadgeProps) {
  const unlocked = archetype !== null && archetype.trim() !== "";
  const safeCohort =
    typeof cohortSize === "number" && cohortSize > 0 ? cohortSize : DEFAULT_COHORT_SIZE;

  if (unlocked) {
    return (
      <span
        role="status"
        data-state="unlocked"
        aria-label={`Archetype: ${archetype}`}
        className="inline-flex items-center rounded border border-pit-orange/60 bg-pit-orange/10 px-3 py-1 font-telemetry text-[11px] uppercase tracking-[0.12em] text-pit-orange"
      >
        {archetype}
      </span>
    );
  }

  return (
    <span
      role="status"
      data-state="locked"
      aria-label={`Archetype locked — unlocks at ${safeCohort} drivers`}
      className="inline-flex items-center gap-2 rounded border border-steel/40 px-3 py-1 font-telemetry text-[11px] uppercase tracking-[0.12em] text-steel"
    >
      <span>Archetype locked</span>
      <span className="text-muted normal-case">Unlocks at {safeCohort} drivers</span>
    </span>
  );
}
