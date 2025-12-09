
import { renderHook, act } from '@testing-library/react';
import { useWindowStore, useWindow } from './useWindowState';

describe('useWindowStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useWindowStore());
    act(() => {
      // Clear all windows before each test
      const windows = Array.from(result.current.windows.keys());
      windows.forEach((id) => result.current.removeWindow(id));
    });
  });

  it('initializes with empty windows', () => {
    const { result } = renderHook(() => useWindowStore());

    expect(result.current.windows.size).toBe(0);
    expect(result.current.focusedWindowId).toBeNull();
  });

  it('adds a window', () => {
    const { result } = renderHook(() => useWindowStore());

    act(() => {
      result.current.addWindow('window-1', {
        position: { x: 100, y: 100 },
        size: { width: 600, height: 400 },
      });
    });

    expect(result.current.windows.size).toBe(1);
    expect(result.current.windows.get('window-1')).toBeDefined();
    expect(result.current.focusedWindowId).toBe('window-1');
  });

  it('adds window with default values', () => {
    const { result } = renderHook(() => useWindowStore());

    act(() => {
      result.current.addWindow('window-1', {});
    });

    const window = result.current.windows.get('window-1');
    expect(window?.position).toEqual({ x: 100, y: 100 });
    expect(window?.size).toEqual({ width: 600, height: 400 });
    expect(window?.isMinimized).toBe(false);
    expect(window?.isMaximized).toBe(false);
  });

  it('removes a window', () => {
    const { result } = renderHook(() => useWindowStore());

    act(() => {
      result.current.addWindow('window-1', {});
      result.current.removeWindow('window-1');
    });

    expect(result.current.windows.size).toBe(0);
    expect(result.current.focusedWindowId).toBeNull();
  });

  it('updates window state', () => {
    const { result } = renderHook(() => useWindowStore());

    act(() => {
      result.current.addWindow('window-1', {});
      result.current.updateWindow('window-1', {
        position: { x: 200, y: 200 },
      });
    });

    const window = result.current.windows.get('window-1');
    expect(window?.position).toEqual({ x: 200, y: 200 });
  });

  it('focuses window', () => {
    const { result } = renderHook(() => useWindowStore());

    act(() => {
      result.current.addWindow('window-1', {});
      result.current.addWindow('window-2', {});
      result.current.focusWindow('window-1');
    });

    expect(result.current.focusedWindowId).toBe('window-1');
  });

  it('increases zIndex when focusing', () => {
    const { result } = renderHook(() => useWindowStore());

    act(() => {
      result.current.addWindow('window-1', {});
      result.current.addWindow('window-2', {});
    });

    const window1InitialZIndex = result.current.windows.get('window-1')?.zIndex;

    act(() => {
      result.current.focusWindow('window-1');
    });

    const window1NewZIndex = result.current.windows.get('window-1')?.zIndex;
    expect(window1NewZIndex).toBeGreaterThan(window1InitialZIndex!);
  });

  it('minimizes window', () => {
    const { result } = renderHook(() => useWindowStore());

    act(() => {
      result.current.addWindow('window-1', {});
      result.current.minimizeWindow('window-1');
    });

    const window = result.current.windows.get('window-1');
    expect(window?.isMinimized).toBe(true);
    expect(window?.isMaximized).toBe(false);
  });

  it('maximizes window', () => {
    const { result } = renderHook(() => useWindowStore());

    act(() => {
      result.current.addWindow('window-1', {});
      result.current.maximizeWindow('window-1');
    });

    const window = result.current.windows.get('window-1');
    expect(window?.isMaximized).toBe(true);
    expect(window?.isMinimized).toBe(false);
  });

  it('toggles maximize state', () => {
    const { result } = renderHook(() => useWindowStore());

    act(() => {
      result.current.addWindow('window-1', {});
      result.current.maximizeWindow('window-1');
    });

    expect(result.current.windows.get('window-1')?.isMaximized).toBe(true);

    act(() => {
      result.current.maximizeWindow('window-1');
    });

    expect(result.current.windows.get('window-1')?.isMaximized).toBe(false);
  });

  it('restores window', () => {
    const { result } = renderHook(() => useWindowStore());

    act(() => {
      result.current.addWindow('window-1', {});
      result.current.minimizeWindow('window-1');
      result.current.restoreWindow('window-1');
    });

    const window = result.current.windows.get('window-1');
    expect(window?.isMinimized).toBe(false);
    expect(window?.isMaximized).toBe(false);
  });

  it('gets window by id', () => {
    const { result } = renderHook(() => useWindowStore());

    act(() => {
      result.current.addWindow('window-1', {});
    });

    const window = result.current.getWindow('window-1');
    expect(window).toBeDefined();
    expect(window?.id).toBe('window-1');
  });

  it('returns undefined for non-existent window', () => {
    const { result } = renderHook(() => useWindowStore());

    const window = result.current.getWindow('non-existent');
    expect(window).toBeUndefined();
  });

  it('gets top z-index', () => {
    const { result } = renderHook(() => useWindowStore());

    act(() => {
      result.current.addWindow('window-1', {});
      result.current.addWindow('window-2', {});
    });

    const topZIndex = result.current.getTopZIndex();
    expect(topZIndex).toBeGreaterThan(0);
  });

  it('returns base z-index when no windows', () => {
    const { result } = renderHook(() => useWindowStore());

    const topZIndex = result.current.getTopZIndex();
    expect(topZIndex).toBe(1000);
  });
});

describe('useWindow', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useWindowStore());
    act(() => {
      const windows = Array.from(result.current.windows.keys());
      windows.forEach((id) => result.current.removeWindow(id));
    });
  });

  it('returns window data', () => {
    const { result: storeResult } = renderHook(() => useWindowStore());

    act(() => {
      storeResult.current.addWindow('window-1', {});
    });

    const { result } = renderHook(() => useWindow('window-1'));

    expect(result.current.window).toBeDefined();
    expect(result.current.window?.id).toBe('window-1');
  });

  it('provides focus function', () => {
    const { result: storeResult } = renderHook(() => useWindowStore());

    act(() => {
      storeResult.current.addWindow('window-1', {});
      storeResult.current.addWindow('window-2', {});
    });

    const { result } = renderHook(() => useWindow('window-1'));

    act(() => {
      result.current.focusWindow();
    });

    expect(storeResult.current.focusedWindowId).toBe('window-1');
  });

  it('provides minimize function', () => {
    const { result: storeResult } = renderHook(() => useWindowStore());

    act(() => {
      storeResult.current.addWindow('window-1', {});
    });

    const { result } = renderHook(() => useWindow('window-1'));

    act(() => {
      result.current.minimizeWindow();
    });

    expect(result.current.window?.isMinimized).toBe(true);
  });

  it('provides maximize function', () => {
    const { result: storeResult } = renderHook(() => useWindowStore());

    act(() => {
      storeResult.current.addWindow('window-1', {});
    });

    const { result } = renderHook(() => useWindow('window-1'));

    act(() => {
      result.current.maximizeWindow();
    });

    expect(result.current.window?.isMaximized).toBe(true);
  });

  it('provides restore function', () => {
    const { result: storeResult } = renderHook(() => useWindowStore());

    act(() => {
      storeResult.current.addWindow('window-1', {});
      storeResult.current.minimizeWindow('window-1');
    });

    const { result } = renderHook(() => useWindow('window-1'));

    act(() => {
      result.current.restoreWindow();
    });

    expect(result.current.window?.isMinimized).toBe(false);
  });

  it('provides update function', () => {
    const { result: storeResult } = renderHook(() => useWindowStore());

    act(() => {
      storeResult.current.addWindow('window-1', {});
    });

    const { result } = renderHook(() => useWindow('window-1'));

    act(() => {
      result.current.updateWindow({ position: { x: 300, y: 300 } });
    });

    expect(result.current.window?.position).toEqual({ x: 300, y: 300 });
  });
});
