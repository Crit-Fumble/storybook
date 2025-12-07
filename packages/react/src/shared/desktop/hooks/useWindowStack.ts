import { useWindowStore } from './useWindowState';

/**
 * Hook for managing window z-index stacking
 */
export function useWindowStack() {
  const { windows, focusedWindowId, focusWindow } = useWindowStore();

  const getWindowsByZIndex = () => {
    return Array.from(windows.values()).sort((a, b) => a.zIndex - b.zIndex);
  };

  const bringToFront = (windowId: string) => {
    focusWindow(windowId);
  };

  const getZIndex = (windowId: string) => {
    const window = windows.get(windowId);
    return window?.zIndex ?? 1000;
  };

  const isFocused = (windowId: string) => {
    return focusedWindowId === windowId;
  };

  return {
    getWindowsByZIndex,
    bringToFront,
    getZIndex,
    isFocused,
  };
}
