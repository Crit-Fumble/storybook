import { clsx } from 'clsx';
import { InitiativeEntryCard } from '../molecules/InitiativeEntryCard';
import type { InitiativeEntry } from '../types';

// Re-export core type for backwards compatibility
export type { InitiativeEntry };

export interface InitiativeTrackerProps {
  /** List of entries in initiative order */
  entries: InitiativeEntry[];
  /** ID of the current turn entry */
  currentTurnId?: string | null;
  /** Current round number */
  round?: number;
  /** Title for the tracker */
  title?: string;
  /** Whether to sort entries by initiative (descending) */
  autoSort?: boolean;
  /** Called when an entry is clicked */
  onEntryClick?: (entry: InitiativeEntry) => void;
  /** Called when HP changes for an entry */
  onHpChange?: (entryId: string, newHp: number) => void;
  /** Called when an entry is removed */
  onRemoveEntry?: (entryId: string) => void;
  /** Called when next turn is clicked */
  onNextTurn?: () => void;
  /** Called when previous turn is clicked */
  onPrevTurn?: () => void;
  /** Called when round is reset */
  onResetRound?: () => void;
  /** Whether combat is active */
  isActive?: boolean;
  /** Whether actions are loading */
  isLoading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Additional CSS classes */
  className?: string;
  /** Test ID */
  testId?: string;
}

export function InitiativeTracker({
  entries,
  currentTurnId,
  round = 1,
  title = 'Initiative',
  autoSort = true,
  onEntryClick,
  onHpChange,
  onRemoveEntry,
  onNextTurn,
  onPrevTurn,
  onResetRound,
  isActive = true,
  isLoading = false,
  emptyMessage = 'No combatants in initiative order',
  className,
  testId = 'initiative-tracker',
}: InitiativeTrackerProps) {
  const sortedEntries = autoSort
    ? [...entries].sort((a, b) => b.initiative - a.initiative)
    : entries;

  const defeatedCount = entries.filter(
    (e) => e.hp != null && e.hp <= 0
  ).length;

  const activeCount = entries.length - defeatedCount;

  return (
    <div
      className={clsx(
        'bg-cfg-background-primary rounded-lg border border-cfg-border overflow-hidden',
        className
      )}
      data-testid={testId}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-cfg-border bg-cfg-background-secondary">
        <div className="flex items-center gap-3">
          <h3 className="font-display font-semibold text-cfg-text-normal" data-testid={`${testId}-title`}>
            {title}
          </h3>
          {isActive && (
            <span
              className="px-2 py-0.5 text-xs rounded bg-cfg-green/20 text-cfg-green"
              data-testid={`${testId}-active-badge`}
            >
              Active
            </span>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-cfg-text-muted" data-testid={`${testId}-round`}>
            Round <span className="font-medium text-cfg-text-normal">{round}</span>
          </span>
          <span className="text-cfg-text-muted" data-testid={`${testId}-count`}>
            {activeCount} active
            {defeatedCount > 0 && (
              <span className="text-cfg-red"> · {defeatedCount} defeated</span>
            )}
          </span>
        </div>
      </div>

      {/* Controls */}
      {(onPrevTurn || onNextTurn || onResetRound) && (
        <div className="flex items-center justify-center gap-2 p-3 border-b border-cfg-border bg-cfg-background-tertiary">
          {onPrevTurn && (
            <button
              type="button"
              className="px-3 py-1.5 text-sm rounded bg-cfg-background-secondary text-cfg-text-normal hover:bg-cfg-border transition-colors disabled:opacity-50"
              onClick={onPrevTurn}
              disabled={isLoading || entries.length === 0}
              data-testid={`${testId}-prev-btn`}
            >
              ← Prev
            </button>
          )}
          {onNextTurn && (
            <button
              type="button"
              className="px-4 py-1.5 text-sm rounded bg-cfg-primary text-white hover:bg-cfg-primary-hover transition-colors disabled:opacity-50"
              onClick={onNextTurn}
              disabled={isLoading || entries.length === 0}
              data-testid={`${testId}-next-btn`}
            >
              Next Turn →
            </button>
          )}
          {onResetRound && (
            <button
              type="button"
              className="px-3 py-1.5 text-sm rounded bg-cfg-background-secondary text-cfg-text-muted hover:bg-cfg-border hover:text-cfg-text-normal transition-colors disabled:opacity-50"
              onClick={onResetRound}
              disabled={isLoading}
              data-testid={`${testId}-reset-btn`}
            >
              Reset
            </button>
          )}
        </div>
      )}

      {/* Entry List */}
      <div className="p-3 space-y-2" data-testid={`${testId}-list`}>
        {sortedEntries.length === 0 ? (
          <div className="text-center py-8 text-cfg-text-muted" data-testid={`${testId}-empty`}>
            {emptyMessage}
          </div>
        ) : (
          sortedEntries.map((entry) => (
            <InitiativeEntryCard
              key={entry.id}
              id={entry.id}
              name={entry.name}
              initiative={entry.initiative}
              hp={entry.hp}
              maxHp={entry.maxHp}
              ac={entry.ac}
              conditions={entry.conditions}
              isPlayer={entry.isPlayer}
              isCurrentTurn={entry.id === currentTurnId}
              isDefeated={entry.hp != null && entry.hp <= 0}
              avatarUrl={entry.avatarUrl}
              color={entry.color}
              onClick={onEntryClick ? () => onEntryClick(entry) : undefined}
              onHpChange={onHpChange ? (newHp) => onHpChange(entry.id, newHp) : undefined}
              onRemove={onRemoveEntry ? () => onRemoveEntry(entry.id) : undefined}
              isLoading={isLoading}
              testId={`${testId}-entry-${entry.id}`}
            />
          ))
        )}
      </div>
    </div>
  );
}
