"use client";

import type { ReactNode } from "react";
import { useOnboarding } from "./OnboardingProvider";

export interface OnboardingGateProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function OnboardingGate({ children, fallback = null }: OnboardingGateProps) {
  const { completed } = useOnboarding();
  return <>{completed ? fallback : children}</>;
}
