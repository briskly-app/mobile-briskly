import { SERVER_ERROR } from "@/lib/constants/messages";
import { ConnectionType, OriginCitySearchType } from "@/types/stop-type";

import { getApiBaseUrl } from "./config";
import {
  ApiDestinationsResponse,
  mapConnections,
  mapOriginCitySearch,
} from "./mappers/destinations";

export interface DestinationsQueryParams {
  fromCity: string;
  date: string;
  time: string;
  timezone: string;
  waitingTime: string;
}

export interface DestinationsPayload {
  origin: OriginCitySearchType;
  connections: ConnectionType[];
}

export async function fetchDestinations(
  params: DestinationsQueryParams,
  signal?: AbortSignal,
): Promise<DestinationsPayload> {
  const base = getApiBaseUrl();
  if (!base) {
    throw new Error(SERVER_ERROR);
  }

  const query = new URLSearchParams({
    from_city: params.fromCity,
    date: params.date,
    time: params.time,
    timezone: params.timezone,
    waitingTime: params.waitingTime,
  });

  const url = `${base}/api/destinations/?${query.toString()}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal,
    });

    if (!res.ok) {
      throw new Error(SERVER_ERROR);
    }

    const body: unknown = await res.json();
    const mapped = body as ApiDestinationsResponse;

    return {
      origin: mapOriginCitySearch(mapped),
      connections: mapConnections(mapped),
    };
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw err;
    }
    throw new Error(SERVER_ERROR);
  }
}

