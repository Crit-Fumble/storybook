import type { DesktopTheme } from '../types';

export const cyberpunkTheme: DesktopTheme = {
  name: 'cyberpunk',
  colors: {
    windowBorder: '#ff00ff',
    windowBackground: '#0d0221',
    titleBarGradient: ['#ff00ff', '#00ffff'],
    accentPrimary: '#ff00ff',
    accentSecondary: '#00ffff',
    controlClose: '#ff0040',
    controlMinimize: '#ffff00',
    controlMaximize: '#00ff00',
  },
  effects: {
    windowShadow: '0 0 0 2px rgba(255, 0, 255, 0.6), 0 0 40px rgba(255, 0, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.4)',
    glowEffect: 'rgba(255, 0, 255, 0.6)',
    borderStyle: 'solid',
    borderRadius: '0',
  },
  fonts: {
    display: 'Rubik, sans-serif',
    body: 'IBM Plex Mono, monospace',
  },
};
