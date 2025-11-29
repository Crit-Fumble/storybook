import { clsx } from 'clsx';
import type { UserActivity } from '@crit-fumble/core/types';
import { Badge } from '../../shared/atoms/Badge';

export interface UserActivityCardProps {
  /** User activity data for a guild */
  activity: UserActivity;
  /** Click handler for the guild */
  onGuildClick?: () => void;
  /** Click handler for a campaign */
  onCampaignClick?: (campaignId: string) => void;
  /** Click handler for joining a session */
  onJoinSession?: (sessionId: string) => void;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

export function UserActivityCard({
  activity,
  onGuildClick,
  onCampaignClick,
  onJoinSession,
  className,
  testId = 'user-activity-card',
}: UserActivityCardProps) {
  const activeCampaigns = activity.campaigns.filter((c) => c.hasActiveSession);

  return (
    <div
      data-testid={testId}
      className={clsx(
        'bg-discord-background-secondary rounded-lg overflow-hidden',
        className
      )}
    >
      {/* Guild Header */}
      <div
        onClick={onGuildClick}
        className={clsx(
          'p-4 border-b border-discord-background-tertiary',
          onGuildClick && 'cursor-pointer hover:bg-discord-background-floating'
        )}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-discord-text-normal font-display font-semibold">
            {activity.guildName || 'Unknown Server'}
          </h3>
          {activeCampaigns.length > 0 && (
            <Badge variant="success" size="sm">
              {activeCampaigns.length} Active
            </Badge>
          )}
        </div>
        <p className="text-discord-text-muted text-sm mt-1">
          {activity.campaigns.length} campaign{activity.campaigns.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Campaigns List */}
      {activity.campaigns.length > 0 ? (
        <div className="divide-y divide-discord-background-tertiary">
          {activity.campaigns.map((campaign) => (
            <div
              key={campaign.id}
              onClick={() => onCampaignClick?.(campaign.id)}
              className={clsx(
                'p-3',
                onCampaignClick && 'cursor-pointer hover:bg-discord-background-floating'
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-discord-text-normal font-medium text-sm">
                  {campaign.name}
                </span>
                {campaign.hasActiveSession && campaign.activeSession && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onJoinSession?.(campaign.activeSession!.id);
                    }}
                    className="px-2 py-1 text-xs bg-discord-green text-white rounded hover:bg-discord-green/80 transition-colors"
                  >
                    Join Session
                  </button>
                )}
              </div>

              {/* Active Session Info */}
              {campaign.activeSession && (
                <div className="text-xs text-discord-text-muted mb-2">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-2 bg-discord-green rounded-full animate-pulse" />
                    {campaign.activeSession.name || 'Active Session'}
                  </span>
                </div>
              )}

              {/* Characters */}
              {campaign.characters.length > 0 && (
                <div className="flex items-center gap-1 flex-wrap">
                  {campaign.characters.slice(0, 4).map((char) => (
                    <div
                      key={char.id}
                      className="flex items-center gap-1 px-2 py-0.5 bg-discord-background-tertiary rounded text-xs"
                      title={`${char.name} (${char.type})`}
                    >
                      {char.avatarUrl ? (
                        <img
                          src={char.avatarUrl}
                          alt={char.name}
                          className="w-4 h-4 rounded-full"
                        />
                      ) : (
                        <span className="w-4 h-4 rounded-full bg-discord-primary flex items-center justify-center text-white text-[10px]">
                          {char.name[0]}
                        </span>
                      )}
                      <span className="text-discord-text-muted truncate max-w-[80px]">
                        {char.name}
                      </span>
                    </div>
                  ))}
                  {campaign.characters.length > 4 && (
                    <span className="text-discord-text-muted text-xs">
                      +{campaign.characters.length - 4} more
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-discord-text-muted text-sm">
          No campaigns yet
        </div>
      )}
    </div>
  );
}
