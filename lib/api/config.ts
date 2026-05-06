import { SERVER_ERROR } from "@/lib/constants/messages";

export function getApiBaseUrl(): string {
  const url = process.env.EXPO_PUBLIC_API_URL?.trim();
  return url?.replace(/\/$/, "") ?? "";
}

export function requireApiBaseUrl(): string {
  const base = getApiBaseUrl();
  if (!base) {
    throw new Error(SERVER_ERROR);
  }
  return base;
}

export async function apiGetJson(
  path: string,
  signal?: AbortSignal,
): Promise<unknown> {
  const base = requireApiBaseUrl();
  const res = await fetch(`${base}${path}`, {
    method: "GET",
    headers: { Accept: "application/json" },
    signal,
  });

  if (!res.ok) {
    throw new Error(SERVER_ERROR);
  }

  return res.json();
}
