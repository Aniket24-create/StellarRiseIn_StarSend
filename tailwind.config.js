/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  safelist: [
    // Dynamic color classes used in Hero.jsx mapped arrays
    { pattern: /bg-(blue|purple|green|yellow|cyan|pink)-(400|500)\/(10|20|30|50)/ },
    { pattern: /text-(blue|purple|green|yellow|cyan|pink)-(400|500)/ },
    { pattern: /border-(blue|purple|green|yellow|cyan|pink)-(500)\/(20)/ },
    { pattern: /shadow-(blue|purple|green|yellow|cyan|pink)-(500)\/(20|50)/ },
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        purple: {
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        dark: {
          100: '#1e293b',
          200: '#0f172a',
          300: '#020617',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-card': 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      }
    },
  },
  plugins: [],
}