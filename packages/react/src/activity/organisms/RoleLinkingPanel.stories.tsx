import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RoleLinkingPanel } from './RoleLinkingPanel';
import type { DiscordRole } from '../types';

const meta: Meta<typeof RoleLinkingPanel> = {
  title: 'Activity/Organisms/RoleLinkingPanel',
  component: RoleLinkingPanel,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-discord-background-primary min-h-[500px] max-w-2xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RoleLinkingPanel>;

const sampleRoles: DiscordRole[] = [
  { id: '1', name: '@everyone', color: 0, managed: false },
  { id: '2', name: 'Admin', color: 0xe74c3c, managed: false },
  { id: '3', name: 'Game Master', color: 0x9b59b6, managed: false },
  { id: '4', name: 'Player', color: 0x3498db, managed: false },
  { id: '5', name: 'Spectator', color: 0x95a5a6, managed: false },
  { id: '6', name: 'Bot Role', color: 0x2ecc71, managed: true },
];

export const Empty: Story = {
  args: {
    roleMappings: {},
    roles: sampleRoles,
    onChange: () => {},
  },
};

export const WithMappings: Story = {
  args: {
    roleMappings: {
      '2': '4', // Admin -> Game Master
      '3': '3', // Game Master -> Assistant GM
      '4': '1', // Player -> Player
    },
    roles: sampleRoles,
    onChange: () => {},
  },
};

export const SingleMapping: Story = {
  args: {
    roleMappings: {
      '3': '4', // Game Master -> Game Master permission
    },
    roles: sampleRoles,
    onChange: () => {},
  },
};

export const NoRoles: Story = {
  args: {
    roleMappings: {},
    roles: [],
    onChange: () => {},
  },
};

// Interactive story
function InteractiveRoleLinking() {
  const [mappings, setMappings] = useState<Record<string, string>>({
    '3': '4',
    '4': '1',
  });

  return (
    <RoleLinkingPanel
      roleMappings={mappings}
      roles={sampleRoles}
      onChange={setMappings}
    />
  );
}

export const Interactive: Story = {
  render: () => <InteractiveRoleLinking />,
};
