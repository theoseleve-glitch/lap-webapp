"use client";

import { useMemo, useState } from "react";
import { formatLapTime } from "./SessionOverviewTab";

export interface LapRow {
  number: number;
  lapTimeMs: number;
  sectors: readonly number[];
  isPersonalBest: boolean;
  isInvalid: boolean;
}

export interface SessionLapsTabProps {
  laps: readonly LapRow[];
}

type SortMode = "byNumber" | "byTime";

function sortLaps(laps: readonly LapRow[], mode: SortMode): readonly LapRow[] {
  if (mode === "byTime") {
    return [...laps].sort((a, b) => a.lapTimeMs - b.lapTimeMs);
  }
  return [...laps].sort((a, b) => a.number - b.number);
}

function maxSectorCount(laps: readonly LapRow[]): number {
  let max = 0;
  for (const lap of laps) {
    if (lap.sectors.length > max) max = lap.sectors.length;
  }
  return max;
}

export function SessionLapsTab({ laps }: SessionLapsTabProps) {
  const [sortMode, setSortMode] = useState<SortMode>("byNumber");
  const [hideInvalid, setHideInvalid] = useState(false);

  const filteredSorted = useMemo(() => {
    const filtered = hideInvalid ? laps.filter((l) => !l.isInvalid) : laps;
    return sortLaps(filtered, sortMode);
  }, [laps, sortMode, hideInvalid]);

  const sectorCount = useMemo(() => maxSectorCount(laps), [laps]);

  if (laps.length === 0) {
    return (
      <section
        aria-label="Laps"
        className="flex flex-col gap-3 rounded border border-steel/30 bg-concrete p-5"
      >
        <p className="font-body text-muted text-sm">No laps recorded for this session.</p>
      </section>
    );
  }

  return (
    <section
      aria-label="Laps"
      className="flex flex-col gap-3 rounded border border-steel/30 bg-concrete p-5"
    >
      <div className="flex flex-wrap gap-2">
        <ToggleButton
          active={sortMode === "byTime"}
          label={sortMode === "byTime" ? "Sort by lap #" : "Sort by time"}
          onClick={() => setSortMode((m) => (m === "byTime" ? "byNumber" : "byTime"))}
        />
        <ToggleButton
          active={hideInvalid}
          label={hideInvalid ? "Show invalid" : "Hide invalid"}
          onClick={() => setHideInvalid((v) => !v)}
        />
      </div>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="font-telemetry text-steel text-[11px] uppercase tracking-[0.12em]">
            <th scope="col" className="py-2">
              #
            </th>
            <th scope="col" className="py-2">
              Lap time
            </th>
            {Array.from({ length: sectorCount }, (_, i) => (
              <th key={`h-s${i + 1}`} scope="col" className="py-2">
                S{i + 1}
              </th>
            ))}
            <th scope="col" className="py-2">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredSorted.map((lap) => (
            <LapTableRow key={lap.number} lap={lap} sectorCount={sectorCount} />
          ))}
        </tbody>
      </table>
    </section>
  );
}

function LapTableRow({ lap, sectorCount }: { lap: LapRow; sectorCount: number }) {
  return (
    <tr
      className={
        lap.isInvalid
          ? "border-t border-steel/20 text-steel"
          : "border-t border-steel/20 text-chalk"
      }
    >
      <td className="py-2 font-telemetry text-[11px] tabular-nums">{lap.number}</td>
      <td className="py-2 font-body tabular-nums">{formatLapTime(lap.lapTimeMs)}</td>
      {Array.from({ length: sectorCount }, (_, i) => (
        <td key={`s${i + 1}`} className="py-2 font-body text-sm tabular-nums">
          {lap.sectors[i] !== undefined ? formatLapTime(lap.sectors[i]!) : "—"}
        </td>
      ))}
      <td className="py-2">
        <div className="flex gap-2">
          {lap.isPersonalBest && <Badge tone="best">PB</Badge>}
          {lap.isInvalid && <Badge tone="invalid">INV</Badge>}
        </div>
      </td>
    </tr>
  );
}

function Badge({ tone, children }: { tone: "best" | "invalid"; children: string }) {
  const className =
    tone === "best"
      ? "rounded border border-acid-green/60 text-acid-green px-2 py-0.5 font-telemetry text-[10px] uppercase tracking-[0.12em]"
      : "rounded border border-safety-red/60 text-safety-red px-2 py-0.5 font-telemetry text-[10px] uppercase tracking-[0.12em]";
  return <span className={className}>{children}</span>;
}

function ToggleButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        active
          ? "rounded border border-pit-orange/70 text-pit-orange px-3 py-1 font-telemetry text-[11px] uppercase tracking-[0.12em] bg-pit-orange/10"
          : "rounded border border-steel/40 text-steel px-3 py-1 font-telemetry text-[11px] uppercase tracking-[0.12em] hover:border-steel/70"
      }
    >
      {label}
    </button>
  );
}
