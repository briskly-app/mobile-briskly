import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import DarkmodeToggler from "@/components/shared/darkmode-toggler";
import { useAppTheme } from "@/hooks/use-app-theme";

interface Props {
  title: string;
  onBackPress?: () => void;
  showThemeToggle?: boolean;
}

export default function Header({
  title,
  onBackPress,
  showThemeToggle = false,
}: Props) {
  const { colors } = useAppTheme();

  const handleBackPress = () => {
    if (onBackPress) onBackPress();
    else router.back();
  };

  return (
    <View className="relative h-16 mb-4">
      <TouchableOpacity
        onPress={handleBackPress}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        className="absolute left-4 top-1/2 -translate-y-1/2"
      >
        <MaterialIcons name="arrow-back" size={24} color={colors.iconColor} />
      </TouchableOpacity>

      <Text className="text-center text-lg font-semibold absolute left-0 right-0 top-1/2 -translate-y-1/2 text-briskly-secondary dark:text-briskly-dark-secondary">
        {title}
      </Text>

      {showThemeToggle && <DarkmodeToggler />}
    </View>
  );
}
