import { clsx } from 'clsx';
import { Badge } from '../../shared/atoms/Badge';

export type AdventureStatus = 'waiting' | 'active' | 'paused' | 'ended';

export interface AdventureCardProps {
  /** Adventure ID */
  id: string;
  /** Adventure name */
  name: string;
  /** Adventure description */
  description?: string | null;
  /** Current status */
  status: AdventureStatus;
  /** Number of players */
  playerCount: number;
  /** Channel name */
  channelName?: string | null;
  /** When the adventure was created */
  createdAt?: string | Date | null;
  /** When the adventure started */
  startedAt?: string | Date | null;
  /** Called when card is clicked */
  onClick?: () => void;
  /** Called when join is requested */
  onJoin?: () => void;
  /** Called when start is requested (for waiting adventures) */
  onStart?: () => void;
  /** Called when end is requested */
  onEnd?: () => void;
  /** Whether actions are loading */
  isLoading?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID */
  testId?: string;
}

const statusLabels: Record<AdventureStatus, string> = {
  waiting: 'Waiting',
  active: 'Active',
  paused: 'Paused',
  ended: 'Ended',
};

const statusVariants: Record<AdventureStatus, 'default' | 'success' | 'warning' | 'danger'> = {
  waiting: 'warning',
  active: 'success',
  paused: 'default',
  ended: 'danger',
};

function formatTimeAgo(date: string | Date | null | undefined): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / (60 * 1000));
  const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
  const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString();
}

export function AdventureCard({
  id: _id,
  name,
  description,
  status,
  playerCount,
  channelName,
  createdAt,
  startedAt,
  onClick,
  onJoin,
  onStart,
  onEnd,
  isLoading = false,
  className,
  testId = 'adventure-card',
}: AdventureCardProps) {
  const canJoin = status === 'waiting' || status === 'active';
  const canStart = status === 'waiting';
  const canEnd = status === 'active' || status === 'paused';

  return (
    <div
      className={clsx(
        'rounded-lg border p-4 transition-all',
        status === 'active'
          ? 'bg-cfg-primary/10 border-cfg-primary'
          : 'bg-cfg-background-secondary border-cfg-border',
        status === 'ended' && 'opacity-60',
        onClick && !isLoading && 'cursor-pointer hover:bg-cfg-background-floating',
        isLoading && 'opacity-70 pointer-events-none',
        className
      )}
      onClick={!isLoading ? onClick : undefined}
      data-testid={testId}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3
          className="font-display font-semibold text-cfg-text-normal truncate"
          data-testid={`${testId}-name`}
        >
          {name}
        </h3>
        <Badge
          variant={statusVariants[status]}
          size="sm"
          testId={`${testId}-status-badge`}
        >
          {statusLabels[status]}
        </Badge>
      </div>

      {/* Description */}
      {description && (
        <p
          className="text-sm text-cfg-text-muted mb-3 line-clamp-2"
          data-testid={`${testId}-description`}
        >
          {description}
        </p>
      )}

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-cfg-text-muted mb-2">
        <span data-testid={`${testId}-player-count`}>
          👥 {playerCount} {playerCount === 1 ? 'player' : 'players'}
        </span>
        {channelName && (
          <span data-testid={`${testId}-channel`}>
            #{channelName}
          </span>
        )}
      </div>

      {/* Time info */}
      <div className="text-xs text-cfg-text-muted">
        {status === 'active' && startedAt && (
          <span data-testid={`${testId}-started`}>
            Started {formatTimeAgo(startedAt)}
          </span>
        )}
        {status === 'waiting' && createdAt && (
          <span data-testid={`${testId}-created`}>
            Created {formatTimeAgo(createdAt)}
          </span>
        )}
        {status === 'ended' && startedAt && (
          <span data-testid={`${testId}-ended`}>
            Ran {formatTimeAgo(startedAt)}
          </span>
        )}
      </div>

      {/* Actions */}
      {(onJoin || onStart || onEnd) && status !== 'ended' && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-cfg-border">
          {onJoin && canJoin && (
            <button
              type="button"
              className="flex-1 py-1.5 rounded bg-cfg-primary text-white text-sm font-medium hover:bg-cfg-primary-hover transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onJoin();
              }}
              disabled={isLoading}
              data-testid={`${testId}-join-btn`}
            >
              Join Adventure
            </button>
          )}
          {onStart && canStart && (
            <button
              type="button"
              className="flex-1 py-1.5 rounded bg-cfg-green text-white text-sm font-medium hover:bg-green-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onStart();
              }}
              disabled={isLoading}
              data-testid={`${testId}-start-btn`}
            >
              Start
            </button>
          )}
          {onEnd && canEnd && (
            <button
              type="button"
              className="py-1.5 px-3 rounded text-cfg-red text-sm hover:bg-cfg-red/10 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onEnd();
              }}
              disabled={isLoading}
              data-testid={`${testId}-end-btn`}
            >
              End
            </button>
          )}
        </div>
      )}
    </div>
  );
}
