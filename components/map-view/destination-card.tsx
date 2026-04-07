import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { useAppTheme } from "@/hooks/use-app-theme";
import { MapDestinationType } from "@/types/map-destination-type";

interface Props {
  destination: MapDestinationType;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function DestinationCard({
  destination,
  onPress,
  style,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 10,
          elevation: 6,
        },
        style,
      ]}
    >
      <View
        className="rounded-3xl overflow-hidden border"
        style={{ borderColor: colors.border }}
      >
        <View className="h-[180px]">
          <Image
            source={destination.image}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
            cachePolicy="memory-disk"
          />
        </View>

        <View
          className="px-4 pt-3 pb-3.5"
          style={{ backgroundColor: colors.surface }}
        >
          <View className="flex-row items-start justify-between mb-1">
            <View className="flex-1 mr-2">
              <Text
                className="text-base font-bold"
                style={{ color: colors.secondary }}
              >
                {destination.city}
              </Text>
              <Text
                className="text-xs mt-0.5"
                style={{ color: colors.foreground }}
              >
                {destination.region}
              </Text>
            </View>

            <View className="items-end">
              <Text
                className="text-sm font-bold"
                style={{ color: colors.primary }}
              >
                {destination.arrivalTime}
              </Text>
              <View className="flex-row items-center gap-0.5 mt-0.5">
                <MaterialIcons
                  name="schedule"
                  size={11}
                  color={colors.foreground}
                />
                <Text className="text-xs" style={{ color: colors.foreground }}>
                  {destination.travelTime}
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-row items-center gap-1 mb-3">
            <MaterialIcons
              name="location-on"
              size={11}
              color={colors.foreground}
            />
            <Text
              className="text-xs flex-1"
              style={{ color: colors.foreground }}
              numberOfLines={1}
            >
              {destination.address}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
