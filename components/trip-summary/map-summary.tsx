import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import RouteLine from "@/components/map-view/markers/route-line";
import RouteNumberBadge from "@/components/map-view/markers/route-number-badge";
import TripDestinationMarker, {
  VisitLabel,
} from "@/components/map-view/markers/trip-destination-marker";
import MapLoader from "@/components/shared/map-loader";
import { useAppTheme } from "@/hooks/use-app-theme";
import { GeoCoord, useCameraBounds } from "@/hooks/use-camera-bounds";
import { RouteDefinition, useRouteCache } from "@/hooks/use-route-cache";
import { DestinationType } from "@/types/destination-type";

let MapboxModule: typeof import("@rnmapbox/maps") | null = null;
try {
  MapboxModule = require("@rnmapbox/maps");
  MapboxModule?.default.setAccessToken(
    process.env.EXPO_PUBLIC_MAPBOX_TOKEN ?? "",
  );
} catch {
  MapboxModule = null;
}

interface LocationPin {
  id: string;
  coordinate: [number, number];
  city: string;
  visits: VisitLabel[];
}

function buildLocationPins(destinations: DestinationType[]): LocationPin[] {
  const map = new Map<string, LocationPin>();

  destinations.forEach((dest) => {
    const key = `${dest.longitude.toFixed(4)},${dest.latitude.toFixed(4)}`;

    if (!map.has(key)) {
      map.set(key, {
        id: `pin-${key}`,
        coordinate: [dest.longitude, dest.latitude],
        city: dest.city,
        visits: [],
      });
    }

    const dateShort = dest.arrivalDate.split(" ").slice(0, 2).join(" ");
    map.get(key)!.visits.push({
      dateShort,
      time: dest.arrivalTime,
      stayDays: dest.stayDays,
    });
  });

  return Array.from(map.values());
}

interface Props {
  destinations: DestinationType[];
}

export default function MapSummary({ destinations }: Props) {
  const { isDark } = useAppTheme();

  const routes = useMemo<RouteDefinition[]>(
    () =>
      destinations.slice(0, -1).map((dest, i) => ({
        id: `r${i + 1}`,
        longStart: dest.longitude,
        latStart: dest.latitude,
        stops: [],
        longEnd: destinations[i + 1].longitude,
        latEnd: destinations[i + 1].latitude,
      })),
    [destinations],
  );

  const { isLoading, getRouteCoords, routeCache } = useRouteCache(routes);

  const allCoords = useMemo<GeoCoord[]>(
    () =>
      destinations.map((d) => ({
        longitude: d.longitude,
        latitude: d.latitude,
      })),
    [destinations],
  );

  const cameraBounds = useCameraBounds(allCoords, {
    paddingTop: 48,
    paddingBottom: 48,
    paddingLeft: 48,
    paddingRight: 48,
  });

  const locationPins = useMemo(
    () => buildLocationPins(destinations),
    [destinations],
  );

  const routeBadges = useMemo(
    () =>
      routes.map((route, i) => {
        const coords = getRouteCoords(route.id);
        const midCoord =
          coords && coords.length > 0
            ? (coords[Math.floor(coords.length / 2)] as [number, number])
            : ([
                (route.longStart + route.longEnd) / 2,
                (route.latStart + route.latEnd) / 2,
              ] as [number, number]);

        return { id: `badge-${i + 1}`, coordinate: midCoord, number: i + 1 };
      }),
    [routes, routeCache],
  );

  if (!MapboxModule) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: isDark ? "#1e293b" : "#cbd5e1" },
        ]}
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

  const styleURL = isDark
    ? "mapbox://styles/mapbox/dark-v11"
    : "mapbox://styles/mapbox/light-v11";

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        styleURL={styleURL}
        pitchEnabled={false}
        rotateEnabled={false}
        compassEnabled={false}
        scaleBarEnabled={false}
        attributionEnabled={false}
        logoEnabled={false}
      >
        <Camera bounds={cameraBounds} animationDuration={0} />

        {/* Route lines */}
        {routes.map((route) => {
          const coords = getRouteCoords(route.id);
          if (!coords) return null;
          return (
            <RouteLine
              key={route.id}
              id={route.id}
              ShapeSource={ShapeSource}
              LineLayer={LineLayer}
              coordinates={coords}
            />
          );
        })}

        {/* Route number badges */}
        {routeBadges.map((badge) => (
          <RouteNumberBadge
            key={badge.id}
            MarkerView={MarkerView}
            id={badge.id}
            coordinate={badge.coordinate}
            number={badge.number}
          />
        ))}

        {/* Destination pins  */}
        {locationPins.map((pin) => (
          <TripDestinationMarker
            key={pin.id}
            MarkerView={MarkerView}
            id={pin.id}
            coordinate={pin.coordinate}
            visits={pin.visits}
          />
        ))}
      </MapView>

      {isLoading && <MapLoader />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 260,
    marginBottom: 16,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: "hidden",
  },
});
