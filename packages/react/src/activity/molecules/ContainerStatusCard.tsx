import { clsx } from 'clsx';
import { Button, Spinner } from '../../shared/atoms';
import type { ContainerStatus } from '../types';

export interface ContainerStatusCardProps {
  /** Current container status */
  status: ContainerStatus;
  /** Container ID (if running) */
  containerId?: string | null;
  /** Container port (if running) */
  containerPort?: number | null;
  /** Campaign name for display */
  campaignName?: string;
  /** Last activity timestamp */
  lastActiveAt?: Date | null;
  /** Called when user wants to start the container */
  onStart?: () => void;
  /** Called when user wants to stop the container */
  onStop?: () => void;
  /** Called when user wants to restart the container */
  onRestart?: () => void;
  /** Whether an action is in progress */
  isLoading?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

const statusConfig: Record<ContainerStatus, { label: string; color: string; icon: string }> = {
  stopped: {
    label: 'Stopped',
    color: 'text-cfg-text-muted',
    icon: '⏹️',
  },
  starting: {
    label: 'Starting',
    color: 'text-cfg-yellow',
    icon: '🔄',
  },
  running: {
    label: 'Running',
    color: 'text-cfg-green',
    icon: '✅',
  },
  error: {
    label: 'Error',
    color: 'text-cfg-red',
    icon: '❌',
  },
};

function formatLastActive(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString();
}

export function ContainerStatusCard({
  status,
  containerId,
  containerPort,
  campaignName,
  lastActiveAt,
  onStart,
  onStop,
  onRestart,
  isLoading = false,
  className,
  testId = 'container-status-card',
}: ContainerStatusCardProps) {
  const config = statusConfig[status];
  const isRunning = status === 'running';
  const isStopped = status === 'stopped';
  const isStarting = status === 'starting';

  return (
    <div
      data-testid={testId}
      className={clsx(
        'bg-cfg-background-secondary rounded-lg p-4 border border-cfg-border',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl" data-testid={`${testId}-icon`}>
            {isStarting ? (
              <Spinner size="sm" />
            ) : (
              config.icon
            )}
          </span>
          <div>
            <h3 className="text-cfg-text-normal font-semibold" data-testid={`${testId}-title`}>
              {campaignName ? `${campaignName} Container` : 'VTT Container'}
            </h3>
            <p className={clsx('text-sm font-medium', config.color)} data-testid={`${testId}-status`}>
              {config.label}
            </p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        {containerId && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-cfg-text-muted">Container ID</span>
            <code
              className="text-cfg-text-normal bg-cfg-background-tertiary px-2 py-0.5 rounded text-xs"
              data-testid={`${testId}-container-id`}
            >
              {containerId.slice(0, 12)}
            </code>
          </div>
        )}

        {containerPort && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-cfg-text-muted">Port</span>
            <span className="text-cfg-text-normal" data-testid={`${testId}-port`}>
              {containerPort}
            </span>
          </div>
        )}

        {lastActiveAt && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-cfg-text-muted">Last Active</span>
            <span className="text-cfg-text-normal" data-testid={`${testId}-last-active`}>
              {formatLastActive(lastActiveAt)}
            </span>
          </div>
        )}

        {!containerId && !containerPort && !lastActiveAt && (
          <p className="text-sm text-cfg-text-muted text-center py-2" data-testid={`${testId}-no-details`}>
            No container details available
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-3 border-t border-cfg-border">
        {isStopped && onStart && (
          <Button
            variant="primary"
            size="sm"
            onClick={onStart}
            disabled={isLoading}
            isLoading={isLoading}
            testId={`${testId}-start-btn`}
            className="flex-1"
          >
            Start Container
          </Button>
        )}

        {isRunning && (
          <>
            {onStop && (
              <Button
                variant="danger"
                size="sm"
                onClick={onStop}
                disabled={isLoading}
                isLoading={isLoading}
                testId={`${testId}-stop-btn`}
                className="flex-1"
              >
                Stop
              </Button>
            )}
            {onRestart && (
              <Button
                variant="secondary"
                size="sm"
                onClick={onRestart}
                disabled={isLoading}
                testId={`${testId}-restart-btn`}
                className="flex-1"
              >
                Restart
              </Button>
            )}
          </>
        )}

        {isStarting && (
          <p className="text-sm text-cfg-text-muted text-center w-full py-1">
            Container is starting...
          </p>
        )}

        {status === 'error' && onStart && (
          <Button
            variant="primary"
            size="sm"
            onClick={onStart}
            disabled={isLoading}
            isLoading={isLoading}
            testId={`${testId}-retry-btn`}
            className="flex-1"
          >
            Retry Start
          </Button>
        )}
      </div>
    </div>
  );
}
