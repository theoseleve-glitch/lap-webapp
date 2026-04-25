import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CompareNotFound } from "./CompareNotFound";

describe("CompareNotFound", () => {
  it("renders a headline making the missing-case state clear", () => {
    render(<CompareNotFound backHref="/compare" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/compare case not found/i);
  });

  it("renders explanatory copy", () => {
    render(<CompareNotFound backHref="/compare" />);
    expect(screen.getByText(/can.?t find/i)).toBeInTheDocument();
  });

  it("renders a CTA link pointing at the backHref", () => {
    render(<CompareNotFound backHref="/compare" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/compare");
  });

  it("gives the CTA link an actionable accessible name", () => {
    render(<CompareNotFound backHref="/compare" />);
    expect(screen.getByRole("link")).toHaveAccessibleName(/compare/i);
  });

  it("exposes an accessible region named 'Compare case not found'", () => {
    render(<CompareNotFound backHref="/compare" />);
    expect(screen.getByRole("region", { name: /compare case not found/i })).toBeInTheDocument();
  });
});
