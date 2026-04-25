import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CompareSkeleton } from "./CompareSkeleton";

describe("CompareSkeleton", () => {
  it("exposes a polite live region announcing the loading state", () => {
    render(<CompareSkeleton />);
    const status = screen.getByRole("status");
    expect(status).toHaveAccessibleName(/loading compare/i);
  });

  it("marks the live region as busy", () => {
    render(<CompareSkeleton />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-busy", "true");
  });

  it("renders one placeholder per compare-case section (sessions, rationale, outcome)", () => {
    const { container } = render(<CompareSkeleton />);
    expect(container.querySelectorAll('[data-skeleton="compare-section"]').length).toBe(3);
  });

  it("labels each placeholder with the section it is standing in for", () => {
    const { container } = render(<CompareSkeleton />);
    const sections = Array.from(container.querySelectorAll('[data-skeleton="compare-section"]'));
    const labels = sections.map((section) => section.getAttribute("data-section"));
    expect(labels).toEqual(["sessions", "rationale", "outcome"]);
  });

  it("hides each placeholder from assistive tech (the live region already speaks)", () => {
    const { container } = render(<CompareSkeleton />);
    for (const section of container.querySelectorAll('[data-skeleton="compare-section"]')) {
      expect(section).toHaveAttribute("aria-hidden", "true");
    }
  });
});
