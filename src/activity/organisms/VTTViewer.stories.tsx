import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { VTTViewer } from './VTTViewer';
import type { ContainerStatus } from '../types';

const meta: Meta<typeof VTTViewer> = {
  title: 'Activity/Organisms/VTTViewer',
  component: VTTViewer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="p-4 bg-discord-background-tertiary h-screen">
        <div className="h-full max-w-4xl mx-auto">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof VTTViewer>;

export const Stopped: Story = {
  args: {
    campaignId: 'campaign-123',
    status: 'stopped',
    onLaunch: () => alert('Launching VTT...'),
  },
  decorators: [
    (Story) => (
      <div className="h-[500px]">
        <Story />
      </div>
    ),
  ],
};

export const Starting: Story = {
  args: {
    campaignId: 'campaign-123',
    status: 'starting',
  },
  decorators: [
    (Story) => (
      <div className="h-[500px]">
        <Story />
      </div>
    ),
  ],
};

export const Loading: Story = {
  args: {
    campaignId: 'campaign-123',
    containerPort: 30000,
    status: 'running',
    vttBaseUrl: 'example.com', // Will fail to load but shows loading state
  },
  decorators: [
    (Story) => (
      <div className="h-[500px]">
        <Story />
      </div>
    ),
  ],
};

export const Error: Story = {
  args: {
    campaignId: 'campaign-123',
    status: 'error',
    onLaunch: () => alert('Retrying...'),
  },
  decorators: [
    (Story) => (
      <div className="h-[500px]">
        <Story />
      </div>
    ),
  ],
};

export const RunningNoPort: Story = {
  args: {
    campaignId: 'campaign-123',
    status: 'running',
    // No containerPort - will show error
  },
  decorators: [
    (Story) => (
      <div className="h-[500px]">
        <Story />
      </div>
    ),
  ],
};

// Interactive demo with state transitions
function InteractiveViewer() {
  const [status, setStatus] = useState<ContainerStatus>('stopped');
  const [port, setPort] = useState<number | undefined>(undefined);

  function handleLaunch() {
    setStatus('starting');
    setTimeout(() => {
      setStatus('running');
      setPort(30000);
    }, 2000);
  }

  return (
    <div className="h-[500px]">
      <div className="mb-4 flex gap-2">
        <button
          className="px-3 py-1 bg-discord-primary text-white rounded text-sm"
          onClick={() => { setStatus('stopped'); setPort(undefined); }}
        >
          Set Stopped
        </button>
        <button
          className="px-3 py-1 bg-discord-yellow text-black rounded text-sm"
          onClick={() => setStatus('starting')}
        >
          Set Starting
        </button>
        <button
          className="px-3 py-1 bg-discord-green text-white rounded text-sm"
          onClick={() => { setStatus('running'); setPort(30000); }}
        >
          Set Running
        </button>
        <button
          className="px-3 py-1 bg-discord-red text-white rounded text-sm"
          onClick={() => { setStatus('error'); setPort(undefined); }}
        >
          Set Error
        </button>
      </div>
      <VTTViewer
        campaignId="campaign-123"
        containerPort={port}
        status={status}
        onLaunch={handleLaunch}
        onError={(e) => console.error('VTT Error:', e)}
      />
    </div>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveViewer />,
};
