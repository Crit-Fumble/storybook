import { clsx } from 'clsx';

export interface AvatarProps {
  /** Image source URL */
  src?: string | null;
  /** Alt text for the image */
  alt?: string;
  /** Fallback text (usually initials) */
  fallback?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
  /** Optional test ID */
  testId?: string;
}

export function Avatar({
  src,
  alt = '',
  fallback = '?',
  size = 'md',
  className,
  testId,
}: AvatarProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-lg',
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        data-testid={testId}
        className={clsx(
          'rounded-full object-cover',
          sizeClasses[size],
          className
        )}
      />
    );
  }

  return (
    <div
      data-testid={testId}
      className={clsx(
        'rounded-full bg-discord-primary flex items-center justify-center text-white font-bold',
        sizeClasses[size],
        className
      )}
    >
      {fallback.charAt(0).toUpperCase()}
    </div>
  );
}
