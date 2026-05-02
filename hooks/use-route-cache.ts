import { useEffect, useState } from "react";

export interface RouteStop {
  longitude: number;
  latitude: number;
}

export interface RouteDefinition {
  id: string;
  longStart: number;
  latStart: number;
  stops: RouteStop[];
  longEnd: number;
  latEnd: number;
}

export type RouteGeometry = number[][];

export type RouteCache = Record<string, RouteGeometry>;

export interface UseRouteCacheResult {
  routeCache: RouteCache;
  isLoading: boolean;
  getRouteCoords: (id: string | null) => RouteGeometry | null;
}

export function useRouteCache(routes: RouteDefinition[]): UseRouteCacheResult {
  const [routeCache, setRouteCache] = useState<RouteCache>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = process.env.EXPO_PUBLIC_MAPBOX_TOKEN ?? "";

    const fetchAll = async () => {
      const entries = await Promise.all(
        routes.map(async (route) => {
          try {
            const waypoints: [number, number][] = [
              [route.longStart, route.latStart],
              ...route.stops.map(
                (s) => [s.longitude, s.latitude] as [number, number],
              ),
              [route.longEnd, route.latEnd],
            ];
            const coordsStr = waypoints.map((w) => w.join(",")).join(";");
            const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordsStr}?geometries=geojson&overview=full&access_token=${token}`;

            const res = await fetch(url);
            const data = await res.json();
            const coords = data?.routes?.[0]?.geometry?.coordinates as
              | RouteGeometry
              | undefined;

            return [route.id, coords ?? null] as const;
          } catch {
            return [route.id, null] as const;
          }
        }),
      );

      const cache: RouteCache = {};
      entries.forEach(([id, coords]) => {
        if (coords) cache[id] = coords;
      });
      setRouteCache(cache);
      setIsLoading(false);
    };

    fetchAll();
  }, [routes]);

  const getRouteCoords = (id: string | null): RouteGeometry | null => {
    if (!id) return null;
    return routeCache[id] ?? null;
  };

  return { routeCache, isLoading, getRouteCoords };
}
