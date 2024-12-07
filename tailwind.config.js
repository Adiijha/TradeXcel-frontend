/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'btn-blue' : '#2196F3',
        'grey' : '#F0F3F5'
      },
      fontFamily: {
        'pop': ['poppins', 'poppins'],
        'head' : ['Epilogue', 'epilogue']
      },
    },
  },
  plugins: [
    ['typography'],
  ],
}