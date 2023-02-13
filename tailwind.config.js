/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0093e5",
        midnight: "#0a2345",
        navy: "#0f2a6b",
        pool: "#97def3",
        yellow: "#ffce51",
        orange: "#ff603e",
        pearl: "#fbfcfe",
        raven: "#1f1f20",
      },
    },
  },
  plugins: [],
};
