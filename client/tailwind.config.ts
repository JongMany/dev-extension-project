import type { Config } from "tailwindcss";
import { addDynamicIconSelectors } from "@iconify/tailwind";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        signup: "1fr 3fr 1fr",
      },
      keyframes: {
        glow: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.3",
          },
        },
        gradient: {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "100%": {
            backgroundPosition: "100% 50%",
          },
        },
        pulse: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: ".5",
          },
        },
        bouncing: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: " cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        drop: {
          "0%": {
            transform: "translateY(-50vh)",
            animationTimingFunction: "ease-in",
          },
          "40%": {
            transform: "translateY(-30vh)",
            animationTimingFunction: "ease-in",
          },
          "65%": {
            transform: "translateY(-20vh)",
            animationTimingFunction: "ease-in",
          },
          "82%": {
            transform: "translateY(-10vh)",
            animationTimingFunction: "ease-in",
          },
          "92%": {
            transform: "translateY(-5vh)",
            animationTimingFunction: "ease-in",
          },
          "25%, 55%, 75%, 87%, 97%, 100%": {
            transform: "translateY(0)",
            animationTimingFunction: "ease-out",
          },
        },
        float: {
          "0%": {
            transform: "translate(0, 0px)",
          },
          "50%": {
            transform: "translate(0, 20px)",
          },
          "100%": {
            transform: "translateY(0, -0px)",
          },
        },
      },
      animation: {
        gradient: "gradient 6s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        bouncing: "bouncing 2s infinite ",
        droping: "drop 1.5s cubic-bezier(0, 0, 0.35, 1) forwards",
        floating: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide"), addDynamicIconSelectors()],
};
export default config;
