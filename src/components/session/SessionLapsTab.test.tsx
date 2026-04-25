import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SessionLapsTab, type LapRow } from "./SessionLapsTab";

const LAPS: LapRow[] = [
  {
    number: 1,
    lapTimeMs: 95210,
    sectors: [29010, 36000, 30200],
    isPersonalBest: false,
    isInvalid: false,
  },
  {
    number: 2,
    lapTimeMs: 92456,
    sectors: [28010, 35020, 29426],
    isPersonalBest: true,
    isInvalid: false,
  },
  {
    number: 3,
    lapTimeMs: 99000,
    sectors: [30100, 38000, 30900],
    isPersonalBest: false,
    isInvalid: true,
  },
  {
    number: 4,
    lapTimeMs: 93812,
    sectors: [28510, 35400, 29902],
    isPersonalBest: false,
    isInvalid: false,
  },
];

describe("SessionLapsTab", () => {
  it("renders an aria-labelled 'Laps' region", () => {
    render(<SessionLapsTab laps={LAPS} />);
    expect(screen.getByRole("region", { name: /^laps$/i })).toBeInTheDocument();
  });

  it("renders one row per lap by default in lap-number order", () => {
    render(<SessionLapsTab laps={LAPS} />);
    const rows = screen.getAllByRole("row");
    // First row is the header; data rows follow.
    const dataRows = rows.slice(1);
    expect(dataRows).toHaveLength(4);
    expect(within(dataRows[0]!).getByText("1")).toBeInTheDocument();
    expect(within(dataRows[1]!).getByText("2")).toBeInTheDocument();
    expect(within(dataRows[2]!).getByText("3")).toBeInTheDocument();
    expect(within(dataRows[3]!).getByText("4")).toBeInTheDocument();
  });

  it("renders the formatted lap time for each lap", () => {
    render(<SessionLapsTab laps={LAPS} />);
    expect(screen.getByText("1:35.210")).toBeInTheDocument();
    expect(screen.getByText("1:32.456")).toBeInTheDocument();
    expect(screen.getByText("1:39.000")).toBeInTheDocument();
    expect(screen.getByText("1:33.812")).toBeInTheDocument();
  });

  it("marks the personal best lap with a 'PB' indicator", () => {
    render(<SessionLapsTab laps={LAPS} />);
    const pbBadge = screen.getByText(/^PB$/);
    expect(pbBadge).toBeInTheDocument();
    // The PB row should be lap #2 (the personal best).
    const pbRow = pbBadge.closest("tr");
    expect(pbRow).not.toBeNull();
    expect(within(pbRow!).getByText("2")).toBeInTheDocument();
  });

  it("marks invalid laps with an 'INV' indicator", () => {
    render(<SessionLapsTab laps={LAPS} />);
    const invBadge = screen.getByText(/^INV$/);
    expect(invBadge).toBeInTheDocument();
    const invRow = invBadge.closest("tr");
    expect(within(invRow!).getByText("3")).toBeInTheDocument();
  });

  it("re-sorts by fastest lap time when 'Sort by time' is toggled", () => {
    render(<SessionLapsTab laps={LAPS} />);
    fireEvent.click(screen.getByRole("button", { name: /sort by time/i }));
    const dataRows = screen.getAllByRole("row").slice(1);
    // Fastest first: lap 2 (1:32.456), lap 4 (1:33.812), lap 1 (1:35.210), lap 3 (1:39.000)
    expect(within(dataRows[0]!).getByText("2")).toBeInTheDocument();
    expect(within(dataRows[1]!).getByText("4")).toBeInTheDocument();
    expect(within(dataRows[2]!).getByText("1")).toBeInTheDocument();
    expect(within(dataRows[3]!).getByText("3")).toBeInTheDocument();
  });

  it("hides invalid laps when 'Hide invalid' is toggled on", () => {
    render(<SessionLapsTab laps={LAPS} />);
    fireEvent.click(screen.getByRole("button", { name: /hide invalid/i }));
    // Lap 3 is invalid and should be hidden.
    const dataRows = screen.getAllByRole("row").slice(1);
    expect(dataRows).toHaveLength(3);
    expect(screen.queryByText(/^INV$/)).toBeNull();
  });

  it("renders an empty-state message when no laps are provided", () => {
    render(<SessionLapsTab laps={[]} />);
    expect(screen.getByText(/no laps/i)).toBeInTheDocument();
    // The data rows should not render.
    expect(screen.queryAllByRole("row")).toHaveLength(0);
  });

  it("renders a column header for each sector when sectors exist", () => {
    render(<SessionLapsTab laps={LAPS} />);
    expect(screen.getByRole("columnheader", { name: /^s1$/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /^s2$/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /^s3$/i })).toBeInTheDocument();
  });
});
