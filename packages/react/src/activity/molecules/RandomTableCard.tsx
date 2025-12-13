import { clsx } from 'clsx';
import type { RandomTableEntry } from '@crit-fumble/core/types';
import { Badge } from '../../shared/atoms/Badge';

export type { RandomTableEntry };

export interface RandomTableCardProps {
  /** Table ID */
  id: string;
  /** Table display name */
  name: string;
  /** Table category */
  category?: string | null;
  /** Dice formula (e.g., "1d20", "2d6") */
  diceFormula?: string | null;
  /** Table entries */
  entries: RandomTableEntry[];
  /** Whether the table is active */
  isActive?: boolean;
  /** Who created the table */
  createdBy?: string | null;
  /** Called when card is clicked */
  onClick?: () => void;
  /** Called when roll is requested */
  onRoll?: () => void;
  /** Called when edit is requested */
  onEdit?: () => void;
  /** Called when delete is requested */
  onDelete?: () => void;
  /** Whether actions are loading */
  isLoading?: boolean;
  /** Maximum entries to show in preview */
  previewLimit?: number;
  /** Additional CSS classes */
  className?: string;
  /** Test ID */
  testId?: string;
}

export function RandomTableCard({
  id: _id,
  name,
  category,
  diceFormula,
  entries,
  isActive = true,
  createdBy,
  onClick,
  onRoll,
  onEdit,
  onDelete,
  isLoading = false,
  previewLimit = 5,
  className,
  testId = 'random-table-card',
}: RandomTableCardProps) {
  const displayEntries = entries.slice(0, previewLimit);
  const remainingCount = entries.length - previewLimit;

  return (
    <div
      className={clsx(
        'rounded-lg border p-4 transition-all',
        isActive
          ? 'bg-cfg-background-secondary border-cfg-border'
          : 'bg-cfg-background-tertiary border-cfg-border opacity-60',
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
        <div className="min-w-0">
          <h3
            className="font-display font-semibold text-cfg-text-normal truncate"
            data-testid={`${testId}-name`}
          >
            {name}
          </h3>
          {category && (
            <div className="text-xs text-cfg-text-muted" data-testid={`${testId}-category`}>
              {category}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {diceFormula && (
            <Badge variant="primary" size="sm" testId={`${testId}-dice-badge`}>
              🎲 {diceFormula}
            </Badge>
          )}
          {!isActive && (
            <Badge variant="warning" size="sm" testId={`${testId}-inactive-badge`}>
              Inactive
            </Badge>
          )}
        </div>
      </div>

      {/* Entry preview */}
      <div className="space-y-1 mb-3" data-testid={`${testId}-entries`}>
        {displayEntries.map((entry, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-sm"
            data-testid={`${testId}-entry-${index}`}
          >
            {(entry.min !== undefined || entry.max !== undefined) ? (
              <span className="text-cfg-text-muted w-10 flex-shrink-0 text-right font-mono text-xs">
                {entry.min !== undefined && entry.max !== undefined
                  ? `${entry.min}-${entry.max}`
                  : entry.min ?? entry.max}
              </span>
            ) : entry.weight !== undefined ? (
              <span className="text-cfg-text-muted w-10 flex-shrink-0 text-right font-mono text-xs">
                ×{entry.weight}
              </span>
            ) : (
              <span className="text-cfg-text-muted w-10 flex-shrink-0 text-right font-mono text-xs">
                {index + 1}.
              </span>
            )}
            <span className="text-cfg-text-normal truncate">{entry.value}</span>
          </div>
        ))}
        {remainingCount > 0 && (
          <div className="text-xs text-cfg-text-muted italic">
            +{remainingCount} more entries
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-xs text-cfg-text-muted">
        <span data-testid={`${testId}-entry-count`}>
          {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
        </span>
        {createdBy && (
          <span data-testid={`${testId}-created-by`}>
            by {createdBy}
          </span>
        )}
      </div>

      {/* Actions */}
      {(onRoll || onEdit || onDelete) && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-cfg-border">
          {onRoll && (
            <button
              type="button"
              className="flex-1 py-1.5 rounded bg-cfg-primary text-white text-sm font-medium hover:bg-cfg-primary-hover transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onRoll();
              }}
              disabled={isLoading}
              data-testid={`${testId}-roll-btn`}
            >
              🎲 Roll
            </button>
          )}
          {onEdit && (
            <button
              type="button"
              className="py-1.5 px-3 rounded text-cfg-text-muted text-sm hover:bg-cfg-background-tertiary transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              disabled={isLoading}
              data-testid={`${testId}-edit-btn`}
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              className="py-1.5 px-3 rounded text-cfg-red text-sm hover:bg-cfg-red/10 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              disabled={isLoading}
              data-testid={`${testId}-delete-btn`}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
