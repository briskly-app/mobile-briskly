import { useQuery } from "@tanstack/react-query";

import { fetchTrips } from "@/lib/api/trips";

export function useTripsQuery() {
  return useQuery({
    queryKey: ["trips"],
    queryFn: ({ signal }) => fetchTrips(signal),
    staleTime: 30_000,
  });
}
