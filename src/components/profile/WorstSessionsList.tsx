export interface WorstSessionItem {
  id: string;
  title: string;
  date: string;
  score: number;
  detailHref?: string;
}

export interface WorstSessionsListProps {
  sessions: readonly WorstSessionItem[];
  max?: number;
}

function ScoreBadge({ score }: { score: number }) {
  return (
    <span
      data-role="worst-score"
      className="shrink-0 inline-block rounded border border-safety-red/60 text-safety-red px-2 py-0.5 font-telemetry text-[11px] uppercase tracking-[0.12em] tabular-nums"
    >
      {Math.round(score)}
    </span>
  );
}

function Row({ item }: { item: WorstSessionItem }) {
  const body = (
    <>
      <span className="font-body text-chalk text-sm">{item.title}</span>
      <ScoreBadge score={item.score} />
    </>
  );
  if (item.detailHref) {
    return (
      <a
        href={item.detailHref}
        className="flex items-center justify-between gap-3 rounded border border-steel/20 p-3 no-underline hover:border-steel/50"
      >
        {body}
      </a>
    );
  }
  return (
    <div className="flex items-center justify-between gap-3 rounded border border-steel/20 p-3">
      {body}
    </div>
  );
}

export function WorstSessionsList({ sessions, max = 5 }: WorstSessionsListProps) {
  const items = sessions.slice(0, Math.max(0, max));

  return (
    <section className="flex flex-col gap-3 rounded border border-steel/30 bg-concrete p-5">
      <h2 className="font-monument text-chalk text-lg leading-[var(--lh-heading)] tracking-[var(--ls-display)]">
        Worst sessions
      </h2>
      {items.length === 0 ? (
        <p className="font-body text-muted text-sm leading-[var(--lh-body)]">
          No weak sessions yet.
        </p>
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
