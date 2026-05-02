import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity } from "react-native";

interface DiscoverButtonProps {
  onPress?: () => void;
  disabled?: boolean;
}

export default function DiscoverButton({
  onPress,
  disabled = false,
}: DiscoverButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={disabled ? 1 : 0.85}
      className="mt-2 rounded-full"
      disabled={disabled}
      style={{
        shadowColor: "#6B0759",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.55,
        shadowRadius: 14,
        elevation: 10,
        opacity: disabled ? 0.6 : 1,
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
