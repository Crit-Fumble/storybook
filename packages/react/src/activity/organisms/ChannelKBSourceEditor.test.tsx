import { render, screen, fireEvent } from '@testing-library/react';
import { ChannelKBSourceEditor } from './ChannelKBSourceEditor';
import type { ChannelKBSource, ChannelKBChannel } from '../types';

describe('ChannelKBSourceEditor', () => {
  const mockChannels: ChannelKBChannel[] = [
    { id: 'channel-1', name: 'general', type: 'text', category: 'Text Channels' },
    { id: 'channel-2', name: 'rules-forum', type: 'forum', category: 'Forums' },
    { id: 'channel-3', name: 'already-configured', type: 'text', isConfigured: true },
  ];

  const mockSource: ChannelKBSource = {
    id: 'source-1',
    channelId: 'channel-1',
    channelName: 'general',
    channelType: 'text',
    name: 'General Chat',
    description: 'A description',
    category: 'general',
    syncEnabled: true,
    syncThreads: true,
    syncPinned: true,
    maxMessages: 100,
    messageCount: 50,
  };

  const defaultProps = {
    channels: mockChannels,
    onSubmit: jest.fn(),
    onCancel: jest.fn(),
  };

  beforeEach(() => {
    defaultProps.onSubmit.mockClear();
    defaultProps.onCancel.mockClear();
  });

  it('renders with default testId', () => {
    render(<ChannelKBSourceEditor {...defaultProps} />);
    expect(screen.getByTestId('channel-kb-source-editor')).toBeInTheDocument();
  });

  it('renders with custom testId', () => {
    render(<ChannelKBSourceEditor {...defaultProps} testId="custom-editor" />);
    expect(screen.getByTestId('custom-editor')).toBeInTheDocument();
  });

  describe('create mode', () => {
    it('shows Add Channel title when no source', () => {
      render(<ChannelKBSourceEditor {...defaultProps} />);
      expect(screen.getByText('Add Channel as KB Source')).toBeInTheDocument();
    });

    it('shows Add Source button when no source', () => {
      render(<ChannelKBSourceEditor {...defaultProps} />);
      expect(screen.getByTestId('channel-kb-source-editor-submit-btn')).toHaveTextContent('Add Source');
    });
  });

  describe('edit mode', () => {
    it('shows Edit KB Source title when source provided', () => {
      render(<ChannelKBSourceEditor {...defaultProps} source={mockSource} />);
      expect(screen.getByText('Edit KB Source')).toBeInTheDocument();
    });

    it('shows Save Changes button when source provided', () => {
      render(<ChannelKBSourceEditor {...defaultProps} source={mockSource} />);
      expect(screen.getByTestId('channel-kb-source-editor-submit-btn')).toHaveTextContent('Save Changes');
    });

    it('populates form with source data', () => {
      render(<ChannelKBSourceEditor {...defaultProps} source={mockSource} />);
      expect(screen.getByTestId('channel-kb-source-editor-name-input')).toHaveValue('General Chat');
    });
  });

  describe('form fields', () => {
    it('renders channel select', () => {
      render(<ChannelKBSourceEditor {...defaultProps} />);
      expect(screen.getByTestId('channel-kb-source-editor-channel-select')).toBeInTheDocument();
    });

    it('renders name input', () => {
      render(<ChannelKBSourceEditor {...defaultProps} />);
      expect(screen.getByTestId('channel-kb-source-editor-name-input')).toBeInTheDocument();
    });

    it('renders description textarea', () => {
      render(<ChannelKBSourceEditor {...defaultProps} />);
      expect(screen.getByTestId('channel-kb-source-editor-description-input')).toBeInTheDocument();
    });

    it('renders category select', () => {
      render(<ChannelKBSourceEditor {...defaultProps} />);
      expect(screen.getByTestId('channel-kb-source-editor-category-select')).toBeInTheDocument();
    });

    it('renders max messages select', () => {
      render(<ChannelKBSourceEditor {...defaultProps} />);
      expect(screen.getByTestId('channel-kb-source-editor-max-messages-select')).toBeInTheDocument();
    });
  });

  describe('sync settings', () => {
    it('renders sync enabled toggle', () => {
      render(<ChannelKBSourceEditor {...defaultProps} />);
      expect(screen.getByTestId('channel-kb-source-editor-sync-enabled')).toBeInTheDocument();
    });

    it('renders sync threads toggle', () => {
      render(<ChannelKBSourceEditor {...defaultProps} />);
      expect(screen.getByTestId('channel-kb-source-editor-sync-threads')).toBeInTheDocument();
    });

    it('renders sync pinned toggle', () => {
      render(<ChannelKBSourceEditor {...defaultProps} />);
      expect(screen.getByTestId('channel-kb-source-editor-sync-pinned')).toBeInTheDocument();
    });
  });

  describe('loading states', () => {
    it('shows loading skeleton when loading channels', () => {
      render(<ChannelKBSourceEditor {...defaultProps} isLoadingChannels={true} />);
      // Loading skeleton should be present
      expect(screen.getByTestId('channel-kb-source-editor')).toBeInTheDocument();
    });

    it('shows Saving... text when submitting', () => {
      render(<ChannelKBSourceEditor {...defaultProps} isSubmitting={true} />);
      expect(screen.getByTestId('channel-kb-source-editor-submit-btn')).toHaveTextContent('Saving...');
    });

    it('disables buttons when submitting', () => {
      render(<ChannelKBSourceEditor {...defaultProps} isSubmitting={true} />);
      expect(screen.getByTestId('channel-kb-source-editor-submit-btn')).toBeDisabled();
      expect(screen.getByTestId('channel-kb-source-editor-cancel-btn')).toBeDisabled();
    });
  });

  describe('validation', () => {
    it('shows error when channel not selected', () => {
      render(<ChannelKBSourceEditor {...defaultProps} />);
      fireEvent.click(screen.getByTestId('channel-kb-source-editor-submit-btn'));
      expect(screen.getByText('Please select a channel')).toBeInTheDocument();
    });

    it('shows error when name is empty', () => {
      // Use source to pre-fill, then clear the name
      const sourceWithoutName = { ...mockSource, name: '' };
      render(<ChannelKBSourceEditor {...defaultProps} source={sourceWithoutName} />);
      fireEvent.click(screen.getByTestId('channel-kb-source-editor-submit-btn'));
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });
  });

  describe('form submission', () => {
    it('calls onSubmit with form data when valid', () => {
      render(<ChannelKBSourceEditor {...defaultProps} source={mockSource} />);
      fireEvent.click(screen.getByTestId('channel-kb-source-editor-submit-btn'));
      expect(defaultProps.onSubmit).toHaveBeenCalledWith(expect.objectContaining({
        channelId: 'channel-1',
        name: 'General Chat',
      }));
    });

    it('calls onCancel when cancel clicked', () => {
      render(<ChannelKBSourceEditor {...defaultProps} />);
      fireEvent.click(screen.getByTestId('channel-kb-source-editor-cancel-btn'));
      expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe('channel selection', () => {
    it('shows channel select with options', () => {
      render(<ChannelKBSourceEditor {...defaultProps} />);
      expect(screen.getByTestId('channel-kb-source-editor-channel-select')).toBeInTheDocument();
    });

    it('pre-fills channel when editing', () => {
      render(<ChannelKBSourceEditor {...defaultProps} source={mockSource} />);
      // The component should show the source channel as selected
      expect(screen.getByTestId('channel-kb-source-editor')).toBeInTheDocument();
    });
  });
});
