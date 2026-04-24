import { useId } from "react";

export type TimelineBadgeTone = "success" | "warning" | "info" | "neutral";

export interface TimelineBadge {
  label: string;
  tone?: TimelineBadgeTone;
}

export interface TimelineEntryProps {
  title: string;
  date: string;
  href: string;
  subtitle?: string;
  tags?: readonly string[];
  badges?: readonly TimelineBadge[];
}

const BADGE_TONE: Record<TimelineBadgeTone, string> = {
  success: "border-acid-green/60 text-acid-green",
  warning: "border-marshal-yellow/60 text-marshal-yellow",
  info: "border-pit-orange/60 text-pit-orange",
  neutral: "border-steel/50 text-steel",
};

export function TimelineEntry({ title, date, href, subtitle, tags, badges }: TimelineEntryProps) {
  const headingId = useId();

  return (
    <article
      aria-labelledby={headingId}
      className="flex flex-col gap-3 rounded border border-steel/30 bg-concrete p-4"
    >
      <a
        href={href}
        className="flex flex-col gap-2 no-underline hover:text-chalk focus-visible:outline-none"
      >
        <div className="flex items-start justify-between gap-3">
          <h3
            id={headingId}
            className="font-monument text-chalk text-lg leading-[var(--lh-heading)] tracking-[var(--ls-display)]"
          >
            {title}
          </h3>
          <time className="shrink-0 font-telemetry text-steel text-[11px] uppercase tracking-[0.12em]">
            {date}
          </time>
        </div>
        {subtitle && (
          <p className="font-body text-muted text-sm leading-[var(--lh-body)]">{subtitle}</p>
        )}
      </a>

      {tags && tags.length > 0 && (
        <ul
          aria-label="Tags"
          className="flex flex-wrap gap-2 font-telemetry text-[11px] uppercase tracking-[0.12em]"
        >
          {tags.map((tag) => (
            <li
              key={tag}
              className="inline-block rounded border border-steel/40 text-steel px-2 py-0.5"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      {badges && badges.length > 0 && (
        <ul className="flex flex-wrap gap-2 font-telemetry text-[11px] uppercase tracking-[0.12em]">
          {badges.map((badge) => {
            const tone = badge.tone ?? "neutral";
            return (
              <li
                key={badge.label}
                data-tone={tone}
                className={`inline-block rounded border px-2 py-0.5 ${BADGE_TONE[tone]}`}
              >
                {badge.label}
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
}
