import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RecentSessionsSparkline } from "./RecentSessionsSparkline";

const LAP_TIMES = [
  92.4, 92.1, 91.9, 92.0, 91.6, 91.4, 91.2, 91.5, 91.1, 90.9, 90.8, 91.0, 90.6, 90.4, 90.7, 90.3,
  90.1, 90.2, 89.9, 89.8, 89.7, 89.5, 89.6, 89.3, 89.1,
];

describe("RecentSessionsSparkline", () => {
  it("renders the default 'Recent sessions' label", () => {
    render(<RecentSessionsSparkline lapTimes={LAP_TIMES} />);
    expect(screen.getByText(/recent sessions/i)).toBeInTheDocument();
  });

  it("renders a custom label when provided", () => {
    render(<RecentSessionsSparkline lapTimes={LAP_TIMES} label="Qualifying best" />);
    expect(screen.getByText(/qualifying best/i)).toBeInTheDocument();
  });

  it("renders a polyline with one point per shown lap time", () => {
    const { container } = render(<RecentSessionsSparkline lapTimes={LAP_TIMES.slice(0, 5)} />);
    const polyline = container.querySelector("polyline");
    expect(polyline).not.toBeNull();
    const points = polyline?.getAttribute("points")?.trim().split(/\s+/) ?? [];
    expect(points).toHaveLength(5);
  });

  it("caps the rendered series to the most recent 20 entries by default", () => {
    const { container } = render(<RecentSessionsSparkline lapTimes={LAP_TIMES} />);
    const polyline = container.querySelector("polyline");
    const points = polyline?.getAttribute("points")?.trim().split(/\s+/) ?? [];
    expect(points).toHaveLength(20);
  });

  it("keeps the most recent entries when capping (takes the tail, not the head)", () => {
    const { container } = render(<RecentSessionsSparkline lapTimes={LAP_TIMES} />);
    const polyline = container.querySelector("polyline");
    const points = polyline?.getAttribute("points")?.trim().split(/\s+/) ?? [];
    // The final point's y must reflect the *last* entry (89.1, the fastest
    // lap in the tail of the series), which should map to y=0 (top of chart).
    const last = points[points.length - 1];
    const [, yStr] = last?.split(",") ?? [];
    expect(Number(yStr)).toBeCloseTo(0, 1);
  });

  it("respects a custom max", () => {
    const { container } = render(<RecentSessionsSparkline lapTimes={LAP_TIMES} max={5} />);
    const polyline = container.querySelector("polyline");
    const points = polyline?.getAttribute("points")?.trim().split(/\s+/) ?? [];
    expect(points).toHaveLength(5);
  });

  it("renders an empty-state message when no lap times are supplied", () => {
    render(<RecentSessionsSparkline lapTimes={[]} />);
    expect(screen.getByText(/no recent sessions/i)).toBeInTheDocument();
  });

  it("does not render a polyline in the empty state", () => {
    const { container } = render(<RecentSessionsSparkline lapTimes={[]} />);
    expect(container.querySelector("polyline")).toBeNull();
  });

  it("omits the polyline when only one lap time is supplied (nothing to plot)", () => {
    const { container } = render(<RecentSessionsSparkline lapTimes={[91.2]} />);
    expect(container.querySelector("polyline")).toBeNull();
  });

  it("exposes an accessible region named by the label", () => {
    render(<RecentSessionsSparkline lapTimes={LAP_TIMES} />);
    expect(screen.getByRole("region", { name: /recent sessions/i })).toBeInTheDocument();
  });
});
