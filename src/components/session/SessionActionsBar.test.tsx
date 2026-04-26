import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SessionActionsBar } from "./SessionActionsBar";

describe("SessionActionsBar", () => {
  it("renders an aria-labelled 'Session actions' toolbar", () => {
    render(<SessionActionsBar />);
    expect(screen.getByRole("toolbar", { name: /session actions/i })).toBeInTheDocument();
  });

  it("renders Delete, Re-process, and Share buttons", () => {
    render(<SessionActionsBar />);
    expect(screen.getByRole("button", { name: /^delete session$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^re-process session$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^share session$/i })).toBeInTheDocument();
  });

  it("invokes onDelete when the Delete button is clicked", () => {
    const onDelete = vi.fn();
    render(<SessionActionsBar onDelete={onDelete} />);
    fireEvent.click(screen.getByRole("button", { name: /^delete session$/i }));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("invokes onReprocess when the Re-process button is clicked", () => {
    const onReprocess = vi.fn();
    render(<SessionActionsBar onReprocess={onReprocess} />);
    fireEvent.click(screen.getByRole("button", { name: /^re-process session$/i }));
    expect(onReprocess).toHaveBeenCalledTimes(1);
  });

  it("invokes onShare when the Share button is clicked", () => {
    const onShare = vi.fn();
    render(<SessionActionsBar onShare={onShare} />);
    fireEvent.click(screen.getByRole("button", { name: /^share session$/i }));
    expect(onShare).toHaveBeenCalledTimes(1);
  });

  it("disables a button when its action is pending and marks it aria-busy", () => {
    render(
      <SessionActionsBar
        onDelete={() => {}}
        onReprocess={() => {}}
        onShare={() => {}}
        pendingAction="delete"
      />,
    );
    const del = screen.getByRole("button", { name: /^delete session$/i });
    expect(del).toBeDisabled();
    expect(del).toHaveAttribute("aria-busy", "true");
    // Other buttons still clickable and not busy.
    const reprocess = screen.getByRole("button", { name: /^re-process session$/i });
    expect(reprocess).not.toBeDisabled();
    expect(reprocess).toHaveAttribute("aria-busy", "false");
  });

  it("disables every button when no callbacks are supplied (read-only render)", () => {
    render(<SessionActionsBar />);
    expect(screen.getByRole("button", { name: /^delete session$/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /^re-process session$/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /^share session$/i })).toBeDisabled();
  });

  it("does not invoke a callback when its button is disabled by pending state", () => {
    const onDelete = vi.fn();
    render(<SessionActionsBar onDelete={onDelete} pendingAction="delete" />);
    fireEvent.click(screen.getByRole("button", { name: /^delete session$/i }));
    expect(onDelete).not.toHaveBeenCalled();
  });
});
