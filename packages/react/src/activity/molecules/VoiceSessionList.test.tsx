import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { VoiceSessionList } from './VoiceSessionList';
import type { VoiceSessionsResponse } from '../types';

describe('VoiceSessionList', () => {
  const emptySessions: VoiceSessionsResponse = {
    sessions: [],
    count: 0,
  };

  const singleSession: VoiceSessionsResponse = {
    sessions: [
      { guildId: 'guild-1', channelId: 'channel-1', listening: false },
    ],
    count: 1,
  };

  const multipleSessions: VoiceSessionsResponse = {
    sessions: [
      { guildId: 'guild-1', channelId: 'channel-1', listening: true },
      { guildId: 'guild-2', channelId: 'channel-2', listening: false },
    ],
    count: 2,
  };

  const guildNames = {
    'guild-1': 'Test Guild',
    'guild-2': 'Another Guild',
  };

  const channelNames = {
    'channel-1': 'Voice Chat',
    'channel-2': 'Game Room',
  };

  describe('rendering', () => {
    it('renders with default testId', () => {
      render(<VoiceSessionList sessions={emptySessions} />);
      expect(screen.getByTestId('voice-session-list')).toBeInTheDocument();
    });

    it('renders with custom testId', () => {
      render(<VoiceSessionList sessions={emptySessions} testId="custom-list" />);
      expect(screen.getByTestId('custom-list')).toBeInTheDocument();
    });
  });

  describe('empty state', () => {
    it('shows empty message when no sessions', () => {
      render(<VoiceSessionList sessions={emptySessions} />);
      expect(screen.getByTestId('voice-session-list-empty')).toBeInTheDocument();
      expect(screen.getByText('No active voice sessions')).toBeInTheDocument();
    });

    it('does not show count badge when empty', () => {
      render(<VoiceSessionList sessions={emptySessions} />);
      expect(screen.queryByTestId('voice-session-list-count')).not.toBeInTheDocument();
    });
  });

  describe('with sessions', () => {
    it('shows session count', () => {
      render(<VoiceSessionList sessions={multipleSessions} />);
      expect(screen.getByTestId('voice-session-list-count')).toHaveTextContent('2');
    });

    it('renders all sessions', () => {
      render(<VoiceSessionList sessions={multipleSessions} />);
      expect(screen.getByTestId('voice-session-list-item-0')).toBeInTheDocument();
      expect(screen.getByTestId('voice-session-list-item-1')).toBeInTheDocument();
    });

    it('shows guild IDs when names not provided', () => {
      render(<VoiceSessionList sessions={singleSession} />);
      expect(screen.getByTestId('voice-session-list-item-0-guild')).toHaveTextContent('guild-1');
    });

    it('shows guild names when provided', () => {
      render(<VoiceSessionList sessions={singleSession} guildNames={guildNames} />);
      expect(screen.getByTestId('voice-session-list-item-0-guild')).toHaveTextContent('Test Guild');
    });

    it('shows channel IDs when names not provided', () => {
      render(<VoiceSessionList sessions={singleSession} />);
      expect(screen.getByTestId('voice-session-list-item-0-channel')).toHaveTextContent('#channel-1');
    });

    it('shows channel names when provided', () => {
      render(<VoiceSessionList sessions={singleSession} channelNames={channelNames} />);
      expect(screen.getByTestId('voice-session-list-item-0-channel')).toHaveTextContent('#Voice Chat');
    });
  });

  describe('listening indicator', () => {
    it('shows listening indicator for listening sessions', () => {
      render(<VoiceSessionList sessions={multipleSessions} />);
      expect(screen.getByTestId('voice-session-list-item-0-listening')).toBeInTheDocument();
    });

    it('does not show listening indicator for non-listening sessions', () => {
      render(<VoiceSessionList sessions={multipleSessions} />);
      expect(screen.queryByTestId('voice-session-list-item-1-listening')).not.toBeInTheDocument();
    });
  });

  describe('click handling', () => {
    it('calls onSessionClick when session is clicked', () => {
      const onSessionClick = vi.fn();
      render(<VoiceSessionList sessions={singleSession} onSessionClick={onSessionClick} />);

      fireEvent.click(screen.getByTestId('voice-session-list-item-0'));
      expect(onSessionClick).toHaveBeenCalledWith('guild-1', 'channel-1');
    });

    it('does not throw when clicked without handler', () => {
      render(<VoiceSessionList sessions={singleSession} />);
      expect(() => {
        fireEvent.click(screen.getByTestId('voice-session-list-item-0'));
      }).not.toThrow();
    });
  });

  describe('styling', () => {
    it('applies custom className', () => {
      render(<VoiceSessionList sessions={emptySessions} className="custom-class" />);
      expect(screen.getByTestId('voice-session-list')).toHaveClass('custom-class');
    });
  });
});
