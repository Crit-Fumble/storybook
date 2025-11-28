import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TabNav } from './TabNav';

const meta: Meta<typeof TabNav> = {
  title: 'Shared/Molecules/TabNav',
  component: TabNav,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'pills'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TabNav>;

const sampleTabs = [
  { id: 'general', label: 'General' },
  { id: 'players', label: 'Players' },
  { id: 'settings', label: 'Settings' },
];

export const Default: Story = {
  args: {
    tabs: sampleTabs,
    activeTab: 'general',
    onChange: () => {},
  },
};

export const Pills: Story = {
  args: {
    tabs: sampleTabs,
    activeTab: 'general',
    onChange: () => {},
    variant: 'pills',
  },
};

export const WithIcons: Story = {
  args: {
    tabs: [
      { id: 'dice', label: 'Dice', icon: '🎲' },
      { id: 'campaign', label: 'Campaign', icon: '🏰' },
      { id: 'settings', label: 'Settings', icon: '⚙️' },
    ],
    activeTab: 'dice',
    onChange: () => {},
  },
};

export const Interactive: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('general');
    return (
      <div>
        <TabNav
          tabs={sampleTabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
        <div className="mt-4 p-4 bg-cfg-background-secondary rounded">
          <p className="text-cfg-text-normal">
            Active tab: <strong>{activeTab}</strong>
          </p>
        </div>
      </div>
    );
  },
};

export const PillsInteractive: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('general');
    return (
      <div>
        <TabNav
          tabs={sampleTabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="pills"
        />
        <div className="mt-4 p-4 bg-cfg-background-secondary rounded">
          <p className="text-cfg-text-normal">
            Active tab: <strong>{activeTab}</strong>
          </p>
        </div>
      </div>
    );
  },
};
