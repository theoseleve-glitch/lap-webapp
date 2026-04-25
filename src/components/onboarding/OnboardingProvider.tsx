"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const TOTAL_ONBOARDING_STEPS = 4;
const DEFAULT_STORAGE_KEY = "lap.onboarding";

export interface OnboardingState {
  currentStep: number;
  completed: boolean;
}

export interface OnboardingActions {
  next: () => void;
  back: () => void;
  goToStep: (step: number) => void;
  complete: () => void;
  reset: () => void;
}

export type OnboardingContextValue = OnboardingState & OnboardingActions;

export interface OnboardingProviderProps {
  children: ReactNode;
  storageKey?: string;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

const DEFAULT_STATE: OnboardingState = { currentStep: 1, completed: false };

function isValidStep(step: unknown): step is number {
  return (
    typeof step === "number" &&
    Number.isInteger(step) &&
    step >= 1 &&
    step <= TOTAL_ONBOARDING_STEPS
  );
}

function parseStored(raw: string | null): OnboardingState | null {
  if (raw === null) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed !== "object" || parsed === null) return null;
    const candidate = parsed as Partial<OnboardingState>;
    if (!isValidStep(candidate.currentStep)) return null;
    if (typeof candidate.completed !== "boolean") return null;
    return { currentStep: candidate.currentStep, completed: candidate.completed };
  } catch {
    return null;
  }
}

export function OnboardingProvider({
  children,
  storageKey = DEFAULT_STORAGE_KEY,
}: OnboardingProviderProps) {
  const [state, setState] = useState<OnboardingState>(() => {
    if (typeof window === "undefined") return DEFAULT_STATE;
    return parseStored(window.localStorage.getItem(storageKey)) ?? DEFAULT_STATE;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state, storageKey]);

  const next = useCallback(() => {
    setState((s) => {
      if (s.currentStep >= TOTAL_ONBOARDING_STEPS) {
        return { ...s, completed: true };
      }
      return { ...s, currentStep: s.currentStep + 1 };
    });
  }, []);

  const back = useCallback(() => {
    setState((s) => ({ ...s, currentStep: Math.max(1, s.currentStep - 1) }));
  }, []);

  const goToStep = useCallback((step: number) => {
    if (!isValidStep(step)) return;
    setState((s) => ({ ...s, currentStep: step }));
  }, []);

  const complete = useCallback(() => {
    setState((s) => ({ ...s, completed: true }));
  }, []);

  const reset = useCallback(() => {
    setState(DEFAULT_STATE);
  }, []);

  const value = useMemo<OnboardingContextValue>(
    () => ({ ...state, next, back, goToStep, complete, reset }),
    [state, next, back, goToStep, complete, reset],
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding(): OnboardingContextValue {
  const ctx = useContext(OnboardingContext);
  if (ctx === null) {
    throw new Error("useOnboarding must be used inside an OnboardingProvider");
  }
  return ctx;
}
