import { describe, it, expect } from "vitest";
import { ApiError, isApiError, type ApiErrorEnvelope } from "./ApiError";

describe("ApiError", () => {
  it("carries code, message, and status through the constructor", () => {
    const err = new ApiError({ code: "NOT_FOUND", message: "Session not found", status: 404 });
    expect(err.code).toBe("NOT_FOUND");
    expect(err.message).toBe("Session not found");
    expect(err.status).toBe(404);
    expect(err.field_errors).toBeUndefined();
  });

  it("exposes field_errors when the envelope includes them", () => {
    const err = new ApiError({
      code: "VALIDATION_FAILED",
      message: "Validation failed",
      field_errors: { track_id: ["required"], driver_id: ["unknown driver"] },
    });
    expect(err.field_errors).toEqual({
      track_id: ["required"],
      driver_id: ["unknown driver"],
    });
  });

  it("is still an Error subclass — instanceof Error passes", () => {
    const err = new ApiError({ code: "OOPS", message: "oops" });
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe("ApiError");
  });

  it("isApiError discriminates against plain errors and non-error values", () => {
    expect(isApiError(new ApiError({ code: "X", message: "x" }))).toBe(true);
    expect(isApiError(new Error("plain"))).toBe(false);
    expect(isApiError(null)).toBe(false);
    expect(isApiError(undefined)).toBe(false);
    expect(isApiError({ code: "X", message: "x" })).toBe(false);
    expect(isApiError("string")).toBe(false);
  });

  it("fromEnvelope constructs from a raw backend response envelope", () => {
    const envelope: ApiErrorEnvelope = {
      code: "BUNDLE_DUPLICATE",
      message: "This session was already uploaded.",
    };
    const err = ApiError.fromEnvelope(envelope, 409);
    expect(err.code).toBe("BUNDLE_DUPLICATE");
    expect(err.status).toBe(409);
    expect(isApiError(err)).toBe(true);
  });
});
