/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        briskly: {
          primary: "#4F378A",
          primaryLight: "#E8DEF8",
          secondary: "#1D1B20",
          foreground: "#625B71",
          backgroundPrimary: "#FFFFFF",
          backgroundSecondary: "#EADDFF",
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
