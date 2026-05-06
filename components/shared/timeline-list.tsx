import { Text, View } from "react-native";
import Animated from "react-native-reanimated";

import TimelineItem from "@/components/shared/timeline-item";
import { useAppTheme } from "@/hooks/use-app-theme";
import { useSkeletonShimmer } from "@/hooks/use-skeleton-shimmer";
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
  loading?: boolean;
}

const SKELETON_COUNT = 3;

export default function TimelineList({
  title,
  items,
  trailingIcon,
  trailingText,
  loading = false,
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

      {loading
        ? Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <TimelineItemSkeleton
              key={`timeline-skeleton-${index}`}
              isLast={index === SKELETON_COUNT - 1}
            />
          ))
        : items.map((item, index) => (
            <TimelineItem
              key={item.id}
              {...item}
              isLast={index === items.length - 1}
            />
          ))}
    </View>
  );
}

function TimelineItemSkeleton({ isLast }: { isLast: boolean }) {
  const { colors, isDark } = useAppTheme();
  const shimmerStyle = useSkeletonShimmer();

  return (
    <View className="flex-row px-5">
      <View className="items-center width-[40px]">
        <Animated.View
          className="w-[40px] h-[40px] rounded-full"
          style={[
            {
              backgroundColor: isDark ? colors.primaryLight : colors.primary,
            },
            shimmerStyle,
          ]}
        />
        {!isLast && (
          <View
            className="w-0.5 flex-1"
            style={{ backgroundColor: colors.border, minHeight: 24 }}
          />
        )}
      </View>

      <View
        className="flex-1 pl-4 gap-2"
        style={{ marginBottom: isLast ? 8 : 24 }}
      >
        <Animated.View
          className="h-3.5 rounded-full w-2/3"
          style={[{ backgroundColor: colors.border }, shimmerStyle]}
        />
        <Animated.View
          className="h-3 rounded-full w-1/2"
          style={[{ backgroundColor: colors.border }, shimmerStyle]}
        />
      </View>
    </View>
  );
}
