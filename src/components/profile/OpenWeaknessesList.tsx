import type { WeaknessSeverity } from "@/components/coaching/WeaknessEpisodeCard";

export interface OpenWeaknessItem {
  id: string;
  title: string;
  severity: WeaknessSeverity;
  detailHref: string;
}

export interface OpenWeaknessesListProps {
  weaknesses: readonly OpenWeaknessItem[];
  max?: number;
}

const SEVERITY_TONE: Record<WeaknessSeverity, string> = {
  low: "border-steel/50 text-steel",
  medium: "border-marshal-yellow/60 text-marshal-yellow",
  high: "border-pit-orange/60 text-pit-orange",
  critical: "border-safety-red/70 text-safety-red",
};

export function OpenWeaknessesList({ weaknesses, max = 5 }: OpenWeaknessesListProps) {
  const items = weaknesses.slice(0, Math.max(0, max));

  return (
    <section className="flex flex-col gap-3 rounded border border-steel/30 bg-concrete p-5">
      <h2 className="font-monument text-chalk text-lg leading-[var(--lh-heading)] tracking-[var(--ls-display)]">
        Open weaknesses
      </h2>

      {items.length === 0 ? (
        <p className="font-body text-muted text-sm leading-[var(--lh-body)]">
          No open weaknesses. Nice work.
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
                  className={`shrink-0 inline-block rounded border px-2 py-0.5 font-telemetry text-[11px] uppercase tracking-[0.12em] ${SEVERITY_TONE[item.severity]}`}
                >
                  {item.severity}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
