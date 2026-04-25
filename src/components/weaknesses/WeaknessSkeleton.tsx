const SECTIONS: readonly {
  section: "header" | "trend" | "evidence" | "prescriptions";
  className: string;
}[] = [
  { section: "header", className: "h-24 rounded border border-steel/20 bg-concrete" },
  { section: "trend", className: "h-48 rounded border border-steel/20 bg-concrete" },
  { section: "evidence", className: "h-40 rounded border border-steel/20 bg-concrete" },
  { section: "prescriptions", className: "h-40 rounded border border-steel/20 bg-concrete" },
];

export function WeaknessSkeleton() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading weakness"
      className="flex flex-col gap-6"
    >
      {SECTIONS.slice(0, 2).map(({ section, className }) => (
        <div
          key={section}
          data-skeleton="weakness-section"
          data-section={section}
          aria-hidden="true"
          className={className}
        />
      ))}
      <div className="grid gap-4 md:grid-cols-2">
        {SECTIONS.slice(2).map(({ section, className }) => (
          <div
            key={section}
            data-skeleton="weakness-section"
            data-section={section}
            aria-hidden="true"
            className={className}
          />
        ))}
      </div>
    </div>
  );
}
