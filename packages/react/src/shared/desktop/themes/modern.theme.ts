import type { DesktopTheme } from '../types';

export const modernTheme: DesktopTheme = {
  name: 'modern',
  colors: {
    windowBorder: '#7a4599',
    windowBackground: '#1a1a2e',
    titleBarGradient: ['#552e66', '#7a4599'],
    accentPrimary: '#7a4599',
    accentSecondary: '#552e66',
    controlClose: '#da373c',
    controlMinimize: '#f0b232',
    controlMaximize: '#248046',
  },
  effects: {
    windowShadow: '0 0 0 2px rgba(122, 69, 153, 0.5), 0 0 20px rgba(122, 69, 153, 0.4), 0 10px 25px -5px rgba(0, 0, 0, 0.5)',
    glowEffect: 'rgba(122, 69, 153, 0.3)',
    borderStyle: 'solid',
    borderRadius: '8px',
  },
  fonts: {
    display: 'Changa, Rubik, sans-serif',
    body: 'IBM Plex Sans, Inter, sans-serif',
  },
};
