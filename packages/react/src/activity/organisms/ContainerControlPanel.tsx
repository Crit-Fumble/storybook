import { clsx } from 'clsx';
import { Button } from '../../shared/atoms';
import { ContainerStatusCard } from '../molecules/ContainerStatusCard';
import type { ContainerStatus } from '../types';

export interface ContainerInfo {
  id: string;
  campaignId: string;
  campaignName: string;
  status: ContainerStatus;
  containerId?: string | null;
  containerPort?: number | null;
  lastActiveAt?: Date | null;
  createdAt?: Date;
}

export interface ContainerControlPanelProps {
  /** List of containers to display */
  containers: ContainerInfo[];
  /** Called when user wants to start a container */
  onStart?: (campaignId: string) => void;
  /** Called when user wants to stop a container */
  onStop?: (campaignId: string) => void;
  /** Called when user wants to restart a container */
  onRestart?: (campaignId: string) => void;
  /** Called when user wants to stop all containers */
  onStopAll?: () => void;
  /** ID of container currently being acted upon */
  loadingContainerId?: string | null;
  /** Whether stop all is in progress */
  isStoppingAll?: boolean;
  /** Whether to show the stop all button */
  showStopAll?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

export function ContainerControlPanel({
  containers,
  onStart,
  onStop,
  onRestart,
  onStopAll,
  loadingContainerId,
  isStoppingAll = false,
  showStopAll = true,
  className,
  testId = 'container-control-panel',
}: ContainerControlPanelProps) {
  const runningContainers = containers.filter((c) => c.status === 'running');
  const startingContainers = containers.filter((c) => c.status === 'starting');
  const stoppedContainers = containers.filter((c) => c.status === 'stopped');
  const errorContainers = containers.filter((c) => c.status === 'error');

  const totalRunning = runningContainers.length + startingContainers.length;
  const hasRunningContainers = totalRunning > 0;

  return (
    <div data-testid={testId} className={clsx('space-y-6', className)}>
      {/* Header with stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-display font-semibold text-cfg-text-normal">
            Container Management
          </h2>
          <p className="text-sm text-cfg-text-muted mt-1">
            {containers.length === 0 ? (
              'No containers configured'
            ) : (
              <>
                <span className="text-cfg-green">{runningContainers.length} running</span>
                {startingContainers.length > 0 && (
                  <span className="text-cfg-yellow"> · {startingContainers.length} starting</span>
                )}
                {stoppedContainers.length > 0 && (
                  <span> · {stoppedContainers.length} stopped</span>
                )}
                {errorContainers.length > 0 && (
                  <span className="text-cfg-red"> · {errorContainers.length} error</span>
                )}
              </>
            )}
          </p>
        </div>

        {showStopAll && hasRunningContainers && onStopAll && (
          <Button
            variant="danger"
            size="sm"
            onClick={onStopAll}
            disabled={isStoppingAll}
            isLoading={isStoppingAll}
            testId={`${testId}-stop-all-btn`}
          >
            Stop All
          </Button>
        )}
      </div>

      {/* Empty state */}
      {containers.length === 0 && (
        <div
          className="bg-cfg-background-secondary rounded-lg p-8 text-center border border-cfg-border"
          data-testid={`${testId}-empty`}
        >
          <div className="text-4xl mb-3">🐳</div>
          <p className="text-cfg-text-normal font-medium mb-1">No Containers</p>
          <p className="text-sm text-cfg-text-muted">
            Create a campaign to provision a VTT container
          </p>
        </div>
      )}

      {/* Container grid */}
      {containers.length > 0 && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          data-testid={`${testId}-grid`}
        >
          {containers.map((container) => (
            <ContainerStatusCard
              key={container.id}
              status={container.status}
              containerId={container.containerId}
              containerPort={container.containerPort}
              campaignName={container.campaignName}
              lastActiveAt={container.lastActiveAt}
              onStart={onStart ? () => onStart(container.campaignId) : undefined}
              onStop={onStop ? () => onStop(container.campaignId) : undefined}
              onRestart={onRestart ? () => onRestart(container.campaignId) : undefined}
              isLoading={loadingContainerId === container.campaignId}
              testId={`${testId}-container-${container.id}`}
            />
          ))}
        </div>
      )}

      {/* Resource usage summary */}
      {hasRunningContainers && (
        <div
          className="bg-cfg-background-tertiary rounded-lg p-4 border border-cfg-border"
          data-testid={`${testId}-summary`}
        >
          <h3 className="text-sm font-semibold text-cfg-text-normal mb-3">
            Resource Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-cfg-text-muted uppercase tracking-wide">Active</p>
              <p className="text-xl font-display font-bold text-cfg-green" data-testid={`${testId}-active-count`}>
                {totalRunning}
              </p>
            </div>
            <div>
              <p className="text-xs text-cfg-text-muted uppercase tracking-wide">Stopped</p>
              <p className="text-xl font-display font-bold text-cfg-text-muted" data-testid={`${testId}-stopped-count`}>
                {stoppedContainers.length}
              </p>
            </div>
            <div>
              <p className="text-xs text-cfg-text-muted uppercase tracking-wide">Errors</p>
              <p className="text-xl font-display font-bold text-cfg-red" data-testid={`${testId}-error-count`}>
                {errorContainers.length}
              </p>
            </div>
            <div>
              <p className="text-xs text-cfg-text-muted uppercase tracking-wide">Total</p>
              <p className="text-xl font-display font-bold text-cfg-text-normal" data-testid={`${testId}-total-count`}>
                {containers.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
