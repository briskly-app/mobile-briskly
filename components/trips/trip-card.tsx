import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";

import { Colors } from "@/constants/theme";
import { TripItemType } from "@/types/trip-item-type";

interface Props extends TripItemType {
  onPress?: () => void;
}

export default function TripCard({ title, dateRange, image, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      className="flex-row items-center bg-briskly-backgroundPrimary rounded-2xl px-4 py-3 mb-3 border border-briskly-primaryLight"
      style={{
        shadowColor: Colors.briskly.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
      }}
    >
      <Image
        source={image}
        style={{ width: 72, height: 72, borderRadius: 12 }}
        contentFit="cover"
        cachePolicy="memory-disk"
      />
      <View className="flex-1 ml-4">
        <Text className="text-briskly-secondary font-semibold text-base leading-snug">
          {title}
        </Text>
        <Text className="text-briskly-foreground text-sm mt-1">
          {dateRange}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
