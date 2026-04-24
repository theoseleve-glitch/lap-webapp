import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { OpenWeaknessesList } from "./OpenWeaknessesList";

const SEVEN = [
  {
    id: "w1",
    title: "Late trail-brake T5",
    severity: "high" as const,
    detailHref: "/weaknesses/w1",
  },
  {
    id: "w2",
    title: "Early throttle T11",
    severity: "critical" as const,
    detailHref: "/weaknesses/w2",
  },
  { id: "w3", title: "Apex drift T2", severity: "medium" as const, detailHref: "/weaknesses/w3" },
  {
    id: "w4",
    title: "Braking point T7",
    severity: "medium" as const,
    detailHref: "/weaknesses/w4",
  },
  { id: "w5", title: "Line choice T3", severity: "low" as const, detailHref: "/weaknesses/w5" },
  { id: "w6", title: "Shift timing T14", severity: "low" as const, detailHref: "/weaknesses/w6" },
  { id: "w7", title: "Corner entry T8", severity: "medium" as const, detailHref: "/weaknesses/w7" },
];

describe("OpenWeaknessesList", () => {
  it("renders an 'Open weaknesses' section heading", () => {
    render(<OpenWeaknessesList weaknesses={SEVEN.slice(0, 3)} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/open weaknesses/i);
  });

  it("renders one item per weakness", () => {
    render(<OpenWeaknessesList weaknesses={SEVEN.slice(0, 3)} />);
    const list = screen.getByRole("list");
    expect(within(list).getAllByRole("listitem")).toHaveLength(3);
  });

  it("caps the rendered list at five items by default", () => {
    render(<OpenWeaknessesList weaknesses={SEVEN} />);
    const list = screen.getByRole("list");
    expect(within(list).getAllByRole("listitem")).toHaveLength(5);
  });

  it("respects a custom max", () => {
    render(<OpenWeaknessesList weaknesses={SEVEN} max={3} />);
    const list = screen.getByRole("list");
    expect(within(list).getAllByRole("listitem")).toHaveLength(3);
  });

  it("renders the title for each displayed weakness", () => {
    render(<OpenWeaknessesList weaknesses={SEVEN.slice(0, 3)} />);
    expect(screen.getByText("Late trail-brake T5")).toBeInTheDocument();
    expect(screen.getByText("Early throttle T11")).toBeInTheDocument();
    expect(screen.getByText("Apex drift T2")).toBeInTheDocument();
  });

  it("renders a link per item pointing at detailHref", () => {
    render(<OpenWeaknessesList weaknesses={SEVEN.slice(0, 2)} />);
    expect(screen.getByRole("link", { name: /late trail-brake t5/i })).toHaveAttribute(
      "href",
      "/weaknesses/w1",
    );
    expect(screen.getByRole("link", { name: /early throttle t11/i })).toHaveAttribute(
      "href",
      "/weaknesses/w2",
    );
  });

  it("renders a severity chip for each item", () => {
    render(<OpenWeaknessesList weaknesses={SEVEN.slice(0, 2)} />);
    expect(screen.getByText(/high/i)).toBeInTheDocument();
    expect(screen.getByText(/critical/i)).toBeInTheDocument();
  });

  it("renders an empty state when no weaknesses are supplied", () => {
    render(<OpenWeaknessesList weaknesses={[]} />);
    expect(screen.getByText(/no open weaknesses/i)).toBeInTheDocument();
  });

  it("does not render a list element in the empty state", () => {
    render(<OpenWeaknessesList weaknesses={[]} />);
    expect(screen.queryByRole("list")).toBeNull();
  });
});
