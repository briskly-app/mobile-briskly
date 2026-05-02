import {
  ConnectionType,
  OriginCitySearchType,
  StopType,
} from "@/types/stop-type";

type ApiStop = {
  stop_id?: string;
  stop_name?: string;
  city_id?: string;
  city_name?: string;
  country_code?: string;
  country_name?: string;
  attraction_score?: number;
  longitude?: number;
  latitude?: number;
  thumbnail_url?: string;
  suburb?: string;
  region?: string;
};

type ApiConnection = {
  id?: string;
  departure_date?: string;
  departure_time?: string;
  arrival_date?: string;
  arrival_time?: string;
  duration_in_travel?: number;
  duration_waiting?: number;
  duration_total?: number;
  starting_stop?: ApiStop;
  destination_stop?: ApiStop;
};

export type ApiDestinationsResponse = {
  city_name?: string;
  region?: string;
  country_name?: string;
  country_code?: string;
  search_date?: string;
  search_time?: string;
  timezone?: string;
  results?: ApiConnection[];
};

function safeString(value: unknown): string {
  return String(value ?? "").trim();
}

function safeNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function mapStop(stop: ApiStop | undefined): StopType {
  return {
    id: safeString(stop?.stop_id),
    name: safeString(stop?.stop_name),
    cityId: safeString(stop?.city_id),
    cityName: safeString(stop?.city_name),
    countryCode: safeString(stop?.country_code),
    countryName: safeString(stop?.country_name),
    attractionScore: safeNumber(stop?.attraction_score),
    longitude: safeNumber(stop?.longitude),
    latitude: safeNumber(stop?.latitude),
    thumbnailUrl: stop?.thumbnail_url ? { uri: stop.thumbnail_url } : undefined,
    suburb: safeString(stop?.suburb) || undefined,
    region: safeString(stop?.region) || undefined,
  };
}

export function mapOriginCitySearch(
  body: ApiDestinationsResponse,
): OriginCitySearchType {
  return {
    name: safeString(body.city_name),
    regionName: safeString(body.region),
    countryName: safeString(body.country_name),
    countryCode: safeString(body.country_code),
    searchDate: safeString(body.search_date),
    searchTime: safeString(body.search_time),
    timezone: safeString(body.timezone),
  };
}

export function mapConnections(
  body: ApiDestinationsResponse,
): ConnectionType[] {
  const rows = Array.isArray(body.results) ? body.results : [];
  return rows.map((row) => ({
    id: safeString(row.id),
    departureDate: safeString(row.departure_date),
    departureTime: safeString(row.departure_time),
    arrivalDate: safeString(row.arrival_date),
    arrivalTime: safeString(row.arrival_time),
    durationInTravel: safeNumber(row.duration_in_travel),
    durationWaiting: safeNumber(row.duration_waiting),
    durationTotal: safeNumber(row.duration_total),
    startingStop: mapStop(row.starting_stop),
    destinationStop: mapStop(row.destination_stop),
  }));
}
