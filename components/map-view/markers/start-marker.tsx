import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, View } from "react-native";

import { useAppTheme } from "@/hooks/use-app-theme";

type MapboxTypes = typeof import("@rnmapbox/maps");

interface Props {
  MarkerView: MapboxTypes["MarkerView"];
  id: string;
  coordinate: [number, number];
}

export default function StartMarker({ MarkerView, id, coordinate }: Props) {
  const { colors } = useAppTheme();

  return (
    <MarkerView id={id} coordinate={coordinate}>
      <View
        style={[
          styles.marker,
          {
            backgroundColor: colors.primaryLight,
            borderColor: colors.primary,
          },
        ]}
      >
        <MaterialIcons name="directions-bus" size={16} color={colors.primary} />
      </View>
    </MarkerView>
  );
}

const styles = StyleSheet.create({
  marker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
});
