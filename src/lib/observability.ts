export interface ObservabilityConfig {
  sentryDsn: string | undefined;
  posthogKey: string | undefined;
  posthogHost: string | undefined;
}

export interface SentrySdk {
  init: (options: { dsn: string }) => void;
}

export interface PostHogSdk {
  init: (key: string, options: { api_host: string }) => void;
}

export interface ObservabilitySdks {
  sentry: SentrySdk;
  posthog: PostHogSdk;
}

export interface ObservabilityResult {
  sentryInitialized: boolean;
  posthogInitialized: boolean;
}

const DEFAULT_POSTHOG_HOST = "https://us.i.posthog.com";

export function initObservability(
  config: ObservabilityConfig,
  sdks: ObservabilitySdks,
): ObservabilityResult {
  let sentryInitialized = false;
  let posthogInitialized = false;

  if (config.sentryDsn) {
    sdks.sentry.init({ dsn: config.sentryDsn });
    sentryInitialized = true;
  }

  if (config.posthogKey) {
    sdks.posthog.init(config.posthogKey, {
      api_host: config.posthogHost ?? DEFAULT_POSTHOG_HOST,
    });
    posthogInitialized = true;
  }

  return { sentryInitialized, posthogInitialized };
}
