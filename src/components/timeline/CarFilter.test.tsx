import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CarFilter } from "./CarFilter";

const CARS = ["Ferrari 296 GT3", "Porsche 992 GT3", "BMW M4 GT3"] as const;

describe("CarFilter (T122)", () => {
  it("renders an aria-labelled 'Car' radiogroup", () => {
    render(<CarFilter cars={CARS} value={null} onChange={() => {}} />);
    expect(screen.getByRole("radiogroup", { name: /^car$/i })).toBeInTheDocument();
  });

  it("renders an 'All cars' option that is checked when value=null", () => {
    render(<CarFilter cars={CARS} value={null} onChange={() => {}} />);
    expect(screen.getByRole("radio", { name: /all cars/i })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("renders one chip per supplied car", () => {
    render(<CarFilter cars={CARS} value={null} onChange={() => {}} />);
    for (const car of CARS) {
      expect(screen.getByRole("radio", { name: car })).toBeInTheDocument();
    }
  });

  it("marks the currently selected car as checked", () => {
    render(<CarFilter cars={CARS} value="Porsche 992 GT3" onChange={() => {}} />);
    expect(screen.getByRole("radio", { name: /porsche 992 gt3/i })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByRole("radio", { name: /all cars/i })).toHaveAttribute(
      "aria-checked",
      "false",
    );
  });

  it("emits onChange(carName) when a specific car chip is clicked", () => {
    const onChange = vi.fn();
    render(<CarFilter cars={CARS} value={null} onChange={onChange} />);
    fireEvent.click(screen.getByRole("radio", { name: /bmw m4 gt3/i }));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("BMW M4 GT3");
  });

  it("emits onChange(null) when 'All cars' is clicked from a specific car", () => {
    const onChange = vi.fn();
    render(<CarFilter cars={CARS} value="Ferrari 296 GT3" onChange={onChange} />);
    fireEvent.click(screen.getByRole("radio", { name: /all cars/i }));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it("does not emit onChange when the already-selected chip is clicked", () => {
    const onChange = vi.fn();
    render(<CarFilter cars={CARS} value="Porsche 992 GT3" onChange={onChange} />);
    fireEvent.click(screen.getByRole("radio", { name: /porsche 992 gt3/i }));
    expect(onChange).not.toHaveBeenCalled();
  });
});
