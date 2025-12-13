import type { Meta, StoryObj } from '@storybook/react';
import { VoiceSessionList } from './VoiceSessionList';
import type { VoiceSessionsResponse } from '../types';

const meta: Meta<typeof VoiceSessionList> = {
  title: 'Activity/Molecules/VoiceSessionList',
  component: VoiceSessionList,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-4 bg-cfg-background-primary w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof VoiceSessionList>;

const emptySessions: VoiceSessionsResponse = {
  sessions: [],
  count: 0,
};

const singleSession: VoiceSessionsResponse = {
  sessions: [
    {
      id: 'session-1',
      guildId: 'guild-1',
      channelId: 'channel-1',
      channelName: 'Game Session',
      participants: ['user-1', 'user-2'],
      listening: false,
      playing: false,
      gameSessionId: null,
      joinedAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    },
  ],
  count: 1,
};

const multipleSessions: VoiceSessionsResponse = {
  sessions: [
    {
      id: 'session-1',
      guildId: 'guild-1',
      channelId: 'channel-1',
      channelName: 'Game Session',
      participants: ['user-1', 'user-2', 'user-3'],
      listening: true,
      playing: false,
      gameSessionId: 'game-123',
      joinedAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    },
    {
      id: 'session-2',
      guildId: 'guild-2',
      channelId: 'channel-2',
      channelName: 'Voice Chat',
      participants: ['user-4'],
      listening: false,
      playing: true,
      gameSessionId: null,
      joinedAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    },
    {
      id: 'session-3',
      guildId: 'guild-3',
      channelId: 'channel-3',
      channelName: 'General',
      participants: ['user-5', 'user-6'],
      listening: true,
      playing: false,
      gameSessionId: 'game-456',
      joinedAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    },
  ],
  count: 3,
};

const guildNames: Record<string, string> = {
  'guild-1': 'Crit-Fumble Gaming',
  'guild-2': 'D&D Night',
  'guild-3': 'Pathfinder Society',
};

const channelNames: Record<string, string> = {
  'channel-1': 'Game Session',
  'channel-2': 'Voice Chat',
  'channel-3': 'General',
};

export const Empty: Story = {
  args: {
    sessions: emptySessions,
  },
};

export const SingleSession: Story = {
  args: {
    sessions: singleSession,
    guildNames,
    channelNames,
  },
};

export const MultipleSessions: Story = {
  args: {
    sessions: multipleSessions,
    guildNames,
    channelNames,
  },
};

export const WithoutNames: Story = {
  args: {
    sessions: multipleSessions,
  },
};

export const Clickable: Story = {
  args: {
    sessions: multipleSessions,
    guildNames,
    channelNames,
    onSessionClick: (guildId, channelId) => alert(`Clicked: ${guildId} / ${channelId}`),
  },
};
