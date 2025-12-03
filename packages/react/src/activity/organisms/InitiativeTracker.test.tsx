import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InitiativeTracker } from './InitiativeTracker';

describe('InitiativeTracker', () => {
  const defaultEntries = [
    { id: '1', name: 'Thorin', initiative: 18 },
    { id: '2', name: 'Gandalf', initiative: 15 },
    { id: '3', name: 'Goblin', initiative: 12 },
  ];

  describe('rendering', () => {
    it('renders tracker title', () => {
      render(<InitiativeTracker entries={[]} />);
      expect(screen.getByTestId('initiative-tracker-title')).toHaveTextContent('Initiative');
    });

    it('renders custom title', () => {
      render(<InitiativeTracker entries={[]} title="Combat Order" />);
      expect(screen.getByTestId('initiative-tracker-title')).toHaveTextContent('Combat Order');
    });

    it('renders round number', () => {
      render(<InitiativeTracker entries={[]} round={3} />);
      expect(screen.getByTestId('initiative-tracker-round')).toHaveTextContent('3');
    });

    it('renders active badge when active', () => {
      render(<InitiativeTracker entries={[]} isActive />);
      expect(screen.getByTestId('initiative-tracker-active-badge')).toHaveTextContent('Active');
    });

    it('does not render active badge when not active', () => {
      render(<InitiativeTracker entries={[]} isActive={false} />);
      expect(screen.queryByTestId('initiative-tracker-active-badge')).not.toBeInTheDocument();
    });

    it('renders entry count', () => {
      render(<InitiativeTracker entries={defaultEntries} />);
      expect(screen.getByTestId('initiative-tracker-count')).toHaveTextContent('3 active');
    });

    it('renders defeated count when entries have 0 HP', () => {
      const entries = [
        { id: '1', name: 'Alive', initiative: 18, hp: 10, maxHp: 10 },
        { id: '2', name: 'Dead', initiative: 15, hp: 0, maxHp: 10 },
      ];
      render(<InitiativeTracker entries={entries} />);
      expect(screen.getByTestId('initiative-tracker-count')).toHaveTextContent('1 active');
      expect(screen.getByTestId('initiative-tracker-count')).toHaveTextContent('1 defeated');
    });

    it('renders empty message when no entries', () => {
      render(<InitiativeTracker entries={[]} />);
      expect(screen.getByTestId('initiative-tracker-empty')).toHaveTextContent('No combatants in initiative order');
    });

    it('renders custom empty message', () => {
      render(<InitiativeTracker entries={[]} emptyMessage="Add some combatants!" />);
      expect(screen.getByTestId('initiative-tracker-empty')).toHaveTextContent('Add some combatants!');
    });

    it('renders all entries', () => {
      render(<InitiativeTracker entries={defaultEntries} />);
      expect(screen.getByTestId('initiative-tracker-entry-1')).toBeInTheDocument();
      expect(screen.getByTestId('initiative-tracker-entry-2')).toBeInTheDocument();
      expect(screen.getByTestId('initiative-tracker-entry-3')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<InitiativeTracker entries={[]} className="custom-class" />);
      expect(screen.getByTestId('initiative-tracker')).toHaveClass('custom-class');
    });

    it('applies custom testId', () => {
      render(<InitiativeTracker entries={[]} testId="custom-tracker" />);
      expect(screen.getByTestId('custom-tracker')).toBeInTheDocument();
    });
  });

  describe('sorting', () => {
    it('sorts entries by initiative descending when autoSort is true', () => {
      const unsortedEntries = [
        { id: '1', name: 'Low', initiative: 5 },
        { id: '2', name: 'High', initiative: 20 },
        { id: '3', name: 'Mid', initiative: 12 },
      ];
      render(<InitiativeTracker entries={unsortedEntries} autoSort />);
      // Check order by verifying the names in the entry cards
      const entryNames = screen.getAllByTestId(/-name$/);
      expect(entryNames[0]).toHaveTextContent('High');
      expect(entryNames[1]).toHaveTextContent('Mid');
      expect(entryNames[2]).toHaveTextContent('Low');
    });

    it('preserves entry order when autoSort is false', () => {
      const orderedEntries = [
        { id: '1', name: 'First', initiative: 5 },
        { id: '2', name: 'Second', initiative: 20 },
        { id: '3', name: 'Third', initiative: 12 },
      ];
      render(<InitiativeTracker entries={orderedEntries} autoSort={false} />);
      // Check order by verifying the names in the entry cards
      const entryNames = screen.getAllByTestId(/-name$/);
      expect(entryNames[0]).toHaveTextContent('First');
      expect(entryNames[1]).toHaveTextContent('Second');
      expect(entryNames[2]).toHaveTextContent('Third');
    });
  });

  describe('controls', () => {
    it('renders next turn button when onNextTurn provided', () => {
      render(<InitiativeTracker entries={defaultEntries} onNextTurn={() => {}} />);
      expect(screen.getByTestId('initiative-tracker-next-btn')).toBeInTheDocument();
    });

    it('renders prev turn button when onPrevTurn provided', () => {
      render(<InitiativeTracker entries={defaultEntries} onPrevTurn={() => {}} />);
      expect(screen.getByTestId('initiative-tracker-prev-btn')).toBeInTheDocument();
    });

    it('renders reset button when onResetRound provided', () => {
      render(<InitiativeTracker entries={defaultEntries} onResetRound={() => {}} />);
      expect(screen.getByTestId('initiative-tracker-reset-btn')).toBeInTheDocument();
    });

    it('calls onNextTurn when next button clicked', () => {
      const handleNext = vi.fn();
      render(<InitiativeTracker entries={defaultEntries} onNextTurn={handleNext} />);
      fireEvent.click(screen.getByTestId('initiative-tracker-next-btn'));
      expect(handleNext).toHaveBeenCalledTimes(1);
    });

    it('calls onPrevTurn when prev button clicked', () => {
      const handlePrev = vi.fn();
      render(<InitiativeTracker entries={defaultEntries} onPrevTurn={handlePrev} />);
      fireEvent.click(screen.getByTestId('initiative-tracker-prev-btn'));
      expect(handlePrev).toHaveBeenCalledTimes(1);
    });

    it('calls onResetRound when reset button clicked', () => {
      const handleReset = vi.fn();
      render(<InitiativeTracker entries={defaultEntries} onResetRound={handleReset} />);
      fireEvent.click(screen.getByTestId('initiative-tracker-reset-btn'));
      expect(handleReset).toHaveBeenCalledTimes(1);
    });

    it('disables next/prev buttons when no entries', () => {
      render(<InitiativeTracker entries={[]} onNextTurn={() => {}} onPrevTurn={() => {}} />);
      expect(screen.getByTestId('initiative-tracker-next-btn')).toBeDisabled();
      expect(screen.getByTestId('initiative-tracker-prev-btn')).toBeDisabled();
    });

    it('disables buttons when loading', () => {
      render(
        <InitiativeTracker
          entries={defaultEntries}
          onNextTurn={() => {}}
          onPrevTurn={() => {}}
          onResetRound={() => {}}
          isLoading
        />
      );
      expect(screen.getByTestId('initiative-tracker-next-btn')).toBeDisabled();
      expect(screen.getByTestId('initiative-tracker-prev-btn')).toBeDisabled();
      expect(screen.getByTestId('initiative-tracker-reset-btn')).toBeDisabled();
    });
  });

  describe('current turn', () => {
    it('highlights current turn entry', () => {
      render(<InitiativeTracker entries={defaultEntries} currentTurnId="2" />);
      expect(screen.getByTestId('initiative-tracker-entry-2')).toHaveClass('bg-cfg-primary/20');
    });
  });

  describe('entry interactions', () => {
    it('calls onEntryClick when entry clicked', () => {
      const handleClick = vi.fn();
      render(<InitiativeTracker entries={defaultEntries} onEntryClick={handleClick} />);
      fireEvent.click(screen.getByTestId('initiative-tracker-entry-1'));
      expect(handleClick).toHaveBeenCalledWith(expect.objectContaining({ id: '1', name: 'Thorin' }));
    });

    it('calls onHpChange when HP adjusted', () => {
      const handleHpChange = vi.fn();
      const entries = [{ id: '1', name: 'Thorin', initiative: 18, hp: 25, maxHp: 30 }];
      render(<InitiativeTracker entries={entries} onHpChange={handleHpChange} />);
      fireEvent.click(screen.getByTestId('initiative-tracker-entry-1-hp-increase'));
      expect(handleHpChange).toHaveBeenCalledWith('1', 26);
    });

    it('calls onRemoveEntry when remove button clicked', () => {
      const handleRemove = vi.fn();
      render(<InitiativeTracker entries={defaultEntries} onRemoveEntry={handleRemove} />);
      fireEvent.click(screen.getByTestId('initiative-tracker-entry-1-remove'));
      expect(handleRemove).toHaveBeenCalledWith('1');
    });
  });
});
