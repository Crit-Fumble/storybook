import { createContext, useContext, useState, useMemo } from 'react';
import type { DesktopTheme, DesktopThemeContextValue, DesktopThemeProviderProps, ThemeName } from '../types';
import { modernTheme, getTheme } from '../themes';

const DesktopThemeContext = createContext<DesktopThemeContextValue | undefined>(undefined);

export function DesktopThemeProvider({ theme: initialTheme = 'modern', children }: DesktopThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<DesktopTheme>(() => {
    if (typeof initialTheme === 'string') {
      return getTheme(initialTheme);
    }
    return initialTheme;
  });

  const [themeName, setThemeName] = useState<ThemeName>(() => {
    if (typeof initialTheme === 'string') {
      return initialTheme;
    }
    return 'modern';
  });

  const value = useMemo<DesktopThemeContextValue>(
    () => ({
      theme: currentTheme,
      themeName,
      setTheme: (newTheme: ThemeName | DesktopTheme) => {
        if (typeof newTheme === 'string') {
          setThemeName(newTheme);
          setCurrentTheme(getTheme(newTheme));
        } else {
          setThemeName('modern'); // Custom theme defaults to modern name
          setCurrentTheme(newTheme);
        }
      },
    }),
    [currentTheme, themeName]
  );

  return <DesktopThemeContext.Provider value={value}>{children}</DesktopThemeContext.Provider>;
}

export function useDesktopTheme(): DesktopThemeContextValue {
  const context = useContext(DesktopThemeContext);

  // If no provider, return modern theme as default
  if (!context) {
    return {
      theme: modernTheme,
      themeName: 'modern',
      setTheme: () => {
        console.warn('useDesktopTheme: No DesktopThemeProvider found. Using default modern theme.');
      },
    };
  }

  return context;
}
