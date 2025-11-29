import type { Meta, StoryObj } from '@storybook/react';
import { ContainerStatusCard } from './ContainerStatusCard';

const meta: Meta<typeof ContainerStatusCard> = {
  title: 'Activity/Molecules/ContainerStatusCard',
  component: ContainerStatusCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-cfg-background-primary max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ContainerStatusCard>;

export const Stopped: Story = {
  args: {
    status: 'stopped',
    campaignName: 'Dragon Quest',
    onStart: () => alert('Starting container...'),
  },
};

export const Starting: Story = {
  args: {
    status: 'starting',
    campaignName: 'Dragon Quest',
  },
};

export const Running: Story = {
  args: {
    status: 'running',
    campaignName: 'Dragon Quest',
    containerId: 'abc123def456789xyz',
    containerPort: 30001,
    lastActiveAt: new Date(Date.now() - 5 * 60 * 1000),
    onStop: () => alert('Stopping container...'),
    onRestart: () => alert('Restarting container...'),
  },
};

export const Error: Story = {
  args: {
    status: 'error',
    campaignName: 'Dragon Quest',
    lastActiveAt: new Date(Date.now() - 30 * 60 * 1000),
    onStart: () => alert('Retrying...'),
  },
};

export const Loading: Story = {
  args: {
    status: 'stopped',
    campaignName: 'Dragon Quest',
    onStart: () => {},
    isLoading: true,
  },
};

export const NoDetails: Story = {
  args: {
    status: 'stopped',
    onStart: () => alert('Starting...'),
  },
};

export const RunningWithAllDetails: Story = {
  args: {
    status: 'running',
    campaignName: 'Curse of Strahd',
    containerId: 'f47ac10b58cc4372a5670e02b2c3d479',
    containerPort: 30042,
    lastActiveAt: new Date(),
    onStop: () => alert('Stop'),
    onRestart: () => alert('Restart'),
  },
};
