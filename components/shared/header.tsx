import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import { Colors } from "@/constants/theme";

interface Props {
  title: string;
  onBackPress?: () => void;
}

export default function Header({ title, onBackPress }: Props) {
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    }
    router.back();
  };

  return (
    <View className="flex-row items-center px-4 py-3">
      <TouchableOpacity
        onPress={handleBackPress}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        className="p-1"
      >
        <MaterialIcons
          name="arrow-back"
          size={24}
          color={Colors.briskly.secondary}
        />
      </TouchableOpacity>
      <Text className="flex-1 text-center text-briskly-secondary text-lg font-semibold mr-8">
        {title}
      </Text>
    </View>
  );
}
