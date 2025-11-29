import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SystemSelector } from './SystemSelector';
import type { FoundrySystemRecord } from '../types';

const meta: Meta<typeof SystemSelector> = {
  title: 'Activity/Molecules/SystemSelector',
  component: SystemSelector,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-4 bg-discord-background-primary min-h-[300px] w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SystemSelector>;

const sampleSystems: FoundrySystemRecord[] = [
  {
    id: '1',
    systemId: 'dnd5e',
    title: 'D&D 5th Edition',
    description: 'The official system for D&D 5th Edition rules in Foundry VTT.',
    version: '3.0.0',
    manifestUrl: 'https://example.com/dnd5e/system.json',
    compatibility: { minimum: '11', verified: '11' },
    authors: null,
    iconUrl: null,
    isEnabled: true,
    sortOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    systemId: 'pf2e',
    title: 'Pathfinder 2nd Edition',
    description: 'A complete implementation of the Pathfinder 2nd Edition system.',
    version: '5.4.0',
    manifestUrl: 'https://example.com/pf2e/system.json',
    compatibility: { minimum: '11', verified: '11' },
    authors: null,
    iconUrl: null,
    isEnabled: true,
    sortOrder: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    systemId: 'swade',
    title: 'Savage Worlds Adventure Edition',
    description: 'Fast! Furious! Fun! The official SWADE system for Foundry VTT.',
    version: '2.0.0',
    manifestUrl: 'https://example.com/swade/system.json',
    compatibility: null,
    authors: null,
    iconUrl: null,
    isEnabled: true,
    sortOrder: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    systemId: 'coc7',
    title: 'Call of Cthulhu 7th Edition',
    description: 'Horror roleplaying in the worlds of H.P. Lovecraft.',
    version: '0.10.0',
    manifestUrl: 'https://example.com/coc7/system.json',
    compatibility: null,
    authors: null,
    iconUrl: null,
    isEnabled: true,
    sortOrder: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    systemId: 'wfrp4e',
    title: 'Warhammer Fantasy Roleplay 4th Edition',
    description: 'A grim world of perilous adventure.',
    version: '7.0.0',
    manifestUrl: 'https://example.com/wfrp4e/system.json',
    compatibility: null,
    authors: null,
    iconUrl: null,
    isEnabled: true,
    sortOrder: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

function SystemSelectorWrapper(props: React.ComponentProps<typeof SystemSelector>) {
  const [value, setValue] = useState(props.value);
  return <SystemSelector {...props} value={value} onChange={setValue} />;
}

export const Default: Story = {
  render: (args) => <SystemSelectorWrapper {...args} />,
  args: {
    systems: sampleSystems,
    value: '',
  },
};

export const WithSelection: Story = {
  render: (args) => <SystemSelectorWrapper {...args} />,
  args: {
    systems: sampleSystems,
    value: 'dnd5e',
  },
};

export const WithDescription: Story = {
  render: (args) => <SystemSelectorWrapper {...args} />,
  args: {
    systems: sampleSystems,
    value: 'pf2e',
    showDescription: true,
  },
};

export const NotSearchable: Story = {
  render: (args) => <SystemSelectorWrapper {...args} />,
  args: {
    systems: sampleSystems,
    value: '',
    searchable: false,
  },
};

export const Disabled: Story = {
  render: (args) => <SystemSelectorWrapper {...args} />,
  args: {
    systems: sampleSystems,
    value: 'dnd5e',
    disabled: true,
  },
};

export const CustomPlaceholder: Story = {
  render: (args) => <SystemSelectorWrapper {...args} />,
  args: {
    systems: sampleSystems,
    value: '',
    placeholder: 'Choose your adventure...',
  },
};
