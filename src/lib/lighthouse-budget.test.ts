import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const configPath = resolve(process.cwd(), "lighthouserc.json");
const lhciConfig = JSON.parse(readFileSync(configPath, "utf-8")) as {
  ci: {
    collect: { url: string[]; startServerCommand?: string; numberOfRuns?: number };
    assert: { assertions: Record<string, unknown> };
    upload?: { target: string };
  };
};

const TOP_LEVEL_URLS = [
  "http://localhost:3000/",
  "http://localhost:3000/dashboard",
  "http://localhost:3000/profile",
  "http://localhost:3000/timeline",
  "http://localhost:3000/compare",
  "http://localhost:3000/billing",
  "http://localhost:3000/settings",
];

describe("lighthouserc.json", () => {
  it("declares an error-level LCP budget at 2500ms (2.5s)", () => {
    expect(lhciConfig.ci.assert.assertions["largest-contentful-paint"]).toEqual([
      "error",
      { maxNumericValue: 2500 },
    ]);
  });

  it("collects every top-level route", () => {
    for (const url of TOP_LEVEL_URLS) {
      expect(lhciConfig.ci.collect.url).toContain(url);
    }
  });

  it("uses LHCI's startServerCommand so the server boots automatically", () => {
    expect(lhciConfig.ci.collect.startServerCommand).toBeTruthy();
  });

  it("declares an error-level script-bytes budget at 200KB gzip (204800 bytes)", () => {
    expect(lhciConfig.ci.assert.assertions["resource-summary:script:size"]).toEqual([
      "error",
      { maxNumericValue: 204800 },
    ]);
  });

  it("declares an error-level stylesheet-bytes budget at 30KB gzip (30720 bytes)", () => {
    // Tailwind production purge keeps the CSS bundle around 8KB gzip; this
    // budget gives ~3-4x headroom and catches the common purge-broke
    // failure modes (disabled purge, missing content glob entry, an
    // accidental import of an unused stylesheet).
    expect(lhciConfig.ci.assert.assertions["resource-summary:stylesheet:size"]).toEqual([
      "error",
      { maxNumericValue: 30720 },
    ]);
  });

  it("requires a perfect accessibility score (no axe violations) on every URL", () => {
    // Lighthouse's accessibility category runs axe-core under the hood.
    // minScore: 1 means every auto-detectable axe rule passes; any violation
    // (missing landmark, ARIA mismatch, contrast issue, etc.) fails the build.
    expect(lhciConfig.ci.assert.assertions["categories:accessibility"]).toEqual([
      "error",
      { minScore: 1 },
    ]);
  });
});
