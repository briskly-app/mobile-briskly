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

export async function apiGetJsonFromUrl(
  buildUrl: (base: string) => string,
  signal?: AbortSignal,
): Promise<unknown> {
  try {
    const base = getApiBaseUrl();
    if (!base) {
      throw new Error(SERVER_ERROR);
    }

    const res = await fetch(buildUrl(base), {
      method: "GET",
      headers: { Accept: "application/json" },
      signal,
    });

    if (!res.ok) {
      throw new Error(SERVER_ERROR);
    }

    return res.json();
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw err;
    }
    throw new Error(SERVER_ERROR);
  }
}

export async function apiPostJson(
  path: string,
  body: unknown,
  signal?: AbortSignal,
): Promise<unknown> {
  const base = requireApiBaseUrl();
  const res = await fetch(`${base}${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal,
  });

  if (!res.ok) {
    throw new Error(SERVER_ERROR);
  }

  return res.json();
}

export async function apiPatchJson(
  path: string,
  body: unknown,
  signal?: AbortSignal,
): Promise<void> {
  const base = requireApiBaseUrl();
  const res = await fetch(`${base}${path}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal,
  });

  if (!res.ok) {
    throw new Error(SERVER_ERROR);
  }
}
