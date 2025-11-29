import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { VoiceControlPanel } from './VoiceControlPanel';
import type { VoiceStatusResponse, DiscordChannel } from '../types';

const meta: Meta<typeof VoiceControlPanel> = {
  title: 'Activity/Organisms/VoiceControlPanel',
  component: VoiceControlPanel,
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
type Story = StoryObj<typeof VoiceControlPanel>;

const sampleChannels: DiscordChannel[] = [
  { id: 'channel-1', name: 'General Voice', type: 2 },
  { id: 'channel-2', name: 'Game Session', type: 2 },
  { id: 'channel-3', name: 'AFK', type: 2 },
  { id: 'channel-4', name: 'Text Channel', type: 0 }, // Should be filtered out
];

const disconnectedStatus: VoiceStatusResponse = {
  guildId: 'guild-123',
  connected: false,
  channelId: null,
  listening: false,
};

const connectedStatus: VoiceStatusResponse = {
  guildId: 'guild-123',
  connected: true,
  channelId: 'channel-2',
  listening: false,
};

const listeningStatus: VoiceStatusResponse = {
  guildId: 'guild-123',
  connected: true,
  channelId: 'channel-2',
  listening: true,
};

export const Disconnected: Story = {
  args: {
    status: disconnectedStatus,
    channels: sampleChannels,
    onJoin: (channelId) => alert(`Join channel: ${channelId}`),
    onLeave: () => alert('Leave'),
    onPlay: (url, volume) => alert(`Play: ${url} at ${volume}`),
    onStop: () => alert('Stop'),
    onStartListening: () => alert('Start listening'),
    onStopListening: () => alert('Stop listening'),
  },
};

export const Connected: Story = {
  args: {
    status: connectedStatus,
    channels: sampleChannels,
    currentChannelName: 'Game Session',
    onJoin: () => {},
    onLeave: () => alert('Leave'),
    onPlay: (url, volume) => alert(`Play: ${url} at ${volume}`),
    onStop: () => alert('Stop'),
    onStartListening: () => alert('Start listening'),
    onStopListening: () => alert('Stop listening'),
  },
};

export const Listening: Story = {
  args: {
    status: listeningStatus,
    channels: sampleChannels,
    currentChannelName: 'Game Session',
    onJoin: () => {},
    onLeave: () => alert('Leave'),
    onPlay: (url, volume) => alert(`Play: ${url} at ${volume}`),
    onStop: () => alert('Stop'),
    onStartListening: () => alert('Start listening'),
    onStopListening: () => alert('Stop listening'),
  },
};

export const Loading: Story = {
  args: {
    status: disconnectedStatus,
    channels: sampleChannels,
    onJoin: () => {},
    onLeave: () => {},
    onPlay: () => {},
    onStop: () => {},
    onStartListening: () => {},
    onStopListening: () => {},
    isLoading: true,
  },
};

export const NoChannels: Story = {
  args: {
    status: disconnectedStatus,
    channels: [],
    onJoin: () => {},
    onLeave: () => {},
    onPlay: () => {},
    onStop: () => {},
    onStartListening: () => {},
    onStopListening: () => {},
  },
};

// Interactive demo
function InteractiveVoicePanel() {
  const [status, setStatus] = useState<VoiceStatusResponse>(disconnectedStatus);
  const [isLoading, setIsLoading] = useState(false);

  const simulateAction = (action: () => void) => {
    setIsLoading(true);
    setTimeout(() => {
      action();
      setIsLoading(false);
    }, 800);
  };

  const handleJoin = (channelId: string) => {
    simulateAction(() => {
      setStatus({
        ...status,
        connected: true,
        channelId,
        listening: false,
      });
    });
  };

  const handleLeave = () => {
    simulateAction(() => {
      setStatus(disconnectedStatus);
    });
  };

  const handleStartListening = () => {
    simulateAction(() => {
      setStatus({ ...status, listening: true });
    });
  };

  const handleStopListening = () => {
    simulateAction(() => {
      setStatus({ ...status, listening: false });
    });
  };

  const currentChannel = sampleChannels.find((c) => c.id === status.channelId);

  return (
    <VoiceControlPanel
      status={status}
      channels={sampleChannels}
      currentChannelName={currentChannel?.name}
      onJoin={handleJoin}
      onLeave={handleLeave}
      onPlay={(url, vol) => alert(`Playing: ${url} at ${vol}`)}
      onStop={() => alert('Stopped')}
      onStartListening={handleStartListening}
      onStopListening={handleStopListening}
      isLoading={isLoading}
    />
  );
}

export const Interactive: Story = {
  render: () => <InteractiveVoicePanel />,
};
