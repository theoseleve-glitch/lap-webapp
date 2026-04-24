import { QueryClient } from "@tanstack/react-query";

export const DEFAULT_STALE_TIME_MS = 5 * 60 * 1000;

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: DEFAULT_STALE_TIME_MS,
        refetchOnWindowFocus: true,
        retry: false,
      },
    },
  });
}
