import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DateRangeFilter } from "./DateRangeFilter";

const empty = { start: "", end: "" };

describe("DateRangeFilter", () => {
  it("renders start and end date inputs with labelled controls", () => {
    render(<DateRangeFilter label="Date" value={empty} onChange={() => {}} />);
    expect(screen.getByLabelText(/from/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/to/i)).toBeInTheDocument();
  });

  it("exposes the group under its accessible label", () => {
    render(<DateRangeFilter label="Date" value={empty} onChange={() => {}} />);
    expect(screen.getByRole("group", { name: "Date" })).toBeInTheDocument();
  });

  it("reflects the current start and end values in the inputs", () => {
    render(
      <DateRangeFilter
        label="Date"
        value={{ start: "2026-04-01", end: "2026-04-24" }}
        onChange={() => {}}
      />,
    );
    expect(screen.getByLabelText(/from/i)).toHaveValue("2026-04-01");
    expect(screen.getByLabelText(/to/i)).toHaveValue("2026-04-24");
  });

  it("fires onChange with the updated range when start changes", () => {
    const onChange = vi.fn();
    render(
      <DateRangeFilter label="Date" value={{ start: "", end: "2026-04-30" }} onChange={onChange} />,
    );
    fireEvent.change(screen.getByLabelText(/from/i), {
      target: { value: "2026-04-01" },
    });
    expect(onChange).toHaveBeenCalledWith({
      start: "2026-04-01",
      end: "2026-04-30",
    });
  });

  it("fires onChange with the updated range when end changes", () => {
    const onChange = vi.fn();
    render(
      <DateRangeFilter label="Date" value={{ start: "2026-04-01", end: "" }} onChange={onChange} />,
    );
    fireEvent.change(screen.getByLabelText(/to/i), {
      target: { value: "2026-04-24" },
    });
    expect(onChange).toHaveBeenCalledWith({
      start: "2026-04-01",
      end: "2026-04-24",
    });
  });

  it("shows a validation alert when end is before start", () => {
    render(
      <DateRangeFilter
        label="Date"
        value={{ start: "2026-04-24", end: "2026-04-01" }}
        onChange={() => {}}
      />,
    );
    expect(screen.getByRole("alert")).toHaveTextContent(/after start/i);
  });

  it("does not show a validation alert when the range is valid", () => {
    render(
      <DateRangeFilter
        label="Date"
        value={{ start: "2026-04-01", end: "2026-04-24" }}
        onChange={() => {}}
      />,
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("does not show a validation alert when one bound is empty", () => {
    render(
      <DateRangeFilter label="Date" value={{ start: "2026-04-01", end: "" }} onChange={() => {}} />,
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("hides the clear button when both bounds are empty", () => {
    render(<DateRangeFilter label="Date" value={empty} onChange={() => {}} />);
    expect(screen.queryByRole("button", { name: /clear/i })).not.toBeInTheDocument();
  });

  it("shows the clear button when at least one bound is set", () => {
    render(
      <DateRangeFilter label="Date" value={{ start: "2026-04-01", end: "" }} onChange={() => {}} />,
    );
    expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();
  });

  it("fires onChange with an empty range when clear is clicked", () => {
    const onChange = vi.fn();
    render(
      <DateRangeFilter
        label="Date"
        value={{ start: "2026-04-01", end: "2026-04-24" }}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /clear/i }));
    expect(onChange).toHaveBeenCalledWith({ start: "", end: "" });
  });
});
