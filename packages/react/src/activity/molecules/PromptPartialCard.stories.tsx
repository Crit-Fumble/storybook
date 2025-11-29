import type { Meta, StoryObj } from '@storybook/react';
import { PromptPartialCard } from './PromptPartialCard';
import type { PromptPartial } from './PromptPartialCard';

const meta: Meta<typeof PromptPartialCard> = {
  title: 'FumbleBot/Admin/PromptPartialCard',
  component: PromptPartialCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-discord-background-primary max-w-lg">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PromptPartialCard>;

const samplePartial: PromptPartial = {
  id: '1',
  name: 'Fantasy RPG Style',
  targetType: 'channel',
  targetId: '123456789',
  targetName: 'general-chat',
  content: 'You are a helpful fantasy game master. Respond in a dramatic, story-telling manner befitting a medieval fantasy setting.',
  priority: 10,
  isEnabled: true,
  createdAt: new Date('2024-03-01'),
  updatedAt: new Date('2024-03-15'),
};

export const Default: Story = {
  args: {
    partial: samplePartial,
    onClick: () => alert('Card clicked'),
    onToggleEnabled: (enabled) => alert(`Toggled to: ${enabled}`),
    onDelete: () => alert('Delete clicked'),
  },
};

export const ChannelType: Story = {
  args: {
    partial: { ...samplePartial, targetType: 'channel' },
  },
};

export const CategoryType: Story = {
  args: {
    partial: {
      ...samplePartial,
      id: '2',
      name: 'Sci-Fi Category',
      targetType: 'category',
      targetName: 'Sci-Fi Games',
      content: 'You are an AI assistant in a futuristic setting.',
    },
  },
};

export const ThreadType: Story = {
  args: {
    partial: {
      ...samplePartial,
      id: '3',
      name: 'Story Thread',
      targetType: 'thread',
      targetName: 'Campaign Discussion',
      content: 'Maintain context from the ongoing story thread.',
    },
  },
};

export const RoleType: Story = {
  args: {
    partial: {
      ...samplePartial,
      id: '4',
      name: 'DM Instructions',
      targetType: 'role',
      targetName: 'Dungeon Master',
      content: 'Provide additional DM-specific guidance and rules.',
    },
  },
};

export const Disabled: Story = {
  args: {
    partial: { ...samplePartial, isEnabled: false },
  },
};

export const Selected: Story = {
  args: {
    partial: samplePartial,
    isSelected: true,
  },
};

export const LongContent: Story = {
  args: {
    partial: {
      ...samplePartial,
      content: 'You are an incredibly detailed and thorough game master who always provides rich descriptions of environments, characters, and situations. When players ask questions, you should provide comprehensive answers that help them understand the world they are exploring. Always maintain consistency with previous story elements and encourage creative problem-solving.',
    },
  },
};
