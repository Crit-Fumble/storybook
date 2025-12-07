import type { Meta, StoryObj } from '@storybook/react';
import { DockItem } from './DockItem';
import { RpgIcon } from '../../atoms/RpgIcon';

const meta: Meta<typeof DockItem> = {
  title: 'Shared/Desktop/Atoms/DockItem',
  component: DockItem,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    isActive: { control: 'boolean' },
    badge: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof DockItem>;

export const Default: Story = {
  args: {
    icon: <RpgIcon icon="tower" />,
    label: 'Campaign',
  },
};

export const Active: Story = {
  args: {
    icon: <RpgIcon icon="crossed-swords" />,
    label: 'Combat',
    isActive: true,
  },
};

export const WithBadge: Story = {
  args: {
    icon: <RpgIcon icon="scroll-unfurled" />,
    label: 'Messages',
    badge: 5,
  },
};

export const WithLargeBadge: Story = {
  args: {
    icon: <RpgIcon icon="player" />,
    label: 'Notifications',
    badge: 127,
  },
};

export const ActiveWithBadge: Story = {
  args: {
    icon: <RpgIcon icon="d20" />,
    label: 'Dice Rolls',
    isActive: true,
    badge: 3,
  },
};

export const MultipleDockItems: Story = {
  render: () => (
    <div className="flex gap-2 p-4 desktop-dock">
      <DockItem icon={<RpgIcon icon="tower" />} label="Campaign" />
      <DockItem icon={<RpgIcon icon="crossed-swords" />} label="Combat" isActive />
      <DockItem icon={<RpgIcon icon="player" />} label="Characters" badge={2} />
      <DockItem icon={<RpgIcon icon="scroll-unfurled" />} label="Chat" badge={12} />
      <DockItem icon={<RpgIcon icon="gear" />} label="Settings" />
    </div>
  ),
};

export const ModernTheme: Story = {
  args: {
    icon: <RpgIcon icon="d20" />,
    label: 'Dice',
    badge: 3,
  },
  decorators: [
    (Story) => (
      <div className="theme-modern p-4 desktop-dock">
        <Story />
      </div>
    ),
  ],
};

export const FantasyTheme: Story = {
  args: {
    icon: <RpgIcon icon="anvil" />,
    label: 'Forge',
    isActive: true,
  },
  decorators: [
    (Story) => (
      <div className="theme-fantasy p-4 desktop-dock">
        <Story />
      </div>
    ),
  ],
};

export const SciFiTheme: Story = {
  args: {
    icon: <RpgIcon icon="lightning-helix" />,
    label: 'Power',
    badge: 1,
  },
  decorators: [
    (Story) => (
      <div className="theme-scifi p-4 desktop-dock">
        <Story />
      </div>
    ),
  ],
};

export const CyberpunkTheme: Story = {
  args: {
    icon: <RpgIcon icon="perspective-dice-random" />,
    label: 'Net',
    isActive: true,
  },
  decorators: [
    (Story) => (
      <div className="theme-cyberpunk p-4 desktop-dock">
        <Story />
      </div>
    ),
  ],
};

export const HorrorTheme: Story = {
  args: {
    icon: <RpgIcon icon="skull" />,
    label: 'Crypt',
  },
  decorators: [
    (Story) => (
      <div className="theme-horror p-4 desktop-dock">
        <Story />
      </div>
    ),
  ],
};
