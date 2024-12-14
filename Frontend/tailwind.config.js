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
      screens: {
        'min-sm': {'max': '420px'},
        'sm': {'max': '500px'},
        'max-sm': {'max': '600px'},
        'md-sm': {'max': '750px'},
        'min-md' : {'max': '800px'},
        'md' : {'max': '900px'},
        'md-lg': {'max': '1000px'},
        'lg': {'max': '1024px'},
        'max-lg': {'max': '1280px'},
      }
    },
  },
  plugins: [],
}
