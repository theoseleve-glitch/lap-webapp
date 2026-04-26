import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { assertNoAxeViolations } from "@/lib/axe";
import { SessionTabs, type SessionTab } from "./SessionTabs";

const VARIANTS: readonly SessionTab[] = ["overview", "laps", "telemetry", "coaching"];

describe("SessionTabs a11y (T081)", () => {
  it.each(VARIANTS)("renders without axe violations for active tab '%s'", async (variant) => {
    const { container } = render(<SessionTabs activeTab={variant} />);
    await assertNoAxeViolations(container);
  });

  it("renders every tab as a keyboard-focusable anchor with an href", () => {
    const { container } = render(<SessionTabs activeTab="overview" />);
    const anchors = container.querySelectorAll<HTMLAnchorElement>("nav a[href]");
    expect(anchors.length).toBe(4);
    for (const anchor of Array.from(anchors)) {
      // Native anchors with href are tab-focusable by default; an explicit
      // tabindex="-1" would break this — guard against it.
      expect(anchor.tabIndex).toBeGreaterThanOrEqual(0);
      // Visible text gives the anchor an accessible name (no aria-hidden, no
      // empty label).
      expect(anchor.textContent?.trim()).toBeTruthy();
    }
  });

  it("marks the active tab with aria-current='page' so AT users hear 'current'", () => {
    const { container } = render(<SessionTabs activeTab="telemetry" />);
    const current = container.querySelectorAll<HTMLAnchorElement>("nav a[aria-current='page']");
    expect(current.length).toBe(1);
    expect(current[0]?.textContent?.trim().toLowerCase()).toBe("telemetry");
  });
});
