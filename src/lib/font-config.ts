// Latin-glyph subset for all three webfonts. next/font/google emits one
// woff2 file per (family, weight, subset) tuple, so trimming weight
// arrays directly trims the bundle.
export const FONT_SUBSETS = ["latin"] as const;

// Weights below mirror the `font-weight` declarations in globals.css.
// Adding a new font-weight rule? Add the weight here too — otherwise the
// browser will synthesise a fake bold/italic.
export const FONT_BODY_WEIGHTS = ["400"] as const;
export const FONT_DISPLAY_WEIGHTS = ["700"] as const;
export const FONT_MONO_WEIGHTS = ["400"] as const;
