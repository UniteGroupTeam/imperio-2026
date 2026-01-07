import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        onyx: {
          DEFAULT: "#09090b", // Deep rich black
          50: "#f5f5f7",
          100: "#eaeaef",
          200: "#d1d1d8",
          300: "#a9a9b6",
          400: "#808093",
          500: "#606073",
          600: "#4b4b5a",
          700: "#3d3d49",
          800: "#32323b",
          900: "#2a2a30",
          950: "#09090b",
        },
        gold: {
          DEFAULT: "#D4AF37", // Metallic Gold
          50: "#fcfaf3",
          100: "#f8f3e3",
          200: "#efe3c3",
          300: "#e4cd96",
          400: "#d7b464",
          500: "#cc9e3f",
          600: "#b07f30",
          700: "#8d5f29",
          800: "#754d28",
          900: "#614026",
          950: "#372213",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glass": "linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
