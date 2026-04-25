import { memo, useId } from "react";

export interface WeaknessTrendPoint {
  date: string;
  confidence: number;
}

export interface WeaknessTrendChartProps {
  points: readonly WeaknessTrendPoint[];
  title?: string;
}

const VIEW_W = 280;
const VIEW_H = 140;
const PAD_X = 8;
const PAD_Y = 8;
const PLOT_W = VIEW_W - 2 * PAD_X;
const PLOT_H = VIEW_H - 2 * PAD_Y;

function clampConfidence(value: number): number {
  if (!Number.isFinite(value)) return 0;
  if (value <= 0) return 0;
  if (value >= 100) return 100;
  return value;
}

function plotX(index: number, total: number): number {
  if (total <= 1) return PAD_X;
  return PAD_X + (index / (total - 1)) * PLOT_W;
}

function plotY(confidence: number): number {
  return PAD_Y + (1 - clampConfidence(confidence) / 100) * PLOT_H;
}

function describePoints(points: readonly WeaknessTrendPoint[]): string {
  if (points.length === 0) return "No confidence data.";
  let min = points[0]!.confidence;
  let max = points[0]!.confidence;
  for (const p of points) {
    if (p.confidence < min) min = p.confidence;
    if (p.confidence > max) max = p.confidence;
  }
  return `${points.length} data points. Lowest confidence ${Math.round(min)}, highest confidence ${Math.round(max)}.`;
}

function WeaknessTrendChartImpl({
  points,
  title = "Weakness confidence trend",
}: WeaknessTrendChartProps) {
  const titleId = useId();
  const descId = useId();

  if (points.length === 0) {
    return (
      <div
        role="img"
        aria-label={title}
        className="flex items-center justify-center rounded border border-steel/30 bg-concrete p-8 text-center"
      >
        <p className="font-body text-muted text-sm">No confidence data yet.</p>
      </div>
    );
  }

  const vertices = points
    .map((p, i) => `${plotX(i, points.length).toFixed(2)},${plotY(p.confidence).toFixed(2)}`)
    .join(" ");

  return (
    <svg
      role="img"
      aria-labelledby={titleId}
      aria-describedby={descId}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="w-full text-pit-orange"
    >
      <title id={titleId}>{title}</title>
      <desc id={descId}>{describePoints(points)}</desc>

      <line
        x1={PAD_X}
        y1={PAD_Y + PLOT_H / 2}
        x2={PAD_X + PLOT_W}
        y2={PAD_Y + PLOT_H / 2}
        stroke="currentColor"
        strokeOpacity={0.15}
        strokeWidth={1}
      />

      {points.length >= 2 && (
        <polyline
          data-role="confidence-line"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          points={vertices}
        />
      )}

      {points.map((p, i) => (
        <circle
          key={`${p.date}-${i}`}
          data-role="confidence-point"
          cx={plotX(i, points.length)}
          cy={plotY(p.confidence)}
          r={2.5}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

export const WeaknessTrendChart = memo(WeaknessTrendChartImpl);
