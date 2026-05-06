import { SERVER_ERROR } from "@/lib/constants/messages";

import { apiGetJson, requireApiBaseUrl } from "./config";
import {
  buildTripsListPayload,
  TripsListPayload,
} from "./mappers/trips";

export async function createTrip(signal?: AbortSignal): Promise<string> {
  const base = requireApiBaseUrl();

  const res = await fetch(`${base}/api/trips/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
    signal,
  });

  if (!res.ok) {
    throw new Error(SERVER_ERROR);
  }

  const { slug } = (await res.json()) as { slug: string };
  return slug;
}

export async function patchTrip(
  slug: string,
  signal?: AbortSignal,
): Promise<void> {
  const base = requireApiBaseUrl();

  const pathSlug = encodeURIComponent(slug);
  const res = await fetch(`${base}/api/trips/${pathSlug}/`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
    signal,
  });

  if (!res.ok) {
    throw new Error(SERVER_ERROR);
  }
}

export async function fetchTrips(
  signal?: AbortSignal,
): Promise<TripsListPayload> {
  const body = await apiGetJson("/api/trips/", signal);
  return buildTripsListPayload(body);
}
