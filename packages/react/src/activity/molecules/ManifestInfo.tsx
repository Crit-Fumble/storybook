import { Badge } from '../../shared/atoms';

export interface ManifestAuthorInfo {
  name: string;
  url?: string;
  email?: string;
  discord?: string;
}

export interface ManifestCompatibilityInfo {
  minimum?: string;
  verified?: string;
  maximum?: string;
}

export interface FoundryManifestInfo {
  id: string;
  title: string;
  description?: string;
  version?: string;
  compatibility?: ManifestCompatibilityInfo;
  authors?: ManifestAuthorInfo[];
  url?: string;
  license?: string;
}

export interface ManifestInfoProps {
  manifest: FoundryManifestInfo;
  showCompatibility?: boolean;
  showAuthors?: boolean;
  compact?: boolean;
  testId?: string;
}

export function ManifestInfo({
  manifest,
  showCompatibility = true,
  showAuthors = true,
  compact = false,
  testId = 'manifest-info',
}: ManifestInfoProps) {
  return (
    <div data-testid={testId}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3
            className="font-semibold text-discord-text-normal"
            data-testid={`${testId}-title`}
          >
            {manifest.title}
          </h3>
          <div
            className="text-sm text-discord-text-muted font-mono"
            data-testid={`${testId}-id`}
          >
            {manifest.id}
          </div>
        </div>
        {manifest.version && (
          <Badge variant="default" testId={`${testId}-version`}>
            v{manifest.version}
          </Badge>
        )}
      </div>

      {/* Description */}
      {manifest.description && !compact && (
        <p
          className="mt-3 text-sm text-discord-text-muted"
          data-testid={`${testId}-description`}
        >
          {manifest.description}
        </p>
      )}

      {/* Compatibility */}
      {showCompatibility && manifest.compatibility && (
        <div className="mt-3" data-testid={`${testId}-compatibility`}>
          <div className="text-xs text-discord-text-muted uppercase tracking-wide mb-1">
            Foundry Compatibility
          </div>
          <div className="flex flex-wrap gap-2">
            {manifest.compatibility.minimum && (
              <Badge variant="danger" size="sm">
                Min: {manifest.compatibility.minimum}
              </Badge>
            )}
            {manifest.compatibility.verified && (
              <Badge variant="success" size="sm">
                Verified: {manifest.compatibility.verified}
              </Badge>
            )}
            {manifest.compatibility.maximum && (
              <Badge variant="warning" size="sm">
                Max: {manifest.compatibility.maximum}
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Authors */}
      {showAuthors && manifest.authors && manifest.authors.length > 0 && !compact && (
        <div className="mt-3" data-testid={`${testId}-authors`}>
          <div className="text-xs text-discord-text-muted uppercase tracking-wide mb-1">
            Authors
          </div>
          <div className="flex flex-wrap gap-2">
            {manifest.authors.map((author, index) => (
              <span
                key={index}
                className="text-sm text-discord-text-normal"
              >
                {author.url ? (
                  <a
                    href={author.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-discord-link hover:underline"
                  >
                    {author.name}
                  </a>
                ) : (
                  author.name
                )}
                {index < manifest.authors!.length - 1 && ', '}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Links */}
      {(manifest.url || manifest.license) && !compact && (
        <div className="mt-3 flex gap-4 text-sm" data-testid={`${testId}-links`}>
          {manifest.url && (
            <a
              href={manifest.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-discord-link hover:underline"
            >
              Project Page
            </a>
          )}
          {manifest.license && (
            <span className="text-discord-text-muted">
              License: {manifest.license}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
