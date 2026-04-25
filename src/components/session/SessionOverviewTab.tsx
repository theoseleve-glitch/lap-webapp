export interface SectorStats {
  index: number;
  label: string;
  bestMs: number;
}

export interface SessionLapTimeRange {
  fastest: number;
  slowest: number;
  stdDevMs: number;
}

export interface SessionOverviewView {
  lapCount: number;
  bestLapMs: number;
  averageLapMs: number;
  totalDurationMs: number;
  lapTimeRangeMs: SessionLapTimeRange;
  sectors: readonly SectorStats[];
}

export interface SessionOverviewTabProps {
  overview: SessionOverviewView;
}

export function formatLapTime(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) return "—";
  const rounded = Math.round(ms);
  const minutes = Math.floor(rounded / 60_000);
  const seconds = Math.floor((rounded % 60_000) / 1000);
  const millis = rounded % 1000;
  return `${minutes}:${seconds.toString().padStart(2, "0")}.${millis.toString().padStart(3, "0")}`;
}

function formatStdDevSeconds(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) return "—";
  return (ms / 1000).toFixed(3);
}

export function SessionOverviewTab({ overview }: SessionOverviewTabProps) {
  return (
    <section aria-label="Session overview" className="flex flex-col gap-6">
      <SummaryStats overview={overview} />
      <LapTimeDistribution range={overview.lapTimeRangeMs} />
      <SectorsTable sectors={overview.sectors} />
    </section>
  );
}

function SummaryStats({ overview }: { overview: SessionOverviewView }) {
  return (
    <div role="region" aria-label="Summary" className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <Stat label="Laps" value={overview.lapCount.toString()} />
      <Stat label="Best lap" value={formatLapTime(overview.bestLapMs)} />
      <Stat label="Average lap" value={formatLapTime(overview.averageLapMs)} />
      <Stat label="Total" value={formatLapTime(overview.totalDurationMs)} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col rounded border border-steel/30 bg-concrete p-4 gap-1">
      <span className="font-telemetry text-steel text-[11px] uppercase tracking-[0.12em]">
        {label}
      </span>
      <span className="font-monument text-chalk text-2xl leading-[var(--lh-heading)] tabular-nums">
        {value}
      </span>
    </div>
  );
}

function LapTimeDistribution({ range }: { range: SessionLapTimeRange }) {
  return (
    <section
      aria-label="Lap time distribution"
      className="flex flex-col gap-3 rounded border border-steel/30 bg-concrete p-5"
    >
      <h2 className="font-telemetry text-steel text-[11px] uppercase tracking-[0.12em]">
        Lap time distribution
      </h2>
      <div className="grid grid-cols-3 gap-3">
        <DistStat label="Fastest" value={formatLapTime(range.fastest)} />
        <DistStat label="Slowest" value={formatLapTime(range.slowest)} />
        <DistStat label="Std dev (s)" value={formatStdDevSeconds(range.stdDevMs)} />
      </div>
    </section>
  );
}

function DistStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-telemetry text-steel text-[11px] uppercase tracking-[0.12em]">
        {label}
      </span>
      <span className="font-body text-chalk text-base tabular-nums">{value}</span>
    </div>
  );
}

function SectorsTable({ sectors }: { sectors: readonly SectorStats[] }) {
  return (
    <section
      aria-label="Sectors"
      className="flex flex-col gap-3 rounded border border-steel/30 bg-concrete p-5"
    >
      <h2 className="font-telemetry text-steel text-[11px] uppercase tracking-[0.12em]">Sectors</h2>
      {sectors.length === 0 ? (
        <p className="font-body text-muted text-sm">No sector data for this session.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {sectors.map((sector) => (
            <li
              key={sector.index}
              className="flex items-center justify-between font-body text-sm text-chalk"
            >
              <span className="font-telemetry text-[11px] uppercase tracking-[0.12em] text-steel">
                {sector.label}
              </span>
              <span className="tabular-nums">{formatLapTime(sector.bestMs)}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
