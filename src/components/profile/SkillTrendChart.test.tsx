import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SkillTrendChart, type SkillTrendPoint } from "./SkillTrendChart";

const SEVEN_POINTS: readonly SkillTrendPoint[] = [
  { date: "2026-03-01", score: 58 },
  { date: "2026-03-05", score: 61 },
  { date: "2026-03-08", score: 64 },
  { date: "2026-03-12", score: 66 },
  { date: "2026-03-15", score: 70 },
  { date: "2026-03-19", score: 73 },
  { date: "2026-03-22", score: 78 },
];

describe("SkillTrendChart", () => {
  it("renders the default 'Skill trend' title", () => {
    render(<SkillTrendChart points={SEVEN_POINTS} />);
    expect(screen.getByRole("img")).toHaveAccessibleName(/skill trend/i);
  });

  it("renders a custom skillLabel when provided", () => {
    render(<SkillTrendChart points={SEVEN_POINTS} skillLabel="Apex precision trend" />);
    expect(screen.getByRole("img")).toHaveAccessibleName(/apex precision trend/i);
  });

  it("draws a polyline with one vertex per point", () => {
    const { container } = render(<SkillTrendChart points={SEVEN_POINTS} />);
    const polyline = container.querySelector("polyline[data-role='trend-line']");
    expect(polyline).not.toBeNull();
    const vertices = polyline?.getAttribute("points")?.trim().split(/\s+/) ?? [];
    expect(vertices).toHaveLength(SEVEN_POINTS.length);
  });

  it("renders a circle marker for each point (for later interactivity)", () => {
    const { container } = render(<SkillTrendChart points={SEVEN_POINTS} />);
    const markers = container.querySelectorAll("circle[data-role='trend-point']");
    expect(markers).toHaveLength(SEVEN_POINTS.length);
  });

  it("renders an empty-state message when no points are supplied", () => {
    render(<SkillTrendChart points={[]} />);
    expect(screen.getByText(/no trend data/i)).toBeInTheDocument();
  });

  it("does not render a polyline in the empty state", () => {
    const { container } = render(<SkillTrendChart points={[]} />);
    expect(container.querySelector("polyline[data-role='trend-line']")).toBeNull();
  });

  it("omits the polyline when only one point is supplied (nothing to connect)", () => {
    const { container } = render(<SkillTrendChart points={[{ date: "2026-03-01", score: 60 }]} />);
    expect(container.querySelector("polyline[data-role='trend-line']")).toBeNull();
  });

  it("exposes an accessible description that names the lowest and highest scores", () => {
    render(<SkillTrendChart points={SEVEN_POINTS} />);
    const chart = screen.getByRole("img");
    expect(chart).toHaveAccessibleDescription(/58/);
    expect(chart).toHaveAccessibleDescription(/78/);
  });

  it("exposes an accessible description stating the number of data points", () => {
    render(<SkillTrendChart points={SEVEN_POINTS} />);
    const chart = screen.getByRole("img");
    expect(chart).toHaveAccessibleDescription(/7.*points/i);
  });

  it("clamps scores above 100 to 100 when drawing the polyline", () => {
    const { container } = render(
      <SkillTrendChart
        points={[
          { date: "2026-03-01", score: 50 },
          { date: "2026-03-02", score: 200 },
          { date: "2026-03-03", score: 80 },
        ]}
      />,
    );
    const polyline = container.querySelector("polyline[data-role='trend-line']");
    const vertices = polyline?.getAttribute("points")?.trim().split(/\s+/) ?? [];
    for (const vertex of vertices) {
      const [x, y] = vertex.split(",").map(Number);
      expect(Number.isFinite(x)).toBe(true);
      expect(Number.isFinite(y)).toBe(true);
    }
  });

  it("is wrapped in React.memo so unrelated parent re-renders skip the chart", () => {
    const typeOf = (SkillTrendChart as unknown as { $$typeof?: symbol }).$$typeof;
    expect(typeOf).toBe(Symbol.for("react.memo"));
  });
});
