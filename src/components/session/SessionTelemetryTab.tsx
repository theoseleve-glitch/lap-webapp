"use client";

import { useMemo, useState } from "react";

export interface TelemetrySample {
  t: number;
  v: number;
}

export interface TelemetryLap {
  lapNumber: number;
  samples: readonly TelemetrySample[];
}

export interface TelemetryChannel {
  key: string;
  label: string;
  unit: string;
  laps: readonly TelemetryLap[];
}

export interface SessionTelemetryView {
  channels: readonly TelemetryChannel[];
}

export interface SessionTelemetryTabProps {
  telemetry: SessionTelemetryView;
}

const CHART_W = 400;
const CHART_H = 200;

interface ChannelRange {
  minT: number;
  maxT: number;
  minV: number;
  maxV: number;
}

function rangeOver(channel: TelemetryChannel, lapNumbers: readonly number[]): ChannelRange {
  let minT = Number.POSITIVE_INFINITY;
  let maxT = Number.NEGATIVE_INFINITY;
  let minV = Number.POSITIVE_INFINITY;
  let maxV = Number.NEGATIVE_INFINITY;
  for (const lap of channel.laps) {
    if (!lapNumbers.includes(lap.lapNumber)) continue;
    for (const s of lap.samples) {
      if (s.t < minT) minT = s.t;
      if (s.t > maxT) maxT = s.t;
      if (s.v < minV) minV = s.v;
      if (s.v > maxV) maxV = s.v;
    }
  }
  return { minT, maxT, minV, maxV };
}

function buildPath(samples: readonly TelemetrySample[], range: ChannelRange): string {
  if (samples.length === 0) return "";
  const tSpan = range.maxT - range.minT || 1;
  const vSpan = range.maxV - range.minV || 1;
  const points = samples.map((s) => {
    const x = ((s.t - range.minT) / tSpan) * CHART_W;
    const y = CHART_H - ((s.v - range.minV) / vSpan) * CHART_H;
    return `${x.toFixed(2)} ${y.toFixed(2)}`;
  });
  return `M ${points.join(" L ")}`;
}

export function SessionTelemetryTab({ telemetry }: SessionTelemetryTabProps) {
  const [activeKey, setActiveKey] = useState<string>(telemetry.channels[0]?.key ?? "");
  const [overlayAll, setOverlayAll] = useState(false);

  const activeChannel = useMemo(
    () => telemetry.channels.find((c) => c.key === activeKey) ?? telemetry.channels[0],
    [telemetry.channels, activeKey],
  );

  if (telemetry.channels.length === 0 || !activeChannel) {
    return (
      <section
        aria-label="Telemetry"
        className="flex flex-col gap-3 rounded border border-steel/30 bg-concrete p-5"
      >
        <p className="font-body text-muted text-sm">No telemetry recorded for this session.</p>
      </section>
    );
  }

  const visibleLapNumbers = overlayAll
    ? activeChannel.laps.map((l) => l.lapNumber)
    : activeChannel.laps.slice(0, 1).map((l) => l.lapNumber);
  const range = rangeOver(activeChannel, visibleLapNumbers);
  const hasSamples =
    Number.isFinite(range.minV) && Number.isFinite(range.maxV) && range.maxT > range.minT;

  return (
    <section
      aria-label="Telemetry"
      className="flex flex-col gap-3 rounded border border-steel/30 bg-concrete p-5"
    >
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <p className="font-telemetry text-steel text-[11px] uppercase tracking-[0.12em]">
          {activeChannel.label} ({activeChannel.unit})
        </p>
        <button
          type="button"
          onClick={() => setOverlayAll((v) => !v)}
          aria-pressed={overlayAll}
          className={
            overlayAll
              ? "rounded border border-pit-orange/70 text-pit-orange px-3 py-1 font-telemetry text-[11px] uppercase tracking-[0.12em] bg-pit-orange/10"
              : "rounded border border-steel/40 text-steel px-3 py-1 font-telemetry text-[11px] uppercase tracking-[0.12em] hover:border-steel/70"
          }
        >
          {overlayAll ? "Single lap" : "Overlay all laps"}
        </button>
      </header>
      <div className="flex flex-wrap gap-2">
        {telemetry.channels.map((channel) => (
          <button
            key={channel.key}
            type="button"
            onClick={() => setActiveKey(channel.key)}
            aria-pressed={channel.key === activeChannel.key}
            className={
              channel.key === activeChannel.key
                ? "rounded border border-pit-orange/70 text-pit-orange px-3 py-1 font-telemetry text-[11px] uppercase tracking-[0.12em] bg-pit-orange/10"
                : "rounded border border-steel/40 text-steel px-3 py-1 font-telemetry text-[11px] uppercase tracking-[0.12em] hover:border-steel/70"
            }
          >
            {channel.label}
          </button>
        ))}
      </div>
      {hasSamples ? (
        <>
          <svg
            role="img"
            aria-label="Telemetry chart"
            viewBox={`0 0 ${CHART_W} ${CHART_H}`}
            className="w-full h-48 text-pit-orange"
          >
            {activeChannel.laps
              .filter((l) => visibleLapNumbers.includes(l.lapNumber))
              .map((lap) => (
                <path
                  key={lap.lapNumber}
                  data-role="lap-line"
                  d={buildPath(lap.samples, range)}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeOpacity={overlayAll ? 0.7 : 1}
                />
              ))}
          </svg>
          <div
            role="region"
            aria-label="Chart legend"
            className="flex justify-between font-telemetry text-steel text-[10px] uppercase tracking-[0.12em] tabular-nums"
          >
            <span>{range.minV}</span>
            <span>{range.maxV}</span>
          </div>
        </>
      ) : (
        <p className="font-body text-muted text-sm">No samples for the selected channel.</p>
      )}
    </section>
  );
}
