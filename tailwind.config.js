/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
  darkMode: false,
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-motion'), daisyui],
}
