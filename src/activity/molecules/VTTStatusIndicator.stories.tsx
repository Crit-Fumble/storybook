import type { Meta, StoryObj } from '@storybook/react';
import { VTTStatusIndicator } from './VTTStatusIndicator';

const meta: Meta<typeof VTTStatusIndicator> = {
  title: 'Activity/Molecules/VTTStatusIndicator',
  component: VTTStatusIndicator,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['stopped', 'starting', 'running', 'error'],
    },
    showLabel: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof VTTStatusIndicator>;

export const Stopped: Story = {
  args: {
    status: 'stopped',
  },
};

export const StoppedWithLastActive: Story = {
  args: {
    status: 'stopped',
    lastActiveAt: new Date(Date.now() - 3600000), // 1 hour ago
  },
};

export const Starting: Story = {
  args: {
    status: 'starting',
  },
};

export const Running: Story = {
  args: {
    status: 'running',
  },
};

export const Error: Story = {
  args: {
    status: 'error',
  },
};

export const NoLabel: Story = {
  args: {
    status: 'running',
    showLabel: false,
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="space-y-3">
      <VTTStatusIndicator status="stopped" lastActiveAt={new Date(Date.now() - 86400000)} />
      <VTTStatusIndicator status="starting" />
      <VTTStatusIndicator status="running" />
      <VTTStatusIndicator status="error" />
    </div>
  ),
};
