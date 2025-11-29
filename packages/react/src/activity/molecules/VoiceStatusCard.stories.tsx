import type { Meta, StoryObj } from '@storybook/react';
import { VoiceStatusCard } from './VoiceStatusCard';

const meta: Meta<typeof VoiceStatusCard> = {
  title: 'Activity/Molecules/VoiceStatusCard',
  component: VoiceStatusCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-4 bg-cfg-background-primary w-[320px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof VoiceStatusCard>;

export const Disconnected: Story = {
  args: {
    status: {
      guildId: 'guild-123',
      connected: false,
      channelId: null,
      listening: false,
    },
  },
};

export const Connected: Story = {
  args: {
    status: {
      guildId: 'guild-123',
      connected: true,
      channelId: 'channel-456',
      listening: false,
    },
    channelName: 'Voice Chat',
  },
};

export const Listening: Story = {
  args: {
    status: {
      guildId: 'guild-123',
      connected: true,
      channelId: 'channel-456',
      listening: true,
    },
    channelName: 'Game Session',
  },
};

export const ConnectedNoChannelName: Story = {
  args: {
    status: {
      guildId: 'guild-123',
      connected: true,
      channelId: 'channel-456',
      listening: false,
    },
  },
};
