import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CampaignCard, CreateCampaignCard } from './CampaignCard';
import type { Campaign } from '../types';

const createCampaign = (overrides: Partial<Campaign> = {}): Campaign => ({
  id: 'campaign-1',
  guildId: 'guild-1',
  ownerId: 'user-1',
  name: 'Test Campaign',
  description: 'A test campaign description',
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

describe('CampaignCard', () => {
  describe('Rendering', () => {
    it('renders campaign name', () => {
      render(<CampaignCard campaign={createCampaign()} />);
      expect(screen.getByText('Test Campaign')).toBeInTheDocument();
    });

    it('renders campaign description', () => {
      render(<CampaignCard campaign={createCampaign()} />);
      expect(screen.getByText('A test campaign description')).toBeInTheDocument();
    });

    it('shows "No description" when description is missing', () => {
      render(<CampaignCard campaign={createCampaign({ description: null })} />);
      expect(screen.getByText('No description')).toBeInTheDocument();
    });

    it('renders system title when provided', () => {
      render(<CampaignCard campaign={createCampaign()} />);
      expect(screen.getByTestId('campaign-card-campaign-1-system')).toHaveTextContent('D&D 5e');
    });

    it('does not render system badge when systemTitle is missing', () => {
      render(<CampaignCard campaign={createCampaign({ systemTitle: null })} />);
      expect(screen.queryByTestId('campaign-card-campaign-1-system')).not.toBeInTheDocument();
    });
  });

  describe('Status indicator', () => {
    it('shows active status for active campaign', () => {
      render(<CampaignCard campaign={createCampaign({ status: 'active' })} />);
      expect(screen.getByTestId('campaign-card-campaign-1-status')).toBeInTheDocument();
    });

    it('shows stopped status for paused campaign', () => {
      render(<CampaignCard campaign={createCampaign({ status: 'paused' })} />);
      expect(screen.getByTestId('campaign-card-campaign-1-status')).toBeInTheDocument();
    });

    it('shows stopped status for completed campaign', () => {
      render(<CampaignCard campaign={createCampaign({ status: 'completed' })} />);
      expect(screen.getByTestId('campaign-card-campaign-1-status')).toBeInTheDocument();
    });

    it('shows stopped status for archived campaign', () => {
      render(<CampaignCard campaign={createCampaign({ status: 'archived' })} />);
      expect(screen.getByTestId('campaign-card-campaign-1-status')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onClick when card is clicked', () => {
      const handleClick = vi.fn();
      render(<CampaignCard campaign={createCampaign()} onClick={handleClick} />);

      fireEvent.click(screen.getByTestId('campaign-card-campaign-1'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onLaunch when Launch button is clicked', () => {
      const handleLaunch = vi.fn();
      render(<CampaignCard campaign={createCampaign()} onLaunch={handleLaunch} />);

      fireEvent.click(screen.getByTestId('campaign-card-campaign-1-launch-btn'));
      expect(handleLaunch).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when Launch button is clicked', () => {
      const handleClick = vi.fn();
      const handleLaunch = vi.fn();
      render(
        <CampaignCard
          campaign={createCampaign()}
          onClick={handleClick}
          onLaunch={handleLaunch}
        />
      );

      fireEvent.click(screen.getByTestId('campaign-card-campaign-1-launch-btn'));
      expect(handleLaunch).toHaveBeenCalledTimes(1);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('TestId', () => {
    it('uses default testId based on campaign id', () => {
      render(<CampaignCard campaign={createCampaign()} />);
      expect(screen.getByTestId('campaign-card-campaign-1')).toBeInTheDocument();
    });

    it('uses custom testId when provided', () => {
      render(<CampaignCard campaign={createCampaign()} testId="custom-card" />);
      expect(screen.getByTestId('custom-card')).toBeInTheDocument();
      expect(screen.getByTestId('custom-card-name')).toHaveTextContent('Test Campaign');
    });
  });
});

describe('CreateCampaignCard', () => {
  it('renders create campaign card', () => {
    render(<CreateCampaignCard onClick={() => {}} />);
    expect(screen.getByTestId('create-campaign-card')).toBeInTheDocument();
  });

  it('shows plus icon', () => {
    render(<CreateCampaignCard onClick={() => {}} />);
    expect(screen.getByTestId('create-campaign-card-icon')).toHaveTextContent('+');
  });

  it('shows create label', () => {
    render(<CreateCampaignCard onClick={() => {}} />);
    expect(screen.getByTestId('create-campaign-card-label')).toHaveTextContent('Create Campaign');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<CreateCampaignCard onClick={handleClick} />);

    fireEvent.click(screen.getByTestId('create-campaign-card'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('uses custom testId when provided', () => {
    render(<CreateCampaignCard onClick={() => {}} testId="custom-create" />);
    expect(screen.getByTestId('custom-create')).toBeInTheDocument();
  });
});
