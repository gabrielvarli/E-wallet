import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        credit: [
          "-0.5px -0.5px 1px rgba(255, 255, 255, 1)",
          "0.5px 1px 1px rgba(0, 0, 0, 0.5)",
        ],
      },
      backgroundImage: {
        "gradient-25": "linear-gradient(60deg, var(--tw-gradient-stops))",
      },
      fontFamily: {
        poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
        credit: ['"Share Tech Mono"', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        bkg: "hsl(var(--color-bg) / <alpha-value>)",
        text: {
          default: "hsla(var(--color-text) /  <alpha-value>)",
          contrast: "hsla(var(--color-text-contrast) /  <alpha-value>)",
          low: {
            contrast: "hsla(var(--color-text-low-contrast) / <alpha-value> )",
            placeholder: "hsla(var(--color-text-low-contrast) / <alpha-value>)",
          },
        },
        elem_bg: "hsl(var(--color-text-contrast) / 0.5)",
        border: "hsl(var(--color-elem-border) / <alpha-value>)",
        primary: {
          50: "hsl(var(--color-primary-50) / <alpha-value>)",
          100: "hsl(var(--color-primary-100) / <alpha-value>)",
          200: "hsl(var(--color-primary-200) / <alpha-value>)",
          300: "hsl(var(--color-primary-300) / <alpha-value>)",
          400: "hsl(var(--color-primary-400) / <alpha-value>)",
          500: "hsl(var(--color-primary-500) / <alpha-value>)",
          600: "hsl(var(--color-primary-600) / <alpha-value>)",
          700: "hsl(var(--color-primary-700) / <alpha-value>)",
          800: "hsl(var(--color-primary-800) / <alpha-value>)",
          900: "hsl(var(--color-primary-900) / <alpha-value>)",
          950: "hsl(var(--color-primary-950) / <alpha-value>)",
        },
        danger: {
          50: "hsl(var(--color-danger-50) / <alpha-value>)",
          100: "hsl(var(--color-danger-100) / <alpha-value>)",
          200: "hsl(var(--color-danger-200) / <alpha-value>)",
          300: "hsl(var(--color-danger-300) / <alpha-value>)",
          400: "hsl(var(--color-danger-400) / <alpha-value>)",
          600: "hsl(var(--color-danger-600) / <alpha-value>)",
          500: "hsl(var(--color-danger-500) / <alpha-value>)",
          700: "hsl(var(--color-danger-700) / <alpha-value>)",
          800: "hsl(var(--color-danger-800) / <alpha-value>)",
          900: "hsl(var(--color-danger-900) / <alpha-value>)",
          950: "hsl(var(--color-danger-950) / <alpha-value>)",
        },
        secondary: "hsl(var(--color-secondary) / <alpha-value>)",
        warning: "hsl(var(--color-warning) / <alpha-value>)",
        // warning_contrast:
        // "hsl(var(--color-warning-contrast) / <alpha-value>)",
        grey: {
          50: "hsl(var(--color-grey-50) / <alpha-value>)",
          100: "hsl(var(--color-grey-100) / <alpha-value>)",
          200: "hsl(var(--color-grey-200) / <alpha-value>)",
          300: "hsl(var(--color-grey-300) / <alpha-value>)",
          400: "hsl(var(--color-grey-400) / <alpha-value>)",
          500: "hsl(var(--color-grey-500) / <alpha-value>)",
          600: "hsl(var(--color-grey-600) / <alpha-value>)",
          700: "hsl(var(--color-grey-700) / <alpha-value>)",
          800: "hsl(var(--color-grey-800) / <alpha-value>)",
          900: "hsl(var(--color-grey-900) / <alpha-value>)",
          950: "hsl(var(--color-grey-950) / <alpha-value>)",
        },

        transparent: {
          0: "hsl(var(--color-text-contrast) / 0.133)",
          1: "hsl(var(--color-text-contrast) / 0.233)",
          2: "hsl(var(--color-text-contrast) / 0.4)",
        },
      },
    },
    screens: {
      xs: "540px",
      ...defaultTheme.screens,
    },
  },
  plugins: [require("flowbite/plugin")],
};
