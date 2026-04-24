import { describe, it, expect } from "vitest";
import { groupByWeek } from "./groupByWeek";

describe("groupByWeek", () => {
  it("returns no groups for empty input", () => {
    expect(groupByWeek([])).toEqual([]);
  });

  it("puts a single item into one group keyed to its ISO week start (Monday)", () => {
    const groups = groupByWeek([{ iso: "2026-04-24", id: "a" }]); // Friday
    expect(groups).toHaveLength(1);
    expect(groups[0]?.weekStartISO).toBe("2026-04-20"); // preceding Monday
    expect(groups[0]?.items).toEqual([{ iso: "2026-04-24", id: "a" }]);
  });

  it("groups Monday-through-Sunday into the same week", () => {
    const groups = groupByWeek([
      { iso: "2026-04-20", id: "mon" },
      { iso: "2026-04-22", id: "wed" },
      { iso: "2026-04-26", id: "sun" },
    ]);
    expect(groups).toHaveLength(1);
    expect(groups[0]?.weekStartISO).toBe("2026-04-20");
  });

  it("puts Sunday into the previous week (ISO Monday-start)", () => {
    const groups = groupByWeek([
      { iso: "2026-04-19", id: "prev-sun" },
      { iso: "2026-04-20", id: "this-mon" },
    ]);
    expect(groups).toHaveLength(2);
    const weekStarts = groups.map((g) => g.weekStartISO);
    expect(weekStarts).toContain("2026-04-13");
    expect(weekStarts).toContain("2026-04-20");
  });

  it("sorts groups from newest to oldest", () => {
    const groups = groupByWeek([
      { iso: "2026-03-15", id: "old" },
      { iso: "2026-04-24", id: "new" },
      { iso: "2026-04-01", id: "mid" },
    ]);
    expect(groups.map((g) => g.weekStartISO)).toEqual(["2026-04-20", "2026-03-30", "2026-03-09"]);
  });

  it("preserves input order within a week", () => {
    const groups = groupByWeek([
      { iso: "2026-04-24", id: "first" },
      { iso: "2026-04-22", id: "second" },
      { iso: "2026-04-20", id: "third" },
    ]);
    expect(groups).toHaveLength(1);
    expect(groups[0]?.items.map((i) => i.id)).toEqual(["first", "second", "third"]);
  });

  it("labels each group 'Week of DD Mon YYYY'", () => {
    const groups = groupByWeek([{ iso: "2026-04-24", id: "a" }]);
    expect(groups[0]?.label).toBe("Week of 20 Apr 2026");
  });

  it("handles ISO dates that cross a month boundary within a week", () => {
    const groups = groupByWeek([
      { iso: "2026-04-30", id: "thu" }, // Thursday
      { iso: "2026-05-03", id: "sun" }, // Sunday of same week
    ]);
    expect(groups).toHaveLength(1);
    expect(groups[0]?.weekStartISO).toBe("2026-04-27");
  });

  it("rejects invalid ISO dates with a clear error", () => {
    expect(() => groupByWeek([{ iso: "not-a-date", id: "x" }])).toThrow(/invalid iso/i);
  });
});
