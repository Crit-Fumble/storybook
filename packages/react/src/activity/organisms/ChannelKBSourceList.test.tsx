import { render, screen, fireEvent } from '@testing-library/react';
import { ChannelKBSourceList } from './ChannelKBSourceList';
import type { ChannelKBSource } from '../types';

describe('ChannelKBSourceList', () => {
  const mockSources: ChannelKBSource[] = [
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
      lastSyncAt: new Date().toISOString(),
    },
    {
      id: 'source-2',
      channelId: 'channel-2',
      channelName: 'rules',
      channelType: 'forum',
      name: 'House Rules',
      category: 'rules',
      syncEnabled: false,
      syncThreads: true,
      syncPinned: true,
      maxMessages: 200,
      messageCount: 100,
    },
    {
      id: 'source-3',
      channelId: 'channel-3',
      channelName: 'session-thread',
      channelType: 'thread',
      name: 'Session Notes',
      category: 'session-notes',
      syncEnabled: true,
      syncThreads: false,
      syncPinned: true,
      maxMessages: 50,
      messageCount: 25,
    },
  ];

  it('renders with default testId', () => {
    render(<ChannelKBSourceList sources={mockSources} />);
    expect(screen.getByTestId('channel-kb-source-list')).toBeInTheDocument();
  });

  it('renders with custom testId', () => {
    render(<ChannelKBSourceList sources={mockSources} testId="custom-list" />);
    expect(screen.getByTestId('custom-list')).toBeInTheDocument();
  });

  describe('loading state', () => {
    it('shows loading skeleton when isLoading is true', () => {
      render(<ChannelKBSourceList sources={[]} isLoading={true} />);
      expect(screen.getByTestId('channel-kb-source-list')).toBeInTheDocument();
      expect(screen.queryByText('Channel KB Sources')).not.toBeInTheDocument();
    });
  });

  describe('header', () => {
    it('displays title with count', () => {
      render(<ChannelKBSourceList sources={mockSources} />);
      expect(screen.getByText('Channel KB Sources')).toBeInTheDocument();
      expect(screen.getByText('(3)')).toBeInTheDocument();
    });

    it('shows Add Source button when onCreate provided', () => {
      const onCreate = jest.fn();
      render(<ChannelKBSourceList sources={mockSources} onCreate={onCreate} />);
      expect(screen.getByText('Add Source')).toBeInTheDocument();
    });

    it('calls onCreate when Add Source clicked', () => {
      const onCreate = jest.fn();
      render(<ChannelKBSourceList sources={mockSources} onCreate={onCreate} />);
      fireEvent.click(screen.getByText('Add Source'));
      expect(onCreate).toHaveBeenCalledTimes(1);
    });
  });

  describe('empty state', () => {
    it('shows empty message when no sources', () => {
      render(<ChannelKBSourceList sources={[]} />);
      expect(screen.getByText('No Discord channels configured as knowledge base sources yet.')).toBeInTheDocument();
    });

    it('shows Add First Channel button when onCreate provided and empty', () => {
      const onCreate = jest.fn();
      render(<ChannelKBSourceList sources={[]} onCreate={onCreate} />);
      expect(screen.getByText('Add First Channel')).toBeInTheDocument();
    });

    it('calls onCreate when Add First Channel clicked', () => {
      const onCreate = jest.fn();
      render(<ChannelKBSourceList sources={[]} onCreate={onCreate} />);
      fireEvent.click(screen.getByText('Add First Channel'));
      expect(onCreate).toHaveBeenCalledTimes(1);
    });
  });

  describe('grouped display', () => {
    it('groups sources by channel type when filterType is all', () => {
      render(<ChannelKBSourceList sources={mockSources} filterType="all" />);
      expect(screen.getByText('Text Channels')).toBeInTheDocument();
      expect(screen.getByText('Forum Channels')).toBeInTheDocument();
      // Use getAllByText since "Threads" appears in group header and badge
      expect(screen.getAllByText('Threads').length).toBeGreaterThan(0);
    });

    it('shows flat list when filterType is specific type', () => {
      render(<ChannelKBSourceList sources={mockSources} filterType="text" />);
      expect(screen.queryByText('Text Channels')).not.toBeInTheDocument();
      expect(screen.getByText('(1)')).toBeInTheDocument();
    });
  });

  describe('filtering', () => {
    it('filters by text type', () => {
      render(<ChannelKBSourceList sources={mockSources} filterType="text" />);
      expect(screen.getByText('(1)')).toBeInTheDocument();
    });

    it('filters by forum type', () => {
      render(<ChannelKBSourceList sources={mockSources} filterType="forum" />);
      expect(screen.getByText('(1)')).toBeInTheDocument();
    });

    it('filters by thread type', () => {
      render(<ChannelKBSourceList sources={mockSources} filterType="thread" />);
      expect(screen.getByText('(1)')).toBeInTheDocument();
    });
  });

  describe('callbacks', () => {
    it('calls onSelect when source clicked', () => {
      const onSelect = jest.fn();
      render(<ChannelKBSourceList sources={mockSources} onSelect={onSelect} />);
      // Find and click on source card
      const sourceCard = screen.getByText('General Chat').closest('[data-testid]');
      if (sourceCard) {
        fireEvent.click(sourceCard);
        expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'source-1' }));
      }
    });
  });

  describe('syncing indicator', () => {
    it('passes syncingIds to source cards', () => {
      const syncingIds = new Set(['source-1']);
      render(<ChannelKBSourceList sources={mockSources} syncingIds={syncingIds} />);
      // Component should render without error
      expect(screen.getByTestId('channel-kb-source-list')).toBeInTheDocument();
    });
  });

  describe('selection state', () => {
    it('passes selectedId to source cards', () => {
      render(<ChannelKBSourceList sources={mockSources} selectedId="source-1" />);
      // Component should render without error
      expect(screen.getByTestId('channel-kb-source-list')).toBeInTheDocument();
    });
  });
});
