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

  it("does not open the create-case prompt when no legacy session params are present", () => {
    render(<ComparePage />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("opens the create-case prompt when legacy 'sessions' param is present", () => {
    render(<ComparePage searchParams={{ sessions: "s-1,s-2" }} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("seeds the prompt with the legacy session ids parsed from the URL", () => {
    render(<ComparePage searchParams={{ sessions: "s-1,s-2,s-3" }} />);
    expect(screen.getByText(/3 sessions selected/i)).toBeInTheDocument();
  });

  it("ignores empty values in the legacy 'sessions' param", () => {
    render(<ComparePage searchParams={{ sessions: "s-1,,s-2," }} />);
    expect(screen.getByText(/2 sessions selected/i)).toBeInTheDocument();
  });

  it("does not open the prompt when 'sessions' param is empty", () => {
    render(<ComparePage searchParams={{ sessions: "" }} />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
