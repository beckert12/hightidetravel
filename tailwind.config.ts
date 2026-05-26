import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0d1550",
          deep: "#0d1550",
          900: "#0a1142",
          800: "#0d1550",
          700: "#152069",
        },
        royal: {
          DEFAULT: "#1e3aaa",
          light: "#2a4bc8",
        },
        sky: {
          accent: "#38bdf8",
        },
        gold: {
          DEFAULT: "#f0b429",
          light: "#f7c948",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.18), transparent 45%), radial-gradient(circle at 85% 30%, rgba(30,58,170,0.45), transparent 50%), linear-gradient(160deg, #0a1142 0%, #0d1550 55%, #152069 100%)",
        "tide-gradient":
          "linear-gradient(135deg, #1e3aaa 0%, #38bdf8 100%)",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(56,189,248,0.45)",
        card: "0 10px 40px -12px rgba(8,12,40,0.6)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
