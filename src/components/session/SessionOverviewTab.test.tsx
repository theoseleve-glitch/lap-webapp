import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { formatLapTime, SessionOverviewTab, type SessionOverviewView } from "./SessionOverviewTab";

const FIXTURE: SessionOverviewView = {
  lapCount: 23,
  bestLapMs: 92456, // 1:32.456
  averageLapMs: 93812, // 1:33.812
  totalDurationMs: 2160000, // 36:00.000
  lapTimeRangeMs: { fastest: 92456, slowest: 98214, stdDevMs: 1234 },
  sectors: [
    { index: 1, label: "S1", bestMs: 28010 },
    { index: 2, label: "S2", bestMs: 35020 },
    { index: 3, label: "S3", bestMs: 29426 },
  ],
};

describe("formatLapTime", () => {
  it("renders 1:32.456 for 92456 ms", () => {
    expect(formatLapTime(92456)).toBe("1:32.456");
  });

  it("renders 0:28.010 for 28010 ms (sub-minute, pads seconds and millis)", () => {
    expect(formatLapTime(28010)).toBe("0:28.010");
  });

  it("renders 36:00.000 for 2160000 ms (long durations)", () => {
    expect(formatLapTime(2160000)).toBe("36:00.000");
  });

  it("rounds milliseconds to integer", () => {
    expect(formatLapTime(92456.7)).toBe("1:32.457");
  });

  it("returns '—' for non-finite or negative input", () => {
    expect(formatLapTime(Number.NaN)).toBe("—");
    expect(formatLapTime(-1)).toBe("—");
    expect(formatLapTime(Number.POSITIVE_INFINITY)).toBe("—");
  });
});

describe("SessionOverviewTab", () => {
  it("renders an aria-labelled 'Session overview' region", () => {
    render(<SessionOverviewTab overview={FIXTURE} />);
    expect(screen.getByRole("region", { name: /session overview/i })).toBeInTheDocument();
  });

  it("renders the lap count", () => {
    render(<SessionOverviewTab overview={FIXTURE} />);
    expect(screen.getByText("23")).toBeInTheDocument();
    expect(screen.getByText(/laps/i)).toBeInTheDocument();
  });

  it("renders the best lap formatted as 1:32.456 in the Summary region", () => {
    render(<SessionOverviewTab overview={FIXTURE} />);
    const summary = screen.getByRole("region", { name: /^summary$/i });
    expect(within(summary).getByText("1:32.456")).toBeInTheDocument();
  });

  it("renders the average lap formatted as 1:33.812 in the Summary region", () => {
    render(<SessionOverviewTab overview={FIXTURE} />);
    const summary = screen.getByRole("region", { name: /^summary$/i });
    expect(within(summary).getByText("1:33.812")).toBeInTheDocument();
  });

  it("renders the total duration formatted as 36:00.000 in the Summary region", () => {
    render(<SessionOverviewTab overview={FIXTURE} />);
    const summary = screen.getByRole("region", { name: /^summary$/i });
    expect(within(summary).getByText("36:00.000")).toBeInTheDocument();
  });

  it("renders an aria-labelled 'Lap time distribution' region with fastest/slowest/stddev", () => {
    render(<SessionOverviewTab overview={FIXTURE} />);
    const dist = screen.getByRole("region", { name: /lap time distribution/i });
    expect(within(dist).getByText("1:32.456")).toBeInTheDocument(); // fastest
    expect(within(dist).getByText("1:38.214")).toBeInTheDocument(); // slowest
    expect(within(dist).getByText(/1\.234/)).toBeInTheDocument(); // std dev seconds
  });

  it("renders a 'Sectors' region with each sector label and best time", () => {
    render(<SessionOverviewTab overview={FIXTURE} />);
    const sectorsRegion = screen.getByRole("region", { name: /^sectors$/i });
    expect(within(sectorsRegion).getByText("S1")).toBeInTheDocument();
    expect(within(sectorsRegion).getByText("S2")).toBeInTheDocument();
    expect(within(sectorsRegion).getByText("S3")).toBeInTheDocument();
    expect(within(sectorsRegion).getByText("0:28.010")).toBeInTheDocument();
    expect(within(sectorsRegion).getByText("0:35.020")).toBeInTheDocument();
    expect(within(sectorsRegion).getByText("0:29.426")).toBeInTheDocument();
  });

  it("renders an empty-sectors message when sectors is empty", () => {
    const empty: SessionOverviewView = { ...FIXTURE, sectors: [] };
    render(<SessionOverviewTab overview={empty} />);
    expect(screen.getByText(/no sector data/i)).toBeInTheDocument();
  });
});
