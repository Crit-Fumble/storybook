import type { Meta, StoryObj } from '@storybook/react';
import { ChatPanel } from './ChatPanel';

const meta: Meta<typeof ChatPanel> = {
  title: 'Activity/Organisms/ChatPanel',
  component: ChatPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="relative min-h-[500px] bg-discord-background-primary">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChatPanel>;

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => alert('Close panel'),
    userId: 'user-123',
    username: 'PlayerOne',
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    userId: 'user-123',
    username: 'PlayerOne',
  },
};

// Note: The ChatPanel component fetches messages from an API,
// so in Storybook it will show the empty state or loading state
// depending on network conditions.
