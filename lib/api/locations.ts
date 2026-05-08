import { SERVER_ERROR } from "@/lib/constants/messages";
import { apiGetJsonFromUrl } from "@/lib/api/config";
import { LocationResultType } from "@/types/location-result-type";

import { parseCitySearchResponse } from "./mappers/city-search";

const DEFAULT_LIMIT = 6;

export async function fetchLocationSuggestions(
  query: string,
  signal?: AbortSignal,
): Promise<LocationResultType[]> {
  const q = query.trim();
  if (q.length < 3) {
    return [];
  }

  try {
    const data = await apiGetJsonFromUrl(
      (base) =>
        `${base}/api/cities?q=${encodeURIComponent(q)}&limit=${DEFAULT_LIMIT}`,
      signal,
    );
    return parseCitySearchResponse(data);
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw err;
    }
    throw new Error(SERVER_ERROR);
  }
}
