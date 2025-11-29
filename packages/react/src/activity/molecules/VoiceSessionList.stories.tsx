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
    { guildId: 'guild-1', channelId: 'channel-1', listening: false },
  ],
  count: 1,
};

const multipleSessions: VoiceSessionsResponse = {
  sessions: [
    { guildId: 'guild-1', channelId: 'channel-1', listening: true },
    { guildId: 'guild-2', channelId: 'channel-2', listening: false },
    { guildId: 'guild-3', channelId: 'channel-3', listening: true },
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
