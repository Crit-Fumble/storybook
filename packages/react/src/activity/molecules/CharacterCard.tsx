import { clsx } from 'clsx';
import { Avatar } from '../atoms';
import { Badge } from '../../shared/atoms';
import type { CharacterType } from '../types';

export interface CharacterCardProps {
  /** Character name */
  name: string;
  /** Character type */
  type: CharacterType;
  /** Avatar URL */
  avatarUrl?: string | null;
  /** Owner's display name */
  ownerName?: string;
  /** Whether the character is active */
  isActive?: boolean;
  /** Whether the character is retired */
  isRetired?: boolean;
  /** Last synced timestamp */
  lastSyncedAt?: Date | null;
  /** Called when card is clicked */
  onClick?: () => void;
  /** Called when edit action is triggered */
  onEdit?: () => void;
  /** Called when delete action is triggered */
  onDelete?: () => void;
  /** Whether actions are in progress */
  isLoading?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

const typeConfig: Record<CharacterType, { label: string; color: 'primary' | 'success' | 'warning' | 'danger' | 'default' }> = {
  pc: { label: 'PC', color: 'primary' },
  npc: { label: 'NPC', color: 'default' },
  familiar: { label: 'Familiar', color: 'success' },
  companion: { label: 'Companion', color: 'success' },
  monster: { label: 'Monster', color: 'danger' },
};

function formatSyncTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString();
}

export function CharacterCard({
  name,
  type,
  avatarUrl,
  ownerName,
  isActive = true,
  isRetired = false,
  lastSyncedAt,
  onClick,
  onEdit,
  onDelete,
  isLoading = false,
  className,
  testId = 'character-card',
}: CharacterCardProps) {
  const config = typeConfig[type];
  const isClickable = !!onClick && !isLoading;

  return (
    <div
      data-testid={testId}
      className={clsx(
        'bg-cfg-background-secondary rounded-lg p-4 border border-cfg-border',
        isClickable && 'cursor-pointer hover:border-cfg-primary transition-colors',
        isRetired && 'opacity-60',
        className
      )}
      onClick={isClickable ? onClick : undefined}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => e.key === 'Enter' && onClick?.() : undefined}
    >
      {/* Header with avatar and name */}
      <div className="flex items-start gap-3">
        <Avatar
          src={avatarUrl}
          alt={name}
          size="lg"
          testId={`${testId}-avatar`}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className="text-cfg-text-normal font-semibold truncate"
              data-testid={`${testId}-name`}
            >
              {name}
            </h3>
            <Badge
              variant={config.color}
              size="sm"
              testId={`${testId}-type-badge`}
            >
              {config.label}
            </Badge>
            {isRetired && (
              <Badge variant="default" size="sm" testId={`${testId}-retired-badge`}>
                Retired
              </Badge>
            )}
          </div>

          {ownerName && (
            <p
              className="text-sm text-cfg-text-muted mt-1"
              data-testid={`${testId}-owner`}
            >
              Played by {ownerName}
            </p>
          )}
        </div>
      </div>

      {/* Status and sync info */}
      <div className="mt-3 pt-3 border-t border-cfg-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={clsx(
              'w-2 h-2 rounded-full',
              isActive ? 'bg-cfg-green' : 'bg-cfg-text-muted'
            )}
            data-testid={`${testId}-status-dot`}
          />
          <span
            className="text-xs text-cfg-text-muted"
            data-testid={`${testId}-status`}
          >
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        {lastSyncedAt && (
          <span
            className="text-xs text-cfg-text-muted"
            data-testid={`${testId}-sync-time`}
          >
            Synced {formatSyncTime(lastSyncedAt)}
          </span>
        )}
      </div>

      {/* Actions */}
      {(onEdit || onDelete) && (
        <div
          className="mt-3 pt-3 border-t border-cfg-border flex gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {onEdit && (
            <button
              className="flex-1 px-3 py-1.5 text-sm font-medium text-cfg-text-normal bg-cfg-background-tertiary rounded hover:bg-cfg-background-floating transition-colors disabled:opacity-50"
              onClick={onEdit}
              disabled={isLoading}
              data-testid={`${testId}-edit-btn`}
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              className="flex-1 px-3 py-1.5 text-sm font-medium text-cfg-red bg-cfg-background-tertiary rounded hover:bg-cfg-background-floating transition-colors disabled:opacity-50"
              onClick={onDelete}
              disabled={isLoading}
              data-testid={`${testId}-delete-btn`}
            >
              {isRetired ? 'Delete' : 'Retire'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
