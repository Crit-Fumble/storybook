import { create } from 'zustand';
import type { Position, Size } from '../types';

export interface WindowStoreState {
  id: string;
  position: Position;
  size: Size;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface WindowStore {
  windows: Map<string, WindowStoreState>;
  focusedWindowId: string | null;
  baseZIndex: number;

  // Actions
  addWindow: (id: string, state: Partial<WindowStoreState>) => void;
  removeWindow: (id: string) => void;
  updateWindow: (id: string, state: Partial<WindowStoreState>) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;

  // Getters
  getWindow: (id: string) => WindowStoreState | undefined;
  getTopZIndex: () => number;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: new Map(),
  focusedWindowId: null,
  baseZIndex: 1000,

  addWindow: (id, initialState) => {
    const topZIndex = get().getTopZIndex();
    const newWindow: WindowStoreState = {
      id,
      position: initialState.position || { x: 100, y: 100 },
      size: initialState.size || { width: 600, height: 400 },
      isMinimized: initialState.isMinimized || false,
      isMaximized: initialState.isMaximized || false,
      zIndex: topZIndex + 1,
    };

    set((state) => ({
      windows: new Map(state.windows).set(id, newWindow),
      focusedWindowId: id,
    }));
  },

  removeWindow: (id) => {
    set((state) => {
      const newWindows = new Map(state.windows);
      newWindows.delete(id);

      return {
        windows: newWindows,
        focusedWindowId: state.focusedWindowId === id ? null : state.focusedWindowId,
      };
    });
  },

  updateWindow: (id, updates) => {
    set((state) => {
      const window = state.windows.get(id);
      if (!window) return state;

      const updatedWindow = { ...window, ...updates };
      const newWindows = new Map(state.windows);
      newWindows.set(id, updatedWindow);

      return { windows: newWindows };
    });
  },

  focusWindow: (id) => {
    const topZIndex = get().getTopZIndex();

    set((state) => {
      const window = state.windows.get(id);
      if (!window) return state;

      const updatedWindow = { ...window, zIndex: topZIndex + 1 };
      const newWindows = new Map(state.windows);
      newWindows.set(id, updatedWindow);

      return {
        windows: newWindows,
        focusedWindowId: id,
      };
    });
  },

  minimizeWindow: (id) => {
    get().updateWindow(id, { isMinimized: true, isMaximized: false });
  },

  maximizeWindow: (id) => {
    const window = get().getWindow(id);
    if (!window) return;

    if (window.isMaximized) {
      // Restore
      get().updateWindow(id, { isMaximized: false });
    } else {
      // Maximize
      get().updateWindow(id, { isMaximized: true, isMinimized: false });
    }
  },

  restoreWindow: (id) => {
    get().updateWindow(id, { isMinimized: false, isMaximized: false });
  },

  getWindow: (id) => {
    return get().windows.get(id);
  },

  getTopZIndex: () => {
    const windows = Array.from(get().windows.values());
    if (windows.length === 0) return get().baseZIndex;

    return Math.max(...windows.map((w) => w.zIndex), get().baseZIndex);
  },
}));

// Hook for using window store with a specific window ID
export function useWindow(windowId: string) {
  const store = useWindowStore();
  const window = store.getWindow(windowId);

  return {
    window,
    focusWindow: () => store.focusWindow(windowId),
    minimizeWindow: () => store.minimizeWindow(windowId),
    maximizeWindow: () => store.maximizeWindow(windowId),
    restoreWindow: () => store.restoreWindow(windowId),
    updateWindow: (updates: Partial<WindowStoreState>) => store.updateWindow(windowId, updates),
  };
}
