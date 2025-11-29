import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserActivityCard } from './UserActivityCard';
import type { UserActivity } from '@crit-fumble/core/types';

const createMockActivity = (overrides: Partial<UserActivity> = {}): UserActivity => ({
  guildId: 'guild-1',
  guildName: 'Test Server',
  campaigns: [],
  ...overrides,
});

const createMockCampaign = (overrides: Partial<UserActivity['campaigns'][0]> = {}) => ({
  id: 'campaign-1',
  name: 'Test Campaign',
  hasActiveSession: false,
  activeSession: null,
  characters: [],
  ...overrides,
});

const createMockCharacter = (overrides: Partial<UserActivity['campaigns'][0]['characters'][0]> = {}) => ({
  id: 'char-1',
  name: 'Test Character',
  type: 'pc' as const,
  avatarUrl: null,
  ...overrides,
});

describe('UserActivityCard', () => {
  describe('rendering', () => {
    it('renders guild name', () => {
      render(<UserActivityCard activity={createMockActivity()} />);
      expect(screen.getByText('Test Server')).toBeInTheDocument();
    });

    it('renders unknown server when no guild name', () => {
      render(<UserActivityCard activity={createMockActivity({ guildName: undefined })} />);
      expect(screen.getByText('Unknown Server')).toBeInTheDocument();
    });

    it('applies testId correctly', () => {
      render(<UserActivityCard activity={createMockActivity()} testId="custom-activity-card" />);
      expect(screen.getByTestId('custom-activity-card')).toBeInTheDocument();
    });

    it('applies default testId', () => {
      render(<UserActivityCard activity={createMockActivity()} />);
      expect(screen.getByTestId('user-activity-card')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<UserActivityCard activity={createMockActivity()} className="custom-class" />);
      expect(screen.getByTestId('user-activity-card')).toHaveClass('custom-class');
    });
  });

  describe('campaign count', () => {
    it('shows singular campaign count', () => {
      const activity = createMockActivity({
        campaigns: [createMockCampaign()],
      });
      render(<UserActivityCard activity={activity} />);
      expect(screen.getByText('1 campaign')).toBeInTheDocument();
    });

    it('shows plural campaign count', () => {
      const activity = createMockActivity({
        campaigns: [
          createMockCampaign({ id: '1' }),
          createMockCampaign({ id: '2' }),
        ],
      });
      render(<UserActivityCard activity={activity} />);
      expect(screen.getByText('2 campaigns')).toBeInTheDocument();
    });

    it('shows no campaigns message when empty', () => {
      render(<UserActivityCard activity={createMockActivity()} />);
      expect(screen.getByText('No campaigns yet')).toBeInTheDocument();
    });
  });

  describe('active sessions', () => {
    it('shows active badge when campaigns have active sessions', () => {
      const activity = createMockActivity({
        campaigns: [
          createMockCampaign({
            hasActiveSession: true,
            activeSession: { id: 'session-1', name: 'Test Session' },
          }),
        ],
      });
      render(<UserActivityCard activity={activity} />);
      expect(screen.getByText('1 Active')).toBeInTheDocument();
    });

    it('does not show active badge when no active sessions', () => {
      const activity = createMockActivity({
        campaigns: [createMockCampaign()],
      });
      render(<UserActivityCard activity={activity} />);
      expect(screen.queryByText(/Active/)).not.toBeInTheDocument();
    });

    it('shows active session name', () => {
      const activity = createMockActivity({
        campaigns: [
          createMockCampaign({
            hasActiveSession: true,
            activeSession: { id: 'session-1', name: 'Epic Battle' },
          }),
        ],
      });
      render(<UserActivityCard activity={activity} />);
      expect(screen.getByText('Epic Battle')).toBeInTheDocument();
    });

    it('shows fallback for session without name', () => {
      const activity = createMockActivity({
        campaigns: [
          createMockCampaign({
            hasActiveSession: true,
            activeSession: { id: 'session-1', name: '' },
          }),
        ],
      });
      render(<UserActivityCard activity={activity} />);
      expect(screen.getByText('Active Session')).toBeInTheDocument();
    });

    it('shows Join Session button for active sessions', () => {
      const activity = createMockActivity({
        campaigns: [
          createMockCampaign({
            hasActiveSession: true,
            activeSession: { id: 'session-1', name: 'Test Session' },
          }),
        ],
      });
      render(<UserActivityCard activity={activity} />);
      expect(screen.getByText('Join Session')).toBeInTheDocument();
    });
  });

  describe('characters', () => {
    it('renders character list', () => {
      const activity = createMockActivity({
        campaigns: [
          createMockCampaign({
            characters: [
              createMockCharacter({ name: 'Aragorn' }),
              createMockCharacter({ id: 'char-2', name: 'Legolas' }),
            ],
          }),
        ],
      });
      render(<UserActivityCard activity={activity} />);
      expect(screen.getByText('Aragorn')).toBeInTheDocument();
      expect(screen.getByText('Legolas')).toBeInTheDocument();
    });

    it('shows character avatar when available', () => {
      const activity = createMockActivity({
        campaigns: [
          createMockCampaign({
            characters: [
              createMockCharacter({
                name: 'Aragorn',
                avatarUrl: 'https://example.com/avatar.png',
              }),
            ],
          }),
        ],
      });
      render(<UserActivityCard activity={activity} />);
      const img = screen.getByRole('img', { name: 'Aragorn' });
      expect(img).toHaveAttribute('src', 'https://example.com/avatar.png');
    });

    it('shows character initial when no avatar', () => {
      const activity = createMockActivity({
        campaigns: [
          createMockCampaign({
            characters: [createMockCharacter({ name: 'Aragorn', avatarUrl: null })],
          }),
        ],
      });
      render(<UserActivityCard activity={activity} />);
      expect(screen.getByText('A')).toBeInTheDocument();
    });

    it('shows +N more when more than 4 characters', () => {
      const activity = createMockActivity({
        campaigns: [
          createMockCampaign({
            characters: [
              createMockCharacter({ id: '1', name: 'Char 1' }),
              createMockCharacter({ id: '2', name: 'Char 2' }),
              createMockCharacter({ id: '3', name: 'Char 3' }),
              createMockCharacter({ id: '4', name: 'Char 4' }),
              createMockCharacter({ id: '5', name: 'Char 5' }),
              createMockCharacter({ id: '6', name: 'Char 6' }),
            ],
          }),
        ],
      });
      render(<UserActivityCard activity={activity} />);
      expect(screen.getByText('+2 more')).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onGuildClick when guild header is clicked', () => {
      const handleGuildClick = vi.fn();
      render(<UserActivityCard activity={createMockActivity()} onGuildClick={handleGuildClick} />);
      fireEvent.click(screen.getByText('Test Server'));
      expect(handleGuildClick).toHaveBeenCalledTimes(1);
    });

    it('calls onCampaignClick with campaign id when campaign is clicked', () => {
      const handleCampaignClick = vi.fn();
      const activity = createMockActivity({
        campaigns: [createMockCampaign({ id: 'campaign-123', name: 'My Campaign' })],
      });
      render(<UserActivityCard activity={activity} onCampaignClick={handleCampaignClick} />);
      fireEvent.click(screen.getByText('My Campaign'));
      expect(handleCampaignClick).toHaveBeenCalledWith('campaign-123');
    });

    it('calls onJoinSession with session id when Join Session is clicked', () => {
      const handleJoinSession = vi.fn();
      const activity = createMockActivity({
        campaigns: [
          createMockCampaign({
            hasActiveSession: true,
            activeSession: { id: 'session-456', name: 'Test Session' },
          }),
        ],
      });
      render(<UserActivityCard activity={activity} onJoinSession={handleJoinSession} />);
      fireEvent.click(screen.getByText('Join Session'));
      expect(handleJoinSession).toHaveBeenCalledWith('session-456');
    });

    it('stops propagation when Join Session is clicked', () => {
      const handleCampaignClick = vi.fn();
      const handleJoinSession = vi.fn();
      const activity = createMockActivity({
        campaigns: [
          createMockCampaign({
            hasActiveSession: true,
            activeSession: { id: 'session-456', name: 'Test Session' },
          }),
        ],
      });
      render(
        <UserActivityCard
          activity={activity}
          onCampaignClick={handleCampaignClick}
          onJoinSession={handleJoinSession}
        />
      );
      fireEvent.click(screen.getByText('Join Session'));
      expect(handleJoinSession).toHaveBeenCalledTimes(1);
      expect(handleCampaignClick).not.toHaveBeenCalled();
    });

    it('applies hover styles when onGuildClick is provided', () => {
      const handleGuildClick = vi.fn();
      render(<UserActivityCard activity={createMockActivity()} onGuildClick={handleGuildClick} />);
      // The cursor-pointer class is on the header container with the onClick handler
      const container = screen.getByTestId('user-activity-card');
      const header = container.querySelector('[class*="cursor-pointer"]');
      expect(header).toBeInTheDocument();
    });

    it('applies hover styles when onCampaignClick is provided', () => {
      const handleCampaignClick = vi.fn();
      const activity = createMockActivity({
        campaigns: [createMockCampaign()],
      });
      render(<UserActivityCard activity={activity} onCampaignClick={handleCampaignClick} />);
      // Check that cursor-pointer class exists somewhere in the campaigns
      const container = screen.getByTestId('user-activity-card');
      const campaign = container.querySelectorAll('[class*="cursor-pointer"]');
      expect(campaign.length).toBeGreaterThan(0);
    });
  });
});
