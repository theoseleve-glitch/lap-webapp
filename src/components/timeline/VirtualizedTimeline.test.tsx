import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VirtualizedTimeline, type TimelineRow } from "./VirtualizedTimeline";

function makeEntries(count: number): TimelineRow[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `t${i + 1}`,
    title: `Session ${i + 1}`,
    date: `2026-04-${String((i % 28) + 1).padStart(2, "0")}`,
    href: `/sessions/s${i + 1}`,
    subtitle: i % 3 === 0 ? "Imola GT3 · Ferrari 296" : undefined,
  }));
}

describe("VirtualizedTimeline (T115)", () => {
  it("renders an aria-labelled 'Timeline' region", () => {
    render(<VirtualizedTimeline entries={makeEntries(5)} />);
    expect(screen.getByRole("region", { name: /^timeline$/i })).toBeInTheDocument();
  });

  it("renders TimelineEntry articles inside the virtualized list", () => {
    render(<VirtualizedTimeline entries={makeEntries(5)} />);
    // At least the first few entries should be in the DOM after initial render.
    expect(screen.getByText("Session 1")).toBeInTheDocument();
  });

  it("renders an empty state when no entries are supplied", () => {
    render(<VirtualizedTimeline entries={[]} />);
    expect(screen.getByText(/no sessions/i)).toBeInTheDocument();
  });

  it("does not render entry articles when the list is empty", () => {
    render(<VirtualizedTimeline entries={[]} />);
    expect(screen.queryByRole("article")).toBeNull();
  });

  it("hands each entry's id to react for stable keys via the row id", () => {
    // Smoke test: render with many entries — duplicate ids would trigger
    // React key warnings which would be visible during the initial render.
    const entries = makeEntries(100);
    expect(() => render(<VirtualizedTimeline entries={entries} />)).not.toThrow();
  });
});
