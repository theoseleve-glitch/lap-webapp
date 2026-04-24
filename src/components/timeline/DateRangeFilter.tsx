import { useId } from "react";

export interface DateRange {
  start: string;
  end: string;
}

export interface DateRangeFilterProps {
  label: string;
  value: DateRange;
  onChange: (value: DateRange) => void;
}

export function DateRangeFilter({ label, value, onChange }: DateRangeFilterProps) {
  const startId = useId();
  const endId = useId();
  const alertId = useId();
  const hasInvalidRange = value.start !== "" && value.end !== "" && value.end < value.start;
  const hasAnyValue = value.start !== "" || value.end !== "";

  return (
    <div
      role="group"
      aria-label={label}
      aria-describedby={hasInvalidRange ? alertId : undefined}
      className="flex flex-wrap items-end gap-3 font-telemetry text-[11px] uppercase tracking-[0.12em]"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor={startId} className="text-steel">
          From
        </label>
        <input
          id={startId}
          type="date"
          value={value.start}
          onChange={(event) => onChange({ ...value, start: event.target.value })}
          className="rounded border border-steel/40 bg-concrete px-2 py-1 font-body text-chalk text-sm"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor={endId} className="text-steel">
          To
        </label>
        <input
          id={endId}
          type="date"
          value={value.end}
          onChange={(event) => onChange({ ...value, end: event.target.value })}
          className="rounded border border-steel/40 bg-concrete px-2 py-1 font-body text-chalk text-sm"
        />
      </div>
      {hasAnyValue && (
        <button
          type="button"
          onClick={() => onChange({ start: "", end: "" })}
          className="rounded border border-steel/40 text-steel px-3 py-1 hover:text-chalk hover:border-steel"
        >
          Clear
        </button>
      )}
      {hasInvalidRange && (
        <p id={alertId} role="alert" className="text-safety-red normal-case">
          End date must be on or after start date
        </p>
      )}
    </div>
  );
}
