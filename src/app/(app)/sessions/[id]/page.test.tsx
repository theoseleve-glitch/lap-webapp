import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SessionDetailPage from "./page";

describe("SessionDetailPage", () => {
  it("renders a level-1 heading 'Session'", () => {
    render(<SessionDetailPage params={{ id: "s_demo" }} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/^session$/i);
  });

  it("displays the session id from route params", () => {
    render(<SessionDetailPage params={{ id: "s_demo" }} />);
    expect(screen.getByText(/s_demo/)).toBeInTheDocument();
  });

  it("renders the SessionTabs nav landmark (T068)", () => {
    render(<SessionDetailPage params={{ id: "s_demo" }} />);
    expect(screen.getByRole("navigation", { name: /^session tabs$/i })).toBeInTheDocument();
  });

  it("defaults to the Overview tab when no ?tab query is present", () => {
    render(<SessionDetailPage params={{ id: "s_demo" }} />);
    expect(screen.getByRole("link", { name: /^overview$/i })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("activates the Laps tab when ?tab=laps", () => {
    render(<SessionDetailPage params={{ id: "s_demo" }} searchParams={{ tab: "laps" }} />);
    expect(screen.getByRole("link", { name: /^laps$/i })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("region", { name: /^laps$/i })).toBeInTheDocument();
  });

  it("activates the Coaching tab when ?tab=coaching", () => {
    render(<SessionDetailPage params={{ id: "s_demo" }} searchParams={{ tab: "coaching" }} />);
    expect(screen.getByRole("link", { name: /^coaching$/i })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("falls back to Overview when ?tab is unknown", () => {
    render(<SessionDetailPage params={{ id: "s_demo" }} searchParams={{ tab: "garbage" }} />);
    expect(screen.getByRole("link", { name: /^overview$/i })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
