"use client";

import { useId, useState, type FormEvent } from "react";

export interface CompareCaseCreateInput {
  rationale: string;
  sessionIds: readonly string[];
}

export interface CompareCaseCreateModalProps {
  open: boolean;
  selectedSessionIds: readonly string[];
  onSubmit: (input: CompareCaseCreateInput) => void;
  onCancel: () => void;
  pending?: boolean;
  error?: string;
}

const RATIONALE_REQUIRED = "Rationale is required.";

export function CompareCaseCreateModal({
  open,
  selectedSessionIds,
  onSubmit,
  onCancel,
  pending = false,
  error,
}: CompareCaseCreateModalProps) {
  const headingId = useId();
  const rationaleId = useId();
  const [rationale, setRationale] = useState("");
  const [showRequiredError, setShowRequiredError] = useState(false);

  if (!open) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = rationale.trim();
    if (trimmed.length === 0) {
      setShowRequiredError(true);
      return;
    }
    onSubmit({ rationale: trimmed, sessionIds: selectedSessionIds });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      className="fixed inset-0 z-50 flex items-center justify-center bg-graphite/80 p-4"
    >
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-lg flex-col gap-4 rounded border border-steel/30 bg-concrete p-6"
      >
        <h2
          id={headingId}
          className="font-monument text-chalk text-xl leading-[var(--lh-heading)] tracking-[var(--ls-display)]"
        >
          New compare case
        </h2>
        <p className="font-telemetry text-steel text-[11px] uppercase tracking-[0.12em]">
          {selectedSessionIds.length} sessions selected
        </p>
        <label htmlFor={rationaleId} className="flex flex-col gap-2">
          <span className="font-body text-chalk text-sm">Rationale</span>
          <textarea
            id={rationaleId}
            value={rationale}
            onChange={(e) => {
              setRationale(e.target.value);
              if (showRequiredError) setShowRequiredError(false);
            }}
            rows={4}
            className="rounded border border-steel/40 bg-graphite p-2 font-body text-chalk text-sm leading-[var(--lh-body)] focus:border-pit-orange focus:outline-none"
          />
        </label>
        {showRequiredError && (
          <p role="alert" className="font-body text-safety-red text-xs">
            {RATIONALE_REQUIRED}
          </p>
        )}
        {error && (
          <p role="alert" className="font-body text-safety-red text-xs">
            {error}
          </p>
        )}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded border border-steel/50 text-chalk px-3 py-1 font-telemetry text-[11px] uppercase tracking-[0.12em] hover:border-steel"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={pending}
            className="rounded border border-pit-orange/70 text-pit-orange px-3 py-1 font-telemetry text-[11px] uppercase tracking-[0.12em] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-pit-orange/10"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
