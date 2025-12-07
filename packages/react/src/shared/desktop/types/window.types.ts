import type { ReactNode } from 'react';
import type { ThemeName, DesktopTheme } from './theme.types';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Bounds {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export type WindowState = 'normal' | 'minimized' | 'maximized';

export interface WindowMetadata {
  id: string;
  title: string;
  icon?: ReactNode;
  createdAt: number;
  lastFocusedAt: number;
}

export interface WindowConfig {
  id: string;
  title: string;
  icon?: ReactNode;
  content: ReactNode;
  defaultPosition?: Position;
  defaultSize?: Size;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  resizable?: boolean;
  draggable?: boolean;
  theme?: ThemeName | DesktopTheme;
}
