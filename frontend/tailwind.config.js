/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          dark: '#B8960C',
          light: '#F4D03F',
          50: '#FDF8E8',
          100: '#F9EDCA',
          200: '#F4D03F',
          300: '#E5C020',
          400: '#D4AF37',
          500: '#B8960C',
          600: '#8B6914',
          700: '#5E4A0E',
          800: '#3D300A',
          900: '#1E1805',
        },
        navy: {
          DEFAULT: '#0a1628',
          50: '#1e3a5f',
          100: '#162240',
          200: '#111d33',
          300: '#0d1628',
          400: '#0a1628',
          500: '#081020',
          600: '#060c18',
          700: '#040810',
          800: '#020408',
          900: '#000000',
        },
        status: {
          green: '#22C55E',
          red: '#EF4444',
          orange: '#F97316',
          blue: '#3B82F6',
        },
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        sans: ['Cairo', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
    },
  },
  plugins: [],
}
