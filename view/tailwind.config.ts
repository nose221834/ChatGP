import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");

const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    colors: {
      basecolor: "#FDF0D1",
      primarycolor: "#AC7D88",
      secondarycolor: "#85586F",
      accentcolor: "#643843",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "vibrate-1": "vibrate-1 0.5s linear infinite both",
        heartbeat: "heartbeat 1.5s ease infinite both",
        "jello-horizontal": "jello-horizontal 0.8s ease infinite  both",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "vibrate-1": {
          "0%,to": {
            transform: "translate(0)",
          },
          "20%": {
            transform: "translate(-2px, 2px)",
          },
          "40%": {
            transform: "translate(-2px, -2px)",
          },
          "60%": {
            transform: "translate(2px, 2px)",
          },
          "80%": {
            transform: "translate(2px, -2px)",
          },
        },
        heartbeat: {
          "0%": {
            transform: "scale(1)",
            "transform-origin": "center center",
            "animation-timing-function": "ease-out",
          },
          "10%": {
            transform: "scale(.91)",
            "animation-timing-function": "ease-in",
          },
          "17%": {
            transform: "scale(.98)",
            "animation-timing-function": "ease-out",
          },
          "33%": {
            transform: "scale(.87)",
            "animation-timing-function": "ease-in",
          },
          "45%": {
            transform: "scale(1)",
            "animation-timing-function": "ease-out",
          },
        },
        "jello-horizontal": {
          "0%,to": {
            transform: "scale3d(1, 1, 1)",
          },
          "30%": {
            transform: "scale3d(1.25, .75, 1)",
          },
          "40%": {
            transform: "scale3d(.75, 1.25, 1)",
          },
          "50%": {
            transform: "scale3d(1.15, .85, 1)",
          },
          "65%": {
            transform: "scale3d(.95, 1.05, 1)",
          },
          "75%": {
            transform: "scale3d(1.05, .95, 1)",
          },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }: { addUtilities: Function }) {
      const newUtilities = {
        ".text-shadow": {
          textShadow: "0px 2px 3px darkgrey",
        },
        ".text-shadow-md": {
          textShadow: "0px 3px 3px darkgrey",
        },
        ".text-shadow-lg": {
          textShadow: "0px 5px 3px darkgrey",
        },
        ".text-shadow-xl": {
          textShadow: "0px 7px 3px darkgrey",
        },
        ".text-shadow-2xl": {
          textShadow: "0px 10px 3px darkgrey",
        },
        ".text-shadow-none": {
          textShadow: "none",
        },
        ".text-shadow-edge": {
          textShadow:
            "2px 2px #131313,2px 2px #131313,0 2px #131313,-2px 2px #131313,-2px 0 #131313,-2px -2px #131313,0 -2px #131313,2px -2px #131313",
        },
      };
      addUtilities(newUtilities);
    }),

    require("tailwindcss-animate"),
  ],
} satisfies Config;

export default config;
