import type { DesktopTheme } from '../types';

export const horrorTheme: DesktopTheme = {
  name: 'horror',
  colors: {
    windowBorder: '#8b0000',
    windowBackground: '#0a0a0a',
    titleBarGradient: ['#2b0000', '#8b0000'],
    accentPrimary: '#8b0000',
    accentSecondary: '#2b0000',
    controlClose: '#8b0000',
    controlMinimize: '#4a4a4a',
    controlMaximize: '#696969',
  },
  effects: {
    windowShadow: '0 0 0 2px rgba(139, 0, 0, 0.5), 0 0 20px rgba(139, 0, 0, 0.7), 0 10px 30px rgba(0, 0, 0, 0.9)',
    glowEffect: 'rgba(139, 0, 0, 0.5)',
    borderStyle: 'outset',
    borderRadius: '4px',
  },
  fonts: {
    display: 'Changa, serif',
    body: 'IBM Plex Sans, serif',
  },
};
