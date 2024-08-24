import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/*/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#7dd3fc",
        primary2: "#26aff0",
        primary3: "#09a4ed",
        secondary2: "#ed2d63",
        secondary3: "#ed1552",
        bgPrimary: "#7dd3fc",
        bgSecondary: "#182233",
      },
    },
  },
  plugins: [],
};
export default config;
