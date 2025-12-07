import type { Meta, StoryObj } from '@storybook/react';
import { Desktop } from './Desktop';
import { Window } from '../molecules/Window';
import { RpgIcon } from '../../atoms/RpgIcon';

const meta: Meta<typeof Desktop> = {
  title: 'Shared/Desktop/Organisms/Desktop',
  component: Desktop,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Desktop>;

export const EmptyDesktop: Story = {
  args: {},
};

export const WithIcons: Story = {
  args: {
    icons: [
      {
        id: 'campaign',
        icon: <RpgIcon icon="tower" size="2x" />,
        label: 'Campaign',
        onOpen: () => alert('Opening Campaign'),
      },
      {
        id: 'characters',
        icon: <RpgIcon icon="player" size="2x" />,
        label: 'Characters',
        onOpen: () => alert('Opening Characters'),
      },
      {
        id: 'settings',
        icon: <RpgIcon icon="gear" size="2x" />,
        label: 'Settings',
        onOpen: () => alert('Opening Settings'),
      },
    ],
  },
};

export const WithDock: Story = {
  args: {
    showDock: true,
    icons: [
      {
        id: 'campaign',
        icon: <RpgIcon icon="tower" />,
        label: 'Campaign',
        onOpen: () => {},
      },
      {
        id: 'combat',
        icon: <RpgIcon icon="crossed-swords" />,
        label: 'Combat',
        onOpen: () => {},
      },
      {
        id: 'players',
        icon: <RpgIcon icon="player" />,
        label: 'Players',
        onOpen: () => {},
      },
    ],
  },
};

export const WithWindows: Story = {
  render: () => (
    <Desktop>
      <Window
        id="window-1"
        title="Campaign Manager"
        icon={<RpgIcon icon="tower" />}
        defaultPosition={{ x: 50, y: 50 }}
        defaultSize={{ width: 500, height: 400 }}
      >
        <div className="text-cfg-text-normal">
          <h3 className="font-semibold mb-2">Active Campaign</h3>
          <p>The Lost Mines of Phandelver</p>
        </div>
      </Window>
      <Window
        id="window-2"
        title="Combat Tracker"
        icon={<RpgIcon icon="crossed-swords" />}
        defaultPosition={{ x: 200, y: 150 }}
        defaultSize={{ width: 400, height: 350 }}
        isFocused
      >
        <div className="text-cfg-text-normal">
          <h3 className="font-semibold mb-2">Initiative Order</h3>
          <ul className="space-y-1">
            <li>1. Goblin - AC 15</li>
            <li>2. Fighter - AC 18</li>
            <li>3. Wizard - AC 12</li>
          </ul>
        </div>
      </Window>
    </Desktop>
  ),
};

export const FullDesktopEnvironment: Story = {
  render: () => (
    <Desktop
      showDock
      dockPosition="bottom"
      icons={[
        {
          id: 'campaign',
          icon: <RpgIcon icon="tower" />,
          label: 'Campaign',
          onOpen: () => {},
        },
        {
          id: 'combat',
          icon: <RpgIcon icon="crossed-swords" />,
          label: 'Combat',
          onOpen: () => {},
        },
        {
          id: 'chat',
          icon: <RpgIcon icon="scroll-unfurled" />,
          label: 'Chat',
          onOpen: () => {},
        },
      ]}
    >
      <Window
        id="main-window"
        title="Admin Dashboard"
        icon={<RpgIcon icon="gear" />}
        defaultPosition={{ x: 100, y: 80 }}
        defaultSize={{ width: 600, height: 450 }}
        isFocused
      >
        <div className="text-cfg-text-normal space-y-4">
          <h2 className="text-xl font-semibold">Welcome to FumbleBot Admin</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-cfg-background-secondary rounded border border-cfg-border">
              <div className="text-sm text-cfg-text-muted">Active Campaigns</div>
              <div className="text-2xl font-bold">12</div>
            </div>
            <div className="p-4 bg-cfg-background-secondary rounded border border-cfg-border">
              <div className="text-sm text-cfg-text-muted">Total Players</div>
              <div className="text-2xl font-bold">48</div>
            </div>
          </div>
        </div>
      </Window>
    </Desktop>
  ),
};

export const FantasyTheme: Story = {
  args: {
    theme: 'fantasy',
    showDock: true,
    icons: [
      {
        id: 'forge',
        icon: <RpgIcon icon="anvil" />,
        label: 'Forge',
        onOpen: () => {},
      },
    ],
  },
};

export const SciFiTheme: Story = {
  args: {
    theme: 'sci-fi',
    showDock: true,
    icons: [
      {
        id: 'power',
        icon: <RpgIcon icon="lightning-helix" />,
        label: 'Power',
        onOpen: () => {},
      },
    ],
  },
};

export const CyberpunkTheme: Story = {
  args: {
    theme: 'cyberpunk',
    showDock: true,
    icons: [
      {
        id: 'net',
        icon: <RpgIcon icon="perspective-dice-random" />,
        label: 'Net',
        onOpen: () => {},
      },
    ],
  },
};

export const HorrorTheme: Story = {
  args: {
    theme: 'horror',
    showDock: true,
    icons: [
      {
        id: 'crypt',
        icon: <RpgIcon icon="skull" />,
        label: 'Crypt',
        onOpen: () => {},
      },
    ],
  },
};
