import type { Meta, StoryObj } from '@storybook/react';
import { SystemCard } from './SystemCard';

const meta = {
  title: 'Activity/Molecules/SystemCard',
  component: SystemCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSelect: { action: 'selected' },
    onViewDetails: { action: 'viewDetails' },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SystemCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DnD5e: Story = {
  args: {
    systemId: 'dnd5e',
    title: 'D&D 5th Edition',
    description: "The world's greatest roleplaying game. Adventure awaits!",
    version: '3.0.0',
    iconUrl: 'https://foundryvtt.wiki/dnd5e.png',
    compatibility: {
      minimum: '11.0.0',
      verified: '12.0.0',
    },
    authors: [{ name: 'Foundry Gaming LLC' }],
    isEnabled: true,
  },
};

export const PathfinderSecondEdition: Story = {
  args: {
    systemId: 'pf2e',
    title: 'Pathfinder Second Edition',
    description: 'A fantasy tabletop RPG with deep tactical combat and character customization.',
    version: '5.10.0',
    compatibility: {
      minimum: '11.315',
      verified: '12.0.0',
      maximum: '12.999.0',
    },
    authors: [
      { name: 'Foundry PF2e Development Team' },
      { name: 'Paizo Inc.' },
    ],
    isEnabled: true,
  },
};

export const SimpleWorldBuilding: Story = {
  args: {
    systemId: 'worldbuilding',
    title: 'Simple Worldbuilding',
    description: 'A flexible system for creating your own game rules.',
    version: '0.8.0',
    compatibility: {
      verified: '12.0.0',
    },
    authors: [{ name: 'Foundry Gaming LLC' }],
    isEnabled: true,
  },
};

export const Selected: Story = {
  args: {
    systemId: 'dnd5e',
    title: 'D&D 5th Edition',
    version: '3.0.0',
    isEnabled: true,
    isSelected: true,
  },
};

export const Disabled: Story = {
  args: {
    systemId: 'old-system',
    title: 'Legacy System',
    description: 'This system is no longer maintained.',
    version: '1.0.0',
    isEnabled: false,
  },
};

export const WithSelectAction: Story = {
  args: {
    systemId: 'dnd5e',
    title: 'D&D 5th Edition',
    description: 'Click to select this system for your campaign.',
    version: '3.0.0',
    isEnabled: true,
    onSelect: () => console.log('System selected'),
  },
};

export const WithDetailsAction: Story = {
  args: {
    systemId: 'pf2e',
    title: 'Pathfinder Second Edition',
    description: 'Click "View Details" for more information.',
    version: '5.10.0',
    isEnabled: true,
    onViewDetails: () => console.log('View details clicked'),
  },
};

export const NoIcon: Story = {
  args: {
    systemId: 'custom',
    title: 'Custom System',
    description: 'A homebrew system without an icon.',
    version: '1.0.0',
    isEnabled: true,
  },
};

export const NoDescription: Story = {
  args: {
    systemId: 'minimal',
    title: 'Minimal System',
    version: '0.1.0',
    isEnabled: true,
  },
};

export const MultipleAuthors: Story = {
  args: {
    systemId: 'community-system',
    title: 'Community System',
    description: 'Built by the community, for the community.',
    version: '2.5.0',
    authors: [
      { name: 'Alice' },
      { name: 'Bob' },
      { name: 'Charlie' },
    ],
    isEnabled: true,
  },
};

export const SystemGrid: StoryObj<typeof SystemCard> = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[800px]">
      <SystemCard
        systemId="dnd5e"
        title="D&D 5th Edition"
        version="3.0.0"
        isEnabled
        onSelect={() => {}}
      />
      <SystemCard
        systemId="pf2e"
        title="Pathfinder 2e"
        version="5.10.0"
        isEnabled
        isSelected
        onSelect={() => {}}
      />
      <SystemCard
        systemId="swade"
        title="Savage Worlds"
        version="1.2.0"
        isEnabled
        onSelect={() => {}}
      />
      <SystemCard
        systemId="coc7e"
        title="Call of Cthulhu 7e"
        version="0.9.0"
        isEnabled
        onSelect={() => {}}
      />
    </div>
  ),
};
