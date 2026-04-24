import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PrescriptionCard } from "./PrescriptionCard";

const baseProps = {
  title: "Trail-brake release drill",
  rationale:
    "You release the brake too abruptly before apex on high-speed right-handers. This drill builds the muscle memory for a progressive release.",
  drillHref: "/drills/trail-brake-release",
  onAccept: () => {},
  onSkip: () => {},
};

describe("PrescriptionCard", () => {
  it("renders the title as a level-3 heading", () => {
    render(<PrescriptionCard {...baseProps} />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Trail-brake release drill",
    );
  });

  it("renders the rationale text", () => {
    render(<PrescriptionCard {...baseProps} />);
    expect(screen.getByText(/release the brake too abruptly/i)).toBeInTheDocument();
  });

  it("renders the drill link pointing at drillHref", () => {
    render(<PrescriptionCard {...baseProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/drills/trail-brake-release");
  });

  it("renders accept and skip buttons", () => {
    render(<PrescriptionCard {...baseProps} />);
    expect(screen.getByRole("button", { name: /accept/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /skip/i })).toBeInTheDocument();
  });

  it("fires onAccept when the accept button is clicked", () => {
    const onAccept = vi.fn();
    render(<PrescriptionCard {...baseProps} onAccept={onAccept} />);
    fireEvent.click(screen.getByRole("button", { name: /accept/i }));
    expect(onAccept).toHaveBeenCalledTimes(1);
  });

  it("fires onSkip when the skip button is clicked", () => {
    const onSkip = vi.fn();
    render(<PrescriptionCard {...baseProps} onSkip={onSkip} />);
    fireEvent.click(screen.getByRole("button", { name: /skip/i }));
    expect(onSkip).toHaveBeenCalledTimes(1);
  });

  it("does not fire onAccept until the button is clicked", () => {
    const onAccept = vi.fn();
    render(<PrescriptionCard {...baseProps} onAccept={onAccept} />);
    expect(onAccept).not.toHaveBeenCalled();
  });

  it("renders as an article whose accessible name matches the title", () => {
    render(<PrescriptionCard {...baseProps} />);
    expect(screen.getByRole("article", { name: /trail-brake release drill/i })).toBeInTheDocument();
  });

  it("disables the accept and skip buttons when pending", () => {
    render(<PrescriptionCard {...baseProps} pending />);
    expect(screen.getByRole("button", { name: /accept/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /skip/i })).toBeDisabled();
  });

  it("allows a custom drill label", () => {
    render(<PrescriptionCard {...baseProps} drillLabel="Open drill brief" />);
    expect(screen.getByRole("link")).toHaveTextContent("Open drill brief");
  });
});
