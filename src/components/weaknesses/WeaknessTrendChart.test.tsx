import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WeaknessTrendChart, type WeaknessTrendPoint } from "./WeaknessTrendChart";

const SIX_POINTS: readonly WeaknessTrendPoint[] = [
  { date: "2026-03-01", confidence: 35 },
  { date: "2026-03-05", confidence: 48 },
  { date: "2026-03-09", confidence: 62 },
  { date: "2026-03-14", confidence: 71 },
  { date: "2026-03-18", confidence: 80 },
  { date: "2026-03-22", confidence: 88 },
];

describe("WeaknessTrendChart", () => {
  it("renders the default 'Weakness confidence trend' title", () => {
    render(<WeaknessTrendChart points={SIX_POINTS} />);
    expect(screen.getByRole("img")).toHaveAccessibleName(/weakness confidence trend/i);
  });

  it("renders a custom title when provided", () => {
    render(<WeaknessTrendChart points={SIX_POINTS} title="Trail-brake confidence" />);
    expect(screen.getByRole("img")).toHaveAccessibleName(/trail-brake confidence/i);
  });

  it("draws a polyline with one vertex per point", () => {
    const { container } = render(<WeaknessTrendChart points={SIX_POINTS} />);
    const polyline = container.querySelector("polyline[data-role='confidence-line']");
    expect(polyline).not.toBeNull();
    const vertices = polyline?.getAttribute("points")?.trim().split(/\s+/) ?? [];
    expect(vertices).toHaveLength(SIX_POINTS.length);
  });

  it("renders a circle marker for each data point", () => {
    const { container } = render(<WeaknessTrendChart points={SIX_POINTS} />);
    const markers = container.querySelectorAll("circle[data-role='confidence-point']");
    expect(markers).toHaveLength(SIX_POINTS.length);
  });

  it("renders an empty-state message when no points are supplied", () => {
    render(<WeaknessTrendChart points={[]} />);
    expect(screen.getByText(/no confidence data/i)).toBeInTheDocument();
  });

  it("does not render a polyline in the empty state", () => {
    const { container } = render(<WeaknessTrendChart points={[]} />);
    expect(container.querySelector("polyline[data-role='confidence-line']")).toBeNull();
  });

  it("omits the polyline when only one point is supplied", () => {
    const { container } = render(
      <WeaknessTrendChart points={[{ date: "2026-03-01", confidence: 50 }]} />,
    );
    expect(container.querySelector("polyline[data-role='confidence-line']")).toBeNull();
  });

  it("exposes an accessible description that names the lowest and highest confidences", () => {
    render(<WeaknessTrendChart points={SIX_POINTS} />);
    const chart = screen.getByRole("img");
    expect(chart).toHaveAccessibleDescription(/35/);
    expect(chart).toHaveAccessibleDescription(/88/);
  });

  it("exposes an accessible description stating the number of data points", () => {
    render(<WeaknessTrendChart points={SIX_POINTS} />);
    expect(screen.getByRole("img")).toHaveAccessibleDescription(/6.*points/i);
  });

  it("clamps confidences above 100 when drawing the polyline", () => {
    const { container } = render(
      <WeaknessTrendChart
        points={[
          { date: "2026-03-01", confidence: 50 },
          { date: "2026-03-02", confidence: 200 },
          { date: "2026-03-03", confidence: 70 },
        ]}
      />,
    );
    const polyline = container.querySelector("polyline[data-role='confidence-line']");
    const vertices = polyline?.getAttribute("points")?.trim().split(/\s+/) ?? [];
    for (const vertex of vertices) {
      const [x, y] = vertex.split(",").map(Number);
      expect(Number.isFinite(x)).toBe(true);
      expect(Number.isFinite(y)).toBe(true);
    }
  });

  it("is wrapped in React.memo so unrelated parent re-renders skip the chart", () => {
    const typeOf = (WeaknessTrendChart as unknown as { $$typeof?: symbol }).$$typeof;
    expect(typeOf).toBe(Symbol.for("react.memo"));
  });
});
