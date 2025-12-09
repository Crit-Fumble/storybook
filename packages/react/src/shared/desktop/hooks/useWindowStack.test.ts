
import { renderHook, act } from '@testing-library/react';
import { useWindowStack } from './useWindowStack';
import { useWindowStore } from './useWindowState';

describe('useWindowStack', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useWindowStore());
    act(() => {
      const windows = Array.from(result.current.windows.keys());
      windows.forEach((id) => result.current.removeWindow(id));
    });
  });

  it('gets windows by z-index', () => {
    const { result: storeResult } = renderHook(() => useWindowStore());

    act(() => {
      storeResult.current.addWindow('window-1', {});
      storeResult.current.addWindow('window-2', {});
      storeResult.current.addWindow('window-3', {});
    });

    const { result } = renderHook(() => useWindowStack());

    const sorted = result.current.getWindowsByZIndex();
    expect(sorted.length).toBe(3);

    // Windows should be sorted by z-index
    for (let i = 0; i < sorted.length - 1; i++) {
      expect(sorted[i].zIndex).toBeLessThanOrEqual(sorted[i + 1].zIndex);
    }
  });

  it('brings window to front', () => {
    const { result: storeResult } = renderHook(() => useWindowStore());

    act(() => {
      storeResult.current.addWindow('window-1', {});
      storeResult.current.addWindow('window-2', {});
    });

    const { result } = renderHook(() => useWindowStack());

    const initialZIndex = storeResult.current.windows.get('window-1')?.zIndex;

    act(() => {
      result.current.bringToFront('window-1');
    });

    const newZIndex = storeResult.current.windows.get('window-1')?.zIndex;
    expect(newZIndex).toBeGreaterThan(initialZIndex!);
  });

  it('gets z-index for window', () => {
    const { result: storeResult } = renderHook(() => useWindowStore());

    act(() => {
      storeResult.current.addWindow('window-1', {});
    });

    const { result } = renderHook(() => useWindowStack());

    const zIndex = result.current.getZIndex('window-1');
    expect(typeof zIndex).toBe('number');
    expect(zIndex).toBeGreaterThan(0);
  });

  it('returns default z-index for non-existent window', () => {
    const { result } = renderHook(() => useWindowStack());

    const zIndex = result.current.getZIndex('non-existent');
    expect(zIndex).toBe(1000);
  });

  it('checks if window is focused', () => {
    const { result: storeResult } = renderHook(() => useWindowStore());

    act(() => {
      storeResult.current.addWindow('window-1', {});
      storeResult.current.addWindow('window-2', {});
    });

    const { result } = renderHook(() => useWindowStack());

    // window-2 should be focused (last added)
    expect(result.current.isFocused('window-2')).toBe(true);
    expect(result.current.isFocused('window-1')).toBe(false);
  });

  it('updates focused window when bringing to front', () => {
    const { result: storeResult } = renderHook(() => useWindowStore());

    act(() => {
      storeResult.current.addWindow('window-1', {});
      storeResult.current.addWindow('window-2', {});
    });

    const { result } = renderHook(() => useWindowStack());

    act(() => {
      result.current.bringToFront('window-1');
    });

    expect(result.current.isFocused('window-1')).toBe(true);
    expect(result.current.isFocused('window-2')).toBe(false);
  });
});
