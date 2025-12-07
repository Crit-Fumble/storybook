import type { ReactNode } from 'react';

export interface DesktopTheme {
  name: string;
  colors: {
    windowBorder: string;
    windowBackground: string;
    titleBarGradient: string[];
    accentPrimary: string;
    accentSecondary: string;
    controlClose: string;
    controlMinimize: string;
    controlMaximize: string;
  };
  effects: {
    windowShadow: string;
    glowEffect?: string;
    borderStyle: 'solid' | 'inset' | 'outset' | 'double';
    borderRadius: string;
  };
  fonts: {
    display: string;
    body: string;
  };
}

export type ThemeName = 'modern' | 'fantasy' | 'sci-fi' | 'cyberpunk' | 'horror';

export interface DesktopThemeContextValue {
  theme: DesktopTheme;
  themeName: ThemeName;
  setTheme: (theme: ThemeName | DesktopTheme) => void;
}

export interface DesktopThemeProviderProps {
  theme?: ThemeName | DesktopTheme;
  children: ReactNode;
}
