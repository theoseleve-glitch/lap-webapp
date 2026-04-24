import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BestSessionsList, type BestSessionItem } from "./BestSessionsList";

const FIVE_SESSIONS: readonly BestSessionItem[] = [
  {
    id: "s1",
    title: "Imola Practice 3",
    date: "2026-03-22",
    score: 88,
    detailHref: "/sessions/s1",
  },
  {
    id: "s2",
    title: "Imola Practice 2",
    date: "2026-03-15",
    score: 84,
    detailHref: "/sessions/s2",
  },
  {
    id: "s3",
    title: "Monza Qualifying",
    date: "2026-03-10",
    score: 82,
    detailHref: "/sessions/s3",
  },
  {
    id: "s4",
    title: "Spa Free Practice",
    date: "2026-03-05",
    score: 79,
    detailHref: "/sessions/s4",
  },
  {
    id: "s5",
    title: "Silverstone Race",
    date: "2026-02-28",
    score: 76,
    detailHref: "/sessions/s5",
  },
];

describe("BestSessionsList", () => {
  it("renders a heading labelled 'Best sessions'", () => {
    render(<BestSessionsList sessions={FIVE_SESSIONS} />);
    expect(screen.getByRole("heading", { level: 2, name: /best sessions/i })).toBeInTheDocument();
  });

  it("renders one entry per session (up to max)", () => {
    render(<BestSessionsList sessions={FIVE_SESSIONS} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(FIVE_SESSIONS.length);
  });

  it("renders each session's title", () => {
    render(<BestSessionsList sessions={FIVE_SESSIONS} />);
    for (const s of FIVE_SESSIONS) {
      expect(screen.getByText(s.title)).toBeInTheDocument();
    }
  });

  it("renders each session's score", () => {
    render(<BestSessionsList sessions={FIVE_SESSIONS} />);
    for (const s of FIVE_SESSIONS) {
      expect(screen.getByText(String(s.score))).toBeInTheDocument();
    }
  });

  it("caps displayed items to 5 by default", () => {
    const seven = [
      ...FIVE_SESSIONS,
      {
        id: "s6",
        title: "Nürburgring Practice",
        date: "2026-02-20",
        score: 74,
        detailHref: "/sessions/s6",
      },
      { id: "s7", title: "Suzuka Race", date: "2026-02-15", score: 72, detailHref: "/sessions/s7" },
    ];
    render(<BestSessionsList sessions={seven} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(5);
  });

  it("respects a custom max", () => {
    render(<BestSessionsList sessions={FIVE_SESSIONS} max={3} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("links each item to its detailHref when provided", () => {
    render(<BestSessionsList sessions={FIVE_SESSIONS.slice(0, 2)} />);
    expect(screen.getByRole("link", { name: /imola practice 3/i })).toHaveAttribute(
      "href",
      "/sessions/s1",
    );
  });

  it("keeps entries as plain text when detailHref is absent", () => {
    render(
      <BestSessionsList
        sessions={[{ id: "s1", title: "Private test day", date: "2026-03-22", score: 88 }]}
      />,
    );
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("renders an empty-state message when no sessions are supplied", () => {
    render(<BestSessionsList sessions={[]} />);
    expect(screen.getByText(/no session data/i)).toBeInTheDocument();
  });

  it("does not render a list in the empty state", () => {
    render(<BestSessionsList sessions={[]} />);
    expect(screen.queryByRole("list")).toBeNull();
  });
});
