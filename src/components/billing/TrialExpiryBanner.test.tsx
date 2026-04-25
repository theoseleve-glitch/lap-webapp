import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TrialExpiryBanner } from "./TrialExpiryBanner";

describe("TrialExpiryBanner", () => {
  it("renders nothing when trial is inactive", () => {
    const { container } = render(
      <TrialExpiryBanner trial={{ status: "inactive" }} upgradeHref="/billing" />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing when trial is expired (hard gate handles this)", () => {
    const { container } = render(
      <TrialExpiryBanner
        trial={{ status: "expired", expiredOn: "Apr 1, 2026" }}
        upgradeHref="/billing"
      />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing when trial has more than 48h remaining", () => {
    const { container } = render(
      <TrialExpiryBanner
        trial={{ status: "active", daysRemaining: 7, expiresOn: "Apr 30, 2026" }}
        upgradeHref="/billing"
      />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders a status banner when trial is in the 48h soft-block window", () => {
    render(
      <TrialExpiryBanner
        trial={{ status: "active", daysRemaining: 2, expiresOn: "Apr 27, 2026" }}
        upgradeHref="/billing"
      />,
    );
    expect(screen.getByRole("status", { name: /trial expiry/i })).toBeInTheDocument();
  });

  it("renders 'expires in 2 days' copy when daysRemaining is 2", () => {
    render(
      <TrialExpiryBanner
        trial={{ status: "active", daysRemaining: 2, expiresOn: "Apr 27, 2026" }}
        upgradeHref="/billing"
      />,
    );
    expect(screen.getByText(/expires in 2 days/i)).toBeInTheDocument();
  });

  it("renders 'expires tomorrow' copy when daysRemaining is 1", () => {
    render(
      <TrialExpiryBanner
        trial={{ status: "active", daysRemaining: 1, expiresOn: "Apr 26, 2026" }}
        upgradeHref="/billing"
      />,
    );
    expect(screen.getByText(/expires tomorrow/i)).toBeInTheDocument();
  });

  it("renders 'expires today' copy when daysRemaining is 0", () => {
    render(
      <TrialExpiryBanner
        trial={{ status: "active", daysRemaining: 0, expiresOn: "Apr 25, 2026" }}
        upgradeHref="/billing"
      />,
    );
    expect(screen.getByText(/expires today/i)).toBeInTheDocument();
  });

  it("renders an upgrade link pointing at upgradeHref", () => {
    render(
      <TrialExpiryBanner
        trial={{ status: "active", daysRemaining: 1, expiresOn: "Apr 26, 2026" }}
        upgradeHref="/billing"
      />,
    );
    expect(screen.getByRole("link", { name: /upgrade/i })).toHaveAttribute("href", "/billing");
  });

  it("uses pit-orange tone via data-banner-tone='warning'", () => {
    render(
      <TrialExpiryBanner
        trial={{ status: "active", daysRemaining: 1, expiresOn: "Apr 26, 2026" }}
        upgradeHref="/billing"
      />,
    );
    expect(screen.getByRole("status", { name: /trial expiry/i })).toHaveAttribute(
      "data-banner-tone",
      "warning",
    );
  });
});
