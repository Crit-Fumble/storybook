import { clsx } from 'clsx';
import { Button } from '../../shared/atoms';
import { VTTStatusIndicator } from './VTTStatusIndicator';
import type { FumbleCampaign } from '../types';

export interface VTTLauncherProps {
  /** Campaign data */
  campaign: FumbleCampaign;
  /** Called when user clicks launch/stop */
  onLaunch: (campaign: FumbleCampaign) => void;
  /** Called when user clicks stop (optional - if not provided, onLaunch is used for toggle) */
  onStop?: (campaign: FumbleCampaign) => void;
  /** Whether to show connection info for direct Foundry access */
  showConnectionInfo?: boolean;
  /** Base URL for direct VTT connections (e.g., "vtt.fumblebot.com") */
  vttBaseUrl?: string;
  /** Additional CSS classes */
  className?: string;
}

export function VTTLauncher({
  campaign,
  onLaunch,
  onStop,
  showConnectionInfo = true,
  vttBaseUrl = 'vtt.fumblebot.com',
  className,
}: VTTLauncherProps) {
  const isRunning = campaign.containerStatus === 'running';
  const isStarting = campaign.containerStatus === 'starting';
  const isDisabled = isStarting;

  function handleClick() {
    if (isRunning && onStop) {
      onStop(campaign);
    } else {
      onLaunch(campaign);
    }
  }

  const connectionUrl = campaign.containerPort
    ? `https://${vttBaseUrl}/${campaign.id}/`
    : null;

  return (
    <div
      className={clsx(
        'bg-discord-background-secondary rounded-lg p-4 border border-discord-border',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-display text-discord-text-normal truncate">
            {campaign.name}
          </h3>
          {campaign.description && (
            <p className="text-sm text-discord-text-muted mt-1 line-clamp-2">
              {campaign.description}
            </p>
          )}
        </div>
        <VTTStatusIndicator
          status={campaign.containerStatus}
          lastActiveAt={campaign.lastActiveAt}
        />
      </div>

      {/* System Info */}
      {campaign.foundrySystemId && (
        <div className="text-xs text-discord-text-muted mb-3">
          System: <span className="text-discord-text-normal">{campaign.foundrySystemId}</span>
        </div>
      )}

      {/* Connection Info - shown when running and user wants to connect via FoundryVTT directly */}
      {showConnectionInfo && isRunning && connectionUrl && (
        <div className="mb-4 p-3 bg-discord-background-tertiary rounded border border-discord-border">
          <div className="text-xs text-discord-text-muted mb-1">
            Direct Connection URL (for FoundryVTT)
          </div>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-sm text-discord-text-link bg-discord-background-primary px-2 py-1 rounded font-mono truncate">
              {connectionUrl}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigator.clipboard.writeText(connectionUrl)}
              title="Copy URL"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </Button>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant={isRunning ? 'danger' : 'primary'}
          onClick={handleClick}
          disabled={isDisabled}
          className="flex-1"
        >
          {isStarting && (
            <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          )}
          {isStarting ? 'Starting...' : isRunning ? 'Stop VTT' : 'Launch VTT'}
        </Button>
      </div>
    </div>
  );
}
