/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "system-ui",
          "sans-serif",
        ],
      },
      colors: {
        apple: {
          bg: "#000000",
          card: "#121214",
          cardHover: "#18181b",
          border: "rgba(255, 255, 255, 0.08)",
          borderHover: "rgba(255, 255, 255, 0.18)",
          textPrimary: "#f5f5f7",
          textSecondary: "#86868b",
          textMuted: "#6e6e73",
          blue: "#2997ff",
          blueHover: "#0077ed",
        },
      },
      transitionTimingFunction: {
        'apple-out': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'apple-in-out': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
    },
  },
  plugins: [],
}
