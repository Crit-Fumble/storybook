
import { render, renderHook, act } from '@testing-library/react';
import { DesktopThemeProvider, useDesktopTheme } from './useDesktopTheme';
import type { DesktopTheme } from '../types';

describe('DesktopThemeProvider', () => {
  it('provides default modern theme', () => {
    const { result } = renderHook(() => useDesktopTheme(), {
      wrapper: ({ children }) => (
        <DesktopThemeProvider>{children}</DesktopThemeProvider>
      ),
    });

    expect(result.current.theme).toBeDefined();
    expect(result.current.themeName).toBe('modern');
  });

  it('provides custom theme name', () => {
    const { result } = renderHook(() => useDesktopTheme(), {
      wrapper: ({ children }) => (
        <DesktopThemeProvider theme="fantasy">{children}</DesktopThemeProvider>
      ),
    });

    expect(result.current.themeName).toBe('fantasy');
  });

  it('allows changing theme by name', () => {
    const { result } = renderHook(() => useDesktopTheme(), {
      wrapper: ({ children }) => (
        <DesktopThemeProvider>{children}</DesktopThemeProvider>
      ),
    });

    act(() => {
      result.current.setTheme('cyberpunk');
    });

    expect(result.current.themeName).toBe('cyberpunk');
  });

  it('allows setting custom theme object', () => {
    const customTheme: DesktopTheme = {
      name: 'custom',
      colors: {
        background: '#000',
        surface: '#111',
        text: '#fff',
        textMuted: '#999',
        border: '#333',
        primary: '#f00',
        primaryHover: '#c00',
        accent: '#0f0',
        shadow: 'rgba(0,0,0,0.5)',
      },
      fonts: {
        sans: 'Arial',
        mono: 'Courier',
      },
      effects: {
        glass: false,
        shadows: false,
      },
    };

    const { result } = renderHook(() => useDesktopTheme(), {
      wrapper: ({ children }) => (
        <DesktopThemeProvider>{children}</DesktopThemeProvider>
      ),
    });

    act(() => {
      result.current.setTheme(customTheme);
    });

    expect(result.current.theme.colors.background).toBe('#000');
    expect(result.current.themeName).toBe('modern'); // Custom themes default to modern name
  });

  it('renders children', () => {
    const { container } = render(
      <DesktopThemeProvider>
        <div>Test Content</div>
      </DesktopThemeProvider>
    );

    expect(container).toHaveTextContent('Test Content');
  });
});

describe('useDesktopTheme without provider', () => {
  it('returns default theme when no provider', () => {
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const { result } = renderHook(() => useDesktopTheme());

    expect(result.current.theme).toBeDefined();
    expect(result.current.themeName).toBe('modern');

    act(() => {
      result.current.setTheme('fantasy');
    });

    expect(consoleWarn).toHaveBeenCalledWith(
      'useDesktopTheme: No DesktopThemeProvider found. Using default modern theme.'
    );

    consoleWarn.mockRestore();
  });
});
