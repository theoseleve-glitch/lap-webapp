import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { assertNoAxeViolations } from "@/lib/axe";
import {
  SessionCoachingTab,
  type CoachingPrescription,
  type SessionCoachingView,
} from "./SessionCoachingTab";

const FULL: SessionCoachingView = {
  newWeaknesses: [
    {
      id: "w1",
      title: "Late braking, Turn 1 — long title that should wrap on mobile viewports",
      category: "braking",
      severity: "high",
    },
  ],
  escalatedWeaknesses: [
    {
      id: "w2",
      title: "Throttle modulation, Turn 7",
      category: "throttle",
      severity: "medium",
    },
  ],
  prescriptions: [
    {
      id: "p1",
      title: "Threshold braking drill — emphasises pedal-pressure release smoothness",
      description: "10 laps focusing on brake-pressure release with reference markers at T1.",
      difficulty: "intermediate",
    },
  ],
  dataQualityInsufficient: false,
};

function makePrescriptions(count: number): CoachingPrescription[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `p${i + 1}`,
    title: `Drill ${i + 1}`,
    description: `Description for drill ${i + 1}`,
    difficulty: "intermediate" as const,
  }));
}

describe("SessionCoachingTab responsive (T106)", () => {
  it("allows weakness titles to shrink and wrap (min-w-0 on text container)", () => {
    const { container } = render(<SessionCoachingTab coaching={FULL} />);
    const weaknessSection = container.querySelector("[aria-label='New weaknesses']");
    expect(weaknessSection).not.toBeNull();
    // The flex column wrapping title+category needs min-w-0 to shrink below
    // content width on narrow viewports, otherwise the parent overflows.
    const textWrapper = weaknessSection?.querySelector("li > div.flex.flex-col");
    expect(textWrapper?.className).toMatch(/min-w-0/);
  });

  it("keeps weakness severity badges from shrinking on narrow viewports", () => {
    const { container } = render(<SessionCoachingTab coaching={FULL} />);
    const weaknessSection = container.querySelector("[aria-label='New weaknesses']");
    const badge = weaknessSection?.querySelector("li > span");
    expect(badge?.className).toMatch(/flex-shrink-0/);
    expect(badge?.className).toMatch(/whitespace-nowrap/);
  });

  it("allows prescription titles to wrap and badges to stay readable", () => {
    const { container } = render(<SessionCoachingTab coaching={FULL} />);
    const presSection = container.querySelector("[aria-label='Prescriptions']");
    expect(presSection).not.toBeNull();
    const titleRow = presSection?.querySelector("li > div.flex");
    // Title span (first child) should be allowed to shrink; difficulty badge
    // (second child) should not.
    const title = titleRow?.querySelector("span:first-child");
    const badge = titleRow?.querySelector("span:last-child");
    expect(title?.className).toMatch(/min-w-0/);
    expect(badge?.className).toMatch(/flex-shrink-0/);
    expect(badge?.className).toMatch(/whitespace-nowrap/);
  });

  it("allows the pagination row to wrap when the viewport is too narrow", () => {
    const view: SessionCoachingView = {
      newWeaknesses: [],
      escalatedWeaknesses: [],
      prescriptions: makePrescriptions(15),
      dataQualityInsufficient: false,
    };
    const { container } = render(<SessionCoachingTab coaching={view} />);
    const pagination = container.querySelector(
      "[aria-label='Prescriptions'] > div.flex.items-center.justify-between",
    );
    expect(pagination).not.toBeNull();
    expect(pagination?.className).toMatch(/flex-wrap/);
  });

  it("renders without axe violations with full content", async () => {
    const { container } = render(<SessionCoachingTab coaching={FULL} />);
    await assertNoAxeViolations(container);
  });

  it("renders without axe violations with paginated prescriptions", async () => {
    const view: SessionCoachingView = {
      newWeaknesses: [],
      escalatedWeaknesses: [],
      prescriptions: makePrescriptions(15),
      dataQualityInsufficient: false,
    };
    const { container } = render(<SessionCoachingTab coaching={view} />);
    await assertNoAxeViolations(container);
  });
});
