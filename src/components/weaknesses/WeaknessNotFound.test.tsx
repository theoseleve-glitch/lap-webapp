import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WeaknessNotFound } from "./WeaknessNotFound";

describe("WeaknessNotFound", () => {
  it("renders a headline making the missing-weakness state clear", () => {
    render(<WeaknessNotFound backHref="/profile" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/weakness not found/i);
  });

  it("renders explanatory copy", () => {
    render(<WeaknessNotFound backHref="/profile" />);
    expect(screen.getByText(/can.?t find/i)).toBeInTheDocument();
  });

  it("renders a CTA link pointing at the backHref", () => {
    render(<WeaknessNotFound backHref="/profile" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/profile");
  });

  it("gives the CTA link an actionable accessible name", () => {
    render(<WeaknessNotFound backHref="/profile" />);
    expect(screen.getByRole("link")).toHaveAccessibleName(/profile/i);
  });

  it("exposes an accessible region named 'Weakness not found'", () => {
    render(<WeaknessNotFound backHref="/profile" />);
    expect(screen.getByRole("region", { name: /weakness not found/i })).toBeInTheDocument();
  });
});
