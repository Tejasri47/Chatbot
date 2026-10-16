/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B1020",
        surface: {
          DEFAULT: "#131B2F",
          light: "#1C2642",
          lighter: "#243256",
          dark: "#0E1424",
        },
        violet: {
          DEFAULT: "#8067F7",
          light: "#9A85F9",
          dark: "#6246EA",
          glow: "rgba(128, 103, 247, 0.35)",
        },
        cyan: {
          DEFAULT: "#56DDF0",
          light: "#82E7F5",
          dark: "#33B8CC",
          glow: "rgba(86, 221, 240, 0.35)",
        },
        text: {
          primary: "#F7F8FC",
          muted: "#9CA8BD",
          subtle: "#6B7A99",
        },
        status: {
          success: "#42D6A4",
          warning: "#FBBF24",
          danger: "#F87171",
          info: "#56DDF0",
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-violet': '0 0 25px -5px rgba(128, 103, 247, 0.4)',
        'glow-cyan': '0 0 25px -5px rgba(86, 221, 240, 0.4)',
        'glow-dual': '0 0 35px -5px rgba(128, 103, 247, 0.25), 0 0 35px -5px rgba(86, 221, 240, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'wave': 'wave 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        }
      }
    },
  },
  plugins: [],
}
