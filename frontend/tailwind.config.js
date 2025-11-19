/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"   // ← this exact line fixes 99% of Vite + Tailwind issues
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}