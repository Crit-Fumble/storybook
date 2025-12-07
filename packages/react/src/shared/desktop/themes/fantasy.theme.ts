import type { DesktopTheme } from '../types';

export const fantasyTheme: DesktopTheme = {
  name: 'fantasy',
  colors: {
    windowBorder: '#8B4513',
    windowBackground: '#1a0f0a',
    titleBarGradient: ['#654321', '#8B4513'],
    accentPrimary: '#8B4513',
    accentSecondary: '#654321',
    controlClose: '#8B0000',
    controlMinimize: '#DAA520',
    controlMaximize: '#2F4F4F',
  },
  effects: {
    windowShadow: '0 0 0 2px rgba(139, 69, 19, 0.6), 0 8px 32px rgba(139, 69, 19, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
    glowEffect: 'rgba(139, 69, 19, 0.5)',
    borderStyle: 'inset',
    borderRadius: '4px',
  },
  fonts: {
    display: 'Changa, serif',
    body: 'IBM Plex Sans, serif',
  },
};
