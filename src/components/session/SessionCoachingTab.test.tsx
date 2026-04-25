import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SessionCoachingTab, type SessionCoachingView } from "./SessionCoachingTab";

const FULL: SessionCoachingView = {
  newWeaknesses: [
    {
      id: "w1",
      title: "Late braking, Turn 1",
      category: "braking",
      severity: "high",
    },
  ],
  escalatedWeaknesses: [
    {
      id: "w2",
      title: "Throttle modulation, Turn 7",
      category: "throttle",
      severity: "medium",
    },
  ],
  prescriptions: [
    {
      id: "p1",
      title: "Threshold braking drill",
      description: "10 laps focusing on brake-pressure release.",
      difficulty: "intermediate",
    },
  ],
  dataQualityInsufficient: false,
};

describe("SessionCoachingTab", () => {
  it("renders an aria-labelled 'Coaching' region", () => {
    render(<SessionCoachingTab coaching={FULL} />);
    expect(screen.getByRole("region", { name: /^coaching$/i })).toBeInTheDocument();
  });

  it("renders a 'New weaknesses' subsection with each new weakness item", () => {
    render(<SessionCoachingTab coaching={FULL} />);
    const region = screen.getByRole("region", { name: /^new weaknesses$/i });
    expect(within(region).getByText(/late braking, turn 1/i)).toBeInTheDocument();
  });

  it("renders an 'Escalated weaknesses' subsection with each escalated weakness item", () => {
    render(<SessionCoachingTab coaching={FULL} />);
    const region = screen.getByRole("region", { name: /^escalated weaknesses$/i });
    expect(within(region).getByText(/throttle modulation, turn 7/i)).toBeInTheDocument();
  });

  it("renders a 'Prescriptions' subsection with each prescription item", () => {
    render(<SessionCoachingTab coaching={FULL} />);
    const region = screen.getByRole("region", { name: /^prescriptions$/i });
    expect(within(region).getByText(/threshold braking drill/i)).toBeInTheDocument();
    expect(
      within(region).getByText(/10 laps focusing on brake-pressure release/i),
    ).toBeInTheDocument();
  });

  it("displays severity for each weakness", () => {
    render(<SessionCoachingTab coaching={FULL} />);
    const newRegion = screen.getByRole("region", { name: /^new weaknesses$/i });
    expect(within(newRegion).getByText(/high/i)).toBeInTheDocument();
    const escRegion = screen.getByRole("region", { name: /^escalated weaknesses$/i });
    expect(within(escRegion).getByText(/medium/i)).toBeInTheDocument();
  });

  it("displays difficulty for each prescription", () => {
    render(<SessionCoachingTab coaching={FULL} />);
    const region = screen.getByRole("region", { name: /^prescriptions$/i });
    expect(within(region).getByText(/intermediate/i)).toBeInTheDocument();
  });

  it("hides a subsection entirely when its list is empty", () => {
    const partial: SessionCoachingView = {
      newWeaknesses: [
        {
          id: "w1",
          title: "Late braking, Turn 1",
          category: "braking",
          severity: "high",
        },
      ],
      escalatedWeaknesses: [],
      prescriptions: [],
      dataQualityInsufficient: false,
    };
    render(<SessionCoachingTab coaching={partial} />);
    expect(screen.getByRole("region", { name: /^new weaknesses$/i })).toBeInTheDocument();
    expect(screen.queryByRole("region", { name: /^escalated weaknesses$/i })).toBeNull();
    expect(screen.queryByRole("region", { name: /^prescriptions$/i })).toBeNull();
  });

  it("renders the data-quality-insufficient empty state when flagged", () => {
    const insufficient: SessionCoachingView = {
      newWeaknesses: [],
      escalatedWeaknesses: [],
      prescriptions: [],
      dataQualityInsufficient: true,
    };
    render(<SessionCoachingTab coaching={insufficient} />);
    expect(screen.getByText(/data quality insufficient for coaching/i)).toBeInTheDocument();
  });

  it("renders a generic empty state when there is no coaching content and data is fine", () => {
    const empty: SessionCoachingView = {
      newWeaknesses: [],
      escalatedWeaknesses: [],
      prescriptions: [],
      dataQualityInsufficient: false,
    };
    render(<SessionCoachingTab coaching={empty} />);
    expect(screen.getByText(/no coaching insights/i)).toBeInTheDocument();
    expect(screen.queryByText(/data quality insufficient for coaching/i)).toBeNull();
  });
});
