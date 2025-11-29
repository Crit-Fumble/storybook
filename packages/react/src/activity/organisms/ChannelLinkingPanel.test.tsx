import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChannelLinkingPanel } from './ChannelLinkingPanel';
import type { ChannelLinks, DiscordChannel } from '../types';

const createChannelLinks = (overrides: Partial<ChannelLinks> = {}): ChannelLinks => ({
  ic: '',
  ooc: '',
  dice: '',
  gm: '',
  announce: '',
  voice: '',
  ...overrides,
});

const textChannels: DiscordChannel[] = [
  { id: 'ch-1', name: 'in-character', type: 0 },
  { id: 'ch-2', name: 'ooc-chat', type: 0 },
  { id: 'ch-3', name: 'dice-rolls', type: 0 },
  { id: 'ch-4', name: 'gm-notes', type: 0 },
  { id: 'ch-5', name: 'announcements', type: 0 },
];

const voiceChannels: DiscordChannel[] = [
  { id: 'vc-1', name: 'Game Voice', type: 2 },
  { id: 'vc-2', name: 'Lobby', type: 2 },
];

const allChannels = [...textChannels, ...voiceChannels];

describe('ChannelLinkingPanel', () => {
  describe('Header', () => {
    it('renders Channel Links header', () => {
      render(
        <ChannelLinkingPanel
          channelLinks={createChannelLinks()}
          channels={allChannels}
          onChange={() => {}}
          onSave={() => {}}
        />
      );

      expect(screen.getByText('Channel Links')).toBeInTheDocument();
    });

    it('renders description', () => {
      render(
        <ChannelLinkingPanel
          channelLinks={createChannelLinks()}
          channels={allChannels}
          onChange={() => {}}
          onSave={() => {}}
        />
      );

      expect(screen.getByText('Link Discord channels to campaign functions')).toBeInTheDocument();
    });
  });

  describe('Channel types', () => {
    it('renders all channel type rows', () => {
      render(
        <ChannelLinkingPanel
          channelLinks={createChannelLinks()}
          channels={allChannels}
          onChange={() => {}}
          onSave={() => {}}
        />
      );

      expect(screen.getByText('In-Character Chat')).toBeInTheDocument();
      expect(screen.getByText('Out-of-Character')).toBeInTheDocument();
      expect(screen.getByText('Dice Rolls')).toBeInTheDocument();
      expect(screen.getByText('GM Notes')).toBeInTheDocument();
      expect(screen.getByText('Announcements')).toBeInTheDocument();
      expect(screen.getByText('Voice Channel')).toBeInTheDocument();
    });

    it('renders channel select for each type', () => {
      render(
        <ChannelLinkingPanel
          channelLinks={createChannelLinks()}
          channels={allChannels}
          onChange={() => {}}
          onSave={() => {}}
        />
      );

      expect(screen.getByTestId('channel-linking-ic-select')).toBeInTheDocument();
      expect(screen.getByTestId('channel-linking-ooc-select')).toBeInTheDocument();
      expect(screen.getByTestId('channel-linking-dice-select')).toBeInTheDocument();
      expect(screen.getByTestId('channel-linking-gm-select')).toBeInTheDocument();
      expect(screen.getByTestId('channel-linking-announce-select')).toBeInTheDocument();
      expect(screen.getByTestId('channel-linking-voice-select')).toBeInTheDocument();
    });
  });

  describe('Link status', () => {
    it('shows Unlinked status when channel is not linked', () => {
      render(
        <ChannelLinkingPanel
          channelLinks={createChannelLinks()}
          channels={allChannels}
          onChange={() => {}}
          onSave={() => {}}
        />
      );

      expect(screen.getByTestId('channel-linking-ic-status')).toHaveTextContent('○ Unlinked');
    });

    it('shows Linked status when channel is linked', () => {
      render(
        <ChannelLinkingPanel
          channelLinks={createChannelLinks({ ic: 'ch-1' })}
          channels={allChannels}
          onChange={() => {}}
          onSave={() => {}}
        />
      );

      expect(screen.getByTestId('channel-linking-ic-status')).toHaveTextContent('✓ Linked');
    });
  });

  describe('Channel selection', () => {
    it('calls onChange when channel is selected', () => {
      const handleChange = vi.fn();
      render(
        <ChannelLinkingPanel
          channelLinks={createChannelLinks()}
          channels={allChannels}
          onChange={handleChange}
          onSave={() => {}}
        />
      );

      const select = screen.getByTestId('channel-linking-ic-select');
      fireEvent.change(select, { target: { value: 'ch-1' } });

      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({ ic: 'ch-1' })
      );
    });

    it('calls onChange when voice channel is selected', () => {
      const handleChange = vi.fn();
      render(
        <ChannelLinkingPanel
          channelLinks={createChannelLinks()}
          channels={allChannels}
          onChange={handleChange}
          onSave={() => {}}
        />
      );

      const select = screen.getByTestId('channel-linking-voice-select');
      fireEvent.change(select, { target: { value: 'vc-1' } });

      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({ voice: 'vc-1' })
      );
    });
  });

  describe('Action buttons', () => {
    it('renders Save Links button', () => {
      render(
        <ChannelLinkingPanel
          channelLinks={createChannelLinks()}
          channels={allChannels}
          onChange={() => {}}
          onSave={() => {}}
        />
      );

      expect(screen.getByTestId('channel-linking-save-btn')).toBeInTheDocument();
    });

    it('calls onSave when Save button is clicked', () => {
      const handleSave = vi.fn();
      render(
        <ChannelLinkingPanel
          channelLinks={createChannelLinks()}
          channels={allChannels}
          onChange={() => {}}
          onSave={handleSave}
        />
      );

      fireEvent.click(screen.getByTestId('channel-linking-save-btn'));
      expect(handleSave).toHaveBeenCalledTimes(1);
    });

    it('renders Refresh button when onRefresh is provided', () => {
      render(
        <ChannelLinkingPanel
          channelLinks={createChannelLinks()}
          channels={allChannels}
          onChange={() => {}}
          onSave={() => {}}
          onRefresh={() => {}}
        />
      );

      expect(screen.getByTestId('channel-linking-refresh-btn')).toBeInTheDocument();
    });

    it('does not render Refresh button when onRefresh is not provided', () => {
      render(
        <ChannelLinkingPanel
          channelLinks={createChannelLinks()}
          channels={allChannels}
          onChange={() => {}}
          onSave={() => {}}
        />
      );

      expect(screen.queryByTestId('channel-linking-refresh-btn')).not.toBeInTheDocument();
    });

    it('calls onRefresh when Refresh button is clicked', () => {
      const handleRefresh = vi.fn();
      render(
        <ChannelLinkingPanel
          channelLinks={createChannelLinks()}
          channels={allChannels}
          onChange={() => {}}
          onSave={() => {}}
          onRefresh={handleRefresh}
        />
      );

      fireEvent.click(screen.getByTestId('channel-linking-refresh-btn'));
      expect(handleRefresh).toHaveBeenCalledTimes(1);
    });
  });

  describe('TestId', () => {
    it('uses default testId', () => {
      render(
        <ChannelLinkingPanel
          channelLinks={createChannelLinks()}
          channels={allChannels}
          onChange={() => {}}
          onSave={() => {}}
        />
      );

      expect(screen.getByTestId('channel-linking')).toBeInTheDocument();
    });

    it('uses custom testId', () => {
      render(
        <ChannelLinkingPanel
          channelLinks={createChannelLinks()}
          channels={allChannels}
          onChange={() => {}}
          onSave={() => {}}
          testId="custom-channels"
        />
      );

      expect(screen.getByTestId('custom-channels')).toBeInTheDocument();
      expect(screen.getByTestId('custom-channels-ic')).toBeInTheDocument();
    });
  });
});
