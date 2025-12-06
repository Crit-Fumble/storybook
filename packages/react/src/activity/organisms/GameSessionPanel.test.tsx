
import { render, screen, fireEvent } from '@testing-library/react';
import { GameSessionPanel } from './GameSessionPanel';
import type { GameSession, DiscordChannel } from '../types';

const createSession = (overrides: Partial<GameSession> = {}): GameSession => ({
  id: 'session-1',
  campaignId: 'campaign-1',
  name: 'Test Session',
  channelId: 'ch-1',
  voiceChannelId: 'vc-1',
  status: 'active',
  startedAt: new Date('2024-01-15T10:00:00'),
  endedAt: null,
  startedBy: 'user-1',
  summary: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

const textChannels: DiscordChannel[] = [
  { id: 'ch-1', name: 'session-log', type: 0 },
  { id: 'ch-2', name: 'general', type: 0 },
];

const voiceChannels: DiscordChannel[] = [
  { id: 'vc-1', name: 'Voice Room', type: 2 },
];

const channelNames: Record<string, string> = {
  'ch-1': 'session-log',
  'vc-1': 'Voice Room',
};

describe('GameSessionPanel', () => {
  describe('No active session', () => {
    it('shows start session form when no active session', () => {
      render(
        <GameSessionPanel
          activeSession={null}
          textChannels={textChannels}
          voiceChannels={voiceChannels}
        />
      );

      expect(screen.getByText('No active session')).toBeInTheDocument();
      expect(screen.getByTestId('game-session-panel-start-form-start-btn')).toBeInTheDocument();
    });

    it('shows channel selects', () => {
      render(
        <GameSessionPanel
          activeSession={null}
          textChannels={textChannels}
          voiceChannels={voiceChannels}
        />
      );

      expect(screen.getByTestId('game-session-panel-start-form-channel-select')).toBeInTheDocument();
      expect(screen.getByTestId('game-session-panel-start-form-voice-select')).toBeInTheDocument();
    });

    it('calls onStartSession when form is submitted', () => {
      const handleStart = jest.fn();
      render(
        <GameSessionPanel
          activeSession={null}
          textChannels={textChannels}
          voiceChannels={voiceChannels}
          onStartSession={handleStart}
        />
      );

      // Select a channel
      const channelSelect = screen.getByTestId('game-session-panel-start-form-channel-select');
      fireEvent.change(channelSelect, { target: { value: 'ch-1' } });

      // Submit form
      const startBtn = screen.getByTestId('game-session-panel-start-form-start-btn');
      fireEvent.click(startBtn);

      expect(handleStart).toHaveBeenCalledWith('ch-1', undefined, undefined);
    });

    it('shows message when no channels available', () => {
      render(
        <GameSessionPanel
          activeSession={null}
          textChannels={[]}
          voiceChannels={[]}
        />
      );

      expect(screen.getByText(/No text channels available/)).toBeInTheDocument();
    });
  });

  describe('With active session', () => {
    it('shows active session card', () => {
      render(
        <GameSessionPanel
          activeSession={createSession()}
          channelNames={channelNames}
        />
      );

      expect(screen.getByTestId('game-session-panel-active-session')).toBeInTheDocument();
      expect(screen.getByText('Test Session')).toBeInTheDocument();
    });

    it('shows Pause button for active session', () => {
      const handlePause = jest.fn();
      render(
        <GameSessionPanel
          activeSession={createSession()}
          onPauseSession={handlePause}
        />
      );

      const pauseBtn = screen.getByTestId('game-session-panel-active-session-pause-btn');
      fireEvent.click(pauseBtn);
      expect(handlePause).toHaveBeenCalledWith('session-1');
    });

    it('shows End button', () => {
      const handleEnd = jest.fn();
      render(
        <GameSessionPanel
          activeSession={createSession()}
          onEndSession={handleEnd}
        />
      );

      const endBtn = screen.getByTestId('game-session-panel-active-session-end-btn');
      fireEvent.click(endBtn);
      expect(handleEnd).toHaveBeenCalledWith('session-1');
    });

    it('does not show start form when session is active', () => {
      render(
        <GameSessionPanel
          activeSession={createSession()}
          textChannels={textChannels}
        />
      );

      expect(screen.queryByTestId('game-session-panel-start-form')).not.toBeInTheDocument();
    });
  });

  describe('With paused session', () => {
    it('shows Resume button for paused session', () => {
      const handleResume = jest.fn();
      render(
        <GameSessionPanel
          activeSession={createSession({ status: 'paused' })}
          onResumeSession={handleResume}
        />
      );

      const resumeBtn = screen.getByTestId('game-session-panel-active-session-resume-btn');
      fireEvent.click(resumeBtn);
      expect(handleResume).toHaveBeenCalledWith('session-1');
    });
  });

  describe('Recent sessions', () => {
    it('shows recent sessions section', () => {
      const recentSessions = [
        createSession({ id: 'old-1', name: 'Old Session 1', status: 'ended', endedAt: new Date() }),
        createSession({ id: 'old-2', name: 'Old Session 2', status: 'ended', endedAt: new Date() }),
      ];

      render(
        <GameSessionPanel
          activeSession={null}
          textChannels={textChannels}
          recentSessions={recentSessions}
        />
      );

      expect(screen.getByText('Recent Sessions')).toBeInTheDocument();
      expect(screen.getByTestId('game-session-panel-recent-0')).toBeInTheDocument();
      expect(screen.getByTestId('game-session-panel-recent-1')).toBeInTheDocument();
    });

    it('does not show recent sessions when empty', () => {
      render(
        <GameSessionPanel
          activeSession={null}
          textChannels={textChannels}
          recentSessions={[]}
        />
      );

      expect(screen.queryByText('Recent Sessions')).not.toBeInTheDocument();
    });

    it('calls onViewSession for recent sessions', () => {
      const handleView = jest.fn();
      const recentSessions = [
        createSession({ id: 'old-1', status: 'ended', endedAt: new Date() }),
      ];

      render(
        <GameSessionPanel
          activeSession={null}
          textChannels={textChannels}
          recentSessions={recentSessions}
          onViewSession={handleView}
        />
      );

      const viewBtn = screen.getByTestId('game-session-panel-recent-0-view-btn');
      fireEvent.click(viewBtn);
      expect(handleView).toHaveBeenCalledWith('old-1');
    });
  });

  describe('Channel names', () => {
    it('displays channel names from lookup', () => {
      render(
        <GameSessionPanel
          activeSession={createSession()}
          channelNames={channelNames}
        />
      );

      expect(screen.getByTestId('game-session-panel-active-session-channel')).toHaveTextContent('session-log');
      expect(screen.getByTestId('game-session-panel-active-session-voice-channel')).toHaveTextContent('Voice Room');
    });
  });

  it('applies custom className', () => {
    render(
      <GameSessionPanel
        activeSession={null}
        textChannels={textChannels}
        className="custom-class"
      />
    );

    expect(screen.getByTestId('game-session-panel')).toHaveClass('custom-class');
  });
});
