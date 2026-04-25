"use client";

import * as Sentry from "@sentry/browser";
import posthog from "posthog-js";
import { useEffect, type ReactNode } from "react";
import { initObservability } from "@/lib/observability";

export interface ObservabilityProviderProps {
  children: ReactNode;
}

export function ObservabilityProvider({ children }: ObservabilityProviderProps) {
  useEffect(() => {
    initObservability(
      {
        sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
        posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY,
        posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      },
      {
        sentry: { init: (options) => Sentry.init(options) },
        posthog: { init: (key, options) => posthog.init(key, options) },
      },
    );
  }, []);

  return <>{children}</>;
}
