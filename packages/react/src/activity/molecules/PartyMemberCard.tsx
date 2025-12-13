import { clsx } from 'clsx';
import type { PartyMemberRole } from '@crit-fumble/core/types';
import { Badge } from '../../shared/atoms/Badge';

export type { PartyMemberRole };

export interface PartyMemberCardProps {
  /** Member ID */
  id: string;
  /** Player/User name */
  name: string;
  /** Role in the party */
  role: PartyMemberRole;
  /** Avatar URL */
  avatarUrl?: string | null;
  /** When they joined the party */
  joinedAt?: string | Date | null;
  /** Whether this member is online */
  isOnline?: boolean;
  /** Called when card is clicked */
  onClick?: () => void;
  /** Called when role change is requested */
  onRoleChange?: (role: PartyMemberRole) => void;
  /** Called when remove is requested */
  onRemove?: () => void;
  /** Whether actions are loading */
  isLoading?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID */
  testId?: string;
}

const roleLabels: Record<PartyMemberRole, string> = {
  gm: 'GM',
  player: 'Player',
  guest: 'Guest',
};

const roleVariants: Record<PartyMemberRole, 'primary' | 'success' | 'default'> = {
  gm: 'primary',
  player: 'success',
  guest: 'default',
};

function formatJoinedAt(date: string | Date | null | undefined): string {
  if (!date) return '';
  const joinDate = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - joinDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Joined today';
  if (diffDays === 1) return 'Joined yesterday';
  if (diffDays < 30) return `Joined ${diffDays}d ago`;
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `Joined ${months}mo ago`;
  }
  return `Joined ${joinDate.toLocaleDateString()}`;
}

export function PartyMemberCard({
  id: _id,
  name,
  role,
  avatarUrl,
  joinedAt,
  isOnline,
  onClick,
  onRoleChange,
  onRemove,
  isLoading = false,
  className,
  testId = 'party-member-card',
}: PartyMemberCardProps) {
  return (
    <div
      className={clsx(
        'flex items-center gap-3 p-3 rounded-lg border transition-all',
        'bg-cfg-background-secondary border-cfg-border',
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
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="w-10 h-10 rounded-full object-cover"
            data-testid={`${testId}-avatar`}
          />
        ) : (
          <div
            className="w-10 h-10 rounded-full bg-cfg-primary flex items-center justify-center text-white font-medium"
            data-testid={`${testId}-avatar-placeholder`}
          >
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        {isOnline !== undefined && (
          <div
            className={clsx(
              'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-cfg-background-secondary',
              isOnline ? 'bg-cfg-green' : 'bg-cfg-text-muted'
            )}
            data-testid={`${testId}-online-status`}
          />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className="font-medium text-cfg-text-normal truncate"
            data-testid={`${testId}-name`}
          >
            {name}
          </span>
          <Badge
            variant={roleVariants[role]}
            size="sm"
            testId={`${testId}-role-badge`}
          >
            {roleLabels[role]}
          </Badge>
        </div>
        {joinedAt && (
          <div
            className="text-xs text-cfg-text-muted mt-0.5"
            data-testid={`${testId}-joined`}
          >
            {formatJoinedAt(joinedAt)}
          </div>
        )}
      </div>

      {/* Actions */}
      {(onRoleChange || onRemove) && (
        <div className="flex items-center gap-2 flex-shrink-0">
          {onRoleChange && (
            <select
              className="text-xs bg-cfg-background-tertiary text-cfg-text-normal border border-cfg-border rounded px-2 py-1"
              value={role}
              onChange={(e) => {
                e.stopPropagation();
                onRoleChange(e.target.value as PartyMemberRole);
              }}
              onClick={(e) => e.stopPropagation()}
              disabled={isLoading}
              data-testid={`${testId}-role-select`}
            >
              <option value="gm">GM</option>
              <option value="player">Player</option>
              <option value="guest">Guest</option>
            </select>
          )}
          {onRemove && (
            <button
              type="button"
              className="w-7 h-7 rounded flex items-center justify-center text-cfg-text-muted hover:bg-cfg-red hover:text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              disabled={isLoading}
              data-testid={`${testId}-remove-btn`}
              aria-label={`Remove ${name}`}
            >
              ×
            </button>
          )}
        </div>
      )}
    </div>
  );
}
