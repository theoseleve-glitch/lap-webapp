import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  SessionTelemetryTab,
  type SessionTelemetryView,
  type TelemetryChannel,
} from "./SessionTelemetryTab";

const SPEED_CHANNEL: TelemetryChannel = {
  key: "speed",
  label: "Speed",
  unit: "mph",
  laps: [
    {
      lapNumber: 1,
      samples: [
        { t: 0, v: 0 },
        { t: 1000, v: 65 },
        { t: 2000, v: 120 },
        { t: 3000, v: 80 },
      ],
    },
    {
      lapNumber: 2,
      samples: [
        { t: 0, v: 5 },
        { t: 1000, v: 70 },
        { t: 2000, v: 125 },
        { t: 3000, v: 85 },
      ],
    },
  ],
};

const THROTTLE_CHANNEL: TelemetryChannel = {
  key: "throttle",
  label: "Throttle",
  unit: "%",
  laps: [
    {
      lapNumber: 1,
      samples: [
        { t: 0, v: 0 },
        { t: 1000, v: 100 },
        { t: 2000, v: 50 },
      ],
    },
  ],
};

const TELEMETRY: SessionTelemetryView = {
  channels: [SPEED_CHANNEL, THROTTLE_CHANNEL],
};

describe("SessionTelemetryTab", () => {
  it("renders an aria-labelled 'Telemetry' region", () => {
    render(<SessionTelemetryTab telemetry={TELEMETRY} />);
    expect(screen.getByRole("region", { name: /^telemetry$/i })).toBeInTheDocument();
  });

  it("renders one channel button per channel", () => {
    render(<SessionTelemetryTab telemetry={TELEMETRY} />);
    expect(screen.getByRole("button", { name: /^speed$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^throttle$/i })).toBeInTheDocument();
  });

  it("marks the first channel as the default selection (aria-pressed=true)", () => {
    render(<SessionTelemetryTab telemetry={TELEMETRY} />);
    expect(screen.getByRole("button", { name: /^speed$/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: /^throttle$/i })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("switches the active channel when a different button is clicked", () => {
    render(<SessionTelemetryTab telemetry={TELEMETRY} />);
    fireEvent.click(screen.getByRole("button", { name: /^throttle$/i }));
    expect(screen.getByRole("button", { name: /^throttle$/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: /^speed$/i })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("renders an SVG chart with one path by default (single-lap mode)", () => {
    render(<SessionTelemetryTab telemetry={TELEMETRY} />);
    const chart = screen.getByRole("img", { name: /telemetry chart/i });
    const paths = chart.querySelectorAll("path[data-role='lap-line']");
    expect(paths).toHaveLength(1);
  });

  it("overlays all laps as separate paths when 'Overlay all laps' is enabled", () => {
    render(<SessionTelemetryTab telemetry={TELEMETRY} />);
    fireEvent.click(screen.getByRole("button", { name: /overlay all laps/i }));
    const chart = screen.getByRole("img", { name: /telemetry chart/i });
    const paths = chart.querySelectorAll("path[data-role='lap-line']");
    expect(paths).toHaveLength(2);
  });

  it("displays the channel unit alongside the label", () => {
    render(<SessionTelemetryTab telemetry={TELEMETRY} />);
    expect(screen.getByText(/speed.*mph/i)).toBeInTheDocument();
  });

  it("renders an empty state when no channels are provided", () => {
    render(<SessionTelemetryTab telemetry={{ channels: [] }} />);
    expect(screen.getByText(/no telemetry/i)).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: /telemetry chart/i })).toBeNull();
  });

  it("renders an empty-chart message when the active channel has no samples", () => {
    const empty: SessionTelemetryView = {
      channels: [
        {
          key: "speed",
          label: "Speed",
          unit: "mph",
          laps: [{ lapNumber: 1, samples: [] }],
        },
      ],
    };
    render(<SessionTelemetryTab telemetry={empty} />);
    expect(screen.getByText(/no samples/i)).toBeInTheDocument();
  });

  it("shows the chart's value range in the legend", () => {
    render(<SessionTelemetryTab telemetry={TELEMETRY} />);
    const legend = screen.getByRole("region", { name: /chart legend/i });
    // Default channel = Speed, range 0..120 across lap 1.
    expect(within(legend).getByText("0")).toBeInTheDocument();
    expect(within(legend).getByText("120")).toBeInTheDocument();
  });
});
