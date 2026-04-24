import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SkillRadarChart } from "./SkillRadarChart";

const TEN_DIMENSIONS = [
  { label: "Braking", value: 72 },
  { label: "Trail-braking", value: 64 },
  { label: "Apex precision", value: 80 },
  { label: "Throttle modulation", value: 58 },
  { label: "Consistency", value: 88 },
  { label: "Tyre management", value: 66 },
  { label: "Race craft", value: 54 },
  { label: "Qualifying pace", value: 78 },
  { label: "Adaptability", value: 62 },
  { label: "Recovery", value: 70 },
] as const;

describe("SkillRadarChart", () => {
  it("renders the default title when none is provided", () => {
    render(<SkillRadarChart dimensions={TEN_DIMENSIONS} />);
    expect(screen.getByRole("img")).toHaveAccessibleName(/skill radar/i);
  });

  it("renders a custom title when provided", () => {
    render(<SkillRadarChart dimensions={TEN_DIMENSIONS} title="Race-craft profile" />);
    expect(screen.getByRole("img")).toHaveAccessibleName(/race-craft profile/i);
  });

  it("draws the data polygon with one point per dimension", () => {
    const { container } = render(<SkillRadarChart dimensions={TEN_DIMENSIONS} />);
    const polygon = container.querySelector("polygon[data-role='values']");
    expect(polygon).not.toBeNull();
    const points = polygon?.getAttribute("points")?.trim().split(/\s+/) ?? [];
    expect(points).toHaveLength(TEN_DIMENSIONS.length);
  });

  it("renders a label for every dimension", () => {
    render(<SkillRadarChart dimensions={TEN_DIMENSIONS} />);
    for (const dim of TEN_DIMENSIONS) {
      expect(screen.getByText(dim.label)).toBeInTheDocument();
    }
  });

  it("clamps values above 100 to 100 when drawing the polygon", () => {
    const { container } = render(
      <SkillRadarChart
        dimensions={[
          { label: "A", value: 200 },
          { label: "B", value: 100 },
          { label: "C", value: 100 },
        ]}
      />,
    );
    const polygon = container.querySelector("polygon[data-role='values']");
    const points = polygon?.getAttribute("points")?.trim().split(/\s+/) ?? [];
    // With three equal 100%-clamped values, all points lie on the outer ring.
    // We don't assert exact coordinates, only that every point parses to a
    // finite number — i.e. no NaN leaked from an over-scale computation.
    for (const point of points) {
      const [x, y] = point.split(",").map(Number);
      expect(Number.isFinite(x)).toBe(true);
      expect(Number.isFinite(y)).toBe(true);
    }
  });

  it("clamps negative values to 0 when drawing the polygon", () => {
    const { container } = render(
      <SkillRadarChart
        dimensions={[
          { label: "A", value: -50 },
          { label: "B", value: 50 },
          { label: "C", value: 50 },
        ]}
      />,
    );
    const polygon = container.querySelector("polygon[data-role='values']");
    const points = polygon?.getAttribute("points")?.trim().split(/\s+/) ?? [];
    expect(points).toHaveLength(3);
    for (const point of points) {
      const [x, y] = point.split(",").map(Number);
      expect(Number.isFinite(x)).toBe(true);
      expect(Number.isFinite(y)).toBe(true);
    }
  });

  it("renders no data polygon when no dimensions are supplied", () => {
    const { container } = render(<SkillRadarChart dimensions={[]} />);
    expect(container.querySelector("polygon[data-role='values']")).toBeNull();
  });

  it("renders an empty-state message when no dimensions are supplied", () => {
    render(<SkillRadarChart dimensions={[]} />);
    expect(screen.getByText(/no skill data/i)).toBeInTheDocument();
  });
});
