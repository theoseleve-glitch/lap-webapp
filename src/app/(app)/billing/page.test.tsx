import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BillingPage from "./page";

describe("BillingPage", () => {
  it("renders a level-1 heading titled 'Billing'", () => {
    render(<BillingPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Billing");
  });

  it("renders a subtitle describing the billing surface", () => {
    render(<BillingPage />);
    expect(screen.getByText(/manage your plan/i)).toBeInTheDocument();
  });

  it("renders the BillingOverview region", () => {
    render(<BillingPage />);
    expect(screen.getByRole("region", { name: /billing overview/i })).toBeInTheDocument();
  });

  it("renders a current plan section", () => {
    render(<BillingPage />);
    expect(screen.getByRole("region", { name: /current plan/i })).toBeInTheDocument();
  });

  it("renders a trial status section", () => {
    render(<BillingPage />);
    expect(screen.getByRole("region", { name: /trial status/i })).toBeInTheDocument();
  });

  it("renders a billing portal button", () => {
    render(<BillingPage />);
    expect(screen.getByRole("button", { name: /billing portal/i })).toBeInTheDocument();
  });
});
