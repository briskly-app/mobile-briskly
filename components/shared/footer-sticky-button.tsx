import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";

import { useAppTheme } from "@/hooks/use-app-theme";

interface Props {
  icon: string;
  text: string;
  onPress: () => void;
}

export default function FooterStickyButton({ icon, text, onPress }: Props) {
  const { colors } = useAppTheme();

  return (
    <View className="absolute bottom-0 left-0 right-0 h-20 items-center bg-briskly-backgroundSecondary dark:bg-briskly-dark-backgroundSecondary">
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        style={{
          borderRadius: 999,
          overflow: "hidden",
          position: "absolute",
          bottom: 42,
        }}
      >
        <LinearGradient
          colors={[colors.purpleLight, colors.purpleDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 14,
            paddingHorizontal: 32,
            gap: 8,
          }}
        >
          <MaterialIcons
            name={icon as keyof typeof MaterialIcons.glyphMap}
            size={20}
            color="white"
          />
          <Text className="text-white font-semibold text-base">{text}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
