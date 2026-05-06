import { useQuery } from "@tanstack/react-query";

import { fetchTripSummary } from "@/lib/api/trip-detail";

export function useTripSummaryQuery(slug: string | null) {
  const key = slug?.trim() ?? "";
  return useQuery({
    queryKey: ["tripSummary", key],
    queryFn: ({ signal }) => fetchTripSummary(key, signal),
    enabled: Boolean(key),
    staleTime: 30_000,
  });
}
