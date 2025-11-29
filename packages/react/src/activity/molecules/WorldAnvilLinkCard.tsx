import { clsx } from 'clsx';
import { Card } from '../../shared/molecules';
import { Button } from '../../shared/atoms';

export interface WorldAnvilLinkCardProps {
  /** World Anvil world ID */
  worldId: string | null;
  /** Cached world name */
  worldName: string | null;
  /** Public URL to the world */
  worldUrl: string | null;
  /** Notebook ID for session notes */
  notebookId: string | null;
  /** Called when link button is clicked */
  onLink?: () => void;
  /** Called when unlink button is clicked */
  onUnlink?: () => void;
  /** Called when open world button is clicked */
  onOpenWorld?: () => void;
  /** Whether linking is in progress */
  isLinking?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

export function WorldAnvilLinkCard({
  worldId,
  worldName,
  worldUrl,
  notebookId,
  onLink,
  onUnlink,
  onOpenWorld,
  isLinking = false,
  className,
  testId = 'world-anvil-link-card',
}: WorldAnvilLinkCardProps) {
  const isLinked = worldId !== null;

  return (
    <Card
      className={clsx('bg-cfg-background-secondary', className)}
      testId={testId}
    >
      <div className="flex items-start gap-4">
        {/* World Anvil Logo */}
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-cfg-background-tertiary flex items-center justify-center">
          <svg
            className={clsx(
              'w-8 h-8',
              isLinked ? 'text-cfg-accent' : 'text-cfg-text-muted'
            )}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-medium text-cfg-text-normal">
              World Anvil
            </h3>
            {isLinked && (
              <span
                className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-cfg-green/20 text-cfg-green border border-cfg-green/30"
                data-testid={`${testId}-linked-badge`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cfg-green" />
                Linked
              </span>
            )}
          </div>

          {isLinked ? (
            <div className="mt-2 space-y-2">
              <div>
                <p
                  className="text-sm text-cfg-text-normal font-medium truncate"
                  data-testid={`${testId}-world-name`}
                >
                  {worldName || 'Unknown World'}
                </p>
                {worldUrl && (
                  <p
                    className="text-xs text-cfg-text-muted truncate"
                    data-testid={`${testId}-world-url`}
                  >
                    {worldUrl}
                  </p>
                )}
              </div>

              {notebookId && (
                <p
                  className="text-xs text-cfg-text-muted"
                  data-testid={`${testId}-notebook`}
                >
                  Session notes notebook linked
                </p>
              )}

              <div className="flex items-center gap-2 pt-1">
                {worldUrl && onOpenWorld && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={onOpenWorld}
                    testId={`${testId}-open-btn`}
                  >
                    Open World
                  </Button>
                )}
                {onUnlink && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={onUnlink}
                    testId={`${testId}-unlink-btn`}
                  >
                    Unlink
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-2">
              <p className="text-sm text-cfg-text-muted mb-3">
                Connect your World Anvil world to sync lore, maps, and session
                notes.
              </p>
              {onLink && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onLink}
                  disabled={isLinking}
                  testId={`${testId}-link-btn`}
                >
                  {isLinking ? 'Linking...' : 'Link World'}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
