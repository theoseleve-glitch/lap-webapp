import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LinkedPrescriptionsList, type LinkedPrescriptionItem } from "./LinkedPrescriptionsList";

const SIX: readonly LinkedPrescriptionItem[] = [
  {
    id: "p1",
    title: "Trail-brake release drill",
    detailHref: "/prescriptions/p1",
    outcome: "met",
  },
  {
    id: "p2",
    title: "Throttle modulation — Parabolica",
    detailHref: "/prescriptions/p2",
    outcome: "unmet",
  },
  {
    id: "p3",
    title: "Apex precision focus block",
    detailHref: "/prescriptions/p3",
    outcome: "pending",
  },
  {
    id: "p4",
    title: "Consistency drill week",
    detailHref: "/prescriptions/p4",
  },
  {
    id: "p5",
    title: "Brake bias step study",
    detailHref: "/prescriptions/p5",
    outcome: "skipped",
  },
  {
    id: "p6",
    title: "Race craft scenario set",
    detailHref: "/prescriptions/p6",
    outcome: "pending",
  },
];

describe("LinkedPrescriptionsList", () => {
  it("renders a 'Linked prescriptions' heading", () => {
    render(<LinkedPrescriptionsList prescriptions={SIX.slice(0, 3)} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/linked prescriptions/i);
  });

  it("renders one item per prescription", () => {
    render(<LinkedPrescriptionsList prescriptions={SIX.slice(0, 3)} />);
    const list = screen.getByRole("list");
    expect(within(list).getAllByRole("listitem")).toHaveLength(3);
  });

  it("renders the title of each prescription", () => {
    render(<LinkedPrescriptionsList prescriptions={SIX.slice(0, 3)} />);
    expect(screen.getByText("Trail-brake release drill")).toBeInTheDocument();
    expect(screen.getByText("Throttle modulation — Parabolica")).toBeInTheDocument();
    expect(screen.getByText("Apex precision focus block")).toBeInTheDocument();
  });

  it("renders an OutcomeBadge for prescriptions that have an outcome", () => {
    render(<LinkedPrescriptionsList prescriptions={SIX.slice(0, 1)} />);
    const badge = screen.getByRole("status");
    expect(badge).toHaveAttribute("data-status", "met");
  });

  it("does not render an OutcomeBadge for prescriptions without an outcome", () => {
    render(<LinkedPrescriptionsList prescriptions={[SIX[3]!]} />);
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("links each item to its detailHref when provided", () => {
    render(<LinkedPrescriptionsList prescriptions={SIX.slice(0, 1)} />);
    expect(screen.getByRole("link", { name: /trail-brake release drill/i })).toHaveAttribute(
      "href",
      "/prescriptions/p1",
    );
  });

  it("keeps entries as plain rows when detailHref is absent", () => {
    render(
      <LinkedPrescriptionsList
        prescriptions={[{ id: "p1", title: "Custom drill", outcome: "pending" }]}
      />,
    );
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("caps displayed items to 5 by default", () => {
    render(<LinkedPrescriptionsList prescriptions={SIX} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(5);
  });

  it("respects a custom max", () => {
    render(<LinkedPrescriptionsList prescriptions={SIX} max={2} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("renders an empty-state message when no prescriptions are supplied", () => {
    render(<LinkedPrescriptionsList prescriptions={[]} />);
    expect(screen.getByText(/no prescriptions linked/i)).toBeInTheDocument();
  });

  it("does not render a list element in the empty state", () => {
    render(<LinkedPrescriptionsList prescriptions={[]} />);
    expect(screen.queryByRole("list")).toBeNull();
  });
});
