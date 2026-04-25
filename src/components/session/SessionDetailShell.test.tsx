import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SessionDetailShell } from "./SessionDetailShell";

describe("SessionDetailShell", () => {
  it("renders a breadcrumb link back to /timeline", () => {
    render(<SessionDetailShell sessionId="s_1" />);
    const breadcrumb = screen.getByRole("navigation", { name: /breadcrumb/i });
    const link = within(breadcrumb).getByRole("link", { name: /all sessions/i });
    expect(link).toHaveAttribute("href", "/timeline");
  });

  it("renders a level-1 heading 'Session' by default", () => {
    render(<SessionDetailShell sessionId="s_1" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/^session$/i);
  });

  it("uses a custom title when provided", () => {
    render(<SessionDetailShell sessionId="s_1" title="Imola GT3" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Imola GT3");
  });

  it("renders the session id as an eyebrow above the heading", () => {
    render(<SessionDetailShell sessionId="s_demo_42" />);
    expect(screen.getByText("s_demo_42")).toBeInTheDocument();
  });

  it("renders a subtitle when provided", () => {
    render(<SessionDetailShell sessionId="s_1" subtitle="iRacing · Ferrari 296 GT3" />);
    expect(screen.getByText(/iracing.*ferrari 296 gt3/i)).toBeInTheDocument();
  });

  it("renders an actions slot when provided", () => {
    render(
      <SessionDetailShell sessionId="s_1" actions={<button type="button">Re-process</button>} />,
    );
    expect(screen.getByRole("button", { name: /re-process/i })).toBeInTheDocument();
  });

  it("renders children below the header", () => {
    render(
      <SessionDetailShell sessionId="s_1">
        <div>tab-panel</div>
      </SessionDetailShell>,
    );
    expect(screen.getByText("tab-panel")).toBeInTheDocument();
  });

  it("does not render an actions container when none provided", () => {
    render(<SessionDetailShell sessionId="s_1" />);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("does not render a subtitle when none provided", () => {
    render(<SessionDetailShell sessionId="s_1" />);
    // The eyebrow + heading + breadcrumb are the only text — no subtitle slot.
    expect(screen.queryByText(/iracing/i)).toBeNull();
  });
});
