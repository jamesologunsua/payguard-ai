/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif']
      },
      colors: {
        brand: {
          DEFAULT: '#0f766e',
          50: '#ecfdfb',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0f766e',
          700: '#0f5f59',
          800: '#115e59',
          900: '#134e4a'
        },
        accent: {
          DEFAULT: '#ff7a59',
          soft: '#ffd2c5'
        }
      }
    }
  },
  plugins: []
};
