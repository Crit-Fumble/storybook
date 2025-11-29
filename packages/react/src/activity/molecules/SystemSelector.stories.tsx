import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SystemSelector, type FoundrySystemInfo } from './SystemSelector';

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

const sampleSystems: FoundrySystemInfo[] = [
  {
    id: 'dnd5e',
    name: 'D&D 5th Edition',
    description: 'The official system for D&D 5th Edition rules in Foundry VTT.',
    version: '3.0.0',
    compatibility: {
      minimum: '11',
      verified: '11',
    },
  },
  {
    id: 'pf2e',
    name: 'Pathfinder 2nd Edition',
    description: 'A complete implementation of the Pathfinder 2nd Edition system.',
    version: '5.4.0',
    compatibility: {
      minimum: '11',
      verified: '11',
    },
  },
  {
    id: 'swade',
    name: 'Savage Worlds Adventure Edition',
    description: 'Fast! Furious! Fun! The official SWADE system for Foundry VTT.',
    version: '2.0.0',
  },
  {
    id: 'coc7',
    name: 'Call of Cthulhu 7th Edition',
    description: 'Horror roleplaying in the worlds of H.P. Lovecraft.',
    version: '0.10.0',
  },
  {
    id: 'wfrp4e',
    name: 'Warhammer Fantasy Roleplay 4th Edition',
    description: 'A grim world of perilous adventure.',
    version: '7.0.0',
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
