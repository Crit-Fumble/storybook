import type { Meta, StoryObj } from '@storybook/react';
import { CampaignCard, CreateCampaignCard } from './CampaignCard';
import type { Campaign } from '../types';

const meta: Meta<typeof CampaignCard> = {
  title: 'FumbleBot/Campaigns/CampaignCard',
  component: CampaignCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-discord-background-primary max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CampaignCard>;

const sampleCampaign: Campaign = {
  id: '1',
  guildId: 'guild-123',
  name: 'Curse of Strahd',
  description: 'A gothic horror campaign set in the cursed land of Barovia, where the vampire lord Strahd von Zarovich holds dominion.',
  status: 'active',
  foundrySystemId: 'dnd5e',
  systemTitle: 'D&D 5th Edition',
  members: {},
  roleMappings: {},
  containerId: null,
  containerPort: null,
  containerStatus: 'stopped',
  lastActiveAt: null,
  createdBy: 'user-123',
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-03-20'),
};

export const Active: Story = {
  args: {
    campaign: sampleCampaign,
    onClick: () => alert('Card clicked'),
    onLaunch: () => alert('Launch clicked'),
  },
};

export const Paused: Story = {
  args: {
    campaign: {
      ...sampleCampaign,
      status: 'paused',
      name: 'Tomb of Annihilation',
      description: 'An expedition into the jungles of Chult to find the Soulmonger.',
    },
    onClick: () => {},
    onLaunch: () => {},
  },
};

export const Completed: Story = {
  args: {
    campaign: {
      ...sampleCampaign,
      status: 'completed',
      name: 'Lost Mine of Phandelver',
      description: 'A starter adventure that concluded with the party saving Phandalin.',
    },
    onClick: () => {},
    onLaunch: () => {},
  },
};

export const NoDescription: Story = {
  args: {
    campaign: {
      ...sampleCampaign,
      name: 'New Campaign',
      description: null,
    },
    onClick: () => {},
    onLaunch: () => {},
  },
};

export const LongDescription: Story = {
  args: {
    campaign: {
      ...sampleCampaign,
      description: 'This is a very long description that should be truncated after a certain number of lines. The campaign takes place in a vast world filled with magic, mystery, and adventure. Players will explore ancient ruins, battle fearsome monsters, and uncover long-forgotten secrets.',
    },
    onClick: () => {},
    onLaunch: () => {},
  },
};

// CreateCampaignCard story
export const CreateCard: StoryObj<typeof CreateCampaignCard> = {
  render: () => (
    <div className="p-6 bg-discord-background-primary max-w-sm">
      <CreateCampaignCard onClick={() => alert('Create clicked')} />
    </div>
  ),
};
