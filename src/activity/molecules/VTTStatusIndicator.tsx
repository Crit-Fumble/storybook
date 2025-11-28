import { clsx } from 'clsx';
import type { ContainerStatus } from '../types';

export interface VTTStatusIndicatorProps {
  /** Current container status */
  status: ContainerStatus;
  /** When the container was last active */
  lastActiveAt?: Date;
  /** Whether to show the status label */
  showLabel?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const statusConfig: Record<ContainerStatus, { label: string; color: string; pulse?: boolean }> = {
  stopped: {
    label: 'Stopped',
    color: 'bg-cfg-text-muted',
  },
  starting: {
    label: 'Starting...',
    color: 'bg-cfg-yellow',
    pulse: true,
  },
  running: {
    label: 'Running',
    color: 'bg-cfg-green',
  },
  error: {
    label: 'Error',
    color: 'bg-cfg-red',
  },
};

function formatLastActive(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export function VTTStatusIndicator({
  status,
  lastActiveAt,
  showLabel = true,
  className,
}: VTTStatusIndicatorProps) {
  const config = statusConfig[status];

  return (
    <div className={clsx('flex items-center gap-2', className)}>
      <span
        className={clsx(
          'w-2.5 h-2.5 rounded-full',
          config.color,
          config.pulse && 'animate-pulse'
        )}
      />
      {showLabel && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-cfg-text-normal font-medium">
            {config.label}
          </span>
          {lastActiveAt && status === 'stopped' && (
            <span className="text-xs text-cfg-text-muted">
              (Last active: {formatLastActive(lastActiveAt)})
            </span>
          )}
        </div>
      )}
    </div>
  );
}
