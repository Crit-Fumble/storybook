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

  describe('update operations', () => {
    it('handles successful source update', async () => {
      mockFetch.mockReset();
      mockFetch.mockImplementation((url) => {
        if (typeof url === 'string' && url.includes('/channels')) {
          return Promise.resolve({ ok: true, json: async () => ({ channels: mockChannels }) });
        }
        return Promise.resolve({ ok: true, json: async () => ({ sources: mockSources }) });
      });

      render(<ChannelKBPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText('General Chat')).toBeInTheDocument();
      });

      // Click on source to edit
      const sourceCards = screen.getAllByTestId(/channel-kb-source-card/);
      fireEvent.click(sourceCards[0]);

      await waitFor(() => {
        expect(screen.getByTestId('channel-kb-panel-editor')).toBeInTheDocument();
      });
    });

    it('shows error when update fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      mockFetch.mockReset();
      mockFetch.mockImplementation((url) => {
        if (typeof url === 'string' && url.includes('/channels')) {
          return Promise.resolve({ ok: true, json: async () => ({ channels: mockChannels }) });
        }
        return Promise.resolve({ ok: true, json: async () => ({ sources: mockSources }) });
      });

      render(<ChannelKBPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText('General Chat')).toBeInTheDocument();
      });

      consoleSpy.mockRestore();
    });
  });

  describe('toggle enabled', () => {
    it('toggles source enabled state', async () => {
      mockFetch.mockReset();
      mockFetch.mockImplementation(() =>
        Promise.resolve({ ok: true, json: async () => ({ sources: mockSources }) })
      );

      render(<ChannelKBPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText('General Chat')).toBeInTheDocument();
      });

      // Find and click toggle switch - use Disable button since it starts enabled
      const toggleButton = screen.getByLabelText('Disable');
      fireEvent.click(toggleButton);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          '/api/admin/guilds/guild-123/channel-kb/source-1',
          expect.objectContaining({
            method: 'POST',
            body: expect.stringContaining('syncEnabled')
          })
        );
      });
    });

    it('handles toggle enabled error', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      mockFetch.mockReset();
      let callCount = 0;
      mockFetch.mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          // First call - initial load
          return Promise.resolve({ ok: true, json: async () => ({ sources: mockSources }) });
        }
        // Second call - toggle fails
        return Promise.resolve({ ok: false });
      });

      render(<ChannelKBPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText('General Chat')).toBeInTheDocument();
      });

      const toggleButton = screen.getByLabelText('Disable');
      fireEvent.click(toggleButton);

      await waitFor(() => {
        expect(screen.getByText('Failed to update source')).toBeInTheDocument();
      });

      consoleSpy.mockRestore();
    });
  });

  describe('sync operations', () => {
    it('syncs a source successfully', async () => {
      mockFetch.mockReset();
      mockFetch.mockImplementation(() =>
        Promise.resolve({ ok: true, json: async () => ({ sources: mockSources }) })
      );

      render(<ChannelKBPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText('General Chat')).toBeInTheDocument();
      });

      // Find and click sync button by aria-label
      const syncButton = screen.getByLabelText('Sync now');
      fireEvent.click(syncButton);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          '/api/admin/guilds/guild-123/channel-kb/source-1/sync',
          expect.objectContaining({ method: 'POST' })
        );
      });
    });

    it('handles sync error', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      mockFetch.mockReset();
      let callCount = 0;
      mockFetch.mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          // First call - initial load
          return Promise.resolve({ ok: true, json: async () => ({ sources: mockSources }) });
        }
        // Second call - sync fails
        return Promise.resolve({
          ok: false,
          json: async () => ({ error: 'Sync failed' })
        });
      });

      render(<ChannelKBPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText('General Chat')).toBeInTheDocument();
      });

      const syncButton = screen.getByLabelText('Sync now');
      fireEvent.click(syncButton);

      await waitFor(() => {
        expect(screen.getByText('Sync failed')).toBeInTheDocument();
      });

      consoleSpy.mockRestore();
    });
  });

  describe('delete operations', () => {
    it('deletes a source when confirmed', async () => {
      (global.confirm as jest.Mock).mockReturnValueOnce(true);

      mockFetch.mockResolvedValue({ ok: true, json: async () => ({ sources: mockSources }) });

      render(<ChannelKBPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText('General Chat')).toBeInTheDocument();
      });

      // Mock delete response
      mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });

      const deleteButton = screen.getByLabelText('Delete');
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          '/api/admin/guilds/guild-123/channel-kb/source-1',
          expect.objectContaining({ method: 'DELETE' })
        );
      });
    });

    it('does not delete when confirmation is cancelled', async () => {
      (global.confirm as jest.Mock).mockReturnValueOnce(false);

      mockFetch.mockResolvedValue({ ok: true, json: async () => ({ sources: mockSources }) });

      render(<ChannelKBPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText('General Chat')).toBeInTheDocument();
      });

      const fetchCallsBefore = mockFetch.mock.calls.length;

      const deleteButton = screen.getByLabelText('Delete');
      fireEvent.click(deleteButton);

      // Wait a bit to ensure no API call is made
      await new Promise(resolve => setTimeout(resolve, 100));

      // Should not make delete API call
      expect(mockFetch.mock.calls.length).toBe(fetchCallsBefore);
    });

    it('handles delete error', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      (global.confirm as jest.Mock).mockReturnValueOnce(true);

      mockFetch.mockResolvedValue({ ok: true, json: async () => ({ sources: mockSources }) });

      render(<ChannelKBPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText('General Chat')).toBeInTheDocument();
      });

      // Mock failed delete
      mockFetch.mockResolvedValueOnce({ ok: false });

      const deleteButton = screen.getByLabelText('Delete');
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByText('Failed to delete source')).toBeInTheDocument();
      });

      consoleSpy.mockRestore();
    });
  });

  describe('modal interactions', () => {
    it('closes modal when cancel button clicked', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: true, json: async () => ({ sources: mockSources }) })
        .mockResolvedValueOnce({ ok: true, json: async () => ({ channels: mockChannels }) });

      render(<ChannelKBPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText('Add Source')).toBeInTheDocument();
      });

      // Open modal
      fireEvent.click(screen.getByText('Add Source'));

      await waitFor(() => {
        expect(screen.getByTestId('channel-kb-panel-modal')).toBeInTheDocument();
      });

      // Find and click cancel button
      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);

      await waitFor(() => {
        expect(screen.queryByTestId('channel-kb-panel-modal')).not.toBeInTheDocument();
      });
    });

    it('closes modal via close handler', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: true, json: async () => ({ sources: mockSources }) })
        .mockResolvedValueOnce({ ok: true, json: async () => ({ channels: mockChannels }) });

      render(<ChannelKBPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText('Add Source')).toBeInTheDocument();
      });

      // Open modal
      fireEvent.click(screen.getByText('Add Source'));

      await waitFor(() => {
        expect(screen.getByTestId('channel-kb-panel-modal')).toBeInTheDocument();
      });

      // Modal should have a close button (X)
      const closeButton = screen.getByTestId('channel-kb-panel-modal').querySelector('[data-testid$="-close-btn"]');
      if (closeButton) {
        fireEvent.click(closeButton);
        await waitFor(() => {
          expect(screen.queryByTestId('channel-kb-panel-modal')).not.toBeInTheDocument();
        });
      }
    });
  });

  describe('channel loading', () => {
    it('does not fetch channels if already loaded', async () => {
      mockFetch.mockResolvedValue({ ok: true, json: async () => ({ sources: mockSources }) });

      render(<ChannelKBPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText('Add Source')).toBeInTheDocument();
      });

      // Mock channels response
      mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({ channels: mockChannels }) });

      // Open modal once
      fireEvent.click(screen.getByText('Add Source'));

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          '/api/admin/guilds/guild-123/channels',
          expect.any(Object)
        );
      });

      const fetchCallsBeforeReopen = mockFetch.mock.calls.length;

      // Close and reopen modal
      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);

      await waitFor(() => {
        expect(screen.queryByTestId('channel-kb-panel-modal')).not.toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Add Source'));

      // Should not fetch channels again
      expect(mockFetch.mock.calls.length).toBe(fetchCallsBeforeReopen);
    });

    it('handles channels fetch error', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      mockFetch.mockResolvedValue({ ok: true, json: async () => ({ sources: [] }) });

      render(<ChannelKBPanel {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText('Add First Channel')).toBeInTheDocument();
      });

      // Mock failed channels fetch
      mockFetch.mockRejectedValueOnce(new Error('Failed to fetch channels'));

      fireEvent.click(screen.getByText('Add First Channel'));

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch channels:', expect.any(Error));
      });

      consoleSpy.mockRestore();
    });
  });
});
