import { useColorScheme } from "nativewind";

import { Themes, ThemeColors } from "@/constants/theme";

export interface AppTheme {
  colors: ThemeColors;
  isDark: boolean;
  toggle: () => void;
  setScheme: (scheme: "light" | "dark" | "system") => void;
}

export function useAppTheme(): AppTheme {
  const { colorScheme, toggleColorScheme, setColorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";
  const colors = isDark ? Themes.dark : Themes.light;

  return {
    colors,
    isDark,
    toggle: toggleColorScheme,
    setScheme: setColorScheme,
  };
}
