import { clsx } from 'clsx';
import { Rnd } from 'react-rnd';
import type { ReactNode } from 'react';
import { WindowHeader } from './WindowHeader';
import type { DesktopTheme, ThemeName } from '../types';

export interface WindowProps {
  id: string;
  title: string;
  icon?: ReactNode;
  children: ReactNode;

  // Position & Size
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  position?: { x: number; y: number };
  size?: { width: number; height: number };
  onPositionChange?: (position: { x: number; y: number }) => void;
  onSizeChange?: (size: { width: number; height: number }) => void;

  // State
  isMinimized?: boolean;
  isMaximized?: boolean;
  isFocused?: boolean;
  zIndex?: number;

  // Behavior
  resizable?: boolean;
  draggable?: boolean;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;

  // Callbacks
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  onFocus?: () => void;

  // Theming
  theme?: ThemeName | DesktopTheme;

  // Constraints
  bounds?: 'parent' | 'window' | string;

  className?: string;
  testId?: string;
}

export function Window({
  id,
  title,
  icon,
  children,
  defaultPosition = { x: 100, y: 100 },
  defaultSize = { width: 600, height: 400 },
  position,
  size,
  onPositionChange,
  onSizeChange,
  isMinimized = false,
  isMaximized = false,
  isFocused = false,
  zIndex = 1000,
  resizable = true,
  draggable = true,
  minWidth = 300,
  minHeight = 200,
  maxWidth,
  maxHeight,
  onMinimize,
  onMaximize,
  onClose,
  onFocus,
  theme,
  bounds = 'parent',
  className,
  testId,
}: WindowProps) {
  // Resolve theme
  let themeClass = 'theme-modern';
  if (theme) {
    if (typeof theme === 'string') {
      themeClass = `theme-${theme}`;
    }
  }

  // Handle maximize/restore
  const handleMaximizeToggle = () => {
    if (onMaximize) {
      onMaximize();
    }
  };

  // Don't render if minimized
  if (isMinimized) {
    return null;
  }

  const windowContent = (
    <div
      className={clsx(
        'desktop-window',
        isFocused && 'desktop-window-focused',
        'flex flex-col overflow-hidden',
        themeClass,
        className
      )}
      onClick={onFocus}
      data-testid={testId}
      data-window-id={id}
      style={{
        width: isMaximized ? '100%' : size?.width || defaultSize.width,
        height: isMaximized ? '100%' : size?.height || defaultSize.height,
        zIndex,
      }}
    >
      <WindowHeader
        title={title}
        icon={icon}
        onMinimize={onMinimize}
        onMaximize={handleMaximizeToggle}
        onClose={onClose}
        isMaximized={isMaximized}
        onDoubleClick={handleMaximizeToggle}
        testId={testId ? `${testId}-header` : undefined}
      />

      <div
        className="flex-1 overflow-auto p-4 bg-cfg-background-primary"
        data-testid={testId ? `${testId}-content` : undefined}
      >
        {children}
      </div>
    </div>
  );

  // If maximized, render without Rnd
  if (isMaximized) {
    return (
      <div
        className="absolute inset-0"
        style={{ zIndex }}
        data-testid={testId ? `${testId}-maximized` : undefined}
      >
        {windowContent}
      </div>
    );
  }

  // Normal window with drag/resize
  return (
    <Rnd
      default={{
        x: defaultPosition.x,
        y: defaultPosition.y,
        width: defaultSize.width,
        height: defaultSize.height,
      }}
      position={position}
      size={size}
      onDragStop={(_e, d) => {
        if (onPositionChange) {
          onPositionChange({ x: d.x, y: d.y });
        }
      }}
      onResizeStop={(_e, _direction, ref, _delta, position) => {
        if (onSizeChange) {
          onSizeChange({
            width: parseInt(ref.style.width),
            height: parseInt(ref.style.height),
          });
        }
        if (onPositionChange) {
          onPositionChange(position);
        }
      }}
      minWidth={minWidth}
      minHeight={minHeight}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      bounds={bounds}
      disableDragging={!draggable}
      enableResizing={resizable}
      dragHandleClassName="desktop-window-titlebar"
      style={{ zIndex }}
      onMouseDown={onFocus}
    >
      {windowContent}
    </Rnd>
  );
}
