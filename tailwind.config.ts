import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'p3r-dark-blue-1': '#0f34bb',
        'p3r-dark-blue-2': '#010eb3',
        'p3r-cyan-1': '#54fafe',
        'p3r-cyan-2': '#49ffff',
        'p3r-cyan-3': '#31cbfc',
        'p3r-mid-blue-1': '#1f84e8',
        'p3r-mid-blue-2': '#0554c5',
        'p3r-dark-grey': '#323539',
        'p3r-light': '#fefefe',
      },
      fontFamily: {
        bebas:    ['Bebas Neue', 'sans-serif'],
        orbitron: ['Orbitron', 'monospace'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        anton:    ['Anton', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'cyan-sm': '0 0 10px rgba(0,191,255,0.7), 0 0 25px rgba(0,191,255,0.35)',
        'cyan-lg': '0 0 20px rgba(0,191,255,1), 0 0 60px rgba(0,191,255,0.5)',
      },
    }
  },
  plugins: [],
}

export default config
