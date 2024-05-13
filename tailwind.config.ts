import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./page-modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        custom: "0px 4px 15px -3px rgba(0, 0, 0, 0.25)",
      },
      fontFamily: {
        main: "Sen",
      },
      colors: {
        customRed: "#EC2719",
        customBlue: "#142D53",
        customWhite: "white",
      },
    },
  },
  plugins: [],
};
export default config;
