import { clsx } from 'clsx';
import { Badge, Button } from '../../shared/atoms';
import { Card } from '../../shared/molecules';

export interface CombatantInfo {
  id: string;
  name: string;
  actorId?: string;
  initiative?: number;
  img?: string;
  hp?: {
    value: number;
    max: number;
  };
  defeated?: boolean;
}

export interface CombatInfo {
  id: string;
  active: boolean;
  round: number;
  turn: number;
  combatants: CombatantInfo[];
}

export interface CombatTrackerProps {
  combat: CombatInfo;
  onNextTurn?: () => void;
  onPrevTurn?: () => void;
  onSelectCombatant?: (combatant: CombatantInfo) => void;
  onEndCombat?: () => void;
  showControls?: boolean;
  testId?: string;
}

function getHpPercentage(hp: { value: number; max: number }): number {
  if (hp.max <= 0) return 100;
  return Math.max(0, Math.min(100, (hp.value / hp.max) * 100));
}

function getHpColor(percentage: number): string {
  if (percentage <= 25) return 'bg-discord-red';
  if (percentage <= 50) return 'bg-discord-yellow';
  return 'bg-discord-green';
}

export function CombatTracker({
  combat,
  onNextTurn,
  onPrevTurn,
  onSelectCombatant,
  onEndCombat,
  showControls = true,
  testId = 'combat-tracker',
}: CombatTrackerProps) {
  const sortedCombatants = [...combat.combatants].sort((a, b) => {
    const initA = a.initiative ?? -Infinity;
    const initB = b.initiative ?? -Infinity;
    return initB - initA;
  });

  const currentCombatant = sortedCombatants[combat.turn];

  return (
    <Card testId={testId} className="p-0 overflow-hidden">
      {/* Header */}
      <div
        className="px-4 py-3 bg-discord-background-tertiary border-b border-discord-border flex items-center justify-between"
        data-testid={`${testId}-header`}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚔️</span>
          <div>
            <div className="font-semibold text-discord-text-normal">
              Combat Tracker
            </div>
            <div className="text-sm text-discord-text-muted">
              Round {combat.round}
            </div>
          </div>
        </div>
        {combat.active ? (
          <Badge variant="danger" testId={`${testId}-status`}>
            In Combat
          </Badge>
        ) : (
          <Badge variant="default" testId={`${testId}-status`}>
            Inactive
          </Badge>
        )}
      </div>

      {/* Combatants list */}
      <div className="divide-y divide-discord-border" data-testid={`${testId}-list`}>
        {sortedCombatants.length === 0 ? (
          <div className="px-4 py-8 text-center text-discord-text-muted">
            No combatants in this encounter
          </div>
        ) : (
          sortedCombatants.map((combatant, index) => {
            const isCurrent = index === combat.turn && combat.active;
            const hpPercent = combatant.hp ? getHpPercentage(combatant.hp) : null;

            return (
              <div
                key={combatant.id}
                className={clsx(
                  'px-4 py-3 flex items-center gap-3 transition-colors',
                  isCurrent && 'bg-discord-primary/10',
                  combatant.defeated && 'opacity-50',
                  onSelectCombatant && 'cursor-pointer hover:bg-discord-background-secondary'
                )}
                onClick={() => onSelectCombatant?.(combatant)}
                data-testid={`${testId}-combatant-${combatant.id}`}
              >
                {/* Turn indicator */}
                <div className="w-6 flex justify-center">
                  {isCurrent && (
                    <span className="text-discord-primary" title="Current turn">
                      ▶
                    </span>
                  )}
                </div>

                {/* Initiative */}
                <div
                  className="w-10 text-center font-mono text-discord-text-normal"
                  title="Initiative"
                >
                  {combatant.initiative ?? '—'}
                </div>

                {/* Avatar */}
                {combatant.img ? (
                  <img
                    src={combatant.img}
                    alt={combatant.name}
                    className={clsx(
                      'w-10 h-10 rounded-full object-cover',
                      combatant.defeated && 'grayscale'
                    )}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-discord-background-tertiary flex items-center justify-center">
                    <span className="text-discord-text-muted">
                      {combatant.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}

                {/* Name and HP */}
                <div className="flex-1 min-w-0">
                  <div
                    className={clsx(
                      'font-medium truncate',
                      combatant.defeated
                        ? 'text-discord-text-muted line-through'
                        : 'text-discord-text-normal'
                    )}
                  >
                    {combatant.name}
                  </div>
                  {combatant.hp && (
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-discord-background-tertiary rounded-full overflow-hidden">
                        <div
                          className={clsx('h-full transition-all', getHpColor(hpPercent!))}
                          style={{ width: `${hpPercent}%` }}
                        />
                      </div>
                      <span className="text-xs text-discord-text-muted whitespace-nowrap">
                        {combatant.hp.value}/{combatant.hp.max}
                      </span>
                    </div>
                  )}
                </div>

                {/* Defeated badge */}
                {combatant.defeated && (
                  <Badge variant="danger" size="sm">
                    Defeated
                  </Badge>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Controls */}
      {showControls && combat.active && (
        <div
          className="px-4 py-3 bg-discord-background-tertiary border-t border-discord-border flex items-center justify-between gap-2"
          data-testid={`${testId}-controls`}
        >
          <div className="text-sm text-discord-text-muted">
            {currentCombatant?.name ? `${currentCombatant.name}'s turn` : 'No current combatant'}
          </div>
          <div className="flex gap-2">
            {onPrevTurn && (
              <Button
                variant="secondary"
                size="sm"
                onClick={onPrevTurn}
                testId={`${testId}-prev-btn`}
              >
                ← Prev
              </Button>
            )}
            {onNextTurn && (
              <Button
                variant="primary"
                size="sm"
                onClick={onNextTurn}
                testId={`${testId}-next-btn`}
              >
                Next →
              </Button>
            )}
            {onEndCombat && (
              <Button
                variant="danger"
                size="sm"
                onClick={onEndCombat}
                testId={`${testId}-end-btn`}
              >
                End Combat
              </Button>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
