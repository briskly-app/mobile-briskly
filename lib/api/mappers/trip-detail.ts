import { formatIsoDateToLong, normalizeTimeForSearch } from "@/lib/format/date";
import { formatDurationSeconds } from "@/lib/format/duration";
import { DestinationType } from "@/types/destination-type";
import { TripStatType, TripSummaryType } from "@/types/trip-summary-type";

export type TripNextLegSearchParams = {
  fromCity: string;
  date: string;
  time: string;
  timezone: string;
};

export type TripDetailType = {
  slug: string;
  name: string;
  startDate: string;
  endDate: string;
  thumbnailUrl?: string;
};

export type ApiTripDetail = {
  slug?: string;
  name?: string;
  start_date?: string;
  end_date?: string;
  thumbnail_url?: string;
  created_at?: string;
};

export type ApiTripStop = {
  stop_id?: string;
  stop_name?: string;
  city_id?: string;
  city_name?: string;
  region?: string;
  longitude?: number;
  latitude?: number;
  thumbnail_url?: string;
  timezone?: string;
};

export type ApiTripConnection = {
  id?: number | string;
  user_trip?: string;
  gtfs_trip?: string;
  starting_stop?: ApiTripStop;
  destination_stop?: ApiTripStop;
  timezone?: string;
  departure_date?: string;
  departure_time?: string;
  arrival_date?: string;
  arrival_time?: string;
  duration_in_travel?: number;
  duration_waiting?: number;
  duration_total?: number;
};

function safeTrim(value: unknown): string {
  return String(value ?? "").trim();
}

function safeNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function isoDateToUtc(dateIso: string): Date | null {
  const [y, m, d] = dateIso.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(Date.UTC(y, m - 1, d));
}

function calendarDayDiff(startIso: string, endIso: string): number | null {
  const start = isoDateToUtc(startIso);
  const end = isoDateToUtc(endIso);
  if (!start || !end) return null;
  const diffMs = end.getTime() - start.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

function trimTime(value: string): string {
  return normalizeTimeForSearch(value);
}

export function mapApiTripDetail(body: unknown): TripDetailType | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as ApiTripDetail;
  const slug = safeTrim(raw.slug);
  if (!slug) return null;

  return {
    slug,
    name: safeTrim(raw.name),
    startDate: safeTrim(raw.start_date),
    endDate: safeTrim(raw.end_date),
    thumbnailUrl: safeTrim(raw.thumbnail_url) || undefined,
  };
}

export function mapApiTripConnections(body: unknown): ApiTripConnection[] {
  if (!Array.isArray(body)) return [];
  return body.filter(
    (row): row is ApiTripConnection =>
      Boolean(row) && typeof row === "object",
  );
}

export function mapTripConnectionsToNextLegSearchParams(
  body: unknown,
): TripNextLegSearchParams | null {
  const connections = mapApiTripConnections(body);
  if (connections.length === 0) return null;

  const last = connections[connections.length - 1];
  const dest = last.destination_stop;
  const fromCity = safeTrim(dest?.city_id);
  const date = safeTrim(last.arrival_date);
  const time = trimTime(safeTrim(last.arrival_time));
  const timezone = safeTrim(last.timezone ?? dest?.timezone);

  if (!fromCity || !date || !time || !timezone) return null;
  return { fromCity, date, time, timezone };
}

function buildDestinations(
  connections: ApiTripConnection[],
): DestinationType[] {
  if (connections.length === 0) return [];

  const destinations: DestinationType[] = [];

  const first = connections[0];
  const startStop = first.starting_stop;
  const startDepartureDateIso = safeTrim(first.departure_date);
  const startDepartureDate = startDepartureDateIso
    ? formatIsoDateToLong(startDepartureDateIso)
    : "";

  destinations.push({
    id: `dest-start-${safeTrim(startStop?.stop_id) || "0"}`,
    city: safeTrim(startStop?.city_name) || safeTrim(startStop?.stop_name),
    image: startStop?.thumbnail_url
      ? { uri: startStop.thumbnail_url }
      : undefined,
    departureDate: startDepartureDate || undefined,
    departureTime: trimTime(safeTrim(first.departure_time)) || undefined,
    longitude: safeNumber(startStop?.longitude),
    latitude: safeNumber(startStop?.latitude),
  });

  connections.forEach((conn, index) => {
    const dest = conn.destination_stop;
    const arrivalIso = safeTrim(conn.arrival_date);
    const arrivalDate = arrivalIso ? formatIsoDateToLong(arrivalIso) : "";
    const arrivalTime = trimTime(safeTrim(conn.arrival_time));

    const next = connections[index + 1];
    const nextDepartureIso = next ? safeTrim(next.departure_date) : "";
    const nextDepartureDate = nextDepartureIso
      ? formatIsoDateToLong(nextDepartureIso)
      : "";
    const nextDepartureTime = next
      ? trimTime(safeTrim(next.departure_time))
      : "";

    let stayDays: number | undefined;
    if (arrivalIso && nextDepartureIso) {
      const dayDiff = calendarDayDiff(arrivalIso, nextDepartureIso);
      if (dayDiff != null && dayDiff > 0) {
        stayDays = dayDiff + 1;
      }
    }

    destinations.push({
      id: `dest-${conn.id ?? index}-${safeTrim(dest?.stop_id) || index}`,
      city: safeTrim(dest?.city_name) || safeTrim(dest?.stop_name),
      image: dest?.thumbnail_url ? { uri: dest.thumbnail_url } : undefined,
      arrivalDate: arrivalDate || undefined,
      arrivalTime: arrivalTime || undefined,
      departureDate: nextDepartureDate || undefined,
      departureTime: nextDepartureTime || undefined,
      stayDays,
      longitude: safeNumber(dest?.longitude),
      latitude: safeNumber(dest?.latitude),
    });
  });

  return destinations;
}

function buildStats(connections: ApiTripConnection[]): TripStatType[] {
  const totalTravelSeconds = connections.reduce(
    (sum, c) => sum + safeNumber(c.duration_in_travel),
    0,
  );

  const tripStartIso = safeTrim(connections[0]?.departure_date);
  const tripEndIso = safeTrim(
    connections[connections.length - 1]?.arrival_date,
  );
  const totalDurationSeconds = computeTotalTripSeconds(
    tripStartIso,
    safeTrim(connections[0]?.departure_time),
    tripEndIso,
    safeTrim(connections[connections.length - 1]?.arrival_time),
  );

  const exploringSeconds = Math.max(
    0,
    totalDurationSeconds - totalTravelSeconds,
  );

  return [
    {
      id: "stat-travel",
      icon: "schedule",
      label: "Total time in travel",
      value: formatDurationSeconds(totalTravelSeconds),
    },
    {
      id: "stat-exploring",
      icon: "directions-walk",
      label: "Total time for exploring new places",
      value: formatDurationSeconds(exploringSeconds),
    },
    {
      id: "stat-attractions",
      icon: "visibility",
      label: "Attractions that bring your attention",
      value: `You explored almost ${connections.length * 12} on your way`,
    },
  ];
}

function computeTotalTripSeconds(
  startDateIso: string,
  startTime: string,
  endDateIso: string,
  endTime: string,
): number {
  if (!startDateIso || !endDateIso) return 0;

  const start = parseIsoDateTime(startDateIso, startTime);
  const end = parseIsoDateTime(endDateIso, endTime);
  if (!start || !end) return 0;

  return Math.max(0, Math.round((end.getTime() - start.getTime()) / 1000));
}

function parseIsoDateTime(dateIso: string, time: string): Date | null {
  const date = isoDateToUtc(dateIso);
  if (!date) return null;
  const [hh, mm, ss] = (time || "00:00:00").split(":").map(Number);
  if (Number.isFinite(hh)) date.setUTCHours(hh ?? 0);
  if (Number.isFinite(mm)) date.setUTCMinutes(mm ?? 0);
  if (Number.isFinite(ss)) date.setUTCSeconds(ss ?? 0);
  return date;
}

export function buildTripSummary(
  detail: TripDetailType,
  connections: ApiTripConnection[],
): TripSummaryType {
  const startDate = detail.startDate
    ? formatIsoDateToLong(detail.startDate)
    : "";
  const endDate = detail.endDate ? formatIsoDateToLong(detail.endDate) : "";

  return {
    id: detail.slug,
    title: detail.name,
    startDate,
    endDate,
    destinations: buildDestinations(connections),
    stats: buildStats(connections),
  };
}
