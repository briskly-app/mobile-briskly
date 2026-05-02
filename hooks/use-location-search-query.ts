import { useQuery } from "@tanstack/react-query";

import { fetchLocationSuggestions } from "@/lib/api/locations";

import { useDebouncedValue } from "./use-debounced-value";

const DEBOUNCE_MS = 320;

export function useLocationSearchQuery(searchQuery: string) {
  const debounced = useDebouncedValue(searchQuery.trim(), DEBOUNCE_MS);
  const enabled = debounced.length >= 3;

  return useQuery({
    queryKey: ["locationSearch", debounced],
    queryFn: ({ signal }) => fetchLocationSuggestions(debounced, signal),
    enabled,
    staleTime: 30_000,
  });
}
