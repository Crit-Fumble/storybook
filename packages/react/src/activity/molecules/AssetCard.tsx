import { clsx } from 'clsx';
import type { Asset, AssetType } from '@crit-fumble/core/types';
import { Badge } from '../../shared/atoms/Badge';

export interface AssetCardProps {
  /** Asset data */
  asset: Asset;
  /** URL to access the asset (constructed from storageKey) */
  assetUrl?: string;
  /** Click handler */
  onClick?: () => void;
  /** Delete handler */
  onDelete?: () => void;
  /** Whether this asset is selected */
  isSelected?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

const assetTypeConfig: Record<AssetType, { icon: React.ReactNode; variant: 'default' | 'primary' | 'success' | 'warning' | 'danger' }> = {
  image: {
    variant: 'primary',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  audio: {
    variant: 'success',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
  },
  video: {
    variant: 'danger',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  map: {
    variant: 'warning',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  token: {
    variant: 'default',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
};

function formatFileSize(bytes: bigint | number): string {
  const size = typeof bytes === 'bigint' ? Number(bytes) : bytes;
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function AssetCard({
  asset,
  assetUrl,
  onClick,
  onDelete,
  isSelected = false,
  className,
  testId = 'asset-card',
}: AssetCardProps) {
  const config = assetTypeConfig[asset.type];
  const isImage = asset.type === 'image' || asset.type === 'map' || asset.type === 'token';

  return (
    <div
      data-testid={testId}
      onClick={onClick}
      className={clsx(
        'bg-discord-background-secondary rounded-lg overflow-hidden transition-all',
        onClick && 'cursor-pointer hover:bg-discord-background-floating',
        isSelected && 'ring-2 ring-discord-primary',
        className
      )}
    >
      {/* Preview area */}
      <div className="aspect-video bg-discord-background-tertiary flex items-center justify-center relative">
        {isImage && assetUrl ? (
          <img
            src={assetUrl}
            alt={asset.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-discord-text-muted">{config.icon}</div>
        )}

        {/* Delete button */}
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="absolute top-2 right-2 p-1.5 bg-discord-background-primary/80 text-discord-text-muted hover:text-discord-red rounded transition-colors"
            aria-label="Delete asset"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>

      {/* Info area */}
      <div className="p-3">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-discord-text-normal font-medium text-sm truncate flex-1">
            {asset.name}
          </p>
          <Badge variant={config.variant} size="sm">
            {asset.type}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-xs text-discord-text-muted">
          <span>{formatFileSize(asset.sizeBytes)}</span>
          <span>•</span>
          <span>{asset.mimeType}</span>
        </div>
      </div>
    </div>
  );
}
