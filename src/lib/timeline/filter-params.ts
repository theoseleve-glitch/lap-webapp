export type TimelineSource = "all" | "sim" | "real";

export interface TimelineFilters {
  source: TimelineSource;
  track: string | null;
  car: string | null;
  from: string;
  to: string;
}

export const DEFAULT_TIMELINE_FILTERS: TimelineFilters = {
  source: "all",
  track: null,
  car: null,
  from: "",
  to: "",
};

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const SOURCES = new Set<TimelineSource>(["all", "sim", "real"]);

function isSource(value: string): value is TimelineSource {
  return SOURCES.has(value as TimelineSource);
}

export function encodeFilters(filters: TimelineFilters): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.source !== "all") {
    params.set("source", filters.source);
  }
  if (filters.track !== null) {
    params.set("track", filters.track);
  }
  if (filters.car !== null) {
    params.set("car", filters.car);
  }
  if (filters.from !== "") {
    params.set("from", filters.from);
  }
  if (filters.to !== "") {
    params.set("to", filters.to);
  }
  return params;
}

export function decodeFilters(params: URLSearchParams): TimelineFilters {
  const rawSource = params.get("source");
  const source: TimelineSource = rawSource !== null && isSource(rawSource) ? rawSource : "all";

  const track = params.get("track");
  const car = params.get("car");

  const rawFrom = params.get("from");
  const from = rawFrom !== null && ISO_DATE_RE.test(rawFrom) ? rawFrom : "";

  const rawTo = params.get("to");
  const to = rawTo !== null && ISO_DATE_RE.test(rawTo) ? rawTo : "";

  return { source, track, car, from, to };
}
