import { SERVER_ERROR } from "@/lib/constants/messages";
import { TripSummaryType } from "@/types/trip-summary-type";

import { apiGetJson } from "./config";
import {
  ApiTripConnection,
  buildTripSummary,
  mapApiTripConnections,
  mapApiTripDetail,
  mapTripConnectionsToNextLegSearchParams,
  type TripDetailType,
  type TripNextLegSearchParams,
} from "./mappers/trip-detail";

export type { TripDetailType, TripNextLegSearchParams };

export interface TripSummaryPayload {
  summary: TripSummaryType;
  nextLeg: TripNextLegSearchParams | null;
  connectionsCount: number;
}

export async function fetchTripDetail(
  slug: string,
  signal?: AbortSignal,
): Promise<TripDetailType> {
  const body = await apiGetJson(
    `/api/trips/${encodeURIComponent(slug)}/`,
    signal,
  );
  const detail = mapApiTripDetail(body);
  if (!detail) {
    throw new Error(SERVER_ERROR);
  }
  return detail;
}

export async function fetchTripConnections(
  slug: string,
  signal?: AbortSignal,
): Promise<ApiTripConnection[]> {
  const body = await apiGetJson(
    `/api/trips/${encodeURIComponent(slug)}/connections/`,
    signal,
  );
  return mapApiTripConnections(body);
}

export async function fetchTripNextLegSearchParams(
  slug: string,
  signal?: AbortSignal,
): Promise<TripNextLegSearchParams | null> {
  const body = await apiGetJson(
    `/api/trips/${encodeURIComponent(slug)}/connections/`,
    signal,
  );
  return mapTripConnectionsToNextLegSearchParams(body);
}

export async function fetchTripSummary(
  slug: string,
  signal?: AbortSignal,
): Promise<TripSummaryPayload> {
  const [detail, connections] = await Promise.all([
    fetchTripDetail(slug, signal),
    fetchTripConnections(slug, signal),
  ]);

  return {
    summary: buildTripSummary(detail, connections),
    nextLeg: mapTripConnectionsToNextLegSearchParams(connections),
    connectionsCount: connections.length,
  };
}
