import { describe, expect, it, vi } from "vitest";
import { initObservability } from "./observability";

describe("initObservability", () => {
  function makeSdks() {
    return {
      sentry: { init: vi.fn() },
      posthog: { init: vi.fn() },
    };
  }

  it("initializes both SDKs when both env vars are present", () => {
    const sdks = makeSdks();
    const result = initObservability(
      {
        sentryDsn: "https://abc@sentry.io/1",
        posthogKey: "phc_xxx",
        posthogHost: "https://us.i.posthog.com",
      },
      sdks,
    );
    expect(sdks.sentry.init).toHaveBeenCalledTimes(1);
    expect(sdks.sentry.init).toHaveBeenCalledWith({ dsn: "https://abc@sentry.io/1" });
    expect(sdks.posthog.init).toHaveBeenCalledTimes(1);
    expect(sdks.posthog.init).toHaveBeenCalledWith("phc_xxx", {
      api_host: "https://us.i.posthog.com",
    });
    expect(result).toEqual({ sentryInitialized: true, posthogInitialized: true });
  });

  it("uses the default posthog host when none is configured", () => {
    const sdks = makeSdks();
    initObservability(
      { sentryDsn: undefined, posthogKey: "phc_xxx", posthogHost: undefined },
      sdks,
    );
    expect(sdks.posthog.init).toHaveBeenCalledWith("phc_xxx", {
      api_host: "https://us.i.posthog.com",
    });
  });

  it("skips Sentry init when DSN is missing", () => {
    const sdks = makeSdks();
    const result = initObservability(
      { sentryDsn: undefined, posthogKey: "phc_xxx", posthogHost: undefined },
      sdks,
    );
    expect(sdks.sentry.init).not.toHaveBeenCalled();
    expect(result.sentryInitialized).toBe(false);
    expect(result.posthogInitialized).toBe(true);
  });

  it("skips PostHog init when key is missing", () => {
    const sdks = makeSdks();
    const result = initObservability(
      { sentryDsn: "https://abc@sentry.io/1", posthogKey: undefined, posthogHost: undefined },
      sdks,
    );
    expect(sdks.posthog.init).not.toHaveBeenCalled();
    expect(result.sentryInitialized).toBe(true);
    expect(result.posthogInitialized).toBe(false);
  });

  it("is a no-op when neither env var is present", () => {
    const sdks = makeSdks();
    const result = initObservability(
      { sentryDsn: undefined, posthogKey: undefined, posthogHost: undefined },
      sdks,
    );
    expect(sdks.sentry.init).not.toHaveBeenCalled();
    expect(sdks.posthog.init).not.toHaveBeenCalled();
    expect(result).toEqual({ sentryInitialized: false, posthogInitialized: false });
  });

  it("treats empty-string DSN as missing", () => {
    const sdks = makeSdks();
    const result = initObservability(
      { sentryDsn: "", posthogKey: "phc_xxx", posthogHost: undefined },
      sdks,
    );
    expect(sdks.sentry.init).not.toHaveBeenCalled();
    expect(result.sentryInitialized).toBe(false);
    expect(result.posthogInitialized).toBe(true);
  });

  it("treats empty-string PostHog key as missing", () => {
    const sdks = makeSdks();
    const result = initObservability(
      { sentryDsn: "https://abc@sentry.io/1", posthogKey: "", posthogHost: undefined },
      sdks,
    );
    expect(sdks.posthog.init).not.toHaveBeenCalled();
    expect(result.sentryInitialized).toBe(true);
    expect(result.posthogInitialized).toBe(false);
  });
});
