import { createUserConnection } from "@/lib/api/connections";
import { createTrip, patchTrip } from "@/lib/api/trips";
import { INCOMPLETE_TRIP_CONNECTION } from "@/lib/constants/messages";
import {
  getActiveTripSlug,
  setActiveTripSlug,
} from "@/lib/storage/active-trip";
import { ConnectionType } from "@/types/stop-type";

function requireConnectionForTrip(connection: ConnectionType): void {
  if (!connection.startingStop?.id || !connection.destinationStop?.id) {
    throw new Error(INCOMPLETE_TRIP_CONNECTION);
  }
  if (!connection.originTimezone?.trim()) {
    throw new Error(INCOMPLETE_TRIP_CONNECTION);
  }
  const gtfs = connection.gtfsTrip?.trim() || connection.id?.trim();
  if (!gtfs) {
    throw new Error(INCOMPLETE_TRIP_CONNECTION);
  }
}

function buildConnectionPayload(
  slug: string,
  connection: ConnectionType,
): Parameters<typeof createUserConnection>[0] {
  const gtfsTrip = connection.gtfsTrip?.trim() || connection.id.trim();
  const timezone = connection.originTimezone!.trim();
  const startingStop = connection.startingStop.id;
  const destinationStop = connection.destinationStop.id;

  return {
    user_trip: slug,
    gtfs_trip: gtfsTrip,
    starting_stop: startingStop,
    destination_stop: destinationStop,
    timezone,
    departure_date: connection.departureDate,
    departure_time: connection.departureTime,
    arrival_date: connection.arrivalDate,
    arrival_time: connection.arrivalTime,
    duration_in_travel: connection.durationInTravel,
    duration_waiting: connection.durationWaiting,
    duration_total: connection.durationTotal,
  };
}

export async function addConnectionToTrip(
  connection: ConnectionType,
  signal?: AbortSignal,
): Promise<{ slug: string }> {
  requireConnectionForTrip(connection);

  let slug = await getActiveTripSlug();

  if (!slug) {
    slug = await createTrip(signal);
    await setActiveTripSlug(slug);
  }

  await createUserConnection(buildConnectionPayload(slug, connection), signal);
  await patchTrip(slug, signal);

  return { slug };
}
