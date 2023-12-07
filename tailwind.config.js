/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: '#DE5E3D',
        secondary: '#333333',
        light: '#fefefe',
      },
      fontSize: {
        '20xl': '7rem',
      },
    },
  },
  plugins: [],
};
