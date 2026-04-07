import { StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/hooks/use-app-theme";

type MapboxTypes = typeof import("@rnmapbox/maps");

interface Props {
  MarkerView: MapboxTypes["MarkerView"];
  id: string;
  coordinate: [number, number];
  arrivalTime: string;
}

export default function StopMarker({
  MarkerView,
  id,
  coordinate,
  arrivalTime,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <MarkerView id={id} coordinate={coordinate}>
      <View style={styles.container}>
        <View style={[styles.bubble, { backgroundColor: colors.accent }]}>
          <Text style={styles.time}>{arrivalTime}</Text>
        </View>
        <View style={[styles.pointer, { borderTopColor: colors.accent }]} />
      </View>
    </MarkerView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  bubble: {
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
  },
  time: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  pointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 6,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
});
