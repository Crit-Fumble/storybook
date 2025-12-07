import { clsx } from 'clsx';
import type { DockItemConfig, DockPosition, DockSize } from '../types';
import { DockItem } from '../atoms/DockItem';

export interface DockProps {
  items: DockItemConfig[];
  activeItemId?: string;
  position?: DockPosition;
  size?: DockSize;
  className?: string;
  testId?: string;
}

export function Dock({
  items,
  activeItemId,
  position = 'bottom',
  size = 'md',
  className,
  testId,
}: DockProps) {
  const positionClasses = {
    bottom: 'bottom-0 left-0 right-0 flex-row justify-center',
    top: 'top-0 left-0 right-0 flex-row justify-center',
    left: 'left-0 top-0 bottom-0 flex-col justify-center',
    right: 'right-0 top-0 bottom-0 flex-col justify-center',
  };

  const sizeClasses = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3',
  };

  return (
    <div
      className={clsx(
        'desktop-dock',
        'absolute flex gap-2',
        positionClasses[position],
        sizeClasses[size],
        className
      )}
      data-testid={testId}
    >
      {items.map((item) => (
        <DockItem
          key={item.id}
          icon={item.icon}
          label={item.label}
          isActive={activeItemId === item.id}
          onClick={item.onClick}
          badge={item.badge}
          testId={testId ? `${testId}-item-${item.id}` : undefined}
        />
      ))}
    </div>
  );
}
