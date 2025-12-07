import { clsx } from 'clsx';
import type { ReactNode } from 'react';

export interface TitleBarProps {
  title: string;
  icon?: ReactNode;
  onDoubleClick?: () => void;
  className?: string;
  testId?: string;
}

export function TitleBar({ title, icon, onDoubleClick, className, testId }: TitleBarProps) {
  return (
    <div
      className={clsx('desktop-window-titlebar px-4 py-2 flex items-center gap-2 select-none', className)}
      onDoubleClick={onDoubleClick}
      data-testid={testId}
    >
      {icon && (
        <div
          className="flex-shrink-0 flex items-center justify-center"
          data-testid={testId ? `${testId}-icon` : undefined}
        >
          {icon}
        </div>
      )}
      <div
        className="flex-1 text-sm font-semibold truncate"
        data-testid={testId ? `${testId}-title` : undefined}
      >
        {title}
      </div>
    </div>
  );
}
