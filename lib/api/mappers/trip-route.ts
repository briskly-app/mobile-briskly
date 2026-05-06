import { TimelineItemType } from "@/components/shared/timeline-list";
import { MINIMUM_VISITING_TIME } from "@/constants/global";
import { normalizeTimeForSearch } from "@/lib/format/date";
import { formatDurationSeconds } from "@/lib/format/duration";
import { ConnectionType } from "@/types/stop-type";

import { ApiTripConnection } from "./trip-detail";

export interface TripLeg {
  id: string;
  startingCity: string;
  destinationCity: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  durationInTravelSeconds: number;
}

function safeTrim(value: unknown): string {
  return String(value ?? "").trim();
}

function safeNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function legTimestamp(dateIso: string, time: string): number | null {
  const [y, m, d] = dateIso.split("-").map(Number);
  if (!y || !m || !d) return null;
  const [hh, mm] = time.split(":").map(Number);
  if (hh == null || mm == null) return null;
  return Date.UTC(y, m - 1, d, hh, mm);
}

export function apiTripConnectionToLeg(
  conn: ApiTripConnection,
): TripLeg | null {
  const start = conn.starting_stop;
  const dest = conn.destination_stop;
  const startCity = safeTrim(start?.city_name) || safeTrim(start?.stop_name);
  const destCity = safeTrim(dest?.city_name) || safeTrim(dest?.stop_name);
  const departureDate = safeTrim(conn.departure_date);
  const arrivalDate = safeTrim(conn.arrival_date);
  const departureTime = normalizeTimeForSearch(safeTrim(conn.departure_time));
  const arrivalTime = normalizeTimeForSearch(safeTrim(conn.arrival_time));

  if (
    !startCity ||
    !destCity ||
    !departureDate ||
    !arrivalDate ||
    !departureTime ||
    !arrivalTime
  ) {
    return null;
  }

  return {
    id: String(conn.id ?? `${departureDate}-${departureTime}`),
    startingCity: startCity,
    destinationCity: destCity,
    departureDate,
    departureTime,
    arrivalDate,
    arrivalTime,
    durationInTravelSeconds: safeNumber(conn.duration_in_travel),
  };
}

export function connectionToLeg(connection: ConnectionType): TripLeg {
  const startCity =
    connection.startingStop.cityName || connection.startingStop.name;
  const destCity =
    connection.destinationStop.cityName || connection.destinationStop.name;

  return {
    id: connection.id,
    startingCity: startCity,
    destinationCity: destCity,
    departureDate: connection.departureDate,
    departureTime: normalizeTimeForSearch(connection.departureTime),
    arrivalDate: connection.arrivalDate,
    arrivalTime: normalizeTimeForSearch(connection.arrivalTime),
    durationInTravelSeconds: connection.durationInTravel,
  };
}

export function sortLegsChronologically(legs: TripLeg[]): TripLeg[] {
  return [...legs].sort((a, b) => {
    const aTs = legTimestamp(a.departureDate, a.departureTime) ?? 0;
    const bTs = legTimestamp(b.departureDate, b.departureTime) ?? 0;
    return aTs - bTs;
  });
}

function gapSecondsBetween(prev: TripLeg, current: TripLeg): number {
  const prevTs = legTimestamp(prev.arrivalDate, prev.arrivalTime);
  const curTs = legTimestamp(current.departureDate, current.departureTime);
  if (prevTs == null || curTs == null) return 0;
  return Math.max(0, Math.round((curTs - prevTs) / 1000));
}

export function buildRouteTimeline(legs: TripLeg[]): TimelineItemType[] {
  if (legs.length === 0) return [];

  const items: TimelineItemType[] = [];

  legs.forEach((leg, index) => {
    if (index > 0) {
      const prev = legs[index - 1];
      const gap = gapSecondsBetween(prev, leg);
      if (gap >= MINIMUM_VISITING_TIME) {
        items.push({
          id: `walk-${index}-${leg.id}`,
          icon: "directions-walk",
          title: `Zwiedzanie: ${leg.startingCity}`,
          subtitle: `${prev.arrivalTime} - ${leg.departureTime} (${formatDurationSeconds(gap)})`,
        });
      }
    }
    items.push({
      id: `train-${leg.id}`,
      icon: "train",
      title: `${leg.startingCity} → ${leg.destinationCity}`,
      subtitle: `${leg.departureTime} - ${leg.arrivalTime} (${formatDurationSeconds(leg.durationInTravelSeconds)})`,
    });
  });

  const last = legs[legs.length - 1];
  items.push({
    id: `arrival-${last.id}`,
    icon: "check-circle",
    title: `Przybycie: ${last.destinationCity}`,
    subtitle: last.arrivalTime,
  });

  return items;
}

export function computeTotalRouteDurationSeconds(legs: TripLeg[]): number {
  if (legs.length === 0) return 0;
  const first = legs[0];
  const last = legs[legs.length - 1];
  const startTs = legTimestamp(first.departureDate, first.departureTime);
  const endTs = legTimestamp(last.arrivalDate, last.arrivalTime);
  if (startTs == null || endTs == null) return 0;
  return Math.max(0, Math.round((endTs - startTs) / 1000));
}
