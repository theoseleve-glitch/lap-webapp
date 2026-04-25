import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RelatedWeaknessesList, type RelatedWeaknessItem } from "./RelatedWeaknessesList";

const SIX: readonly RelatedWeaknessItem[] = [
  { id: "w1", title: "Late trail-brake T5", severity: "high", detailHref: "/weaknesses/w1" },
  {
    id: "w2",
    title: "Early throttle T11",
    severity: "critical",
    detailHref: "/weaknesses/w2",
  },
  { id: "w3", title: "Apex drift T2", severity: "medium", detailHref: "/weaknesses/w3" },
  {
    id: "w4",
    title: "Braking point T7",
    severity: "low",
    detailHref: "/weaknesses/w4",
    status: "resolved",
  },
  { id: "w5", title: "Line choice T3", severity: "low", detailHref: "/weaknesses/w5" },
  { id: "w6", title: "Shift timing T14", severity: "medium", detailHref: "/weaknesses/w6" },
];

describe("RelatedWeaknessesList", () => {
  it("renders a 'Related weaknesses' section heading", () => {
    render(<RelatedWeaknessesList weaknesses={SIX.slice(0, 3)} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/related weaknesses/i);
  });

  it("renders one item per weakness", () => {
    render(<RelatedWeaknessesList weaknesses={SIX.slice(0, 3)} />);
    const list = screen.getByRole("list");
    expect(within(list).getAllByRole("listitem")).toHaveLength(3);
  });

  it("caps the rendered list at five items by default", () => {
    render(<RelatedWeaknessesList weaknesses={SIX} />);
    const list = screen.getByRole("list");
    expect(within(list).getAllByRole("listitem")).toHaveLength(5);
  });

  it("respects a custom max", () => {
    render(<RelatedWeaknessesList weaknesses={SIX} max={2} />);
    const list = screen.getByRole("list");
    expect(within(list).getAllByRole("listitem")).toHaveLength(2);
  });

  it("renders the title for each displayed weakness", () => {
    render(<RelatedWeaknessesList weaknesses={SIX.slice(0, 3)} />);
    expect(screen.getByText("Late trail-brake T5")).toBeInTheDocument();
    expect(screen.getByText("Early throttle T11")).toBeInTheDocument();
    expect(screen.getByText("Apex drift T2")).toBeInTheDocument();
  });

  it("renders a link per item pointing at detailHref", () => {
    render(<RelatedWeaknessesList weaknesses={SIX.slice(0, 2)} />);
    expect(screen.getByRole("link", { name: /late trail-brake t5/i })).toHaveAttribute(
      "href",
      "/weaknesses/w1",
    );
  });

  it("renders a severity chip for each item", () => {
    render(<RelatedWeaknessesList weaknesses={SIX.slice(0, 2)} />);
    expect(screen.getByText(/high/i)).toBeInTheDocument();
    expect(screen.getByText(/critical/i)).toBeInTheDocument();
  });

  it("flags resolved weaknesses with a 'resolved' label", () => {
    render(<RelatedWeaknessesList weaknesses={[SIX[3]!]} />);
    expect(screen.getByText(/resolved/i)).toBeInTheDocument();
  });

  it("does not show a 'resolved' label on weaknesses with no status set", () => {
    render(<RelatedWeaknessesList weaknesses={SIX.slice(0, 1)} />);
    expect(screen.queryByText(/^resolved$/i)).toBeNull();
  });

  it("renders an empty state when no weaknesses are supplied", () => {
    render(<RelatedWeaknessesList weaknesses={[]} />);
    expect(screen.getByText(/no related weaknesses/i)).toBeInTheDocument();
  });

  it("does not render a list element in the empty state", () => {
    render(<RelatedWeaknessesList weaknesses={[]} />);
    expect(screen.queryByRole("list")).toBeNull();
  });
});
