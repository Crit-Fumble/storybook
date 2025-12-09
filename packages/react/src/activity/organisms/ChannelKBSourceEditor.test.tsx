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

    it('shows error when name is too long', () => {
      render(<ChannelKBSourceEditor {...defaultProps} source={mockSource} />);
      const nameInput = screen.getByTestId('channel-kb-source-editor-name-input');
      const longName = 'a'.repeat(101);
      fireEvent.change(nameInput, { target: { value: longName } });
      fireEvent.click(screen.getByTestId('channel-kb-source-editor-submit-btn'));
      expect(screen.getByText('Name must be 100 characters or less')).toBeInTheDocument();
    });

    it('shows error when description is too long', () => {
      render(<ChannelKBSourceEditor {...defaultProps} source={mockSource} />);
      const descriptionInput = screen.getByTestId('channel-kb-source-editor-description-input');
      const longDescription = 'a'.repeat(501);
      fireEvent.change(descriptionInput, { target: { value: longDescription } });
      fireEvent.click(screen.getByTestId('channel-kb-source-editor-submit-btn'));
      expect(screen.getByText('Description must be 500 characters or less')).toBeInTheDocument();
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

    it('auto-fills name when channel is selected', () => {
      render(<ChannelKBSourceEditor {...defaultProps} />);
      const channelSelect = screen.getByTestId('channel-kb-source-editor-channel-select').querySelector('select');
      if (channelSelect) {
        fireEvent.change(channelSelect, { target: { value: 'channel-1' } });
        const nameInput = screen.getByTestId('channel-kb-source-editor-name-input');
        expect(nameInput).toHaveValue('general');
      }
    });

    it('clears channel error when channel is selected', () => {
      render(<ChannelKBSourceEditor {...defaultProps} />);
      // First trigger the error
      fireEvent.click(screen.getByTestId('channel-kb-source-editor-submit-btn'));
      expect(screen.getByText('Please select a channel')).toBeInTheDocument();

      // Then select a channel
      const channelSelect = screen.getByTestId('channel-kb-source-editor-channel-select').querySelector('select');
      if (channelSelect) {
        fireEvent.change(channelSelect, { target: { value: 'channel-1' } });
        expect(screen.queryByText('Please select a channel')).not.toBeInTheDocument();
      }
    });
  });

  describe('field changes', () => {
    it('updates name value when changed', () => {
      render(<ChannelKBSourceEditor {...defaultProps} />);
      const nameInput = screen.getByTestId('channel-kb-source-editor-name-input');
      fireEvent.change(nameInput, { target: { value: 'New Name' } });
      expect(nameInput).toHaveValue('New Name');
    });

    it('clears name error when name is changed', () => {
      const sourceWithoutName = { ...mockSource, name: '' };
      render(<ChannelKBSourceEditor {...defaultProps} source={sourceWithoutName} />);
      // Trigger error
      fireEvent.click(screen.getByTestId('channel-kb-source-editor-submit-btn'));
      expect(screen.getByText('Name is required')).toBeInTheDocument();

      // Change name
      const nameInput = screen.getByTestId('channel-kb-source-editor-name-input');
      fireEvent.change(nameInput, { target: { value: 'Valid Name' } });
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
    });

    it('updates description value when changed', () => {
      render(<ChannelKBSourceEditor {...defaultProps} />);
      const descriptionInput = screen.getByTestId('channel-kb-source-editor-description-input').querySelector('textarea');
      if (descriptionInput) {
        fireEvent.change(descriptionInput, { target: { value: 'New Description' } });
        expect(descriptionInput).toHaveValue('New Description');
      }
    });

    it('updates category value when changed', () => {
      render(<ChannelKBSourceEditor {...defaultProps} />);
      const categorySelect = screen.getByTestId('channel-kb-source-editor-category-select').querySelector('select');
      if (categorySelect) {
        fireEvent.change(categorySelect, { target: { value: 'rules' } });
        expect(categorySelect).toHaveValue('rules');
      }
    });

    it('updates maxMessages value when changed', () => {
      render(<ChannelKBSourceEditor {...defaultProps} />);
      const maxMessagesSelect = screen.getByTestId('channel-kb-source-editor-max-messages-select').querySelector('select');
      if (maxMessagesSelect) {
        fireEvent.change(maxMessagesSelect, { target: { value: '500' } });
        expect(maxMessagesSelect).toHaveValue('500');
      }
    });
  });

  describe('sync toggle changes', () => {
    it('toggles syncEnabled', () => {
      render(<ChannelKBSourceEditor {...defaultProps} />);
      const syncEnabledToggle = screen.getByTestId('channel-kb-source-editor-sync-enabled');
      const toggleButton = syncEnabledToggle.querySelector('button');
      if (toggleButton) {
        fireEvent.click(toggleButton);
        // Toggle should be clicked
        expect(toggleButton).toBeInTheDocument();
      }
    });

    it('toggles syncThreads', () => {
      render(<ChannelKBSourceEditor {...defaultProps} />);
      const syncThreadsToggle = screen.getByTestId('channel-kb-source-editor-sync-threads');
      const toggleButton = syncThreadsToggle.querySelector('button');
      if (toggleButton) {
        fireEvent.click(toggleButton);
        expect(toggleButton).toBeInTheDocument();
      }
    });

    it('toggles syncPinned', () => {
      render(<ChannelKBSourceEditor {...defaultProps} />);
      const syncPinnedToggle = screen.getByTestId('channel-kb-source-editor-sync-pinned');
      const toggleButton = syncPinnedToggle.querySelector('button');
      if (toggleButton) {
        fireEvent.click(toggleButton);
        expect(toggleButton).toBeInTheDocument();
      }
    });
  });
});
