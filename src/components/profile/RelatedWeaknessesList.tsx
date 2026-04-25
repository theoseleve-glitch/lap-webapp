import type { WeaknessSeverity } from "@/components/coaching/WeaknessEpisodeCard";

export type RelatedWeaknessStatus = "open" | "resolved";

export interface RelatedWeaknessItem {
  id: string;
  title: string;
  severity: WeaknessSeverity;
  detailHref: string;
  status?: RelatedWeaknessStatus;
}

export interface RelatedWeaknessesListProps {
  weaknesses: readonly RelatedWeaknessItem[];
  max?: number;
}

const SEVERITY_TONE: Record<WeaknessSeverity, string> = {
  low: "border-steel/50 text-steel",
  medium: "border-marshal-yellow/60 text-marshal-yellow",
  high: "border-pit-orange/60 text-pit-orange",
  critical: "border-safety-red/70 text-safety-red",
};

export function RelatedWeaknessesList({ weaknesses, max = 5 }: RelatedWeaknessesListProps) {
  const items = weaknesses.slice(0, Math.max(0, max));

  return (
    <section className="flex flex-col gap-3 rounded border border-steel/30 bg-concrete p-5">
      <h2 className="font-monument text-chalk text-lg leading-[var(--lh-heading)] tracking-[var(--ls-display)]">
        Related weaknesses
      </h2>

      {items.length === 0 ? (
        <p className="font-body text-muted text-sm leading-[var(--lh-body)]">
          No related weaknesses for this skill.
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
                <span className="flex shrink-0 items-center gap-2">
                  {item.status === "resolved" && (
                    <span className="inline-block rounded border border-acid-green/60 text-acid-green px-2 py-0.5 font-telemetry text-[11px] uppercase tracking-[0.12em]">
                      Resolved
                    </span>
                  )}
                  <span
                    className={`inline-block rounded border px-2 py-0.5 font-telemetry text-[11px] uppercase tracking-[0.12em] ${SEVERITY_TONE[item.severity]}`}
                  >
                    {item.severity}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
