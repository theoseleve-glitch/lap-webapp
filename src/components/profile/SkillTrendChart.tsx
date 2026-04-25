import { memo, useId } from "react";
import { sessionDetailPath } from "@/lib/routes";

export interface SkillTrendPoint {
  date: string;
  score: number;
  sessionId?: string;
}

export interface SkillTrendChartProps {
  points: readonly SkillTrendPoint[];
  skillLabel?: string;
}

const VIEW_W = 280;
const VIEW_H = 140;
const PAD_X = 8;
const PAD_Y = 8;
const PLOT_W = VIEW_W - 2 * PAD_X;
const PLOT_H = VIEW_H - 2 * PAD_Y;

function clampScore(score: number): number {
  if (!Number.isFinite(score)) return 0;
  if (score <= 0) return 0;
  if (score >= 100) return 100;
  return score;
}

function plotX(index: number, total: number): number {
  if (total <= 1) return PAD_X;
  return PAD_X + (index / (total - 1)) * PLOT_W;
}

function plotY(score: number): number {
  return PAD_Y + (1 - clampScore(score) / 100) * PLOT_H;
}

function describePoints(points: readonly SkillTrendPoint[]): string {
  if (points.length === 0) return "No trend data.";
  let min = points[0]!.score;
  let max = points[0]!.score;
  for (const p of points) {
    if (p.score < min) min = p.score;
    if (p.score > max) max = p.score;
  }
  return `${points.length} data points. Lowest score ${Math.round(min)}, highest score ${Math.round(max)}.`;
}

function SkillTrendChartImpl({ points, skillLabel = "Skill trend" }: SkillTrendChartProps) {
  const titleId = useId();
  const descId = useId();

  if (points.length === 0) {
    return (
      <div
        role="img"
        aria-label={skillLabel}
        className="flex items-center justify-center rounded border border-steel/30 bg-concrete p-8 text-center"
      >
        <p className="font-body text-muted text-sm">No trend data yet.</p>
      </div>
    );
  }

  const vertices = points
    .map((p, i) => `${plotX(i, points.length).toFixed(2)},${plotY(p.score).toFixed(2)}`)
    .join(" ");

  return (
    <svg
      role="img"
      aria-labelledby={titleId}
      aria-describedby={descId}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="w-full text-pit-orange"
    >
      <title id={titleId}>{skillLabel}</title>
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
          data-role="trend-line"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          points={vertices}
        />
      )}

      {points.map((p, i) => {
        const cx = plotX(i, points.length);
        const cy = plotY(p.score);
        const marker = (
          <circle
            data-role="trend-point"
            data-session-id={p.sessionId}
            cx={cx}
            cy={cy}
            r={2.5}
            fill="currentColor"
          />
        );
        if (p.sessionId) {
          return (
            <a
              key={`${p.date}-${i}`}
              href={sessionDetailPath(p.sessionId)}
              aria-label={`${p.date} — score ${Math.round(p.score)}`}
            >
              {marker}
            </a>
          );
        }
        return <g key={`${p.date}-${i}`}>{marker}</g>;
      })}
    </svg>
  );
}

export const SkillTrendChart = memo(SkillTrendChartImpl);
