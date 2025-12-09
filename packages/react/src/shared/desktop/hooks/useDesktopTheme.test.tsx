import { render, renderHook, act } from '@testing-library/react';
import { DesktopThemeProvider, useDesktopTheme } from './useDesktopTheme';
import { modernTheme, fantasyTheme, scifiTheme } from '../themes';

describe('useDesktopTheme', () => {
  describe('without provider', () => {
    it('returns modern theme as default', () => {
      const { result } = renderHook(() => useDesktopTheme());

      expect(result.current.theme).toEqual(modernTheme);
      expect(result.current.themeName).toBe('modern');
    });

    it('warns when setTheme is called without provider', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const { result } = renderHook(() => useDesktopTheme());

      act(() => {
        result.current.setTheme('fantasy');
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        'useDesktopTheme: No DesktopThemeProvider found. Using default modern theme.'
      );

      consoleSpy.mockRestore();
    });
  });

  describe('with provider', () => {
    it('provides modern theme by default', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <DesktopThemeProvider>{children}</DesktopThemeProvider>
      );

      const { result } = renderHook(() => useDesktopTheme(), { wrapper });

      expect(result.current.theme).toEqual(modernTheme);
      expect(result.current.themeName).toBe('modern');
    });

    it('provides initial theme from string', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <DesktopThemeProvider theme="fantasy">{children}</DesktopThemeProvider>
      );

      const { result } = renderHook(() => useDesktopTheme(), { wrapper });

      expect(result.current.theme).toEqual(fantasyTheme);
      expect(result.current.themeName).toBe('fantasy');
    });

    it('provides initial theme from object', () => {
      const customTheme = {
        ...modernTheme,
        name: 'Custom Theme',
      };

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <DesktopThemeProvider theme={customTheme}>{children}</DesktopThemeProvider>
      );

      const { result } = renderHook(() => useDesktopTheme(), { wrapper });

      expect(result.current.theme).toEqual(customTheme);
      expect(result.current.themeName).toBe('modern'); // Custom themes default to 'modern' name
    });

    it('allows changing theme by name', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <DesktopThemeProvider>{children}</DesktopThemeProvider>
      );

      const { result } = renderHook(() => useDesktopTheme(), { wrapper });

      act(() => {
        result.current.setTheme('fantasy');
      });

      expect(result.current.theme).toEqual(fantasyTheme);
      expect(result.current.themeName).toBe('fantasy');
    });

    it('allows changing theme by object', () => {
      const customTheme = {
        ...scifiTheme,
        name: 'My Custom Theme',
      };

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <DesktopThemeProvider>{children}</DesktopThemeProvider>
      );

      const { result } = renderHook(() => useDesktopTheme(), { wrapper });

      act(() => {
        result.current.setTheme(customTheme);
      });

      expect(result.current.theme).toEqual(customTheme);
      expect(result.current.themeName).toBe('modern'); // Custom themes default to 'modern' name
    });

    it('updates theme multiple times', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <DesktopThemeProvider>{children}</DesktopThemeProvider>
      );

      const { result } = renderHook(() => useDesktopTheme(), { wrapper });

      act(() => {
        result.current.setTheme('fantasy');
      });

      expect(result.current.themeName).toBe('fantasy');

      act(() => {
        result.current.setTheme('sci-fi');
      });

      expect(result.current.themeName).toBe('sci-fi');

      act(() => {
        result.current.setTheme('modern');
      });

      expect(result.current.themeName).toBe('modern');
    });
  });

  describe('DesktopThemeProvider', () => {
    it('renders children', () => {
      const { getByText } = render(
        <DesktopThemeProvider>
          <div>Test Content</div>
        </DesktopThemeProvider>
      );

      expect(getByText('Test Content')).toBeInTheDocument();
    });

    it('provides theme context to children', () => {
      const TestComponent = () => {
        const { themeName } = useDesktopTheme();
        return <div>Current theme: {themeName}</div>;
      };

      const { getByText } = render(
        <DesktopThemeProvider theme="fantasy">
          <TestComponent />
        </DesktopThemeProvider>
      );

      expect(getByText('Current theme: fantasy')).toBeInTheDocument();
    });
  });
});
