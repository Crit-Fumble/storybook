import type { Meta, StoryObj } from '@storybook/react';
import { FumbleBotChat } from './FumbleBotChat';

const meta: Meta<typeof FumbleBotChat> = {
  title: 'Web/Organisms/FumbleBotChat',
  component: FumbleBotChat,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="relative min-h-[700px] bg-cfg-bg-primary p-8">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold text-cfg-text-normal mb-4">Sample Page Content</h1>
          <p className="text-cfg-text-muted mb-4">
            This demonstrates the FumbleBotChat widget as it would appear on the main website.
            Click the chat button in the bottom right corner to open the chat panel.
          </p>
          <p className="text-cfg-text-muted">
            The chat widget only appears when a user is logged in. If no user prop is passed,
            the component returns null.
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FumbleBotChat>;

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'DungeonMaster42',
      image: null,
    },
    apiEndpoint: '/api/fumblebot/chat',
  },
};

export const WithAvatar: Story = {
  args: {
    user: {
      name: 'PlayerOne',
      image: 'https://cdn.discordapp.com/embed/avatars/0.png',
    },
    apiEndpoint: '/api/fumblebot/chat',
  },
};

export const NotLoggedIn: Story = {
  args: {
    user: null,
    apiEndpoint: '/api/fumblebot/chat',
  },
  parameters: {
    docs: {
      description: {
        story: 'When no user is provided, the chat widget is not rendered.',
      },
    },
  },
};

// Note: The chat functionality requires an API endpoint to work.
// In Storybook, you can open the chat but sending messages will
// likely fail unless you have a mock server running.
