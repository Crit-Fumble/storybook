
import { render, screen, fireEvent } from '@testing-library/react';
import { GameSessionCard } from './GameSessionCard';
import type { GameSession } from '../types';

const createSession = (overrides: Partial<GameSession> = {}): GameSession => ({
  id: 'session-1',
  campaignId: 'campaign-1',
  name: 'Test Session',
  channelId: 'channel-123',
  voiceChannelId: 'voice-456',
  status: 'active',
  startedAt: new Date('2024-01-15T10:00:00'),
  endedAt: null,
  startedBy: 'user-1',
  summary: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

describe('GameSessionCard', () => {
  describe('Active session', () => {
    it('renders session name', () => {
      render(<GameSessionCard session={createSession()} />);
      expect(screen.getByTestId('game-session-card-name')).toHaveTextContent('Test Session');
    });

    it('shows Live badge for active status', () => {
      render(<GameSessionCard session={createSession()} />);
      expect(screen.getByTestId('game-session-card-status')).toHaveTextContent('Live');
    });

    it('shows Pause button when onPause provided', () => {
      const handlePause = jest.fn();
      render(<GameSessionCard session={createSession()} onPause={handlePause} />);

      const pauseBtn = screen.getByTestId('game-session-card-pause-btn');
      fireEvent.click(pauseBtn);
      expect(handlePause).toHaveBeenCalled();
    });

    it('shows End button when onEnd provided', () => {
      const handleEnd = jest.fn();
      render(<GameSessionCard session={createSession()} onEnd={handleEnd} />);

      const endBtn = screen.getByTestId('game-session-card-end-btn');
      fireEvent.click(endBtn);
      expect(handleEnd).toHaveBeenCalled();
    });

    it('does not show Resume button for active session', () => {
      render(<GameSessionCard session={createSession()} onResume={() => {}} />);
      expect(screen.queryByTestId('game-session-card-resume-btn')).not.toBeInTheDocument();
    });
  });

  describe('Paused session', () => {
    it('shows Paused badge', () => {
      render(<GameSessionCard session={createSession({ status: 'paused' })} />);
      expect(screen.getByTestId('game-session-card-status')).toHaveTextContent('Paused');
    });

    it('shows Resume button when onResume provided', () => {
      const handleResume = jest.fn();
      render(
        <GameSessionCard
          session={createSession({ status: 'paused' })}
          onResume={handleResume}
        />
      );

      const resumeBtn = screen.getByTestId('game-session-card-resume-btn');
      fireEvent.click(resumeBtn);
      expect(handleResume).toHaveBeenCalled();
    });

    it('does not show Pause button for paused session', () => {
      render(
        <GameSessionCard
          session={createSession({ status: 'paused' })}
          onPause={() => {}}
        />
      );
      expect(screen.queryByTestId('game-session-card-pause-btn')).not.toBeInTheDocument();
    });
  });

  describe('Ended session', () => {
    it('shows Ended badge', () => {
      render(
        <GameSessionCard
          session={createSession({ status: 'ended', endedAt: new Date() })}
        />
      );
      expect(screen.getByTestId('game-session-card-status')).toHaveTextContent('Ended');
    });

    it('shows ended time', () => {
      render(
        <GameSessionCard
          session={createSession({
            status: 'ended',
            endedAt: new Date('2024-01-15T14:00:00'),
          })}
        />
      );
      expect(screen.getByTestId('game-session-card-ended')).toBeInTheDocument();
    });

    it('does not show Pause or Resume buttons', () => {
      render(
        <GameSessionCard
          session={createSession({ status: 'ended', endedAt: new Date() })}
          onPause={() => {}}
          onResume={() => {}}
        />
      );
      expect(screen.queryByTestId('game-session-card-pause-btn')).not.toBeInTheDocument();
      expect(screen.queryByTestId('game-session-card-resume-btn')).not.toBeInTheDocument();
    });

    it('does not show End button', () => {
      render(
        <GameSessionCard
          session={createSession({ status: 'ended', endedAt: new Date() })}
          onEnd={() => {}}
        />
      );
      expect(screen.queryByTestId('game-session-card-end-btn')).not.toBeInTheDocument();
    });
  });

  describe('Session details', () => {
    it('shows start time', () => {
      render(<GameSessionCard session={createSession()} />);
      expect(screen.getByTestId('game-session-card-started')).toBeInTheDocument();
    });

    it('shows duration', () => {
      render(<GameSessionCard session={createSession()} />);
      expect(screen.getByTestId('game-session-card-duration')).toBeInTheDocument();
    });

    it('shows channel name when provided', () => {
      render(<GameSessionCard session={createSession()} channelName="game-chat" />);
      expect(screen.getByTestId('game-session-card-channel')).toHaveTextContent('#game-chat');
    });

    it('shows voice channel name when provided', () => {
      render(<GameSessionCard session={createSession()} voiceChannelName="Voice Room" />);
      expect(screen.getByTestId('game-session-card-voice-channel')).toHaveTextContent('#Voice Room');
    });

    it('shows Unnamed Session when name is null', () => {
      render(<GameSessionCard session={createSession({ name: null })} />);
      expect(screen.getByTestId('game-session-card-name')).toHaveTextContent('Unnamed Session');
    });

    it('shows summary when provided', () => {
      render(
        <GameSessionCard
          session={createSession({
            status: 'ended',
            endedAt: new Date(),
            summary: 'The party defeated the dragon.',
          })}
        />
      );
      expect(screen.getByTestId('game-session-card-summary')).toHaveTextContent(
        'The party defeated the dragon.'
      );
    });

    it('does not show summary when null', () => {
      render(<GameSessionCard session={createSession()} />);
      expect(screen.queryByTestId('game-session-card-summary')).not.toBeInTheDocument();
    });
  });

  describe('View button', () => {
    it('shows View button when onView provided', () => {
      const handleView = jest.fn();
      render(<GameSessionCard session={createSession()} onView={handleView} />);

      const viewBtn = screen.getByTestId('game-session-card-view-btn');
      fireEvent.click(viewBtn);
      expect(handleView).toHaveBeenCalled();
    });

    it('View button is always enabled even when loading', () => {
      render(
        <GameSessionCard session={createSession()} onView={() => {}} isLoading={true} />
      );
      expect(screen.getByTestId('game-session-card-view-btn')).not.toBeDisabled();
    });
  });

  describe('Loading state', () => {
    it('disables action buttons when loading', () => {
      render(
        <GameSessionCard
          session={createSession()}
          onPause={() => {}}
          onEnd={() => {}}
          isLoading={true}
        />
      );

      expect(screen.getByTestId('game-session-card-pause-btn')).toBeDisabled();
      expect(screen.getByTestId('game-session-card-end-btn')).toBeDisabled();
    });
  });

  it('applies custom className', () => {
    render(<GameSessionCard session={createSession()} className="custom-class" />);
    expect(screen.getByTestId('game-session-card')).toHaveClass('custom-class');
  });

  it('uses custom testId', () => {
    render(<GameSessionCard session={createSession()} testId="custom-id" />);
    expect(screen.getByTestId('custom-id')).toBeInTheDocument();
  });
});
