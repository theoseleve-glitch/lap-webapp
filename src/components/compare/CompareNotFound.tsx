export interface CompareNotFoundProps {
  backHref: string;
}

export function CompareNotFound({ backHref }: CompareNotFoundProps) {
  return (
    <section
      aria-label="Compare case not found"
      className="flex flex-col items-center gap-4 rounded border border-steel/30 bg-concrete p-10 text-center"
    >
      <h2 className="font-monument text-chalk text-xl leading-[var(--lh-heading)] tracking-[var(--ls-display)]">
        Compare case not found
      </h2>
      <p className="font-body text-muted text-sm leading-[var(--lh-body)]">
        We can&apos;t find a compare case at this link. It may have been deleted or the URL may be
        stale.
      </p>
      <a
        href={backHref}
        className="rounded border border-pit-orange/70 text-pit-orange px-4 py-2 font-telemetry text-[11px] uppercase tracking-[0.12em] hover:bg-pit-orange/10"
      >
        Back to compare list
      </a>
    </section>
  );
}
