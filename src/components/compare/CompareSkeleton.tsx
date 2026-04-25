const SECTIONS: readonly {
  section: "sessions" | "rationale" | "outcome";
  className: string;
}[] = [
  { section: "sessions", className: "h-32 rounded border border-steel/20 bg-concrete" },
  { section: "rationale", className: "h-24 rounded border border-steel/20 bg-concrete" },
  { section: "outcome", className: "h-24 rounded border border-steel/20 bg-concrete" },
];

export function CompareSkeleton() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading compare case"
      className="flex flex-col gap-6"
    >
      {SECTIONS.map(({ section, className }) => (
        <div
          key={section}
          data-skeleton="compare-section"
          data-section={section}
          aria-hidden="true"
          className={className}
        />
      ))}
    </div>
  );
}
