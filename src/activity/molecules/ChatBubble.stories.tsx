import type { Meta, StoryObj } from '@storybook/react';
import { ChatBubble } from './ChatBubble';

const meta: Meta<typeof ChatBubble> = {
  title: 'Activity/Molecules/ChatBubble',
  component: ChatBubble,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-4 bg-cfg-bg-primary min-h-[200px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChatBubble>;

export const UserMessage: Story = {
  args: {
    content: 'Hello! Can you help me with a rules question?',
    isUser: true,
  },
};

export const AssistantMessage: Story = {
  args: {
    content: 'Of course! I\'d be happy to help. What rules are you wondering about?',
    isUser: false,
  },
};

export const WithAction: Story = {
  args: {
    content: 'Here\'s a suggested paragraph for your wiki page:\n\nThe Fireball spell creates a brilliant flash of flame that detonates with a low roar and deals fire damage to all creatures within its area of effect.',
    isUser: false,
    action: {
      label: '+ Insert into editor',
      onClick: () => alert('Insert clicked!'),
    },
  },
};

export const LongMessage: Story = {
  args: {
    content: 'This is a much longer message that demonstrates how the chat bubble handles text wrapping. It should wrap nicely within the max-width constraint while still maintaining readability and proper formatting. The message can contain multiple sentences and should display properly regardless of length.',
    isUser: false,
  },
};
