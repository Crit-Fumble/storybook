import { clsx } from 'clsx';
import { Card } from '../../shared/molecules';
import { Button, Badge } from '../../shared/atoms';
import type { GameSession, SessionStatus } from '../types';

function formatDuration(startDate: Date, endDate?: Date | null): string {
  const end = endDate || new Date();
  const diffMs = end.getTime() - new Date(startDate).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const remainingMins = diffMins % 60;

  if (diffHours > 0) {
    return `${diffHours}h ${remainingMins}m`;
  }
  return `${diffMins}m`;
}

function formatDateTime(date: Date): string {
  return new Date(date).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

const statusConfig: Record<SessionStatus, { label: string; variant: 'success' | 'warning' | 'default' }> = {
  active: { label: 'Live', variant: 'success' },
  paused: { label: 'Paused', variant: 'warning' },
  ended: { label: 'Ended', variant: 'default' },
};

export interface GameSessionCardProps {
  /** Game session data */
  session: GameSession;
  /** Channel name for display */
  channelName?: string;
  /** Voice channel name for display */
  voiceChannelName?: string;
  /** Called when resume button is clicked (for paused sessions) */
  onResume?: () => void;
  /** Called when pause button is clicked (for active sessions) */
  onPause?: () => void;
  /** Called when end button is clicked */
  onEnd?: () => void;
  /** Called when view button is clicked */
  onView?: () => void;
  /** Whether an action is in progress */
  isLoading?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

export function GameSessionCard({
  session,
  channelName,
  voiceChannelName,
  onResume,
  onPause,
  onEnd,
  onView,
  isLoading = false,
  className,
  testId = 'game-session-card',
}: GameSessionCardProps) {
  const config = statusConfig[session.status];
  const isActive = session.status === 'active';
  const isPaused = session.status === 'paused';
  const isEnded = session.status === 'ended';

  return (
    <Card
      className={clsx('bg-cfg-background-secondary', className)}
      testId={testId}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <h3
              className="text-sm font-medium text-cfg-text-normal truncate"
              data-testid={`${testId}-name`}
            >
              {session.name || 'Unnamed Session'}
            </h3>
            <Badge
              variant={config.variant}
              size="sm"
              testId={`${testId}-status`}
            >
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse mr-1" />
              )}
              {config.label}
            </Badge>
          </div>

          {/* Details */}
          <div className="space-y-1 text-xs text-cfg-text-muted">
            <p data-testid={`${testId}-started`}>
              Started: {formatDateTime(session.startedAt)}
            </p>

            {isEnded && session.endedAt && (
              <p data-testid={`${testId}-ended`}>
                Ended: {formatDateTime(session.endedAt)}
              </p>
            )}

            <p data-testid={`${testId}-duration`}>
              Duration: {formatDuration(session.startedAt, session.endedAt)}
              {!isEnded && ' (ongoing)'}
            </p>

            {channelName && (
              <p data-testid={`${testId}-channel`}>
                Channel: #{channelName}
              </p>
            )}

            {voiceChannelName && (
              <p data-testid={`${testId}-voice-channel`}>
                Voice: #{voiceChannelName}
              </p>
            )}
          </div>

          {/* Summary */}
          {session.summary && (
            <p
              className="mt-2 text-sm text-cfg-text-normal/80 line-clamp-2"
              data-testid={`${testId}-summary`}
            >
              {session.summary}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 flex-shrink-0">
          {isActive && onPause && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onPause}
              disabled={isLoading}
              testId={`${testId}-pause-btn`}
            >
              Pause
            </Button>
          )}

          {isPaused && onResume && (
            <Button
              variant="primary"
              size="sm"
              onClick={onResume}
              disabled={isLoading}
              testId={`${testId}-resume-btn`}
            >
              Resume
            </Button>
          )}

          {!isEnded && onEnd && (
            <Button
              variant="danger"
              size="sm"
              onClick={onEnd}
              disabled={isLoading}
              testId={`${testId}-end-btn`}
            >
              End
            </Button>
          )}

          {onView && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onView}
              testId={`${testId}-view-btn`}
            >
              View
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
