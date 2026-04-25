import { describe, expect, it } from "vitest";
import {
  FONT_BODY_WEIGHTS,
  FONT_DISPLAY_WEIGHTS,
  FONT_MONO_WEIGHTS,
  FONT_SUBSETS,
} from "./font-config";

// Subsetting strategy: ship only the glyphs and weights actually rendered.
// `subsets` is the Latin glyph subset; `weight` arrays here mirror the
// `font-weight` declarations in globals.css. If the CSS adds a new weight,
// these arrays must grow with it — otherwise the browser will synthesise
// a fake bold/italic and ruin the typography.

describe("font subsetting config", () => {
  it("ships only Latin glyphs", () => {
    expect(FONT_SUBSETS).toEqual(["latin"]);
  });

  it("body (Inter) ships only weight 400 — used by html body and .font-body", () => {
    expect(FONT_BODY_WEIGHTS).toEqual(["400"]);
  });

  it("display (Space Grotesk) ships only weight 700 — used by .font-monument", () => {
    expect(FONT_DISPLAY_WEIGHTS).toEqual(["700"]);
  });

  it("mono (Space Mono) ships only weight 400 — used by .font-telemetry", () => {
    expect(FONT_MONO_WEIGHTS).toEqual(["400"]);
  });
});
