import { clsx } from 'clsx';
import { Badge } from '../../shared/atoms/Badge';

export interface PartyCardProps {
  /** Party ID */
  id: string;
  /** Party name */
  name: string;
  /** Party description */
  description?: string | null;
  /** Custom color */
  color?: string | null;
  /** Number of members */
  memberCount?: number;
  /** Number of sessions */
  sessionCount?: number;
  /** Whether party is active */
  isActive?: boolean;
  /** Next session date */
  nextSessionAt?: string | Date | null;
  /** Session duration in minutes */
  sessionDuration?: number | null;
  /** Timezone for schedule */
  timezone?: string | null;
  /** Whether party has a recurring schedule */
  hasSchedule?: boolean;
  /** Voice channel name */
  voiceChannelName?: string | null;
  /** Text channel name */
  textChannelName?: string | null;
  /** Campaign name */
  campaignName?: string | null;
  /** Called when card is clicked */
  onClick?: () => void;
  /** Called when edit button clicked */
  onEdit?: () => void;
  /** Called when delete button clicked */
  onDelete?: () => void;
  /** Whether actions are loading */
  isLoading?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID */
  testId?: string;
}

function formatNextSession(date: string | Date | null | undefined): string {
  if (!date) return 'Not scheduled';

  const nextDate = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = nextDate.getTime() - now.getTime();

  if (diffMs < 0) return 'Past due';

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (diffDays === 0) {
    if (diffHours === 0) return 'Starting soon';
    return `In ${diffHours}h`;
  }
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays < 7) return `In ${diffDays} days`;

  return nextDate.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

function formatDuration(minutes: number | null | undefined): string {
  if (!minutes) return '';
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function PartyCard({
  id: _id,
  name,
  description,
  color,
  memberCount = 0,
  sessionCount = 0,
  isActive = true,
  nextSessionAt,
  sessionDuration,
  timezone,
  hasSchedule = false,
  voiceChannelName,
  textChannelName,
  campaignName,
  onClick,
  onEdit,
  onDelete,
  isLoading = false,
  className,
  testId = 'party-card',
}: PartyCardProps) {
  return (
    <div
      className={clsx(
        'rounded-lg border p-4 transition-all',
        isActive
          ? 'bg-cfg-background-secondary border-cfg-border'
          : 'bg-cfg-background-tertiary border-cfg-border opacity-60',
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
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          {/* Color indicator */}
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: color || '#552e66' }}
            data-testid={`${testId}-color`}
          />
          <h3
            className="font-display font-semibold text-cfg-text-normal truncate"
            data-testid={`${testId}-name`}
          >
            {name}
          </h3>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {!isActive && (
            <Badge variant="warning" size="sm" testId={`${testId}-inactive-badge`}>
              Inactive
            </Badge>
          )}
          {hasSchedule && (
            <Badge variant="success" size="sm" testId={`${testId}-schedule-badge`}>
              Scheduled
            </Badge>
          )}
        </div>
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

      {/* Campaign */}
      {campaignName && (
        <div className="text-xs text-cfg-text-muted mb-2" data-testid={`${testId}-campaign`}>
          Campaign: <span className="text-cfg-text-normal">{campaignName}</span>
        </div>
      )}

      {/* Stats row */}
      <div className="flex items-center gap-4 text-sm text-cfg-text-muted mb-3">
        <span data-testid={`${testId}-member-count`}>
          {memberCount} {memberCount === 1 ? 'member' : 'members'}
        </span>
        <span data-testid={`${testId}-session-count`}>
          {sessionCount} {sessionCount === 1 ? 'session' : 'sessions'}
        </span>
      </div>

      {/* Next session */}
      {hasSchedule && (
        <div
          className="flex items-center justify-between bg-cfg-background-tertiary rounded px-3 py-2 mb-3"
          data-testid={`${testId}-next-session`}
        >
          <div>
            <div className="text-xs text-cfg-text-muted">Next Session</div>
            <div className="text-sm font-medium text-cfg-text-normal">
              {formatNextSession(nextSessionAt)}
            </div>
          </div>
          {sessionDuration && (
            <div className="text-right">
              <div className="text-xs text-cfg-text-muted">Duration</div>
              <div className="text-sm text-cfg-text-normal">
                {formatDuration(sessionDuration)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Channels */}
      {(voiceChannelName || textChannelName) && (
        <div className="flex flex-wrap gap-2 text-xs text-cfg-text-muted mb-3">
          {voiceChannelName && (
            <span data-testid={`${testId}-voice-channel`}>
              🔊 {voiceChannelName}
            </span>
          )}
          {textChannelName && (
            <span data-testid={`${testId}-text-channel`}>
              💬 {textChannelName}
            </span>
          )}
        </div>
      )}

      {/* Timezone */}
      {timezone && (
        <div className="text-xs text-cfg-text-muted" data-testid={`${testId}-timezone`}>
          {timezone}
        </div>
      )}

      {/* Actions */}
      {(onEdit || onDelete) && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-cfg-border">
          {onEdit && (
            <button
              type="button"
              className="text-sm text-cfg-text-muted hover:text-cfg-text-normal transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              disabled={isLoading}
              data-testid={`${testId}-edit-btn`}
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              className="text-sm text-cfg-red hover:text-red-400 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              disabled={isLoading}
              data-testid={`${testId}-delete-btn`}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
