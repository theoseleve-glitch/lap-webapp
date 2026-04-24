import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProfileEmptyState } from "./ProfileEmptyState";

describe("ProfileEmptyState", () => {
  it("renders a headline welcoming the new driver", () => {
    render(<ProfileEmptyState onboardingHref="/onboarding" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/your profile/i);
  });

  it("renders copy inviting the driver to start onboarding", () => {
    render(<ProfileEmptyState onboardingHref="/onboarding" />);
    expect(screen.getByText(/walk through onboarding/i)).toBeInTheDocument();
  });

  it("renders a CTA link pointing at the onboardingHref", () => {
    render(<ProfileEmptyState onboardingHref="/onboarding" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/onboarding");
  });

  it("gives the CTA link an actionable accessible name", () => {
    render(<ProfileEmptyState onboardingHref="/onboarding" />);
    expect(screen.getByRole("link")).toHaveAccessibleName(/onboarding/i);
  });

  it("exposes an accessible region named 'Profile empty state'", () => {
    render(<ProfileEmptyState onboardingHref="/onboarding" />);
    expect(screen.getByRole("region", { name: /profile empty state/i })).toBeInTheDocument();
  });
});
