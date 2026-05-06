import { useQuery } from "@tanstack/react-query";

import { fetchTripNextLegSearchParams } from "@/lib/api/trip-detail";

export function useTripNextLegSearchParamsQuery(slug: string | null) {
  const key = slug?.trim() ?? "";
  return useQuery({
    queryKey: ["tripNextLegSearch", key],
    queryFn: ({ signal }) => fetchTripNextLegSearchParams(key, signal),
    enabled: Boolean(key),
    staleTime: 30_000,
  });
}
