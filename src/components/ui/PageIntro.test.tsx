import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PageIntro } from "./PageIntro";

describe("PageIntro", () => {
  it("renders the title as an h1", () => {
    render(<PageIntro title="Dashboard" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Dashboard");
  });

  it("renders subtitle when provided", () => {
    render(<PageIntro title="Dashboard" subtitle="Driver OS landing" />);
    expect(screen.getByText("Driver OS landing")).toBeInTheDocument();
  });

  it("omits subtitle paragraph when not provided", () => {
    const { container } = render(<PageIntro title="Dashboard" />);
    // Only the h1 should exist; no subtitle <p>.
    expect(container.querySelectorAll("p")).toHaveLength(0);
  });

  it("shows a badge inline with the title when provided", () => {
    render(<PageIntro title="Dashboard" badge="BETA" />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("BETA");
  });
});
