export interface EvidenceSessionItem {
  id: string;
  sessionTitle: string;
  date: string;
  evidenceNote?: string;
  detailHref?: string;
}

export interface EvidenceSessionsListProps {
  sessions: readonly EvidenceSessionItem[];
  max?: number;
}

function Row({ item }: { item: EvidenceSessionItem }) {
  const body = (
    <div className="flex flex-col gap-1">
      <span className="font-body text-chalk text-sm">{item.sessionTitle}</span>
      <span className="font-telemetry text-steel text-[11px] uppercase tracking-[0.12em]">
        {item.date}
      </span>
      {item.evidenceNote && (
        <span data-role="evidence-note" className="font-body text-muted text-xs">
          {item.evidenceNote}
        </span>
      )}
    </div>
  );

  if (item.detailHref) {
    return (
      <a
        href={item.detailHref}
        className="block rounded border border-steel/20 p-3 no-underline hover:border-steel/50"
      >
        {body}
      </a>
    );
  }
  return <div className="rounded border border-steel/20 p-3">{body}</div>;
}

export function EvidenceSessionsList({ sessions, max = 5 }: EvidenceSessionsListProps) {
  const items = sessions.slice(0, Math.max(0, max));

  return (
    <section className="flex flex-col gap-3 rounded border border-steel/30 bg-concrete p-5">
      <h2 className="font-monument text-chalk text-lg leading-[var(--lh-heading)] tracking-[var(--ls-display)]">
        Evidence sessions
      </h2>
      {items.length === 0 ? (
        <p className="font-body text-muted text-sm leading-[var(--lh-body)]">No evidence yet.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li key={item.id}>
              <Row item={item} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
