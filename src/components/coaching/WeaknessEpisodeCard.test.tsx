import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WeaknessEpisodeCard } from "./WeaknessEpisodeCard";

const baseProps = {
  title: "Late trail-braking into T5",
  severity: "high" as const,
  confidence: 0.85,
  evidence: ["Lap 12 @ T5", "Lap 15 @ T5", "Lap 18 @ T3"],
};

describe("WeaknessEpisodeCard", () => {
  it("renders the title as a level-3 heading", () => {
    render(<WeaknessEpisodeCard {...baseProps} />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Late trail-braking into T5",
    );
  });

  it("renders the severity label", () => {
    render(<WeaknessEpisodeCard {...baseProps} severity="critical" />);
    expect(screen.getByText(/critical/i)).toBeInTheDocument();
  });

  it("renders confidence as a whole-number percentage", () => {
    render(<WeaknessEpisodeCard {...baseProps} confidence={0.85} />);
    expect(screen.getByText("85%")).toBeInTheDocument();
  });

  it("rounds confidence to the nearest whole percent", () => {
    render(<WeaknessEpisodeCard {...baseProps} confidence={0.876} />);
    expect(screen.getByText("88%")).toBeInTheDocument();
  });

  it("clamps confidence within 0–100", () => {
    const { rerender } = render(<WeaknessEpisodeCard {...baseProps} confidence={1.5} />);
    expect(screen.getByText("100%")).toBeInTheDocument();
    rerender(<WeaknessEpisodeCard {...baseProps} confidence={-0.2} />);
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("renders every evidence item", () => {
    render(<WeaknessEpisodeCard {...baseProps} />);
    for (const item of baseProps.evidence) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });

  it("shows the supporting-evidence count", () => {
    render(<WeaknessEpisodeCard {...baseProps} />);
    expect(screen.getByText(/3 supporting/i)).toBeInTheDocument();
  });

  it("singularises the count when there is only one evidence item", () => {
    render(<WeaknessEpisodeCard {...baseProps} evidence={["Lap 7 @ T1"]} />);
    expect(screen.getByText(/1 supporting/i)).toBeInTheDocument();
  });

  it("shows an empty state when no evidence is supplied", () => {
    render(<WeaknessEpisodeCard {...baseProps} evidence={[]} />);
    expect(screen.getByText(/no supporting/i)).toBeInTheDocument();
  });

  it("renders as an article whose accessible name includes the title", () => {
    render(<WeaknessEpisodeCard {...baseProps} />);
    expect(
      screen.getByRole("article", { name: /late trail-braking into t5/i }),
    ).toBeInTheDocument();
  });
});
