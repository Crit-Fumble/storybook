import type { Meta, StoryObj } from '@storybook/react';
import { WindowManager } from './WindowManager';
import { RpgIcon } from '../../atoms/RpgIcon';

const meta: Meta<typeof WindowManager> = {
  title: 'Shared/Desktop/Organisms/WindowManager',
  component: WindowManager,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof WindowManager>;

export const SingleWindow: Story = {
  args: {
    windows: [
      {
        id: 'window-1',
        title: 'Campaign Manager',
        icon: <RpgIcon icon="tower" />,
        content: (
          <div className="text-cfg-text-normal">
            <h3 className="font-semibold mb-2">Active Campaign</h3>
            <p>The Lost Mines of Phandelver</p>
          </div>
        ),
        defaultPosition: { x: 100, y: 100 },
        defaultSize: { width: 500, height: 400 },
      },
    ],
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
  args: {
    windows: [
      {
        id: 'window-1',
        title: 'Campaign Manager',
        icon: <RpgIcon icon="tower" />,
        content: (
          <div className="text-cfg-text-normal">
            <h3 className="font-semibold mb-2">Active Campaign</h3>
            <p>The Lost Mines of Phandelver</p>
          </div>
        ),
        defaultPosition: { x: 50, y: 50 },
        defaultSize: { width: 450, height: 350 },
      },
      {
        id: 'window-2',
        title: 'Combat Tracker',
        icon: <RpgIcon icon="crossed-swords" />,
        content: (
          <div className="text-cfg-text-normal">
            <h3 className="font-semibold mb-2">Initiative Order</h3>
            <ul className="space-y-1">
              <li>1. Goblin - AC 15</li>
              <li>2. Fighter - AC 18</li>
              <li>3. Wizard - AC 12</li>
            </ul>
          </div>
        ),
        defaultPosition: { x: 200, y: 150 },
        defaultSize: { width: 400, height: 300 },
      },
      {
        id: 'window-3',
        title: 'Player Characters',
        icon: <RpgIcon icon="player" />,
        content: (
          <div className="text-cfg-text-normal">
            <h3 className="font-semibold mb-2">Party Members</h3>
            <ul className="space-y-2">
              <li>Aragorn - Level 5 Ranger</li>
              <li>Gandalf - Level 10 Wizard</li>
              <li>Gimli - Level 5 Fighter</li>
            </ul>
          </div>
        ),
        defaultPosition: { x: 350, y: 250 },
        defaultSize: { width: 400, height: 300 },
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="theme-modern desktop-background w-screen h-screen relative">
        <Story />
      </div>
    ),
  ],
};

export const AdminPanelExample: Story = {
  args: {
    windows: [
      {
        id: 'dashboard',
        title: 'Admin Dashboard',
        icon: <RpgIcon icon="gear" />,
        content: (
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
        ),
        defaultPosition: { x: 100, y: 80 },
        defaultSize: { width: 600, height: 450 },
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="theme-modern desktop-background w-screen h-screen relative">
        <Story />
      </div>
    ),
  ],
};
