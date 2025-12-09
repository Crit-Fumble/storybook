import { renderHook, act } from '@testing-library/react';
import { useWindowStore, useWindow } from './useWindowState';

describe('useWindowStore', () => {
  beforeEach(() => {
    // Clear the store before each test
    act(() => {
      useWindowStore.setState({ windows: new Map(), focusedWindowId: null });
    });
  });

  describe('addWindow', () => {
    it('adds a window with default values', () => {
      const { result } = renderHook(() => useWindowStore());

      act(() => {
        result.current.addWindow('window1', {});
      });

      const window = result.current.getWindow('window1');
      expect(window).toBeDefined();
      expect(window?.id).toBe('window1');
      expect(window?.position).toEqual({ x: 100, y: 100 });
      expect(window?.size).toEqual({ width: 600, height: 400 });
      expect(window?.isMinimized).toBe(false);
      expect(window?.isMaximized).toBe(false);
    });

    it('adds a window with custom values', () => {
      const { result } = renderHook(() => useWindowStore());

      act(() => {
        result.current.addWindow('window1', {
          position: { x: 200, y: 300 },
          size: { width: 800, height: 600 },
          isMinimized: true,
        });
      });

      const window = result.current.getWindow('window1');
      expect(window?.position).toEqual({ x: 200, y: 300 });
      expect(window?.size).toEqual({ width: 800, height: 600 });
      expect(window?.isMinimized).toBe(true);
    });

    it('sets window as focused', () => {
      const { result } = renderHook(() => useWindowStore());

      act(() => {
        result.current.addWindow('window1', {});
      });

      expect(result.current.focusedWindowId).toBe('window1');
    });

    it('sets zIndex higher than existing windows', () => {
      const { result } = renderHook(() => useWindowStore());

      act(() => {
        result.current.addWindow('window1', {});
      });

      const window1ZIndex = result.current.getWindow('window1')?.zIndex || 0;

      act(() => {
        result.current.addWindow('window2', {});
      });

      const window2ZIndex = result.current.getWindow('window2')?.zIndex || 0;
      expect(window2ZIndex).toBeGreaterThan(window1ZIndex);
    });
  });

  describe('removeWindow', () => {
    it('removes a window', () => {
      const { result } = renderHook(() => useWindowStore());

      act(() => {
        result.current.addWindow('window1', {});
      });

      expect(result.current.getWindow('window1')).toBeDefined();

      act(() => {
        result.current.removeWindow('window1');
      });

      expect(result.current.getWindow('window1')).toBeUndefined();
    });

    it('clears focusedWindowId when removing focused window', () => {
      const { result } = renderHook(() => useWindowStore());

      act(() => {
        result.current.addWindow('window1', {});
      });

      expect(result.current.focusedWindowId).toBe('window1');

      act(() => {
        result.current.removeWindow('window1');
      });

      expect(result.current.focusedWindowId).toBeNull();
    });

    it('preserves focusedWindowId when removing non-focused window', () => {
      const { result } = renderHook(() => useWindowStore());

      act(() => {
        result.current.addWindow('window1', {});
        result.current.addWindow('window2', {});
      });

      expect(result.current.focusedWindowId).toBe('window2');

      act(() => {
        result.current.removeWindow('window1');
      });

      expect(result.current.focusedWindowId).toBe('window2');
    });
  });

  describe('updateWindow', () => {
    it('updates window properties', () => {
      const { result } = renderHook(() => useWindowStore());

      act(() => {
        result.current.addWindow('window1', {});
      });

      act(() => {
        result.current.updateWindow('window1', {
          position: { x: 500, y: 500 },
          size: { width: 1000, height: 800 },
        });
      });

      const window = result.current.getWindow('window1');
      expect(window?.position).toEqual({ x: 500, y: 500 });
      expect(window?.size).toEqual({ width: 1000, height: 800 });
    });

    it('does nothing for non-existent window', () => {
      const { result } = renderHook(() => useWindowStore());

      act(() => {
        result.current.updateWindow('nonexistent', { position: { x: 100, y: 100 } });
      });

      expect(result.current.getWindow('nonexistent')).toBeUndefined();
    });
  });

  describe('focusWindow', () => {
    it('sets window as focused', () => {
      const { result } = renderHook(() => useWindowStore());

      act(() => {
        result.current.addWindow('window1', {});
        result.current.addWindow('window2', {});
      });

      act(() => {
        result.current.focusWindow('window1');
      });

      expect(result.current.focusedWindowId).toBe('window1');
    });

    it('increases zIndex of focused window', () => {
      const { result } = renderHook(() => useWindowStore());

      act(() => {
        result.current.addWindow('window1', {});
        result.current.addWindow('window2', {});
      });

      const window1InitialZIndex = result.current.getWindow('window1')?.zIndex || 0;

      act(() => {
        result.current.focusWindow('window1');
      });

      const window1NewZIndex = result.current.getWindow('window1')?.zIndex || 0;
      expect(window1NewZIndex).toBeGreaterThan(window1InitialZIndex);
    });

    it('does nothing for non-existent window', () => {
      const { result } = renderHook(() => useWindowStore());
      const initialState = result.current.focusedWindowId;

      act(() => {
        result.current.focusWindow('nonexistent');
      });

      expect(result.current.focusedWindowId).toBe(initialState);
    });
  });

  describe('minimizeWindow', () => {
    it('minimizes a window', () => {
      const { result } = renderHook(() => useWindowStore());

      act(() => {
        result.current.addWindow('window1', {});
      });

      act(() => {
        result.current.minimizeWindow('window1');
      });

      const window = result.current.getWindow('window1');
      expect(window?.isMinimized).toBe(true);
      expect(window?.isMaximized).toBe(false);
    });
  });

  describe('maximizeWindow', () => {
    it('maximizes a window', () => {
      const { result } = renderHook(() => useWindowStore());

      act(() => {
        result.current.addWindow('window1', {});
      });

      act(() => {
        result.current.maximizeWindow('window1');
      });

      const window = result.current.getWindow('window1');
      expect(window?.isMaximized).toBe(true);
      expect(window?.isMinimized).toBe(false);
    });

    it('toggles maximized state', () => {
      const { result } = renderHook(() => useWindowStore());

      act(() => {
        result.current.addWindow('window1', {});
      });

      act(() => {
        result.current.maximizeWindow('window1');
      });

      expect(result.current.getWindow('window1')?.isMaximized).toBe(true);

      act(() => {
        result.current.maximizeWindow('window1');
      });

      expect(result.current.getWindow('window1')?.isMaximized).toBe(false);
    });

    it('does nothing for non-existent window', () => {
      const { result } = renderHook(() => useWindowStore());

      act(() => {
        result.current.maximizeWindow('nonexistent');
      });

      expect(result.current.getWindow('nonexistent')).toBeUndefined();
    });
  });

  describe('restoreWindow', () => {
    it('restores a minimized window', () => {
      const { result } = renderHook(() => useWindowStore());

      act(() => {
        result.current.addWindow('window1', {});
        result.current.minimizeWindow('window1');
      });

      act(() => {
        result.current.restoreWindow('window1');
      });

      const window = result.current.getWindow('window1');
      expect(window?.isMinimized).toBe(false);
      expect(window?.isMaximized).toBe(false);
    });

    it('restores a maximized window', () => {
      const { result } = renderHook(() => useWindowStore());

      act(() => {
        result.current.addWindow('window1', {});
        result.current.maximizeWindow('window1');
      });

      act(() => {
        result.current.restoreWindow('window1');
      });

      const window = result.current.getWindow('window1');
      expect(window?.isMinimized).toBe(false);
      expect(window?.isMaximized).toBe(false);
    });
  });

  describe('getTopZIndex', () => {
    it('returns baseZIndex when no windows', () => {
      const { result } = renderHook(() => useWindowStore());
      expect(result.current.getTopZIndex()).toBe(1000);
    });

    it('returns highest zIndex from windows', () => {
      const { result } = renderHook(() => useWindowStore());

      act(() => {
        result.current.addWindow('window1', {});
        result.current.addWindow('window2', {});
        result.current.addWindow('window3', {});
      });

      const topZIndex = result.current.getTopZIndex();
      const window3ZIndex = result.current.getWindow('window3')?.zIndex || 0;
      expect(topZIndex).toBe(window3ZIndex);
    });
  });
});

describe('useWindow', () => {
  beforeEach(() => {
    act(() => {
      useWindowStore.setState({ windows: new Map(), focusedWindowId: null });
    });
  });

  it('returns window state', () => {
    const store = useWindowStore.getState();

    act(() => {
      store.addWindow('window1', { position: { x: 50, y: 50 }, size: { width: 500, height: 500 } });
    });

    const { result } = renderHook(() => useWindow('window1'));

    expect(result.current.window).toBeDefined();
    expect(result.current.window?.id).toBe('window1');
  });

  it('provides focusWindow method', () => {
    const store = useWindowStore.getState();

    act(() => {
      store.addWindow('window1', {});
      store.addWindow('window2', {});
    });

    const { result } = renderHook(() => useWindow('window1'));

    act(() => {
      result.current.focusWindow();
    });

    expect(useWindowStore.getState().focusedWindowId).toBe('window1');
  });

  it('provides minimizeWindow method', () => {
    const store = useWindowStore.getState();

    act(() => {
      store.addWindow('window1', {});
    });

    const { result } = renderHook(() => useWindow('window1'));

    act(() => {
      result.current.minimizeWindow();
    });

    expect(store.getWindow('window1')?.isMinimized).toBe(true);
  });

  it('provides maximizeWindow method', () => {
    const store = useWindowStore.getState();

    act(() => {
      store.addWindow('window1', {});
    });

    const { result } = renderHook(() => useWindow('window1'));

    act(() => {
      result.current.maximizeWindow();
    });

    expect(store.getWindow('window1')?.isMaximized).toBe(true);
  });

  it('provides restoreWindow method', () => {
    const store = useWindowStore.getState();

    act(() => {
      store.addWindow('window1', {});
      store.minimizeWindow('window1');
    });

    const { result } = renderHook(() => useWindow('window1'));

    act(() => {
      result.current.restoreWindow();
    });

    const window = store.getWindow('window1');
    expect(window?.isMinimized).toBe(false);
  });

  it('provides updateWindow method', () => {
    const store = useWindowStore.getState();

    act(() => {
      store.addWindow('window1', {});
    });

    const { result } = renderHook(() => useWindow('window1'));

    act(() => {
      result.current.updateWindow({ position: { x: 999, y: 999 } });
    });

    expect(store.getWindow('window1')?.position).toEqual({ x: 999, y: 999 });
  });
});
