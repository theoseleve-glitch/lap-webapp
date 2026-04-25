import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WorstSessionsList, type WorstSessionItem } from "./WorstSessionsList";

const FIVE_SESSIONS: readonly WorstSessionItem[] = [
  {
    id: "s1",
    title: "Nordschleife Race",
    date: "2026-03-22",
    score: 42,
    detailHref: "/sessions/s1",
  },
  {
    id: "s2",
    title: "Sebring Endurance",
    date: "2026-03-18",
    score: 45,
    detailHref: "/sessions/s2",
  },
  { id: "s3", title: "COTA Qualifying", date: "2026-03-14", score: 48, detailHref: "/sessions/s3" },
  { id: "s4", title: "Suzuka Wet Race", date: "2026-03-09", score: 51, detailHref: "/sessions/s4" },
  { id: "s5", title: "Spa Night Race", date: "2026-03-04", score: 55, detailHref: "/sessions/s5" },
];

describe("WorstSessionsList", () => {
  it("renders a heading labelled 'Worst sessions'", () => {
    render(<WorstSessionsList sessions={FIVE_SESSIONS} />);
    expect(screen.getByRole("heading", { level: 2, name: /worst sessions/i })).toBeInTheDocument();
  });

  it("renders one entry per session", () => {
    render(<WorstSessionsList sessions={FIVE_SESSIONS} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(FIVE_SESSIONS.length);
  });

  it("renders each session's title", () => {
    render(<WorstSessionsList sessions={FIVE_SESSIONS} />);
    for (const s of FIVE_SESSIONS) {
      expect(screen.getByText(s.title)).toBeInTheDocument();
    }
  });

  it("renders each session's score", () => {
    render(<WorstSessionsList sessions={FIVE_SESSIONS} />);
    for (const s of FIVE_SESSIONS) {
      expect(screen.getByText(String(s.score))).toBeInTheDocument();
    }
  });

  it("caps displayed items to 5 by default", () => {
    const seven = [
      ...FIVE_SESSIONS,
      { id: "s6", title: "Extra A", date: "2026-02-20", score: 58, detailHref: "/sessions/s6" },
      { id: "s7", title: "Extra B", date: "2026-02-15", score: 60, detailHref: "/sessions/s7" },
    ];
    render(<WorstSessionsList sessions={seven} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(5);
  });

  it("respects a custom max", () => {
    render(<WorstSessionsList sessions={FIVE_SESSIONS} max={2} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("links each item to its detailHref when provided", () => {
    render(<WorstSessionsList sessions={FIVE_SESSIONS.slice(0, 1)} />);
    expect(screen.getByRole("link", { name: /nordschleife race/i })).toHaveAttribute(
      "href",
      "/sessions/s1",
    );
  });

  it("keeps entries as plain text when detailHref is absent", () => {
    render(
      <WorstSessionsList
        sessions={[{ id: "s1", title: "Private test day", date: "2026-03-22", score: 42 }]}
      />,
    );
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("renders an empty-state message when no sessions are supplied", () => {
    render(<WorstSessionsList sessions={[]} />);
    expect(screen.getByText(/no.*sessions/i)).toBeInTheDocument();
  });

  it("gives the score badge a safety-red tone to flag the worst performances", () => {
    const { container } = render(<WorstSessionsList sessions={FIVE_SESSIONS.slice(0, 1)} />);
    const badge = container.querySelector("[data-role='worst-score']");
    expect(badge?.className ?? "").toMatch(/safety-red/);
  });
});
