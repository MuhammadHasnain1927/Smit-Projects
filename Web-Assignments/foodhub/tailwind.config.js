/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./context/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#181310",
        char: {
          800: "#241C16",
          700: "#3A2A20",
        },
        cream: "#FAF5EC",
        chili: {
          DEFAULT: "#D8241C",
          600: "#B81C16",
          700: "#921712",
        },
        mustard: {
          DEFAULT: "#F5A623",
          light: "#FFC861",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      keyframes: {
        wipeDown: {
          "0%": { transform: "scaleY(1)" },
          "100%": { transform: "scaleY(0)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(2deg)" },
        },
      },
      animation: {
        wipeDown: "wipeDown 0.7s cubic-bezier(0.83, 0, 0.17, 1) forwards",
        fadeUp: "fadeUp 0.6s ease-out forwards",
        floatSlow: "floatSlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
