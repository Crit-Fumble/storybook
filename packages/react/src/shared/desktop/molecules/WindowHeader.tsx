import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { TitleBar } from '../atoms/TitleBar';
import { WindowControls } from '../atoms/WindowControls';

export interface WindowHeaderProps {
  title: string;
  icon?: ReactNode;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  isMaximized?: boolean;
  showMinimize?: boolean;
  showMaximize?: boolean;
  showClose?: boolean;
  onDoubleClick?: () => void;
  className?: string;
  testId?: string;
}

export function WindowHeader({
  title,
  icon,
  onMinimize,
  onMaximize,
  onClose,
  isMaximized = false,
  showMinimize = true,
  showMaximize = true,
  showClose = true,
  onDoubleClick,
  className,
  testId,
}: WindowHeaderProps) {
  return (
    <div
      className={clsx('flex items-center justify-between desktop-window-titlebar', className)}
      data-testid={testId}
    >
      <TitleBar
        title={title}
        icon={icon}
        onDoubleClick={onDoubleClick}
        className="flex-1 !border-b-0 !px-0 !py-0"
        testId={testId ? `${testId}-titlebar` : undefined}
      />
      <WindowControls
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onClose={onClose}
        isMaximized={isMaximized}
        showMinimize={showMinimize}
        showMaximize={showMaximize}
        showClose={showClose}
        className="ml-2"
        testId={testId ? `${testId}-controls` : undefined}
      />
    </div>
  );
}
