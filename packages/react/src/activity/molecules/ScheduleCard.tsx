import { clsx } from 'clsx';

export interface ScheduleCardProps {
  /** Party or event name */
  name: string;
  /** Campaign name */
  campaignName?: string | null;
  /** Next occurrence start time */
  nextStart: string | Date;
  /** Next occurrence end time */
  nextEnd?: string | Date | null;
  /** Duration in minutes (alternative to nextEnd) */
  duration?: number | null;
  /** IANA timezone */
  timezone?: string | null;
  /** Whether this is a recurring schedule */
  isRecurring?: boolean;
  /** Human-readable recurrence description */
  recurrenceDescription?: string | null;
  /** Party color */
  color?: string | null;
  /** Called when card is clicked */
  onClick?: () => void;
  /** Called when join is requested */
  onJoin?: () => void;
  /** Whether actions are loading */
  isLoading?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID */
  testId?: string;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });
}

function formatDate(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const targetDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (targetDay.getTime() === today.getTime()) {
    return 'Today';
  }
  if (targetDay.getTime() === tomorrow.getTime()) {
    return 'Tomorrow';
  }

  const diffDays = Math.floor((targetDay.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));
  if (diffDays < 7 && diffDays > 0) {
    return date.toLocaleDateString(undefined, { weekday: 'long' });
  }

  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function formatCountdown(date: Date): string {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();

  if (diffMs < 0) return 'Started';
  if (diffMs < 60 * 1000) return 'Starting now';
  if (diffMs < 60 * 60 * 1000) {
    const mins = Math.floor(diffMs / (60 * 1000));
    return `In ${mins}m`;
  }
  if (diffMs < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diffMs / (60 * 60 * 1000));
    return `In ${hours}h`;
  }
  const days = Math.floor(diffMs / (24 * 60 * 60 * 1000));
  return `In ${days}d`;
}

function getEndTime(start: Date, end?: Date | null, duration?: number | null): Date | null {
  if (end) return end;
  if (duration) return new Date(start.getTime() + duration * 60 * 1000);
  return null;
}

export function ScheduleCard({
  name,
  campaignName,
  nextStart,
  nextEnd,
  duration,
  timezone,
  isRecurring = false,
  recurrenceDescription,
  color,
  onClick,
  onJoin,
  isLoading = false,
  className,
  testId = 'schedule-card',
}: ScheduleCardProps) {
  const startDate = typeof nextStart === 'string' ? new Date(nextStart) : nextStart;
  const endDate = nextEnd
    ? typeof nextEnd === 'string' ? new Date(nextEnd) : nextEnd
    : getEndTime(startDate, null, duration);

  const now = new Date();
  const isUpcoming = startDate.getTime() > now.getTime();
  const isHappeningNow = !isUpcoming && endDate && endDate.getTime() > now.getTime();

  return (
    <div
      className={clsx(
        'rounded-lg border p-4 transition-all',
        isHappeningNow
          ? 'bg-cfg-primary/10 border-cfg-primary'
          : 'bg-cfg-background-secondary border-cfg-border',
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
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
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

        <div
          className={clsx(
            'text-sm font-medium flex-shrink-0',
            isHappeningNow ? 'text-cfg-green' : 'text-cfg-accent'
          )}
          data-testid={`${testId}-countdown`}
        >
          {isHappeningNow ? 'Live Now' : formatCountdown(startDate)}
        </div>
      </div>

      {/* Campaign */}
      {campaignName && (
        <div
          className="text-xs text-cfg-text-muted mb-3"
          data-testid={`${testId}-campaign`}
        >
          {campaignName}
        </div>
      )}

      {/* Date and time */}
      <div className="flex items-center gap-4 mb-2">
        <div data-testid={`${testId}-date`}>
          <div className="text-xs text-cfg-text-muted">Date</div>
          <div className="text-sm font-medium text-cfg-text-normal">
            {formatDate(startDate)}
          </div>
        </div>
        <div data-testid={`${testId}-time`}>
          <div className="text-xs text-cfg-text-muted">Time</div>
          <div className="text-sm text-cfg-text-normal">
            {formatTime(startDate)}
            {endDate && ` - ${formatTime(endDate)}`}
          </div>
        </div>
      </div>

      {/* Timezone */}
      {timezone && (
        <div
          className="text-xs text-cfg-text-muted mb-2"
          data-testid={`${testId}-timezone`}
        >
          {timezone}
        </div>
      )}

      {/* Recurrence */}
      {isRecurring && (
        <div
          className="flex items-center gap-1 text-xs text-cfg-text-muted"
          data-testid={`${testId}-recurrence`}
        >
          <span>🔄</span>
          <span>{recurrenceDescription || 'Recurring'}</span>
        </div>
      )}

      {/* Join button */}
      {onJoin && (
        <button
          type="button"
          className={clsx(
            'w-full mt-3 py-2 rounded font-medium text-sm transition-colors',
            isHappeningNow
              ? 'bg-cfg-green text-white hover:bg-green-600'
              : 'bg-cfg-primary text-white hover:bg-cfg-primary-hover'
          )}
          onClick={(e) => {
            e.stopPropagation();
            onJoin();
          }}
          disabled={isLoading}
          data-testid={`${testId}-join-btn`}
        >
          {isHappeningNow ? 'Join Now' : 'Set Reminder'}
        </button>
      )}
    </div>
  );
}
