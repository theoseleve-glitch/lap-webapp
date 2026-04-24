import { describe, it, expect } from "vitest";
import {
  DEFAULT_TIMELINE_FILTERS,
  decodeFilters,
  encodeFilters,
  type TimelineFilters,
} from "./filter-params";

function paramsOf(obj: Record<string, string>): URLSearchParams {
  return new URLSearchParams(obj);
}

describe("encodeFilters", () => {
  it("returns empty params for the default filters", () => {
    expect(encodeFilters(DEFAULT_TIMELINE_FILTERS).toString()).toBe("");
  });

  it("omits source when it is 'all'", () => {
    const params = encodeFilters({
      ...DEFAULT_TIMELINE_FILTERS,
      source: "all",
    });
    expect(params.has("source")).toBe(false);
  });

  it("encodes a non-default source", () => {
    expect(encodeFilters({ ...DEFAULT_TIMELINE_FILTERS, source: "sim" }).get("source")).toBe("sim");
  });

  it("omits track when null, encodes it otherwise", () => {
    expect(encodeFilters({ ...DEFAULT_TIMELINE_FILTERS, track: null }).has("track")).toBe(false);
    expect(encodeFilters({ ...DEFAULT_TIMELINE_FILTERS, track: "zandvoort" }).get("track")).toBe(
      "zandvoort",
    );
  });

  it("omits car when null, encodes it otherwise", () => {
    expect(encodeFilters({ ...DEFAULT_TIMELINE_FILTERS, car: null }).has("car")).toBe(false);
    expect(encodeFilters({ ...DEFAULT_TIMELINE_FILTERS, car: "m4-gt4" }).get("car")).toBe("m4-gt4");
  });

  it("encodes non-empty from and to dates", () => {
    const params = encodeFilters({
      ...DEFAULT_TIMELINE_FILTERS,
      from: "2026-04-01",
      to: "2026-04-24",
    });
    expect(params.get("from")).toBe("2026-04-01");
    expect(params.get("to")).toBe("2026-04-24");
  });

  it("omits from and to when empty", () => {
    const params = encodeFilters({
      ...DEFAULT_TIMELINE_FILTERS,
      from: "",
      to: "",
    });
    expect(params.has("from")).toBe(false);
    expect(params.has("to")).toBe(false);
  });
});

describe("decodeFilters", () => {
  it("returns defaults from empty params", () => {
    expect(decodeFilters(new URLSearchParams())).toEqual(DEFAULT_TIMELINE_FILTERS);
  });

  it("parses a valid source", () => {
    expect(decodeFilters(paramsOf({ source: "sim" })).source).toBe("sim");
    expect(decodeFilters(paramsOf({ source: "real" })).source).toBe("real");
    expect(decodeFilters(paramsOf({ source: "all" })).source).toBe("all");
  });

  it("falls back to 'all' for an unknown source value", () => {
    expect(decodeFilters(paramsOf({ source: "🚗" })).source).toBe("all");
  });

  it("parses track and car as plain strings", () => {
    const out = decodeFilters(paramsOf({ track: "monza", car: "porsche-gt3r" }));
    expect(out.track).toBe("monza");
    expect(out.car).toBe("porsche-gt3r");
  });

  it("parses from and to as ISO date strings", () => {
    const out = decodeFilters(paramsOf({ from: "2026-04-01", to: "2026-04-24" }));
    expect(out.from).toBe("2026-04-01");
    expect(out.to).toBe("2026-04-24");
  });

  it("rejects non-ISO date strings and returns empty", () => {
    const out = decodeFilters(paramsOf({ from: "yesterday", to: "tomorrow" }));
    expect(out.from).toBe("");
    expect(out.to).toBe("");
  });

  it("ignores unknown params", () => {
    expect(decodeFilters(paramsOf({ cheese: "gouda", source: "sim" }))).toEqual({
      ...DEFAULT_TIMELINE_FILTERS,
      source: "sim",
    });
  });
});

describe("encode/decode round-trip", () => {
  it("preserves a fully-populated filter object", () => {
    const filters: TimelineFilters = {
      source: "sim",
      track: "zandvoort",
      car: "m4-gt4",
      from: "2026-04-01",
      to: "2026-04-24",
    };
    expect(decodeFilters(encodeFilters(filters))).toEqual(filters);
  });

  it("preserves the default filter object", () => {
    expect(decodeFilters(encodeFilters(DEFAULT_TIMELINE_FILTERS))).toEqual(
      DEFAULT_TIMELINE_FILTERS,
    );
  });

  it("preserves a partially-populated filter object", () => {
    const filters: TimelineFilters = {
      source: "real",
      track: null,
      car: null,
      from: "2026-03-01",
      to: "",
    };
    expect(decodeFilters(encodeFilters(filters))).toEqual(filters);
  });
});
