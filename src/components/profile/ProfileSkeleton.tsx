const SECTIONS: readonly {
  section: "hero" | "radar" | "weaknesses" | "prescriptions" | "readiness";
  className: string;
}[] = [
  { section: "hero", className: "h-28 rounded border border-steel/20 bg-concrete" },
  { section: "radar", className: "h-64 rounded border border-steel/20 bg-concrete" },
  { section: "weaknesses", className: "h-40 rounded border border-steel/20 bg-concrete" },
  { section: "prescriptions", className: "h-40 rounded border border-steel/20 bg-concrete" },
  { section: "readiness", className: "h-40 rounded border border-steel/20 bg-concrete" },
];

export function ProfileSkeleton() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading profile"
      className="flex flex-col gap-6"
    >
      {SECTIONS.slice(0, 2).map(({ section, className }) => (
        <div
          key={section}
          data-skeleton="profile-section"
          data-section={section}
          aria-hidden="true"
          className={className}
        />
      ))}
      <div className="grid gap-4 md:grid-cols-3">
        {SECTIONS.slice(2).map(({ section, className }) => (
          <div
            key={section}
            data-skeleton="profile-section"
            data-section={section}
            aria-hidden="true"
            className={className}
          />
        ))}
      </div>
    </div>
  );
}
