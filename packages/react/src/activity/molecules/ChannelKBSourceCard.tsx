import { clsx } from 'clsx';
import { Badge } from '../../shared/atoms/Badge';
import type { ChannelKBSource, ChannelKBType } from '../types';

export interface ChannelKBSourceCardProps {
  /** The channel KB source data */
  source: ChannelKBSource;
  /** Whether this card is selected */
  isSelected?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Toggle enabled state */
  onToggleEnabled?: (enabled: boolean) => void;
  /** Sync handler */
  onSync?: () => void;
  /** Delete handler */
  onDelete?: () => void;
  /** Whether sync is in progress */
  isSyncing?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

const channelTypeColors: Record<ChannelKBType, string> = {
  text: 'primary',
  forum: 'warning',
  thread: 'success',
};

const channelTypeIcons: Record<ChannelKBType, React.ReactNode> = {
  text: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z" />
    </svg>
  ),
  forum: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 4h16v2H4V4zm0 7h16v2H4v-2zm0 7h16v2H4v-2z" />
    </svg>
  ),
  thread: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  ),
};

function formatDate(date: Date | string | null): string {
  if (!date) return 'Never';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function ChannelKBSourceCard({
  source,
  isSelected = false,
  onClick,
  onToggleEnabled,
  onSync,
  onDelete,
  isSyncing = false,
  className,
  testId = 'channel-kb-source-card',
}: ChannelKBSourceCardProps) {
  const statusColor =
    source.lastSyncStatus === 'success'
      ? 'text-discord-green'
      : source.lastSyncStatus === 'error'
        ? 'text-discord-red'
        : 'text-discord-text-muted';

  return (
    <div
      data-testid={testId}
      onClick={onClick}
      className={clsx(
        'bg-discord-background-secondary rounded-lg p-4 transition-all',
        onClick && 'cursor-pointer hover:bg-discord-background-floating',
        isSelected && 'ring-2 ring-discord-primary',
        !source.syncEnabled && 'opacity-60',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-discord-text-normal font-semibold truncate">
              {source.name}
            </h3>
            <Badge
              variant={channelTypeColors[source.channelType] as 'primary' | 'warning' | 'success'}
              size="sm"
            >
              <span className="flex items-center gap-1">
                {channelTypeIcons[source.channelType]}
                {source.channelType}
              </span>
            </Badge>
            <Badge variant="default" size="sm">
              {source.category}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-sm text-discord-text-muted mb-2">
            <span>#{source.channelName || source.channelId}</span>
            <span>•</span>
            <span>Max: {source.maxMessages} msgs</span>
          </div>

          {source.description && (
            <p className="text-discord-text-muted text-sm line-clamp-1 mb-2">
              {source.description}
            </p>
          )}

          <div className="flex items-center gap-3 text-xs text-discord-text-muted">
            <span className={statusColor}>
              Last sync: {formatDate(source.lastSyncAt)}
              {source.lastSyncStatus && ` (${source.lastSyncStatus})`}
            </span>
            {source.syncThreads && <span>Threads</span>}
            {source.syncPinned && <span>Pinned</span>}
          </div>

          {source.lastSyncError && (
            <p className="text-discord-red text-xs mt-1 truncate">
              Error: {source.lastSyncError}
            </p>
          )}
        </div>

        <div className="flex flex-col items-end gap-2">
          {/* Toggle Switch */}
          {onToggleEnabled && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleEnabled(!source.syncEnabled);
              }}
              className={clsx(
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                source.syncEnabled ? 'bg-discord-green' : 'bg-discord-background-tertiary'
              )}
              aria-label={source.syncEnabled ? 'Disable' : 'Enable'}
            >
              <span
                className={clsx(
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                  source.syncEnabled ? 'translate-x-6' : 'translate-x-1'
                )}
              />
            </button>
          )}

          {/* Sync Button */}
          {onSync && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSync();
              }}
              disabled={isSyncing}
              className={clsx(
                'p-1.5 text-discord-text-muted hover:text-discord-primary hover:bg-discord-background-tertiary rounded transition-colors',
                isSyncing && 'animate-spin'
              )}
              aria-label="Sync now"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          )}

          {/* Delete Button */}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-1.5 text-discord-text-muted hover:text-discord-red hover:bg-discord-background-tertiary rounded transition-colors"
              aria-label="Delete"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
