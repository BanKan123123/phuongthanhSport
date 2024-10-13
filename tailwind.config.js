const flowbite = require("flowbite-react/tailwind");
const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT(
  {
    content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content(),],
    theme: {
      extend: {},
    },
    plugins: [flowbite.plugin(),],
  }
)

