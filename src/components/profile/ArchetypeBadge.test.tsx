import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ArchetypeBadge } from "./ArchetypeBadge";

describe("ArchetypeBadge", () => {
  it("renders the archetype name when unlocked", () => {
    render(<ArchetypeBadge archetype="Smooth Operator" />);
    expect(screen.getByText(/smooth operator/i)).toBeInTheDocument();
  });

  it("marks the badge as unlocked via data-state", () => {
    render(<ArchetypeBadge archetype="Smooth Operator" />);
    const region = screen.getByRole("status");
    expect(region).toHaveAttribute("data-state", "unlocked");
  });

  it("announces the archetype in the accessible name", () => {
    render(<ArchetypeBadge archetype="Smooth Operator" />);
    expect(screen.getByRole("status")).toHaveAccessibleName(/smooth operator/i);
  });

  it("renders a locked state when no archetype is supplied", () => {
    render(<ArchetypeBadge archetype={null} />);
    expect(screen.getByText(/archetype locked/i)).toBeInTheDocument();
  });

  it("marks the badge as locked via data-state", () => {
    render(<ArchetypeBadge archetype={null} />);
    expect(screen.getByRole("status")).toHaveAttribute("data-state", "locked");
  });

  it("mentions the default cohort size (20) in the locked copy", () => {
    render(<ArchetypeBadge archetype={null} />);
    expect(screen.getByText(/unlocks at 20 drivers/i)).toBeInTheDocument();
  });

  it("uses a custom cohort size when provided", () => {
    render(<ArchetypeBadge archetype={null} cohortSize={50} />);
    expect(screen.getByText(/unlocks at 50 drivers/i)).toBeInTheDocument();
  });

  it("ignores cohortSize in the unlocked state", () => {
    render(<ArchetypeBadge archetype="Smooth Operator" cohortSize={50} />);
    expect(screen.queryByText(/unlocks at/i)).toBeNull();
  });

  it("falls back to a safe cohort size when given a non-positive value", () => {
    render(<ArchetypeBadge archetype={null} cohortSize={0} />);
    expect(screen.getByText(/unlocks at 20 drivers/i)).toBeInTheDocument();
  });
});
