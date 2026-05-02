import { Text, View } from "react-native";

import { useAppTheme } from "@/hooks/use-app-theme";

interface Props {
  title: string;
  subtitle?: string;
  center?: boolean;
  textSize?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl";
}

export default function SectionHeader({
  title,
  subtitle,
  center = false,
  textSize = "3xl",
}: Props) {
  const { colors } = useAppTheme();

  return (
    <View className="px-5 pt-2 pb-4">
      <Text
        className={`text-${textSize} font-bold leading-tight mb-1 ${center ? "text-center" : ""}`}
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
