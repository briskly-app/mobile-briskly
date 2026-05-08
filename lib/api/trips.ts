import { apiGetJson, apiPatchJson, apiPostJson } from "./config";
import {
  buildTripsListPayload,
  TripsListPayload,
} from "./mappers/trips";

export async function createTrip(signal?: AbortSignal): Promise<string> {
  const { slug } = (await apiPostJson("/api/trips/", {}, signal)) as {
    slug: string;
  };
  return slug;
}

export async function patchTrip(
  slug: string,
  signal?: AbortSignal,
): Promise<void> {
  const pathSlug = encodeURIComponent(slug);
  await apiPatchJson(`/api/trips/${pathSlug}/`, {}, signal);
}

export async function fetchTrips(
  signal?: AbortSignal,
): Promise<TripsListPayload> {
  const body = await apiGetJson("/api/trips/", signal);
  return buildTripsListPayload(body);
}
