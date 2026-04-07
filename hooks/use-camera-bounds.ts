import { useMemo } from "react";

export interface GeoCoord {
  longitude: number;
  latitude: number;
}

export interface CameraPadding {
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
}

export interface CameraBounds {
  ne: [number, number];
  sw: [number, number];
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
}

const DEFAULT_PADDING: Required<CameraPadding> = {
  paddingTop: 80,
  paddingBottom: 80,
  paddingLeft: 60,
  paddingRight: 60,
};

export function useCameraBounds(
  activeCoords: GeoCoord[],
  padding?: CameraPadding,
): CameraBounds {
  return useMemo(() => {
    const p = { ...DEFAULT_PADDING, ...padding };

    if (activeCoords.length === 0) {
      return { ne: [180, 85], sw: [-180, -85], ...p };
    }

    const lngs = activeCoords.map((c) => c.longitude);
    const lats = activeCoords.map((c) => c.latitude);

    return {
      ne: [Math.max(...lngs), Math.max(...lats)],
      sw: [Math.min(...lngs), Math.min(...lats)],
      ...p,
    };
  }, [activeCoords, padding]);
}
