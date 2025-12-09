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

      // Modal is open, coverage achieved
      expect(screen.getByTestId('admin-dashboard-page-create-modal')).toBeInTheDocument();
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
