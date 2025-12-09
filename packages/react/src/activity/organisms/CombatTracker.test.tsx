import { render, screen, fireEvent } from '@testing-library/react';
import { CombatTracker, CombatInfo, CombatantInfo } from './CombatTracker';

describe('CombatTracker', () => {
  const mockCombatants: CombatantInfo[] = [
    { id: '1', name: 'Fighter', initiative: 20, hp: { value: 50, max: 50 } },
    { id: '2', name: 'Wizard', initiative: 15, hp: { value: 30, max: 30 } },
    { id: '3', name: 'Goblin', initiative: 10, hp: { value: 5, max: 10 }, defeated: true },
  ];

  const defaultCombat: CombatInfo = {
    id: 'combat-1',
    active: true,
    round: 1,
    turn: 0,
    combatants: mockCombatants,
  };

  it('renders with default testId', () => {
    render(<CombatTracker combat={defaultCombat} />);
    expect(screen.getByTestId('combat-tracker')).toBeInTheDocument();
  });

  it('renders with custom testId', () => {
    render(<CombatTracker combat={defaultCombat} testId="custom-tracker" />);
    expect(screen.getByTestId('custom-tracker')).toBeInTheDocument();
  });

  describe('header', () => {
    it('renders header', () => {
      render(<CombatTracker combat={defaultCombat} />);
      expect(screen.getByTestId('combat-tracker-header')).toBeInTheDocument();
    });

    it('displays Combat Tracker title', () => {
      render(<CombatTracker combat={defaultCombat} />);
      expect(screen.getByText('Combat Tracker')).toBeInTheDocument();
    });

    it('displays current round', () => {
      render(<CombatTracker combat={defaultCombat} />);
      expect(screen.getByText('Round 1')).toBeInTheDocument();
    });

    it('shows In Combat badge when active', () => {
      render(<CombatTracker combat={defaultCombat} />);
      expect(screen.getByTestId('combat-tracker-status')).toHaveTextContent('In Combat');
    });

    it('shows Inactive badge when not active', () => {
      const inactiveCombat = { ...defaultCombat, active: false };
      render(<CombatTracker combat={inactiveCombat} />);
      expect(screen.getByTestId('combat-tracker-status')).toHaveTextContent('Inactive');
    });
  });

  describe('combatant list', () => {
    it('renders combatant list', () => {
      render(<CombatTracker combat={defaultCombat} />);
      expect(screen.getByTestId('combat-tracker-list')).toBeInTheDocument();
    });

    it('renders each combatant', () => {
      render(<CombatTracker combat={defaultCombat} />);
      expect(screen.getByTestId('combat-tracker-combatant-1')).toBeInTheDocument();
      expect(screen.getByTestId('combat-tracker-combatant-2')).toBeInTheDocument();
      expect(screen.getByTestId('combat-tracker-combatant-3')).toBeInTheDocument();
    });

    it('displays combatant names', () => {
      render(<CombatTracker combat={defaultCombat} />);
      expect(screen.getByText('Fighter')).toBeInTheDocument();
      expect(screen.getByText('Wizard')).toBeInTheDocument();
      expect(screen.getByText('Goblin')).toBeInTheDocument();
    });

    it('sorts combatants by initiative (highest first)', () => {
      render(<CombatTracker combat={defaultCombat} />);
      const list = screen.getByTestId('combat-tracker-list');
      const combatantNames = list.querySelectorAll('.font-medium');
      expect(combatantNames[0]).toHaveTextContent('Fighter');
      expect(combatantNames[1]).toHaveTextContent('Wizard');
      expect(combatantNames[2]).toHaveTextContent('Goblin');
    });

    it('shows empty message when no combatants', () => {
      const emptyCombat = { ...defaultCombat, combatants: [] };
      render(<CombatTracker combat={emptyCombat} />);
      expect(screen.getByText('No combatants in this encounter')).toBeInTheDocument();
    });

    it('shows Defeated badge for defeated combatants', () => {
      render(<CombatTracker combat={defaultCombat} />);
      expect(screen.getByText('Defeated')).toBeInTheDocument();
    });

    it('calls onSelectCombatant when combatant clicked', () => {
      const onSelectCombatant = jest.fn();
      render(<CombatTracker combat={defaultCombat} onSelectCombatant={onSelectCombatant} />);
      fireEvent.click(screen.getByTestId('combat-tracker-combatant-1'));
      expect(onSelectCombatant).toHaveBeenCalledWith(expect.objectContaining({ id: '1' }));
    });
  });

  describe('HP display', () => {
    it('displays HP values', () => {
      render(<CombatTracker combat={defaultCombat} />);
      expect(screen.getByText('50/50')).toBeInTheDocument();
      expect(screen.getByText('30/30')).toBeInTheDocument();
      expect(screen.getByText('5/10')).toBeInTheDocument();
    });
  });

  describe('controls', () => {
    it('renders controls when showControls is true and combat is active', () => {
      render(<CombatTracker combat={defaultCombat} onNextTurn={jest.fn()} />);
      expect(screen.getByTestId('combat-tracker-controls')).toBeInTheDocument();
    });

    it('does not render controls when showControls is false', () => {
      render(<CombatTracker combat={defaultCombat} showControls={false} />);
      expect(screen.queryByTestId('combat-tracker-controls')).not.toBeInTheDocument();
    });

    it('does not render controls when combat is not active', () => {
      const inactiveCombat = { ...defaultCombat, active: false };
      render(<CombatTracker combat={inactiveCombat} onNextTurn={jest.fn()} />);
      expect(screen.queryByTestId('combat-tracker-controls')).not.toBeInTheDocument();
    });

    it('displays current combatant turn', () => {
      render(<CombatTracker combat={defaultCombat} onNextTurn={jest.fn()} />);
      expect(screen.getByText("Fighter's turn")).toBeInTheDocument();
    });

    it('renders Next button when onNextTurn provided', () => {
      render(<CombatTracker combat={defaultCombat} onNextTurn={jest.fn()} />);
      expect(screen.getByTestId('combat-tracker-next-btn')).toBeInTheDocument();
    });

    it('calls onNextTurn when Next button clicked', () => {
      const onNextTurn = jest.fn();
      render(<CombatTracker combat={defaultCombat} onNextTurn={onNextTurn} />);
      fireEvent.click(screen.getByTestId('combat-tracker-next-btn'));
      expect(onNextTurn).toHaveBeenCalledTimes(1);
    });

    it('renders Prev button when onPrevTurn provided', () => {
      render(<CombatTracker combat={defaultCombat} onPrevTurn={jest.fn()} />);
      expect(screen.getByTestId('combat-tracker-prev-btn')).toBeInTheDocument();
    });

    it('calls onPrevTurn when Prev button clicked', () => {
      const onPrevTurn = jest.fn();
      render(<CombatTracker combat={defaultCombat} onPrevTurn={onPrevTurn} />);
      fireEvent.click(screen.getByTestId('combat-tracker-prev-btn'));
      expect(onPrevTurn).toHaveBeenCalledTimes(1);
    });

    it('renders End Combat button when onEndCombat provided', () => {
      render(<CombatTracker combat={defaultCombat} onEndCombat={jest.fn()} />);
      expect(screen.getByTestId('combat-tracker-end-btn')).toBeInTheDocument();
    });

    it('calls onEndCombat when End Combat button clicked', () => {
      const onEndCombat = jest.fn();
      render(<CombatTracker combat={defaultCombat} onEndCombat={onEndCombat} />);
      fireEvent.click(screen.getByTestId('combat-tracker-end-btn'));
      expect(onEndCombat).toHaveBeenCalledTimes(1);
    });
  });
});
