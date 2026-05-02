import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { useAppTheme } from "@/hooks/use-app-theme";
import { formatIsoDateToLong } from "@/lib/format/date";
import { OriginCitySearchType } from "@/types/stop-type";

interface Props {
  origin: OriginCitySearchType | null;
  isLoading?: boolean;
}

export default function SearchBar({ origin, isLoading = false }: Props) {
  const { colors } = useAppTheme();
  const pulse = useSharedValue(0.45);

  useEffect(() => {
    pulse.value = withRepeat(withTiming(1, { duration: 850 }), -1, true);
  }, [pulse]);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulse.value,
  }));

  const fromLine = [origin?.name ?? "", origin?.countryName ?? ""]
    .filter(Boolean)
    .join(", ");
  const dateLabel = origin?.searchDate
    ? formatIsoDateToLong(origin.searchDate)
    : "-";

  if (isLoading) {
    return (
      <View
        className="mx-4 flex-row items-center gap-3 px-4 py-5 rounded-full"
        style={{
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Animated.View
          className="h-8 w-8 rounded-full"
          style={[{ backgroundColor: colors.border }, pulseStyle]}
        />
        <View className="flex-1 gap-2">
          <Animated.View
            className="h-2.5 rounded-full w-20"
            style={[{ backgroundColor: colors.border }, pulseStyle]}
          />
          <Animated.View
            className="h-3.5 rounded-full w-44"
            style={[{ backgroundColor: colors.border }, pulseStyle]}
          />
        </View>
        <Animated.View
          className="h-3.5 rounded-full w-20"
          style={[{ backgroundColor: colors.border }, pulseStyle]}
        />
      </View>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="mx-4 flex-row items-center gap-3 px-4 py-5 rounded-full"
      style={{
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
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
          {fromLine || "-"}
        </Text>
      </View>

      <Text
        className="text-sm font-medium mb-0.5"
        style={{ color: colors.foreground }}
      >
        {`${dateLabel}, ${origin?.searchTime ?? "-"}`}
      </Text>
      <View className="w-px h-5" style={{ backgroundColor: colors.border }} />

      <MaterialIcons name="search" size={20} color={colors.primary} />
    </TouchableOpacity>
  );
}
