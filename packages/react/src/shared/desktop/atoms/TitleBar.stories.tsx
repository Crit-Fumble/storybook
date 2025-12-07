import type { Meta, StoryObj } from '@storybook/react';
import { TitleBar } from './TitleBar';
import { RpgIcon } from '../../atoms/RpgIcon';

const meta: Meta<typeof TitleBar> = {
  title: 'Shared/Desktop/Atoms/TitleBar',
  component: TitleBar,
  tags: ['autodocs'],
  argTypes: {
    onDoubleClick: { action: 'double-clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof TitleBar>;

export const Default: Story = {
  args: {
    title: 'Window Title',
  },
};

export const WithIcon: Story = {
  args: {
    title: 'Combat Tracker',
    icon: <RpgIcon icon="crossed-swords" />,
  },
};

export const WithLongTitle: Story = {
  args: {
    title: 'This is a very long window title that should truncate gracefully when it exceeds the available space',
    icon: <RpgIcon icon="scroll-unfurled" />,
  },
};

export const ModernTheme: Story = {
  args: {
    title: 'Modern Window',
    icon: <RpgIcon icon="gear" />,
  },
  decorators: [
    (Story) => (
      <div className="theme-modern">
        <Story />
      </div>
    ),
  ],
};

export const FantasyTheme: Story = {
  args: {
    title: 'Fantasy Campaign',
    icon: <RpgIcon icon="tower" />,
  },
  decorators: [
    (Story) => (
      <div className="theme-fantasy">
        <Story />
      </div>
    ),
  ],
};

export const SciFiTheme: Story = {
  args: {
    title: 'Starship Console',
    icon: <RpgIcon icon="perspective-dice-random" />,
  },
  decorators: [
    (Story) => (
      <div className="theme-scifi">
        <Story />
      </div>
    ),
  ],
};

export const CyberpunkTheme: Story = {
  args: {
    title: 'Neural Interface',
    icon: <RpgIcon icon="lightning-helix" />,
  },
  decorators: [
    (Story) => (
      <div className="theme-cyberpunk">
        <Story />
      </div>
    ),
  ],
};

export const HorrorTheme: Story = {
  args: {
    title: 'Cursed Tome',
    icon: <RpgIcon icon="book-skull" />,
  },
  decorators: [
    (Story) => (
      <div className="theme-horror">
        <Story />
      </div>
    ),
  ],
};
