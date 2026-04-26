import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { assertNoAxeViolations } from "@/lib/axe";
import { SessionActionsBar } from "./SessionActionsBar";

describe("SessionActionsBar a11y (T082)", () => {
  it("renders without axe violations in the read-only render", async () => {
    const { container } = render(<SessionActionsBar />);
    await assertNoAxeViolations(container);
  });

  it("renders without axe violations when callbacks are wired", async () => {
    const { container } = render(
      <SessionActionsBar onDelete={() => {}} onReprocess={() => {}} onShare={() => {}} />,
    );
    await assertNoAxeViolations(container);
  });

  it("renders without axe violations when an action is pending", async () => {
    const { container } = render(
      <SessionActionsBar
        onDelete={() => {}}
        onReprocess={() => {}}
        onShare={() => {}}
        pendingAction="delete"
      />,
    );
    await assertNoAxeViolations(container);
  });

  it("gives every action button an explicit aria-label so AT users hear 'X session'", () => {
    const { container } = render(
      <SessionActionsBar onDelete={() => {}} onReprocess={() => {}} onShare={() => {}} />,
    );
    const buttons = container.querySelectorAll<HTMLButtonElement>("[role='toolbar'] button");
    expect(buttons.length).toBe(3);
    for (const btn of Array.from(buttons)) {
      const label = btn.getAttribute("aria-label");
      expect(label).toBeTruthy();
      // Each label should mention "session" so users know the scope of the action.
      expect(label?.toLowerCase()).toMatch(/session/);
    }
  });
});
