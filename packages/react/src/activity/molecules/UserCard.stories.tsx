import type { Meta, StoryObj } from '@storybook/react';
import { UserCard } from './UserCard';
import type { DiscordUser } from '@crit-fumble/core/types';

const meta: Meta<typeof UserCard> = {
  title: 'FumbleBot/Users/UserCard',
  component: UserCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-discord-background-primary">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof UserCard>;

const sampleUser: DiscordUser = {
  id: '123456789012345678',
  username: 'dungeonmaster',
  discriminator: '0',
  avatar: null,
  global_name: 'Dungeon Master',
};

const userWithAvatar: DiscordUser = {
  id: '987654321098765432',
  username: 'critroller',
  discriminator: '0',
  avatar: 'abc123def456',
  global_name: 'Critical Roller',
};

const legacyUser: DiscordUser = {
  id: '111222333444555666',
  username: 'oldschool',
  discriminator: '1234',
  avatar: null,
  global_name: null,
};

export const Default: Story = {
  args: {
    user: sampleUser,
  },
};

export const WithAvatar: Story = {
  args: {
    user: userWithAvatar,
  },
};

export const LegacyDiscriminator: Story = {
  args: {
    user: legacyUser,
  },
};

export const Small: Story = {
  args: {
    user: sampleUser,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    user: sampleUser,
    size: 'lg',
  },
};

export const Clickable: Story = {
  args: {
    user: sampleUser,
    onClick: () => alert('User clicked'),
  },
};

export const HideUsername: Story = {
  args: {
    user: sampleUser,
    showUsername: false,
  },
};
