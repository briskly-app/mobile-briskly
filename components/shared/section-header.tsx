import { Text, View } from "react-native";

import { useAppTheme } from "@/hooks/use-app-theme";

interface Props {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: Props) {
  const { colors } = useAppTheme();

  return (
    <View className="px-5 pt-2 pb-4">
      <Text
        className="text-3xl font-bold leading-tight mb-1"
        style={{ color: colors.primary }}
      >
        {title}
      </Text>
      {subtitle && (
        <Text className="text-sm" style={{ color: colors.foreground }}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}
