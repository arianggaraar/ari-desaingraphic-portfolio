/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Arial", "Helvetica Neue", "sans-serif"],
        mono: ["var(--font-mono)", "Courier New", "monospace"]
      },
      boxShadow: {
        brutal: "10px 10px 0 var(--fg)",
        brutalSm: "6px 6px 0 var(--fg)"
      }
    }
  },
  plugins: []
};
