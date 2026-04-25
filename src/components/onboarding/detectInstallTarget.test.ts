import { describe, it, expect } from "vitest";
import { detectInstallTarget } from "./detectInstallTarget";

describe("detectInstallTarget", () => {
  it("detects Windows from a Windows 10 Chrome UA", () => {
    const ua =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
    expect(detectInstallTarget(ua)).toBe("windows");
  });

  it("detects macOS from a Mac Safari UA", () => {
    const ua =
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15";
    expect(detectInstallTarget(ua)).toBe("macos");
  });

  it("detects Linux from a generic X11/Linux UA", () => {
    const ua =
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
    expect(detectInstallTarget(ua)).toBe("linux");
  });

  it("detects iOS from an iPhone UA", () => {
    const ua =
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1";
    expect(detectInstallTarget(ua)).toBe("ios");
  });

  it("detects iOS from an iPad UA", () => {
    const ua =
      "Mozilla/5.0 (iPad; CPU OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1";
    expect(detectInstallTarget(ua)).toBe("ios");
  });

  it("detects Android from an Android Chrome UA", () => {
    const ua =
      "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36";
    expect(detectInstallTarget(ua)).toBe("android");
  });

  it("returns 'unknown' for an empty UA", () => {
    expect(detectInstallTarget("")).toBe("unknown");
  });

  it("returns 'unknown' for an unrecognised UA", () => {
    expect(detectInstallTarget("CustomBot/1.0")).toBe("unknown");
  });

  it("classifies Android (which contains 'Linux') as android, not linux", () => {
    const ua =
      "Mozilla/5.0 (Linux; Android 14; SM-S921B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36";
    expect(detectInstallTarget(ua)).toBe("android");
  });

  it("classifies iPhone (which contains 'Mac OS X') as ios, not macos", () => {
    const ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15";
    expect(detectInstallTarget(ua)).toBe("ios");
  });
});
