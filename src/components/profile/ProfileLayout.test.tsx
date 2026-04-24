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
});
