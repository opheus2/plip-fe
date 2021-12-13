module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
            opacity: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')],
}
