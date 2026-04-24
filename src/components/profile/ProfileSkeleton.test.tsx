import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProfileSkeleton } from "./ProfileSkeleton";

describe("ProfileSkeleton", () => {
  it("exposes a polite live region announcing the loading state", () => {
    render(<ProfileSkeleton />);
    const status = screen.getByRole("status");
    expect(status).toHaveAccessibleName(/loading profile/i);
  });

  it("marks the live region as busy", () => {
    render(<ProfileSkeleton />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-busy", "true");
  });

  it("renders one placeholder per profile section (hero, radar, 3 columns)", () => {
    const { container } = render(<ProfileSkeleton />);
    expect(container.querySelectorAll('[data-skeleton="profile-section"]').length).toBe(5);
  });

  it("labels each placeholder with the section it is standing in for", () => {
    const { container } = render(<ProfileSkeleton />);
    const sections = Array.from(container.querySelectorAll('[data-skeleton="profile-section"]'));
    const labels = sections.map((section) => section.getAttribute("data-section"));
    expect(labels).toEqual(["hero", "radar", "weaknesses", "prescriptions", "readiness"]);
  });

  it("hides each placeholder from assistive tech (the live region already speaks)", () => {
    const { container } = render(<ProfileSkeleton />);
    for (const section of container.querySelectorAll('[data-skeleton="profile-section"]')) {
      expect(section).toHaveAttribute("aria-hidden", "true");
    }
  });
});
