export type ResolvedInstallTarget = "windows" | "macos" | "linux" | "ios" | "android";
export type InstallTarget = ResolvedInstallTarget | "unknown";

export function detectInstallTarget(userAgent: string): InstallTarget {
  if (!userAgent) return "unknown";
  if (/Android/i.test(userAgent)) return "android";
  if (/iPhone|iPad|iPod/i.test(userAgent)) return "ios";
  if (/Windows/i.test(userAgent)) return "windows";
  if (/Macintosh|Mac OS X/i.test(userAgent)) return "macos";
  if (/Linux/i.test(userAgent)) return "linux";
  return "unknown";
}
