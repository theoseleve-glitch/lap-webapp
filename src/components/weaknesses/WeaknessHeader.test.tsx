import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WeaknessHeader } from "./WeaknessHeader";

describe("WeaknessHeader", () => {
  it("renders the weakness title as the level-1 heading", () => {
    render(
      <WeaknessHeader
        title="Late trail-brake into T5"
        category="Trail-braking"
        severity="high"
        status="open"
      />,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /late trail-brake into t5/i,
    );
  });

  it("renders the category label", () => {
    render(
      <WeaknessHeader
        title="Late trail-brake into T5"
        category="Trail-braking"
        severity="high"
        status="open"
      />,
    );
    expect(screen.getByText(/trail-braking/i)).toBeInTheDocument();
  });

  it("renders the severity badge", () => {
    render(
      <WeaknessHeader
        title="Late trail-brake into T5"
        category="Trail-braking"
        severity="critical"
        status="open"
      />,
    );
    const badge = screen.getByText(/critical/i);
    expect(badge).toBeInTheDocument();
    expect(badge.className).toMatch(/safety-red/);
  });

  it("uses the marshal-yellow tone for medium severity", () => {
    render(
      <WeaknessHeader title="Apex drift T2" category="Apex" severity="medium" status="open" />,
    );
    expect(screen.getByText(/medium/i).className).toMatch(/marshal-yellow/);
  });

  it("renders an 'Open' status chip when the weakness is open", () => {
    render(
      <WeaknessHeader
        title="Late trail-brake into T5"
        category="Trail-braking"
        severity="high"
        status="open"
      />,
    );
    expect(screen.getByText(/^open$/i)).toBeInTheDocument();
  });

  it("renders a 'Resolved' status chip in acid-green when the weakness is resolved", () => {
    render(
      <WeaknessHeader
        title="Late trail-brake into T5"
        category="Trail-braking"
        severity="high"
        status="resolved"
      />,
    );
    const chip = screen.getByText(/^resolved$/i);
    expect(chip).toBeInTheDocument();
    expect(chip.className).toMatch(/acid-green/);
  });

  it("exposes the header as a region named by the weakness title", () => {
    render(
      <WeaknessHeader
        title="Late trail-brake into T5"
        category="Trail-braking"
        severity="high"
        status="open"
      />,
    );
    expect(screen.getByRole("region", { name: /late trail-brake into t5/i })).toBeInTheDocument();
  });
});
