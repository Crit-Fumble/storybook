import { clsx } from 'clsx';
import type { DiscordUser } from '@crit-fumble/core/types';

export interface UserCardProps {
  /** Discord user data */
  user: DiscordUser;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show username or display name */
  showUsername?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

function getAvatarUrl(user: DiscordUser, size: number = 64): string {
  if (user.avatar) {
    const ext = user.avatar.startsWith('a_') ? 'gif' : 'png';
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=${size}`;
  }
  // Default avatar based on discriminator or user id
  const defaultIndex = user.discriminator === '0'
    ? (BigInt(user.id) >> 22n) % 6n
    : parseInt(user.discriminator, 10) % 5;
  return `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`;
}

const sizeClasses = {
  sm: {
    container: 'gap-2',
    avatar: 'w-8 h-8',
    name: 'text-sm',
    username: 'text-xs',
  },
  md: {
    container: 'gap-3',
    avatar: 'w-10 h-10',
    name: 'text-base',
    username: 'text-sm',
  },
  lg: {
    container: 'gap-4',
    avatar: 'w-14 h-14',
    name: 'text-lg',
    username: 'text-sm',
  },
};

export function UserCard({
  user,
  size = 'md',
  showUsername = true,
  onClick,
  className,
  testId = 'user-card',
}: UserCardProps) {
  const displayName = user.global_name || user.username;
  const classes = sizeClasses[size];
  const avatarSize = size === 'sm' ? 32 : size === 'md' ? 40 : 56;

  return (
    <div
      data-testid={testId}
      onClick={onClick}
      className={clsx(
        'flex items-center',
        classes.container,
        onClick && 'cursor-pointer hover:bg-discord-background-floating rounded-lg p-2 -m-2 transition-colors',
        className
      )}
    >
      <img
        src={getAvatarUrl(user, avatarSize * 2)}
        alt={displayName}
        className={clsx('rounded-full', classes.avatar)}
      />
      <div className="min-w-0">
        <p className={clsx('text-discord-text-normal font-medium truncate', classes.name)}>
          {displayName}
        </p>
        {showUsername && user.global_name && (
          <p className={clsx('text-discord-text-muted truncate', classes.username)}>
            @{user.username}
          </p>
        )}
      </div>
    </div>
  );
}
