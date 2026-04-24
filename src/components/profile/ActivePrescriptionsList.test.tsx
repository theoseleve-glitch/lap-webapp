import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ActivePrescriptionsList } from "./ActivePrescriptionsList";

const SEVEN = [
  { id: "p1", title: "Trail-brake release drill", detailHref: "/prescriptions/p1" },
  { id: "p2", title: "Throttle modulation — Parabolica", detailHref: "/prescriptions/p2" },
  { id: "p3", title: "Apex-consistency drill T2", detailHref: "/prescriptions/p3" },
  { id: "p4", title: "Late-apex drill T7", detailHref: "/prescriptions/p4" },
  { id: "p5", title: "Rotation drill T11", detailHref: "/prescriptions/p5" },
  { id: "p6", title: "Brake-pressure drill T5", detailHref: "/prescriptions/p6" },
  { id: "p7", title: "Sector-2 shadow drill", detailHref: "/prescriptions/p7" },
];

describe("ActivePrescriptionsList", () => {
  it("renders an 'Active prescriptions' section heading", () => {
    render(<ActivePrescriptionsList prescriptions={SEVEN.slice(0, 3)} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/active prescriptions/i);
  });

  it("renders one item per prescription", () => {
    render(<ActivePrescriptionsList prescriptions={SEVEN.slice(0, 3)} />);
    expect(within(screen.getByRole("list")).getAllByRole("listitem")).toHaveLength(3);
  });

  it("caps the rendered list at five items by default", () => {
    render(<ActivePrescriptionsList prescriptions={SEVEN} />);
    expect(within(screen.getByRole("list")).getAllByRole("listitem")).toHaveLength(5);
  });

  it("respects a custom max", () => {
    render(<ActivePrescriptionsList prescriptions={SEVEN} max={2} />);
    expect(within(screen.getByRole("list")).getAllByRole("listitem")).toHaveLength(2);
  });

  it("renders the title for each displayed prescription", () => {
    render(<ActivePrescriptionsList prescriptions={SEVEN.slice(0, 2)} />);
    expect(screen.getByText("Trail-brake release drill")).toBeInTheDocument();
    expect(screen.getByText("Throttle modulation — Parabolica")).toBeInTheDocument();
  });

  it("renders a link per item pointing at detailHref", () => {
    render(<ActivePrescriptionsList prescriptions={SEVEN.slice(0, 2)} />);
    expect(screen.getByRole("link", { name: /trail-brake release drill/i })).toHaveAttribute(
      "href",
      "/prescriptions/p1",
    );
    expect(screen.getByRole("link", { name: /throttle modulation/i })).toHaveAttribute(
      "href",
      "/prescriptions/p2",
    );
  });

  it("renders an empty state when no prescriptions are supplied", () => {
    render(<ActivePrescriptionsList prescriptions={[]} />);
    expect(screen.getByText(/no active prescriptions/i)).toBeInTheDocument();
  });

  it("does not render a list element in the empty state", () => {
    render(<ActivePrescriptionsList prescriptions={[]} />);
    expect(screen.queryByRole("list")).toBeNull();
  });
});
