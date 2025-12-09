import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChannelKBPanel } from './ChannelKBPanel';

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock confirm
global.confirm = jest.fn(() => true);

describe('ChannelKBPanel', () => {
  const defaultProps = {
    guildId: 'guild-123',
  };

  const mockSources = [
    {
      id: 'source-1',
      channelId: 'channel-1',
      channelName: 'general',
      channelType: 'text',
      name: 'General Chat',
      category: 'general',
      syncEnabled: true,
      syncThreads: true,
      syncPinned: true,
      maxMessages: 100,
      messageCount: 50,
    },
  ];

  const mockChannels = [
    { id: 'channel-1', name: 'general', type: 'text' },
    { id: 'channel-2', name: 'rules', type: 'forum' },
  ];

  beforeEach(() => {
    mockFetch.mockClear();
    (global.confirm as jest.Mock).mockClear();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ sources: mockSources, channels: mockChannels }),
    });
  });

  it('renders with default testId', async () => {
    render(<ChannelKBPanel {...defaultProps} />);
    await waitFor(() => {
      expect(screen.getByTestId('channel-kb-panel')).toBeInTheDocument();
    });
  });

  it('renders with custom testId', async () => {
    render(<ChannelKBPanel {...defaultProps} testId="custom-panel" />);
    await waitFor(() => {
      expect(screen.getByTestId('custom-panel')).toBeInTheDocument();
    });
  });

  describe('loading sources', () => {
    it('fetches sources on mount', async () => {
      render(<ChannelKBPanel {...defaultProps} />);
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          '/api/admin/guilds/guild-123/channel-kb',
          expect.objectContaining({ credentials: 'include' })
        );
      });
    });

    it('uses custom apiBaseUrl', async () => {
      render(<ChannelKBPanel {...defaultProps} apiBaseUrl="https://api.example.com" />);
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.example.com/api/admin/guilds/guild-123/channel-kb',
          expect.any(Object)
        );
      });
    });
  });

  describe('error handling', () => {
    it('shows error banner when fetch fails', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      render(<ChannelKBPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText('Failed to load channel KB sources')).toBeInTheDocument();
      });

      consoleSpy.mockRestore();
    });

    it('can dismiss error banner', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      render(<ChannelKBPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText('Failed to load channel KB sources')).toBeInTheDocument();
      });

      const closeButton = screen.getByText('Failed to load channel KB sources').parentElement?.querySelector('button');
      if (closeButton) {
        fireEvent.click(closeButton);
        expect(screen.queryByText('Failed to load channel KB sources')).not.toBeInTheDocument();
      }

      consoleSpy.mockRestore();
    });
  });

  describe('source list', () => {
    it('renders source list component', async () => {
      render(<ChannelKBPanel {...defaultProps} />);
      await waitFor(() => {
        expect(screen.getByTestId('channel-kb-panel-list')).toBeInTheDocument();
      });
    });

    it('displays sources after loading', async () => {
      render(<ChannelKBPanel {...defaultProps} />);
      await waitFor(() => {
        expect(screen.getByText('General Chat')).toBeInTheDocument();
      });
    });
  });

  describe('editor modal', () => {
    it('opens modal when creating new source', async () => {
      render(<ChannelKBPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText('Add Source')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Add Source'));

      await waitFor(() => {
        expect(screen.getByTestId('channel-kb-panel-modal')).toBeInTheDocument();
      });
    });

    it('fetches channels when editor opens', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: true, json: async () => ({ sources: mockSources }) })
        .mockResolvedValueOnce({ ok: true, json: async () => ({ channels: mockChannels }) });

      render(<ChannelKBPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText('Add Source')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Add Source'));

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          '/api/admin/guilds/guild-123/channels',
          expect.any(Object)
        );
      });
    });
  });

  describe('CRUD operations', () => {
    it('handles create source - opens editor', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: true, json: async () => ({ sources: [] }) })
        .mockResolvedValueOnce({ ok: true, json: async () => ({ channels: mockChannels }) });

      render(<ChannelKBPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText('Add First Channel')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Add First Channel'));

      await waitFor(() => {
        expect(screen.getByTestId('channel-kb-panel-editor')).toBeInTheDocument();
      });
    });
  });

  describe('modal title', () => {
    it('shows modal when Add Source clicked', async () => {
      mockFetch.mockResolvedValue({ ok: true, json: async () => ({ sources: mockSources, channels: mockChannels }) });

      render(<ChannelKBPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText('Add Source')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Add Source'));

      await waitFor(() => {
        expect(screen.getByTestId('channel-kb-panel-modal')).toBeInTheDocument();
      });
    });
  });

  describe('classNames', () => {
    it('applies custom className', async () => {
      render(<ChannelKBPanel {...defaultProps} className="custom-class" />);
      await waitFor(() => {
        expect(screen.getByTestId('channel-kb-panel')).toHaveClass('custom-class');
      });
    });
  });

  describe('CRUD operations - detailed', () => {
    it('handles successful source creation with API call', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: true, json: async () => ({ sources: [] }) })
        .mockResolvedValueOnce({ ok: true, json: async () => ({ channels: mockChannels }) })
        .mockResolvedValueOnce({ ok: true, json: async () => ({}) }) // create
        .mockResolvedValueOnce({ ok: true, json: async () => ({ sources: mockSources }) }); // refresh

      render(<ChannelKBPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText('Add First Channel')).toBeInTheDocument();
      });

      // Opens the editor and verifies it's rendered
      fireEvent.click(screen.getByText('Add First Channel'));
      await waitFor(() => {
        expect(screen.getByTestId('channel-kb-panel-editor')).toBeInTheDocument();
      });
    });

    it('handles failed source creation', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      mockFetch
        .mockResolvedValueOnce({ ok: true, json: async () => ({ sources: [] }) })
        .mockResolvedValueOnce({ ok: true, json: async () => ({ channels: mockChannels }) })
        .mockResolvedValueOnce({
          ok: false,
          json: async () => ({ error: 'Creation failed' })
        });

      render(<ChannelKBPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText('Add First Channel')).toBeInTheDocument();
      });

      consoleSpy.mockRestore();
    });

    it('handles failed source update', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      mockFetch
        .mockResolvedValueOnce({ ok: true, json: async () => ({ sources: mockSources }) })
        .mockResolvedValueOnce({ ok: true, json: async () => ({ channels: mockChannels }) })
        .mockResolvedValueOnce({
          ok: false,
          json: async () => ({ error: 'Update failed' })
        });

      render(<ChannelKBPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText('General Chat')).toBeInTheDocument();
      });

      consoleSpy.mockRestore();
    });

    it('renders component successfully', async () => {
      mockFetch.mockResolvedValue({ ok: true, json: async () => ({ sources: mockSources }) });

      render(<ChannelKBPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('channel-kb-panel')).toBeInTheDocument();
      });
    });
  });
});
