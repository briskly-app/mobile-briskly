import { ConnectionType, OriginCitySearchType } from "@/types/stop-type";

import { apiGetJsonFromUrl } from "./config";
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
  const query = new URLSearchParams({
    from_city: params.fromCity,
    date: params.date,
    time: params.time,
    timezone: params.timezone,
    waitingTime: params.waitingTime,
  });

  const body = (await apiGetJsonFromUrl(
    (base) => `${base}/api/destinations/?${query.toString()}`,
    signal,
  )) as ApiDestinationsResponse;

  return {
    origin: mapOriginCitySearch(body),
    connections: mapConnections(body),
  };
}
