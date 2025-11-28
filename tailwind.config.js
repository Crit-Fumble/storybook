/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // CFG (Crit-Fumble Gaming) brand color palette - default theme
        cfg: {
          primary: '#552e66',
          'primary-hover': '#3d1f4a',
          brand: '#552e66',
          'brand-hover': '#3d1f4a',
          accent: '#7a4599',
          green: '#248046',
          red: '#da373c',
          yellow: '#f0b232',
          background: {
            primary: '#1a1a2e',
            secondary: '#16213e',
            tertiary: '#0f0f1a',
            floating: '#1f1f3a',
          },
          text: {
            normal: '#e8e8f0',
            muted: '#9090a8',
            link: '#7a4599',
          },
          border: '#3a3a5a',
        },
        // Discord color palette - for Discord activity components
        discord: {
          primary: '#5865f2',
          'primary-hover': '#4752c4',
          brand: '#5865f2',
          'brand-hover': '#4752c4',
          green: '#248046',
          red: '#da373c',
          yellow: '#f0b232',
          background: {
            primary: '#313338',
            secondary: '#2b2d31',
            tertiary: '#1e1f22',
            floating: '#232428',
          },
          text: {
            normal: '#dbdee1',
            muted: '#80848e',
            link: '#00a8fc',
          },
          border: '#3f4147',
        },
        // Legacy alias for crit-purple
        crit: {
          purple: {
            primary: '#552e66',
            dark: '#3d1f4a',
            light: '#7a4599',
          },
        },
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Changa', 'Rubik', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Consolas', 'Monaco', 'monospace'],
        rubik: ['Rubik', 'system-ui', 'sans-serif'],
        jakarta: ['PlusJakartaSans', 'system-ui', 'sans-serif'],
        changa: ['Changa', 'system-ui', 'sans-serif'],
        discord: ['Whitney', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
