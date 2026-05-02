import { useQuery } from "@tanstack/react-query";

import {
  DestinationsQueryParams,
  fetchDestinations,
} from "@/lib/api/destinations";

export function useDestinationsQuery(params: DestinationsQueryParams | null) {
  const enabled = Boolean(
    params?.fromCity &&
      params?.date &&
      params?.time &&
      params?.timezone &&
      params?.waitingTime,
  );

  return useQuery({
    queryKey: [
      "destinations",
      params?.fromCity ?? "",
      params?.date ?? "",
      params?.time ?? "",
      params?.timezone ?? "",
      params?.waitingTime ?? "",
    ],
    queryFn: ({ signal }) => fetchDestinations(params!, signal),
    enabled,
    staleTime: 60_000,
  });
}

