import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TimelineEntry } from "./TimelineEntry";

const baseProps = {
  title: "Zandvoort — Practice",
  date: "24 Apr 2026",
  href: "/sessions/abc-123",
};

describe("TimelineEntry", () => {
  it("renders the title as a level-3 heading", () => {
    render(<TimelineEntry {...baseProps} />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Zandvoort — Practice");
  });

  it("renders the pre-formatted date text", () => {
    render(<TimelineEntry {...baseProps} />);
    expect(screen.getByText("24 Apr 2026")).toBeInTheDocument();
  });

  it("renders the subtitle when provided", () => {
    render(<TimelineEntry {...baseProps} subtitle="BMW M4 GT4 — sim" />);
    expect(screen.getByText("BMW M4 GT4 — sim")).toBeInTheDocument();
  });

  it("omits the subtitle when not provided", () => {
    render(<TimelineEntry {...baseProps} />);
    expect(screen.queryByText("BMW M4 GT4 — sim")).not.toBeInTheDocument();
  });

  it("renders a link pointing at href", () => {
    render(<TimelineEntry {...baseProps} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/sessions/abc-123");
  });

  it("renders each tag", () => {
    render(<TimelineEntry {...baseProps} tags={["sim", "GT4", "Zandvoort"]} />);
    const tagList = screen.getByRole("list", { name: /tags/i });
    expect(within(tagList).getByText("sim")).toBeInTheDocument();
    expect(within(tagList).getByText("GT4")).toBeInTheDocument();
    expect(within(tagList).getByText("Zandvoort")).toBeInTheDocument();
  });

  it("renders each badge label", () => {
    render(
      <TimelineEntry
        {...baseProps}
        badges={[
          { label: "3 new weaknesses", tone: "warning" },
          { label: "1 prescription accepted", tone: "info" },
          { label: "Outcome achieved", tone: "success" },
        ]}
      />,
    );
    expect(screen.getByText("3 new weaknesses")).toBeInTheDocument();
    expect(screen.getByText("1 prescription accepted")).toBeInTheDocument();
    expect(screen.getByText("Outcome achieved")).toBeInTheDocument();
  });

  it("exposes the badge tone on a data attribute", () => {
    render(
      <TimelineEntry {...baseProps} badges={[{ label: "Outcome achieved", tone: "success" }]} />,
    );
    expect(screen.getByText("Outcome achieved")).toHaveAttribute("data-tone", "success");
  });

  it("defaults badge tone to neutral when omitted", () => {
    render(<TimelineEntry {...baseProps} badges={[{ label: "Archive-ready" }]} />);
    expect(screen.getByText("Archive-ready")).toHaveAttribute("data-tone", "neutral");
  });

  it("renders as an article whose accessible name includes the title", () => {
    render(<TimelineEntry {...baseProps} />);
    expect(screen.getByRole("article", { name: /zandvoort — practice/i })).toBeInTheDocument();
  });

  it("omits the tag list when no tags are supplied", () => {
    render(<TimelineEntry {...baseProps} />);
    expect(screen.queryByRole("list", { name: /tags/i })).not.toBeInTheDocument();
  });
});
