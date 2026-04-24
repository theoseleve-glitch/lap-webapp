import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DriverScoreCard } from "./DriverScoreCard";

describe("DriverScoreCard", () => {
  it("renders the score as a prominent number", () => {
    render(<DriverScoreCard score={78} trend={[70, 72, 75, 78]} />);
    expect(screen.getByText("78")).toBeInTheDocument();
  });

  it("renders the default 'Driver score' label", () => {
    render(<DriverScoreCard score={78} trend={[]} />);
    expect(screen.getByText(/driver score/i)).toBeInTheDocument();
  });

  it("renders a custom label when provided", () => {
    render(<DriverScoreCard score={78} trend={[]} label="Consistency score" />);
    expect(screen.getByText(/consistency score/i)).toBeInTheDocument();
  });

  it("renders a positive delta prefixed with +", () => {
    render(<DriverScoreCard score={78} trend={[]} delta={5} />);
    expect(screen.getByText("+5")).toBeInTheDocument();
  });

  it("renders a negative delta with its sign preserved", () => {
    render(<DriverScoreCard score={70} trend={[]} delta={-3} />);
    expect(screen.getByText("-3")).toBeInTheDocument();
  });

  it("exposes the delta sign as a data attribute for tone styling", () => {
    render(<DriverScoreCard score={78} trend={[]} delta={5} />);
    expect(screen.getByText("+5")).toHaveAttribute("data-sign", "positive");
  });

  it("uses data-sign='negative' for a negative delta", () => {
    render(<DriverScoreCard score={70} trend={[]} delta={-3} />);
    expect(screen.getByText("-3")).toHaveAttribute("data-sign", "negative");
  });

  it("uses data-sign='neutral' for a zero delta", () => {
    render(<DriverScoreCard score={78} trend={[]} delta={0} />);
    expect(screen.getByText(/0/)).toHaveAttribute("data-sign", "neutral");
  });

  it("omits the delta element when delta is not supplied", () => {
    const { container } = render(<DriverScoreCard score={78} trend={[]} />);
    expect(container.querySelector("[data-sign]")).toBeNull();
  });

  it("renders a sparkline polyline with one point per trend value", () => {
    const { container } = render(<DriverScoreCard score={78} trend={[70, 72, 75, 78]} />);
    const polyline = container.querySelector("polyline");
    expect(polyline).not.toBeNull();
    const points = polyline?.getAttribute("points")?.trim().split(/\s+/) ?? [];
    expect(points).toHaveLength(4);
  });

  it("omits the sparkline entirely when trend is empty", () => {
    const { container } = render(<DriverScoreCard score={78} trend={[]} />);
    expect(container.querySelector("polyline")).toBeNull();
  });

  it("omits the sparkline when trend has only one value (nothing to plot)", () => {
    const { container } = render(<DriverScoreCard score={78} trend={[78]} />);
    expect(container.querySelector("polyline")).toBeNull();
  });

  it("exposes an accessible name combining label and score", () => {
    render(<DriverScoreCard score={78} trend={[]} />);
    expect(screen.getByRole("region", { name: /driver score.*78/i })).toBeInTheDocument();
  });

  it("exposes an accessible description summarising the trend range and length", () => {
    render(<DriverScoreCard score={78} trend={[62, 65, 68, 70, 72, 75, 78]} />);
    const region = screen.getByRole("region", { name: /driver score/i });
    expect(region).toHaveAccessibleDescription(/7.*periods/i);
    expect(region).toHaveAccessibleDescription(/62.*78/);
  });

  it("describes the score plainly when trend is empty", () => {
    render(<DriverScoreCard score={45} trend={[]} />);
    const region = screen.getByRole("region", { name: /driver score/i });
    expect(region).toHaveAccessibleDescription(/no trend/i);
  });
});
