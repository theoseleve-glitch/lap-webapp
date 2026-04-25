import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Audit (T233): only three font-weight declarations exist in the app's CSS
//   .font-body      → 400 (Inter)
//   .font-monument  → 700 (Space Grotesk)
//   .font-telemetry → 400 (Space Mono)
//
// next/font macros require literal arrays at the call site (no spreads),
// so this regression test reads layout.tsx as source text and asserts the
// inline shape directly. Adding a new font-weight rule to globals.css
// without trimming layout.tsx would synthesise a fake bold — and trimming
// here without auditing globals.css would do the same. Either way the
// audit needs to be redone deliberately.
const layoutSource = readFileSync(resolve(process.cwd(), "src/app/layout.tsx"), "utf-8");

describe("layout.tsx font subsetting", () => {
  it("Inter is configured with weight: ['400']", () => {
    expect(layoutSource).toContain('weight: ["400"]');
  });

  it("Space_Grotesk is configured with weight: ['700']", () => {
    expect(layoutSource).toContain('weight: ["700"]');
  });

  it("two fonts ship weight 400 (Inter + Space_Mono)", () => {
    const matches = layoutSource.match(/weight:\s*\["400"\]/g);
    expect(matches?.length).toBe(2);
  });

  it("does not load Inter weight 300", () => {
    expect(layoutSource).not.toContain('"300"');
  });

  it("does not load Inter weight 500", () => {
    expect(layoutSource).not.toContain('"500"');
  });

  it("does not load weight 600 (used to be in Inter and Space_Grotesk)", () => {
    expect(layoutSource).not.toContain('"600"');
  });

  it("each font uses subsets: ['latin']", () => {
    const matches = layoutSource.match(/subsets:\s*\["latin"\]/g);
    expect(matches?.length).toBe(3);
  });
});
