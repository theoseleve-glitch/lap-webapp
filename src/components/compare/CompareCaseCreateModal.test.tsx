import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CompareCaseCreateModal } from "./CompareCaseCreateModal";

const SESSIONS = ["s-1", "s-2"] as const;

describe("CompareCaseCreateModal", () => {
  it("renders nothing when closed", () => {
    const { container } = render(
      <CompareCaseCreateModal
        open={false}
        selectedSessionIds={SESSIONS}
        onSubmit={() => {}}
        onCancel={() => {}}
      />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("exposes a role='dialog' region when open", () => {
    render(
      <CompareCaseCreateModal
        open
        selectedSessionIds={SESSIONS}
        onSubmit={() => {}}
        onCancel={() => {}}
      />,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("marks the dialog as modal", () => {
    render(
      <CompareCaseCreateModal
        open
        selectedSessionIds={SESSIONS}
        onSubmit={() => {}}
        onCancel={() => {}}
      />,
    );
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });

  it("labels the dialog with the heading id", () => {
    render(
      <CompareCaseCreateModal
        open
        selectedSessionIds={SESSIONS}
        onSubmit={() => {}}
        onCancel={() => {}}
      />,
    );
    const dialog = screen.getByRole("dialog");
    const heading = screen.getByRole("heading", { level: 2 });
    expect(dialog).toHaveAttribute("aria-labelledby", heading.id);
  });

  it("renders a heading 'New compare case'", () => {
    render(
      <CompareCaseCreateModal
        open
        selectedSessionIds={SESSIONS}
        onSubmit={() => {}}
        onCancel={() => {}}
      />,
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/new compare case/i);
  });

  it("renders a labelled rationale textarea", () => {
    render(
      <CompareCaseCreateModal
        open
        selectedSessionIds={SESSIONS}
        onSubmit={() => {}}
        onCancel={() => {}}
      />,
    );
    expect(screen.getByLabelText(/rationale/i)).toBeInTheDocument();
  });

  it("lists the count of selected sessions", () => {
    render(
      <CompareCaseCreateModal
        open
        selectedSessionIds={SESSIONS}
        onSubmit={() => {}}
        onCancel={() => {}}
      />,
    );
    expect(screen.getByText(/2 sessions selected/i)).toBeInTheDocument();
  });

  it("fires onCancel when the cancel button is clicked", () => {
    const onCancel = vi.fn();
    render(
      <CompareCaseCreateModal
        open
        selectedSessionIds={SESSIONS}
        onSubmit={() => {}}
        onCancel={onCancel}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("fires onSubmit with the trimmed rationale and selected session ids", () => {
    const onSubmit = vi.fn();
    render(
      <CompareCaseCreateModal
        open
        selectedSessionIds={SESSIONS}
        onSubmit={onSubmit}
        onCancel={() => {}}
      />,
    );
    fireEvent.change(screen.getByLabelText(/rationale/i), {
      target: { value: "  Wet vs dry tyre comparison  " },
    });
    fireEvent.click(screen.getByRole("button", { name: /save/i }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      rationale: "Wet vs dry tyre comparison",
      sessionIds: SESSIONS,
    });
  });

  it("does not fire onSubmit when rationale is empty", () => {
    const onSubmit = vi.fn();
    render(
      <CompareCaseCreateModal
        open
        selectedSessionIds={SESSIONS}
        onSubmit={onSubmit}
        onCancel={() => {}}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /save/i }));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("renders an inline error when rationale is empty and submit is attempted", () => {
    render(
      <CompareCaseCreateModal
        open
        selectedSessionIds={SESSIONS}
        onSubmit={() => {}}
        onCancel={() => {}}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /save/i }));
    expect(screen.getByText(/rationale.+required/i)).toBeInTheDocument();
  });

  it("disables the save button while pending", () => {
    render(
      <CompareCaseCreateModal
        open
        selectedSessionIds={SESSIONS}
        onSubmit={() => {}}
        onCancel={() => {}}
        pending
      />,
    );
    expect(screen.getByRole("button", { name: /save/i })).toBeDisabled();
  });

  it("renders an error from props when provided", () => {
    render(
      <CompareCaseCreateModal
        open
        selectedSessionIds={SESSIONS}
        onSubmit={() => {}}
        onCancel={() => {}}
        error="Backend rejected the case"
      />,
    );
    expect(screen.getByText(/backend rejected/i)).toBeInTheDocument();
  });
});
