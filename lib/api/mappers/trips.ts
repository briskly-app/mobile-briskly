import {
  formatTripDateRangeUs,
  getTodayIsoLocal,
} from "@/lib/format/date";
import { TripItemType } from "@/types/trip-item-type";

import {
  ApiTripDetail,
  mapApiTripDetail,
  TripDetailType,
} from "./trip-detail";

export interface TripsListPayload {
  upcoming: TripItemType[];
  past: TripItemType[];
}

const EMPTY_NAME_PREFIX = "Empty_";

function isUserCreatedTrip(trip: TripDetailType): boolean {
  if (!trip.startDate || !trip.endDate) return false;
  if (trip.name.startsWith(EMPTY_NAME_PREFIX)) return false;
  return true;
}

function tripToItem(trip: TripDetailType): TripItemType {
  return {
    id: trip.slug,
    title: trip.name,
    dateRange: formatTripDateRangeUs(trip.startDate, trip.endDate),
    image: trip.thumbnailUrl ? { uri: trip.thumbnailUrl } : undefined,
  };
}

function mapAndFilterTrips(rawTrips: ApiTripDetail[]): TripDetailType[] {
  return rawTrips
    .map(mapApiTripDetail)
    .filter(
      (trip): trip is TripDetailType => trip !== null && isUserCreatedTrip(trip),
    );
}

export function buildTripsListPayload(body: unknown): TripsListPayload {
  if (!Array.isArray(body)) {
    return { upcoming: [], past: [] };
  }

  const valid = mapAndFilterTrips(body as ApiTripDetail[]);
  const todayIso = getTodayIsoLocal();

  const upcoming = valid
    .filter((trip) => trip.endDate >= todayIso)
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .map(tripToItem);

  const past = valid
    .filter((trip) => trip.endDate < todayIso)
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .map(tripToItem);

  return { upcoming, past };
}
