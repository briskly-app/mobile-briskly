import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity } from "react-native";

interface DiscoverButtonProps {
  onPress?: () => void;
}

export default function DiscoverButton({ onPress }: DiscoverButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="mt-2 rounded-full"
      style={{
        shadowColor: "#6B0759",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.55,
        shadowRadius: 14,
        elevation: 10,
      }}
    >
      <LinearGradient
        colors={["#6B0759", "#4F378A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="py-5 px-8 items-center justify-center rounded-full overflow-hidden"
      >
        <Text className="text-white text-base font-semibold tracking-wide">
          Discover Locations
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
