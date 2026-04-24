import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ProfileError } from "./ProfileError";

describe("ProfileError", () => {
  it("exposes the error as a role='alert' region", () => {
    render(<ProfileError onRetry={() => {}} />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders a friendly default message about the profile failing to load", () => {
    render(<ProfileError onRetry={() => {}} />);
    expect(screen.getByText(/couldn.?t load your profile/i)).toBeInTheDocument();
  });

  it("renders a custom message when provided", () => {
    render(<ProfileError message="Network offline" onRetry={() => {}} />);
    expect(screen.getByText("Network offline")).toBeInTheDocument();
  });

  it("renders a retry button", () => {
    render(<ProfileError onRetry={() => {}} />);
    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
  });

  it("fires onRetry when the retry button is clicked", () => {
    const onRetry = vi.fn();
    render(<ProfileError onRetry={onRetry} />);
    fireEvent.click(screen.getByRole("button", { name: /retry/i }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("disables the retry button while a retry is in flight", () => {
    render(<ProfileError onRetry={() => {}} pending />);
    expect(screen.getByRole("button", { name: /retry/i })).toBeDisabled();
  });
});
