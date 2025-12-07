import type { Meta, StoryObj } from '@storybook/react';
import { Dock } from './Dock';
import { RpgIcon } from '../../atoms/RpgIcon';

const meta: Meta<typeof Dock> = {
  title: 'Shared/Desktop/Organisms/Dock',
  component: Dock,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Dock>;

const defaultItems = [
  { id: '1', icon: <RpgIcon icon="tower" />, label: 'Campaign', onClick: () => {} },
  { id: '2', icon: <RpgIcon icon="crossed-swords" />, label: 'Combat', onClick: () => {} },
  { id: '3', icon: <RpgIcon icon="player" />, label: 'Players', onClick: () => {}, badge: 3 },
  { id: '4', icon: <RpgIcon icon="scroll-unfurled" />, label: 'Chat', onClick: () => {}, badge: 12 },
  { id: '5', icon: <RpgIcon icon="gears" />, label: 'Settings', onClick: () => {} },
];

export const BottomDock: Story = {
  args: {
    items: defaultItems,
    position: 'bottom',
  },
  decorators: [
    (Story) => (
      <div className="theme-modern desktop-background w-screen h-screen relative">
        <Story />
      </div>
    ),
  ],
};

export const TopDock: Story = {
  args: {
    items: defaultItems,
    position: 'top',
  },
  decorators: [
    (Story) => (
      <div className="theme-modern desktop-background w-screen h-screen relative">
        <Story />
      </div>
    ),
  ],
};

export const LeftDock: Story = {
  args: {
    items: defaultItems,
    position: 'left',
  },
  decorators: [
    (Story) => (
      <div className="theme-modern desktop-background w-screen h-screen relative">
        <Story />
      </div>
    ),
  ],
};

export const RightDock: Story = {
  args: {
    items: defaultItems,
    position: 'right',
  },
  decorators: [
    (Story) => (
      <div className="theme-modern desktop-background w-screen h-screen relative">
        <Story />
      </div>
    ),
  ],
};

export const WithActiveItem: Story = {
  args: {
    items: defaultItems,
    position: 'bottom',
    activeItemId: '2',
  },
  decorators: [
    (Story) => (
      <div className="theme-modern desktop-background w-screen h-screen relative">
        <Story />
      </div>
    ),
  ],
};

export const SmallSize: Story = {
  args: {
    items: defaultItems,
    position: 'bottom',
    size: 'sm',
  },
  decorators: [
    (Story) => (
      <div className="theme-modern desktop-background w-screen h-screen relative">
        <Story />
      </div>
    ),
  ],
};

export const LargeSize: Story = {
  args: {
    items: defaultItems,
    position: 'bottom',
    size: 'lg',
  },
  decorators: [
    (Story) => (
      <div className="theme-modern desktop-background w-screen h-screen relative">
        <Story />
      </div>
    ),
  ],
};
