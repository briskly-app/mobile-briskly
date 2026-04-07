import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useAppTheme } from "@/hooks/use-app-theme";

type MapboxTypes = typeof import("@rnmapbox/maps");

interface Props {
  MarkerView: MapboxTypes["MarkerView"];
  id: string;
  coordinate: [number, number];
  arrivalTime: string;
  travelTime: string;
  isSelected: boolean;
  onPress: () => void;
}

export default function DestinationMarker({
  MarkerView,
  id,
  coordinate,
  arrivalTime,
  travelTime,
  isSelected,
  onPress,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <MarkerView id={id} coordinate={coordinate}>
      <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
        <View style={styles.container}>
          <View
            style={[
              styles.bubble,
              { backgroundColor: colors.purple },
              isSelected && {
                backgroundColor: colors.purpleDark,
                borderWidth: 2,
                borderColor: colors.surface,
              },
            ]}
          >
            <Text style={styles.time}>{arrivalTime}</Text>
            <Text style={styles.duration}> ({travelTime})</Text>
          </View>
          <View
            style={[
              styles.pointer,
              { borderTopColor: colors.purple },
              isSelected && { borderTopColor: colors.purpleDark },
            ]}
          />
        </View>
      </TouchableOpacity>
    </MarkerView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  bubble: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
    minWidth: 40,
    minHeight: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  time: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  duration: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
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
