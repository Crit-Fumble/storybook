import { render, screen, fireEvent } from '@testing-library/react';
import { RandomTableCard, type RandomTableEntry } from './RandomTableCard';

describe('RandomTableCard', () => {
  const defaultEntries: RandomTableEntry[] = [
    { value: 'Goblin', min: 1, max: 3 },
    { value: 'Orc', min: 4, max: 6 },
    { value: 'Troll', min: 7, max: 10 },
  ];

  const defaultProps = {
    id: 'table-1',
    name: 'Random Encounters',
    entries: defaultEntries,
  };

  describe('rendering', () => {
    it('renders the card with name', () => {
      render(<RandomTableCard {...defaultProps} />);
      expect(screen.getByTestId('random-table-card-name')).toHaveTextContent('Random Encounters');
    });

    it('renders with custom testId', () => {
      render(<RandomTableCard {...defaultProps} testId="custom-table" />);
      expect(screen.getByTestId('custom-table')).toBeInTheDocument();
    });

    it('renders category when provided', () => {
      render(<RandomTableCard {...defaultProps} category="Combat" />);
      expect(screen.getByTestId('random-table-card-category')).toHaveTextContent('Combat');
    });

    it('does not render category when not provided', () => {
      render(<RandomTableCard {...defaultProps} />);
      expect(screen.queryByTestId('random-table-card-category')).not.toBeInTheDocument();
    });
  });

  describe('dice formula badge', () => {
    it('renders dice formula when provided', () => {
      render(<RandomTableCard {...defaultProps} diceFormula="1d10" />);
      expect(screen.getByTestId('random-table-card-dice-badge')).toHaveTextContent('1d10');
    });

    it('does not render dice badge when not provided', () => {
      render(<RandomTableCard {...defaultProps} />);
      expect(screen.queryByTestId('random-table-card-dice-badge')).not.toBeInTheDocument();
    });
  });

  describe('inactive badge', () => {
    it('shows inactive badge when not active', () => {
      render(<RandomTableCard {...defaultProps} isActive={false} />);
      expect(screen.getByTestId('random-table-card-inactive-badge')).toHaveTextContent('Inactive');
    });

    it('does not show inactive badge when active', () => {
      render(<RandomTableCard {...defaultProps} isActive={true} />);
      expect(screen.queryByTestId('random-table-card-inactive-badge')).not.toBeInTheDocument();
    });
  });

  describe('entries display', () => {
    it('renders entries container', () => {
      render(<RandomTableCard {...defaultProps} />);
      expect(screen.getByTestId('random-table-card-entries')).toBeInTheDocument();
    });

    it('renders entries with min-max range', () => {
      render(<RandomTableCard {...defaultProps} />);
      expect(screen.getByTestId('random-table-card-entry-0')).toHaveTextContent('1-3');
      expect(screen.getByTestId('random-table-card-entry-0')).toHaveTextContent('Goblin');
    });

    it('renders entries with only min', () => {
      const entries: RandomTableEntry[] = [
        { value: 'Common', min: 1 },
        { value: 'Rare', min: 2 },
      ];
      render(<RandomTableCard {...defaultProps} entries={entries} />);
      expect(screen.getByTestId('random-table-card-entry-0')).toHaveTextContent('1');
    });

    it('renders entries with only max', () => {
      const entries: RandomTableEntry[] = [
        { value: 'Common', max: 5 },
      ];
      render(<RandomTableCard {...defaultProps} entries={entries} />);
      expect(screen.getByTestId('random-table-card-entry-0')).toHaveTextContent('5');
    });

    it('renders entries with weight', () => {
      const entries: RandomTableEntry[] = [
        { value: 'Common', weight: 3 },
        { value: 'Rare', weight: 1 },
      ];
      render(<RandomTableCard {...defaultProps} entries={entries} />);
      expect(screen.getByTestId('random-table-card-entry-0')).toHaveTextContent('×3');
    });

    it('renders entries with index when no range or weight', () => {
      const entries: RandomTableEntry[] = [
        { value: 'Option A' },
        { value: 'Option B' },
      ];
      render(<RandomTableCard {...defaultProps} entries={entries} />);
      expect(screen.getByTestId('random-table-card-entry-0')).toHaveTextContent('1.');
      expect(screen.getByTestId('random-table-card-entry-1')).toHaveTextContent('2.');
    });

    it('limits displayed entries to previewLimit', () => {
      const entries: RandomTableEntry[] = Array.from({ length: 10 }, (_, i) => ({
        value: `Entry ${i + 1}`,
      }));
      render(<RandomTableCard {...defaultProps} entries={entries} previewLimit={3} />);
      expect(screen.getByTestId('random-table-card-entry-0')).toBeInTheDocument();
      expect(screen.getByTestId('random-table-card-entry-1')).toBeInTheDocument();
      expect(screen.getByTestId('random-table-card-entry-2')).toBeInTheDocument();
      expect(screen.queryByTestId('random-table-card-entry-3')).not.toBeInTheDocument();
    });

    it('shows remaining count when entries exceed previewLimit', () => {
      const entries: RandomTableEntry[] = Array.from({ length: 10 }, (_, i) => ({
        value: `Entry ${i + 1}`,
      }));
      render(<RandomTableCard {...defaultProps} entries={entries} previewLimit={3} />);
      expect(screen.getByText('+7 more entries')).toBeInTheDocument();
    });

    it('uses default previewLimit of 5', () => {
      const entries: RandomTableEntry[] = Array.from({ length: 10 }, (_, i) => ({
        value: `Entry ${i + 1}`,
      }));
      render(<RandomTableCard {...defaultProps} entries={entries} />);
      expect(screen.getByText('+5 more entries')).toBeInTheDocument();
    });
  });

  describe('entry count and created by', () => {
    it('displays entry count singular', () => {
      const entries: RandomTableEntry[] = [{ value: 'Single' }];
      render(<RandomTableCard {...defaultProps} entries={entries} />);
      expect(screen.getByTestId('random-table-card-entry-count')).toHaveTextContent('1 entry');
    });

    it('displays entry count plural', () => {
      render(<RandomTableCard {...defaultProps} />);
      expect(screen.getByTestId('random-table-card-entry-count')).toHaveTextContent('3 entries');
    });

    it('displays created by when provided', () => {
      render(<RandomTableCard {...defaultProps} createdBy="DungeonMaster" />);
      expect(screen.getByTestId('random-table-card-created-by')).toHaveTextContent('by DungeonMaster');
    });

    it('does not display created by when not provided', () => {
      render(<RandomTableCard {...defaultProps} />);
      expect(screen.queryByTestId('random-table-card-created-by')).not.toBeInTheDocument();
    });
  });

  describe('click behavior', () => {
    it('calls onClick when card is clicked', () => {
      const handleClick = jest.fn();
      render(<RandomTableCard {...defaultProps} onClick={handleClick} />);
      fireEvent.click(screen.getByTestId('random-table-card'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('has button role when onClick is provided', () => {
      render(<RandomTableCard {...defaultProps} onClick={() => {}} />);
      expect(screen.getByTestId('random-table-card')).toHaveAttribute('role', 'button');
    });

    it('responds to Enter key', () => {
      const handleClick = jest.fn();
      render(<RandomTableCard {...defaultProps} onClick={handleClick} />);
      fireEvent.keyDown(screen.getByTestId('random-table-card'), { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('responds to Space key', () => {
      const handleClick = jest.fn();
      render(<RandomTableCard {...defaultProps} onClick={handleClick} />);
      fireEvent.keyDown(screen.getByTestId('random-table-card'), { key: ' ' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when loading', () => {
      const handleClick = jest.fn();
      render(<RandomTableCard {...defaultProps} onClick={handleClick} isLoading={true} />);
      fireEvent.click(screen.getByTestId('random-table-card'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('action buttons', () => {
    describe('roll button', () => {
      it('renders when onRoll provided', () => {
        render(<RandomTableCard {...defaultProps} onRoll={() => {}} />);
        expect(screen.getByTestId('random-table-card-roll-btn')).toBeInTheDocument();
      });

      it('calls onRoll when clicked', () => {
        const handleRoll = jest.fn();
        render(<RandomTableCard {...defaultProps} onRoll={handleRoll} />);
        fireEvent.click(screen.getByTestId('random-table-card-roll-btn'));
        expect(handleRoll).toHaveBeenCalledTimes(1);
      });

      it('stops propagation', () => {
        const handleClick = jest.fn();
        const handleRoll = jest.fn();
        render(<RandomTableCard {...defaultProps} onClick={handleClick} onRoll={handleRoll} />);
        fireEvent.click(screen.getByTestId('random-table-card-roll-btn'));
        expect(handleRoll).toHaveBeenCalled();
        expect(handleClick).not.toHaveBeenCalled();
      });
    });

    describe('edit button', () => {
      it('renders when onEdit provided', () => {
        render(<RandomTableCard {...defaultProps} onEdit={() => {}} />);
        expect(screen.getByTestId('random-table-card-edit-btn')).toBeInTheDocument();
      });

      it('calls onEdit when clicked', () => {
        const handleEdit = jest.fn();
        render(<RandomTableCard {...defaultProps} onEdit={handleEdit} />);
        fireEvent.click(screen.getByTestId('random-table-card-edit-btn'));
        expect(handleEdit).toHaveBeenCalledTimes(1);
      });

      it('stops propagation', () => {
        const handleClick = jest.fn();
        const handleEdit = jest.fn();
        render(<RandomTableCard {...defaultProps} onClick={handleClick} onEdit={handleEdit} />);
        fireEvent.click(screen.getByTestId('random-table-card-edit-btn'));
        expect(handleEdit).toHaveBeenCalled();
        expect(handleClick).not.toHaveBeenCalled();
      });
    });

    describe('delete button', () => {
      it('renders when onDelete provided', () => {
        render(<RandomTableCard {...defaultProps} onDelete={() => {}} />);
        expect(screen.getByTestId('random-table-card-delete-btn')).toBeInTheDocument();
      });

      it('calls onDelete when clicked', () => {
        const handleDelete = jest.fn();
        render(<RandomTableCard {...defaultProps} onDelete={handleDelete} />);
        fireEvent.click(screen.getByTestId('random-table-card-delete-btn'));
        expect(handleDelete).toHaveBeenCalledTimes(1);
      });

      it('stops propagation', () => {
        const handleClick = jest.fn();
        const handleDelete = jest.fn();
        render(<RandomTableCard {...defaultProps} onClick={handleClick} onDelete={handleDelete} />);
        fireEvent.click(screen.getByTestId('random-table-card-delete-btn'));
        expect(handleDelete).toHaveBeenCalled();
        expect(handleClick).not.toHaveBeenCalled();
      });
    });

    it('disables buttons when loading', () => {
      render(
        <RandomTableCard
          {...defaultProps}
          onRoll={() => {}}
          onEdit={() => {}}
          onDelete={() => {}}
          isLoading={true}
        />
      );
      expect(screen.getByTestId('random-table-card-roll-btn')).toBeDisabled();
      expect(screen.getByTestId('random-table-card-edit-btn')).toBeDisabled();
      expect(screen.getByTestId('random-table-card-delete-btn')).toBeDisabled();
    });
  });

  describe('styling', () => {
    it('applies custom className', () => {
      render(<RandomTableCard {...defaultProps} className="custom-class" />);
      expect(screen.getByTestId('random-table-card')).toHaveClass('custom-class');
    });

    it('applies inactive styling when not active', () => {
      render(<RandomTableCard {...defaultProps} isActive={false} />);
      expect(screen.getByTestId('random-table-card')).toHaveClass('opacity-60');
    });

    it('applies loading styling when loading', () => {
      render(<RandomTableCard {...defaultProps} isLoading={true} />);
      expect(screen.getByTestId('random-table-card')).toHaveClass('opacity-70');
    });
  });
});
