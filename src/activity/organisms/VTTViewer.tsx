import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { Spinner, Button } from '../../shared/atoms';
import type { ContainerStatus } from '../types';

export interface VTTViewerProps {
  /** Campaign ID for routing */
  campaignId: string;
  /** Container port for the VTT instance */
  containerPort?: number;
  /** Current container status */
  status: ContainerStatus;
  /** Base URL for VTT connections */
  vttBaseUrl?: string;
  /** Called when user wants to launch the container */
  onLaunch?: () => void;
  /** Called when iframe fails to load */
  onError?: (error: Error) => void;
  /** Additional CSS classes */
  className?: string;
}

type ViewerState = 'loading' | 'ready' | 'error' | 'stopped' | 'starting';

export function VTTViewer({
  campaignId,
  containerPort,
  status,
  vttBaseUrl = 'vtt.fumblebot.com',
  onLaunch,
  onError,
  className,
}: VTTViewerProps) {
  const [viewerState, setViewerState] = useState<ViewerState>('stopped');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Derive viewer state from container status
  useEffect(() => {
    switch (status) {
      case 'stopped':
        setViewerState('stopped');
        break;
      case 'starting':
        setViewerState('starting');
        break;
      case 'running':
        if (containerPort) {
          setViewerState('loading');
        } else {
          setViewerState('error');
          setErrorMessage('Container is running but no port assigned');
        }
        break;
      case 'error':
        setViewerState('error');
        setErrorMessage('Container encountered an error');
        break;
    }
  }, [status, containerPort]);

  function handleIframeLoad() {
    setViewerState('ready');
  }

  function handleIframeError() {
    setViewerState('error');
    setErrorMessage('Failed to load VTT. The container may still be initializing.');
    onError?.(new Error('Failed to load VTT iframe'));
  }

  const vttUrl = containerPort
    ? `https://${vttBaseUrl}/${campaignId}/`
    : null;

  return (
    <div
      className={clsx(
        'relative bg-discord-background-tertiary rounded-lg overflow-hidden',
        'border border-discord-border',
        className
      )}
    >
      {/* Loading State */}
      {viewerState === 'loading' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-discord-background-tertiary z-10">
          <Spinner size="lg" />
          <p className="mt-4 text-discord-text-muted">Loading FoundryVTT...</p>
        </div>
      )}

      {/* Starting State */}
      {viewerState === 'starting' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-discord-background-tertiary">
          <Spinner size="lg" />
          <p className="mt-4 text-discord-text-normal font-medium">Starting VTT Container...</p>
          <p className="mt-2 text-sm text-discord-text-muted">
            This may take a moment for first-time setup
          </p>
        </div>
      )}

      {/* Stopped State */}
      {viewerState === 'stopped' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-discord-background-tertiary">
          <div className="text-6xl mb-4">🎲</div>
          <p className="text-discord-text-normal font-medium mb-2">VTT Not Running</p>
          <p className="text-sm text-discord-text-muted mb-4">
            Launch the VTT to start your session
          </p>
          {onLaunch && (
            <Button variant="primary" onClick={onLaunch}>
              Launch VTT
            </Button>
          )}
        </div>
      )}

      {/* Error State */}
      {viewerState === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-discord-background-tertiary">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-discord-text-normal font-medium mb-2">Unable to Load VTT</p>
          <p className="text-sm text-discord-text-muted mb-4 max-w-md text-center">
            {errorMessage}
          </p>
          {onLaunch && (
            <Button variant="primary" onClick={onLaunch}>
              Try Again
            </Button>
          )}
        </div>
      )}

      {/* VTT Iframe */}
      {vttUrl && (viewerState === 'loading' || viewerState === 'ready') && (
        <iframe
          src={vttUrl}
          className={clsx(
            'w-full h-full border-0',
            viewerState === 'loading' && 'opacity-0'
          )}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          allow="fullscreen; microphone; camera"
          title="FoundryVTT"
        />
      )}

      {/* Connection Info Bar */}
      {viewerState === 'ready' && vttUrl && (
        <div className="absolute bottom-0 left-0 right-0 bg-discord-background-secondary/90 backdrop-blur-sm border-t border-discord-border px-3 py-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-discord-green" />
              <span className="text-xs text-discord-text-muted truncate">
                Connected: <code className="text-discord-text-link">{vttUrl}</code>
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigator.clipboard.writeText(vttUrl)}
              title="Copy URL for external FoundryVTT connection"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
