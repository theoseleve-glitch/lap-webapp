import { describe, it, expect } from "vitest";
import { QueryClient } from "@tanstack/react-query";
import { DEFAULT_STALE_TIME_MS, createQueryClient } from "./query-client";

describe("createQueryClient", () => {
  it("returns a TanStack QueryClient instance", () => {
    expect(createQueryClient()).toBeInstanceOf(QueryClient);
  });

  it("sets the default stale time to 5 minutes", () => {
    const client = createQueryClient();
    const defaults = client.getDefaultOptions().queries;
    expect(defaults?.staleTime).toBe(DEFAULT_STALE_TIME_MS);
    expect(DEFAULT_STALE_TIME_MS).toBe(5 * 60 * 1000);
  });

  it("refetches queries when the browser window regains focus", () => {
    const client = createQueryClient();
    expect(client.getDefaultOptions().queries?.refetchOnWindowFocus).toBe(true);
  });

  it("does not auto-retry failed queries (we surface errors via TimelineError)", () => {
    const client = createQueryClient();
    expect(client.getDefaultOptions().queries?.retry).toBe(false);
  });
});
