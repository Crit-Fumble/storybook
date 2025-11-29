import type { Meta, StoryObj } from '@storybook/react';
import { GuildCard } from './GuildCard';
import type { Guild } from '@crit-fumble/core/types';

const meta: Meta<typeof GuildCard> = {
  title: 'FumbleBot/Users/GuildCard',
  component: GuildCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-discord-background-primary max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GuildCard>;

const sampleGuild: Guild = {
  id: '123456789012345678',
  name: "Adventurer's Guild",
  icon: null,
  owner: false,
  permissions: '0',
};

const guildWithIcon: Guild = {
  id: '987654321098765432',
  name: 'Dragons & Dungeons',
  icon: 'abc123def456',
  owner: false,
  permissions: '0',
};

const ownerGuild: Guild = {
  id: '111222333444555666',
  name: 'My Personal Server',
  icon: null,
  owner: true,
  permissions: '8',
};

export const Default: Story = {
  args: {
    guild: sampleGuild,
  },
};

export const WithIcon: Story = {
  args: {
    guild: guildWithIcon,
  },
};

export const Owner: Story = {
  args: {
    guild: ownerGuild,
  },
};

export const Small: Story = {
  args: {
    guild: sampleGuild,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    guild: ownerGuild,
    size: 'lg',
  },
};

export const Clickable: Story = {
  args: {
    guild: sampleGuild,
    onClick: () => alert('Guild clicked'),
  },
};

export const Selected: Story = {
  args: {
    guild: sampleGuild,
    isSelected: true,
  },
};

export const HideOwnerBadge: Story = {
  args: {
    guild: ownerGuild,
    showOwnerBadge: false,
  },
};
