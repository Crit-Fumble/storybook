import type { Meta, StoryObj } from '@storybook/react';
import { Window } from './Window';
import { RpgIcon } from '../../atoms/RpgIcon';

const meta: Meta<typeof Window> = {
  title: 'Shared/Desktop/Molecules/Window',
  component: Window,
  tags: ['autodocs'],
  argTypes: {
    onMinimize: { action: 'minimize' },
    onMaximize: { action: 'maximize' },
    onClose: { action: 'close' },
    onFocus: { action: 'focus' },
    isMinimized: { control: 'boolean' },
    isMaximized: { control: 'boolean' },
    isFocused: { control: 'boolean' },
    resizable: { control: 'boolean' },
    draggable: { control: 'boolean' },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Window>;

export const Default: Story = {
  args: {
    id: 'window-1',
    title: 'Window Title',
    children: <div>Window content goes here</div>,
  },
  decorators: [
    (Story) => (
      <div className="theme-modern desktop-background w-screen h-screen relative">
        <Story />
      </div>
    ),
  ],
};

export const WithIcon: Story = {
  args: {
    id: 'window-2',
    title: 'Combat Tracker',
    icon: <RpgIcon icon="crossed-swords" />,
    children: (
      <div>
        <h3 className="text-cfg-text-normal font-semibold mb-4">Initiative Order</h3>
        <ul className="space-y-2 text-cfg-text-normal">
          <li>1. Goblin Warrior - AC 15, HP 12/12</li>
          <li>2. Elf Ranger - AC 16, HP 24/24</li>
          <li>3. Dwarf Fighter - AC 18, HP 32/32</li>
        </ul>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="theme-modern desktop-background w-screen h-screen relative">
        <Story />
      </div>
    ),
  ],
};

export const Focused: Story = {
  args: {
    id: 'window-3',
    title: 'Focused Window',
    icon: <RpgIcon icon="tower" />,
    isFocused: true,
    children: <div className="text-cfg-text-normal">This window is focused</div>,
  },
  decorators: [
    (Story) => (
      <div className="theme-modern desktop-background w-screen h-screen relative">
        <Story />
      </div>
    ),
  ],
};

export const Maximized: Story = {
  args: {
    id: 'window-4',
    title: 'Maximized Window',
    icon: <RpgIcon icon="scroll-unfurled" />,
    isMaximized: true,
    children: (
      <div className="text-cfg-text-normal">
        <h2 className="text-xl font-semibold mb-4">Campaign Notes</h2>
        <p>This window takes up the full screen when maximized.</p>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="theme-modern desktop-background w-screen h-screen relative">
        <Story />
      </div>
    ),
  ],
};

export const NonResizable: Story = {
  args: {
    id: 'window-5',
    title: 'Fixed Size Window',
    resizable: false,
    children: <div className="text-cfg-text-normal">This window cannot be resized</div>,
  },
  decorators: [
    (Story) => (
      <div className="theme-modern desktop-background w-screen h-screen relative">
        <Story />
      </div>
    ),
  ],
};

export const NonDraggable: Story = {
  args: {
    id: 'window-6',
    title: 'Fixed Position Window',
    draggable: false,
    children: <div className="text-cfg-text-normal">This window cannot be dragged</div>,
  },
  decorators: [
    (Story) => (
      <div className="theme-modern desktop-background w-screen h-screen relative">
        <Story />
      </div>
    ),
  ],
};

export const MultipleWindows: Story = {
  render: () => (
    <div className="theme-modern desktop-background w-screen h-screen relative">
      <Window
        id="window-7"
        title="Window 1"
        icon={<RpgIcon icon="tower" />}
        defaultPosition={{ x: 50, y: 50 }}
        defaultSize={{ width: 400, height: 300 }}
      >
        <div className="text-cfg-text-normal">First window</div>
      </Window>
      <Window
        id="window-8"
        title="Window 2"
        icon={<RpgIcon icon="player" />}
        defaultPosition={{ x: 200, y: 150 }}
        defaultSize={{ width: 400, height: 300 }}
        isFocused
      >
        <div className="text-cfg-text-normal">Second window (focused)</div>
      </Window>
      <Window
        id="window-9"
        title="Window 3"
        icon={<RpgIcon icon="gears" />}
        defaultPosition={{ x: 350, y: 250 }}
        defaultSize={{ width: 400, height: 300 }}
      >
        <div className="text-cfg-text-normal">Third window</div>
      </Window>
    </div>
  ),
};

// Theme examples
export const FantasyTheme: Story = {
  args: {
    id: 'window-fantasy',
    title: 'Fantasy Campaign',
    icon: <RpgIcon icon="anvil" />,
    theme: 'fantasy',
    children: (
      <div className="text-cfg-text-normal">
        <h3 className="font-semibold mb-2">The Cursed Forge</h3>
        <p>A dark fantasy adventure set in ancient ruins...</p>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="theme-fantasy w-screen h-screen relative" style={{ background: '#1a0f0a' }}>
        <Story />
      </div>
    ),
  ],
};

export const SciFiTheme: Story = {
  args: {
    id: 'window-scifi',
    title: 'Starship Console',
    icon: <RpgIcon icon="lightning-bolt" />,
    theme: 'sci-fi',
    children: (
      <div className="text-cfg-text-normal">
        <h3 className="font-semibold mb-2">Navigation Systems</h3>
        <p>Coordinates locked. Engage hyperdrive on your mark.</p>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="theme-scifi w-screen h-screen relative" style={{ background: '#050a14' }}>
        <Story />
      </div>
    ),
  ],
};

export const CyberpunkTheme: Story = {
  args: {
    id: 'window-cyberpunk',
    title: 'Neural Interface',
    icon: <RpgIcon icon="perspective-dice-random" />,
    theme: 'cyberpunk',
    children: (
      <div className="text-cfg-text-normal">
        <h3 className="font-semibold mb-2">Net Running Protocol</h3>
        <p>Jacking into the matrix...</p>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="theme-cyberpunk w-screen h-screen relative" style={{ background: '#0d0221' }}>
        <Story />
      </div>
    ),
  ],
};

export const HorrorTheme: Story = {
  args: {
    id: 'window-horror',
    title: 'Cursed Tome',
    icon: <RpgIcon icon="broken-skull" />,
    theme: 'horror',
    children: (
      <div className="text-cfg-text-normal">
        <h3 className="font-semibold mb-2">Ancient Ritual</h3>
        <p>The words seem to writhe on the page...</p>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="theme-horror w-screen h-screen relative" style={{ background: '#0a0a0a' }}>
        <Story />
      </div>
    ),
  ],
};
