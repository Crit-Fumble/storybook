import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AdminDashboardPage } from './AdminDashboardPage';

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
});
