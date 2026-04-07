const shared = {
  purple: "#9333ea",
  purpleDark: "#7e22ce",
  purpleLight: "#c084fc",
  accent: "#f97316",
  shadow: "rgba(168, 85, 247, 0.9)",
  shadowSoft: "rgba(168, 85, 247, 0.4)",
} as const;

export type SharedColors = typeof shared;

export const Themes = {
  light: {
    ...shared,
    primary: "#4F378A",
    primaryLight: "#E8DEF8",
    secondary: "#1D1B20",
    foreground: "#625B71",
    backgroundPrimary: "#FEF7FF",
    backgroundSecondary: "#EADDFF",
    surface: "#FFFFFF",
    border: "#E8DEF8",
    cardBg: "#FFFFFF",
    iconColor: "#1D1B20",
  },
  dark: {
    ...shared,
    primary: "#D0BCFF",
    primaryLight: "#4F378A",
    secondary: "#E6E0E9",
    foreground: "#CAC4D0",
    backgroundPrimary: "#141218",
    backgroundSecondary: "#211F26",
    surface: "#2B2930",
    border: "#49454F",
    cardBg: "#2B2930",
    iconColor: "#E6E0E9",
  },
} as const;

export type ThemeColors = { readonly [K in keyof typeof Themes.light]: string };

// Backward-compat alias
export const Colors = { briskly: Themes.light };
