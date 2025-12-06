
import { render, screen, fireEvent } from '@testing-library/react';
import { CampaignGrid } from './CampaignGrid';
import type { Campaign } from '../types';

const createCampaign = (id: string, name: string, overrides: Partial<Campaign> = {}): Campaign => ({
  id,
  guildId: 'guild-1',
  ownerId: 'user-1',
  name,
  description: `Description for ${name}`,
  systemId: 'dnd5e',
  systemTitle: 'D&D 5e',
  status: 'active',
  worldId: 'world-1',
  channelId: null,
  voiceChannelId: null,
  activeSessionId: null,
  worldAnvilWorldId: null,
  worldAnvilWorldName: null,
  worldAnvilWorldUrl: null,
  worldAnvilNotebookId: null,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-15'),
  ...overrides,
});

const campaigns = [
  createCampaign('c-1', 'Dragon Quest'),
  createCampaign('c-2', 'Sword Coast Adventure'),
  createCampaign('c-3', 'Curse of Strahd'),
];

describe('CampaignGrid', () => {
  describe('Loading state', () => {
    it('shows loading skeletons when loading', () => {
      render(
        <CampaignGrid
          campaigns={[]}
          isLoading={true}
          onCreateClick={() => {}}
        />
      );

      expect(screen.getByTestId('campaign-grid')).toBeInTheDocument();
      // Should show 3 loading skeletons
      const grid = screen.getByTestId('campaign-grid');
      const skeletons = grid.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBe(3);
    });
  });

  describe('Empty state', () => {
    it('shows empty state when no campaigns', () => {
      const handleCreate = jest.fn();
      render(
        <CampaignGrid
          campaigns={[]}
          onCreateClick={handleCreate}
        />
      );

      expect(screen.getByTestId('campaign-grid-empty')).toBeInTheDocument();
      expect(screen.getByText('No campaigns yet')).toBeInTheDocument();
    });

    it('shows create action in empty state', () => {
      const handleCreate = jest.fn();
      render(
        <CampaignGrid
          campaigns={[]}
          onCreateClick={handleCreate}
        />
      );

      const createBtn = screen.getByText('Create Campaign');
      fireEvent.click(createBtn);
      expect(handleCreate).toHaveBeenCalledTimes(1);
    });
  });

  describe('With campaigns', () => {
    it('renders campaign cards', () => {
      render(
        <CampaignGrid
          campaigns={campaigns}
          onCreateClick={() => {}}
        />
      );

      expect(screen.getByText('Dragon Quest')).toBeInTheDocument();
      expect(screen.getByText('Sword Coast Adventure')).toBeInTheDocument();
      expect(screen.getByText('Curse of Strahd')).toBeInTheDocument();
    });

    it('renders create campaign card', () => {
      render(
        <CampaignGrid
          campaigns={campaigns}
          onCreateClick={() => {}}
        />
      );

      expect(screen.getByTestId('campaign-grid-create-card')).toBeInTheDocument();
    });

    it('calls onCampaignClick when campaign card is clicked', () => {
      const handleClick = jest.fn();
      render(
        <CampaignGrid
          campaigns={campaigns}
          onCampaignClick={handleClick}
          onCreateClick={() => {}}
        />
      );

      fireEvent.click(screen.getByTestId('campaign-grid-campaign-c-1'));
      expect(handleClick).toHaveBeenCalledWith(campaigns[0]);
    });

    it('calls onLaunch when launch button is clicked', () => {
      const handleLaunch = jest.fn();
      render(
        <CampaignGrid
          campaigns={campaigns}
          onLaunch={handleLaunch}
          onCreateClick={() => {}}
        />
      );

      fireEvent.click(screen.getByTestId('campaign-grid-campaign-c-2-launch-btn'));
      expect(handleLaunch).toHaveBeenCalledWith(campaigns[1]);
    });

    it('calls onCreateClick when create card is clicked', () => {
      const handleCreate = jest.fn();
      render(
        <CampaignGrid
          campaigns={campaigns}
          onCreateClick={handleCreate}
        />
      );

      fireEvent.click(screen.getByTestId('campaign-grid-create-card'));
      expect(handleCreate).toHaveBeenCalledTimes(1);
    });
  });

  describe('TestId', () => {
    it('uses default testId', () => {
      render(
        <CampaignGrid
          campaigns={campaigns}
          onCreateClick={() => {}}
        />
      );

      expect(screen.getByTestId('campaign-grid')).toBeInTheDocument();
    });

    it('uses custom testId', () => {
      render(
        <CampaignGrid
          campaigns={campaigns}
          onCreateClick={() => {}}
          testId="my-grid"
        />
      );

      expect(screen.getByTestId('my-grid')).toBeInTheDocument();
      expect(screen.getByTestId('my-grid-campaign-c-1')).toBeInTheDocument();
      expect(screen.getByTestId('my-grid-create-card')).toBeInTheDocument();
    });
  });
});
