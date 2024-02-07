/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1140px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '840px'},
      // => @media (max-width: 767px) { ... }

      'smd': {'max': '760px'},

      'sm': {'max': '605px'},
      // => @media (max-width: 639px) { ... }
      
      'xsm': {'max': '450px'},

    }
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}