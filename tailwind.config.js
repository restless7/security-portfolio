/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Official SG Brand Palette: Obsidian / Metallic Silver / Electric Blue / Icy Blue
        arch: {
          obsidian: '#0B1119',
          surface: '#101824',
          graphite: '#1E2B3A',
          electric: '#2F8CFF',
          icy: '#8FD3FF',
          silver: '#CBD5E1',
          slate: '#94A3B8',
          ivory: '#EFF2F2',
        },
        // Retained technical & security accent palette for secondary routes
        primary: {
          50: '#f0fdff',
          100: '#ccfbff',
          400: '#00ffff',
          500: '#00e6e6',
          600: '#00cccc',
          700: '#009999',
          800: '#006666',
          900: '#003333',
        },
        secondary: {
          400: '#00ff88',
          500: '#00e675',
          600: '#00cc62',
          700: '#009944',
          800: '#006633',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'SF Mono', 'Monaco', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'terminal-cursor': 'terminal-cursor 1s linear infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            filter: 'brightness(1)',
          },
          '50%': {
            opacity: '0.8',
            filter: 'brightness(1.2)',
          },
        },
        'terminal-cursor': {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-up': {
          '0%': {
            transform: 'translateY(100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
      },
      backgroundImage: {
        'matrix-gradient': 'linear-gradient(180deg, #0B1119 0%, #101824 50%, #0B1119 100%)',
      },
      boxShadow: {
        'glow-cyan': '0 0 22px rgba(47, 140, 255, 0.22)',
        'glow-green': '0 0 20px rgba(0, 255, 136, 0.2)',
        'inner-glow': 'inset 0 0 20px rgba(143, 211, 255, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
