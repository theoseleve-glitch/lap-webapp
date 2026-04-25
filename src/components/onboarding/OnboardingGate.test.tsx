import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { OnboardingGate } from "./OnboardingGate";
import { OnboardingProvider, useOnboarding } from "./OnboardingProvider";

function CompleteButton() {
  const { complete } = useOnboarding();
  return (
    <button type="button" onClick={complete}>
      mark-complete
    </button>
  );
}

const STORAGE_KEY = "lap.onboarding.gate-test";

describe("OnboardingGate", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("renders its children when onboarding is not completed", () => {
    render(
      <OnboardingProvider storageKey={STORAGE_KEY}>
        <OnboardingGate>
          <span>flow-ui</span>
        </OnboardingGate>
      </OnboardingProvider>,
    );
    expect(screen.getByText("flow-ui")).toBeInTheDocument();
  });

  it("renders nothing inside the gate when onboarding is completed (default fallback)", () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ currentStep: 4, completed: true }));
    render(
      <OnboardingProvider storageKey={STORAGE_KEY}>
        <OnboardingGate>
          <span>flow-ui</span>
        </OnboardingGate>
      </OnboardingProvider>,
    );
    expect(screen.queryByText("flow-ui")).toBeNull();
  });

  it("renders fallback content when onboarding is completed and fallback provided", () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ currentStep: 4, completed: true }));
    render(
      <OnboardingProvider storageKey={STORAGE_KEY}>
        <OnboardingGate fallback={<span>welcome-back</span>}>
          <span>flow-ui</span>
        </OnboardingGate>
      </OnboardingProvider>,
    );
    expect(screen.queryByText("flow-ui")).toBeNull();
    expect(screen.getByText("welcome-back")).toBeInTheDocument();
  });

  it("hides children once complete() is called via context", () => {
    render(
      <OnboardingProvider storageKey={STORAGE_KEY}>
        <CompleteButton />
        <OnboardingGate>
          <span>flow-ui</span>
        </OnboardingGate>
      </OnboardingProvider>,
    );
    expect(screen.getByText("flow-ui")).toBeInTheDocument();
    fireEvent.click(screen.getByText("mark-complete"));
    expect(screen.queryByText("flow-ui")).toBeNull();
  });

  it("on remount with persisted completed=true, still hides children (proves once-per-user)", () => {
    const ui = (
      <OnboardingProvider storageKey={STORAGE_KEY}>
        <CompleteButton />
        <OnboardingGate>
          <span>flow-ui</span>
        </OnboardingGate>
      </OnboardingProvider>
    );
    const { unmount } = render(ui);
    fireEvent.click(screen.getByText("mark-complete"));
    expect(screen.queryByText("flow-ui")).toBeNull();
    unmount();

    render(ui);
    expect(screen.queryByText("flow-ui")).toBeNull();
  });
});
