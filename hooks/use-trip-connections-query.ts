import { useQuery } from "@tanstack/react-query";

import { fetchTripConnections } from "@/lib/api/trip-detail";

export function useTripConnectionsQuery(slug: string | null) {
  const key = slug?.trim() ?? "";
  return useQuery({
    queryKey: ["tripConnections", key],
    queryFn: ({ signal }) => fetchTripConnections(key, signal),
    enabled: Boolean(key),
    staleTime: 30_000,
  });
}
