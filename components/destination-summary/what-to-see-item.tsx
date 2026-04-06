import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";

import { useAppTheme } from "@/hooks/use-app-theme";
import { WhatToSeeCategory } from "@/types/destination-summary-type";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface Props {
  category: WhatToSeeCategory;
  isLast: boolean;
}

export default function WhatToSeeItem({ category, isLast }: Props) {
  const [expanded, setExpanded] = useState(false);
  const { colors } = useAppTheme();

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={toggle}
        activeOpacity={0.7}
        className="flex-row items-center px-4 py-4"
      >
        <MaterialIcons
          name={category.icon as keyof typeof MaterialIcons.glyphMap}
          size={24}
          color={colors.primary}
          style={{ marginRight: 12 }}
        />
        <Text
          className="flex-1 text-lg font-medium"
          style={{ color: colors.secondary }}
        >
          {category.title}
        </Text>
        <MaterialIcons
          name={expanded ? "expand-less" : "expand-more"}
          size={22}
          color={colors.foreground}
        />
      </TouchableOpacity>

      {expanded && (
        <View className="pb-2">
          {category.items.map((item) => (
            <View key={item.id} className="flex-row items-center px-4 py-3">
              <MaterialIcons
                name="directions-walk"
                size={18}
                color={colors.foreground}
                style={{ marginRight: 12 }}
              />
              <Text
                className="flex-1 text-sm"
                style={{ color: colors.foreground }}
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <Text
                className="text-sm font-medium mr-1"
                style={{ color: colors.primary }}
              >
                {item.distance}
              </Text>
              <MaterialIcons
                name="location-on"
                size={16}
                color={colors.primary}
              />
            </View>
          ))}
        </View>
      )}

      {!isLast && (
        <View
          className="h-px mx-4"
          style={{ backgroundColor: colors.border }}
        />
      )}
    </View>
  );
}
