import type { Meta, StoryObj } from '@storybook/react';
import { CampaignActivityFeed, GuildActivityCard } from './CampaignActivityFeed';
import type { UserActivity } from '../types';

const meta: Meta<typeof CampaignActivityFeed> = {
  title: 'Activity/Organisms/CampaignActivityFeed',
  component: CampaignActivityFeed,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-cfg-background-primary min-h-[600px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CampaignActivityFeed>;

const sampleActivities: UserActivity[] = [
  {
    guildId: 'guild-1',
    guildName: 'Crit-Fumble Gaming',
    campaigns: [
      {
        id: 'campaign-1',
        name: 'Curse of Strahd',
        hasActiveSession: true,
        activeSession: {
          id: 'session-1',
          name: 'Death House Descent',
          channelId: 'channel-1',
          startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        },
        characters: [
          { id: 'char-1', name: 'Aldric Stoneheart', type: 'pc', avatarUrl: null },
          { id: 'char-2', name: 'Seraphina Moonwhisper', type: 'pc', avatarUrl: null },
          { id: 'char-3', name: 'Grimlock the Brave', type: 'pc', avatarUrl: null },
        ],
      },
      {
        id: 'campaign-2',
        name: 'Waterdeep: Dragon Heist',
        hasActiveSession: false,
        activeSession: null,
        characters: [
          { id: 'char-4', name: 'Vex Nightshade', type: 'pc', avatarUrl: null },
        ],
      },
    ],
  },
  {
    guildId: 'guild-2',
    guildName: 'The Tavern',
    campaigns: [
      {
        id: 'campaign-3',
        name: 'Call of Cthulhu: Masks',
        hasActiveSession: false,
        activeSession: null,
        characters: [
          { id: 'char-5', name: 'Detective Morgan', type: 'pc', avatarUrl: null },
          { id: 'char-6', name: 'Dr. Elizabeth Ward', type: 'pc', avatarUrl: null },
        ],
      },
    ],
  },
];

export const Default: Story = {
  args: {
    activities: sampleActivities,
    onCampaignClick: (id) => alert(`Campaign clicked: ${id}`),
    onCharacterClick: (id) => alert(`Character clicked: ${id}`),
  },
};

export const Loading: Story = {
  args: {
    activities: [],
    isLoading: true,
  },
};

export const Error: Story = {
  args: {
    activities: [],
    error: 'Failed to load activity data',
    onRetry: () => alert('Retry clicked'),
  },
};

export const Empty: Story = {
  args: {
    activities: [],
  },
};

export const SingleGuild: Story = {
  args: {
    activities: [sampleActivities[0]],
    onCampaignClick: (id) => alert(`Campaign clicked: ${id}`),
  },
};

export const NoActiveSessions: Story = {
  args: {
    activities: [
      {
        guildId: 'guild-1',
        guildName: 'Quiet Server',
        campaigns: [
          {
            id: 'campaign-1',
            name: 'Tomb of Annihilation',
            hasActiveSession: false,
            activeSession: null,
            characters: [
              { id: 'char-1', name: 'Ranger Rex', type: 'pc', avatarUrl: null },
            ],
          },
        ],
      },
    ],
  },
};

// GuildActivityCard stories
export const GuildCard: StoryObj<typeof GuildActivityCard> = {
  render: () => (
    <div className="p-6 bg-cfg-background-primary max-w-2xl">
      <GuildActivityCard
        activity={sampleActivities[0]}
        onCampaignClick={(id) => alert(`Campaign: ${id}`)}
        onCharacterClick={(id) => alert(`Character: ${id}`)}
      />
    </div>
  ),
};

export const GuildCardEmpty: StoryObj<typeof GuildActivityCard> = {
  render: () => (
    <div className="p-6 bg-cfg-background-primary max-w-2xl">
      <GuildActivityCard
        activity={{
          guildId: 'guild-empty',
          guildName: 'Empty Server',
          campaigns: [],
        }}
      />
    </div>
  ),
};
