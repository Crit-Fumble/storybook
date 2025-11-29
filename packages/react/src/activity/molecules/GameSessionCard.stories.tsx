import type { Meta, StoryObj } from '@storybook/react';
import { GameSessionCard } from './GameSessionCard';
import type { GameSession } from '../types';

const meta: Meta<typeof GameSessionCard> = {
  title: 'Activity/Molecules/GameSessionCard',
  component: GameSessionCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-cfg-background-primary max-w-md">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GameSessionCard>;

const baseSession: GameSession = {
  id: 'session-1',
  campaignId: 'campaign-1',
  name: 'Death House Descent',
  channelId: 'channel-123',
  voiceChannelId: 'voice-456',
  status: 'active',
  startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  endedAt: null,
  startedBy: 'user-1',
  summary: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const Active: Story = {
  args: {
    session: baseSession,
    channelName: 'curse-of-strahd',
    voiceChannelName: 'Session Voice',
    onPause: () => alert('Pause clicked'),
    onEnd: () => alert('End clicked'),
    onView: () => alert('View clicked'),
  },
};

export const Paused: Story = {
  args: {
    session: {
      ...baseSession,
      status: 'paused',
      name: 'Amber Temple Exploration',
    },
    channelName: 'session-chat',
    onResume: () => alert('Resume clicked'),
    onEnd: () => alert('End clicked'),
    onView: () => alert('View clicked'),
  },
};

export const Ended: Story = {
  args: {
    session: {
      ...baseSession,
      status: 'ended',
      name: 'Village of Barovia',
      startedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      endedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      summary: 'The party explored the village and met Ismark and Ireena. They agreed to help escort Ireena to Vallaki.',
    },
    channelName: 'session-log',
    onView: () => alert('View clicked'),
  },
};

export const UnnamedSession: Story = {
  args: {
    session: {
      ...baseSession,
      name: null,
    },
    onPause: () => {},
    onEnd: () => {},
  },
};

export const NoVoiceChannel: Story = {
  args: {
    session: {
      ...baseSession,
      voiceChannelId: null,
    },
    channelName: 'text-only',
    onPause: () => {},
    onEnd: () => {},
  },
};

export const Loading: Story = {
  args: {
    session: baseSession,
    channelName: 'session-chat',
    onPause: () => {},
    onEnd: () => {},
    isLoading: true,
  },
};

export const LongSummary: Story = {
  args: {
    session: {
      ...baseSession,
      status: 'ended',
      endedAt: new Date(),
      summary: 'The party ventured deep into Castle Ravenloft, facing countless undead horrors along the way. They discovered the tomb of Sergei and learned crucial information about Strahd\'s past. After a harrowing battle with vampire spawn, they managed to escape with their lives.',
    },
    onView: () => alert('View clicked'),
  },
};
