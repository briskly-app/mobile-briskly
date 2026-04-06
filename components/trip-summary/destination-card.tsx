import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Text, View } from "react-native";

import { useAppTheme } from "@/hooks/use-app-theme";
import { DestinationType } from "@/types/destination-type";

interface Props extends DestinationType {}

export default function DestinationCard({
  city,
  image,
  arrivalDate,
  arrivalTime,
  departureDate,
  departureTime,
  stayDays,
}: Props) {
  const { colors } = useAppTheme();

  const title = stayDays ? `${city} (${stayDays} days)` : city;
  const hasDeparture = departureDate && departureTime;

  return (
    <View
      className="flex-row items-center rounded-2xl mb-3 mx-5 border overflow-hidden"
      style={{
        backgroundColor: colors.cardBg,
        borderColor: colors.border,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <View className="flex-1 pr-3 pl-4 py-3">
        <Text
          className="font-semibold text-base mb-2"
          style={{ color: colors.secondary }}
        >
          {title}
        </Text>

        <View className="flex-row items-center gap-1.5 mb-0.5">
          <Feather name="log-in" size={13} color={colors.foreground} />
          <Text className="text-sm" style={{ color: colors.foreground }}>
            {arrivalDate}
            {"  "}
            {arrivalTime}
          </Text>
        </View>

        {hasDeparture && (
          <View className="flex-row items-center gap-1.5">
            <Feather name="log-out" size={13} color={colors.foreground} />
            <Text className="text-sm" style={{ color: colors.foreground }}>
              {departureDate}
              {"  "}
              {departureTime}
            </Text>
          </View>
        )}
      </View>

      <Image
        source={image}
        style={{
          width: 180,
          height: "100%",
          minHeight: 100,
        }}
        contentFit="cover"
        cachePolicy="memory-disk"
      />
    </View>
  );
}
