import { useMutation } from "@tanstack/react-query";

import { addConnectionToTrip } from "@/lib/api/add-connection";
import { ConnectionType } from "@/types/stop-type";

export function useAddConnectionToTripMutation() {
  return useMutation({
    mutationFn: (connection: ConnectionType) => addConnectionToTrip(connection),
  });
}
