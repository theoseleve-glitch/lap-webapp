import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FilterChipGroup } from "./FilterChipGroup";

const SOURCE_OPTIONS = [
  { value: "all", label: "All sources" },
  { value: "sim", label: "Sim" },
  { value: "real", label: "Real" },
] as const;

type SourceValue = (typeof SOURCE_OPTIONS)[number]["value"];

describe("FilterChipGroup", () => {
  it("renders every option label", () => {
    render(
      <FilterChipGroup<SourceValue>
        label="Source"
        options={SOURCE_OPTIONS}
        value="all"
        onChange={() => {}}
      />,
    );
    for (const opt of SOURCE_OPTIONS) {
      expect(screen.getByText(opt.label)).toBeInTheDocument();
    }
  });

  it("marks the current value as checked", () => {
    render(
      <FilterChipGroup<SourceValue>
        label="Source"
        options={SOURCE_OPTIONS}
        value="sim"
        onChange={() => {}}
      />,
    );
    const selected = screen.getByRole("radio", { name: "Sim" });
    expect(selected).toHaveAttribute("aria-checked", "true");
  });

  it("marks non-selected options as unchecked", () => {
    render(
      <FilterChipGroup<SourceValue>
        label="Source"
        options={SOURCE_OPTIONS}
        value="sim"
        onChange={() => {}}
      />,
    );
    expect(screen.getByRole("radio", { name: "All sources" })).toHaveAttribute(
      "aria-checked",
      "false",
    );
    expect(screen.getByRole("radio", { name: "Real" })).toHaveAttribute("aria-checked", "false");
  });

  it("fires onChange with the new value when an unselected chip is clicked", () => {
    const onChange = vi.fn();
    render(
      <FilterChipGroup<SourceValue>
        label="Source"
        options={SOURCE_OPTIONS}
        value="all"
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByRole("radio", { name: "Sim" }));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("sim");
  });

  it("does not fire onChange when the already-selected chip is clicked", () => {
    const onChange = vi.fn();
    render(
      <FilterChipGroup<SourceValue>
        label="Source"
        options={SOURCE_OPTIONS}
        value="sim"
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByRole("radio", { name: "Sim" }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("exposes the group as a radiogroup with the supplied accessible label", () => {
    render(
      <FilterChipGroup<SourceValue>
        label="Source"
        options={SOURCE_OPTIONS}
        value="all"
        onChange={() => {}}
      />,
    );
    expect(screen.getByRole("radiogroup", { name: "Source" })).toBeInTheDocument();
  });
});
