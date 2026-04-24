import { useId } from "react";

export interface SkillDimension {
  label: string;
  value: number;
}

export interface SkillRadarChartProps {
  dimensions: readonly SkillDimension[];
  title?: string;
}

const SIZE = 240;
const CENTER = SIZE / 2;
const RADIUS = CENTER - 40;
const RINGS = [0.25, 0.5, 0.75, 1];

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  if (value <= 0) return 0;
  if (value >= 100) return 1;
  return value / 100;
}

function pointAt(angleRad: number, radius: number): { x: number; y: number } {
  return {
    x: CENTER + radius * Math.cos(angleRad),
    y: CENTER + radius * Math.sin(angleRad),
  };
}

export function SkillRadarChart({ dimensions, title = "Skill radar" }: SkillRadarChartProps) {
  const titleId = useId();

  if (dimensions.length === 0) {
    return (
      <div
        role="img"
        aria-label={title}
        className="flex items-center justify-center rounded border border-steel/30 bg-concrete p-8 text-center"
      >
        <p className="font-body text-muted text-sm">No skill data yet.</p>
      </div>
    );
  }

  const step = (2 * Math.PI) / dimensions.length;
  const startAngle = -Math.PI / 2;

  const axes = dimensions.map((_, index) => startAngle + index * step);

  const valuePoints = dimensions
    .map((dim, index) => {
      const r = RADIUS * clamp01(dim.value);
      const { x, y } = pointAt(axes[index] ?? 0, r);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  const labelPositions = dimensions.map((dim, index) => {
    const { x, y } = pointAt(axes[index] ?? 0, RADIUS + 16);
    return { label: dim.label, x, y };
  });

  return (
    <svg
      role="img"
      aria-labelledby={titleId}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="w-full max-w-sm text-steel"
    >
      <title id={titleId}>{title}</title>

      {RINGS.map((ratio) => (
        <circle
          key={ratio}
          cx={CENTER}
          cy={CENTER}
          r={RADIUS * ratio}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.15}
          strokeWidth={1}
        />
      ))}

      {axes.map((angle, index) => {
        const { x, y } = pointAt(angle, RADIUS);
        return (
          <line
            key={index}
            x1={CENTER}
            y1={CENTER}
            x2={x}
            y2={y}
            stroke="currentColor"
            strokeOpacity={0.2}
            strokeWidth={1}
          />
        );
      })}

      <polygon
        data-role="values"
        points={valuePoints}
        fill="var(--pit-orange)"
        fillOpacity={0.15}
        stroke="var(--pit-orange)"
        strokeWidth={1.5}
      />

      {labelPositions.map(({ label, x, y }) => (
        <text
          key={label}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-telemetry text-[9px] uppercase tracking-[0.12em] fill-chalk"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}
