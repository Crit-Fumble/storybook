import { clsx } from 'clsx';
import { Card } from '../../shared/molecules';
import { Button, Select } from '../../shared/atoms';
import { GameSessionCard } from '../molecules/GameSessionCard';
import type { GameSession, DiscordChannel } from '../types';

export interface GameSessionPanelProps {
  /** Current active session (if any) */
  activeSession: GameSession | null;
  /** Recent sessions history */
  recentSessions?: GameSession[];
  /** Available text channels for starting a session */
  textChannels?: DiscordChannel[];
  /** Available voice channels */
  voiceChannels?: DiscordChannel[];
  /** Channel names lookup (for display) */
  channelNames?: Record<string, string>;
  /** Called when start session button is clicked */
  onStartSession?: (channelId: string, voiceChannelId?: string, name?: string) => void;
  /** Called when resume is clicked */
  onResumeSession?: (sessionId: string) => void;
  /** Called when pause is clicked */
  onPauseSession?: (sessionId: string) => void;
  /** Called when end is clicked */
  onEndSession?: (sessionId: string) => void;
  /** Called when view session is clicked */
  onViewSession?: (sessionId: string) => void;
  /** Whether an action is in progress */
  isLoading?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

export function GameSessionPanel({
  activeSession,
  recentSessions = [],
  textChannels = [],
  voiceChannels = [],
  channelNames = {},
  onStartSession,
  onResumeSession,
  onPauseSession,
  onEndSession,
  onViewSession,
  isLoading = false,
  className,
  testId = 'game-session-panel',
}: GameSessionPanelProps) {
  const hasActiveOrPausedSession = activeSession && activeSession.status !== 'ended';

  return (
    <div className={clsx('space-y-6', className)} data-testid={testId}>
      {/* Current Session */}
      <section data-testid={`${testId}-current`}>
        <h3 className="text-sm font-medium text-cfg-text-muted mb-3">
          Current Session
        </h3>

        {hasActiveOrPausedSession ? (
          <GameSessionCard
            session={activeSession}
            channelName={channelNames[activeSession.channelId]}
            voiceChannelName={
              activeSession.voiceChannelId
                ? channelNames[activeSession.voiceChannelId]
                : undefined
            }
            onPause={
              activeSession.status === 'active' && onPauseSession
                ? () => onPauseSession(activeSession.id)
                : undefined
            }
            onResume={
              activeSession.status === 'paused' && onResumeSession
                ? () => onResumeSession(activeSession.id)
                : undefined
            }
            onEnd={onEndSession ? () => onEndSession(activeSession.id) : undefined}
            onView={onViewSession ? () => onViewSession(activeSession.id) : undefined}
            isLoading={isLoading}
            testId={`${testId}-active-session`}
          />
        ) : (
          <StartSessionForm
            textChannels={textChannels}
            voiceChannels={voiceChannels}
            onStart={onStartSession}
            isLoading={isLoading}
            testId={`${testId}-start-form`}
          />
        )}
      </section>

      {/* Recent Sessions */}
      {recentSessions.length > 0 && (
        <section data-testid={`${testId}-recent`}>
          <h3 className="text-sm font-medium text-cfg-text-muted mb-3">
            Recent Sessions
          </h3>
          <div className="space-y-3">
            {recentSessions.map((session, index) => (
              <GameSessionCard
                key={session.id}
                session={session}
                channelName={channelNames[session.channelId]}
                voiceChannelName={
                  session.voiceChannelId
                    ? channelNames[session.voiceChannelId]
                    : undefined
                }
                onView={onViewSession ? () => onViewSession(session.id) : undefined}
                testId={`${testId}-recent-${index}`}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

interface StartSessionFormProps {
  textChannels: DiscordChannel[];
  voiceChannels: DiscordChannel[];
  onStart?: (channelId: string, voiceChannelId?: string, name?: string) => void;
  isLoading: boolean;
  testId: string;
}

function StartSessionForm({
  textChannels,
  voiceChannels,
  onStart,
  isLoading,
  testId,
}: StartSessionFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!onStart) return;

    const formData = new FormData(e.currentTarget);
    const channelId = formData.get('channelId') as string;
    const voiceChannelId = formData.get('voiceChannelId') as string;
    const name = formData.get('name') as string;

    if (channelId) {
      onStart(channelId, voiceChannelId || undefined, name || undefined);
    }
  };

  const textChannelOptions = textChannels.map((ch) => ({
    value: ch.id,
    label: `#${ch.name}`,
  }));

  const voiceChannelOptions = [
    { value: '', label: 'None' },
    ...voiceChannels.map((ch) => ({
      value: ch.id,
      label: `🔊 ${ch.name}`,
    })),
  ];

  return (
    <Card className="bg-cfg-background-secondary" testId={testId}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-center py-2">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-cfg-background-tertiary flex items-center justify-center">
            <svg
              className="w-6 h-6 text-cfg-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-sm text-cfg-text-muted">No active session</p>
        </div>

        {textChannels.length > 0 && (
          <>
            <div>
              <label className="block text-xs font-medium text-cfg-text-muted mb-1">
                Session Name (optional)
              </label>
              <input
                name="name"
                type="text"
                placeholder="e.g., Session 12: The Dragon's Lair"
                className="w-full px-3 py-2 bg-cfg-background-tertiary border border-cfg-border rounded text-sm text-cfg-text-normal placeholder:text-cfg-text-muted/50 focus:outline-none focus:border-cfg-accent"
                data-testid={`${testId}-name-input`}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-cfg-text-muted mb-1">
                Text Channel *
              </label>
              <Select
                name="channelId"
                options={textChannelOptions}
                placeholder="Select channel..."
                required
                testId={`${testId}-channel-select`}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-cfg-text-muted mb-1">
                Voice Channel (optional)
              </label>
              <Select
                name="voiceChannelId"
                options={voiceChannelOptions}
                testId={`${testId}-voice-select`}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isLoading || textChannels.length === 0}
              className="w-full"
              testId={`${testId}-start-btn`}
            >
              {isLoading ? 'Starting...' : 'Start Session'}
            </Button>
          </>
        )}

        {textChannels.length === 0 && (
          <p className="text-sm text-cfg-text-muted text-center">
            No text channels available. Configure channel links first.
          </p>
        )}
      </form>
    </Card>
  );
}
