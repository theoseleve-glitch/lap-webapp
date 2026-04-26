import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PrescriptionCard } from "./PrescriptionCard";

const baseProps = {
  title: "Trail-brake release drill",
  rationale: "Release smoother before apex.",
  drillHref: "/drills/trail-brake-release",
  onAccept: () => {},
  onSkip: () => {},
};

describe("PrescriptionCard keyboard shortcuts (T108)", () => {
  it("fires onAccept when 'A' is pressed while the Accept button has focus", () => {
    const onAccept = vi.fn();
    render(<PrescriptionCard {...baseProps} onAccept={onAccept} />);
    const accept = screen.getByRole("button", { name: /accept/i });
    accept.focus();
    fireEvent.keyDown(accept, { key: "a" });
    expect(onAccept).toHaveBeenCalledTimes(1);
  });

  it("fires onAccept when 'A' (uppercase) is pressed", () => {
    const onAccept = vi.fn();
    render(<PrescriptionCard {...baseProps} onAccept={onAccept} />);
    const accept = screen.getByRole("button", { name: /accept/i });
    accept.focus();
    fireEvent.keyDown(accept, { key: "A" });
    expect(onAccept).toHaveBeenCalledTimes(1);
  });

  it("fires onSkip when 'S' is pressed while the Skip button has focus", () => {
    const onSkip = vi.fn();
    render(<PrescriptionCard {...baseProps} onSkip={onSkip} />);
    const skip = screen.getByRole("button", { name: /skip/i });
    skip.focus();
    fireEvent.keyDown(skip, { key: "s" });
    expect(onSkip).toHaveBeenCalledTimes(1);
  });

  it("fires onAccept when 'A' is pressed while the drill link has focus", () => {
    const onAccept = vi.fn();
    render(<PrescriptionCard {...baseProps} onAccept={onAccept} />);
    const link = screen.getByRole("link");
    link.focus();
    fireEvent.keyDown(link, { key: "a" });
    expect(onAccept).toHaveBeenCalledTimes(1);
  });

  it("does not fire onAccept when pending", () => {
    const onAccept = vi.fn();
    render(<PrescriptionCard {...baseProps} pending onAccept={onAccept} />);
    const accept = screen.getByRole("button", { name: /accept/i });
    fireEvent.keyDown(accept, { key: "a" });
    expect(onAccept).not.toHaveBeenCalled();
  });

  it("does not fire onSkip when pending", () => {
    const onSkip = vi.fn();
    render(<PrescriptionCard {...baseProps} pending onSkip={onSkip} />);
    const skip = screen.getByRole("button", { name: /skip/i });
    fireEvent.keyDown(skip, { key: "s" });
    expect(onSkip).not.toHaveBeenCalled();
  });

  it("ignores 'A'/'S' when a modifier key is held (Ctrl+A, Cmd+S, Alt+A)", () => {
    const onAccept = vi.fn();
    const onSkip = vi.fn();
    render(<PrescriptionCard {...baseProps} onAccept={onAccept} onSkip={onSkip} />);
    const accept = screen.getByRole("button", { name: /accept/i });
    fireEvent.keyDown(accept, { key: "a", ctrlKey: true });
    fireEvent.keyDown(accept, { key: "s", metaKey: true });
    fireEvent.keyDown(accept, { key: "a", altKey: true });
    expect(onAccept).not.toHaveBeenCalled();
    expect(onSkip).not.toHaveBeenCalled();
  });

  it("ignores irrelevant keys", () => {
    const onAccept = vi.fn();
    const onSkip = vi.fn();
    render(<PrescriptionCard {...baseProps} onAccept={onAccept} onSkip={onSkip} />);
    const accept = screen.getByRole("button", { name: /accept/i });
    fireEvent.keyDown(accept, { key: "x" });
    fireEvent.keyDown(accept, { key: "Enter" });
    fireEvent.keyDown(accept, { key: "Escape" });
    expect(onAccept).not.toHaveBeenCalled();
    expect(onSkip).not.toHaveBeenCalled();
  });
});
