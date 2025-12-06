
import { render, screen, fireEvent } from '@testing-library/react';
import { CampaignActivityFeed, GuildActivityCard } from './CampaignActivityFeed';
import type { UserActivity } from '../types';

const sampleActivity: UserActivity = {
  guildId: 'guild-1',
  guildName: 'Test Server',
  campaigns: [
    {
      id: 'campaign-1',
      name: 'Test Campaign',
      hasActiveSession: true,
      activeSession: {
        id: 'session-1',
        name: 'Session One',
        channelId: 'channel-1',
        startedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 mins ago
      },
      characters: [
        { id: 'char-1', name: 'Hero', type: 'pc', avatarUrl: null },
        { id: 'char-2', name: 'Sidekick', type: 'npc', avatarUrl: 'https://example.com/avatar.jpg' },
      ],
    },
    {
      id: 'campaign-2',
      name: 'Inactive Campaign',
      hasActiveSession: false,
      activeSession: null,
      characters: [],
    },
  ],
};

describe('GuildActivityCard', () => {
  it('renders guild name', () => {
    render(<GuildActivityCard activity={sampleActivity} />);
    expect(screen.getByText('Test Server')).toBeInTheDocument();
  });

  it('renders campaigns', () => {
    render(<GuildActivityCard activity={sampleActivity} />);
    expect(screen.getByText('Test Campaign')).toBeInTheDocument();
    expect(screen.getByText('Inactive Campaign')).toBeInTheDocument();
  });

  it('shows Live badge for active sessions', () => {
    render(<GuildActivityCard activity={sampleActivity} />);
    expect(screen.getByText('Live')).toBeInTheDocument();
  });

  it('shows session name and relative time', () => {
    render(<GuildActivityCard activity={sampleActivity} />);
    expect(screen.getByText('Session One')).toBeInTheDocument();
    expect(screen.getByText(/Started/)).toBeInTheDocument();
  });

  it('renders characters', () => {
    render(<GuildActivityCard activity={sampleActivity} />);
    expect(screen.getByText('Hero')).toBeInTheDocument();
    expect(screen.getByText('Sidekick')).toBeInTheDocument();
  });

  it('shows character type', () => {
    render(<GuildActivityCard activity={sampleActivity} />);
    expect(screen.getByText('pc')).toBeInTheDocument();
    expect(screen.getByText('npc')).toBeInTheDocument();
  });

  it('shows character count', () => {
    render(<GuildActivityCard activity={sampleActivity} />);
    expect(screen.getByText('2 characters')).toBeInTheDocument();
    expect(screen.getByText('0 characters')).toBeInTheDocument();
  });

  it('calls onCampaignClick when campaign is clicked', () => {
    const handleClick = jest.fn();
    render(<GuildActivityCard activity={sampleActivity} onCampaignClick={handleClick} />);

    fireEvent.click(screen.getByTestId('guild-activity-card-campaign-0'));
    expect(handleClick).toHaveBeenCalledWith('campaign-1');
  });

  it('calls onCharacterClick when character is clicked', () => {
    const handleCampaignClick = jest.fn();
    const handleCharacterClick = jest.fn();
    render(
      <GuildActivityCard
        activity={sampleActivity}
        onCampaignClick={handleCampaignClick}
        onCharacterClick={handleCharacterClick}
      />
    );

    fireEvent.click(screen.getByText('Hero'));
    expect(handleCharacterClick).toHaveBeenCalledWith('char-1');
    // Should not bubble to campaign click
    expect(handleCampaignClick).not.toHaveBeenCalled();
  });

  it('shows empty message when no campaigns', () => {
    render(
      <GuildActivityCard
        activity={{ guildId: 'empty', guildName: 'Empty', campaigns: [] }}
      />
    );
    expect(screen.getByText('No campaigns in this server yet.')).toBeInTheDocument();
  });

  it('shows Unknown Server when guildName is null', () => {
    render(
      <GuildActivityCard
        activity={{ guildId: 'unknown', guildName: null, campaigns: [] }}
      />
    );
    expect(screen.getByText('Unknown Server')).toBeInTheDocument();
  });

  it('renders character avatar when provided', () => {
    render(<GuildActivityCard activity={sampleActivity} />);
    const avatar = screen.getByAltText('Sidekick');
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('renders initial when no avatar', () => {
    render(<GuildActivityCard activity={sampleActivity} />);
    expect(screen.getByText('H')).toBeInTheDocument(); // Hero's initial
  });

  it('applies custom className', () => {
    render(<GuildActivityCard activity={sampleActivity} className="custom-class" />);
    expect(screen.getByTestId('guild-activity-card')).toHaveClass('custom-class');
  });
});

describe('CampaignActivityFeed', () => {
  it('renders activities', () => {
    render(<CampaignActivityFeed activities={[sampleActivity]} />);
    expect(screen.getByText('Test Server')).toBeInTheDocument();
  });

  it('shows stats', () => {
    render(<CampaignActivityFeed activities={[sampleActivity]} />);
    expect(screen.getByTestId('campaign-activity-feed-stat-campaigns')).toHaveTextContent('2');
    expect(screen.getByTestId('campaign-activity-feed-stat-sessions')).toHaveTextContent('1');
    expect(screen.getByTestId('campaign-activity-feed-stat-characters')).toHaveTextContent('2');
  });

  it('shows loading state', () => {
    render(<CampaignActivityFeed activities={[]} isLoading />);
    expect(screen.getByTestId('campaign-activity-feed-loading')).toBeInTheDocument();
  });

  it('shows error state', () => {
    render(<CampaignActivityFeed activities={[]} error="Something went wrong" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('shows retry button when error and onRetry provided', () => {
    const handleRetry = jest.fn();
    render(
      <CampaignActivityFeed activities={[]} error="Error" onRetry={handleRetry} />
    );

    fireEvent.click(screen.getByText('Try again'));
    expect(handleRetry).toHaveBeenCalled();
  });

  it('shows empty state', () => {
    render(<CampaignActivityFeed activities={[]} />);
    expect(screen.getByText('No campaigns yet')).toBeInTheDocument();
  });

  it('renders multiple guilds', () => {
    const activities: UserActivity[] = [
      sampleActivity,
      { guildId: 'guild-2', guildName: 'Second Server', campaigns: [] },
    ];
    render(<CampaignActivityFeed activities={activities} />);

    expect(screen.getByText('Test Server')).toBeInTheDocument();
    expect(screen.getByText('Second Server')).toBeInTheDocument();
  });

  it('passes callbacks to GuildActivityCard', () => {
    const handleCampaignClick = jest.fn();
    const handleCharacterClick = jest.fn();
    render(
      <CampaignActivityFeed
        activities={[sampleActivity]}
        onCampaignClick={handleCampaignClick}
        onCharacterClick={handleCharacterClick}
      />
    );

    fireEvent.click(screen.getByTestId('campaign-activity-feed-guild-0-campaign-0'));
    expect(handleCampaignClick).toHaveBeenCalledWith('campaign-1');
  });

  it('applies custom className', () => {
    render(
      <CampaignActivityFeed activities={[sampleActivity]} className="custom-class" />
    );
    expect(screen.getByTestId('campaign-activity-feed')).toHaveClass('custom-class');
  });

  it('calculates correct stats across multiple guilds', () => {
    const activities: UserActivity[] = [
      sampleActivity,
      {
        guildId: 'guild-2',
        guildName: 'Second',
        campaigns: [
          {
            id: 'c3',
            name: 'Campaign 3',
            hasActiveSession: true,
            activeSession: { id: 's2', name: null, channelId: 'ch2', startedAt: new Date().toISOString() },
            characters: [{ id: 'ch3', name: 'Mage', type: 'pc', avatarUrl: null }],
          },
        ],
      },
    ];
    render(<CampaignActivityFeed activities={activities} />);

    expect(screen.getByTestId('campaign-activity-feed-stat-campaigns')).toHaveTextContent('3');
    expect(screen.getByTestId('campaign-activity-feed-stat-sessions')).toHaveTextContent('2');
    expect(screen.getByTestId('campaign-activity-feed-stat-characters')).toHaveTextContent('3');
  });

  it('shows singular labels when count is 1', () => {
    const activities: UserActivity[] = [
      {
        guildId: 'guild-1',
        guildName: 'Solo',
        campaigns: [
          {
            id: 'c1',
            name: 'Solo Campaign',
            hasActiveSession: true,
            activeSession: { id: 's1', name: 'Session', channelId: 'ch1', startedAt: new Date().toISOString() },
            characters: [{ id: 'ch1', name: 'Lone Wolf', type: 'pc', avatarUrl: null }],
          },
        ],
      },
    ];
    render(<CampaignActivityFeed activities={activities} />);

    expect(screen.getByText('Campaign')).toBeInTheDocument();
    expect(screen.getByText('Active Session')).toBeInTheDocument();
    expect(screen.getByText('Character')).toBeInTheDocument();
  });
});
