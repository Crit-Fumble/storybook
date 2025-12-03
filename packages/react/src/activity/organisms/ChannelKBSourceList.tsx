import { clsx } from 'clsx';
import { Button } from '../../shared/atoms/Button';
import { ChannelKBSourceCard } from '../molecules/ChannelKBSourceCard';
import type { ChannelKBSource, ChannelKBType } from '../types';

export interface ChannelKBSourceListProps {
  /** List of channel KB sources */
  sources: ChannelKBSource[];
  /** Currently selected source ID */
  selectedId?: string;
  /** Handler when a source is selected */
  onSelect?: (source: ChannelKBSource) => void;
  /** Handler when enabled is toggled */
  onToggleEnabled?: (source: ChannelKBSource, enabled: boolean) => void;
  /** Handler when sync is triggered */
  onSync?: (source: ChannelKBSource) => void;
  /** Handler when a source is deleted */
  onDelete?: (source: ChannelKBSource) => void;
  /** Handler for creating a new source */
  onCreate?: () => void;
  /** Filter by channel type */
  filterType?: ChannelKBType | 'all';
  /** Loading state */
  isLoading?: boolean;
  /** Map of source IDs currently syncing */
  syncingIds?: Set<string>;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

export function ChannelKBSourceList({
  sources,
  selectedId,
  onSelect,
  onToggleEnabled,
  onSync,
  onDelete,
  onCreate,
  filterType = 'all',
  isLoading = false,
  syncingIds = new Set(),
  className,
  testId = 'channel-kb-source-list',
}: ChannelKBSourceListProps) {
  const filteredSources =
    filterType === 'all'
      ? sources
      : sources.filter((s) => s.channelType === filterType);

  // Group by channel type
  const groupedSources = filteredSources.reduce(
    (acc, source) => {
      if (!acc[source.channelType]) {
        acc[source.channelType] = [];
      }
      acc[source.channelType].push(source);
      return acc;
    },
    {} as Record<ChannelKBType, ChannelKBSource[]>
  );

  const typeLabels: Record<ChannelKBType, string> = {
    text: 'Text Channels',
    forum: 'Forum Channels',
    thread: 'Threads',
  };

  const typeOrder: ChannelKBType[] = ['forum', 'text', 'thread'];

  if (isLoading) {
    return (
      <div data-testid={testId} className={clsx('space-y-4', className)}>
        <div className="flex items-center justify-between">
          <div className="h-6 bg-discord-background-tertiary rounded w-40 animate-pulse" />
          <div className="h-9 bg-discord-background-tertiary rounded w-32 animate-pulse" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 bg-discord-background-secondary rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div data-testid={testId} className={clsx('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-discord-text-normal text-lg font-display font-semibold">
          Channel KB Sources
          <span className="ml-2 text-sm text-discord-text-muted font-normal">
            ({filteredSources.length})
          </span>
        </h2>
        {onCreate && (
          <Button variant="primary" size="sm" onClick={onCreate}>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Source
            </span>
          </Button>
        )}
      </div>

      {/* Empty State */}
      {filteredSources.length === 0 && (
        <div className="bg-discord-background-secondary rounded-lg p-8 text-center">
          <div className="text-discord-text-muted mb-2">
            <svg
              className="w-12 h-12 mx-auto opacity-50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
          </div>
          <p className="text-discord-text-muted text-sm mb-4">
            No Discord channels configured as knowledge base sources yet.
          </p>
          <p className="text-discord-text-muted text-xs mb-4">
            Add channels or forums to let FumbleBot learn from your server's content.
          </p>
          {onCreate && (
            <Button variant="primary" size="sm" onClick={onCreate}>
              Add First Channel
            </Button>
          )}
        </div>
      )}

      {/* Grouped Lists */}
      {filterType === 'all' ? (
        // Show grouped by type
        typeOrder.map((type) => {
          const typeSources = groupedSources[type];
          if (!typeSources?.length) return null;

          return (
            <div key={type}>
              <h3 className="text-discord-text-muted text-sm font-medium mb-3">
                {typeLabels[type]}
              </h3>
              <div className="space-y-2">
                {typeSources
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((source) => (
                    <ChannelKBSourceCard
                      key={source.id}
                      source={source}
                      isSelected={source.id === selectedId}
                      onClick={onSelect ? () => onSelect(source) : undefined}
                      onToggleEnabled={
                        onToggleEnabled
                          ? (enabled) => onToggleEnabled(source, enabled)
                          : undefined
                      }
                      onSync={onSync ? () => onSync(source) : undefined}
                      onDelete={onDelete ? () => onDelete(source) : undefined}
                      isSyncing={syncingIds.has(source.id)}
                    />
                  ))}
              </div>
            </div>
          );
        })
      ) : (
        // Flat list for filtered view
        <div className="space-y-2">
          {filteredSources
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((source) => (
              <ChannelKBSourceCard
                key={source.id}
                source={source}
                isSelected={source.id === selectedId}
                onClick={onSelect ? () => onSelect(source) : undefined}
                onToggleEnabled={
                  onToggleEnabled
                    ? (enabled) => onToggleEnabled(source, enabled)
                    : undefined
                }
                onSync={onSync ? () => onSync(source) : undefined}
                onDelete={onDelete ? () => onDelete(source) : undefined}
                isSyncing={syncingIds.has(source.id)}
              />
            ))}
        </div>
      )}
    </div>
  );
}
