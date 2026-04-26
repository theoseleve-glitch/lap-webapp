export type SessionTabSkeletonVariant = "overview" | "laps" | "telemetry" | "coaching";

export interface SessionTabSkeletonProps {
  variant: SessionTabSkeletonVariant;
}

const PULSE = "animate-pulse rounded bg-steel/20";
const LABEL: Record<SessionTabSkeletonVariant, string> = {
  overview: "Loading session overview",
  laps: "Loading laps",
  telemetry: "Loading telemetry",
  coaching: "Loading coaching",
};

function OverviewSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            data-role="skeleton-kpi"
            className={`${PULSE} h-20 border border-steel/30 bg-concrete`}
          />
        ))}
      </div>
      <div
        data-role="skeleton-chart"
        className={`${PULSE} h-48 border border-steel/30 bg-concrete`}
      />
      <div className="flex flex-col gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`${PULSE} h-6 w-2/3`} />
        ))}
      </div>
    </div>
  );
}

function LapsSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div
        data-role="skeleton-table-header"
        className={`${PULSE} h-8 border border-steel/30 bg-concrete`}
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          data-role="skeleton-table-row"
          className={`${PULSE} h-10 border border-steel/20 bg-graphite/30`}
        />
      ))}
    </div>
  );
}

function TelemetrySkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`${PULSE} h-7 w-24`} />
        ))}
      </div>
      <div
        data-role="skeleton-chart"
        className={`${PULSE} h-48 border border-steel/30 bg-concrete`}
      />
    </div>
  );
}

function CoachingSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          data-role="skeleton-card"
          className={`${PULSE} h-20 border border-steel/30 bg-concrete`}
        />
      ))}
    </div>
  );
}

const VARIANT_RENDER: Record<SessionTabSkeletonVariant, () => JSX.Element> = {
  overview: OverviewSkeleton,
  laps: LapsSkeleton,
  telemetry: TelemetrySkeleton,
  coaching: CoachingSkeleton,
};

export function SessionTabSkeleton({ variant }: SessionTabSkeletonProps) {
  const Render = VARIANT_RENDER[variant];
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label={LABEL[variant]}
      className="flex flex-col gap-4 rounded border border-steel/30 bg-concrete p-5"
    >
      <Render />
    </div>
  );
}
