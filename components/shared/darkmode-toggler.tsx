import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Switch, View } from "react-native";

import { useAppTheme } from "@/hooks/use-app-theme";
export default function DarkmodeToggler() {
  const { colors, isDark, toggle } = useAppTheme();

  return (
    <View className="absolute right-4 top-1/2 -translate-y-1/2 flex-row items-center gap-1">
      <MaterialIcons
        name={isDark ? "dark-mode" : "light-mode"}
        size={18}
        color={colors.foreground}
      />
      <Switch
        value={isDark}
        onValueChange={toggle}
        trackColor={{ false: colors.primaryLight, true: colors.primary }}
        thumbColor={isDark ? colors.purpleLight : colors.surface}
      />
    </View>
  );
}
