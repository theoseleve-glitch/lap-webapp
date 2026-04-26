import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FilterChipGroup } from "./FilterChipGroup";
import { CarFilter } from "./CarFilter";
import { TrackFilter } from "./TrackFilter";

const OPTIONS = [
  { value: "all", label: "All" },
  { value: "a", label: "A" },
  { value: "b", label: "B" },
];

describe("FilterChipGroup layout (T133 mobile horizontal scroll)", () => {
  it("uses flex-wrap by default (preserves existing behavior)", () => {
    const { container } = render(
      <FilterChipGroup label="Test" options={OPTIONS} value="all" onChange={() => {}} />,
    );
    const radiogroup = container.querySelector("[role='radiogroup']");
    expect(radiogroup?.className).toMatch(/flex-wrap/);
  });

  it("uses horizontal scroll when layout='scroll'", () => {
    const { container } = render(
      <FilterChipGroup
        label="Test"
        options={OPTIONS}
        value="all"
        onChange={() => {}}
        layout="scroll"
      />,
    );
    const radiogroup = container.querySelector("[role='radiogroup']");
    expect(radiogroup?.className).toMatch(/overflow-x-auto/);
    expect(radiogroup?.className).not.toMatch(/flex-wrap/);
  });

  it("keeps each chip's label on a single line in scroll mode (whitespace-nowrap)", () => {
    const { container } = render(
      <FilterChipGroup
        label="Test"
        options={OPTIONS}
        value="all"
        onChange={() => {}}
        layout="scroll"
      />,
    );
    const chips = container.querySelectorAll<HTMLButtonElement>("[role='radio']");
    expect(chips.length).toBeGreaterThan(0);
    for (const chip of Array.from(chips)) {
      expect(chip.className).toMatch(/whitespace-nowrap/);
    }
  });

  it("TrackFilter opts into scroll layout (many tracks)", () => {
    const { container } = render(
      <TrackFilter tracks={["Imola", "Spa", "Suzuka"]} value={null} onChange={() => {}} />,
    );
    const radiogroup = container.querySelector("[role='radiogroup']");
    expect(radiogroup?.className).toMatch(/overflow-x-auto/);
  });

  it("CarFilter opts into scroll layout (many cars)", () => {
    const { container } = render(
      <CarFilter cars={["Ferrari 296 GT3", "Porsche 992 GT3"]} value={null} onChange={() => {}} />,
    );
    const radiogroup = container.querySelector("[role='radiogroup']");
    expect(radiogroup?.className).toMatch(/overflow-x-auto/);
  });
});
