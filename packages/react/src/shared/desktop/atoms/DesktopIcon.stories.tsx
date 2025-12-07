import type { Meta, StoryObj } from '@storybook/react';
import { DesktopIcon } from './DesktopIcon';
import { RpgIcon } from '../../atoms/RpgIcon';

const meta: Meta<typeof DesktopIcon> = {
  title: 'Shared/Desktop/Atoms/DesktopIcon',
  component: DesktopIcon,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    onDoubleClick: { action: 'double-clicked' },
    isSelected: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof DesktopIcon>;

export const Default: Story = {
  args: {
    icon: <RpgIcon icon="tower" size="2x" />,
    label: 'Campaign',
  },
};

export const Selected: Story = {
  args: {
    icon: <RpgIcon icon="crossed-swords" size="2x" />,
    label: 'Combat',
    isSelected: true,
  },
};

export const LongLabel: Story = {
  args: {
    icon: <RpgIcon icon="scroll-unfurled" size="2x" />,
    label: 'Very Long Campaign Name',
  },
};

export const MultipleIcons: Story = {
  render: () => (
    <div className="flex gap-4">
      <DesktopIcon icon={<RpgIcon icon="tower" size="2x" />} label="Campaign" />
      <DesktopIcon icon={<RpgIcon icon="player" size="2x" />} label="Characters" isSelected />
      <DesktopIcon icon={<RpgIcon icon="gears" size="2x" />} label="Settings" />
      <DesktopIcon icon={<RpgIcon icon="broken-skull" size="2x" />} label="Monsters" />
    </div>
  ),
};

export const ModernTheme: Story = {
  args: {
    icon: <RpgIcon icon="perspective-dice-random" size="2x" />,
    label: 'Dice Roller',
  },
  decorators: [
    (Story) => (
      <div className="theme-modern p-8 bg-cfg-background-primary">
        <Story />
      </div>
    ),
  ],
};

export const FantasyTheme: Story = {
  args: {
    icon: <RpgIcon icon="anvil" size="2x" />,
    label: 'Blacksmith',
  },
  decorators: [
    (Story) => (
      <div className="theme-fantasy p-8" style={{ background: '#1a0f0a' }}>
        <Story />
      </div>
    ),
  ],
};

export const SciFiTheme: Story = {
  args: {
    icon: <RpgIcon icon="lightning-bolt" size="2x" />,
    label: 'Power Core',
  },
  decorators: [
    (Story) => (
      <div className="theme-scifi p-8" style={{ background: '#050a14' }}>
        <Story />
      </div>
    ),
  ],
};

export const CyberpunkTheme: Story = {
  args: {
    icon: <RpgIcon icon="perspective-dice-random" size="2x" />,
    label: 'Net Runner',
  },
  decorators: [
    (Story) => (
      <div className="theme-cyberpunk p-8" style={{ background: '#0d0221' }}>
        <Story />
      </div>
    ),
  ],
};

export const HorrorTheme: Story = {
  args: {
    icon: <RpgIcon icon="skull" size="2x" />,
    label: 'Crypt',
  },
  decorators: [
    (Story) => (
      <div className="theme-horror p-8" style={{ background: '#0a0a0a' }}>
        <Story />
      </div>
    ),
  ],
};
