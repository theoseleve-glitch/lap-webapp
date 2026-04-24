export interface TimelineSkeletonProps {
  count?: number;
}

export function TimelineSkeleton({ count = 3 }: TimelineSkeletonProps) {
  const safeCount = Math.max(1, Math.floor(count));

  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading sessions"
      className="flex flex-col gap-3"
    >
      {Array.from({ length: safeCount }).map((_, index) => (
        <div
          key={index}
          data-skeleton="card"
          aria-hidden="true"
          className="flex flex-col gap-3 rounded border border-steel/20 bg-concrete p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="h-5 w-2/3 rounded bg-steel/20" />
            <div className="h-4 w-20 rounded bg-steel/20" />
          </div>
          <div className="h-3 w-1/2 rounded bg-steel/10" />
          <div className="flex gap-2">
            <div className="h-5 w-14 rounded bg-steel/10" />
            <div className="h-5 w-14 rounded bg-steel/10" />
            <div className="h-5 w-14 rounded bg-steel/10" />
          </div>
        </div>
      ))}
    </div>
  );
}
