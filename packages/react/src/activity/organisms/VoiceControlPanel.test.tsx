import { render, screen, fireEvent } from '@testing-library/react';
import { VoiceControlPanel } from './VoiceControlPanel';
import type { VoiceStatusResponse, DiscordChannel } from '../types';

describe('VoiceControlPanel', () => {
  const mockChannels: DiscordChannel[] = [
    { id: 'voice-1', name: 'General Voice', type: 2 },
    { id: 'voice-2', name: 'Game Session', type: 2 },
    { id: 'text-1', name: 'Text Channel', type: 0 },
  ];

  const disconnectedStatus: VoiceStatusResponse = {
    guildId: 'guild-123',
    connected: false,
    channelId: null,
    listening: false,
  };

  const connectedStatus: VoiceStatusResponse = {
    guildId: 'guild-123',
    connected: true,
    channelId: 'voice-1',
    listening: false,
  };

  const listeningStatus: VoiceStatusResponse = {
    guildId: 'guild-123',
    connected: true,
    channelId: 'voice-1',
    listening: true,
  };

  const defaultProps = {
    status: disconnectedStatus,
    channels: mockChannels,
    onJoin: jest.fn(),
    onLeave: jest.fn(),
    onPlay: jest.fn(),
    onStop: jest.fn(),
    onStartListening: jest.fn(),
    onStopListening: jest.fn(),
  };

  describe('rendering', () => {
    it('renders with default testId', () => {
      render(<VoiceControlPanel {...defaultProps} />);
      expect(screen.getByTestId('voice-control-panel')).toBeInTheDocument();
    });

    it('renders with custom testId', () => {
      render(<VoiceControlPanel {...defaultProps} testId="custom-panel" />);
      expect(screen.getByTestId('custom-panel')).toBeInTheDocument();
    });

    it('renders status card', () => {
      render(<VoiceControlPanel {...defaultProps} />);
      expect(screen.getByTestId('voice-control-panel-status')).toBeInTheDocument();
    });

    it('renders connection card', () => {
      render(<VoiceControlPanel {...defaultProps} />);
      expect(screen.getByTestId('voice-control-panel-connection')).toBeInTheDocument();
    });
  });

  describe('disconnected state', () => {
    it('shows channel select dropdown', () => {
      render(<VoiceControlPanel {...defaultProps} />);
      expect(screen.getByTestId('voice-control-panel-channel-select')).toBeInTheDocument();
    });

    it('filters to only show voice channels', () => {
      render(<VoiceControlPanel {...defaultProps} />);
      const select = screen.getByTestId('voice-control-panel-channel-select');
      // Should have placeholder + 2 voice channels (not the text channel)
      expect(select.querySelectorAll('option')).toHaveLength(3);
    });

    it('shows join button', () => {
      render(<VoiceControlPanel {...defaultProps} />);
      expect(screen.getByTestId('voice-control-panel-join-btn')).toBeInTheDocument();
    });

    it('join button is disabled when no channel selected', () => {
      render(<VoiceControlPanel {...defaultProps} />);
      expect(screen.getByTestId('voice-control-panel-join-btn')).toBeDisabled();
    });

    it('calls onJoin when join button clicked with selected channel', () => {
      const onJoin = jest.fn();
      render(<VoiceControlPanel {...defaultProps} onJoin={onJoin} />);

      const select = screen.getByTestId('voice-control-panel-channel-select');
      fireEvent.change(select, { target: { value: 'voice-1' } });

      fireEvent.click(screen.getByTestId('voice-control-panel-join-btn'));
      expect(onJoin).toHaveBeenCalledWith('voice-1');
    });

    it('does not show audio controls when disconnected', () => {
      render(<VoiceControlPanel {...defaultProps} />);
      expect(screen.queryByTestId('voice-control-panel-audio')).not.toBeInTheDocument();
    });

    it('does not show listening controls when disconnected', () => {
      render(<VoiceControlPanel {...defaultProps} />);
      expect(screen.queryByTestId('voice-control-panel-listening')).not.toBeInTheDocument();
    });
  });

  describe('connected state', () => {
    it('shows leave button', () => {
      render(<VoiceControlPanel {...defaultProps} status={connectedStatus} />);
      expect(screen.getByTestId('voice-control-panel-leave-btn')).toBeInTheDocument();
    });

    it('calls onLeave when leave button clicked', () => {
      const onLeave = jest.fn();
      render(<VoiceControlPanel {...defaultProps} status={connectedStatus} onLeave={onLeave} />);

      fireEvent.click(screen.getByTestId('voice-control-panel-leave-btn'));
      expect(onLeave).toHaveBeenCalled();
    });

    it('shows audio controls', () => {
      render(<VoiceControlPanel {...defaultProps} status={connectedStatus} />);
      expect(screen.getByTestId('voice-control-panel-audio')).toBeInTheDocument();
    });

    it('shows audio URL input', () => {
      render(<VoiceControlPanel {...defaultProps} status={connectedStatus} />);
      expect(screen.getByTestId('voice-control-panel-audio-url')).toBeInTheDocument();
    });

    it('shows play and stop buttons', () => {
      render(<VoiceControlPanel {...defaultProps} status={connectedStatus} />);
      expect(screen.getByTestId('voice-control-panel-play-btn')).toBeInTheDocument();
      expect(screen.getByTestId('voice-control-panel-stop-btn')).toBeInTheDocument();
    });

    it('calls onPlay with URL when play clicked', () => {
      const onPlay = jest.fn();
      render(<VoiceControlPanel {...defaultProps} status={connectedStatus} onPlay={onPlay} />);

      const input = screen.getByTestId('voice-control-panel-audio-url');
      fireEvent.change(input, { target: { value: 'https://example.com/audio.mp3' } });

      fireEvent.click(screen.getByTestId('voice-control-panel-play-btn'));
      expect(onPlay).toHaveBeenCalledWith('https://example.com/audio.mp3', 1);
    });

    it('calls onStop when stop clicked', () => {
      const onStop = jest.fn();
      render(<VoiceControlPanel {...defaultProps} status={connectedStatus} onStop={onStop} />);

      fireEvent.click(screen.getByTestId('voice-control-panel-stop-btn'));
      expect(onStop).toHaveBeenCalled();
    });

    it('shows listening controls', () => {
      render(<VoiceControlPanel {...defaultProps} status={connectedStatus} />);
      expect(screen.getByTestId('voice-control-panel-listening')).toBeInTheDocument();
    });

    it('shows start listening button when not listening', () => {
      render(<VoiceControlPanel {...defaultProps} status={connectedStatus} />);
      expect(screen.getByTestId('voice-control-panel-start-listening-btn')).toBeInTheDocument();
    });

    it('calls onStartListening when start listening clicked', () => {
      const onStartListening = jest.fn();
      render(<VoiceControlPanel {...defaultProps} status={connectedStatus} onStartListening={onStartListening} />);

      fireEvent.click(screen.getByTestId('voice-control-panel-start-listening-btn'));
      expect(onStartListening).toHaveBeenCalled();
    });
  });

  describe('listening state', () => {
    it('shows stop listening button when listening', () => {
      render(<VoiceControlPanel {...defaultProps} status={listeningStatus} />);
      expect(screen.getByTestId('voice-control-panel-stop-listening-btn')).toBeInTheDocument();
    });

    it('calls onStopListening when stop listening clicked', () => {
      const onStopListening = jest.fn();
      render(<VoiceControlPanel {...defaultProps} status={listeningStatus} onStopListening={onStopListening} />);

      fireEvent.click(screen.getByTestId('voice-control-panel-stop-listening-btn'));
      expect(onStopListening).toHaveBeenCalled();
    });
  });

  describe('loading state', () => {
    it('disables join button when loading', () => {
      render(<VoiceControlPanel {...defaultProps} isLoading={true} />);
      expect(screen.getByTestId('voice-control-panel-join-btn')).toBeDisabled();
    });

    it('disables leave button when loading', () => {
      render(<VoiceControlPanel {...defaultProps} status={connectedStatus} isLoading={true} />);
      expect(screen.getByTestId('voice-control-panel-leave-btn')).toBeDisabled();
    });
  });

  describe('no channels', () => {
    it('shows message when no voice channels available', () => {
      render(<VoiceControlPanel {...defaultProps} channels={[]} />);
      expect(screen.getByText('No voice channels available')).toBeInTheDocument();
    });
  });
});
