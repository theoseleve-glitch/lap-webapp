import type { TimelineBadge } from "@/components/timeline/TimelineEntry";

export function newWeaknessesBadge(count: number): TimelineBadge | null {
  if (!Number.isInteger(count) || count <= 0) {
    return null;
  }
  const noun = count === 1 ? "weakness" : "weaknesses";
  return {
    label: `${count} new ${noun}`,
    tone: "warning",
  };
}
