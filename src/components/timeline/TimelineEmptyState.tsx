export interface TimelineEmptyStateProps {
  uploadHref: string;
}

export function TimelineEmptyState({ uploadHref }: TimelineEmptyStateProps) {
  return (
    <section
      aria-label="Timeline empty state"
      className="flex flex-col items-center gap-4 rounded border border-steel/30 bg-concrete p-10 text-center"
    >
      <h2 className="font-monument text-chalk text-xl leading-[var(--lh-heading)] tracking-[var(--ls-display)]">
        No sessions yet
      </h2>
      <p className="font-body text-muted text-sm leading-[var(--lh-body)]">
        Upload your first session to see it here.
      </p>
      <a
        href={uploadHref}
        className="rounded border border-pit-orange/70 text-pit-orange px-4 py-2 font-telemetry text-[11px] uppercase tracking-[0.12em] hover:bg-pit-orange/10"
      >
        Upload session
      </a>
    </section>
  );
}
