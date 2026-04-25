import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WeaknessSkeleton } from "./WeaknessSkeleton";

describe("WeaknessSkeleton", () => {
  it("exposes a polite live region announcing the loading state", () => {
    render(<WeaknessSkeleton />);
    const status = screen.getByRole("status");
    expect(status).toHaveAccessibleName(/loading weakness/i);
  });

  it("marks the live region as busy", () => {
    render(<WeaknessSkeleton />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-busy", "true");
  });

  it("renders one placeholder per weakness section (header, trend, evidence, prescriptions)", () => {
    const { container } = render(<WeaknessSkeleton />);
    expect(container.querySelectorAll('[data-skeleton="weakness-section"]').length).toBe(4);
  });

  it("labels each placeholder with the section it is standing in for", () => {
    const { container } = render(<WeaknessSkeleton />);
    const sections = Array.from(container.querySelectorAll('[data-skeleton="weakness-section"]'));
    const labels = sections.map((section) => section.getAttribute("data-section"));
    expect(labels).toEqual(["header", "trend", "evidence", "prescriptions"]);
  });

  it("hides each placeholder from assistive tech (the live region already speaks)", () => {
    const { container } = render(<WeaknessSkeleton />);
    for (const section of container.querySelectorAll('[data-skeleton="weakness-section"]')) {
      expect(section).toHaveAttribute("aria-hidden", "true");
    }
  });
});
