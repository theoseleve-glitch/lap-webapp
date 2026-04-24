import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ReadinessGauge } from "./ReadinessGauge";

describe("ReadinessGauge", () => {
  it("renders the score as a large number", () => {
    render(<ReadinessGauge value={75} />);
    expect(screen.getByText("75")).toBeInTheDocument();
  });

  it("renders the default 'Readiness' label", () => {
    render(<ReadinessGauge value={75} />);
    expect(screen.getByText(/readiness/i)).toBeInTheDocument();
  });

  it("renders the event label when provided", () => {
    render(<ReadinessGauge value={75} eventLabel="Imola, Mar 15" />);
    expect(screen.getByText(/imola, mar 15/i, { ignore: ".sr-only" })).toBeInTheDocument();
  });

  it("omits the event label element when not provided", () => {
    render(<ReadinessGauge value={75} />);
    expect(screen.queryByText(/imola/i)).toBeNull();
  });

  it("rounds the displayed score to the nearest integer", () => {
    render(<ReadinessGauge value={74.6} />);
    expect(screen.getByText("75")).toBeInTheDocument();
  });

  it("clamps displayed scores above 100 to 100", () => {
    render(<ReadinessGauge value={150} />);
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("clamps displayed scores below 0 to 0", () => {
    render(<ReadinessGauge value={-25} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("renders the value arc as an SVG path", () => {
    const { container } = render(<ReadinessGauge value={60} />);
    expect(container.querySelector("path[data-role='value-arc']")).not.toBeNull();
  });

  it("wraps the gauge in an anchor when targetHref is provided", () => {
    render(<ReadinessGauge value={75} eventLabel="Imola, Mar 15" targetHref="/events/imola" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/events/imola");
    expect(link).toHaveAccessibleName(/readiness/i);
  });

  it("does not render an anchor when targetHref is absent", () => {
    render(<ReadinessGauge value={75} />);
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("exposes an accessible region naming both label and score", () => {
    render(<ReadinessGauge value={75} />);
    expect(screen.getByRole("region", { name: /readiness.*75/i })).toBeInTheDocument();
  });

  it("exposes an accessible description that names the event when provided", () => {
    render(<ReadinessGauge value={68} eventLabel="Imola, Mar 15" />);
    const region = screen.getByRole("region", { name: /readiness/i });
    expect(region).toHaveAccessibleDescription(/imola, mar 15/i);
  });

  it("exposes an accessible description stating percent-ready when no event is set", () => {
    render(<ReadinessGauge value={42} />);
    const region = screen.getByRole("region", { name: /readiness/i });
    expect(region).toHaveAccessibleDescription(/42.*percent/i);
  });

  it("is wrapped in React.memo so unrelated parent re-renders skip the gauge", () => {
    const typeOf = (ReadinessGauge as unknown as { $$typeof?: symbol }).$$typeof;
    expect(typeOf).toBe(Symbol.for("react.memo"));
  });
});
