/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        foreground: "#f4f4f5",
        muted: "#27272a",
        "muted-foreground": "#a1a1aa",
        primary: {
          DEFAULT: "#00f0ff",
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#8b5cf6",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#121216",
          border: "#1f1f23",
        },
      },
    },
  },
  plugins: [],
};
