import { describe, expect, it } from "vitest";
// @ts-expect-error -- next.config.mjs has no .d.ts; we treat it as a plain config object here.
import nextConfigRaw from "../../next.config.mjs";

interface NextImageConfigShape {
  images?: { formats?: readonly string[] };
}

const nextConfig = nextConfigRaw as NextImageConfigShape;

describe("next.config.mjs images", () => {
  it("declares avif and webp as the optimization formats", () => {
    expect(nextConfig.images).toBeDefined();
    expect(nextConfig.images?.formats).toEqual(["image/avif", "image/webp"]);
  });

  it("lists avif before webp so AVIF is the preferred format when supported", () => {
    const formats = nextConfig.images?.formats ?? [];
    const avifIndex = formats.indexOf("image/avif");
    const webpIndex = formats.indexOf("image/webp");
    expect(avifIndex).toBeGreaterThanOrEqual(0);
    expect(webpIndex).toBeGreaterThanOrEqual(0);
    expect(avifIndex).toBeLessThan(webpIndex);
  });
});
