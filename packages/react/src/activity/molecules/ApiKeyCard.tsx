import { useState } from 'react';
import { clsx } from 'clsx';
import { Badge, Button } from '../../shared/atoms';

export interface ApiKeyCardProps {
  /** Key ID */
  id: string;
  /** Display name */
  name: string;
  /** Scopes/permissions */
  scopes: string[];
  /** When the key expires (null = never) */
  expiresAt?: Date | null;
  /** When the key was last used */
  lastUsedAt?: Date | null;
  /** When the key was created */
  createdAt?: Date;
  /** The actual key value (only shown when newly created) */
  keyValue?: string;
  /** Called to revoke/delete the key */
  onRevoke?: () => void;
  /** Called to copy the key */
  onCopy?: () => void;
  /** Whether the key is currently being revoked */
  isLoading?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30) return `${days}d ago`;

  return formatDate(date);
}

function isExpired(date: Date): boolean {
  return date.getTime() < Date.now();
}

export function ApiKeyCard({
  id,
  name,
  scopes,
  expiresAt,
  lastUsedAt,
  createdAt,
  keyValue,
  onRevoke,
  onCopy,
  isLoading = false,
  className,
  testId = 'api-key-card',
}: ApiKeyCardProps) {
  const [showKey, setShowKey] = useState(false);
  const expired = expiresAt ? isExpired(expiresAt) : false;

  return (
    <div
      data-testid={testId}
      className={clsx(
        'bg-cfg-background-secondary rounded-lg p-4 border border-cfg-border',
        expired && 'opacity-60',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className="text-cfg-text-normal font-semibold"
              data-testid={`${testId}-name`}
            >
              {name}
            </h3>
            {expired && (
              <Badge variant="danger" size="sm" testId={`${testId}-expired-badge`}>
                Expired
              </Badge>
            )}
          </div>
          <p
            className="text-xs text-cfg-text-muted font-mono mt-0.5"
            data-testid={`${testId}-id`}
          >
            {id.slice(0, 8)}...
          </p>
        </div>
      </div>

      {/* Key value (only shown when newly created) */}
      {keyValue && (
        <div
          className="mt-3 p-3 bg-cfg-background-tertiary rounded border border-cfg-border"
          data-testid={`${testId}-key-value`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-cfg-yellow font-medium">
              ⚠️ Copy this key now - it won't be shown again
            </span>
            <button
              className="text-xs text-cfg-text-link hover:underline"
              onClick={() => setShowKey(!showKey)}
              data-testid={`${testId}-toggle-visibility`}
            >
              {showKey ? 'Hide' : 'Show'}
            </button>
          </div>
          <code
            className="block text-sm text-cfg-text-normal break-all"
            data-testid={`${testId}-key-display`}
          >
            {showKey ? keyValue : '••••••••••••••••••••••••'}
          </code>
          {onCopy && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onCopy}
              className="mt-2"
              testId={`${testId}-copy-btn`}
            >
              Copy to Clipboard
            </Button>
          )}
        </div>
      )}

      {/* Scopes */}
      {scopes.length > 0 && (
        <div className="mt-3" data-testid={`${testId}-scopes`}>
          <p className="text-xs text-cfg-text-muted mb-1.5">Permissions</p>
          <div className="flex flex-wrap gap-1">
            {scopes.map((scope) => (
              <Badge key={scope} variant="default" size="sm">
                {scope}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Metadata */}
      <div className="mt-3 pt-3 border-t border-cfg-border grid grid-cols-2 gap-2 text-xs">
        {createdAt && (
          <div data-testid={`${testId}-created`}>
            <span className="text-cfg-text-muted">Created</span>
            <p className="text-cfg-text-normal">{formatDate(createdAt)}</p>
          </div>
        )}
        {expiresAt && (
          <div data-testid={`${testId}-expires`}>
            <span className="text-cfg-text-muted">
              {expired ? 'Expired' : 'Expires'}
            </span>
            <p className={clsx('text-cfg-text-normal', expired && 'text-cfg-red')}>
              {formatDate(expiresAt)}
            </p>
          </div>
        )}
        {!expiresAt && (
          <div data-testid={`${testId}-expires`}>
            <span className="text-cfg-text-muted">Expires</span>
            <p className="text-cfg-text-normal">Never</p>
          </div>
        )}
        {lastUsedAt && (
          <div data-testid={`${testId}-last-used`}>
            <span className="text-cfg-text-muted">Last Used</span>
            <p className="text-cfg-text-normal">{formatRelativeTime(lastUsedAt)}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      {onRevoke && (
        <div className="mt-3 pt-3 border-t border-cfg-border">
          <Button
            variant="danger"
            size="sm"
            onClick={onRevoke}
            disabled={isLoading}
            isLoading={isLoading}
            testId={`${testId}-revoke-btn`}
          >
            Revoke Key
          </Button>
        </div>
      )}
    </div>
  );
}
