import { clsx } from 'clsx';
import { Card } from '../../shared/molecules';
import { StatusDot } from '../atoms';
import type { VoiceSessionsResponse } from '../types';

export interface VoiceSessionListProps {
  /** Voice sessions data from API */
  sessions: VoiceSessionsResponse;
  /** Guild names by ID (for display) */
  guildNames?: Record<string, string>;
  /** Channel names by ID (for display) */
  channelNames?: Record<string, string>;
  /** Called when user clicks on a session */
  onSessionClick?: (guildId: string, channelId: string) => void;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

export function VoiceSessionList({
  sessions,
  guildNames = {},
  channelNames = {},
  onSessionClick,
  className,
  testId = 'voice-session-list',
}: VoiceSessionListProps) {
  if (sessions.count === 0) {
    return (
      <Card
        className={clsx('bg-cfg-background-secondary', className)}
        testId={testId}
      >
        <div className="text-center py-4">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-cfg-background-tertiary flex items-center justify-center">
            <svg
              className="w-6 h-6 text-cfg-text-muted"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          </div>
          <p
            className="text-cfg-text-muted text-sm"
            data-testid={`${testId}-empty`}
          >
            No active voice sessions
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={clsx('bg-cfg-background-secondary', className)}
      testId={testId}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-cfg-text-normal">
          Active Voice Sessions
        </h3>
        <span
          className="text-xs text-cfg-text-muted bg-cfg-background-tertiary px-2 py-0.5 rounded"
          data-testid={`${testId}-count`}
        >
          {sessions.count}
        </span>
      </div>

      <div className="space-y-2" data-testid={`${testId}-items`}>
        {sessions.sessions.map((session, index) => {
          const guildName = guildNames[session.guildId] || session.guildId;
          const channelName = channelNames[session.channelId] || session.channelId;

          return (
            <div
              key={`${session.guildId}-${session.channelId}`}
              className={clsx(
                'flex items-center justify-between p-2 rounded bg-cfg-background-tertiary',
                onSessionClick && 'cursor-pointer hover:bg-cfg-background-floating'
              )}
              onClick={() => onSessionClick?.(session.guildId, session.channelId)}
              data-testid={`${testId}-item-${index}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-cfg-primary/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-cfg-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p
                    className="text-sm font-medium text-cfg-text-normal truncate"
                    data-testid={`${testId}-item-${index}-guild`}
                  >
                    {guildName}
                  </p>
                  <p
                    className="text-xs text-cfg-text-muted truncate"
                    data-testid={`${testId}-item-${index}-channel`}
                  >
                    #{channelName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {session.listening && (
                  <span
                    className="flex items-center gap-1 text-xs text-cfg-green"
                    data-testid={`${testId}-item-${index}-listening`}
                  >
                    <StatusDot status="active" />
                    Listening
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
