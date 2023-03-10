/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [    "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    screens:{
      "mvID1":"875px",
      "mvID2":"555px",
      "mvID3":"455px",
      "mvID4":"390px"
    },
    extend: {},
  },
  plugins: [],
}
