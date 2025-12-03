import { clsx } from 'clsx';

export interface EmbedField {
  /** Field name/title */
  name: string;
  /** Field value/content */
  value: string;
  /** Whether field displays inline */
  inline?: boolean;
}

export interface DiscordEmbedProps {
  /** Embed title */
  title?: string | null;
  /** Embed description */
  description?: string | null;
  /** Accent color (hex number or CSS color) */
  color?: number | string | null;
  /** Fields to display */
  fields?: EmbedField[];
  /** Footer text */
  footer?: string | null;
  /** Footer icon URL */
  footerIcon?: string | null;
  /** Timestamp to display */
  timestamp?: string | Date | null;
  /** Thumbnail image URL */
  thumbnail?: string | null;
  /** Main image URL */
  image?: string | null;
  /** Author name */
  author?: string | null;
  /** Author icon URL */
  authorIcon?: string | null;
  /** Author URL (makes author clickable) */
  authorUrl?: string | null;
  /** Title URL (makes title clickable) */
  url?: string | null;
  /** Additional CSS classes */
  className?: string;
  /** Test ID */
  testId?: string;
}

function formatColor(color: number | string | null | undefined): string {
  if (!color) return '#552e66'; // cfg-primary default
  if (typeof color === 'string') return color;
  // Convert decimal to hex color
  return `#${color.toString(16).padStart(6, '0')}`;
}

function formatTimestamp(timestamp: string | Date | null | undefined): string | null {
  if (!timestamp) return null;
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  if (isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function DiscordEmbed({
  title,
  description,
  color,
  fields = [],
  footer,
  footerIcon,
  timestamp,
  thumbnail,
  image,
  author,
  authorIcon,
  authorUrl,
  url,
  className,
  testId = 'discord-embed',
}: DiscordEmbedProps) {
  const accentColor = formatColor(color);
  const formattedTimestamp = formatTimestamp(timestamp);

  const hasContent = title || description || fields.length > 0 || footer || image || thumbnail || author;

  if (!hasContent) {
    return null;
  }

  const TitleTag = url ? 'a' : 'span';
  const AuthorTag = authorUrl ? 'a' : 'span';

  return (
    <div
      className={clsx(
        'bg-cfg-background-secondary rounded overflow-hidden flex',
        className
      )}
      data-testid={testId}
    >
      {/* Color bar */}
      <div
        className="w-1 flex-shrink-0"
        style={{ backgroundColor: accentColor }}
        data-testid={`${testId}-color-bar`}
      />

      {/* Content */}
      <div className="flex-1 p-3 min-w-0">
        {/* Author */}
        {author && (
          <div className="flex items-center gap-2 mb-2" data-testid={`${testId}-author`}>
            {authorIcon && (
              <img
                src={authorIcon}
                alt=""
                className="w-5 h-5 rounded-full"
              />
            )}
            <AuthorTag
              {...(authorUrl ? { href: authorUrl, target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={clsx(
                'text-xs font-medium text-cfg-text-normal',
                authorUrl && 'hover:underline'
              )}
            >
              {author}
            </AuthorTag>
          </div>
        )}

        <div className="flex gap-4">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            {title && (
              <TitleTag
                {...(url ? { href: url, target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={clsx(
                  'block font-semibold text-cfg-text-normal mb-1',
                  url && 'text-cfg-text-link hover:underline'
                )}
                data-testid={`${testId}-title`}
              >
                {title}
              </TitleTag>
            )}

            {/* Description */}
            {description && (
              <p
                className="text-sm text-cfg-text-normal whitespace-pre-wrap break-words"
                data-testid={`${testId}-description`}
              >
                {description}
              </p>
            )}

            {/* Fields */}
            {fields.length > 0 && (
              <div
                className="grid gap-2 mt-2"
                style={{
                  gridTemplateColumns: `repeat(${Math.min(3, fields.filter(f => f.inline).length || 1)}, minmax(0, 1fr))`,
                }}
                data-testid={`${testId}-fields`}
              >
                {fields.map((field, index) => (
                  <div
                    key={index}
                    className={clsx(!field.inline && 'col-span-full')}
                    data-testid={`${testId}-field-${index}`}
                  >
                    <div className="text-xs font-semibold text-cfg-text-normal mb-0.5">
                      {field.name}
                    </div>
                    <div className="text-sm text-cfg-text-normal whitespace-pre-wrap break-words">
                      {field.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Image */}
            {image && (
              <img
                src={image}
                alt=""
                className="mt-3 rounded max-w-full max-h-80 object-contain"
                data-testid={`${testId}-image`}
              />
            )}
          </div>

          {/* Thumbnail */}
          {thumbnail && (
            <img
              src={thumbnail}
              alt=""
              className="w-20 h-20 rounded object-cover flex-shrink-0"
              data-testid={`${testId}-thumbnail`}
            />
          )}
        </div>

        {/* Footer */}
        {(footer || formattedTimestamp) && (
          <div
            className="flex items-center gap-2 mt-3 pt-2 border-t border-cfg-border text-xs text-cfg-text-muted"
            data-testid={`${testId}-footer`}
          >
            {footerIcon && (
              <img
                src={footerIcon}
                alt=""
                className="w-4 h-4 rounded-full"
              />
            )}
            {footer && <span>{footer}</span>}
            {footer && formattedTimestamp && <span>•</span>}
            {formattedTimestamp && <span>{formattedTimestamp}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
