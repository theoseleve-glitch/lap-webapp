import { describe, it, expect } from "vitest";
import { sessionDetailPath } from "./routes";

describe("sessionDetailPath", () => {
  it("returns /sessions/{id} for a simple id", () => {
    expect(sessionDetailPath("abc-123")).toBe("/sessions/abc-123");
  });

  it("URI-encodes unsafe characters in the id", () => {
    expect(sessionDetailPath("a b/c")).toBe("/sessions/a%20b%2Fc");
  });

  it("preserves hyphens, underscores, and dots verbatim (URI-unreserved)", () => {
    expect(sessionDetailPath("a-b_c.d")).toBe("/sessions/a-b_c.d");
  });

  it("throws when the id is an empty string", () => {
    expect(() => sessionDetailPath("")).toThrow(/required/i);
  });

  it("throws when the id is whitespace only", () => {
    expect(() => sessionDetailPath("   ")).toThrow(/required/i);
  });
});
