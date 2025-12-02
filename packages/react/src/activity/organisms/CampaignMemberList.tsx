import { clsx } from 'clsx';
import { Button } from '../../shared/atoms';
import { CampaignMemberCard, type MemberRole } from '../molecules/CampaignMemberCard';

export interface CampaignMemberInfo {
  discordId: string;
  username: string;
  role: MemberRole;
  avatarUrl?: string | null;
  joinedAt?: string;
  foundryUserId?: string;
}

export interface CampaignMemberListProps {
  /** List of campaign members */
  members: CampaignMemberInfo[];
  /** Current user's Discord ID */
  currentUserId?: string;
  /** Whether the current user can manage members */
  canManage?: boolean;
  /** Called when a member's role is changed */
  onRoleChange?: (discordId: string, newRole: MemberRole) => void;
  /** Called when a member is removed */
  onRemove?: (discordId: string) => void;
  /** Called when invite action is triggered */
  onInvite?: () => void;
  /** ID of member currently being modified */
  loadingMemberId?: string | null;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

export function CampaignMemberList({
  members,
  currentUserId,
  canManage = false,
  onRoleChange,
  onRemove,
  onInvite,
  loadingMemberId,
  className,
  testId = 'campaign-member-list',
}: CampaignMemberListProps) {
  const gms = members.filter((m) => m.role === 'gm');
  const players = members.filter((m) => m.role === 'player');
  const spectators = members.filter((m) => m.role === 'spectator');

  const renderMemberCard = (member: CampaignMemberInfo) => (
    <CampaignMemberCard
      key={member.discordId}
      discordId={member.discordId}
      username={member.username}
      role={member.role}
      avatarUrl={member.avatarUrl}
      joinedAt={member.joinedAt}
      foundryUserId={member.foundryUserId}
      isCurrentUser={member.discordId === currentUserId}
      canManage={canManage}
      onRoleChange={onRoleChange ? (newRole) => onRoleChange(member.discordId, newRole) : undefined}
      onRemove={onRemove ? () => onRemove(member.discordId) : undefined}
      isLoading={loadingMemberId === member.discordId}
      testId={`${testId}-member-${member.discordId}`}
    />
  );

  return (
    <div data-testid={testId} className={clsx('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-display font-semibold text-cfg-text-normal">
            Campaign Members
          </h2>
          <p className="text-sm text-cfg-text-muted mt-1">
            {members.length} member{members.length !== 1 ? 's' : ''}
            {gms.length > 0 && ` · ${gms.length} GM${gms.length !== 1 ? 's' : ''}`}
            {players.length > 0 && ` · ${players.length} player${players.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {canManage && onInvite && (
          <Button
            variant="primary"
            size="sm"
            onClick={onInvite}
            testId={`${testId}-invite-btn`}
          >
            Invite Member
          </Button>
        )}
      </div>

      {/* Empty state */}
      {members.length === 0 && (
        <div
          className="bg-cfg-background-secondary rounded-lg p-8 text-center border border-cfg-border"
          data-testid={`${testId}-empty`}
        >
          <div className="text-4xl mb-3">👥</div>
          <p className="text-cfg-text-normal font-medium mb-1">No Members</p>
          <p className="text-sm text-cfg-text-muted">
            Invite players to join this campaign
          </p>
        </div>
      )}

      {/* Game Masters section */}
      {gms.length > 0 && (
        <div data-testid={`${testId}-gm-section`}>
          <h3 className="text-sm font-semibold text-cfg-text-muted uppercase tracking-wide mb-3">
            Game Masters ({gms.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {gms.map(renderMemberCard)}
          </div>
        </div>
      )}

      {/* Players section */}
      {players.length > 0 && (
        <div data-testid={`${testId}-players-section`}>
          <h3 className="text-sm font-semibold text-cfg-text-muted uppercase tracking-wide mb-3">
            Players ({players.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {players.map(renderMemberCard)}
          </div>
        </div>
      )}

      {/* Spectators section */}
      {spectators.length > 0 && (
        <div data-testid={`${testId}-spectators-section`}>
          <h3 className="text-sm font-semibold text-cfg-text-muted uppercase tracking-wide mb-3">
            Spectators ({spectators.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {spectators.map(renderMemberCard)}
          </div>
        </div>
      )}
    </div>
  );
}
