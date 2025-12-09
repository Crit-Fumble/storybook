import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ServerSettingsPage } from './ServerSettingsPage';

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock alert
const mockAlert = jest.fn();
global.alert = mockAlert;

describe('ServerSettingsPage', () => {
  const defaultProps = {
    guildId: 'guild-123',
    onBack: jest.fn(),
  };

  beforeEach(() => {
    mockFetch.mockClear();
    mockAlert.mockClear();
    defaultProps.onBack.mockClear();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        channelLinks: {},
        roleMappings: {},
        botSettings: {},
        roles: [],
      }),
    });
  });

  it('renders with default testId', async () => {
    render(<ServerSettingsPage {...defaultProps} />);
    await waitFor(() => {
      expect(screen.getByTestId('server-settings-page')).toBeInTheDocument();
    });
  });

  it('renders with custom testId', async () => {
    render(<ServerSettingsPage {...defaultProps} testId="custom-settings" />);
    await waitFor(() => {
      expect(screen.getByTestId('custom-settings')).toBeInTheDocument();
    });
  });

  it('renders content container', async () => {
    render(<ServerSettingsPage {...defaultProps} />);
    await waitFor(() => {
      expect(screen.getByTestId('server-settings-page-content')).toBeInTheDocument();
    });
  });

  it('renders back button', async () => {
    render(<ServerSettingsPage {...defaultProps} />);
    await waitFor(() => {
      expect(screen.getByTestId('server-settings-page-back-btn')).toBeInTheDocument();
    });
  });

  it('calls onBack when back button clicked', async () => {
    render(<ServerSettingsPage {...defaultProps} />);
    await waitFor(() => {
      expect(screen.getByTestId('server-settings-page-back-btn')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId('server-settings-page-back-btn'));
    expect(defaultProps.onBack).toHaveBeenCalledTimes(1);
  });

  it('displays Server Settings heading', async () => {
    render(<ServerSettingsPage {...defaultProps} />);
    await waitFor(() => {
      expect(screen.getByText('Server Settings')).toBeInTheDocument();
    });
  });

  describe('tabs', () => {
    it('renders tabs', async () => {
      render(<ServerSettingsPage {...defaultProps} />);
      await waitFor(() => {
        expect(screen.getByTestId('server-settings-page-tabs')).toBeInTheDocument();
      });
    });

    it('shows channels tab by default', async () => {
      render(<ServerSettingsPage {...defaultProps} />);
      await waitFor(() => {
        expect(screen.getByTestId('server-settings-page-channels')).toBeInTheDocument();
      });
    });

    it('renders tab content container', async () => {
      render(<ServerSettingsPage {...defaultProps} />);
      await waitFor(() => {
        expect(screen.getByTestId('server-settings-page-tab-content')).toBeInTheDocument();
      });
    });
  });

  describe('data loading', () => {
    it('fetches settings on mount when guildId provided', async () => {
      render(<ServerSettingsPage {...defaultProps} />);
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/.proxy/api/guilds/guild-123/settings');
      });
    });

    it('fetches roles on mount when guildId provided', async () => {
      render(<ServerSettingsPage {...defaultProps} />);
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/.proxy/api/guilds/guild-123/roles');
      });
    });

    it('does not fetch when guildId is null', async () => {
      render(<ServerSettingsPage {...defaultProps} guildId={null} />);
      // Give time for any potential fetches
      await new Promise(resolve => setTimeout(resolve, 100));
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('handles fetch error gracefully', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      render(<ServerSettingsPage {...defaultProps} />);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Failed to load settings:', expect.any(Error));
      });

      consoleSpy.mockRestore();
    });
  });
});
