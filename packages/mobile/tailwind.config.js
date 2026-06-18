/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        bg: '#08080a',
        accent: '#c9960c',
        muted: 'rgba(255,255,255,0.45)',
        card: 'rgba(255,255,255,0.05)',
      },
    },
  },
  plugins: [],
}
