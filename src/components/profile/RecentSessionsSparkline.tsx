import { useId } from "react";

export interface RecentSessionsSparklineProps {
  lapTimes: readonly number[];
  max?: number;
  label?: string;
}

const VIEW_W = 240;
const VIEW_H = 48;

function sparklinePoints(series: readonly number[]): string {
  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = max - min || 1;
  const stepX = VIEW_W / (series.length - 1);
  return series
    .map((value, index) => {
      const x = index * stepX;
      // Lower lap time = better → place min at top (y=0).
      const y = ((value - min) / range) * VIEW_H;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

function summarizeSeries(series: readonly number[]): string {
  if (series.length === 0) return "No recent sessions.";
  if (series.length === 1) {
    return `1 recent session. Lap time ${series[0]}.`;
  }
  const best = Math.min(...series);
  const worst = Math.max(...series);
  return `${series.length} recent sessions. Best lap ${best}, slowest lap ${worst}.`;
}

export function RecentSessionsSparkline({
  lapTimes,
  max = 20,
  label = "Recent sessions",
}: RecentSessionsSparklineProps) {
  const labelId = useId();
  const descId = useId();
  const series = lapTimes.slice(-Math.max(1, max));
  const showSparkline = series.length >= 2;
  const description = summarizeSeries(series);

  return (
    <section
      role="region"
      aria-labelledby={labelId}
      aria-describedby={descId}
      className="flex flex-col gap-2 rounded border border-steel/30 bg-concrete p-5"
    >
      <p id={labelId} className="font-telemetry text-steel text-[11px] uppercase tracking-[0.12em]">
        {label}
      </p>
      {showSparkline ? (
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="h-12 w-full text-pit-orange"
          preserveAspectRatio="none"
        >
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            points={sparklinePoints(series)}
          />
        </svg>
      ) : (
        <p className="font-body text-muted text-sm leading-[var(--lh-body)]">
          No recent sessions yet.
        </p>
      )}
      <p id={descId} className="sr-only">
        {description}
      </p>
    </section>
  );
}
