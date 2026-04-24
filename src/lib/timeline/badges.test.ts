import { describe, it, expect } from "vitest";
import { newWeaknessesBadge, outcomeAchievedBadge, prescriptionsAcceptedBadge } from "./badges";

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

describe("prescriptionsAcceptedBadge", () => {
  it("returns null when the count is zero", () => {
    expect(prescriptionsAcceptedBadge(0)).toBeNull();
  });

  it("returns null when the count is negative (defensive)", () => {
    expect(prescriptionsAcceptedBadge(-2)).toBeNull();
  });

  it("labels a single accepted prescription in the singular", () => {
    expect(prescriptionsAcceptedBadge(1)).toEqual({
      label: "1 prescription accepted",
      tone: "info",
    });
  });

  it("labels multiple accepted prescriptions in the plural", () => {
    expect(prescriptionsAcceptedBadge(4)).toEqual({
      label: "4 prescriptions accepted",
      tone: "info",
    });
  });

  it("uses info tone so the badge reads as informational, not urgent", () => {
    expect(prescriptionsAcceptedBadge(2)?.tone).toBe("info");
  });

  it("returns null for non-integer counts", () => {
    expect(prescriptionsAcceptedBadge(2.5)).toBeNull();
  });

  it("returns null for NaN", () => {
    expect(prescriptionsAcceptedBadge(Number.NaN)).toBeNull();
  });
});

describe("outcomeAchievedBadge", () => {
  it("returns null when the outcome was not achieved", () => {
    expect(outcomeAchievedBadge(false)).toBeNull();
  });

  it("returns the 'Outcome achieved' badge when achieved is true", () => {
    expect(outcomeAchievedBadge(true)).toEqual({
      label: "Outcome achieved",
      tone: "success",
    });
  });

  it("uses success tone so the badge reads as a positive signal (green)", () => {
    expect(outcomeAchievedBadge(true)?.tone).toBe("success");
  });
});
