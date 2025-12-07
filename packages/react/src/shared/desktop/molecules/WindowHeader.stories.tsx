import type { Meta, StoryObj } from '@storybook/react';
import { WindowHeader } from './WindowHeader';
import { RpgIcon } from '../../atoms/RpgIcon';

const meta: Meta<typeof WindowHeader> = {
  title: 'Shared/Desktop/Molecules/WindowHeader',
  component: WindowHeader,
  tags: ['autodocs'],
  argTypes: {
    onMinimize: { action: 'minimize' },
    onMaximize: { action: 'maximize' },
    onClose: { action: 'close' },
    onDoubleClick: { action: 'double-clicked' },
    isMaximized: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof WindowHeader>;

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

export const Maximized: Story = {
  args: {
    title: 'Maximized Window',
    icon: <RpgIcon icon="tower" />,
    isMaximized: true,
  },
};

export const LongTitle: Story = {
  args: {
    title: 'This is a very long window title that should truncate properly when it runs out of space',
    icon: <RpgIcon icon="scroll-unfurled" />,
  },
};

export const NoMinimize: Story = {
  args: {
    title: 'Dialog Window',
    showMinimize: false,
  },
};

export const OnlyClose: Story = {
  args: {
    title: 'Alert',
    showMinimize: false,
    showMaximize: false,
  },
};

// Theme examples
export const ModernTheme: Story = {
  args: {
    title: 'Admin Dashboard',
    icon: <RpgIcon icon="gears" />,
  },
  decorators: [
    (Story) => (
      <div className="theme-modern">
        <div className="desktop-window w-full">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const FantasyTheme: Story = {
  args: {
    title: 'Campaign Manager',
    icon: <RpgIcon icon="tower" />,
  },
  decorators: [
    (Story) => (
      <div className="theme-fantasy">
        <div className="desktop-window w-full">
          <Story />
        </div>
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
        <div className="desktop-window w-full">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const CyberpunkTheme: Story = {
  args: {
    title: 'Neural Interface',
    icon: <RpgIcon icon="lightning-bolt" />,
  },
  decorators: [
    (Story) => (
      <div className="theme-cyberpunk">
        <div className="desktop-window w-full">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const HorrorTheme: Story = {
  args: {
    title: 'Cursed Tome',
    icon: <RpgIcon icon="broken-skull" />,
  },
  decorators: [
    (Story) => (
      <div className="theme-horror">
        <div className="desktop-window w-full">
          <Story />
        </div>
      </div>
    ),
  ],
};
