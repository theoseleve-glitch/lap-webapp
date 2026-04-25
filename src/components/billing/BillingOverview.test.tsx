import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BillingOverview, type BillingPlan, type BillingTrialStatus } from "./BillingOverview";

const PRO_PLAN: BillingPlan = { name: "Pro", priceLabel: "$12 / month" };
const FREE_PLAN: BillingPlan = { name: "Free" };

describe("BillingOverview", () => {
  it("exposes a region named 'Billing overview'", () => {
    render(
      <BillingOverview
        plan={PRO_PLAN}
        trial={{ status: "inactive" }}
        onOpenBillingPortal={() => {}}
      />,
    );
    expect(screen.getByRole("region", { name: /billing overview/i })).toBeInTheDocument();
  });

  it("renders a 'Current plan' section with the plan name", () => {
    render(
      <BillingOverview
        plan={PRO_PLAN}
        trial={{ status: "inactive" }}
        onOpenBillingPortal={() => {}}
      />,
    );
    const section = screen.getByRole("region", { name: /current plan/i });
    expect(within(section).getByText("Pro")).toBeInTheDocument();
  });

  it("renders the price label when provided", () => {
    render(
      <BillingOverview
        plan={PRO_PLAN}
        trial={{ status: "inactive" }}
        onOpenBillingPortal={() => {}}
      />,
    );
    expect(screen.getByText("$12 / month")).toBeInTheDocument();
  });

  it("omits the price label when not provided", () => {
    render(
      <BillingOverview
        plan={FREE_PLAN}
        trial={{ status: "inactive" }}
        onOpenBillingPortal={() => {}}
      />,
    );
    expect(screen.queryByText(/\$/)).toBeNull();
  });

  it("renders an active trial status with days remaining", () => {
    render(
      <BillingOverview
        plan={FREE_PLAN}
        trial={{ status: "active", daysRemaining: 7, expiresOn: "Apr 30, 2026" }}
        onOpenBillingPortal={() => {}}
      />,
    );
    const section = screen.getByRole("region", { name: /trial status/i });
    expect(within(section).getByText(/7 days remaining/i)).toBeInTheDocument();
    expect(within(section).getByText(/apr 30, 2026/i)).toBeInTheDocument();
  });

  it("renders 'Trial expired' state when trial.status is 'expired'", () => {
    render(
      <BillingOverview
        plan={FREE_PLAN}
        trial={{ status: "expired", expiredOn: "Apr 1, 2026" }}
        onOpenBillingPortal={() => {}}
      />,
    );
    const section = screen.getByRole("region", { name: /trial status/i });
    expect(within(section).getByText(/^trial expired$/i)).toBeInTheDocument();
    expect(within(section).getByText(/apr 1, 2026/i)).toBeInTheDocument();
  });

  it("renders 'No active trial' state when trial.status is 'inactive'", () => {
    render(
      <BillingOverview
        plan={PRO_PLAN}
        trial={{ status: "inactive" }}
        onOpenBillingPortal={() => {}}
      />,
    );
    const section = screen.getByRole("region", { name: /trial status/i });
    expect(within(section).getByText(/no active trial/i)).toBeInTheDocument();
  });

  it("renders a billing portal button", () => {
    render(
      <BillingOverview
        plan={PRO_PLAN}
        trial={{ status: "inactive" }}
        onOpenBillingPortal={() => {}}
      />,
    );
    expect(screen.getByRole("button", { name: /billing portal/i })).toBeInTheDocument();
  });

  it("fires onOpenBillingPortal when the portal button is clicked", () => {
    const onOpenBillingPortal = vi.fn();
    render(
      <BillingOverview
        plan={PRO_PLAN}
        trial={{ status: "inactive" }}
        onOpenBillingPortal={onOpenBillingPortal}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /billing portal/i }));
    expect(onOpenBillingPortal).toHaveBeenCalledTimes(1);
  });

  it("disables the billing portal button while pending", () => {
    render(
      <BillingOverview
        plan={PRO_PLAN}
        trial={{ status: "inactive" }}
        onOpenBillingPortal={() => {}}
        pending
      />,
    );
    expect(screen.getByRole("button", { name: /billing portal/i })).toBeDisabled();
  });

  it("uses warning tone when trial is in last 48h (expiresSoon variant)", () => {
    render(
      <BillingOverview
        plan={FREE_PLAN}
        trial={{ status: "active", daysRemaining: 1, expiresOn: "Apr 26, 2026" }}
        onOpenBillingPortal={() => {}}
      />,
    );
    const section = screen.getByRole("region", { name: /trial status/i });
    expect(section.getAttribute("data-trial-tone")).toBe("warning");
  });

  it("uses neutral tone when trial has more than 48h remaining", () => {
    render(
      <BillingOverview
        plan={FREE_PLAN}
        trial={{ status: "active", daysRemaining: 7, expiresOn: "Apr 30, 2026" }}
        onOpenBillingPortal={() => {}}
      />,
    );
    const section = screen.getByRole("region", { name: /trial status/i });
    expect(section.getAttribute("data-trial-tone")).toBe("neutral");
  });

  it("uses danger tone when trial is expired", () => {
    render(
      <BillingOverview
        plan={FREE_PLAN}
        trial={{ status: "expired", expiredOn: "Apr 1, 2026" }}
        onOpenBillingPortal={() => {}}
      />,
    );
    const section = screen.getByRole("region", { name: /trial status/i });
    expect(section.getAttribute("data-trial-tone")).toBe("danger");
  });
});

describe("BillingOverview type exports", () => {
  it("exports BillingPlan and BillingTrialStatus types (covers the shape)", () => {
    const plan: BillingPlan = { name: "Pro" };
    const trial: BillingTrialStatus = { status: "inactive" };
    expect(plan.name).toBe("Pro");
    expect(trial.status).toBe("inactive");
  });
});
