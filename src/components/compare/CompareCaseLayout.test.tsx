import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CompareCaseLayout, type CompareSessionSummary } from "./CompareCaseLayout";

const SESSIONS: readonly CompareSessionSummary[] = [
  {
    id: "s-imola-A",
    title: "Imola — Tuesday baseline",
    date: "Mar 12, 2026",
    detailHref: "/timeline/s-imola-A",
    scoreLabel: "Score 72",
  },
  {
    id: "s-imola-B",
    title: "Imola — Tuesday post-bias",
    date: "Mar 12, 2026",
    detailHref: "/timeline/s-imola-B",
    scoreLabel: "Score 79",
  },
];

describe("CompareCaseLayout", () => {
  it("renders a sessions region with one entry per session", () => {
    render(<CompareCaseLayout sessions={SESSIONS} rationale="Bias step study" />);
    const sessions = screen.getByRole("region", { name: /sessions/i });
    expect(within(sessions).getAllByRole("listitem")).toHaveLength(2);
  });

  it("renders each session title and date", () => {
    render(<CompareCaseLayout sessions={SESSIONS} rationale="Bias step study" />);
    expect(screen.getByText("Imola — Tuesday baseline")).toBeInTheDocument();
    expect(screen.getByText("Imola — Tuesday post-bias")).toBeInTheDocument();
  });

  it("links each session to its detailHref when provided", () => {
    render(<CompareCaseLayout sessions={SESSIONS} rationale="Bias step study" />);
    expect(screen.getByRole("link", { name: /tuesday baseline/i })).toHaveAttribute(
      "href",
      "/timeline/s-imola-A",
    );
  });

  it("renders the score label for each session when provided", () => {
    render(<CompareCaseLayout sessions={SESSIONS} rationale="Bias step study" />);
    expect(screen.getByText("Score 72")).toBeInTheDocument();
    expect(screen.getByText("Score 79")).toBeInTheDocument();
  });

  it("renders a rationale region with the rationale text", () => {
    render(
      <CompareCaseLayout sessions={SESSIONS} rationale="Wet vs dry tyre delta — Imola Tuesday." />,
    );
    const rationale = screen.getByRole("region", { name: /rationale/i });
    expect(within(rationale).getByText(/wet vs dry tyre delta/i)).toBeInTheDocument();
  });

  it("renders an outcome region with the summary when outcome is provided", () => {
    render(
      <CompareCaseLayout
        sessions={SESSIONS}
        rationale="Bias step"
        outcome={{ summary: "Apex precision +4 vs baseline." }}
      />,
    );
    const outcome = screen.getByRole("region", { name: /outcome/i });
    expect(within(outcome).getByText(/apex precision/i)).toBeInTheDocument();
  });

  it("renders a placeholder in the outcome region when outcome is undefined", () => {
    render(<CompareCaseLayout sessions={SESSIONS} rationale="Bias step" />);
    const outcome = screen.getByRole("region", { name: /outcome/i });
    expect(within(outcome).getByText(/outcome.+pending/i)).toBeInTheDocument();
  });

  it("places the sessions row in a side-by-side grid", () => {
    const { container } = render(<CompareCaseLayout sessions={SESSIONS} rationale="Bias step" />);
    const sessionsRow = container.querySelector('[data-layout="compare-sessions"]');
    expect(sessionsRow).not.toBeNull();
    expect(sessionsRow!.className).toContain("md:grid-cols-2");
  });

  it("exposes a top-level data-layout='compare-case' wrapper", () => {
    const { container } = render(<CompareCaseLayout sessions={SESSIONS} rationale="Bias step" />);
    expect(container.querySelector('[data-layout="compare-case"]')).not.toBeNull();
  });
});
