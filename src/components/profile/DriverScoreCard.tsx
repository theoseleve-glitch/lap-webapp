import { memo, useId } from "react";

export interface DriverScoreCardProps {
  score: number;
  trend: readonly number[];
  delta?: number;
  label?: string;
}

type DeltaSign = "positive" | "negative" | "neutral";

function signOf(value: number): DeltaSign {
  if (value > 0) return "positive";
  if (value < 0) return "negative";
  return "neutral";
}

function formatDelta(value: number): string {
  return value > 0 ? `+${value}` : `${value}`;
}

const SPARK_WIDTH = 120;
const SPARK_HEIGHT = 32;

function sparklinePoints(trend: readonly number[]): string {
  const max = Math.max(...trend);
  const min = Math.min(...trend);
  const range = max - min || 1;
  const stepX = SPARK_WIDTH / (trend.length - 1);
  return trend
    .map((value, index) => {
      const x = index * stepX;
      const y = SPARK_HEIGHT - ((value - min) / range) * SPARK_HEIGHT;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

const DELTA_TONE: Record<DeltaSign, string> = {
  positive: "text-acid-green",
  negative: "text-safety-red",
  neutral: "text-steel",
};

function summarizeTrend(trend: readonly number[]): string {
  if (trend.length < 2) return "No trend data.";
  const first = trend[0]!;
  const last = trend[trend.length - 1]!;
  return `Trend over ${trend.length} periods: from ${first} to ${last}.`;
}

function DriverScoreCardImpl({
  score,
  trend,
  delta,
  label = "Driver score",
}: DriverScoreCardProps) {
  const labelId = useId();
  const scoreId = useId();
  const descId = useId();
  const sign = delta === undefined ? undefined : signOf(delta);
  const showSparkline = trend.length >= 2;
  const description = summarizeTrend(trend);

  return (
    <section
      role="region"
      aria-labelledby={`${labelId} ${scoreId}`}
      aria-describedby={descId}
      className="flex flex-col gap-3 rounded border border-steel/30 bg-concrete p-5"
    >
      <p id={labelId} className="font-telemetry text-steel text-[11px] uppercase tracking-[0.12em]">
        {label}
      </p>
      <div className="flex items-end gap-3">
        <p
          id={scoreId}
          className="font-monument text-chalk text-4xl leading-[var(--lh-heading)] tracking-[var(--ls-display)] tabular-nums"
        >
          {score}
        </p>
        {delta !== undefined && sign !== undefined && (
          <span
            data-sign={sign}
            className={`font-telemetry text-[11px] uppercase tracking-[0.12em] tabular-nums ${DELTA_TONE[sign]}`}
          >
            {formatDelta(delta)}
          </span>
        )}
      </div>
      {showSparkline && (
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${SPARK_WIDTH} ${SPARK_HEIGHT}`}
          className="h-8 w-full text-pit-orange"
          preserveAspectRatio="none"
        >
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            points={sparklinePoints(trend)}
          />
        </svg>
      )}
      <p id={descId} className="sr-only">
        {description}
      </p>
    </section>
  );
}

export const DriverScoreCard = memo(DriverScoreCardImpl);
