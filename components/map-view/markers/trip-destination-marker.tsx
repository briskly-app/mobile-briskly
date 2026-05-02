import { StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/hooks/use-app-theme";

type MapboxTypes = typeof import("@rnmapbox/maps");

export interface VisitLabel {
  dateShort: string;
  time: string;
  stayDays?: number;
}

interface Props {
  MarkerView: MapboxTypes["MarkerView"];
  id: string;
  coordinate: [number, number];
  visits: VisitLabel[];
}

export default function TripDestinationMarker({
  MarkerView,
  id,
  coordinate,
  visits,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <MarkerView id={id} coordinate={coordinate}>
      <View style={styles.container}>
        <View style={[styles.bubble, { backgroundColor: colors.purple }]}>
          {visits.map((visit, i) => (
            <View key={i} style={[i > 0 && styles.visitDivider]}>
              <Text style={styles.line}>
                <Text style={styles.dateTime}>
                  {visit.dateShort} {visit.time}
                </Text>
                {visit.stayDays != null && (
                  <Text style={styles.stayDays}> ({visit.stayDays} days)</Text>
                )}
              </Text>
            </View>
          ))}
        </View>
        <View style={[styles.pointer, { borderTopColor: colors.purple }]} />
      </View>
    </MarkerView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  bubble: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 10,
    minWidth: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  visitDivider: {
    marginTop: 3,
    paddingTop: 3,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(255,255,255,0.35)",
  },
  line: {
    textAlign: "center",
  },
  dateTime: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  stayDays: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 11,
    fontWeight: "500",
  },
  pointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 7,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
});
