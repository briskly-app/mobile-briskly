import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text, View } from "react-native";

import { useAppTheme } from "@/hooks/use-app-theme";
import type { TimelineItemType } from "./timeline-list";

interface Props extends TimelineItemType {
  isLast?: boolean;
}

export default function TimelineItem({
  icon,
  title,
  subtitle,
  isLast = false,
}: Props) {
  const { colors, isDark } = useAppTheme();

  return (
    <View className="flex-row px-5">
      <View className="items-center width-[40px]">
        <View
          className="w-[40px] h-[40px] rounded-full items-center justify-center"
          style={{
            backgroundColor: isDark ? colors.primaryLight : colors.primary,
          }}
        >
          <MaterialIcons
            name={icon as React.ComponentProps<typeof MaterialIcons>["name"]}
            size={20}
            color="white"
          />
        </View>
        {!isLast && (
          <View
            className="w-0.5 flex-1"
            style={{ backgroundColor: colors.border, minHeight: 24 }}
          />
        )}
      </View>

      <View className="flex-1 pl-4" style={{ marginBottom: isLast ? 8 : 24 }}>
        <Text
          className="text-sm font-medium"
          style={{ color: colors.secondary }}
        >
          {title}
        </Text>
        <Text className="text-sm mt-0.5" style={{ color: colors.primary }}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
}
