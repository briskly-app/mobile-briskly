import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import MapLoader from "@/components/shared/map-loader";
import { useAppTheme } from "@/hooks/use-app-theme";
import { GeoCoord, useCameraBounds } from "@/hooks/use-camera-bounds";
import { RouteDefinition, useRouteCache } from "@/hooks/use-route-cache";
import { formatDurationSeconds } from "@/lib/format/duration";
import { ConnectionType } from "@/types/stop-type";

import DestinationMarker from "./markers/destination-marker";
import RouteLine from "./markers/route-line";
import StartMarker from "./markers/start-marker";

let MapboxModule: typeof import("@rnmapbox/maps") | null = null;
try {
  MapboxModule = require("@rnmapbox/maps");
  MapboxModule?.default.setAccessToken(
    process.env.EXPO_PUBLIC_MAPBOX_TOKEN ?? "",
  );
} catch {
  MapboxModule = null;
}

function connectionKey(c: ConnectionType): string {
  return String(c.id);
}

interface Props {
  connections: ConnectionType[];
  selectedConnectionId: string | null;
  onConnectionSelect: (id: string | null) => void;
}

export default function MapBackground({
  connections,
  selectedConnectionId,
  onConnectionSelect,
}: Props) {
  const { isDark } = useAppTheme();

  const originStop = connections[0]?.startingStop;

  const routes = useMemo<RouteDefinition[]>(
    () =>
      connections.map((conn) => ({
        id: connectionKey(conn),
        longStart: conn.startingStop.longitude,
        latStart: conn.startingStop.latitude,
        stops: [],
        longEnd: conn.destinationStop.longitude,
        latEnd: conn.destinationStop.latitude,
      })),
    [connections],
  );

  const { isLoading, getRouteCoords } = useRouteCache(routes);

  const activeCoords = useMemo<GeoCoord[]>(() => {
    if (!originStop) return [];

    if (selectedConnectionId) {
      const routeCoords = getRouteCoords(selectedConnectionId);
      if (routeCoords) {
        return routeCoords.map(([longitude, latitude]) => ({
          longitude,
          latitude,
        }));
      }
      const conn = connections.find(
        (c) => connectionKey(c) === selectedConnectionId,
      );
      if (conn) {
        return [
          {
            longitude: conn.startingStop.longitude,
            latitude: conn.startingStop.latitude,
          },
          {
            longitude: conn.destinationStop.longitude,
            latitude: conn.destinationStop.latitude,
          },
        ];
      }
    }
    return [
      {
        longitude: originStop.longitude,
        latitude: originStop.latitude,
      },
      ...connections.map((c) => ({
        longitude: c.destinationStop.longitude,
        latitude: c.destinationStop.latitude,
      })),
    ];
  }, [selectedConnectionId, connections, originStop, getRouteCoords]);

  const cameraPadding = useMemo(
    () => ({
      paddingTop: selectedConnectionId ? 100 : 80,
      paddingBottom: selectedConnectionId ? 360 : 320,
      paddingLeft: 60,
      paddingRight: 60,
    }),
    [selectedConnectionId],
  );

  const cameraBounds = useCameraBounds(activeCoords, cameraPadding);

  if (!MapboxModule) {
    return (
      <View
        className="absolute inset-0"
        style={{ backgroundColor: isDark ? "#1e293b" : "#cbd5e1" }}
      />
    );
  }

  const {
    MapView,
    Camera,
    MarkerView,
    ShapeSource,
    LineLayer,
  } = MapboxModule as typeof import("@rnmapbox/maps");

  const selectedConn =
    connections.find((c) => connectionKey(c) === selectedConnectionId) ??
    null;
  const routeCoords = getRouteCoords(selectedConnectionId);

  const styleURL = isDark
    ? "mapbox://styles/mapbox/dark-v11"
    : "mapbox://styles/mapbox/light-v11";

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <MapView
        style={[StyleSheet.absoluteFillObject, isLoading && { opacity: 0.25 }]}
        styleURL={styleURL}
      >
        <Camera
          bounds={cameraBounds}
          animationDuration={isLoading ? 0 : 800}
          animationMode="easeTo"
        />

        {routeCoords && (
          <RouteLine
            id="main-route"
            ShapeSource={ShapeSource}
            LineLayer={LineLayer}
            coordinates={routeCoords}
          />
        )}

        {originStop ? (
          <StartMarker
            MarkerView={MarkerView}
            id="from"
            coordinate={[originStop.longitude, originStop.latitude]}
          />
        ) : null}

        {connections.map((conn) => {
          const id = connectionKey(conn);
          const dest = conn.destinationStop;
          return (
            <DestinationMarker
              key={id}
              MarkerView={MarkerView}
              id={id}
              coordinate={[dest.longitude, dest.latitude]}
              arrivalTime={conn.arrivalTime}
              travelTime={formatDurationSeconds(conn.durationInTravel)}
              isSelected={id === selectedConnectionId}
              onPress={() =>
                onConnectionSelect(id === selectedConnectionId ? null : id)
              }
            />
          );
        })}
      </MapView>

      {isLoading && <MapLoader />}
    </View>
  );
}
