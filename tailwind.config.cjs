const themeSwapper = require("tailwindcss-theme-swapper");
const tailwindColors = require("tailwindcss/colors");
const tailwindRadix = require("tailwind-radix-colors");

const radixColors = { light: {}, dark: {} };
for (const color in tailwindRadix.colors) {
  const outSet = color.includes("Dark") ? radixColors.dark : radixColors.light;
  const outName = color
    .replace("Dark", "")
    .replace(/A$/, "-a")
    .replace("gray", "grey");
  outSet[outName] = tailwindRadix.colors[color];
}

const baseColors = {
  inherit: tailwindColors.inherit,
  current: tailwindColors.current,
  black: tailwindColors.black,
  white: tailwindColors.white,
};

const lightThemeColors = {
  ...baseColors,
  ...radixColors.light,
};

const darkThemeColors = {
  ...baseColors,
  ...radixColors.dark,
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", ".light"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [
    // plugin options are optional!
    // tailwindRadix.plugin(),
    themeSwapper({
      themes: [
        {
          name: "base",
          selectors: [":root", ".dark"],
          theme: {
            colors: {
              ...darkThemeColors,
              primary: radixColors.dark.purple,
            },
          },
        },
        {
          name: "light",
          selectors: [".light"],
          mediaQuery: "@media (prefers-color-scheme: light)",
          theme: {
            colors: {
              ...lightThemeColors,
              primary: radixColors.light.purple,
            },
          },
        },
      ],
    }),
  ],
  theme: {
    colors: { transparent: tailwindColors.transparent },
    extend: {},
  },
};
