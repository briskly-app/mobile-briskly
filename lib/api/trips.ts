import { SERVER_ERROR } from "@/lib/constants/messages";

import { getApiBaseUrl } from "./config";

export async function createTrip(signal?: AbortSignal): Promise<string> {
  const base = getApiBaseUrl();
  if (!base) {
    throw new Error(SERVER_ERROR);
  }

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
  const base = getApiBaseUrl();
  if (!base) {
    throw new Error(SERVER_ERROR);
  }

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
