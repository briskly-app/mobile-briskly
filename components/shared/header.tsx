import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useNavigation } from "expo-router";
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
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  const handleBackPress = () => {
    if (onBackPress) onBackPress();
    else router.back();
  };

  return (
    <View className="flex-row items-center h-16 mb-4 px-4">
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          alignItems: "center",
        }}
      >
        <Text className="text-lg font-semibold text-briskly-secondary dark:text-briskly-dark-secondary">
          {title}
        </Text>
      </View>

      {canGoBack ? (
        <TouchableOpacity
          onPress={handleBackPress}
          hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.iconColor} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 24 }} />
      )}

      <View className="flex-1" />

      {showThemeToggle && <DarkmodeToggler />}
    </View>
  );
}
