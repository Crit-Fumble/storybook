import type { Meta, StoryObj } from '@storybook/react';
import { StatusIndicator } from './StatusIndicator';

const meta: Meta<typeof StatusIndicator> = {
  title: 'Activity/Molecules/StatusIndicator',
  component: StatusIndicator,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['active', 'stopped', 'error', 'warning', 'loading'],
    },
    showLabel: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusIndicator>;

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

export const CustomLabel: Story = {
  args: {
    status: 'active',
    label: 'Bot Online',
  },
};

export const NoLabel: Story = {
  args: {
    status: 'active',
    showLabel: false,
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="space-y-3">
      <StatusIndicator status="active" />
      <StatusIndicator status="stopped" />
      <StatusIndicator status="error" />
      <StatusIndicator status="warning" />
      <StatusIndicator status="loading" />
    </div>
  ),
};
