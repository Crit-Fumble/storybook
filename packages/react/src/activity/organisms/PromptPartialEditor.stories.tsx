import type { Meta, StoryObj } from '@storybook/react';
import { PromptPartialEditor } from './PromptPartialEditor';
import type { TargetOption } from './PromptPartialEditor';

const meta: Meta<typeof PromptPartialEditor> = {
  title: 'FumbleBot/Admin/PromptPartialEditor',
  component: PromptPartialEditor,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-discord-background-primary max-w-xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PromptPartialEditor>;

const sampleChannels: TargetOption[] = [
  { id: 'ch-1', name: 'general' },
  { id: 'ch-2', name: 'game-room' },
  { id: 'ch-3', name: 'dice-rolling' },
  { id: 'ch-4', name: 'campaign-chat' },
];

const sampleCategories: TargetOption[] = [
  { id: 'cat-1', name: 'Gaming' },
  { id: 'cat-2', name: 'Campaigns' },
  { id: 'cat-3', name: 'Off-Topic' },
];

const sampleRoles: TargetOption[] = [
  { id: 'role-1', name: 'Dungeon Master' },
  { id: 'role-2', name: 'Player' },
  { id: 'role-3', name: 'Moderator' },
];

export const NewPartial: Story = {
  args: {
    channels: sampleChannels,
    categories: sampleCategories,
    roles: sampleRoles,
    onSave: (data) => alert(`Saving: ${JSON.stringify(data, null, 2)}`),
    onCancel: () => alert('Cancelled'),
  },
};

export const EditExisting: Story = {
  args: {
    partial: {
      id: '1',
      name: 'Fantasy RPG Style',
      targetType: 'channel',
      targetId: 'ch-2',
      targetName: 'game-room',
      content: 'You are a helpful fantasy game master.',
      priority: 10,
      isEnabled: true,
    },
    channels: sampleChannels,
    categories: sampleCategories,
    roles: sampleRoles,
    onSave: (data) => alert(`Updating: ${JSON.stringify(data, null, 2)}`),
    onCancel: () => alert('Cancelled'),
  },
};

export const Saving: Story = {
  args: {
    partial: {
      name: 'Test Partial',
      targetType: 'channel',
      targetId: 'ch-1',
      content: 'Test content',
      priority: 5,
      isEnabled: true,
    },
    channels: sampleChannels,
    categories: sampleCategories,
    roles: sampleRoles,
    onSave: () => {},
    onCancel: () => {},
    isSaving: true,
  },
};

export const RoleTarget: Story = {
  args: {
    partial: {
      name: 'DM Instructions',
      targetType: 'role',
      targetId: 'role-1',
      content: 'Provide DM-specific guidance.',
      priority: 20,
      isEnabled: true,
    },
    channels: sampleChannels,
    categories: sampleCategories,
    roles: sampleRoles,
    onSave: () => {},
    onCancel: () => {},
  },
};
