import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AdminDashboardPage } from './AdminDashboardPage';
import { createMockCampaign, createMockFoundrySystem, createMockCampaigns, createMockFoundrySystems } from '../../test/mocks/fixtures';

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('AdminDashboardPage', () => {
  const defaultProps = {
    username: 'TestUser',
    userId: 'user-123',
    guildId: 'guild-123',
  };

  beforeEach(() => {
    mockFetch.mockClear();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ systems: [], campaigns: [] }),
    });
  });

  it('renders with default testId', async () => {
    render(<AdminDashboardPage {...defaultProps} />);
    await waitFor(() => {
      expect(screen.getByTestId('admin-dashboard-page')).toBeInTheDocument();
    });
  });

  it('renders with custom testId', async () => {
    render(<AdminDashboardPage {...defaultProps} testId="custom-page" />);
    await waitFor(() => {
      expect(screen.getByTestId('custom-page')).toBeInTheDocument();
    });
  });

  it('renders content container', async () => {
    render(<AdminDashboardPage {...defaultProps} />);
    await waitFor(() => {
      expect(screen.getByTestId('admin-dashboard-page-content')).toBeInTheDocument();
    });
  });

  it('renders dashboard header title', async () => {
    render(<AdminDashboardPage {...defaultProps} />);
    await waitFor(() => {
      expect(screen.getByTestId('admin-dashboard-page-header-title')).toBeInTheDocument();
    });
  });

  it('renders campaigns section', async () => {
    render(<AdminDashboardPage {...defaultProps} />);
    await waitFor(() => {
      expect(screen.getByTestId('admin-dashboard-page-campaigns-section')).toBeInTheDocument();
    });
  });

  it('renders campaign grid', async () => {
    render(<AdminDashboardPage {...defaultProps} />);
    await waitFor(() => {
      expect(screen.getByTestId('admin-dashboard-page-campaign-grid')).toBeInTheDocument();
    });
  });

  it('displays "Your Campaigns" heading', async () => {
    render(<AdminDashboardPage {...defaultProps} />);
    await waitFor(() => {
      expect(screen.getByText('Your Campaigns')).toBeInTheDocument();
    });
  });

  it('fetches systems on mount', async () => {
    render(<AdminDashboardPage {...defaultProps} />);
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/.proxy/api/systems');
    });
  });

  it('fetches campaigns when guildId is provided', async () => {
    render(<AdminDashboardPage {...defaultProps} />);
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/.proxy/api/campaigns?guildId=guild-123');
    });
  });

  it('does not fetch campaigns when guildId is null', async () => {
    render(<AdminDashboardPage {...defaultProps} guildId={null} />);
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/.proxy/api/systems');
    });
    expect(mockFetch).not.toHaveBeenCalledWith(expect.stringContaining('campaigns'));
  });

  describe('callbacks', () => {
    it('renders with onShowSettings callback', async () => {
      const onShowSettings = jest.fn();
      render(<AdminDashboardPage {...defaultProps} onShowSettings={onShowSettings} />);
      await waitFor(() => {
        expect(screen.getByTestId('admin-dashboard-page')).toBeInTheDocument();
      });
    });

    it('renders activity hub button when onShowActivityHub provided', async () => {
      const onShowActivityHub = jest.fn();
      render(<AdminDashboardPage {...defaultProps} onShowActivityHub={onShowActivityHub} />);
      await waitFor(() => {
        expect(screen.getByTestId('admin-dashboard-page-header-activity-btn')).toBeInTheDocument();
      });
    });
  });

  describe('error handling', () => {
    it('handles fetch error gracefully', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      render(<AdminDashboardPage {...defaultProps} />);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Failed to load data:', expect.any(Error));
      });

      consoleSpy.mockRestore();
    });
  });

  describe('campaign management', () => {
    it('displays campaigns when data is loaded', async () => {
      const mockCampaigns = createMockCampaigns(2);
      const mockSystems = createMockFoundrySystems(3);

      mockFetch
        .mockResolvedValueOnce({ ok: true, json: async () => ({ systems: mockSystems }) })
        .mockResolvedValueOnce({ ok: true, json: async () => ({ campaigns: mockCampaigns }) });

      render(<AdminDashboardPage {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText('Campaign 1')).toBeInTheDocument();
        expect(screen.getByText('Campaign 2')).toBeInTheDocument();
      });
    });

    it('opens create campaign modal', async () => {
      const mockSystems = createMockFoundrySystems(3);
      mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({ systems: mockSystems }) });

      render(<AdminDashboardPage {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('admin-dashboard-page-campaign-grid-empty-action')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId('admin-dashboard-page-campaign-grid-empty-action'));

      await waitFor(() => {
        expect(screen.getByTestId('admin-dashboard-page-create-modal')).toBeInTheDocument();
      });
    });

    it('closes create campaign modal', async () => {
      const mockSystems = createMockFoundrySystems(3);
      mockFetch.mockResolvedValue({ ok: true, json: async () => ({ systems: mockSystems, campaigns: [] }) });

      render(<AdminDashboardPage {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('admin-dashboard-page-campaign-grid-empty-action')).toBeInTheDocument();
      });

      // Open modal
      fireEvent.click(screen.getByTestId('admin-dashboard-page-campaign-grid-empty-action'));

      await waitFor(() => {
        expect(screen.getByTestId('admin-dashboard-page-create-modal')).toBeInTheDocument();
      });

      // Close modal using close button
      const closeButton = screen.getByTestId('admin-dashboard-page-create-modal-close');
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByTestId('admin-dashboard-page-create-modal')).not.toBeInTheDocument();
      });
    });

    it('creates a new campaign via modal submission', async () => {
      const mockSystems = createMockFoundrySystems(3);
      mockFetch.mockResolvedValue({ ok: true, json: async () => ({ systems: mockSystems, campaigns: [] }) });

      render(<AdminDashboardPage {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('admin-dashboard-page-campaign-grid-empty-action')).toBeInTheDocument();
      });

      // Open modal
      fireEvent.click(screen.getByTestId('admin-dashboard-page-campaign-grid-empty-action'));

      await waitFor(() => {
        expect(screen.getByTestId('admin-dashboard-page-create-modal')).toBeInTheDocument();
      });

      // Fill in the form
      const nameInput = screen.getByTestId('admin-dashboard-page-create-modal-name');
      fireEvent.change(nameInput, { target: { value: 'My New Campaign' } });

      // Select a system
      const systemSelect = screen.getByTestId('admin-dashboard-page-create-modal-system');
      fireEvent.change(systemSelect, { target: { value: mockSystems[0].systemId } });

      // Fill description
      const descInput = screen.getByTestId('admin-dashboard-page-create-modal-description');
      fireEvent.change(descInput, { target: { value: 'A test campaign' } });

      // Submit the form
      const submitButton = screen.getByTestId('admin-dashboard-page-create-modal-submit-btn');
      fireEvent.click(submitButton);

      // Wait for modal to close and campaign to be added
      await waitFor(() => {
        expect(screen.queryByTestId('admin-dashboard-page-create-modal')).not.toBeInTheDocument();
      });

      // New campaign should be in the grid
      await waitFor(() => {
        expect(screen.getByText('My New Campaign')).toBeInTheDocument();
      });
    });

    it('creates campaign with system title from matched system', async () => {
      const mockSystems = [
        { systemId: 'dnd5e', title: 'D&D 5th Edition', description: 'Fantasy RPG' },
      ];
      mockFetch.mockResolvedValue({ ok: true, json: async () => ({ systems: mockSystems, campaigns: [] }) });

      render(<AdminDashboardPage {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('admin-dashboard-page-campaign-grid-empty-action')).toBeInTheDocument();
      });

      // Open modal and fill form
      fireEvent.click(screen.getByTestId('admin-dashboard-page-campaign-grid-empty-action'));

      await waitFor(() => {
        expect(screen.getByTestId('admin-dashboard-page-create-modal')).toBeInTheDocument();
      });

      fireEvent.change(screen.getByTestId('admin-dashboard-page-create-modal-name'), { target: { value: 'Test Campaign' } });
      fireEvent.change(screen.getByTestId('admin-dashboard-page-create-modal-system'), { target: { value: 'dnd5e' } });

      // Submit
      fireEvent.click(screen.getByTestId('admin-dashboard-page-create-modal-submit-btn'));

      await waitFor(() => {
        expect(screen.getByText('Test Campaign')).toBeInTheDocument();
      });
    });

    it('launches a campaign', async () => {
      const mockCampaigns = [createMockCampaign({ id: 'campaign-1', name: 'Test Campaign' })];
      const mockSystems = createMockFoundrySystems(1);
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      mockFetch
        .mockResolvedValueOnce({ ok: true, json: async () => ({ systems: mockSystems }) })
        .mockResolvedValueOnce({ ok: true, json: async () => ({ campaigns: mockCampaigns }) });

      render(<AdminDashboardPage {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText('Test Campaign')).toBeInTheDocument();
      });

      // Find and click the launch button (testId format: grid-campaign-{id}-launch-btn)
      const launchButton = screen.getByTestId('admin-dashboard-page-campaign-grid-campaign-campaign-1-launch-btn');
      fireEvent.click(launchButton);

      expect(consoleSpy).toHaveBeenCalledWith('Launching campaign:', 'campaign-1');

      consoleSpy.mockRestore();
    });
  });

  describe('chat functionality', () => {
    it('toggles chat open', async () => {
      render(<AdminDashboardPage {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('admin-dashboard-page-header-chat-btn')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId('admin-dashboard-page-header-chat-btn'));

      await waitFor(() => {
        expect(screen.getByTestId('admin-dashboard-page-chat-panel')).toBeInTheDocument();
      });
    });

    it('closes chat', async () => {
      render(<AdminDashboardPage {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('admin-dashboard-page-header-chat-btn')).toBeInTheDocument();
      });

      // Open chat
      fireEvent.click(screen.getByTestId('admin-dashboard-page-header-chat-btn'));

      await waitFor(() => {
        expect(screen.getByTestId('admin-dashboard-page-chat-panel')).toBeInTheDocument();
      });

      // Close chat
      fireEvent.click(screen.getByTestId('admin-dashboard-page-chat-panel-close-btn'));

      await waitFor(() => {
        expect(screen.queryByTestId('admin-dashboard-page-chat-panel')).not.toBeInTheDocument();
      });
    });
  });

  describe('header actions', () => {
    it('calls onShowActivityHub when button clicked', async () => {
      const onShowActivityHub = jest.fn();
      render(<AdminDashboardPage {...defaultProps} onShowActivityHub={onShowActivityHub} />);

      await waitFor(() => {
        expect(screen.getByTestId('admin-dashboard-page-header-activity-btn')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId('admin-dashboard-page-header-activity-btn'));

      expect(onShowActivityHub).toHaveBeenCalledTimes(1);
    });
  });

  describe('user display', () => {
    it('displays user information in header', async () => {
      render(<AdminDashboardPage {...defaultProps} username="JohnDoe" userId="user-456" />);

      await waitFor(() => {
        expect(screen.getByTestId('admin-dashboard-page-header-user-name')).toHaveTextContent('JohnDoe');
      });
    });

    it('displays user avatar', async () => {
      render(<AdminDashboardPage {...defaultProps} />);

      await waitFor(() => {
        const avatar = screen.getByTestId('admin-dashboard-page-header-user-avatar');
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveAttribute('alt', 'TestUser');
      });
    });
  });
});
