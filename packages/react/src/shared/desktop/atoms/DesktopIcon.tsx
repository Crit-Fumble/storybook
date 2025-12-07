import { clsx } from 'clsx';
import type { ReactNode } from 'react';

export interface DesktopIconProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  onDoubleClick?: () => void;
  isSelected?: boolean;
  className?: string;
  testId?: string;
}

export function DesktopIcon({
  icon,
  label,
  onClick,
  onDoubleClick,
  isSelected = false,
  className,
  testId,
}: DesktopIconProps) {
  return (
    <div
      className={clsx(
        'desktop-icon',
        'flex flex-col items-center justify-center gap-2 p-3 w-24',
        isSelected && 'desktop-icon-selected',
        className
      )}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      data-testid={testId}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onDoubleClick?.();
        } else if (e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div
        className="flex items-center justify-center text-3xl"
        data-testid={testId ? `${testId}-icon` : undefined}
      >
        {icon}
      </div>
      <div
        className="text-xs text-center text-cfg-text-normal font-sans break-words w-full"
        data-testid={testId ? `${testId}-label` : undefined}
      >
        {label}
      </div>
    </div>
  );
}
