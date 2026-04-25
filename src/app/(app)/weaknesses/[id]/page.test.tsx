import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import WeaknessDetailPage from "./page";

describe("WeaknessDetailPage", () => {
  it("renders a level-1 heading naming the weakness id", () => {
    render(<WeaknessDetailPage params={{ id: "w-abc-123" }} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/w-abc-123/);
  });

  it("URL-decodes ids before rendering", () => {
    render(<WeaknessDetailPage params={{ id: "weakness%20id" }} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/weakness id/i);
  });

  it("renders a subtitle describing the weakness detail surface", () => {
    render(<WeaknessDetailPage params={{ id: "w-abc-123" }} />);
    expect(screen.getByText(/evidence|prescription|trend/i)).toBeInTheDocument();
  });
});
