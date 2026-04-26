import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TrackFilter } from "./TrackFilter";

const TRACKS = ["Imola", "Silverstone", "Spa"] as const;

describe("TrackFilter (T121)", () => {
  it("renders an aria-labelled 'Track' radiogroup", () => {
    render(<TrackFilter tracks={TRACKS} value={null} onChange={() => {}} />);
    expect(screen.getByRole("radiogroup", { name: /^track$/i })).toBeInTheDocument();
  });

  it("renders an 'All tracks' option that is checked when value=null", () => {
    render(<TrackFilter tracks={TRACKS} value={null} onChange={() => {}} />);
    const all = screen.getByRole("radio", { name: /all tracks/i });
    expect(all).toHaveAttribute("aria-checked", "true");
  });

  it("renders one chip per supplied track", () => {
    render(<TrackFilter tracks={TRACKS} value={null} onChange={() => {}} />);
    for (const track of TRACKS) {
      expect(screen.getByRole("radio", { name: track })).toBeInTheDocument();
    }
  });

  it("marks the currently selected track as checked", () => {
    render(<TrackFilter tracks={TRACKS} value="Spa" onChange={() => {}} />);
    expect(screen.getByRole("radio", { name: /spa/i })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radio", { name: /all tracks/i })).toHaveAttribute(
      "aria-checked",
      "false",
    );
  });

  it("emits onChange(trackName) when a specific track chip is clicked", () => {
    const onChange = vi.fn();
    render(<TrackFilter tracks={TRACKS} value={null} onChange={onChange} />);
    fireEvent.click(screen.getByRole("radio", { name: /silverstone/i }));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("Silverstone");
  });

  it("emits onChange(null) when 'All tracks' is clicked from a specific track", () => {
    const onChange = vi.fn();
    render(<TrackFilter tracks={TRACKS} value="Imola" onChange={onChange} />);
    fireEvent.click(screen.getByRole("radio", { name: /all tracks/i }));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it("does not emit onChange when the already-selected chip is clicked", () => {
    const onChange = vi.fn();
    render(<TrackFilter tracks={TRACKS} value="Spa" onChange={onChange} />);
    fireEvent.click(screen.getByRole("radio", { name: /spa/i }));
    expect(onChange).not.toHaveBeenCalled();
  });
});
