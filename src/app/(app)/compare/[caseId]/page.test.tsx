import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CompareCaseDetailPage from "./page";

describe("CompareCaseDetailPage", () => {
  it("renders a level-1 heading naming the compare case id", () => {
    render(<CompareCaseDetailPage params={{ caseId: "case-abc-123" }} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/case-abc-123/);
  });

  it("URL-decodes case ids before rendering", () => {
    render(<CompareCaseDetailPage params={{ caseId: "compare%20case%20A" }} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/compare case a/i);
  });

  it("renders a subtitle describing the compare case detail surface", () => {
    render(<CompareCaseDetailPage params={{ caseId: "case-abc-123" }} />);
    expect(screen.getByText(/rationale|outcome|side-by-side/i)).toBeInTheDocument();
  });
});
