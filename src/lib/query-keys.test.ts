import { describe, it, expect } from "vitest";
import { queryKeys } from "./query-keys";

describe("queryKeys", () => {
  it("exposes the bundles namespace", () => {
    expect(queryKeys.bundles.all).toEqual(["bundles"]);
    expect(queryKeys.bundles.list()).toEqual(["bundles", "list"]);
    expect(queryKeys.bundles.detail("abc")).toEqual(["bundles", "detail", "abc"]);
    expect(queryKeys.bundles.run("abc")).toEqual(["bundles", "run", "abc"]);
    expect(queryKeys.bundles.artifacts("abc")).toEqual(["bundles", "artifacts", "abc"]);
  });

  it("produces stable keys for identical inputs", () => {
    const a = queryKeys.bundles.detail("session-42");
    const b = queryKeys.bundles.detail("session-42");
    // Structural equality (TanStack Query compares by value, not reference).
    expect(a).toEqual(b);
  });

  it("produces distinct keys for distinct ids", () => {
    expect(queryKeys.bundles.detail("a")).not.toEqual(queryKeys.bundles.detail("b"));
  });
});
