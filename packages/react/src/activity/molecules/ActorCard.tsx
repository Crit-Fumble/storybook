import { clsx } from 'clsx';
import { Card } from '../../shared/molecules';

export interface FoundryActorInfo {
  id: string;
  name: string;
  type: string;
  img?: string;
}

export interface ActorCardProps {
  actor: FoundryActorInfo;
  selected?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  testId?: string;
}

const sizeClasses = {
  sm: {
    container: 'p-2',
    image: 'w-8 h-8',
    name: 'text-sm',
    type: 'text-xs',
  },
  md: {
    container: 'p-3',
    image: 'w-12 h-12',
    name: 'text-base',
    type: 'text-sm',
  },
  lg: {
    container: 'p-4',
    image: 'w-16 h-16',
    name: 'text-lg',
    type: 'text-base',
  },
};

const typeColors: Record<string, string> = {
  character: 'text-discord-green',
  npc: 'text-discord-yellow',
  vehicle: 'text-discord-primary',
  default: 'text-discord-text-muted',
};

export function ActorCard({
  actor,
  selected = false,
  onClick,
  size = 'md',
  testId,
}: ActorCardProps) {
  const classes = sizeClasses[size];
  const cardTestId = testId || `actor-card-${actor.id}`;

  return (
    <Card
      variant={onClick ? 'interactive' : 'default'}
      onClick={onClick}
      testId={cardTestId}
      className={clsx(
        classes.container,
        'flex items-center gap-3',
        selected && 'ring-2 ring-discord-primary'
      )}
    >
      {actor.img ? (
        <img
          src={actor.img}
          alt={actor.name}
          className={clsx(classes.image, 'rounded-full object-cover')}
          data-testid={`${cardTestId}-image`}
        />
      ) : (
        <div
          className={clsx(
            classes.image,
            'rounded-full bg-discord-background-tertiary flex items-center justify-center'
          )}
          data-testid={`${cardTestId}-placeholder`}
        >
          <span className="text-discord-text-muted">
            {actor.name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div
          className={clsx(classes.name, 'font-semibold text-discord-text-normal truncate')}
          data-testid={`${cardTestId}-name`}
        >
          {actor.name}
        </div>
        <div
          className={clsx(
            classes.type,
            typeColors[actor.type] || typeColors.default,
            'capitalize'
          )}
          data-testid={`${cardTestId}-type`}
        >
          {actor.type}
        </div>
      </div>
    </Card>
  );
}
