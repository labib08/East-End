/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-red': 'rgb(92, 22, 22)',
      },
      fontSize: {
        '40px': '40px',
      },
      spacing: {
        50: '50px',
        3: '3px',
        40: '40px',
      },
    },
  },
  plugins: [],
}
