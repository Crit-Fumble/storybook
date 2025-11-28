import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { VTTLauncher } from './VTTLauncher';
import type { FumbleCampaign, ContainerStatus } from '../types';

const meta: Meta<typeof VTTLauncher> = {
  title: 'Activity/Molecules/VTTLauncher',
  component: VTTLauncher,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-4 bg-discord-background-tertiary max-w-md">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof VTTLauncher>;

const baseCampaign: FumbleCampaign = {
  id: 'campaign-123',
  guildId: 'guild-456',
  name: "Dragon's Lair Campaign",
  description: 'A epic adventure through the forgotten realms.',
  foundrySystemId: 'dnd5e',
  containerStatus: 'stopped',
};

export const Stopped: Story = {
  args: {
    campaign: baseCampaign,
    onLaunch: (c) => alert(`Launching: ${c.name}`),
  },
};

export const Starting: Story = {
  args: {
    campaign: {
      ...baseCampaign,
      containerStatus: 'starting',
    },
    onLaunch: (c) => alert(`Launching: ${c.name}`),
  },
};

export const Running: Story = {
  args: {
    campaign: {
      ...baseCampaign,
      containerStatus: 'running',
      containerId: 'container-abc123',
      containerPort: 30000,
    },
    onLaunch: (c) => alert(`Launching: ${c.name}`),
    onStop: (c) => alert(`Stopping: ${c.name}`),
  },
};

export const RunningNoConnectionInfo: Story = {
  args: {
    campaign: {
      ...baseCampaign,
      containerStatus: 'running',
      containerId: 'container-abc123',
      containerPort: 30000,
    },
    onLaunch: (c) => alert(`Launching: ${c.name}`),
    showConnectionInfo: false,
  },
};

export const Error: Story = {
  args: {
    campaign: {
      ...baseCampaign,
      containerStatus: 'error',
    },
    onLaunch: (c) => alert(`Retrying: ${c.name}`),
  },
};

export const WithLastActive: Story = {
  args: {
    campaign: {
      ...baseCampaign,
      lastActiveAt: new Date(Date.now() - 7200000), // 2 hours ago
    },
    onLaunch: (c) => alert(`Launching: ${c.name}`),
  },
};

// Interactive story with state management
function InteractiveLauncher() {
  const [status, setStatus] = useState<ContainerStatus>('stopped');
  const [port, setPort] = useState<number | undefined>(undefined);

  const campaign: FumbleCampaign = {
    ...baseCampaign,
    containerStatus: status,
    containerPort: port,
    containerId: status === 'running' ? 'container-abc123' : undefined,
  };

  function handleLaunch() {
    setStatus('starting');
    setTimeout(() => {
      setStatus('running');
      setPort(30000);
    }, 2000);
  }

  function handleStop() {
    setStatus('stopped');
    setPort(undefined);
  }

  return (
    <VTTLauncher
      campaign={campaign}
      onLaunch={handleLaunch}
      onStop={handleStop}
    />
  );
}

export const Interactive: Story = {
  render: () => <InteractiveLauncher />,
};
