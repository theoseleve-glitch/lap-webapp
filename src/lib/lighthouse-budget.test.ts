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
});
