import { render, screen } from '@testing-library/react';
import { VoiceStatusCard } from './VoiceStatusCard';
import type { VoiceStatusResponse } from '../types';

describe('VoiceStatusCard', () => {
  const disconnectedStatus: VoiceStatusResponse = {
    guildId: 'guild-123',
    connected: false,
    channelId: null,
    listening: false,
  };

  const connectedStatus: VoiceStatusResponse = {
    guildId: 'guild-123',
    connected: true,
    channelId: 'channel-456',
    listening: false,
  };

  const listeningStatus: VoiceStatusResponse = {
    guildId: 'guild-123',
    connected: true,
    channelId: 'channel-456',
    listening: true,
  };

  describe('rendering', () => {
    it('renders with default testId', () => {
      render(<VoiceStatusCard status={disconnectedStatus} />);
      expect(screen.getByTestId('voice-status-card')).toBeInTheDocument();
    });

    it('renders with custom testId', () => {
      render(<VoiceStatusCard status={disconnectedStatus} testId="custom-voice" />);
      expect(screen.getByTestId('custom-voice')).toBeInTheDocument();
    });

    it('renders Voice label', () => {
      render(<VoiceStatusCard status={disconnectedStatus} />);
      expect(screen.getByTestId('voice-status-card-label')).toHaveTextContent('Voice');
    });
  });

  describe('disconnected state', () => {
    it('shows Disconnected status', () => {
      render(<VoiceStatusCard status={disconnectedStatus} />);
      expect(screen.getByTestId('voice-status-card-status')).toHaveTextContent('Disconnected');
    });

    it('does not show listening indicator', () => {
      render(<VoiceStatusCard status={disconnectedStatus} />);
      expect(screen.queryByTestId('voice-status-card-listening')).not.toBeInTheDocument();
    });
  });

  describe('connected state', () => {
    it('shows Connected status', () => {
      render(<VoiceStatusCard status={connectedStatus} />);
      expect(screen.getByTestId('voice-status-card-status')).toHaveTextContent('Connected');
    });

    it('shows channel name when provided', () => {
      render(<VoiceStatusCard status={connectedStatus} channelName="Voice Chat" />);
      expect(screen.getByTestId('voice-status-card-status')).toHaveTextContent('in #Voice Chat');
    });

    it('shows generic channel text when name not provided', () => {
      render(<VoiceStatusCard status={connectedStatus} />);
      expect(screen.getByTestId('voice-status-card-status')).toHaveTextContent('in channel');
    });

    it('does not show listening indicator when not listening', () => {
      render(<VoiceStatusCard status={connectedStatus} />);
      expect(screen.queryByTestId('voice-status-card-listening')).not.toBeInTheDocument();
    });
  });

  describe('listening state', () => {
    it('shows Listening status', () => {
      render(<VoiceStatusCard status={listeningStatus} />);
      expect(screen.getByTestId('voice-status-card-status')).toHaveTextContent('Listening');
    });

    it('shows listening indicator', () => {
      render(<VoiceStatusCard status={listeningStatus} />);
      expect(screen.getByTestId('voice-status-card-listening')).toBeInTheDocument();
      expect(screen.getByTestId('voice-status-card-listening')).toHaveTextContent('Listening');
    });
  });

  describe('styling', () => {
    it('applies custom className', () => {
      render(<VoiceStatusCard status={disconnectedStatus} className="custom-class" />);
      expect(screen.getByTestId('voice-status-card')).toHaveClass('custom-class');
    });
  });
});
