import { describe, it, expect } from "vitest";
import { shouldShowTrialBanner } from "./shouldShowTrialBanner";

describe("shouldShowTrialBanner", () => {
  it("returns false for inactive trial (already on a paid plan)", () => {
    expect(shouldShowTrialBanner({ status: "inactive" })).toBe(false);
  });

  it("returns false for expired trial (handled by hard gate, not soft banner)", () => {
    expect(shouldShowTrialBanner({ status: "expired", expiredOn: "Apr 1, 2026" })).toBe(false);
  });

  it("returns false when active with more than 48h remaining", () => {
    expect(
      shouldShowTrialBanner({ status: "active", daysRemaining: 7, expiresOn: "Apr 30, 2026" }),
    ).toBe(false);
  });

  it("returns false when active with exactly 3 days remaining (just outside the 48h window)", () => {
    expect(
      shouldShowTrialBanner({ status: "active", daysRemaining: 3, expiresOn: "Apr 28, 2026" }),
    ).toBe(false);
  });

  it("returns true when active with 2 days remaining (right at the 48h threshold)", () => {
    expect(
      shouldShowTrialBanner({ status: "active", daysRemaining: 2, expiresOn: "Apr 27, 2026" }),
    ).toBe(true);
  });

  it("returns true when active with 1 day remaining", () => {
    expect(
      shouldShowTrialBanner({ status: "active", daysRemaining: 1, expiresOn: "Apr 26, 2026" }),
    ).toBe(true);
  });

  it("returns true when active with 0 days remaining (expires today)", () => {
    expect(
      shouldShowTrialBanner({ status: "active", daysRemaining: 0, expiresOn: "Apr 25, 2026" }),
    ).toBe(true);
  });
});
