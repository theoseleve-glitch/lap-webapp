"use client";

import { useState } from "react";

export type CoachingSeverity = "low" | "medium" | "high";
export type CoachingDifficulty = "beginner" | "intermediate" | "advanced";

const PRESCRIPTIONS_PAGE_SIZE = 10;

export interface CoachingWeakness {
  id: string;
  title: string;
  category: string;
  severity: CoachingSeverity;
}

export interface CoachingPrescription {
  id: string;
  title: string;
  description: string;
  difficulty: CoachingDifficulty;
}

export interface SessionCoachingView {
  newWeaknesses: readonly CoachingWeakness[];
  escalatedWeaknesses: readonly CoachingWeakness[];
  prescriptions: readonly CoachingPrescription[];
  dataQualityInsufficient: boolean;
}

export interface SessionCoachingTabProps {
  coaching: SessionCoachingView;
}

const SEVERITY_TONE: Record<CoachingSeverity, string> = {
  low: "border-steel/40 text-steel",
  medium: "border-pit-orange/60 text-pit-orange",
  high: "border-red-500/70 text-red-400",
};

const DIFFICULTY_TONE: Record<CoachingDifficulty, string> = {
  beginner: "border-steel/40 text-steel",
  intermediate: "border-pit-orange/60 text-pit-orange",
  advanced: "border-red-500/70 text-red-400",
};

function WeaknessList({ label, items }: { label: string; items: readonly CoachingWeakness[] }) {
  if (items.length === 0) return null;
  return (
    <section
      aria-label={label}
      className="flex flex-col gap-2 rounded border border-steel/30 bg-concrete p-4"
    >
      <p className="font-telemetry text-steel text-[11px] uppercase tracking-[0.12em]">{label}</p>
      <ul className="flex flex-col gap-2">
        {items.map((w) => (
          <li
            key={w.id}
            className="flex items-center justify-between gap-3 rounded border border-steel/20 bg-graphite/40 px-3 py-2"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-body text-steel text-sm">{w.title}</span>
              <span className="font-telemetry text-muted text-[10px] uppercase tracking-[0.12em]">
                {w.category}
              </span>
            </div>
            <span
              className={`rounded border px-2 py-0.5 font-telemetry text-[10px] uppercase tracking-[0.12em] ${SEVERITY_TONE[w.severity]}`}
            >
              {w.severity}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PrescriptionList({ items }: { items: readonly CoachingPrescription[] }) {
  const [page, setPage] = useState(1);
  if (items.length === 0) return null;
  const totalPages = Math.max(1, Math.ceil(items.length / PRESCRIPTIONS_PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = items.length > PRESCRIPTIONS_PAGE_SIZE;
  const visible = paginated
    ? items.slice((safePage - 1) * PRESCRIPTIONS_PAGE_SIZE, safePage * PRESCRIPTIONS_PAGE_SIZE)
    : items;
  const atFirst = safePage <= 1;
  const atLast = safePage >= totalPages;
  return (
    <section
      aria-label="Prescriptions"
      className="flex flex-col gap-2 rounded border border-steel/30 bg-concrete p-4"
    >
      <p className="font-telemetry text-steel text-[11px] uppercase tracking-[0.12em]">
        Prescriptions
      </p>
      <ul className="flex flex-col gap-2">
        {visible.map((p) => (
          <li
            key={p.id}
            className="flex flex-col gap-1 rounded border border-steel/20 bg-graphite/40 px-3 py-2"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-body text-steel text-sm">{p.title}</span>
              <span
                className={`rounded border px-2 py-0.5 font-telemetry text-[10px] uppercase tracking-[0.12em] ${DIFFICULTY_TONE[p.difficulty]}`}
              >
                {p.difficulty}
              </span>
            </div>
            <p className="font-body text-muted text-xs">{p.description}</p>
          </li>
        ))}
      </ul>
      {paginated && (
        <div className="flex items-center justify-between gap-2 pt-1">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={atFirst}
            aria-label="Previous page"
            className="rounded border border-steel/40 text-steel px-2 py-1 font-telemetry text-[10px] uppercase tracking-[0.12em] disabled:cursor-not-allowed disabled:opacity-40 hover:border-steel/70"
          >
            Previous
          </button>
          <span className="font-telemetry text-steel text-[10px] uppercase tracking-[0.12em]">
            Page {safePage} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={atLast}
            aria-label="Next page"
            className="rounded border border-steel/40 text-steel px-2 py-1 font-telemetry text-[10px] uppercase tracking-[0.12em] disabled:cursor-not-allowed disabled:opacity-40 hover:border-steel/70"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}

export function SessionCoachingTab({ coaching }: SessionCoachingTabProps) {
  const hasContent =
    coaching.newWeaknesses.length > 0 ||
    coaching.escalatedWeaknesses.length > 0 ||
    coaching.prescriptions.length > 0;

  return (
    <section
      aria-label="Coaching"
      className="flex flex-col gap-3 rounded border border-steel/30 bg-concrete p-5"
    >
      {coaching.dataQualityInsufficient && !hasContent ? (
        <p className="font-body text-muted text-sm">Data quality insufficient for coaching.</p>
      ) : !hasContent ? (
        <p className="font-body text-muted text-sm">No coaching insights for this session.</p>
      ) : (
        <>
          <WeaknessList label="New weaknesses" items={coaching.newWeaknesses} />
          <WeaknessList label="Escalated weaknesses" items={coaching.escalatedWeaknesses} />
          <PrescriptionList items={coaching.prescriptions} />
        </>
      )}
    </section>
  );
}
