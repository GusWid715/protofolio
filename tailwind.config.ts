import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'p3-black':  '#030810',
        'p3-navy':   '#060d1f',
        'p3-cyan':   '#00BFFF',
        'p3-cyan-h': '#33CFFF',
        'p3-dim':    'rgba(0,191,255,0.45)',
      },
      fontFamily: {
        bebas:    ['Bebas Neue', 'sans-serif'],
        orbitron: ['Orbitron', 'monospace'],
        rajdhani: ['Rajdhani', 'sans-serif'],
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
