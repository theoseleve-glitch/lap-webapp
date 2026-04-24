/**
 * Typed error envelope for the LAP API.
 *
 * The envelope shape mirrors the backend's error response contract
 * (code / message / optional per-field errors). Once `@lap/schemas`
 * publishes a canonical `ApiErrorEnvelope` type (T010 + T028), this
 * local definition should be replaced by the imported one — the
 * field set is deliberately identical so the swap is a pure import
 * change.
 */
export interface ApiErrorEnvelope {
  code: string;
  message: string;
  field_errors?: Record<string, string[]>;
}

interface ApiErrorInit extends ApiErrorEnvelope {
  status?: number;
}

export class ApiError extends Error {
  readonly code: string;
  readonly field_errors?: Record<string, string[]>;
  readonly status?: number;

  constructor({ code, message, field_errors, status }: ApiErrorInit) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.field_errors = field_errors;
    this.status = status;
  }

  /** Build from a raw backend response envelope + HTTP status. */
  static fromEnvelope(envelope: ApiErrorEnvelope, status?: number): ApiError {
    return new ApiError({ ...envelope, status });
  }
}

/** Type guard — narrows unknown values to `ApiError` for error handlers. */
export function isApiError(value: unknown): value is ApiError {
  return value instanceof ApiError;
}
