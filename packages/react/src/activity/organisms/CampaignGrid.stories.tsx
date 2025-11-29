import type { Meta, StoryObj } from '@storybook/react';
import { CampaignGrid } from './CampaignGrid';
import type { Campaign } from '../types';

const meta: Meta<typeof CampaignGrid> = {
  title: 'FumbleBot/Campaigns/CampaignGrid',
  component: CampaignGrid,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-discord-background-primary min-h-[600px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CampaignGrid>;

const sampleCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Curse of Strahd',
    systemId: 'dnd5e',
    systemTitle: 'D&D 5th Edition',
    description: 'A gothic horror campaign set in the cursed land of Barovia.',
    guildId: 'guild-123',
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-03-20'),
  },
  {
    id: '2',
    name: 'Edge of the Empire',
    systemId: 'swrpg',
    systemTitle: 'Star Wars RPG',
    description: 'Smugglers and scoundrels in the Outer Rim.',
    guildId: 'guild-123',
    status: 'active',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-03-18'),
  },
  {
    id: '3',
    name: 'Call of Cthulhu',
    systemId: 'coc7e',
    systemTitle: 'Call of Cthulhu 7e',
    description: 'Investigators uncover cosmic horrors in 1920s New England.',
    guildId: 'guild-123',
    status: 'paused',
    createdAt: new Date('2023-11-05'),
    updatedAt: new Date('2024-01-15'),
  },
];

export const WithCampaigns: Story = {
  args: {
    campaigns: sampleCampaigns,
    onCampaignClick: (campaign) => alert(`Clicked: ${campaign.name}`),
    onLaunch: (campaign) => alert(`Launch: ${campaign.name}`),
    onCreateClick: () => alert('Create new campaign'),
  },
};

export const Empty: Story = {
  args: {
    campaigns: [],
    onCampaignClick: () => {},
    onLaunch: () => {},
    onCreateClick: () => alert('Create new campaign'),
  },
};

export const Loading: Story = {
  args: {
    campaigns: [],
    onCampaignClick: () => {},
    onLaunch: () => {},
    onCreateClick: () => {},
    isLoading: true,
  },
};

export const SingleCampaign: Story = {
  args: {
    campaigns: [sampleCampaigns[0]],
    onCampaignClick: () => {},
    onLaunch: () => {},
    onCreateClick: () => alert('Create new campaign'),
  },
};

export const ManyCampaigns: Story = {
  args: {
    campaigns: [
      ...sampleCampaigns,
      {
        id: '4',
        name: 'Blades in the Dark',
        systemId: 'bitd',
        systemTitle: 'Blades in the Dark',
        description: 'Daring scoundrels in a haunted Victorian city.',
        guildId: 'guild-123',
        status: 'active',
        createdAt: new Date('2024-03-01'),
        updatedAt: new Date('2024-03-20'),
      },
      {
        id: '5',
        name: 'Pathfinder 2e',
        systemId: 'pf2e',
        systemTitle: 'Pathfinder 2nd Edition',
        description: 'High fantasy adventure in the Age of Lost Omens.',
        guildId: 'guild-123',
        status: 'active',
        createdAt: new Date('2024-03-05'),
        updatedAt: new Date('2024-03-19'),
      },
    ],
    onCampaignClick: () => {},
    onLaunch: () => {},
    onCreateClick: () => {},
  },
};
