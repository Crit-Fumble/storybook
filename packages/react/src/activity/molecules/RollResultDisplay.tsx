import { clsx } from 'clsx';

export interface DiceTerm {
  class: string;
  faces?: number;
  number?: number;
  results?: Array<{ result: number; active?: boolean }>;
}

export interface FoundryRollResultInfo {
  formula: string;
  total: number;
  terms: DiceTerm[];
  dice: DiceTerm[];
}

export interface RollResultDisplayProps {
  roll: FoundryRollResultInfo;
  showFormula?: boolean;
  showDice?: boolean;
  size?: 'sm' | 'md' | 'lg';
  testId?: string;
}

const sizeClasses = {
  sm: {
    total: 'text-xl',
    formula: 'text-xs',
    dice: 'text-sm gap-1',
    die: 'w-6 h-6 text-xs',
  },
  md: {
    total: 'text-3xl',
    formula: 'text-sm',
    dice: 'text-base gap-2',
    die: 'w-8 h-8 text-sm',
  },
  lg: {
    total: 'text-5xl',
    formula: 'text-base',
    dice: 'text-lg gap-3',
    die: 'w-10 h-10 text-base',
  },
};

function getDieColor(faces: number): string {
  switch (faces) {
    case 4:
      return 'bg-green-600';
    case 6:
      return 'bg-blue-600';
    case 8:
      return 'bg-purple-600';
    case 10:
      return 'bg-orange-600';
    case 12:
      return 'bg-red-600';
    case 20:
      return 'bg-discord-primary';
    case 100:
      return 'bg-gray-600';
    default:
      return 'bg-discord-background-tertiary';
  }
}

export function RollResultDisplay({
  roll,
  showFormula = true,
  showDice = true,
  size = 'md',
  testId = 'roll-result',
}: RollResultDisplayProps) {
  const classes = sizeClasses[size];

  // Extract individual die results from dice terms
  const diceResults: Array<{ faces: number; result: number; active: boolean }> = [];
  for (const die of roll.dice) {
    if (die.faces && die.results) {
      for (const r of die.results) {
        diceResults.push({
          faces: die.faces,
          result: r.result,
          active: r.active !== false,
        });
      }
    }
  }

  return (
    <div
      className="inline-flex flex-col items-center"
      data-testid={testId}
    >
      {/* Total */}
      <div
        className={clsx(classes.total, 'font-bold text-discord-text-normal')}
        data-testid={`${testId}-total`}
      >
        {roll.total}
      </div>

      {/* Formula */}
      {showFormula && (
        <div
          className={clsx(classes.formula, 'text-discord-text-muted font-mono mt-1')}
          data-testid={`${testId}-formula`}
        >
          {roll.formula}
        </div>
      )}

      {/* Individual dice */}
      {showDice && diceResults.length > 0 && (
        <div
          className={clsx(classes.dice, 'flex flex-wrap justify-center mt-2')}
          data-testid={`${testId}-dice`}
        >
          {diceResults.map((die, index) => (
            <div
              key={index}
              className={clsx(
                classes.die,
                'rounded flex items-center justify-center font-bold text-white',
                getDieColor(die.faces),
                !die.active && 'opacity-40 line-through'
              )}
              title={`d${die.faces}`}
              data-testid={`${testId}-die-${index}`}
            >
              {die.result}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
