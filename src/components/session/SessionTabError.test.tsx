import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SessionTabError, type SessionTabErrorVariant } from "./SessionTabError";

const VARIANTS: readonly SessionTabErrorVariant[] = ["overview", "laps", "telemetry", "coaching"];

describe("SessionTabError", () => {
  it("exposes the error as a role='alert' region", () => {
    render(<SessionTabError variant="overview" onRetry={() => {}} />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders a retry button", () => {
    render(<SessionTabError variant="overview" onRetry={() => {}} />);
    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
  });

  it("fires onRetry when the retry button is clicked", () => {
    const onRetry = vi.fn();
    render(<SessionTabError variant="overview" onRetry={onRetry} />);
    fireEvent.click(screen.getByRole("button", { name: /retry/i }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("disables the retry button while a retry is in flight", () => {
    render(<SessionTabError variant="overview" onRetry={() => {}} pending />);
    expect(screen.getByRole("button", { name: /retry/i })).toBeDisabled();
  });

  it("renders a custom message when provided, overriding the variant default", () => {
    render(<SessionTabError variant="laps" message="Network offline" onRetry={() => {}} />);
    expect(screen.getByText("Network offline")).toBeInTheDocument();
  });

  it.each(VARIANTS)("renders a sensible default message for variant '%s'", (variant) => {
    render(<SessionTabError variant={variant} onRetry={() => {}} />);
    // Each variant should mention the tab subject ("overview", "laps", "telemetry", "coaching")
    // somewhere in its default message so users know which tab failed.
    expect(screen.getByText(new RegExp(variant, "i"))).toBeInTheDocument();
  });

  it("does not disable the retry button when not pending", () => {
    render(<SessionTabError variant="telemetry" onRetry={() => {}} />);
    expect(screen.getByRole("button", { name: /retry/i })).not.toBeDisabled();
  });
});
