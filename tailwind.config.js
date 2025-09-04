/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(210, 20%, 95%)',
        accent: 'hsl(130, 70%, 45%)',
        primary: 'hsl(210, 90%, 50%)',
        surface: 'hsl(0, 0%, 100%)',
        dark: {
          bg: 'hsl(240, 10%, 8%)',
          surface: 'hsl(240, 8%, 12%)',
          border: 'hsl(240, 6%, 18%)',
          text: 'hsl(0, 0%, 90%)',
          muted: 'hsl(0, 0%, 60%)',
        },
        purple: {
          400: 'hsl(270, 70%, 65%)',
          500: 'hsl(270, 70%, 55%)',
          600: 'hsl(270, 70%, 45%)',
        },
        blue: {
          400: 'hsl(220, 80%, 65%)',
          500: 'hsl(220, 80%, 55%)',
          600: 'hsl(220, 80%, 45%)',
        }
      },
      borderRadius: {
        'lg': '16px',
        'md': '10px',
        'sm': '6px',
      },
      spacing: {
        'lg': '20px',
        'md': '12px',
        'sm': '8px',
      },
      boxShadow: {
        'card': '0 5px 15px hsla(0, 0%, 0%, 0.08)',
        'dark-card': '0 5px 15px hsla(0, 0%, 0%, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 200ms ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}