import { describe, it, expect } from "vitest";
import {
  prescriptionDetailPath,
  sessionDetailPath,
  skillDrilldownPath,
  weaknessDetailPath,
} from "./routes";

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

describe("skillDrilldownPath", () => {
  it("returns /profile/skills/{slug} for a simple slug", () => {
    expect(skillDrilldownPath("braking")).toBe("/profile/skills/braking");
  });

  it("URI-encodes unsafe characters in the slug", () => {
    expect(skillDrilldownPath("trail braking")).toBe("/profile/skills/trail%20braking");
  });

  it("preserves hyphens in the slug verbatim", () => {
    expect(skillDrilldownPath("trail-braking")).toBe("/profile/skills/trail-braking");
  });

  it("throws when the slug is an empty string", () => {
    expect(() => skillDrilldownPath("")).toThrow(/required/i);
  });

  it("throws when the slug is whitespace only", () => {
    expect(() => skillDrilldownPath("   ")).toThrow(/required/i);
  });
});

describe("weaknessDetailPath", () => {
  it("returns /weaknesses/{id} for a simple id", () => {
    expect(weaknessDetailPath("w1")).toBe("/weaknesses/w1");
  });

  it("URI-encodes unsafe characters in the id", () => {
    expect(weaknessDetailPath("a b/c")).toBe("/weaknesses/a%20b%2Fc");
  });

  it("preserves hyphens in the id verbatim", () => {
    expect(weaknessDetailPath("late-trail-brake-t5")).toBe("/weaknesses/late-trail-brake-t5");
  });

  it("throws when the id is an empty string", () => {
    expect(() => weaknessDetailPath("")).toThrow(/required/i);
  });

  it("throws when the id is whitespace only", () => {
    expect(() => weaknessDetailPath("   ")).toThrow(/required/i);
  });
});

describe("prescriptionDetailPath", () => {
  it("returns /prescriptions/{id} for a simple id", () => {
    expect(prescriptionDetailPath("p1")).toBe("/prescriptions/p1");
  });

  it("URI-encodes unsafe characters in the id", () => {
    expect(prescriptionDetailPath("a b/c")).toBe("/prescriptions/a%20b%2Fc");
  });

  it("preserves hyphens in the id verbatim", () => {
    expect(prescriptionDetailPath("trail-brake-release")).toBe(
      "/prescriptions/trail-brake-release",
    );
  });

  it("throws when the id is an empty string", () => {
    expect(() => prescriptionDetailPath("")).toThrow(/required/i);
  });

  it("throws when the id is whitespace only", () => {
    expect(() => prescriptionDetailPath("   ")).toThrow(/required/i);
  });
});
