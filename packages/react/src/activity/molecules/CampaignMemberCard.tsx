import { clsx } from 'clsx';
import { Avatar } from '../atoms';
import { Badge } from '../../shared/atoms';

export type MemberRole = 'gm' | 'player' | 'spectator';

export interface CampaignMemberCardProps {
  /** Discord user ID */
  discordId: string;
  /** Member's display name */
  username: string;
  /** Member's role in the campaign */
  role: MemberRole;
  /** Avatar URL */
  avatarUrl?: string | null;
  /** When the member joined */
  joinedAt?: string | Date;
  /** Foundry VTT user ID if linked */
  foundryUserId?: string;
  /** Whether this is the current user */
  isCurrentUser?: boolean;
  /** Called when role change is requested */
  onRoleChange?: (newRole: MemberRole) => void;
  /** Called when remove is requested */
  onRemove?: () => void;
  /** Whether the current user can manage this member */
  canManage?: boolean;
  /** Whether actions are in progress */
  isLoading?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

const roleConfig: Record<MemberRole, { label: string; color: 'primary' | 'success' | 'default'; icon: string }> = {
  gm: { label: 'Game Master', color: 'primary', icon: '👑' },
  player: { label: 'Player', color: 'success', icon: '🎮' },
  spectator: { label: 'Spectator', color: 'default', icon: '👁️' },
};

function formatJoinDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export function CampaignMemberCard({
  discordId: _discordId,
  username,
  role,
  avatarUrl,
  joinedAt,
  foundryUserId,
  isCurrentUser = false,
  onRoleChange,
  onRemove,
  canManage = false,
  isLoading = false,
  className,
  testId = 'campaign-member-card',
}: CampaignMemberCardProps) {
  const config = roleConfig[role];

  return (
    <div
      data-testid={testId}
      className={clsx(
        'bg-cfg-background-secondary rounded-lg p-4 border border-cfg-border',
        isCurrentUser && 'ring-1 ring-cfg-primary',
        className
      )}
    >
      {/* Header with avatar and info */}
      <div className="flex items-center gap-3">
        <Avatar
          src={avatarUrl}
          alt={username}
          size="md"
          testId={`${testId}-avatar`}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3
              className="text-cfg-text-normal font-semibold truncate"
              data-testid={`${testId}-username`}
            >
              {username}
            </h3>
            {isCurrentUser && (
              <span className="text-xs text-cfg-text-muted">(you)</span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Badge
              variant={config.color}
              size="sm"
              testId={`${testId}-role-badge`}
            >
              <span className="mr-1">{config.icon}</span>
              {config.label}
            </Badge>
            {foundryUserId && (
              <span
                className="text-xs text-cfg-green"
                data-testid={`${testId}-foundry-linked`}
              >
                VTT Linked
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Join date */}
      {joinedAt && (
        <p
          className="text-xs text-cfg-text-muted mt-3"
          data-testid={`${testId}-joined`}
        >
          Joined {formatJoinDate(joinedAt)}
        </p>
      )}

      {/* Management actions */}
      {canManage && !isCurrentUser && (onRoleChange || onRemove) && (
        <div className="mt-3 pt-3 border-t border-cfg-border">
          {onRoleChange && (
            <div className="mb-2">
              <label className="text-xs text-cfg-text-muted block mb-1">
                Change Role
              </label>
              <select
                className="w-full bg-cfg-background-tertiary text-cfg-text-normal text-sm rounded px-2 py-1.5 border border-cfg-border focus:outline-none focus:border-cfg-primary"
                value={role}
                onChange={(e) => onRoleChange(e.target.value as MemberRole)}
                disabled={isLoading}
                data-testid={`${testId}-role-select`}
              >
                <option value="gm">Game Master</option>
                <option value="player">Player</option>
                <option value="spectator">Spectator</option>
              </select>
            </div>
          )}
          {onRemove && (
            <button
              className="w-full px-3 py-1.5 text-sm font-medium text-cfg-red bg-cfg-background-tertiary rounded hover:bg-cfg-background-floating transition-colors disabled:opacity-50"
              onClick={onRemove}
              disabled={isLoading}
              data-testid={`${testId}-remove-btn`}
            >
              Remove from Campaign
            </button>
          )}
        </div>
      )}
    </div>
  );
}
