import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07090d",        // deep cinematic background
        coal: "#0c1016",       // panel background
        line: "#1c2430",       // hairlines / blueprint strokes
        gold: "#c8a15a",       // premium accent
        fog: "#9aa7b4",        // muted text
        bone: "#e8e6df",       // primary text
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.35em",
      },
    },
  },
  plugins: [],
};

export default config;
