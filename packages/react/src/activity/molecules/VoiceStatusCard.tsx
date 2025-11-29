import { clsx } from 'clsx';
import { Card } from '../../shared/molecules';
import { StatusDot, type StatusType } from '../atoms';
import type { VoiceStatusResponse } from '../types';

export interface VoiceStatusCardProps {
  /** Voice status data from API */
  status: VoiceStatusResponse;
  /** Channel name (if known) */
  channelName?: string;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

export function VoiceStatusCard({
  status,
  channelName,
  className,
  testId = 'voice-status-card',
}: VoiceStatusCardProps) {
  const getStatusType = (): StatusType => {
    if (!status.connected) return 'stopped';
    if (status.listening) return 'active';
    return 'warning'; // connected but not listening
  };

  const getStatusLabel = () => {
    if (!status.connected) return 'Disconnected';
    if (status.listening) return 'Listening';
    return 'Connected';
  };

  return (
    <Card
      className={clsx('bg-cfg-background-secondary', className)}
      testId={testId}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Voice icon */}
          <div className="w-10 h-10 rounded-full bg-cfg-background-tertiary flex items-center justify-center">
            <svg
              className={clsx(
                'w-5 h-5',
                status.connected ? 'text-cfg-green' : 'text-cfg-text-muted'
              )}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span
                className="font-medium text-cfg-text-normal"
                data-testid={`${testId}-label`}
              >
                Voice
              </span>
              <StatusDot status={getStatusType()} />
            </div>
            <p
              className="text-sm text-cfg-text-muted"
              data-testid={`${testId}-status`}
            >
              {getStatusLabel()}
              {status.connected && status.channelId && (
                <span className="text-cfg-text-link ml-1">
                  {channelName ? `in #${channelName}` : `in channel`}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Listening indicator */}
        {status.listening && (
          <div
            className="flex items-center gap-1.5 px-2 py-1 bg-cfg-green/20 rounded text-cfg-green text-xs font-medium"
            data-testid={`${testId}-listening`}
          >
            <span className="w-2 h-2 bg-cfg-green rounded-full animate-pulse" />
            Listening
          </div>
        )}
      </div>
    </Card>
  );
}
