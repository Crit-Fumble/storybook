import { useState, useEffect } from 'react';
import { Window } from '../molecules/Window';
import type { WindowConfig, ThemeName, DesktopTheme } from '../types';
import { useWindowStore } from '../hooks';

export interface WindowManagerProps {
  windows: WindowConfig[];
  onWindowClose?: (windowId: string) => void;
  theme?: ThemeName | DesktopTheme;
  maxWindows?: number;
  className?: string;
  testId?: string;
}

export function WindowManager({
  windows,
  onWindowClose,
  theme,
  maxWindows = 10,
  className,
  testId,
}: WindowManagerProps) {
  const { addWindow, removeWindow, focusWindow, getWindow } = useWindowStore();
  const [openWindows, setOpenWindows] = useState<Set<string>>(new Set());

  // Initialize windows in store
  useEffect(() => {
    windows.forEach((windowConfig) => {
      if (!openWindows.has(windowConfig.id)) {
        addWindow(windowConfig.id, {
          position: windowConfig.defaultPosition,
          size: windowConfig.defaultSize,
        });
        setOpenWindows((prev) => new Set(prev).add(windowConfig.id));
      }
    });
  }, [windows, addWindow, openWindows]);

  const handleClose = (windowId: string) => {
    removeWindow(windowId);
    setOpenWindows((prev) => {
      const newSet = new Set(prev);
      newSet.delete(windowId);
      return newSet;
    });

    if (onWindowClose) {
      onWindowClose(windowId);
    }
  };

  return (
    <div className={className} data-testid={testId}>
      {windows.slice(0, maxWindows).map((windowConfig) => {
        const windowState = getWindow(windowConfig.id);

        return (
          <Window
            key={windowConfig.id}
            id={windowConfig.id}
            title={windowConfig.title}
            icon={windowConfig.icon}
            defaultPosition={windowConfig.defaultPosition}
            defaultSize={windowConfig.defaultSize}
            minWidth={windowConfig.minWidth}
            minHeight={windowConfig.minHeight}
            maxWidth={windowConfig.maxWidth}
            maxHeight={windowConfig.maxHeight}
            resizable={windowConfig.resizable}
            draggable={windowConfig.draggable}
            theme={windowConfig.theme || theme}
            isMinimized={windowState?.isMinimized}
            isMaximized={windowState?.isMaximized}
            zIndex={windowState?.zIndex}
            onClose={() => handleClose(windowConfig.id)}
            onFocus={() => focusWindow(windowConfig.id)}
            testId={testId ? `${testId}-window-${windowConfig.id}` : undefined}
          >
            {windowConfig.content}
          </Window>
        );
      })}
    </div>
  );
}
