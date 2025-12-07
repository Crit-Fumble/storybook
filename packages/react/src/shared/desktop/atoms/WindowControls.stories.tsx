import type { Meta, StoryObj } from '@storybook/react';
import { WindowControls } from './WindowControls';

const meta: Meta<typeof WindowControls> = {
  title: 'Shared/Desktop/Atoms/WindowControls',
  component: WindowControls,
  tags: ['autodocs'],
  argTypes: {
    onMinimize: { action: 'minimize' },
    onMaximize: { action: 'maximize' },
    onClose: { action: 'close' },
    isMaximized: { control: 'boolean' },
    showMinimize: { control: 'boolean' },
    showMaximize: { control: 'boolean' },
    showClose: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof WindowControls>;

export const Default: Story = {
  args: {},
};

export const MaximizedState: Story = {
  args: {
    isMaximized: true,
  },
};

export const MinimizeOnly: Story = {
  args: {
    showMaximize: false,
    showClose: false,
  },
};

export const CloseOnly: Story = {
  args: {
    showMinimize: false,
    showMaximize: false,
  },
};

export const NoMinimize: Story = {
  args: {
    showMinimize: false,
  },
};

// Theme examples
export const ModernTheme: Story = {
  decorators: [
    (Story) => (
      <div className="theme-modern p-4 bg-cfg-background-primary rounded">
        <Story />
      </div>
    ),
  ],
};

export const FantasyTheme: Story = {
  decorators: [
    (Story) => (
      <div className="theme-fantasy p-4" style={{ background: '#1a0f0a' }}>
        <Story />
      </div>
    ),
  ],
};

export const SciFiTheme: Story = {
  decorators: [
    (Story) => (
      <div className="theme-scifi p-4" style={{ background: '#050a14' }}>
        <Story />
      </div>
    ),
  ],
};

export const CyberpunkTheme: Story = {
  decorators: [
    (Story) => (
      <div className="theme-cyberpunk p-4" style={{ background: '#0d0221' }}>
        <Story />
      </div>
    ),
  ],
};

export const HorrorTheme: Story = {
  decorators: [
    (Story) => (
      <div className="theme-horror p-4" style={{ background: '#0a0a0a' }}>
        <Story />
      </div>
    ),
  ],
};
