import type { Meta, StoryObj } from '@storybook/react';
import { WorldAnvilLinkCard } from './WorldAnvilLinkCard';

const meta: Meta<typeof WorldAnvilLinkCard> = {
  title: 'Activity/Molecules/WorldAnvilLinkCard',
  component: WorldAnvilLinkCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-cfg-background-primary max-w-md">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WorldAnvilLinkCard>;

export const Unlinked: Story = {
  args: {
    worldId: null,
    worldName: null,
    worldUrl: null,
    notebookId: null,
    onLink: () => alert('Link clicked'),
  },
};

export const Linking: Story = {
  args: {
    worldId: null,
    worldName: null,
    worldUrl: null,
    notebookId: null,
    onLink: () => {},
    isLinking: true,
  },
};

export const LinkedWithNotebook: Story = {
  args: {
    worldId: 'world-123',
    worldName: 'Barovia - Curse of Strahd',
    worldUrl: 'https://www.worldanvil.com/w/barovia',
    notebookId: 'notebook-456',
    onOpenWorld: () => window.open('https://www.worldanvil.com/w/barovia', '_blank'),
    onUnlink: () => alert('Unlink clicked'),
  },
};

export const LinkedWithoutNotebook: Story = {
  args: {
    worldId: 'world-789',
    worldName: 'The Forgotten Realms',
    worldUrl: 'https://www.worldanvil.com/w/forgotten-realms',
    notebookId: null,
    onOpenWorld: () => window.open('https://www.worldanvil.com/w/forgotten-realms', '_blank'),
    onUnlink: () => alert('Unlink clicked'),
  },
};

export const LinkedMinimal: Story = {
  args: {
    worldId: 'world-abc',
    worldName: null,
    worldUrl: null,
    notebookId: null,
    onUnlink: () => alert('Unlink clicked'),
  },
};
