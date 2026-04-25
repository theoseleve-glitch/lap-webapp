import { act, fireEvent, render, screen, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  OnboardingProvider,
  TOTAL_ONBOARDING_STEPS,
  useOnboarding,
  type OnboardingProviderProps,
} from "./OnboardingProvider";

const STORAGE_KEY = "lap.onboarding";

function Consumer() {
  const o = useOnboarding();
  return (
    <div>
      <span data-testid="step">{o.currentStep}</span>
      <span data-testid="completed">{String(o.completed)}</span>
      <button onClick={o.next}>next</button>
      <button onClick={o.back}>back</button>
      <button onClick={o.complete}>complete</button>
      <button onClick={o.reset}>reset</button>
      <button onClick={() => o.goToStep(3)}>go-to-3</button>
      <button onClick={() => o.goToStep(0)}>go-to-0</button>
      <button onClick={() => o.goToStep(99)}>go-to-99</button>
    </div>
  );
}

function renderWithProvider(props?: Partial<OnboardingProviderProps>) {
  return render(
    <OnboardingProvider {...props}>
      <Consumer />
    </OnboardingProvider>,
  );
}

describe("OnboardingProvider", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("exposes a TOTAL_ONBOARDING_STEPS constant of 4", () => {
    expect(TOTAL_ONBOARDING_STEPS).toBe(4);
  });

  it("renders children", () => {
    render(
      <OnboardingProvider>
        <p>child</p>
      </OnboardingProvider>,
    );
    expect(screen.getByText("child")).toBeInTheDocument();
  });

  it("starts at step 1 with completed=false by default", () => {
    renderWithProvider();
    expect(screen.getByTestId("step")).toHaveTextContent("1");
    expect(screen.getByTestId("completed")).toHaveTextContent("false");
  });

  it("advances by one when next() is called", () => {
    renderWithProvider();
    fireEvent.click(screen.getByText("next"));
    expect(screen.getByTestId("step")).toHaveTextContent("2");
  });

  it("marks completed=true when next() runs at the last step", () => {
    renderWithProvider();
    fireEvent.click(screen.getByText("next"));
    fireEvent.click(screen.getByText("next"));
    fireEvent.click(screen.getByText("next"));
    expect(screen.getByTestId("step")).toHaveTextContent("4");
    expect(screen.getByTestId("completed")).toHaveTextContent("false");
    fireEvent.click(screen.getByText("next"));
    expect(screen.getByTestId("step")).toHaveTextContent("4");
    expect(screen.getByTestId("completed")).toHaveTextContent("true");
  });

  it("goes back by one when back() is called", () => {
    renderWithProvider();
    fireEvent.click(screen.getByText("next"));
    fireEvent.click(screen.getByText("next"));
    fireEvent.click(screen.getByText("back"));
    expect(screen.getByTestId("step")).toHaveTextContent("2");
  });

  it("clamps back() at step 1", () => {
    renderWithProvider();
    fireEvent.click(screen.getByText("back"));
    expect(screen.getByTestId("step")).toHaveTextContent("1");
  });

  it("jumps to a step via goToStep when in range", () => {
    renderWithProvider();
    fireEvent.click(screen.getByText("go-to-3"));
    expect(screen.getByTestId("step")).toHaveTextContent("3");
  });

  it("rejects goToStep with a step below 1", () => {
    renderWithProvider();
    fireEvent.click(screen.getByText("go-to-0"));
    expect(screen.getByTestId("step")).toHaveTextContent("1");
  });

  it("rejects goToStep with a step above TOTAL_ONBOARDING_STEPS", () => {
    renderWithProvider();
    fireEvent.click(screen.getByText("go-to-99"));
    expect(screen.getByTestId("step")).toHaveTextContent("1");
  });

  it("complete() marks completed=true regardless of step", () => {
    renderWithProvider();
    fireEvent.click(screen.getByText("complete"));
    expect(screen.getByTestId("completed")).toHaveTextContent("true");
  });

  it("reset() restores currentStep=1 and completed=false", () => {
    renderWithProvider();
    fireEvent.click(screen.getByText("go-to-3"));
    fireEvent.click(screen.getByText("complete"));
    fireEvent.click(screen.getByText("reset"));
    expect(screen.getByTestId("step")).toHaveTextContent("1");
    expect(screen.getByTestId("completed")).toHaveTextContent("false");
  });

  it("persists state changes to localStorage", () => {
    renderWithProvider();
    fireEvent.click(screen.getByText("next"));
    const persisted = window.localStorage.getItem(STORAGE_KEY);
    expect(persisted).not.toBeNull();
    const parsed = JSON.parse(persisted!);
    expect(parsed.currentStep).toBe(2);
    expect(parsed.completed).toBe(false);
  });

  it("loads state from localStorage on mount", () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ currentStep: 3, completed: false }));
    renderWithProvider();
    expect(screen.getByTestId("step")).toHaveTextContent("3");
  });

  it("ignores corrupt localStorage payloads", () => {
    window.localStorage.setItem(STORAGE_KEY, "{not-json");
    renderWithProvider();
    expect(screen.getByTestId("step")).toHaveTextContent("1");
    expect(screen.getByTestId("completed")).toHaveTextContent("false");
  });

  it("ignores localStorage payloads with out-of-range step values", () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ currentStep: 99, completed: false }));
    renderWithProvider();
    expect(screen.getByTestId("step")).toHaveTextContent("1");
  });

  it("useOnboarding throws when used outside the provider", () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useOnboarding())).toThrow(/OnboardingProvider/);
    consoleErrorSpy.mockRestore();
  });

  it("supports a different storageKey override (test isolation)", () => {
    window.localStorage.setItem(
      "lap.onboarding-alt",
      JSON.stringify({ currentStep: 2, completed: false }),
    );
    renderWithProvider({ storageKey: "lap.onboarding-alt" });
    expect(screen.getByTestId("step")).toHaveTextContent("2");
  });

  it("complete() then next() does not regress completed back to false", () => {
    renderWithProvider();
    fireEvent.click(screen.getByText("complete"));
    act(() => {
      // No-op state read to make sure render flushed
    });
    fireEvent.click(screen.getByText("next"));
    expect(screen.getByTestId("completed")).toHaveTextContent("true");
  });
});
