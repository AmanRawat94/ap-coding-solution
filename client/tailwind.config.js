const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        footerbg: "#020c1b",
        // footericonhover: "#da2f68",
        socialiconbg: "#04152d",
        pinky: "#da2f68",
      },
      boxShadow: {
        custom: "0 0 0.625em #da2f68",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
