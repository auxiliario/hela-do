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
        hela: {
          pink: "#FF3B7A",
          peach: "#FFB088",
          cream: "#FFF5EB",
          dark: "#1A0A1F",
          purple: "#2D1B36",
          mint: "#3BFFC0",
          yellow: "#FFD93D",
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "sans-serif"],
        body: ['"DM Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
