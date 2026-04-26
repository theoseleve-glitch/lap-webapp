import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { assertNoAxeViolations } from "@/lib/axe";
import { TimelineEntry, type TimelineBadge } from "./TimelineEntry";

const BASE = {
  title: "Imola GT3 — race 1",
  date: "2026-04-25",
  href: "/sessions/s_imola_2026_04_25",
} as const;

const BADGES: TimelineBadge[] = [
  { label: "PB", tone: "success" },
  { label: "INV", tone: "warning" },
  { label: "3 new", tone: "info" },
];

describe("TimelineEntry a11y (T132)", () => {
  it("renders without axe violations in the minimal shape", async () => {
    const { container } = render(<TimelineEntry {...BASE} />);
    await assertNoAxeViolations(container);
  });

  it("renders without axe violations with subtitle + tags + badges", async () => {
    const { container } = render(
      <TimelineEntry
        {...BASE}
        subtitle="iRacing · Ferrari 296 GT3"
        tags={["sim", "race"]}
        badges={BADGES}
      />,
    );
    await assertNoAxeViolations(container);
  });

  it("exposes a single keyboard-focusable link per card", () => {
    const { container } = render(
      <TimelineEntry {...BASE} subtitle="Subtitle" tags={["sim"]} badges={BADGES} />,
    );
    const links = container.querySelectorAll<HTMLAnchorElement>("a[href]");
    // Only one anchor — the whole-card link wrapping title + subtitle.
    expect(links.length).toBe(1);
    const link = links[0];
    expect(link).not.toBeNull();
    expect(link!.tabIndex).toBeGreaterThanOrEqual(0);
    expect(link!.getAttribute("href")).toBe(BASE.href);
  });

  it("exposes the card as an article with accessible name from the title", () => {
    render(<TimelineEntry {...BASE} />);
    const article = screen.getByRole("article", {
      name: new RegExp(BASE.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    });
    expect(article).toBeInTheDocument();
  });

  it("does not nest interactive elements inside the card link (would break SR + axe)", () => {
    const { container } = render(
      <TimelineEntry {...BASE} subtitle="Subtitle" tags={["sim"]} badges={BADGES} />,
    );
    const link = container.querySelector("a[href]");
    expect(link).not.toBeNull();
    // Buttons / nested links inside an anchor are an a11y bug. The whole-card
    // link should only contain non-interactive content (heading + text).
    expect(link?.querySelector("button")).toBeNull();
    expect(link?.querySelectorAll("a[href]").length).toBe(0);
  });
});
