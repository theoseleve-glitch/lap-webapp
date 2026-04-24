export interface ActivePrescriptionItem {
  id: string;
  title: string;
  detailHref: string;
}

export interface ActivePrescriptionsListProps {
  prescriptions: readonly ActivePrescriptionItem[];
  max?: number;
}

export function ActivePrescriptionsList({ prescriptions, max = 5 }: ActivePrescriptionsListProps) {
  const items = prescriptions.slice(0, Math.max(0, max));

  return (
    <section className="flex flex-col gap-3 rounded border border-steel/30 bg-concrete p-5">
      <h2 className="font-monument text-chalk text-lg leading-[var(--lh-heading)] tracking-[var(--ls-display)]">
        Active prescriptions
      </h2>

      {items.length === 0 ? (
        <p className="font-body text-muted text-sm leading-[var(--lh-body)]">
          No active prescriptions right now.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={item.detailHref}
                className="flex items-center justify-between gap-3 rounded border border-steel/20 p-3 no-underline hover:border-steel/50"
              >
                <span className="font-body text-chalk text-sm">{item.title}</span>
                <span
                  aria-hidden="true"
                  className="shrink-0 font-telemetry text-[11px] uppercase tracking-[0.12em] text-pit-orange"
                >
                  Open
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
