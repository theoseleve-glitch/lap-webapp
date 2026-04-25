import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ComparePage from "./page";

describe("ComparePage", () => {
  it("renders a level-1 heading titled 'Compare'", () => {
    render(<ComparePage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Compare");
  });

  it("renders a subtitle describing the saved compare cases surface", () => {
    render(<ComparePage />);
    expect(screen.getByText(/saved compare cases/i)).toBeInTheDocument();
  });
});
