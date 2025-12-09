
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CombatTracker, type CombatInfo } from './CombatTracker';

describe('CombatTracker', () => {
  const mockCombat: CombatInfo = {
    id: 'combat-1',
    active: true,
    round: 3,
    turn: 0,
    combatants: [
      {
        id: 'c1',
        name: 'Warrior',
        initiative: 20,
        hp: { value: 45, max: 60 },
        img: '/warrior.jpg',
        defeated: false,
      },
      {
        id: 'c2',
        name: 'Mage',
        initiative: 18,
        hp: { value: 15, max: 30 },
        defeated: false,
      },
      {
        id: 'c3',
        name: 'Goblin',
        initiative: 10,
        hp: { value: 0, max: 20 },
        defeated: true,
      },
    ],
  };

  it('renders combat tracker', () => {
    render(<CombatTracker combat={mockCombat} />);

    expect(screen.getByTestId('combat-tracker')).toBeInTheDocument();
    expect(screen.getByText('Combat Tracker')).toBeInTheDocument();
    expect(screen.getByText('Round 3')).toBeInTheDocument();
  });

  it('displays active combat status', () => {
    render(<CombatTracker combat={mockCombat} />);

    expect(screen.getByTestId('combat-tracker-status')).toHaveTextContent('In Combat');
  });

  it('displays inactive combat status', () => {
    const inactiveCombat = { ...mockCombat, active: false };
    render(<CombatTracker combat={inactiveCombat} />);

    expect(screen.getByTestId('combat-tracker-status')).toHaveTextContent('Inactive');
  });

  it('sorts combatants by initiative', () => {
    render(<CombatTracker combat={mockCombat} />);

    const combatants = screen.getAllByTestId(/combat-tracker-combatant-/);
    expect(combatants[0]).toHaveAttribute('data-testid', 'combat-tracker-combatant-c1');
    expect(combatants[1]).toHaveAttribute('data-testid', 'combat-tracker-combatant-c2');
    expect(combatants[2]).toHaveAttribute('data-testid', 'combat-tracker-combatant-c3');
  });

  it('highlights current turn combatant', () => {
    render(<CombatTracker combat={mockCombat} />);

    const currentCombatant = screen.getByTestId('combat-tracker-combatant-c1');
    expect(currentCombatant).toHaveClass('bg-discord-primary/10');
  });

  it('displays HP bars with correct colors', () => {
    render(<CombatTracker combat={mockCombat} />);

    // Warrior: 75% HP (green)
    const warriorBar = screen.getByTestId('combat-tracker-combatant-c1')
      .querySelector('.bg-discord-green');
    expect(warriorBar).toBeInTheDocument();

    // Mage: 50% HP (yellow)
    const mageBar = screen.getByTestId('combat-tracker-combatant-c2')
      .querySelector('.bg-discord-yellow');
    expect(mageBar).toBeInTheDocument();

    // Goblin: 0% HP (red)
    const goblinBar = screen.getByTestId('combat-tracker-combatant-c3')
      .querySelector('.bg-discord-red');
    expect(goblinBar).toBeInTheDocument();
  });

  it('displays defeated badge for defeated combatants', () => {
    render(<CombatTracker combat={mockCombat} />);

    const defeatedBadges = screen.getAllByText('Defeated');
    expect(defeatedBadges).toHaveLength(1);
  });

  it('shows empty state when no combatants', () => {
    const emptyCombat: CombatInfo = {
      ...mockCombat,
      combatants: [],
    };

    render(<CombatTracker combat={emptyCombat} />);

    expect(screen.getByText('No combatants in this encounter')).toBeInTheDocument();
  });

  it('renders controls when active and showControls is true', () => {
    render(<CombatTracker combat={mockCombat} showControls onNextTurn={jest.fn()} />);

    expect(screen.getByTestId('combat-tracker-controls')).toBeInTheDocument();
    expect(screen.getByText("Warrior's turn")).toBeInTheDocument();
  });

  it('does not render controls when inactive', () => {
    const inactiveCombat = { ...mockCombat, active: false };
    render(<CombatTracker combat={inactiveCombat} showControls onNextTurn={jest.fn()} />);

    expect(screen.queryByTestId('combat-tracker-controls')).not.toBeInTheDocument();
  });

  it('does not render controls when showControls is false', () => {
    render(<CombatTracker combat={mockCombat} showControls={false} />);

    expect(screen.queryByTestId('combat-tracker-controls')).not.toBeInTheDocument();
  });

  it('calls onNextTurn when next button clicked', async () => {
    const user = userEvent.setup();
    const onNextTurn = jest.fn();

    render(<CombatTracker combat={mockCombat} onNextTurn={onNextTurn} />);

    const nextButton = screen.getByTestId('combat-tracker-next-btn');
    await user.click(nextButton);

    expect(onNextTurn).toHaveBeenCalledTimes(1);
  });

  it('calls onPrevTurn when prev button clicked', async () => {
    const user = userEvent.setup();
    const onPrevTurn = jest.fn();

    render(<CombatTracker combat={mockCombat} onPrevTurn={onPrevTurn} />);

    const prevButton = screen.getByTestId('combat-tracker-prev-btn');
    await user.click(prevButton);

    expect(onPrevTurn).toHaveBeenCalledTimes(1);
  });

  it('calls onEndCombat when end button clicked', async () => {
    const user = userEvent.setup();
    const onEndCombat = jest.fn();

    render(<CombatTracker combat={mockCombat} onEndCombat={onEndCombat} />);

    const endButton = screen.getByTestId('combat-tracker-end-btn');
    await user.click(endButton);

    expect(onEndCombat).toHaveBeenCalledTimes(1);
  });

  it('calls onSelectCombatant when combatant clicked', async () => {
    const user = userEvent.setup();
    const onSelectCombatant = jest.fn();

    render(<CombatTracker combat={mockCombat} onSelectCombatant={onSelectCombatant} />);

    const combatant = screen.getByTestId('combat-tracker-combatant-c1');
    await user.click(combatant);

    expect(onSelectCombatant).toHaveBeenCalledWith(mockCombat.combatants[0]);
  });

  it('displays combatant images when available', () => {
    render(<CombatTracker combat={mockCombat} />);

    const warriorImg = screen.getByAltText('Warrior');
    expect(warriorImg).toHaveAttribute('src', '/warrior.jpg');
  });

  it('displays initial for combatants without image', () => {
    render(<CombatTracker combat={mockCombat} />);

    const mageInitial = screen.getByText('M');
    expect(mageInitial).toBeInTheDocument();
  });

  it('handles combatants without initiative', () => {
    const combatWithNoInit: CombatInfo = {
      ...mockCombat,
      combatants: [
        { id: 'c1', name: 'Test', initiative: undefined },
      ],
    };

    render(<CombatTracker combat={combatWithNoInit} />);

    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('handles HP with max of 0', () => {
    const combatWithZeroMax: CombatInfo = {
      ...mockCombat,
      combatants: [
        { id: 'c1', name: 'Test', hp: { value: 0, max: 0 } },
      ],
    };

    render(<CombatTracker combat={combatWithZeroMax} />);

    expect(screen.getByText('0/0')).toBeInTheDocument();
  });
});
