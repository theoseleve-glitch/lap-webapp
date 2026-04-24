import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TimelineSkeleton } from "./TimelineSkeleton";

describe("TimelineSkeleton", () => {
  it("exposes a polite live region announcing the loading state", () => {
    render(<TimelineSkeleton />);
    const status = screen.getByRole("status");
    expect(status).toHaveAccessibleName(/loading sessions/i);
  });

  it("marks the live region as busy", () => {
    render(<TimelineSkeleton />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-busy", "true");
  });

  it("renders three placeholder cards by default", () => {
    const { container } = render(<TimelineSkeleton />);
    expect(container.querySelectorAll('[data-skeleton="card"]').length).toBe(3);
  });

  it("renders the requested number of placeholder cards", () => {
    const { container } = render(<TimelineSkeleton count={5} />);
    expect(container.querySelectorAll('[data-skeleton="card"]').length).toBe(5);
  });

  it("hides placeholder cards from assistive tech", () => {
    const { container } = render(<TimelineSkeleton />);
    for (const card of container.querySelectorAll('[data-skeleton="card"]')) {
      expect(card).toHaveAttribute("aria-hidden", "true");
    }
  });

  it("clamps a zero count to one card so the UI never collapses to empty", () => {
    const { container } = render(<TimelineSkeleton count={0} />);
    expect(container.querySelectorAll('[data-skeleton="card"]').length).toBe(1);
  });
});
