import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { EvidenceSessionsList, type EvidenceSessionItem } from "./EvidenceSessionsList";

const SIX: readonly EvidenceSessionItem[] = [
  {
    id: "s1",
    sessionTitle: "Imola Practice 3",
    date: "2026-03-22",
    evidenceNote: "Lap 5, T7",
    detailHref: "/sessions/s1",
  },
  {
    id: "s2",
    sessionTitle: "Imola Practice 2",
    date: "2026-03-15",
    evidenceNote: "Lap 12, T7",
    detailHref: "/sessions/s2",
  },
  {
    id: "s3",
    sessionTitle: "Monza Qualifying",
    date: "2026-03-10",
    evidenceNote: "Lap 3, T7",
    detailHref: "/sessions/s3",
  },
  {
    id: "s4",
    sessionTitle: "Spa Free Practice",
    date: "2026-03-05",
    detailHref: "/sessions/s4",
  },
  {
    id: "s5",
    sessionTitle: "Silverstone Race",
    date: "2026-02-28",
    evidenceNote: "Lap 22, T7",
    detailHref: "/sessions/s5",
  },
  {
    id: "s6",
    sessionTitle: "Suzuka Race",
    date: "2026-02-15",
    evidenceNote: "Lap 1, T7",
    detailHref: "/sessions/s6",
  },
];

describe("EvidenceSessionsList", () => {
  it("renders an 'Evidence sessions' section heading", () => {
    render(<EvidenceSessionsList sessions={SIX.slice(0, 3)} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/evidence sessions/i);
  });

  it("renders one item per session", () => {
    render(<EvidenceSessionsList sessions={SIX.slice(0, 3)} />);
    const list = screen.getByRole("list");
    expect(within(list).getAllByRole("listitem")).toHaveLength(3);
  });

  it("renders the session title for each item", () => {
    render(<EvidenceSessionsList sessions={SIX.slice(0, 3)} />);
    expect(screen.getByText("Imola Practice 3")).toBeInTheDocument();
    expect(screen.getByText("Imola Practice 2")).toBeInTheDocument();
    expect(screen.getByText("Monza Qualifying")).toBeInTheDocument();
  });

  it("renders the evidence note when provided", () => {
    render(<EvidenceSessionsList sessions={SIX.slice(0, 1)} />);
    expect(screen.getByText("Lap 5, T7")).toBeInTheDocument();
  });

  it("does not render an evidence note element when none is provided", () => {
    const { container } = render(<EvidenceSessionsList sessions={[SIX[3]!]} />);
    expect(container.querySelector("[data-role='evidence-note']")).toBeNull();
  });

  it("links each item to its detailHref when provided", () => {
    render(<EvidenceSessionsList sessions={SIX.slice(0, 1)} />);
    expect(screen.getByRole("link", { name: /imola practice 3/i })).toHaveAttribute(
      "href",
      "/sessions/s1",
    );
  });

  it("keeps entries as plain text when detailHref is absent", () => {
    render(
      <EvidenceSessionsList
        sessions={[
          {
            id: "s1",
            sessionTitle: "Private test day",
            date: "2026-03-22",
            evidenceNote: "Lap 8",
          },
        ]}
      />,
    );
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("caps displayed items to 5 by default", () => {
    render(<EvidenceSessionsList sessions={SIX} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(5);
  });

  it("respects a custom max", () => {
    render(<EvidenceSessionsList sessions={SIX} max={2} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("renders an empty-state message when no sessions are supplied", () => {
    render(<EvidenceSessionsList sessions={[]} />);
    expect(screen.getByText(/no evidence/i)).toBeInTheDocument();
  });

  it("does not render a list element in the empty state", () => {
    render(<EvidenceSessionsList sessions={[]} />);
    expect(screen.queryByRole("list")).toBeNull();
  });
});
