import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProfileLayout, type ProfileLayoutProps } from "./ProfileLayout";

const baseProps: ProfileLayoutProps = {
  score: { score: 78, trend: [70, 72, 75, 78], delta: 3 },
  skillDimensions: [
    { label: "Braking", value: 72 },
    { label: "Apex", value: 80 },
    { label: "Throttle", value: 65 },
    { label: "Consistency", value: 85 },
  ],
  weaknesses: [{ id: "w1", title: "Late trail-brake T5", severity: "high", detailHref: "/w/w1" }],
  prescriptions: [{ id: "p1", title: "Trail-brake release drill", detailHref: "/p/p1" }],
  readiness: { value: 68, eventLabel: "Imola, Mar 15" },
};

describe("ProfileLayout", () => {
  it("renders the Driver score hero region", () => {
    render(<ProfileLayout {...baseProps} />);
    expect(screen.getByRole("region", { name: /driver score/i })).toBeInTheDocument();
  });

  it("renders the Skill radar chart", () => {
    render(<ProfileLayout {...baseProps} />);
    expect(screen.getByRole("img", { name: /skill radar/i })).toBeInTheDocument();
  });

  it("renders the Open weaknesses column", () => {
    render(<ProfileLayout {...baseProps} />);
    expect(screen.getByRole("heading", { level: 2, name: /open weaknesses/i })).toBeInTheDocument();
  });

  it("renders the Active prescriptions column", () => {
    render(<ProfileLayout {...baseProps} />);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /active prescriptions/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the Readiness gauge", () => {
    render(<ProfileLayout {...baseProps} />);
    expect(screen.getByRole("region", { name: /readiness/i })).toBeInTheDocument();
  });

  it("omits the archetype badge when archetype is not supplied", () => {
    render(<ProfileLayout {...baseProps} />);
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("renders the archetype badge when archetype is supplied", () => {
    render(<ProfileLayout {...baseProps} archetype="Smooth Operator" />);
    expect(screen.getByRole("status")).toHaveAccessibleName(/smooth operator/i);
  });

  it("renders the archetype locked badge when archetype is explicitly null", () => {
    render(<ProfileLayout {...baseProps} archetype={null} />);
    expect(screen.getByRole("status")).toHaveAccessibleName(/archetype locked/i);
  });

  it("stacks sections vertically by default on mobile", () => {
    const { container } = render(<ProfileLayout {...baseProps} />);
    const root = container.querySelector('[data-layout="profile"]');
    expect(root).not.toBeNull();
    expect(root?.classList.contains("flex")).toBe(true);
    expect(root?.classList.contains("flex-col")).toBe(true);
  });

  it("collapses the hero to a single column below md and to 2 columns from md up", () => {
    const { container } = render(<ProfileLayout {...baseProps} archetype="Smooth Operator" />);
    const hero = container.querySelector('[data-layout="profile-hero"]');
    expect(hero).not.toBeNull();
    const cls = hero?.className ?? "";
    expect(cls).toContain("grid");
    expect(cls).toContain("md:grid-cols-[2fr_1fr]");
    // The base (mobile) grid must NOT force multiple columns.
    expect(/(^|\s)grid-cols-\d/.test(cls)).toBe(false);
  });

  it("collapses the three-column row to a single column below md and to 3 columns from md up", () => {
    const { container } = render(<ProfileLayout {...baseProps} />);
    const columns = container.querySelector('[data-layout="profile-columns"]');
    expect(columns).not.toBeNull();
    const cls = columns?.className ?? "";
    expect(cls).toContain("grid");
    expect(cls).toContain("md:grid-cols-3");
    expect(/(^|\s)grid-cols-\d/.test(cls)).toBe(false);
  });

  it("applies a print-friendly white background + black text to the root", () => {
    const { container } = render(<ProfileLayout {...baseProps} />);
    const root = container.querySelector('[data-layout="profile"]');
    expect(root?.className).toMatch(/print:bg-white/);
    expect(root?.className).toMatch(/print:text-black/);
  });

  it("keeps the hero section on one printed page", () => {
    const { container } = render(<ProfileLayout {...baseProps} />);
    const hero = container.querySelector('[data-layout="profile-hero"]');
    expect(hero?.className).toMatch(/print:break-inside-avoid/);
  });

  it("keeps the three-column row on one printed page", () => {
    const { container } = render(<ProfileLayout {...baseProps} />);
    const columns = container.querySelector('[data-layout="profile-columns"]');
    expect(columns?.className).toMatch(/print:break-inside-avoid/);
  });
});
