import type { ReactNode } from 'react';

export interface DesktopIconConfig {
  id: string;
  icon: ReactNode;
  label: string;
  onOpen: () => void;
  position?: { x: number; y: number };
}

export interface DockItemConfig {
  id: string;
  icon: ReactNode;
  label: string;
  onClick: () => void;
  badge?: number;
}

export type DockPosition = 'bottom' | 'top' | 'left' | 'right';
export type DockSize = 'sm' | 'md' | 'lg';
