import type { Meta, StoryObj } from '@storybook/react';
import { ChatButton } from './ChatButton';

const meta: Meta<typeof ChatButton> = {
  title: 'Activity/Molecules/ChatButton',
  component: ChatButton,
  tags: ['autodocs'],
  argTypes: {
    hasUnread: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChatButton>;

export const Default: Story = {
  args: {
    onClick: () => alert('Chat opened!'),
  },
};

export const WithUnread: Story = {
  args: {
    onClick: () => alert('Chat opened!'),
    hasUnread: true,
  },
};

export const InContext: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4 bg-discord-background-secondary rounded">
      <span className="text-discord-text-normal">Campaign Chat</span>
      <ChatButton onClick={() => alert('Chat opened!')} />
    </div>
  ),
};

export const WithUnreadInContext: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4 bg-discord-background-secondary rounded">
      <span className="text-discord-text-normal">Campaign Chat</span>
      <ChatButton onClick={() => alert('Chat opened!')} hasUnread />
    </div>
  ),
};
