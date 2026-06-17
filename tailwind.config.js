/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#122022",
        mist: "#f5fbfa",
        aqua: "#11a39b",
        coral: "#ff6f61",
        limewash: "#dff7ed",
        slateblue: "#43566b"
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 22px 60px rgba(18, 32, 34, 0.10)"
      }
    }
  },
  plugins: []
};

module.exports = config;
