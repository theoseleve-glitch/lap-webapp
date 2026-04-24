import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { OutcomeBadge } from "./OutcomeBadge";

describe("OutcomeBadge", () => {
  it("shows 'Met' for the met status", () => {
    render(<OutcomeBadge status="met" />);
    expect(screen.getByText("Met")).toBeInTheDocument();
  });

  it("shows 'Unmet' for the unmet status", () => {
    render(<OutcomeBadge status="unmet" />);
    expect(screen.getByText("Unmet")).toBeInTheDocument();
  });

  it("shows 'Pending' for the pending status", () => {
    render(<OutcomeBadge status="pending" />);
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  it("shows 'Skipped' for the skipped status", () => {
    render(<OutcomeBadge status="skipped" />);
    expect(screen.getByText("Skipped")).toBeInTheDocument();
  });

  it("exposes the status on a data attribute", () => {
    const { container } = render(<OutcomeBadge status="met" />);
    expect(container.firstElementChild).toHaveAttribute("data-status", "met");
  });

  it("is announced as a status region by default", () => {
    render(<OutcomeBadge status="met" />);
    expect(screen.getByRole("status")).toHaveTextContent("Met");
  });

  it("accepts a custom label overriding the default", () => {
    render(<OutcomeBadge status="met" label="Success — target cleared" />);
    expect(screen.getByText("Success — target cleared")).toBeInTheDocument();
  });

  it("uses an accessible aria-label that names the outcome status", () => {
    render(<OutcomeBadge status="unmet" />);
    expect(screen.getByRole("status")).toHaveAccessibleName(/unmet/i);
  });
});
