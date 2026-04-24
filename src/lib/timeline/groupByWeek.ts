const ISO_RE = /^(\d{4})-(\d{2})-(\d{2})$/;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_MS = 86_400_000;

export interface GroupableByWeek {
  iso: string;
}

export interface WeekGroup<T extends GroupableByWeek> {
  weekStartISO: string;
  label: string;
  items: T[];
}

function parseIso(iso: string): Date {
  const match = ISO_RE.exec(iso);
  if (!match) {
    throw new Error(`Invalid ISO date: ${iso}`);
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    Number.isNaN(date.getTime()) ||
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    throw new Error(`Invalid ISO date: ${iso}`);
  }
  return date;
}

function toIso(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function weekStart(date: Date): Date {
  const offset = (date.getUTCDay() + 6) % 7;
  return new Date(date.getTime() - offset * DAY_MS);
}

function formatLabel(date: Date): string {
  return `Week of ${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export function groupByWeek<T extends GroupableByWeek>(items: readonly T[]): WeekGroup<T>[] {
  const groups = new Map<string, WeekGroup<T>>();

  for (const item of items) {
    const start = weekStart(parseIso(item.iso));
    const key = toIso(start);
    const existing = groups.get(key);
    if (existing) {
      existing.items.push(item);
    } else {
      groups.set(key, {
        weekStartISO: key,
        label: formatLabel(start),
        items: [item],
      });
    }
  }

  return [...groups.values()].sort((a, b) => {
    if (a.weekStartISO < b.weekStartISO) return 1;
    if (a.weekStartISO > b.weekStartISO) return -1;
    return 0;
  });
}
