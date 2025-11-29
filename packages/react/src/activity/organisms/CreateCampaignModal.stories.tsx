import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CreateCampaignModal } from './CreateCampaignModal';
import type { FoundrySystemRecord } from '../types';

const meta: Meta<typeof CreateCampaignModal> = {
  title: 'FumbleBot/Campaigns/CreateCampaignModal',
  component: CreateCampaignModal,
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
type Story = StoryObj<typeof CreateCampaignModal>;

// Helper to create FoundrySystemRecord with required fields
function createSystem(systemId: string, title: string, version?: string): FoundrySystemRecord {
  return {
    id: systemId,
    systemId,
    title,
    description: null,
    version: version ?? null,
    manifestUrl: `https://example.com/${systemId}/system.json`,
    compatibility: null,
    authors: null,
    iconUrl: null,
    isEnabled: true,
    sortOrder: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

const sampleSystems: FoundrySystemRecord[] = [
  createSystem('dnd5e', 'D&D 5th Edition', '3.0.0'),
  createSystem('pf2e', 'Pathfinder 2nd Edition', '5.2.1'),
  createSystem('coc7e', 'Call of Cthulhu 7th Edition', '0.9.0'),
  createSystem('swade', 'Savage Worlds Adventure Edition'),
  createSystem('wfrp4e', 'Warhammer Fantasy 4th Edition', '6.0.0'),
];

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => alert('Close modal'),
    onSubmit: (name, systemId, description) => {
      alert(`Creating: ${name} (${systemId}) - ${description || 'No description'}`);
    },
    systems: sampleSystems,
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    onSubmit: () => {},
    systems: sampleSystems,
  },
};

export const Submitting: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onSubmit: () => {},
    systems: sampleSystems,
    isSubmitting: true,
  },
};

export const NoSystems: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onSubmit: () => {},
    systems: [],
  },
};

// Interactive story with toggle
function InteractiveCreateModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (name: string, _systemId: string, _description: string) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsOpen(false);
      alert(`Created campaign: ${name}`);
    }, 1500);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-discord-primary text-white rounded hover:bg-discord-primary-hover"
      >
        Open Create Campaign Modal
      </button>
      <CreateCampaignModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        systems={sampleSystems}
        isSubmitting={isSubmitting}
      />
    </>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveCreateModal />,
};
