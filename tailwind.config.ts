import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#07070A",
          card: "#0E0E12",
          fg: "#EDEDED",
          dim: "#B8B8B8",
          accent: "#9b5cff",
          accent2: "#00E5FF"
        }
      },
      boxShadow: {
        soft: "0 10px 40px rgba(0,0,0,0.35)",
        glow: "0 0 80px rgba(155,92,255,0.25)"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem"
      },
      backgroundImage: {
        'radial-fade': "radial-gradient(800px 400px at 20% -10%, rgba(155,92,255,0.25), transparent 60%), radial-gradient(800px 400px at 80% 10%, rgba(0,229,255,0.2), transparent 60%)"
      }
    },
    fontFamily: {
      sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial", "Noto Sans", "sans-serif"]
    }
  },
  plugins: []
}
export default config
