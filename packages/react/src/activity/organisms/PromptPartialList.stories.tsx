import type { Meta, StoryObj } from '@storybook/react';
import { PromptPartialList } from './PromptPartialList';
import type { PromptPartial } from '../molecules/PromptPartialCard';

const meta: Meta<typeof PromptPartialList> = {
  title: 'FumbleBot/Admin/PromptPartialList',
  component: PromptPartialList,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-discord-background-primary min-h-[600px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PromptPartialList>;

const samplePartials: PromptPartial[] = [
  {
    id: '1',
    name: 'Fantasy RPG Style',
    targetType: 'channel',
    targetId: 'ch-1',
    targetName: 'game-room',
    content: 'You are a helpful fantasy game master.',
    priority: 10,
    isEnabled: true,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-15'),
  },
  {
    id: '2',
    name: 'Dice Channel Rules',
    targetType: 'channel',
    targetId: 'ch-2',
    targetName: 'dice-rolling',
    content: 'Focus on dice mechanics and probability.',
    priority: 5,
    isEnabled: true,
    createdAt: new Date('2024-03-02'),
    updatedAt: new Date('2024-03-14'),
  },
  {
    id: '3',
    name: 'Gaming Category Prompt',
    targetType: 'category',
    targetId: 'cat-1',
    targetName: 'Gaming',
    content: 'General gaming assistant behavior.',
    priority: 1,
    isEnabled: true,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-03-10'),
  },
  {
    id: '4',
    name: 'DM Instructions',
    targetType: 'role',
    targetId: 'role-1',
    targetName: 'Dungeon Master',
    content: 'Provide DM-specific guidance and rules.',
    priority: 20,
    isEnabled: true,
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-16'),
  },
  {
    id: '5',
    name: 'Disabled Test',
    targetType: 'thread',
    targetId: 'th-1',
    targetName: 'Campaign Discussion',
    content: 'This partial is currently disabled.',
    priority: 3,
    isEnabled: false,
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-12'),
  },
];

export const Default: Story = {
  args: {
    partials: samplePartials,
    onSelect: (partial) => alert(`Selected: ${partial.name}`),
    onToggleEnabled: (partial, enabled) =>
      alert(`${partial.name} enabled: ${enabled}`),
    onDelete: (partial) => alert(`Delete: ${partial.name}`),
    onCreate: () => alert('Create new partial'),
  },
};

export const Empty: Story = {
  args: {
    partials: [],
    onCreate: () => alert('Create new partial'),
  },
};

export const Loading: Story = {
  args: {
    partials: [],
    isLoading: true,
  },
};

export const FilteredByChannel: Story = {
  args: {
    partials: samplePartials,
    filterType: 'channel',
    onSelect: () => {},
  },
};

export const FilteredByRole: Story = {
  args: {
    partials: samplePartials,
    filterType: 'role',
    onSelect: () => {},
  },
};

export const WithSelection: Story = {
  args: {
    partials: samplePartials,
    selectedId: '2',
    onSelect: () => {},
  },
};

export const ReadOnly: Story = {
  args: {
    partials: samplePartials,
  },
};
