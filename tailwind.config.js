/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        briskly: {
          // Light theme
          primary: "#4F378A",
          primaryLight: "#E8DEF8",
          secondary: "#1D1B20",
          foreground: "#625B71",
          backgroundPrimary: "#FEF7FF",
          backgroundSecondary: "#EADDFF",
          surface: "#FFFFFF",
          border: "#E8DEF8",
          cardBg: "#FFFFFF",

          // Dark theme
          "dark-primary": "#D0BCFF",
          "dark-primaryLight": "#4F378A",
          "dark-secondary": "#E6E0E9",
          "dark-foreground": "#CAC4D0",
          "dark-backgroundPrimary": "#141218",
          "dark-backgroundSecondary": "#211F26",
          "dark-surface": "#2B2930",
          "dark-border": "#49454F",
          "dark-cardBg": "#2B2930",

          // Shared
          purple: "#9333ea",
          "purple-dark": "#6b21a8",
          "purple-light": "#c084fc",
          shadow: "rgba(168, 85, 247, 0.9)",
          "shadow-soft": "rgba(168, 85, 247, 0.4)",
        },
      },
    },
  },
  plugins: [],
};
