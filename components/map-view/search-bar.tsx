import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text, TouchableOpacity, View } from "react-native";

import { useAppTheme } from "@/hooks/use-app-theme";
import { mapFromDestination } from "@/mocks/map-destinations-mocks";

export default function SearchBar() {
  const { colors } = useAppTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="mx-4 flex-row items-center gap-3 px-4 py-5 rounded-full"
      style={{
        backgroundColor: colors.surface,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <MaterialIcons name="my-location" size={18} color={colors.primary} />

      <View className="flex-1">
        <Text
          className="text-[10px] font-medium mb-0.5"
          style={{ color: colors.foreground }}
        >
          From
        </Text>
        <Text
          className="text-sm font-semibold"
          style={{ color: colors.secondary }}
        >
          {mapFromDestination.city}, {mapFromDestination.region}
        </Text>
      </View>

      <Text
        className="text-sm font-medium mb-0.5"
        style={{ color: colors.foreground }}
      >
        {mapFromDestination.departureDate}, {mapFromDestination.departureTime}
      </Text>
      <View className="w-px h-5" style={{ backgroundColor: colors.border }} />

      <MaterialIcons name="search" size={20} color={colors.primary} />
    </TouchableOpacity>
  );
}
