import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { parseSessionTab, SessionTabs, type SessionTab } from "./SessionTabs";

describe("parseSessionTab", () => {
  it("returns 'overview' for undefined", () => {
    expect(parseSessionTab(undefined)).toBe("overview");
  });

  it("returns 'overview' for empty string", () => {
    expect(parseSessionTab("")).toBe("overview");
  });

  it("returns 'overview' for unknown values", () => {
    expect(parseSessionTab("not-a-real-tab")).toBe("overview");
  });

  it.each<SessionTab>(["overview", "laps", "telemetry", "coaching"])(
    "passes through valid tab '%s'",
    (tab) => {
      expect(parseSessionTab(tab)).toBe(tab);
    },
  );
});

describe("SessionTabs", () => {
  it("renders an aria-labelled 'Session tabs' nav", () => {
    render(<SessionTabs activeTab="overview" />);
    expect(screen.getByRole("navigation", { name: /^session tabs$/i })).toBeInTheDocument();
  });

  it("renders one anchor per tab", () => {
    render(<SessionTabs activeTab="overview" />);
    expect(screen.getByRole("link", { name: /^overview$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^laps$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^telemetry$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^coaching$/i })).toBeInTheDocument();
  });

  it("emits hrefs that preserve the ?tab= query", () => {
    render(<SessionTabs activeTab="overview" />);
    expect(screen.getByRole("link", { name: /^overview$/i })).toHaveAttribute(
      "href",
      "?tab=overview",
    );
    expect(screen.getByRole("link", { name: /^laps$/i })).toHaveAttribute("href", "?tab=laps");
    expect(screen.getByRole("link", { name: /^telemetry$/i })).toHaveAttribute(
      "href",
      "?tab=telemetry",
    );
    expect(screen.getByRole("link", { name: /^coaching$/i })).toHaveAttribute(
      "href",
      "?tab=coaching",
    );
  });

  it("marks the active tab with aria-current='page'", () => {
    render(<SessionTabs activeTab="laps" />);
    expect(screen.getByRole("link", { name: /^laps$/i })).toHaveAttribute("aria-current", "page");
    // Other tabs should NOT advertise current state.
    expect(screen.getByRole("link", { name: /^overview$/i })).not.toHaveAttribute("aria-current");
  });

  it("renders a panel labelled by the active tab", () => {
    render(<SessionTabs activeTab="telemetry" />);
    expect(screen.getByRole("region", { name: /^telemetry$/i })).toBeInTheDocument();
  });

  it("renders the coaching panel when coaching is active", () => {
    render(<SessionTabs activeTab="coaching" />);
    expect(screen.getByRole("region", { name: /^coaching$/i })).toBeInTheDocument();
  });
});
