import { renderHook, act } from '@testing-library/react';
import { useWindowStack } from './useWindowStack';
import { useWindowStore } from './useWindowState';

describe('useWindowStack', () => {
  beforeEach(() => {
    // Clear the store before each test
    act(() => {
      const store = useWindowStore.getState();
      store.windows.clear();
      useWindowStore.setState({ windows: new Map(), focusedWindowId: null });
    });
  });

  describe('getWindowsByZIndex', () => {
    it('returns windows sorted by zIndex', () => {
      const { result } = renderHook(() => useWindowStack());
      const store = useWindowStore.getState();

      act(() => {
        store.addWindow('window1', { position: { x: 0, y: 0 }, size: { width: 100, height: 100 } });
        store.addWindow('window2', { position: { x: 0, y: 0 }, size: { width: 100, height: 100 } });
        store.addWindow('window3', { position: { x: 0, y: 0 }, size: { width: 100, height: 100 } });
      });

      const windows = result.current.getWindowsByZIndex();
      expect(windows.length).toBe(3);
      // Windows should be sorted by zIndex (lowest to highest)
      expect(windows[0].zIndex).toBeLessThan(windows[1].zIndex);
      expect(windows[1].zIndex).toBeLessThan(windows[2].zIndex);
    });

    it('returns empty array when no windows', () => {
      const { result } = renderHook(() => useWindowStack());
      const windows = result.current.getWindowsByZIndex();
      expect(windows).toEqual([]);
    });
  });

  describe('bringToFront', () => {
    it('focuses the window', () => {
      const { result } = renderHook(() => useWindowStack());
      const store = useWindowStore.getState();

      act(() => {
        store.addWindow('window1', {});
        store.addWindow('window2', {});
      });

      act(() => {
        result.current.bringToFront('window1');
      });

      expect(useWindowStore.getState().focusedWindowId).toBe('window1');
    });

    it('increases zIndex of focused window', () => {
      const { result } = renderHook(() => useWindowStack());
      const store = useWindowStore.getState();

      act(() => {
        store.addWindow('window1', {});
        store.addWindow('window2', {});
      });

      const window1ZIndex = store.getWindow('window1')?.zIndex || 0;

      act(() => {
        result.current.bringToFront('window1');
      });

      const newWindow1ZIndex = store.getWindow('window1')?.zIndex || 0;
      expect(newWindow1ZIndex).toBeGreaterThan(window1ZIndex);
    });
  });

  describe('getZIndex', () => {
    it('returns zIndex for existing window', () => {
      const { result } = renderHook(() => useWindowStack());
      const store = useWindowStore.getState();

      act(() => {
        store.addWindow('window1', {});
      });

      const zIndex = result.current.getZIndex('window1');
      expect(typeof zIndex).toBe('number');
      expect(zIndex).toBeGreaterThan(0);
    });

    it('returns default zIndex for non-existent window', () => {
      const { result } = renderHook(() => useWindowStack());
      const zIndex = result.current.getZIndex('nonexistent');
      expect(zIndex).toBe(1000);
    });
  });

  describe('isFocused', () => {
    it('returns true for focused window', () => {
      const { result } = renderHook(() => useWindowStack());
      const store = useWindowStore.getState();

      act(() => {
        store.addWindow('window1', {});
      });

      expect(result.current.isFocused('window1')).toBe(true);
    });

    it('returns false for non-focused window', () => {
      const { result } = renderHook(() => useWindowStack());
      const store = useWindowStore.getState();

      act(() => {
        store.addWindow('window1', {});
        store.addWindow('window2', {});
      });

      expect(result.current.isFocused('window1')).toBe(false);
    });

    it('returns false when no window is focused', () => {
      const { result } = renderHook(() => useWindowStack());
      expect(result.current.isFocused('window1')).toBe(false);
    });
  });
});
