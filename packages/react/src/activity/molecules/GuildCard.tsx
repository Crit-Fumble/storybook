import { clsx } from 'clsx';
import type { Guild } from '@crit-fumble/core/types';
import { Badge } from '../../shared/atoms/Badge';

export interface GuildCardProps {
  /** Guild data */
  guild: Guild;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show owner badge */
  showOwnerBadge?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Whether this guild is selected */
  isSelected?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

function getGuildIconUrl(guild: Guild, size: number = 64): string | null {
  if (guild.icon) {
    const ext = guild.icon.startsWith('a_') ? 'gif' : 'png';
    return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${ext}?size=${size}`;
  }
  return null;
}

function getGuildInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

const sizeClasses = {
  sm: {
    container: 'gap-2 p-2',
    icon: 'w-8 h-8 text-xs',
    name: 'text-sm',
  },
  md: {
    container: 'gap-3 p-3',
    icon: 'w-12 h-12 text-sm',
    name: 'text-base',
  },
  lg: {
    container: 'gap-4 p-4',
    icon: 'w-16 h-16 text-lg',
    name: 'text-lg',
  },
};

export function GuildCard({
  guild,
  size = 'md',
  showOwnerBadge = true,
  onClick,
  isSelected = false,
  className,
  testId = 'guild-card',
}: GuildCardProps) {
  const classes = sizeClasses[size];
  const iconSize = size === 'sm' ? 32 : size === 'md' ? 48 : 64;
  const iconUrl = getGuildIconUrl(guild, iconSize * 2);

  return (
    <div
      data-testid={testId}
      onClick={onClick}
      className={clsx(
        'flex items-center bg-discord-background-secondary rounded-lg transition-all',
        classes.container,
        onClick && 'cursor-pointer hover:bg-discord-background-floating',
        isSelected && 'ring-2 ring-discord-primary',
        className
      )}
    >
      {iconUrl ? (
        <img
          src={iconUrl}
          alt={guild.name}
          className={clsx('rounded-full flex-shrink-0', classes.icon)}
        />
      ) : (
        <div
          className={clsx(
            'rounded-full flex-shrink-0 bg-discord-background-tertiary flex items-center justify-center text-discord-text-muted font-semibold',
            classes.icon
          )}
        >
          {getGuildInitials(guild.name)}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className={clsx('text-discord-text-normal font-medium truncate', classes.name)}>
            {guild.name}
          </p>
          {showOwnerBadge && guild.owner && (
            <Badge variant="warning" size="sm">
              Owner
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
