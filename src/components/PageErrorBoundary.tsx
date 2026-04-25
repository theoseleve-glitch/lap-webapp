"use client";

import * as Sentry from "@sentry/browser";
import { Component, type ErrorInfo, type ReactNode } from "react";

export interface PageErrorBoundaryProps {
  children: ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
  fallback?: ReactNode;
}

interface PageErrorBoundaryState {
  hasError: boolean;
}

export class PageErrorBoundary extends Component<PageErrorBoundaryProps, PageErrorBoundaryState> {
  state: PageErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): PageErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (this.props.onError) {
      this.props.onError(error, info);
      return;
    }
    Sentry.captureException(error, {
      extra: { componentStack: info.componentStack ?? undefined },
    });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback ?? <DefaultFallback />;
    }
    return this.props.children;
  }
}

function DefaultFallback() {
  return (
    <section
      role="alert"
      aria-label="Page error"
      className="flex flex-col items-start gap-4 rounded border border-safety-red/40 bg-concrete p-6"
    >
      <h1 className="font-monument text-chalk text-2xl leading-[var(--lh-heading)] tracking-[var(--ls-display)]">
        Something went wrong
      </h1>
      <p className="font-body text-chalk text-sm leading-[var(--lh-body)]">
        We&apos;ve been notified and are looking into it. Try reloading the page or come back in a
        moment.
      </p>
      <button
        type="button"
        onClick={() => {
          if (typeof window !== "undefined") {
            window.location.reload();
          }
        }}
        className="rounded border border-pit-orange/70 text-pit-orange px-4 py-2 font-telemetry text-[11px] uppercase tracking-[0.12em] hover:bg-pit-orange/10"
      >
        Reload page
      </button>
    </section>
  );
}
