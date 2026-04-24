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

export function prescriptionsAcceptedBadge(count: number): TimelineBadge | null {
  if (!Number.isInteger(count) || count <= 0) {
    return null;
  }
  const noun = count === 1 ? "prescription" : "prescriptions";
  return {
    label: `${count} ${noun} accepted`,
    tone: "info",
  };
}
