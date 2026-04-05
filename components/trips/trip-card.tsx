import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";

import { useAppTheme } from "@/hooks/use-app-theme";
import { TripItemType } from "@/types/trip-item-type";

interface Props extends TripItemType {
  onPress?: () => void;
}

export default function TripCard({ title, dateRange, image, onPress }: Props) {
  const { colors } = useAppTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      className="flex-row items-center rounded-2xl px-4 py-3 mb-3 border"
      style={{
        backgroundColor: colors.cardBg,
        borderColor: colors.border,
        shadowColor: colors.shadow,
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
        <Text className="font-semibold text-base leading-snug text-briskly-secondary dark:text-briskly-dark-secondary">
          {title}
        </Text>
        <Text className="text-sm mt-1 text-briskly-foreground dark:text-briskly-dark-foreground">
          {dateRange}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
