export interface CompareSessionSummary {
  id: string;
  title: string;
  date: string;
  detailHref?: string;
  scoreLabel?: string;
}

export interface CompareOutcome {
  summary: string;
}

export interface CompareCaseLayoutProps {
  sessions: readonly CompareSessionSummary[];
  rationale: string;
  outcome?: CompareOutcome;
}

function SessionCard({ session }: { session: CompareSessionSummary }) {
  const body = (
    <div className="flex flex-col gap-1">
      <span className="font-body text-chalk text-sm">{session.title}</span>
      <span className="font-telemetry text-steel text-[11px] uppercase tracking-[0.12em]">
        {session.date}
      </span>
      {session.scoreLabel && (
        <span className="font-telemetry text-pit-orange text-[11px] uppercase tracking-[0.12em]">
          {session.scoreLabel}
        </span>
      )}
    </div>
  );

  if (session.detailHref) {
    return (
      <a
        href={session.detailHref}
        className="block rounded border border-steel/20 p-4 no-underline hover:border-steel/50"
      >
        {body}
      </a>
    );
  }
  return <div className="rounded border border-steel/20 p-4">{body}</div>;
}

export function CompareCaseLayout({ sessions, rationale, outcome }: CompareCaseLayoutProps) {
  return (
    <div data-layout="compare-case" className="flex flex-col gap-6">
      <section
        aria-label="Sessions"
        className="flex flex-col gap-3 rounded border border-steel/30 bg-concrete p-5"
      >
        <h2 className="font-monument text-chalk text-lg leading-[var(--lh-heading)] tracking-[var(--ls-display)]">
          Sessions
        </h2>
        <ul data-layout="compare-sessions" className="grid gap-3 md:grid-cols-2">
          {sessions.map((session) => (
            <li key={session.id}>
              <SessionCard session={session} />
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-label="Rationale"
        className="flex flex-col gap-3 rounded border border-steel/30 bg-concrete p-5"
      >
        <h2 className="font-monument text-chalk text-lg leading-[var(--lh-heading)] tracking-[var(--ls-display)]">
          Rationale
        </h2>
        <p className="font-body text-chalk text-sm leading-[var(--lh-body)]">{rationale}</p>
      </section>

      <section
        aria-label="Outcome"
        className="flex flex-col gap-3 rounded border border-steel/30 bg-concrete p-5"
      >
        <h2 className="font-monument text-chalk text-lg leading-[var(--lh-heading)] tracking-[var(--ls-display)]">
          Outcome
        </h2>
        {outcome ? (
          <p className="font-body text-chalk text-sm leading-[var(--lh-body)]">{outcome.summary}</p>
        ) : (
          <p className="font-body text-muted text-sm leading-[var(--lh-body)]">
            Outcome pending — recompute will run after the next session ingestion.
          </p>
        )}
      </section>
    </div>
  );
}
