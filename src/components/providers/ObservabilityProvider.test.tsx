import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const sentryInit = vi.fn();
const posthogInit = vi.fn();

vi.mock("@sentry/browser", () => ({
  init: (...args: unknown[]) => sentryInit(...args),
}));

vi.mock("posthog-js", () => ({
  default: {
    init: (...args: unknown[]) => posthogInit(...args),
  },
}));

import { ObservabilityProvider } from "./ObservabilityProvider";

describe("ObservabilityProvider", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    sentryInit.mockReset();
    posthogInit.mockReset();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("renders children unchanged", () => {
    render(
      <ObservabilityProvider>
        <span>app-content</span>
      </ObservabilityProvider>,
    );
    expect(screen.getByText("app-content")).toBeInTheDocument();
  });

  it("calls Sentry.init on mount when NEXT_PUBLIC_SENTRY_DSN is set", () => {
    process.env.NEXT_PUBLIC_SENTRY_DSN = "https://abc@sentry.io/1";
    render(
      <ObservabilityProvider>
        <span />
      </ObservabilityProvider>,
    );
    expect(sentryInit).toHaveBeenCalledWith({ dsn: "https://abc@sentry.io/1" });
  });

  it("calls posthog.init on mount when NEXT_PUBLIC_POSTHOG_KEY is set", () => {
    process.env.NEXT_PUBLIC_POSTHOG_KEY = "phc_xxx";
    render(
      <ObservabilityProvider>
        <span />
      </ObservabilityProvider>,
    );
    expect(posthogInit).toHaveBeenCalledWith("phc_xxx", {
      api_host: "https://us.i.posthog.com",
    });
  });

  it("does not call any SDK when env vars are missing", () => {
    delete process.env.NEXT_PUBLIC_SENTRY_DSN;
    delete process.env.NEXT_PUBLIC_POSTHOG_KEY;
    render(
      <ObservabilityProvider>
        <span />
      </ObservabilityProvider>,
    );
    expect(sentryInit).not.toHaveBeenCalled();
    expect(posthogInit).not.toHaveBeenCalled();
  });
});
