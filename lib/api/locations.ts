import { SERVER_ERROR } from "@/lib/constants/messages";
import { LocationResultType } from "@/types/location-result-type";

import { getApiBaseUrl } from "./config";
import { parseCitySearchResponse } from "./mappers/city-search";

const DEFAULT_LIMIT = 6;

export async function fetchLocationSuggestions(
  query: string,
  signal?: AbortSignal,
): Promise<LocationResultType[]> {
  try {
    const base = getApiBaseUrl();
    const q = query.trim();
    if (q.length < 3) {
      return [];
    }

    const url = `${base}/api/cities?q=${encodeURIComponent(q)}&limit=${DEFAULT_LIMIT}`;

    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal,
    });

    if (!res.ok) {
      throw new Error(SERVER_ERROR);
    }

    const data: unknown = await res.json();
    return parseCitySearchResponse(data);
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw err;
    }
    throw new Error(SERVER_ERROR);
  }
}
