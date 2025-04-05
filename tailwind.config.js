/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'grotesque-display': ['Grotesque Display', 'sans-serif'],
        'geist-mono': ['Geist mono', 'sans-serif'],
      },
      backgroundImage: {
        'gradient': 'linear-gradient(90deg, rgba(92,81,224,1) 0%, rgba(234,12,185,1) 100%)',
      },
    },
  },
  plugins: [],
}

