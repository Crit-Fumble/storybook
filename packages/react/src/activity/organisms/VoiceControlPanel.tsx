import { useState } from 'react';
import { clsx } from 'clsx';
import { Button, Input } from '../../shared/atoms';
import { Card } from '../../shared/molecules';
import { VoiceStatusCard } from '../molecules/VoiceStatusCard';
import type { VoiceStatusResponse, DiscordChannel } from '../types';

export interface VoiceControlPanelProps {
  /** Current voice status */
  status: VoiceStatusResponse;
  /** Available voice channels to join */
  channels: DiscordChannel[];
  /** Current channel name (if connected) */
  currentChannelName?: string;
  /** Called when user wants to join a channel */
  onJoin: (channelId: string) => void;
  /** Called when user wants to leave voice */
  onLeave: () => void;
  /** Called when user wants to play audio */
  onPlay: (url: string, volume?: number) => void;
  /** Called when user wants to stop audio */
  onStop: () => void;
  /** Called when user wants to start listening */
  onStartListening: () => void;
  /** Called when user wants to stop listening */
  onStopListening: () => void;
  /** Whether actions are loading */
  isLoading?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

export function VoiceControlPanel({
  status,
  channels,
  currentChannelName,
  onJoin,
  onLeave,
  onPlay,
  onStop,
  onStartListening,
  onStopListening,
  isLoading = false,
  className,
  testId = 'voice-control-panel',
}: VoiceControlPanelProps) {
  const [selectedChannelId, setSelectedChannelId] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [volume, setVolume] = useState(100);

  // Filter to voice channels only (type 2 = voice channel)
  const voiceChannels = channels.filter((c) => c.type === 2);

  const handleJoin = () => {
    if (selectedChannelId) {
      onJoin(selectedChannelId);
    }
  };

  const handlePlay = () => {
    if (audioUrl.trim()) {
      onPlay(audioUrl.trim(), volume / 100);
      setAudioUrl('');
    }
  };

  return (
    <div className={clsx('space-y-4', className)} data-testid={testId}>
      {/* Status Card */}
      <VoiceStatusCard
        status={status}
        channelName={currentChannelName}
        testId={`${testId}-status`}
      />

      {/* Connection Controls */}
      <Card className="bg-cfg-background-secondary" testId={`${testId}-connection`}>
        <h3 className="text-sm font-medium text-cfg-text-normal mb-3">
          Connection
        </h3>

        {!status.connected ? (
          <div className="space-y-3">
            <div className="flex gap-2">
              <select
                value={selectedChannelId}
                onChange={(e) => setSelectedChannelId(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-cfg-background-tertiary text-cfg-text-normal border border-cfg-border rounded px-3 py-2 text-sm"
                data-testid={`${testId}-channel-select`}
              >
                <option value="">Select a voice channel...</option>
                {voiceChannels.map((channel) => (
                  <option key={channel.id} value={channel.id}>
                    🔊 {channel.name}
                  </option>
                ))}
              </select>
              <Button
                variant="primary"
                onClick={handleJoin}
                disabled={!selectedChannelId || isLoading}
                isLoading={isLoading}
                testId={`${testId}-join-btn`}
              >
                Join
              </Button>
            </div>
            {voiceChannels.length === 0 && (
              <p className="text-xs text-cfg-text-muted">
                No voice channels available
              </p>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-sm text-cfg-text-muted">
              Connected to {currentChannelName ? `#${currentChannelName}` : 'voice channel'}
            </span>
            <Button
              variant="danger"
              size="sm"
              onClick={onLeave}
              disabled={isLoading}
              isLoading={isLoading}
              testId={`${testId}-leave-btn`}
            >
              Leave
            </Button>
          </div>
        )}
      </Card>

      {/* Audio Controls - only show when connected */}
      {status.connected && (
        <Card className="bg-cfg-background-secondary" testId={`${testId}-audio`}>
          <h3 className="text-sm font-medium text-cfg-text-normal mb-3">
            Audio Playback
          </h3>

          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                value={audioUrl}
                onChange={(e) => setAudioUrl(e.target.value)}
                placeholder="Audio URL (mp3, ogg, etc.)"
                disabled={isLoading}
                testId={`${testId}-audio-url`}
              />
              <Button
                variant="primary"
                onClick={handlePlay}
                disabled={!audioUrl.trim() || isLoading}
                testId={`${testId}-play-btn`}
              >
                Play
              </Button>
              <Button
                variant="secondary"
                onClick={onStop}
                disabled={isLoading}
                testId={`${testId}-stop-btn`}
              >
                Stop
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-xs text-cfg-text-muted">Volume:</label>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="flex-1"
                data-testid={`${testId}-volume`}
              />
              <span className="text-xs text-cfg-text-muted w-8">{volume}%</span>
            </div>
          </div>
        </Card>
      )}

      {/* Wake Word Controls - only show when connected */}
      {status.connected && (
        <Card className="bg-cfg-background-secondary" testId={`${testId}-listening`}>
          <h3 className="text-sm font-medium text-cfg-text-normal mb-3">
            Wake Word Detection
          </h3>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-cfg-text-muted">
                {status.listening
                  ? 'Listening for "Hey FumbleBot"...'
                  : 'Enable to respond to voice commands'}
              </p>
            </div>
            {status.listening ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={onStopListening}
                disabled={isLoading}
                testId={`${testId}-stop-listening-btn`}
              >
                Stop Listening
              </Button>
            ) : (
              <Button
                variant="success"
                size="sm"
                onClick={onStartListening}
                disabled={isLoading}
                testId={`${testId}-start-listening-btn`}
              >
                Start Listening
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
