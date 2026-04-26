import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SessionTabSkeleton, type SessionTabSkeletonVariant } from "./SessionTabSkeleton";

const VARIANTS: readonly SessionTabSkeletonVariant[] = [
  "overview",
  "laps",
  "telemetry",
  "coaching",
];

describe("SessionTabSkeleton", () => {
  it.each(VARIANTS)("renders an aria-busy status region for variant '%s'", (variant) => {
    render(<SessionTabSkeleton variant={variant} />);
    const region = screen.getByRole("status");
    expect(region).toHaveAttribute("aria-busy", "true");
  });

  it.each(VARIANTS)("announces a 'loading' message for variant '%s'", (variant) => {
    render(<SessionTabSkeleton variant={variant} />);
    expect(screen.getByRole("status")).toHaveAccessibleName(/loading/i);
  });

  it("renders three KPI placeholder cards in the overview variant", () => {
    const { container } = render(<SessionTabSkeleton variant="overview" />);
    const kpis = container.querySelectorAll("[data-role='skeleton-kpi']");
    expect(kpis).toHaveLength(3);
  });

  it("renders a chart placeholder in the overview variant", () => {
    const { container } = render(<SessionTabSkeleton variant="overview" />);
    expect(container.querySelector("[data-role='skeleton-chart']")).not.toBeNull();
  });

  it("renders a table-shaped placeholder with at least one header row + body rows in the laps variant", () => {
    const { container } = render(<SessionTabSkeleton variant="laps" />);
    expect(container.querySelector("[data-role='skeleton-table-header']")).not.toBeNull();
    const bodyRows = container.querySelectorAll("[data-role='skeleton-table-row']");
    expect(bodyRows.length).toBeGreaterThan(0);
  });

  it("renders a chart placeholder in the telemetry variant", () => {
    const { container } = render(<SessionTabSkeleton variant="telemetry" />);
    expect(container.querySelector("[data-role='skeleton-chart']")).not.toBeNull();
  });

  it("renders multiple card placeholders in the coaching variant", () => {
    const { container } = render(<SessionTabSkeleton variant="coaching" />);
    const cards = container.querySelectorAll("[data-role='skeleton-card']");
    expect(cards.length).toBeGreaterThan(1);
  });
});
