import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SkillDrilldownPage from "./page";

describe("SkillDrilldownPage", () => {
  it("renders a level-1 heading derived from the dimension slug", () => {
    render(<SkillDrilldownPage params={{ dimension: "apex-precision" }} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/apex precision/i);
  });

  it("keeps single-word dimension slugs capitalised in the heading", () => {
    render(<SkillDrilldownPage params={{ dimension: "braking" }} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/^braking$/i);
  });

  it("URL-decodes dimension slugs before rendering", () => {
    render(<SkillDrilldownPage params={{ dimension: "trail%2Dbraking" }} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/trail braking/i);
  });

  it("renders a subtitle describing the skill drilldown surface", () => {
    render(<SkillDrilldownPage params={{ dimension: "braking" }} />);
    expect(screen.getByText(/trend|sessions|weakness/i)).toBeInTheDocument();
  });
});
