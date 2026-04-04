import { Colors } from "@/constants/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  text: string;
  onPress: () => void;
}

export default function FooterStickyButton({ text, onPress }: Props) {
  return (
    <View className="absolute bottom-0 left-0 right-0 h-20 items-center bg-briskly-backgroundSecondary">
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
          colors={[Colors.briskly.purpleDark, Colors.briskly.primary]}
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
          <MaterialIcons name="search" size={20} color="white" />
          <Text className="text-white font-semibold text-base">{text}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
