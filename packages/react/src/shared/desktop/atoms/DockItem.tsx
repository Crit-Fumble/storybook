import { clsx } from 'clsx';
import type { ReactNode } from 'react';

export interface DockItemProps {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  badge?: number;
  className?: string;
  testId?: string;
}

export function DockItem({
  icon,
  label,
  isActive = false,
  onClick,
  badge,
  className,
  testId,
}: DockItemProps) {
  return (
    <div
      className={clsx(
        'desktop-dock-item',
        'relative flex flex-col items-center justify-center p-2 min-w-[3rem]',
        isActive && 'desktop-dock-item-active',
        className
      )}
      onClick={onClick}
      data-testid={testId}
      role="button"
      tabIndex={0}
      title={label}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div
        className="flex items-center justify-center text-2xl"
        data-testid={testId ? `${testId}-icon` : undefined}
      >
        {icon}
      </div>

      {badge !== undefined && badge > 0 && (
        <div
          className="absolute -top-1 -right-1 bg-cfg-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold"
          data-testid={testId ? `${testId}-badge` : undefined}
        >
          {badge > 99 ? '99+' : badge}
        </div>
      )}
    </div>
  );
}
