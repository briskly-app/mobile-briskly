import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Switch, View } from "react-native";

import { useAppTheme } from "@/hooks/use-app-theme";

interface Props {
  isTransparent?: boolean;
}

export default function DarkmodeToggler({ isTransparent = false }: Props) {
  const { colors, isDark, toggle } = useAppTheme();

  return (
    <View
      className={`absolute right-4 flex-row items-center justify-between ${isTransparent ? "top-[56px] h-12 bg-black/35 rounded-full pl-4 pr-2" : "top-1/2 -translate-y-1/2"}`}
    >
      <MaterialIcons
        name={isDark ? "dark-mode" : "light-mode"}
        size={18}
        color={isTransparent ? "#fff" : colors.foreground}
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
