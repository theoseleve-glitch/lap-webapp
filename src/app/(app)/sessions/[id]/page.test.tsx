import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SessionDetailPage from "./page";

describe("SessionDetailPage (T061 placeholder)", () => {
  it("renders a level-1 heading 'Session'", () => {
    render(<SessionDetailPage params={{ id: "s_demo" }} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/^session$/i);
  });

  it("displays the session id from route params", () => {
    render(<SessionDetailPage params={{ id: "s_demo" }} />);
    expect(screen.getByText(/s_demo/)).toBeInTheDocument();
  });

  it("indicates the route is awaiting Block D decomposition", () => {
    render(<SessionDetailPage params={{ id: "s_demo" }} />);
    expect(screen.getByText(/coming soon|block d|decomposition/i)).toBeInTheDocument();
  });
});
