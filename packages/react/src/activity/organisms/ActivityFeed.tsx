import { clsx } from 'clsx';
import { Badge } from '../../shared/atoms/Badge';

export type ActivityType = 'command' | 'dice_roll' | 'session_start' | 'session_end' | 'campaign_create' | 'chat_message';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  userId: string;
  username: string;
  userAvatar?: string;
  channelId?: string;
  channelName?: string;
  data: Record<string, unknown>;
  timestamp: Date;
}

export interface ActivityFeedProps {
  /** List of activity items */
  activities: ActivityItem[];
  /** Loading state */
  isLoading?: boolean;
  /** Handler for loading more */
  onLoadMore?: () => void;
  /** Whether there are more items to load */
  hasMore?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

const activityTypeConfig: Record<ActivityType, { label: string; variant: 'default' | 'primary' | 'success' | 'danger' | 'warning'; icon: React.ReactNode }> = {
  command: {
    label: 'Command',
    variant: 'primary',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  dice_roll: {
    label: 'Dice Roll',
    variant: 'warning',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  session_start: {
    label: 'Session Started',
    variant: 'success',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  session_end: {
    label: 'Session Ended',
    variant: 'danger',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
      </svg>
    ),
  },
  campaign_create: {
    label: 'Campaign Created',
    variant: 'success',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  chat_message: {
    label: 'Chat',
    variant: 'default',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
};

function formatTimestamp(date: Date): string {
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

function getActivityDescription(activity: ActivityItem): string {
  const { type, data } = activity;

  switch (type) {
    case 'command':
      return `Used /${data.command as string}`;
    case 'dice_roll':
      return `Rolled ${data.expression as string} → ${data.result as number}`;
    case 'session_start':
      return `Started session "${data.campaignName as string}"`;
    case 'session_end':
      return `Ended session "${data.campaignName as string}"`;
    case 'campaign_create':
      return `Created campaign "${data.campaignName as string}"`;
    case 'chat_message':
      return 'Sent a message';
    default:
      return 'Activity';
  }
}

function ActivityItemRow({ activity }: { activity: ActivityItem }) {
  const config = activityTypeConfig[activity.type];

  return (
    <div className="flex items-start gap-3 p-3 bg-discord-background-secondary rounded-lg hover:bg-discord-background-floating transition-colors">
      {/* Avatar or Icon */}
      <div className="flex-shrink-0">
        {activity.userAvatar ? (
          <img
            src={activity.userAvatar}
            alt={activity.username}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-discord-background-tertiary flex items-center justify-center text-discord-text-muted">
            {config.icon}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-discord-text-normal font-medium text-sm">
            {activity.username}
          </span>
          <Badge variant={config.variant} size="sm">
            {config.label}
          </Badge>
        </div>
        <p className="text-discord-text-muted text-sm mt-0.5">
          {getActivityDescription(activity)}
        </p>
        {activity.channelName && (
          <p className="text-discord-text-muted text-xs mt-1">
            in #{activity.channelName}
          </p>
        )}
      </div>

      {/* Timestamp */}
      <span className="text-discord-text-muted text-xs flex-shrink-0">
        {formatTimestamp(activity.timestamp)}
      </span>
    </div>
  );
}

export function ActivityFeed({
  activities,
  isLoading = false,
  onLoadMore,
  hasMore = false,
  className,
  testId = 'activity-feed',
}: ActivityFeedProps) {
  if (isLoading && activities.length === 0) {
    return (
      <div data-testid={testId} className={clsx('space-y-4', className)}>
        <h2 className="text-discord-text-normal text-lg font-display font-semibold">
          Activity
        </h2>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-16 bg-discord-background-secondary rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div data-testid={testId} className={clsx('space-y-4', className)}>
      <h2 className="text-discord-text-normal text-lg font-display font-semibold">
        Activity
        <span className="ml-2 text-sm text-discord-text-muted font-normal">
          (Recent)
        </span>
      </h2>

      {activities.length === 0 ? (
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
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-discord-text-muted text-sm">
            No activity recorded yet.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {activities.map((activity) => (
              <ActivityItemRow key={activity.id} activity={activity} />
            ))}
          </div>

          {hasMore && onLoadMore && (
            <button
              onClick={onLoadMore}
              disabled={isLoading}
              className="w-full py-2 text-sm text-discord-text-muted hover:text-discord-text-normal bg-discord-background-secondary hover:bg-discord-background-floating rounded-lg transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Load More'}
            </button>
          )}
        </>
      )}
    </div>
  );
}
