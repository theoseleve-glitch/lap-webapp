import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SessionTabs } from "./SessionTabs";

describe("SessionTabs responsive (T083)", () => {
  it("makes the tabs nav horizontally scrollable on narrow viewports", () => {
    const { container } = render(<SessionTabs activeTab="overview" />);
    const nav = container.querySelector("nav");
    expect(nav).not.toBeNull();
    // overflow-x-auto allows the row of tabs to scroll horizontally instead of
    // overflowing/clipping the parent on mobile.
    expect(nav?.className).toMatch(/overflow-x-auto/);
  });

  it("prevents tab labels from wrapping mid-word", () => {
    const { container } = render(<SessionTabs activeTab="overview" />);
    const anchors = container.querySelectorAll<HTMLAnchorElement>("nav a");
    expect(anchors.length).toBeGreaterThan(0);
    for (const anchor of Array.from(anchors)) {
      expect(anchor.className).toMatch(/whitespace-nowrap/);
    }
  });
});
