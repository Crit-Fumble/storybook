import type { Meta, StoryObj } from '@storybook/react';
import { GameSessionPanel } from './GameSessionPanel';
import type { GameSession, DiscordChannel } from '../types';

const meta: Meta<typeof GameSessionPanel> = {
  title: 'Activity/Organisms/GameSessionPanel',
  component: GameSessionPanel,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-cfg-background-primary max-w-lg">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GameSessionPanel>;

const textChannels: DiscordChannel[] = [
  { id: 'ch-1', name: 'session-log', type: 0 },
  { id: 'ch-2', name: 'curse-of-strahd', type: 0 },
  { id: 'ch-3', name: 'general', type: 0 },
];

const voiceChannels: DiscordChannel[] = [
  { id: 'vc-1', name: 'Session Voice', type: 2 },
  { id: 'vc-2', name: 'General Voice', type: 2 },
];

const channelNames: Record<string, string> = {
  'ch-1': 'session-log',
  'ch-2': 'curse-of-strahd',
  'vc-1': 'Session Voice',
};

const activeSession: GameSession = {
  id: 'session-1',
  campaignId: 'campaign-1',
  name: 'Session 15: The Amber Temple',
  channelId: 'ch-1',
  voiceChannelId: 'vc-1',
  status: 'active',
  startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  endedAt: null,
  startedBy: 'user-1',
  summary: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const recentSessions: GameSession[] = [
  {
    id: 'session-old-1',
    campaignId: 'campaign-1',
    name: 'Session 14: Vallaki Unrest',
    channelId: 'ch-2',
    voiceChannelId: 'vc-1',
    status: 'ended',
    startedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    endedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000),
    startedBy: 'user-1',
    summary: 'The party dealt with the aftermath of the Festival of the Blazing Sun.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'session-old-2',
    campaignId: 'campaign-1',
    name: 'Session 13: Old Bonegrinder',
    channelId: 'ch-2',
    voiceChannelId: null,
    status: 'ended',
    startedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    endedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
    startedBy: 'user-1',
    summary: 'The party confronted the hags at the windmill.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const NoActiveSession: Story = {
  args: {
    activeSession: null,
    recentSessions,
    textChannels,
    voiceChannels,
    channelNames,
    onStartSession: (channelId, voiceChannelId, name) => {
      alert(`Start session: ${name || 'Unnamed'}\nChannel: ${channelId}\nVoice: ${voiceChannelId || 'None'}`);
    },
    onViewSession: (id) => alert(`View session: ${id}`),
  },
};

export const WithActiveSession: Story = {
  args: {
    activeSession,
    recentSessions,
    textChannels,
    voiceChannels,
    channelNames,
    onPauseSession: (id) => alert(`Pause: ${id}`),
    onEndSession: (id) => alert(`End: ${id}`),
    onViewSession: (id) => alert(`View: ${id}`),
  },
};

export const WithPausedSession: Story = {
  args: {
    activeSession: {
      ...activeSession,
      status: 'paused',
    },
    recentSessions,
    channelNames,
    onResumeSession: (id) => alert(`Resume: ${id}`),
    onEndSession: (id) => alert(`End: ${id}`),
    onViewSession: (id) => alert(`View: ${id}`),
  },
};

export const NoChannels: Story = {
  args: {
    activeSession: null,
    recentSessions: [],
    textChannels: [],
    voiceChannels: [],
  },
};

export const Loading: Story = {
  args: {
    activeSession,
    recentSessions,
    channelNames,
    onPauseSession: () => {},
    onEndSession: () => {},
    isLoading: true,
  },
};

export const NoRecentSessions: Story = {
  args: {
    activeSession: null,
    recentSessions: [],
    textChannels,
    voiceChannels,
    onStartSession: () => alert('Start'),
  },
};
