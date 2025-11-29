import type { Meta, StoryObj } from '@storybook/react';
import { UserActivityCard } from './UserActivityCard';
import type { UserActivity } from '@crit-fumble/core/types';

const meta: Meta<typeof UserActivityCard> = {
  title: 'FumbleBot/Users/UserActivityCard',
  component: UserActivityCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-discord-background-primary max-w-md">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof UserActivityCard>;

const activityWithSession: UserActivity = {
  guildId: 'guild-1',
  guildName: "Adventurer's Guild",
  campaigns: [
    {
      id: 'campaign-1',
      name: 'Curse of Strahd',
      hasActiveSession: true,
      activeSession: {
        id: 'session-1',
        name: 'The Death House',
        channelId: 'channel-1',
        startedAt: new Date().toISOString(),
      },
      characters: [
        { id: 'char-1', name: 'Thorin', type: 'pc', avatarUrl: null },
        { id: 'char-2', name: 'Elara', type: 'pc', avatarUrl: null },
      ],
    },
    {
      id: 'campaign-2',
      name: 'Dragon Heist',
      hasActiveSession: false,
      activeSession: null,
      characters: [
        { id: 'char-3', name: 'Vex', type: 'pc', avatarUrl: null },
      ],
    },
  ],
};

const activityNoSession: UserActivity = {
  guildId: 'guild-2',
  guildName: 'Casual Games',
  campaigns: [
    {
      id: 'campaign-3',
      name: 'One-Shot Adventures',
      hasActiveSession: false,
      activeSession: null,
      characters: [],
    },
  ],
};

const activityEmpty: UserActivity = {
  guildId: 'guild-3',
  guildName: 'New Server',
  campaigns: [],
};

const activityManyCharacters: UserActivity = {
  guildId: 'guild-4',
  guildName: 'Character Showcase',
  campaigns: [
    {
      id: 'campaign-4',
      name: 'Party of Many',
      hasActiveSession: false,
      activeSession: null,
      characters: [
        { id: 'c1', name: 'Fighter', type: 'pc', avatarUrl: null },
        { id: 'c2', name: 'Wizard', type: 'pc', avatarUrl: null },
        { id: 'c3', name: 'Rogue', type: 'pc', avatarUrl: null },
        { id: 'c4', name: 'Cleric', type: 'pc', avatarUrl: null },
        { id: 'c5', name: 'Bard', type: 'pc', avatarUrl: null },
        { id: 'c6', name: 'Paladin', type: 'pc', avatarUrl: null },
      ],
    },
  ],
};

export const WithActiveSession: Story = {
  args: {
    activity: activityWithSession,
    onGuildClick: () => alert('Guild clicked'),
    onCampaignClick: (id) => alert(`Campaign ${id} clicked`),
    onJoinSession: (id) => alert(`Join session ${id}`),
  },
};

export const NoActiveSession: Story = {
  args: {
    activity: activityNoSession,
    onCampaignClick: (id) => alert(`Campaign ${id} clicked`),
  },
};

export const NoCampaigns: Story = {
  args: {
    activity: activityEmpty,
  },
};

export const ManyCharacters: Story = {
  args: {
    activity: activityManyCharacters,
  },
};

export const ReadOnly: Story = {
  args: {
    activity: activityWithSession,
  },
};
