import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CompareError } from "./CompareError";

describe("CompareError", () => {
  it("exposes the error as a role='alert' region", () => {
    render(<CompareError onRetry={() => {}} />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders a friendly default message about compare failing to load", () => {
    render(<CompareError onRetry={() => {}} />);
    expect(screen.getByText(/couldn.?t load this compare/i)).toBeInTheDocument();
  });

  it("renders a custom message when provided", () => {
    render(<CompareError message="Network offline" onRetry={() => {}} />);
    expect(screen.getByText("Network offline")).toBeInTheDocument();
  });

  it("renders a retry button", () => {
    render(<CompareError onRetry={() => {}} />);
    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
  });

  it("fires onRetry when the retry button is clicked", () => {
    const onRetry = vi.fn();
    render(<CompareError onRetry={onRetry} />);
    fireEvent.click(screen.getByRole("button", { name: /retry/i }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("disables the retry button while a retry is in flight", () => {
    render(<CompareError onRetry={() => {}} pending />);
    expect(screen.getByRole("button", { name: /retry/i })).toBeDisabled();
  });
});
