import { axe } from "vitest-axe";

/**
 * Run axe-core against a rendered DOM root and throw with a readable summary
 * of every violation. Test-only: import only from `*.test.tsx` files.
 *
 * The vitest-axe@0.1.0 `toHaveNoViolations` matcher targets a legacy
 * `Vi.Assertion` namespace that Vitest 2.1.x no longer exposes, so this
 * helper bypasses the matcher and uses axe-core directly.
 */
export async function assertNoAxeViolations(root: Element): Promise<void> {
  const results = await axe(root);
  if (results.violations.length === 0) return;
  const summary = results.violations
    .map((v) => `  [${v.id}] ${v.help} (impact=${v.impact ?? "unknown"})`)
    .join("\n");
  throw new Error(`axe found ${results.violations.length} violation(s):\n${summary}`);
}
