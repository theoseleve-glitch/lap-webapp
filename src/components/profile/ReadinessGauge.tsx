import { useId } from "react";

export interface ReadinessGaugeProps {
  value: number;
  eventLabel?: string;
  label?: string;
  targetHref?: string;
}

const VIEW_W = 160;
const VIEW_H = 90;
const CENTER_X = VIEW_W / 2;
const CENTER_Y = VIEW_H - 10;
const RADIUS = 70;

function clampPercent(value: number): number {
  if (!Number.isFinite(value)) return 0;
  if (value <= 0) return 0;
  if (value >= 100) return 100;
  return value;
}

function arcPath(percent: number): string {
  const angle = (percent / 100) * Math.PI;
  const endX = CENTER_X - RADIUS * Math.cos(angle);
  const endY = CENTER_Y - RADIUS * Math.sin(angle);
  const startX = CENTER_X - RADIUS;
  const startY = CENTER_Y;
  const largeArc = angle > Math.PI ? 1 : 0;
  return `M ${startX} ${startY} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${endX.toFixed(
    2,
  )} ${endY.toFixed(2)}`;
}

const BACKGROUND_ARC = arcPath(100);

export function ReadinessGauge({
  value,
  eventLabel,
  label = "Readiness",
  targetHref,
}: ReadinessGaugeProps) {
  const labelId = useId();
  const scoreId = useId();
  const descId = useId();
  const clamped = clampPercent(value);
  const rounded = Math.round(clamped);
  const description = eventLabel
    ? `${rounded} percent ready for ${eventLabel}.`
    : `${rounded} percent ready.`;

  const content = (
    <>
      <p id={labelId} className="font-telemetry text-steel text-[11px] uppercase tracking-[0.12em]">
        {label}
      </p>
      <svg aria-hidden="true" viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="w-40 text-pit-orange">
        <path
          d={BACKGROUND_ARC}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.15}
          strokeWidth={8}
          strokeLinecap="round"
        />
        {clamped > 0 && (
          <path
            data-role="value-arc"
            d={arcPath(clamped)}
            fill="none"
            stroke="currentColor"
            strokeWidth={8}
            strokeLinecap="round"
          />
        )}
      </svg>
      <p
        id={scoreId}
        className="font-monument text-chalk text-3xl leading-[var(--lh-heading)] tracking-[var(--ls-display)] tabular-nums"
      >
        {rounded}
      </p>
      {eventLabel && <p className="font-body text-muted text-xs">{eventLabel}</p>}
      <p id={descId} className="sr-only">
        {description}
      </p>
    </>
  );

  const wrapperClass =
    "flex flex-col items-center gap-2 rounded border border-steel/30 bg-concrete p-5 text-center";

  if (targetHref) {
    return (
      <a
        href={targetHref}
        aria-labelledby={`${labelId} ${scoreId}`}
        aria-describedby={descId}
        className={`${wrapperClass} no-underline hover:border-steel/50`}
      >
        {content}
      </a>
    );
  }

  return (
    <section
      role="region"
      aria-labelledby={`${labelId} ${scoreId}`}
      aria-describedby={descId}
      className={wrapperClass}
    >
      {content}
    </section>
  );
}
