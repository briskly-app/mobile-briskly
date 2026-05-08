import { apiPostJson } from "./config";

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
  await apiPostJson("/api/connections/", payload, signal);
}
