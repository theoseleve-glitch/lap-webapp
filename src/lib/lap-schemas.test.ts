import { describe, expect, it } from "vitest";
import type { components } from "@lap/schemas";

type ActionPrescription = components["schemas"]["ActionPrescription"];
type ActionOutcome = components["schemas"]["ActionOutcome"];

describe("T010 @lap/schemas import surface", () => {
  it("resolves the components type tree (compile-time)", () => {
    const prescription: Pick<ActionPrescription, "id" | "driver_id" | "created_at"> = {
      id: "11111111-1111-1111-1111-111111111111",
      driver_id: "22222222-2222-2222-2222-222222222222",
      created_at: "2026-04-26T10:00:00Z",
    };
    expect(prescription.id).toMatch(/^[0-9a-f-]{36}$/);
    expect(prescription.driver_id).toMatch(/^[0-9a-f-]{36}$/);
    expect(prescription.created_at).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it("exposes the ActionOutcome schema with its scoring fields", () => {
    const outcome: Pick<
      ActionOutcome,
      "id" | "prescription_id" | "prescription_efficacy_score" | "success_condition_met"
    > = {
      id: "33333333-3333-3333-3333-333333333333",
      prescription_id: "11111111-1111-1111-1111-111111111111",
      prescription_efficacy_score: 0.87,
      success_condition_met: true,
    };
    expect(outcome.prescription_efficacy_score).toBeGreaterThanOrEqual(0);
    expect(outcome.prescription_efficacy_score).toBeLessThanOrEqual(1);
    expect(outcome.success_condition_met).toBe(true);
  });
});
