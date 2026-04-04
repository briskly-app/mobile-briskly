import { Colors } from "@/constants/theme";
import { Text, View } from "react-native";

export default function HeaderText({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <View className="mb-10">
      <Text
        className="text-white text-4xl font-bold leading-tight"
        style={{
          textShadowColor: "#000000",
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 24,
        }}
      >
        {title}
      </Text>
      <Text
        className="text-briskly-primaryLight text-5xl font-bold leading-tight"
        style={{
          textShadowColor: Colors.briskly.shadow,
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 24,
        }}
      >
        {subtitle}
      </Text>
    </View>
  );
}
