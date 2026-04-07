import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/hooks/use-app-theme";

export default function MapLoader() {
  const { colors } = useAppTheme();

  return (
    <View pointerEvents="none" style={styles.overlay}>
      <View style={styles.pill}>
        <ActivityIndicator size="small" color={colors.purple} />
        <Text style={styles.text}>Loading routes…</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 340,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  text: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});
