import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TimelinePage from "./page";

describe("TimelinePage", () => {
  it("renders a level-1 heading titled 'Timeline'", () => {
    render(<TimelinePage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Timeline");
  });

  it("renders a subtitle describing the page purpose", () => {
    render(<TimelinePage />);
    expect(screen.getByText(/recent sessions/i)).toBeInTheDocument();
  });
});
