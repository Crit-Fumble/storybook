import { clsx } from 'clsx';
import type { UserActivity } from '../types';

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export interface GuildActivityCardProps {
  /** User activity data for a single guild */
  activity: UserActivity;
  /** Called when a campaign is clicked */
  onCampaignClick?: (campaignId: string) => void;
  /** Called when a character is clicked */
  onCharacterClick?: (characterId: string) => void;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

export function GuildActivityCard({
  activity,
  onCampaignClick,
  onCharacterClick,
  className,
  testId = 'guild-activity-card',
}: GuildActivityCardProps) {
  return (
    <div
      className={clsx(
        'bg-cfg-background-secondary border border-cfg-border rounded-lg overflow-hidden',
        className
      )}
      data-testid={testId}
    >
      {/* Guild Header */}
      <div className="px-6 py-4 border-b border-cfg-border bg-cfg-background-tertiary/50">
        <h2
          className="text-lg font-semibold text-cfg-text-normal flex items-center gap-2"
          data-testid={`${testId}-guild-name`}
        >
          <svg
            className="w-5 h-5 text-cfg-accent"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
          {activity.guildName || 'Unknown Server'}
        </h2>
      </div>

      {/* Campaigns */}
      <div className="divide-y divide-cfg-border" data-testid={`${testId}-campaigns`}>
        {activity.campaigns.length === 0 ? (
          <div
            className="px-6 py-8 text-center text-cfg-text-muted"
            data-testid={`${testId}-empty`}
          >
            No campaigns in this server yet.
          </div>
        ) : (
          activity.campaigns.map((campaign, index) => (
            <div
              key={campaign.id}
              className={clsx(
                'px-6 py-4',
                onCampaignClick && 'cursor-pointer hover:bg-cfg-background-tertiary/30'
              )}
              onClick={() => onCampaignClick?.(campaign.id)}
              data-testid={`${testId}-campaign-${index}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-cfg-text-normal flex items-center gap-2">
                    {campaign.name}
                    {campaign.hasActiveSession && (
                      <span
                        className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-cfg-green/20 text-cfg-green border border-cfg-green/30"
                        data-testid={`${testId}-campaign-${index}-live`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cfg-green animate-pulse" />
                        Live
                      </span>
                    )}
                  </h3>

                  {/* Active Session */}
                  {campaign.activeSession && (
                    <div
                      className="mt-2 pl-4 border-l-2 border-cfg-accent/50"
                      data-testid={`${testId}-campaign-${index}-session`}
                    >
                      <p className="text-sm text-cfg-text-normal/80">
                        {campaign.activeSession.name || 'Unnamed Session'}
                      </p>
                      <p className="text-xs text-cfg-text-muted mt-1">
                        Started{' '}
                        {formatRelativeTime(new Date(campaign.activeSession.startedAt))}
                      </p>
                    </div>
                  )}

                  {/* Characters */}
                  {campaign.characters.length > 0 && (
                    <div
                      className="mt-3 flex flex-wrap gap-2"
                      data-testid={`${testId}-campaign-${index}-characters`}
                    >
                      {campaign.characters.map((char) => (
                        <div
                          key={char.id}
                          className={clsx(
                            'inline-flex items-center gap-2 px-3 py-1.5 bg-cfg-background-tertiary rounded-full text-sm',
                            onCharacterClick &&
                              'cursor-pointer hover:bg-cfg-background-floating'
                          )}
                          onClick={(e) => {
                            if (onCharacterClick) {
                              e.stopPropagation();
                              onCharacterClick(char.id);
                            }
                          }}
                        >
                          {char.avatarUrl ? (
                            <img
                              src={char.avatarUrl}
                              alt={char.name}
                              className="w-5 h-5 rounded-full"
                            />
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-cfg-background-floating flex items-center justify-center text-xs text-cfg-text-muted">
                              {char.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <span className="text-cfg-text-normal">{char.name}</span>
                          <span className="text-xs text-cfg-text-muted capitalize">
                            {char.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Campaign actions */}
                <div className="flex-shrink-0">
                  <span className="text-xs text-cfg-text-muted">
                    {campaign.characters.length} character
                    {campaign.characters.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export interface CampaignActivityFeedProps {
  /** User activity data */
  activities: UserActivity[];
  /** Loading state */
  isLoading?: boolean;
  /** Error message */
  error?: string | null;
  /** Called when retry button is clicked */
  onRetry?: () => void;
  /** Called when a campaign is clicked */
  onCampaignClick?: (campaignId: string) => void;
  /** Called when a character is clicked */
  onCharacterClick?: (characterId: string) => void;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

export function CampaignActivityFeed({
  activities,
  isLoading = false,
  error = null,
  onRetry,
  onCampaignClick,
  onCharacterClick,
  className,
  testId = 'campaign-activity-feed',
}: CampaignActivityFeedProps) {
  if (isLoading) {
    return (
      <div
        className={clsx('space-y-6', className)}
        data-testid={`${testId}-loading`}
      >
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-cfg-background-secondary border border-cfg-border rounded-lg overflow-hidden animate-pulse"
          >
            <div className="px-6 py-4 border-b border-cfg-border">
              <div className="h-6 bg-cfg-background-tertiary rounded w-48" />
            </div>
            <div className="px-6 py-4">
              <div className="h-5 bg-cfg-background-tertiary rounded w-64 mb-3" />
              <div className="h-4 bg-cfg-background-tertiary rounded w-32" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={clsx('text-center py-16', className)}
        data-testid={`${testId}-error`}
      >
        <p className="text-cfg-red">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 text-cfg-accent hover:text-cfg-primary transition-colors"
            data-testid={`${testId}-retry`}
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div
        className={clsx('text-center py-16', className)}
        data-testid={`${testId}-empty`}
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cfg-background-tertiary flex items-center justify-center">
          <svg
            className="w-8 h-8 text-cfg-text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <p className="text-cfg-text-muted text-lg">No campaigns yet</p>
        <p className="text-cfg-text-muted/70 mt-2">
          Join a Discord server with FumbleBot to see your campaigns here.
        </p>
      </div>
    );
  }

  // Count totals
  const totalCampaigns = activities.reduce((sum, a) => sum + a.campaigns.length, 0);
  const activeSessions = activities.reduce(
    (sum, a) => sum + a.campaigns.filter((c) => c.hasActiveSession).length,
    0
  );
  const totalCharacters = activities.reduce(
    (sum, a) => sum + a.campaigns.reduce((cSum, c) => cSum + c.characters.length, 0),
    0
  );

  return (
    <div className={clsx('space-y-6', className)} data-testid={testId}>
      {/* Stats */}
      <div
        className="grid grid-cols-3 gap-4"
        data-testid={`${testId}-stats`}
      >
        <div className="bg-cfg-background-secondary border border-cfg-border rounded-lg p-4 text-center">
          <p
            className="text-2xl font-bold text-cfg-text-normal"
            data-testid={`${testId}-stat-campaigns`}
          >
            {totalCampaigns}
          </p>
          <p className="text-sm text-cfg-text-muted">
            Campaign{totalCampaigns !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="bg-cfg-background-secondary border border-cfg-border rounded-lg p-4 text-center">
          <p
            className="text-2xl font-bold text-cfg-green"
            data-testid={`${testId}-stat-sessions`}
          >
            {activeSessions}
          </p>
          <p className="text-sm text-cfg-text-muted">
            Active Session{activeSessions !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="bg-cfg-background-secondary border border-cfg-border rounded-lg p-4 text-center">
          <p
            className="text-2xl font-bold text-cfg-accent"
            data-testid={`${testId}-stat-characters`}
          >
            {totalCharacters}
          </p>
          <p className="text-sm text-cfg-text-muted">
            Character{totalCharacters !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Guild cards */}
      <div data-testid={`${testId}-guilds`}>
        {activities.map((activity, index) => (
          <GuildActivityCard
            key={activity.guildId}
            activity={activity}
            onCampaignClick={onCampaignClick}
            onCharacterClick={onCharacterClick}
            className={index > 0 ? 'mt-6' : undefined}
            testId={`${testId}-guild-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
