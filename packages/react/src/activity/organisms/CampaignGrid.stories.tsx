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

// Helper to create a Campaign with core type fields
function createCampaign(overrides: Partial<Campaign> & { id: string; name: string }): Campaign {
  return {
    guildId: 'guild-123',
    description: null,
    status: 'active',
    foundrySystemId: null,
    systemTitle: null,
    worldAnvilWorldId: null,
    worldAnvilWorldName: null,
    worldAnvilWorldUrl: null,
    worldAnvilNotebookId: null,
    members: {},
    roleMappings: {},
    containerId: null,
    containerPort: null,
    containerStatus: 'stopped',
    lastActiveAt: null,
    createdBy: 'user-123',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-03-20'),
    ...overrides,
  };
}

const sampleCampaigns: Campaign[] = [
  createCampaign({
    id: '1',
    name: 'Curse of Strahd',
    foundrySystemId: 'dnd5e',
    systemTitle: 'D&D 5th Edition',
    description: 'A gothic horror campaign set in the cursed land of Barovia.',
  }),
  createCampaign({
    id: '2',
    name: 'Edge of the Empire',
    foundrySystemId: 'swrpg',
    systemTitle: 'Star Wars RPG',
    description: 'Smugglers and scoundrels in the Outer Rim.',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-03-18'),
  }),
  createCampaign({
    id: '3',
    name: 'Call of Cthulhu',
    foundrySystemId: 'coc7e',
    systemTitle: 'Call of Cthulhu 7e',
    description: 'Investigators uncover cosmic horrors in 1920s New England.',
    status: 'paused',
    createdAt: new Date('2023-11-05'),
    updatedAt: new Date('2024-01-15'),
  }),
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
      createCampaign({
        id: '4',
        name: 'Blades in the Dark',
        foundrySystemId: 'bitd',
        systemTitle: 'Blades in the Dark',
        description: 'Daring scoundrels in a haunted Victorian city.',
        createdAt: new Date('2024-03-01'),
        updatedAt: new Date('2024-03-20'),
      }),
      createCampaign({
        id: '5',
        name: 'Pathfinder 2e',
        foundrySystemId: 'pf2e',
        systemTitle: 'Pathfinder 2nd Edition',
        description: 'High fantasy adventure in the Age of Lost Omens.',
        createdAt: new Date('2024-03-05'),
        updatedAt: new Date('2024-03-19'),
      }),
    ],
    onCampaignClick: () => {},
    onLaunch: () => {},
    onCreateClick: () => {},
  },
};
