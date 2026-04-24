import { test, expect } from "@playwright/test";

// First-hit dev-server compile can take several seconds; use a generous
// per-assertion timeout so CI with fresh .next/ cache doesn't flake.
const RENDER_TIMEOUT = 30_000;

test("dashboard page renders header", async ({ page }) => {
  await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1, name: "Dashboard" })).toBeVisible({
    timeout: RENDER_TIMEOUT,
  });
});
