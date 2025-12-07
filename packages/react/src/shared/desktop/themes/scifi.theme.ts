import type { DesktopTheme } from '../types';

export const scifiTheme: DesktopTheme = {
  name: 'sci-fi',
  colors: {
    windowBorder: '#00d9ff',
    windowBackground: '#050a14',
    titleBarGradient: ['#0a4d68', '#00d9ff'],
    accentPrimary: '#00d9ff',
    accentSecondary: '#0a4d68',
    controlClose: '#ff0080',
    controlMinimize: '#00ff9d',
    controlMaximize: '#00d9ff',
  },
  effects: {
    windowShadow: '0 0 0 2px rgba(0, 217, 255, 0.6), 0 0 30px rgba(0, 217, 255, 0.5), 0 10px 40px rgba(0, 0, 0, 0.8)',
    glowEffect: 'rgba(0, 217, 255, 0.5)',
    borderStyle: 'solid',
    borderRadius: '2px',
  },
  fonts: {
    display: 'Rubik, monospace',
    body: 'IBM Plex Mono, monospace',
  },
};
