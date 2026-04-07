import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import MapLoader from "@/components/shared/map-loader";
import { useAppTheme } from "@/hooks/use-app-theme";
import { GeoCoord, useCameraBounds } from "@/hooks/use-camera-bounds";
import { RouteDefinition, useRouteCache } from "@/hooks/use-route-cache";
import {
  MapDestinationType,
  MapFromDestinationType,
} from "@/types/map-destination-type";

import DestinationMarker from "./markers/destination-marker";
import RouteLine from "./markers/route-line";
import StartMarker from "./markers/start-marker";
import StopMarker from "./markers/stop-marker";

let MapboxModule: typeof import("@rnmapbox/maps") | null = null;
try {
  MapboxModule = require("@rnmapbox/maps");
  MapboxModule?.default.setAccessToken(
    process.env.EXPO_PUBLIC_MAPBOX_TOKEN ?? "",
  );
} catch {
  MapboxModule = null;
}

interface Props {
  fromDestination: MapFromDestinationType;
  destinations: MapDestinationType[];
  selectedDestId: string | null;
  onDestSelect: (id: string | null) => void;
}

export default function MapBackground({
  fromDestination,
  destinations,
  selectedDestId,
  onDestSelect,
}: Props) {
  const { isDark } = useAppTheme();

  const routes = useMemo<RouteDefinition[]>(
    () =>
      destinations.map((dest) => ({
        id: dest.id,
        longStart: fromDestination.longitude,
        latStart: fromDestination.latitude,
        stops: (dest.stops ?? []).map((s) => ({
          longitude: s.longitude,
          latitude: s.latitude,
        })),
        longEnd: dest.longitude,
        latEnd: dest.latitude,
      })),
    [destinations, fromDestination],
  );

  const { isLoading, getRouteCoords } = useRouteCache(routes);

  const activeCoords = useMemo<GeoCoord[]>(() => {
    if (selectedDestId) {
      const routeCoords = getRouteCoords(selectedDestId);
      if (routeCoords) {
        return routeCoords.map(([longitude, latitude]) => ({
          longitude,
          latitude,
        }));
      }
      const dest = destinations.find((d) => d.id === selectedDestId);
      if (dest) {
        return [
          {
            longitude: fromDestination.longitude,
            latitude: fromDestination.latitude,
          },
          ...(dest.stops ?? []).map((s) => ({
            longitude: s.longitude,
            latitude: s.latitude,
          })),
          { longitude: dest.longitude, latitude: dest.latitude },
        ];
      }
    }
    return [
      {
        longitude: fromDestination.longitude,
        latitude: fromDestination.latitude,
      },
      ...destinations.map((d) => ({
        longitude: d.longitude,
        latitude: d.latitude,
      })),
    ];
  }, [selectedDestId, destinations, fromDestination, getRouteCoords]);

  const cameraPadding = useMemo(
    () => ({
      paddingTop: selectedDestId ? 100 : 80,
      paddingBottom: selectedDestId ? 360 : 320,
      paddingLeft: 60,
      paddingRight: 60,
    }),
    [selectedDestId],
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
    default: Mapbox,
    MapView,
    Camera,
    MarkerView,
    ShapeSource,
    LineLayer,
  } = MapboxModule as typeof import("@rnmapbox/maps");

  const selectedDest =
    destinations.find((d) => d.id === selectedDestId) ?? null;
  const routeCoords = getRouteCoords(selectedDestId);

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
            ShapeSource={ShapeSource}
            LineLayer={LineLayer}
            coordinates={routeCoords}
          />
        )}

        <StartMarker
          MarkerView={MarkerView}
          id="from"
          coordinate={[fromDestination.longitude, fromDestination.latitude]}
        />

        {destinations.map((dest) => (
          <DestinationMarker
            key={dest.id}
            MarkerView={MarkerView}
            id={dest.id}
            coordinate={[dest.longitude, dest.latitude]}
            arrivalTime={dest.arrivalTime}
            travelTime={dest.travelTime}
            isSelected={dest.id === selectedDestId}
            onPress={() =>
              onDestSelect(dest.id === selectedDestId ? null : dest.id)
            }
          />
        ))}

        {(selectedDest?.stops ?? []).map((stop) => (
          <StopMarker
            key={`stop-${stop.city}`}
            MarkerView={MarkerView}
            id={`stop-${stop.city}`}
            coordinate={[stop.longitude, stop.latitude]}
            arrivalTime={stop.arrivalTime}
          />
        ))}
      </MapView>

      {isLoading && <MapLoader />}
    </View>
  );
}
