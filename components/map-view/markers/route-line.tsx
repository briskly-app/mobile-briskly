import { useAppTheme } from "@/hooks/use-app-theme";

type MapboxTypes = typeof import("@rnmapbox/maps");

interface Props {
  ShapeSource: MapboxTypes["ShapeSource"];
  LineLayer: MapboxTypes["LineLayer"];
  coordinates: number[][];
  color?: string;
}

export default function RouteLine({
  ShapeSource,
  LineLayer,
  coordinates,
  color,
}: Props) {
  const { colors } = useAppTheme();
  const lineColor = color ?? colors.purple;

  const shape: GeoJSON.Feature<GeoJSON.LineString> = {
    type: "Feature",
    geometry: { type: "LineString", coordinates },
    properties: {},
  };

  return (
    <ShapeSource id="routeSource" shape={shape}>
      <LineLayer
        id="routeShadow"
        style={{
          lineColor: "#000",
          lineWidth: 6,
          lineOpacity: 0.15,
          lineCap: "round",
          lineJoin: "round",
        }}
      />
      <LineLayer
        id="routeLine"
        style={{
          lineColor,
          lineWidth: 4,
          lineOpacity: 0.9,
          lineCap: "round",
          lineJoin: "round",
        }}
      />
    </ShapeSource>
  );
}
