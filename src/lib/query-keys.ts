/**
 * Central TanStack Query key factory.
 *
 * Each domain lives under its own namespace (bundles, and future
 * sessions/drivers/compare/etc. as those queries land). Keys are
 * const-asserted tuples so `queryKey` types flow through without
 * widening to `string[]`.
 *
 * Usage:
 *   useQuery({ queryKey: queryKeys.bundles.detail(id), queryFn: ... })
 *   queryClient.invalidateQueries({ queryKey: queryKeys.bundles.all })
 */

import { bundleKeys } from "./api/bundles/keys";

export const queryKeys = {
  bundles: bundleKeys,
} as const;
