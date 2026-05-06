import { SERVER_ERROR } from "@/lib/constants/messages";

import { getApiBaseUrl } from "./config";

export type CreateUserConnectionBody = {
  user_trip: string;
  gtfs_trip: string;
  starting_stop: string;
  destination_stop: string;
  timezone: string;
  departure_date: string;
  departure_time: string;
  arrival_date: string;
  arrival_time: string;
  duration_in_travel: number;
  duration_waiting: number;
  duration_total: number;
};

export async function createUserConnection(
  payload: CreateUserConnectionBody,
  signal?: AbortSignal,
): Promise<void> {
  const base = getApiBaseUrl();
  if (!base) {
    throw new Error(SERVER_ERROR);
  }

  const res = await fetch(`${base}/api/connections/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal,
  });

  if (!res.ok) {
    throw new Error(SERVER_ERROR);
  }
}
