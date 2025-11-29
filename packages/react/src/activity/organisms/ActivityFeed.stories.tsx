import type { Meta, StoryObj } from '@storybook/react';
import { ActivityFeed } from './ActivityFeed';
import type { ActivityItem } from './ActivityFeed';

const meta: Meta<typeof ActivityFeed> = {
  title: 'FumbleBot/Admin/ActivityFeed',
  component: ActivityFeed,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-discord-background-primary min-h-[600px] max-w-2xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ActivityFeed>;

const now = new Date();
const minutesAgo = (mins: number) => new Date(now.getTime() - mins * 60000);
const hoursAgo = (hrs: number) => new Date(now.getTime() - hrs * 3600000);
const daysAgo = (days: number) => new Date(now.getTime() - days * 86400000);

const sampleActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'dice_roll',
    userId: 'user-1',
    username: 'DungeonMaster42',
    channelId: 'ch-1',
    channelName: 'game-room',
    data: { expression: '1d20+5', result: 18 },
    timestamp: minutesAgo(2),
  },
  {
    id: '2',
    type: 'command',
    userId: 'user-2',
    username: 'PlayerOne',
    channelId: 'ch-1',
    channelName: 'game-room',
    data: { command: 'roll' },
    timestamp: minutesAgo(5),
  },
  {
    id: '3',
    type: 'session_start',
    userId: 'user-1',
    username: 'DungeonMaster42',
    channelId: 'ch-2',
    channelName: 'campaign-chat',
    data: { campaignName: 'Curse of Strahd' },
    timestamp: minutesAgo(30),
  },
  {
    id: '4',
    type: 'campaign_create',
    userId: 'user-3',
    username: 'GameMaster',
    data: { campaignName: 'Lost Mines of Phandelver' },
    timestamp: hoursAgo(2),
  },
  {
    id: '5',
    type: 'chat_message',
    userId: 'user-2',
    username: 'PlayerOne',
    channelId: 'ch-1',
    channelName: 'game-room',
    data: {},
    timestamp: hoursAgo(4),
  },
  {
    id: '6',
    type: 'session_end',
    userId: 'user-1',
    username: 'DungeonMaster42',
    channelId: 'ch-2',
    channelName: 'campaign-chat',
    data: { campaignName: 'Dragon Heist' },
    timestamp: daysAgo(1),
  },
  {
    id: '7',
    type: 'dice_roll',
    userId: 'user-4',
    username: 'CriticalHitter',
    channelId: 'ch-3',
    channelName: 'dice-rolling',
    data: { expression: '8d6', result: 28 },
    timestamp: daysAgo(2),
  },
];

export const Default: Story = {
  args: {
    activities: sampleActivities,
  },
};

export const Empty: Story = {
  args: {
    activities: [],
  },
};

export const Loading: Story = {
  args: {
    activities: [],
    isLoading: true,
  },
};

export const WithLoadMore: Story = {
  args: {
    activities: sampleActivities.slice(0, 4),
    hasMore: true,
    onLoadMore: () => alert('Load more clicked'),
  },
};

export const LoadingMore: Story = {
  args: {
    activities: sampleActivities.slice(0, 4),
    hasMore: true,
    isLoading: true,
    onLoadMore: () => {},
  },
};

export const SingleActivity: Story = {
  args: {
    activities: [sampleActivities[0]],
  },
};

export const ManyActivities: Story = {
  args: {
    activities: [
      ...sampleActivities,
      ...sampleActivities.map((a, i) => ({
        ...a,
        id: `extra-${i}`,
        timestamp: daysAgo(3 + i),
      })),
    ],
    hasMore: true,
    onLoadMore: () => {},
  },
};
