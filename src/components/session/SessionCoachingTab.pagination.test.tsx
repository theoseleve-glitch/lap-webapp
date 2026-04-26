import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  SessionCoachingTab,
  type CoachingPrescription,
  type SessionCoachingView,
} from "./SessionCoachingTab";

function makePrescriptions(count: number): CoachingPrescription[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `p${i + 1}`,
    title: `Drill ${i + 1}`,
    description: `Description for drill ${i + 1}`,
    difficulty: "intermediate" as const,
  }));
}

function makeView(prescriptions: CoachingPrescription[]): SessionCoachingView {
  return {
    newWeaknesses: [],
    escalatedWeaknesses: [],
    prescriptions,
    dataQualityInsufficient: false,
  };
}

describe("SessionCoachingTab pagination (T105)", () => {
  it("renders all prescriptions and no pagination controls when count <= 10", () => {
    render(<SessionCoachingTab coaching={makeView(makePrescriptions(10))} />);
    const region = screen.getByRole("region", { name: /^prescriptions$/i });
    // All 10 items rendered.
    expect(within(region).getAllByRole("listitem")).toHaveLength(10);
    // No pagination controls.
    expect(screen.queryByRole("button", { name: /next page/i })).toBeNull();
    expect(screen.queryByRole("button", { name: /previous page/i })).toBeNull();
  });

  it("paginates at >10 prescriptions, showing the first 10 on page 1", () => {
    render(<SessionCoachingTab coaching={makeView(makePrescriptions(25))} />);
    const region = screen.getByRole("region", { name: /^prescriptions$/i });
    expect(within(region).getAllByRole("listitem")).toHaveLength(10);
    // First page should contain "Drill 1" through "Drill 10".
    expect(within(region).getByText("Drill 1")).toBeInTheDocument();
    expect(within(region).getByText("Drill 10")).toBeInTheDocument();
    expect(within(region).queryByText("Drill 11")).toBeNull();
  });

  it("renders Next + Previous buttons when paginated", () => {
    render(<SessionCoachingTab coaching={makeView(makePrescriptions(25))} />);
    expect(screen.getByRole("button", { name: /next page/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /previous page/i })).toBeInTheDocument();
  });

  it("disables Previous on page 1 and enables Next", () => {
    render(<SessionCoachingTab coaching={makeView(makePrescriptions(25))} />);
    expect(screen.getByRole("button", { name: /previous page/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /next page/i })).not.toBeDisabled();
  });

  it("advances to page 2 with the next 10 items when Next is clicked", () => {
    render(<SessionCoachingTab coaching={makeView(makePrescriptions(25))} />);
    fireEvent.click(screen.getByRole("button", { name: /next page/i }));
    const region = screen.getByRole("region", { name: /^prescriptions$/i });
    expect(within(region).getAllByRole("listitem")).toHaveLength(10);
    expect(within(region).getByText("Drill 11")).toBeInTheDocument();
    expect(within(region).getByText("Drill 20")).toBeInTheDocument();
    expect(within(region).queryByText("Drill 1")).toBeNull();
  });

  it("disables Next on the last page when there are fewer remaining items", () => {
    render(<SessionCoachingTab coaching={makeView(makePrescriptions(25))} />);
    // Click Next twice — page 3 has 5 items (21..25), no further pages.
    fireEvent.click(screen.getByRole("button", { name: /next page/i }));
    fireEvent.click(screen.getByRole("button", { name: /next page/i }));
    const region = screen.getByRole("region", { name: /^prescriptions$/i });
    expect(within(region).getAllByRole("listitem")).toHaveLength(5);
    expect(within(region).getByText("Drill 21")).toBeInTheDocument();
    expect(within(region).getByText("Drill 25")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next page/i })).toBeDisabled();
  });

  it("returns to page 1 when Previous is clicked from page 2", () => {
    render(<SessionCoachingTab coaching={makeView(makePrescriptions(25))} />);
    fireEvent.click(screen.getByRole("button", { name: /next page/i }));
    fireEvent.click(screen.getByRole("button", { name: /previous page/i }));
    const region = screen.getByRole("region", { name: /^prescriptions$/i });
    expect(within(region).getByText("Drill 1")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /previous page/i })).toBeDisabled();
  });

  it("displays a 'Page N of M' status label", () => {
    render(<SessionCoachingTab coaching={makeView(makePrescriptions(25))} />);
    expect(screen.getByText(/page 1 of 3/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /next page/i }));
    expect(screen.getByText(/page 2 of 3/i)).toBeInTheDocument();
  });
});
