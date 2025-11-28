import type { Meta, StoryObj } from '@storybook/react';
import { StatusDot } from './StatusDot';

const meta: Meta<typeof StatusDot> = {
  title: 'Activity/Atoms/StatusDot',
  component: StatusDot,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['active', 'stopped', 'error', 'warning', 'loading'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusDot>;

export const Active: Story = {
  args: {
    status: 'active',
  },
};

export const Stopped: Story = {
  args: {
    status: 'stopped',
  },
};

export const Error: Story = {
  args: {
    status: 'error',
  },
};

export const Warning: Story = {
  args: {
    status: 'warning',
  },
};

export const Loading: Story = {
  args: {
    status: 'loading',
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <StatusDot status="active" />
        <span className="text-discord-text-normal text-sm">Active</span>
      </div>
      <div className="flex items-center gap-2">
        <StatusDot status="stopped" />
        <span className="text-discord-text-normal text-sm">Stopped</span>
      </div>
      <div className="flex items-center gap-2">
        <StatusDot status="error" />
        <span className="text-discord-text-normal text-sm">Error</span>
      </div>
      <div className="flex items-center gap-2">
        <StatusDot status="warning" />
        <span className="text-discord-text-normal text-sm">Warning</span>
      </div>
      <div className="flex items-center gap-2">
        <StatusDot status="loading" />
        <span className="text-discord-text-normal text-sm">Loading</span>
      </div>
    </div>
  ),
};
