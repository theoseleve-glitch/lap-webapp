import { OutcomeBadge, type OutcomeStatus } from "@/components/coaching/OutcomeBadge";

export interface LinkedPrescriptionItem {
  id: string;
  title: string;
  detailHref?: string;
  outcome?: OutcomeStatus;
}

export interface LinkedPrescriptionsListProps {
  prescriptions: readonly LinkedPrescriptionItem[];
  max?: number;
}

function Row({ item }: { item: LinkedPrescriptionItem }) {
  const body = (
    <>
      <span className="font-body text-chalk text-sm">{item.title}</span>
      {item.outcome && <OutcomeBadge status={item.outcome} />}
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

export function LinkedPrescriptionsList({ prescriptions, max = 5 }: LinkedPrescriptionsListProps) {
  const items = prescriptions.slice(0, Math.max(0, max));

  return (
    <section className="flex flex-col gap-3 rounded border border-steel/30 bg-concrete p-5">
      <h2 className="font-monument text-chalk text-lg leading-[var(--lh-heading)] tracking-[var(--ls-display)]">
        Linked prescriptions
      </h2>
      {items.length === 0 ? (
        <p className="font-body text-muted text-sm leading-[var(--lh-body)]">
          No prescriptions linked yet.
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
