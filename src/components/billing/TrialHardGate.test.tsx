import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TrialHardGate } from "./TrialHardGate";

describe("TrialHardGate", () => {
  it("renders children when trial is active", () => {
    render(
      <TrialHardGate
        trial={{ status: "active", daysRemaining: 7, expiresOn: "Apr 30, 2026" }}
        checkoutHref="/billing"
      >
        <span>app-pages</span>
      </TrialHardGate>,
    );
    expect(screen.getByText("app-pages")).toBeInTheDocument();
  });

  it("renders children when trial is inactive (paid plan)", () => {
    render(
      <TrialHardGate trial={{ status: "inactive" }} checkoutHref="/billing">
        <span>app-pages</span>
      </TrialHardGate>,
    );
    expect(screen.getByText("app-pages")).toBeInTheDocument();
  });

  it("renders the gate (not children) when trial is expired", () => {
    render(
      <TrialHardGate
        trial={{ status: "expired", expiredOn: "Apr 1, 2026" }}
        checkoutHref="/billing"
      >
        <span>app-pages</span>
      </TrialHardGate>,
    );
    expect(screen.queryByText("app-pages")).toBeNull();
  });

  it("exposes a region named 'Trial expired' when blocking", () => {
    render(
      <TrialHardGate
        trial={{ status: "expired", expiredOn: "Apr 1, 2026" }}
        checkoutHref="/billing"
      >
        <span>app-pages</span>
      </TrialHardGate>,
    );
    expect(screen.getByRole("region", { name: /trial expired/i })).toBeInTheDocument();
  });

  it("renders a level-1 heading 'Trial expired' when blocking", () => {
    render(
      <TrialHardGate
        trial={{ status: "expired", expiredOn: "Apr 1, 2026" }}
        checkoutHref="/billing"
      >
        <span>app-pages</span>
      </TrialHardGate>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/trial expired/i);
  });

  it("displays the expired date", () => {
    render(
      <TrialHardGate
        trial={{ status: "expired", expiredOn: "Apr 1, 2026" }}
        checkoutHref="/billing"
      >
        <span>app-pages</span>
      </TrialHardGate>,
    );
    expect(screen.getByText(/apr 1, 2026/i)).toBeInTheDocument();
  });

  it("renders a checkout link pointing at checkoutHref", () => {
    render(
      <TrialHardGate
        trial={{ status: "expired", expiredOn: "Apr 1, 2026" }}
        checkoutHref="/billing/checkout"
      >
        <span>app-pages</span>
      </TrialHardGate>,
    );
    expect(screen.getByRole("link", { name: /upgrade|checkout|continue/i })).toHaveAttribute(
      "href",
      "/billing/checkout",
    );
  });
});
