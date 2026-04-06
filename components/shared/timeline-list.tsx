import { Text, View } from "react-native";

import TimelineItem from "@/components/shared/timeline-item";
import { useAppTheme } from "@/hooks/use-app-theme";

export interface TimelineItemType {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
}

interface Props {
  title: string;
  items: TimelineItemType[];
}

export default function TimelineList({ title, items }: Props) {
  const { colors } = useAppTheme();

  return (
    <View className="mb-6">
      <Text
        className="text-center text-xl font-bold px-6 pt-2 pb-10"
        style={{ color: colors.primary }}
      >
        {title}
      </Text>

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
