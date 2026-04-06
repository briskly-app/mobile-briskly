import { Text, View } from "react-native";

import TimelineItem from "@/components/shared/timeline-item";
import { useAppTheme } from "@/hooks/use-app-theme";
import { MaterialIcons } from "@expo/vector-icons";

export interface TimelineItemType {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
}

interface Props {
  title: string;
  items: TimelineItemType[];
  trailingIcon?: string;
  trailingText?: string;
}

export default function TimelineList({
  title,
  items,
  trailingIcon,
  trailingText,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <View className="mb-6">
      <View
        className={`flex-row items-center pt-2 pb-10 px-4 ${trailingText ? "justify-between" : "justify-center"}`}
      >
        <Text
          className={`text-center font-bold text-2xl `}
          style={{ color: trailingText ? colors.secondary : colors.primary }}
        >
          {title}
        </Text>
        <View className="flex-row items-center gap-1">
          {trailingIcon && (
            <MaterialIcons
              name={trailingIcon as keyof typeof MaterialIcons.glyphMap}
              size={24}
              color={colors.primary}
            />
          )}
          {trailingText && (
            <Text
              className="text-center text-sm"
              style={{ color: colors.primary }}
            >
              {trailingText}
            </Text>
          )}
        </View>
      </View>
      {/* <Text
        className="text-center text-xl font-bold px-6 pt-2 pb-10"
        style={{ color: colors.primary }}
      >
        {title}
      </Text> */}

      {items.map((item, index) => (
        <TimelineItem
          key={item.id}
          {...item}
          isLast={index === items.length - 1}
        />
      ))}
    </View>
  );
}
