import { describe, it, expect } from "vitest";
import { newWeaknessesBadge } from "./badges";

describe("newWeaknessesBadge", () => {
  it("returns null when the count is zero", () => {
    expect(newWeaknessesBadge(0)).toBeNull();
  });

  it("returns null when the count is negative (defensive)", () => {
    expect(newWeaknessesBadge(-1)).toBeNull();
  });

  it("labels a single weakness in the singular", () => {
    expect(newWeaknessesBadge(1)).toEqual({
      label: "1 new weakness",
      tone: "warning",
    });
  });

  it("labels multiple weaknesses in the plural", () => {
    expect(newWeaknessesBadge(3)).toEqual({
      label: "3 new weaknesses",
      tone: "warning",
    });
  });

  it("uses warning tone so the badge reads as attention-needed", () => {
    expect(newWeaknessesBadge(2)?.tone).toBe("warning");
  });

  it("returns null for non-integer counts", () => {
    expect(newWeaknessesBadge(1.5)).toBeNull();
  });

  it("returns null for NaN", () => {
    expect(newWeaknessesBadge(Number.NaN)).toBeNull();
  });
});
