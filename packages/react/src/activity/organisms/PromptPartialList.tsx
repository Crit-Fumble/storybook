import { clsx } from 'clsx';
import { Button } from '../../shared/atoms/Button';
import { PromptPartialCard } from '../molecules/PromptPartialCard';
import type { PromptPartial, PromptTargetType } from '../molecules/PromptPartialCard';

export interface PromptPartialListProps {
  /** List of prompt partials */
  partials: PromptPartial[];
  /** Currently selected partial ID */
  selectedId?: string;
  /** Handler when a partial is selected */
  onSelect?: (partial: PromptPartial) => void;
  /** Handler when enabled is toggled */
  onToggleEnabled?: (partial: PromptPartial, enabled: boolean) => void;
  /** Handler when a partial is deleted */
  onDelete?: (partial: PromptPartial) => void;
  /** Handler for creating a new partial */
  onCreate?: () => void;
  /** Filter by target type */
  filterType?: PromptTargetType | 'all';
  /** Loading state */
  isLoading?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

export function PromptPartialList({
  partials,
  selectedId,
  onSelect,
  onToggleEnabled,
  onDelete,
  onCreate,
  filterType = 'all',
  isLoading = false,
  className,
  testId = 'prompt-partial-list',
}: PromptPartialListProps) {
  const filteredPartials =
    filterType === 'all'
      ? partials
      : partials.filter((p) => p.targetType === filterType);

  // Group by target type
  const groupedPartials = filteredPartials.reduce(
    (acc, partial) => {
      if (!acc[partial.targetType]) {
        acc[partial.targetType] = [];
      }
      acc[partial.targetType].push(partial);
      return acc;
    },
    {} as Record<PromptTargetType, PromptPartial[]>
  );

  const targetTypeLabels: Record<PromptTargetType, string> = {
    channel: 'Channels',
    category: 'Categories',
    thread: 'Threads',
    role: 'Roles',
  };

  const targetTypeOrder: PromptTargetType[] = ['channel', 'category', 'thread', 'role'];

  if (isLoading) {
    return (
      <div data-testid={testId} className={clsx('space-y-4', className)}>
        <div className="flex items-center justify-between">
          <div className="h-6 bg-discord-background-tertiary rounded w-32 animate-pulse" />
          <div className="h-9 bg-discord-background-tertiary rounded w-28 animate-pulse" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 bg-discord-background-secondary rounded-lg animate-pulse"
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
          Prompt Partials
          <span className="ml-2 text-sm text-discord-text-muted font-normal">
            ({filteredPartials.length})
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
              New Partial
            </span>
          </Button>
        )}
      </div>

      {/* Empty State */}
      {filteredPartials.length === 0 && (
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
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
          <p className="text-discord-text-muted text-sm mb-4">
            No prompt partials configured yet.
          </p>
          {onCreate && (
            <Button variant="primary" size="sm" onClick={onCreate}>
              Create First Partial
            </Button>
          )}
        </div>
      )}

      {/* Grouped Lists */}
      {filterType === 'all' ? (
        // Show grouped by type
        targetTypeOrder.map((type) => {
          const typePartials = groupedPartials[type];
          if (!typePartials?.length) return null;

          return (
            <div key={type}>
              <h3 className="text-discord-text-muted text-sm font-medium mb-3">
                {targetTypeLabels[type]}
              </h3>
              <div className="space-y-2">
                {typePartials
                  .sort((a, b) => b.priority - a.priority)
                  .map((partial) => (
                    <PromptPartialCard
                      key={partial.id}
                      partial={partial}
                      isSelected={partial.id === selectedId}
                      onClick={onSelect ? () => onSelect(partial) : undefined}
                      onToggleEnabled={
                        onToggleEnabled
                          ? (enabled) => onToggleEnabled(partial, enabled)
                          : undefined
                      }
                      onDelete={onDelete ? () => onDelete(partial) : undefined}
                    />
                  ))}
              </div>
            </div>
          );
        })
      ) : (
        // Flat list for filtered view
        <div className="space-y-2">
          {filteredPartials
            .sort((a, b) => b.priority - a.priority)
            .map((partial) => (
              <PromptPartialCard
                key={partial.id}
                partial={partial}
                isSelected={partial.id === selectedId}
                onClick={onSelect ? () => onSelect(partial) : undefined}
                onToggleEnabled={
                  onToggleEnabled
                    ? (enabled) => onToggleEnabled(partial, enabled)
                    : undefined
                }
                onDelete={onDelete ? () => onDelete(partial) : undefined}
              />
            ))}
        </div>
      )}
    </div>
  );
}
