import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ActivityFeed, type ActivityItem, type ActivityType } from './ActivityFeed';

const createActivity = (
  id: string,
  type: ActivityType,
  username: string,
  data: Record<string, unknown> = {},
  minutesAgo: number = 5
): ActivityItem => ({
  id,
  type,
  userId: `user-${id}`,
  username,
  channelId: 'channel-1',
  channelName: 'general',
  data,
  timestamp: new Date(Date.now() - minutesAgo * 60 * 1000),
});

const sampleActivities: ActivityItem[] = [
  createActivity('1', 'command', 'DragonSlayer', { command: 'roll' }, 2),
  createActivity('2', 'dice_roll', 'Mage', { expression: '2d20+5', result: 25 }, 10),
  createActivity('3', 'session_start', 'DM', { campaignName: 'Lost Mine' }, 30),
  createActivity('4', 'session_end', 'DM', { campaignName: 'Lost Mine' }, 120),
  createActivity('5', 'campaign_create', 'DM', { campaignName: 'New Adventure' }, 180),
  createActivity('6', 'chat_message', 'Player1', {}, 5),
];

describe('ActivityFeed', () => {
  describe('Loading state', () => {
    it('shows loading skeletons when loading with no activities', () => {
      render(<ActivityFeed activities={[]} isLoading={true} />);

      expect(screen.getByTestId('activity-feed')).toBeInTheDocument();
      expect(screen.getByText('Activity')).toBeInTheDocument();

      const feed = screen.getByTestId('activity-feed');
      const skeletons = feed.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBe(5);
    });

    it('shows activities when loading with existing activities', () => {
      render(<ActivityFeed activities={sampleActivities.slice(0, 2)} isLoading={true} />);

      expect(screen.getByText('DragonSlayer')).toBeInTheDocument();
      expect(screen.getByText('Mage')).toBeInTheDocument();
    });
  });

  describe('Empty state', () => {
    it('shows empty state when no activities', () => {
      render(<ActivityFeed activities={[]} />);

      expect(screen.getByText('No activity recorded yet.')).toBeInTheDocument();
    });
  });

  describe('Activity items', () => {
    it('renders activity items', () => {
      render(<ActivityFeed activities={sampleActivities.slice(0, 3)} />);

      expect(screen.getByText('DragonSlayer')).toBeInTheDocument();
      expect(screen.getByText('Mage')).toBeInTheDocument();
      expect(screen.getByText('DM')).toBeInTheDocument();
    });

    it('shows command activity description', () => {
      render(<ActivityFeed activities={[createActivity('1', 'command', 'User', { command: 'help' })]} />);
      expect(screen.getByText('Used /help')).toBeInTheDocument();
    });

    it('shows dice roll activity description', () => {
      render(<ActivityFeed activities={[createActivity('1', 'dice_roll', 'User', { expression: '1d20', result: 15 })]} />);
      expect(screen.getByText('Rolled 1d20 → 15')).toBeInTheDocument();
    });

    it('shows session start activity description', () => {
      render(<ActivityFeed activities={[createActivity('1', 'session_start', 'User', { campaignName: 'Epic Quest' })]} />);
      expect(screen.getByText('Started session "Epic Quest"')).toBeInTheDocument();
    });

    it('shows session end activity description', () => {
      render(<ActivityFeed activities={[createActivity('1', 'session_end', 'User', { campaignName: 'Epic Quest' })]} />);
      expect(screen.getByText('Ended session "Epic Quest"')).toBeInTheDocument();
    });

    it('shows campaign create activity description', () => {
      render(<ActivityFeed activities={[createActivity('1', 'campaign_create', 'User', { campaignName: 'New Campaign' })]} />);
      expect(screen.getByText('Created campaign "New Campaign"')).toBeInTheDocument();
    });

    it('shows chat message activity description', () => {
      render(<ActivityFeed activities={[createActivity('1', 'chat_message', 'User', {})]} />);
      expect(screen.getByText('Sent a message')).toBeInTheDocument();
    });

    it('shows channel name', () => {
      render(<ActivityFeed activities={sampleActivities.slice(0, 1)} />);
      expect(screen.getByText('in #general')).toBeInTheDocument();
    });

    it('shows user avatar when provided', () => {
      const activityWithAvatar: ActivityItem = {
        ...createActivity('1', 'command', 'User', { command: 'test' }),
        userAvatar: 'https://example.com/avatar.png',
      };
      render(<ActivityFeed activities={[activityWithAvatar]} />);

      const img = screen.getByAltText('User');
      expect(img).toHaveAttribute('src', 'https://example.com/avatar.png');
    });
  });

  describe('Activity badges', () => {
    it('shows Command badge for command activity', () => {
      render(<ActivityFeed activities={[createActivity('1', 'command', 'User', { command: 'help' })]} />);
      expect(screen.getByText('Command')).toBeInTheDocument();
    });

    it('shows Dice Roll badge for dice_roll activity', () => {
      render(<ActivityFeed activities={[createActivity('1', 'dice_roll', 'User', { expression: '1d20', result: 15 })]} />);
      expect(screen.getByText('Dice Roll')).toBeInTheDocument();
    });

    it('shows Session Started badge for session_start activity', () => {
      render(<ActivityFeed activities={[createActivity('1', 'session_start', 'User', { campaignName: 'Test' })]} />);
      expect(screen.getByText('Session Started')).toBeInTheDocument();
    });

    it('shows Session Ended badge for session_end activity', () => {
      render(<ActivityFeed activities={[createActivity('1', 'session_end', 'User', { campaignName: 'Test' })]} />);
      expect(screen.getByText('Session Ended')).toBeInTheDocument();
    });

    it('shows Campaign Created badge for campaign_create activity', () => {
      render(<ActivityFeed activities={[createActivity('1', 'campaign_create', 'User', { campaignName: 'Test' })]} />);
      expect(screen.getByText('Campaign Created')).toBeInTheDocument();
    });

    it('shows Chat badge for chat_message activity', () => {
      render(<ActivityFeed activities={[createActivity('1', 'chat_message', 'User', {})]} />);
      expect(screen.getByText('Chat')).toBeInTheDocument();
    });
  });

  describe('Timestamp formatting', () => {
    it('shows "Just now" for very recent activities', () => {
      const recentActivity = createActivity('1', 'command', 'User', { command: 'test' }, 0);
      render(<ActivityFeed activities={[recentActivity]} />);
      expect(screen.getByText('Just now')).toBeInTheDocument();
    });

    it('shows minutes ago for recent activities', () => {
      const activity = createActivity('1', 'command', 'User', { command: 'test' }, 5);
      render(<ActivityFeed activities={[activity]} />);
      expect(screen.getByText('5m ago')).toBeInTheDocument();
    });

    it('shows hours ago for activities within 24 hours', () => {
      const activity = createActivity('1', 'command', 'User', { command: 'test' }, 120);
      render(<ActivityFeed activities={[activity]} />);
      expect(screen.getByText('2h ago')).toBeInTheDocument();
    });

    it('shows days ago for activities within a week', () => {
      const activity = createActivity('1', 'command', 'User', { command: 'test' }, 60 * 24 * 3);
      render(<ActivityFeed activities={[activity]} />);
      expect(screen.getByText('3d ago')).toBeInTheDocument();
    });
  });

  describe('Load more', () => {
    it('shows Load More button when hasMore is true', () => {
      render(
        <ActivityFeed
          activities={sampleActivities}
          hasMore={true}
          onLoadMore={() => {}}
        />
      );

      expect(screen.getByText('Load More')).toBeInTheDocument();
    });

    it('does not show Load More button when hasMore is false', () => {
      render(
        <ActivityFeed
          activities={sampleActivities}
          hasMore={false}
          onLoadMore={() => {}}
        />
      );

      expect(screen.queryByText('Load More')).not.toBeInTheDocument();
    });

    it('does not show Load More button when onLoadMore is not provided', () => {
      render(
        <ActivityFeed
          activities={sampleActivities}
          hasMore={true}
        />
      );

      expect(screen.queryByText('Load More')).not.toBeInTheDocument();
    });

    it('calls onLoadMore when Load More is clicked', () => {
      const handleLoadMore = vi.fn();
      render(
        <ActivityFeed
          activities={sampleActivities}
          hasMore={true}
          onLoadMore={handleLoadMore}
        />
      );

      fireEvent.click(screen.getByText('Load More'));
      expect(handleLoadMore).toHaveBeenCalledTimes(1);
    });

    it('shows Loading... when loading more', () => {
      render(
        <ActivityFeed
          activities={sampleActivities}
          hasMore={true}
          onLoadMore={() => {}}
          isLoading={true}
        />
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('disables Load More button when loading', () => {
      render(
        <ActivityFeed
          activities={sampleActivities}
          hasMore={true}
          onLoadMore={() => {}}
          isLoading={true}
        />
      );

      expect(screen.getByText('Loading...')).toBeDisabled();
    });
  });

  describe('Header', () => {
    it('shows Activity header with (Recent) label', () => {
      render(<ActivityFeed activities={sampleActivities} />);

      expect(screen.getByText('Activity')).toBeInTheDocument();
      expect(screen.getByText('(Recent)')).toBeInTheDocument();
    });
  });

  describe('TestId and className', () => {
    it('uses default testId', () => {
      render(<ActivityFeed activities={sampleActivities} />);
      expect(screen.getByTestId('activity-feed')).toBeInTheDocument();
    });

    it('uses custom testId', () => {
      render(<ActivityFeed activities={sampleActivities} testId="custom-feed" />);
      expect(screen.getByTestId('custom-feed')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<ActivityFeed activities={sampleActivities} className="custom-class" />);
      expect(screen.getByTestId('activity-feed')).toHaveClass('custom-class');
    });
  });
});
