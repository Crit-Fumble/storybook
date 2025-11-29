import { clsx } from 'clsx';
import type { SessionMessage, MessageType } from '@crit-fumble/core/types';
import { Badge } from '../../shared/atoms/Badge';

export interface SessionMessageListProps {
  /** List of session messages */
  messages: SessionMessage[];
  /** Character name lookup by ID */
  characterNames?: Record<string, string>;
  /** User name lookup by Discord ID */
  userNames?: Record<string, string>;
  /** Loading state */
  isLoading?: boolean;
  /** Handler for loading more messages */
  onLoadMore?: () => void;
  /** Whether there are more messages to load */
  hasMore?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

const messageTypeConfig: Record<MessageType, { label: string; variant: 'default' | 'primary' | 'success' | 'warning' | 'danger'; bgClass: string }> = {
  ic: {
    label: 'IC',
    variant: 'primary',
    bgClass: 'bg-discord-primary/10 border-l-discord-primary',
  },
  ooc: {
    label: 'OOC',
    variant: 'default',
    bgClass: 'bg-discord-background-tertiary border-l-discord-text-muted',
  },
  narration: {
    label: 'Narration',
    variant: 'warning',
    bgClass: 'bg-discord-yellow/10 border-l-discord-yellow',
  },
  roll: {
    label: 'Roll',
    variant: 'success',
    bgClass: 'bg-discord-green/10 border-l-discord-green',
  },
  system: {
    label: 'System',
    variant: 'danger',
    bgClass: 'bg-discord-red/10 border-l-discord-red',
  },
};

function formatTimestamp(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function MessageRow({
  message,
  characterName,
  userName,
}: {
  message: SessionMessage;
  characterName?: string;
  userName?: string;
}) {
  const config = messageTypeConfig[message.messageType];
  const displayName = characterName || userName || message.discordId;

  return (
    <div
      className={clsx(
        'p-3 border-l-4 rounded-r-lg',
        config.bgClass
      )}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-discord-text-normal font-medium text-sm">
          {displayName}
        </span>
        <Badge variant={config.variant} size="sm">
          {config.label}
        </Badge>
        <span className="text-discord-text-muted text-xs ml-auto">
          {formatTimestamp(new Date(message.timestamp))}
        </span>
      </div>
      <p className={clsx(
        'text-discord-text-normal text-sm',
        message.messageType === 'ic' && 'italic',
        message.messageType === 'narration' && 'italic text-discord-yellow'
      )}>
        {message.content}
      </p>
    </div>
  );
}

export function SessionMessageList({
  messages,
  characterNames = {},
  userNames = {},
  isLoading = false,
  onLoadMore,
  hasMore = false,
  className,
  testId = 'session-message-list',
}: SessionMessageListProps) {
  if (isLoading && messages.length === 0) {
    return (
      <div data-testid={testId} className={clsx('space-y-3', className)}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-16 bg-discord-background-secondary rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div
        data-testid={testId}
        className={clsx(
          'bg-discord-background-secondary rounded-lg p-8 text-center',
          className
        )}
      >
        <p className="text-discord-text-muted text-sm">No messages yet.</p>
      </div>
    );
  }

  return (
    <div data-testid={testId} className={clsx('space-y-2', className)}>
      {messages.map((message) => (
        <MessageRow
          key={message.id}
          message={message}
          characterName={message.characterId ? characterNames[message.characterId] : undefined}
          userName={userNames[message.discordId]}
        />
      ))}

      {hasMore && onLoadMore && (
        <button
          onClick={onLoadMore}
          disabled={isLoading}
          className="w-full py-2 text-sm text-discord-text-muted hover:text-discord-text-normal bg-discord-background-secondary hover:bg-discord-background-floating rounded-lg transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}
