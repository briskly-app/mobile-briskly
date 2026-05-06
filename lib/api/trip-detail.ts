import { SERVER_ERROR } from "@/lib/constants/messages";
import { TripSummaryType } from "@/types/trip-summary-type";

import { getApiBaseUrl } from "./config";
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

function buildTripBase(): string {
  const base = getApiBaseUrl();
  if (!base) {
    throw new Error(SERVER_ERROR);
  }
  return base;
}

async function getJson(url: string, signal?: AbortSignal): Promise<unknown> {
  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    signal,
  });

  if (!res.ok) {
    throw new Error(SERVER_ERROR);
  }

  return res.json();
}

export async function fetchTripDetail(
  slug: string,
  signal?: AbortSignal,
): Promise<TripDetailType> {
  const base = buildTripBase();
  const url = `${base}/api/trips/${encodeURIComponent(slug)}/`;
  const body = await getJson(url, signal);
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
  const base = buildTripBase();
  const url = `${base}/api/trips/${encodeURIComponent(slug)}/connections/`;
  const body = await getJson(url, signal);
  return mapApiTripConnections(body);
}

export async function fetchTripNextLegSearchParams(
  slug: string,
  signal?: AbortSignal,
): Promise<TripNextLegSearchParams | null> {
  const base = buildTripBase();
  const url = `${base}/api/trips/${encodeURIComponent(slug)}/connections/`;
  const body = await getJson(url, signal);
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
