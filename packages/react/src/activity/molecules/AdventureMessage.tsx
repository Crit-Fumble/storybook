import { clsx } from 'clsx';
import type { AdventureMessageType } from '@crit-fumble/core/types';

export type { AdventureMessageType };

export interface AdventureMessageProps {
  /** Message ID */
  id: string;
  /** Player/sender name */
  playerName: string;
  /** Message type */
  type: AdventureMessageType;
  /** Message content */
  content: string;
  /** When the message was sent */
  timestamp?: string | Date | null;
  /** Whether this is from the current user */
  isOwnMessage?: boolean;
  /** Whether this is from a DM/bot */
  isDM?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID */
  testId?: string;
}

function formatTimestamp(date: string | Date | null | undefined): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function AdventureMessage({
  id: _id,
  playerName,
  type,
  content,
  timestamp,
  isOwnMessage = false,
  isDM = false,
  className,
  testId = 'adventure-message',
}: AdventureMessageProps) {
  // System messages
  if (type === 'system') {
    return (
      <div
        className={clsx(
          'text-center text-xs text-cfg-text-muted italic py-1',
          className
        )}
        data-testid={testId}
      >
        <span data-testid={`${testId}-content`}>{content}</span>
        {timestamp && (
          <span
            className="ml-2 opacity-60"
            data-testid={`${testId}-timestamp`}
          >
            {formatTimestamp(timestamp)}
          </span>
        )}
      </div>
    );
  }

  // Narrative messages (DM descriptions)
  if (type === 'narrative') {
    return (
      <div
        className={clsx(
          'py-2 px-3 rounded bg-cfg-background-floating border-l-2 border-cfg-accent',
          className
        )}
        data-testid={testId}
      >
        <div className="text-sm text-cfg-text-normal italic" data-testid={`${testId}-content`}>
          {content}
        </div>
        {timestamp && (
          <div
            className="text-xs text-cfg-text-muted mt-1"
            data-testid={`${testId}-timestamp`}
          >
            {formatTimestamp(timestamp)}
          </div>
        )}
      </div>
    );
  }

  // Action messages: *player does something*
  if (type === 'action') {
    return (
      <div
        className={clsx('py-1', className)}
        data-testid={testId}
      >
        <span className="text-sm">
          <span
            className={clsx(
              'font-medium',
              isDM ? 'text-cfg-accent' : isOwnMessage ? 'text-cfg-primary' : 'text-cfg-text-normal'
            )}
            data-testid={`${testId}-player`}
          >
            {playerName}
          </span>
          <span className="text-cfg-yellow" data-testid={`${testId}-content`}>
            {' '}{content}
          </span>
        </span>
        {timestamp && (
          <span
            className="text-xs text-cfg-text-muted ml-2"
            data-testid={`${testId}-timestamp`}
          >
            {formatTimestamp(timestamp)}
          </span>
        )}
      </div>
    );
  }

  // Emote messages: *player smiles*
  if (type === 'emote') {
    return (
      <div
        className={clsx('py-1 italic', className)}
        data-testid={testId}
      >
        <span className="text-sm text-cfg-text-muted">
          <span className="text-cfg-yellow">*</span>
          <span
            className={clsx(
              'font-medium',
              isDM ? 'text-cfg-accent' : isOwnMessage ? 'text-cfg-primary' : 'text-cfg-text-normal'
            )}
            data-testid={`${testId}-player`}
          >
            {playerName}
          </span>
          <span data-testid={`${testId}-content`}>
            {' '}{content}
          </span>
          <span className="text-cfg-yellow">*</span>
        </span>
        {timestamp && (
          <span
            className="text-xs text-cfg-text-muted ml-2 not-italic"
            data-testid={`${testId}-timestamp`}
          >
            {formatTimestamp(timestamp)}
          </span>
        )}
      </div>
    );
  }

  // Say messages: Player says "content"
  return (
    <div
      className={clsx('py-1', className)}
      data-testid={testId}
    >
      <span className="text-sm">
        <span
          className={clsx(
            'font-medium',
            isDM ? 'text-cfg-accent' : isOwnMessage ? 'text-cfg-primary' : 'text-cfg-text-normal'
          )}
          data-testid={`${testId}-player`}
        >
          {playerName}
        </span>
        <span className="text-cfg-text-muted"> says </span>
        <span className="text-cfg-text-normal" data-testid={`${testId}-content`}>
          "{content}"
        </span>
      </span>
      {timestamp && (
        <span
          className="text-xs text-cfg-text-muted ml-2"
          data-testid={`${testId}-timestamp`}
        >
          {formatTimestamp(timestamp)}
        </span>
      )}
    </div>
  );
}
