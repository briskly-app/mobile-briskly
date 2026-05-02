import { StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/hooks/use-app-theme";

type MapboxTypes = typeof import("@rnmapbox/maps");

interface Props {
  MarkerView: MapboxTypes["MarkerView"];
  id: string;
  coordinate: [number, number];
  number: number;
}

export default function RouteNumberBadge({
  MarkerView,
  id,
  coordinate,
  number,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <MarkerView id={id} coordinate={coordinate}>
      <View
        style={[
          styles.badge,
          { backgroundColor: colors.surface, borderColor: colors.purple },
        ]}
      >
        <Text style={[styles.number, { color: colors.purple }]}>{number}</Text>
      </View>
    </MarkerView>
  );
}

const styles = StyleSheet.create({
  badge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  number: {
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 14,
  },
});
