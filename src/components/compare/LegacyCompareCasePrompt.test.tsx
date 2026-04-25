import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LegacyCompareCasePrompt } from "./LegacyCompareCasePrompt";

describe("LegacyCompareCasePrompt", () => {
  it("renders nothing when no legacy session ids are passed", () => {
    const { container } = render(<LegacyCompareCasePrompt legacySessionIds={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("opens the create-case modal when legacy session ids are present", () => {
    render(<LegacyCompareCasePrompt legacySessionIds={["s-1", "s-2"]} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("passes the legacy session ids to the modal", () => {
    render(<LegacyCompareCasePrompt legacySessionIds={["s-1", "s-2"]} />);
    expect(screen.getByText(/2 sessions selected/i)).toBeInTheDocument();
  });

  it("closes the modal when cancel is clicked", () => {
    render(<LegacyCompareCasePrompt legacySessionIds={["s-1", "s-2"]} />);
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("closes the modal when save is submitted with rationale (placeholder until T191)", () => {
    render(<LegacyCompareCasePrompt legacySessionIds={["s-1", "s-2"]} />);
    fireEvent.change(screen.getByLabelText(/rationale/i), {
      target: { value: "legacy compare" },
    });
    fireEvent.click(screen.getByRole("button", { name: /save/i }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
