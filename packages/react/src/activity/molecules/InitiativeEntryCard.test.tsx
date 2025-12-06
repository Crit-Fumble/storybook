import { render, screen, fireEvent } from '@testing-library/react';
import { InitiativeEntryCard } from './InitiativeEntryCard';

describe('InitiativeEntryCard', () => {
  const defaultProps = {
    id: 'entry-1',
    name: 'Thorin Ironforge',
    initiative: 18,
  };

  describe('rendering', () => {
    it('renders entry name', () => {
      render(<InitiativeEntryCard {...defaultProps} />);
      expect(screen.getByTestId('initiative-entry-card-name')).toHaveTextContent('Thorin Ironforge');
    });

    it('renders initiative value', () => {
      render(<InitiativeEntryCard {...defaultProps} />);
      expect(screen.getByTestId('initiative-entry-card-initiative')).toHaveTextContent('18');
    });

    it('renders avatar when provided', () => {
      render(<InitiativeEntryCard {...defaultProps} avatarUrl="https://example.com/avatar.png" />);
      expect(screen.getByTestId('initiative-entry-card-avatar')).toBeInTheDocument();
    });

    it('renders avatar placeholder when no avatar', () => {
      render(<InitiativeEntryCard {...defaultProps} />);
      expect(screen.getByTestId('initiative-entry-card-avatar-placeholder')).toHaveTextContent('T');
    });

    it('renders player badge when isPlayer', () => {
      render(<InitiativeEntryCard {...defaultProps} isPlayer />);
      expect(screen.getByTestId('initiative-entry-card-player-badge')).toHaveTextContent('PC');
    });

    it('renders turn badge when isCurrentTurn', () => {
      render(<InitiativeEntryCard {...defaultProps} isCurrentTurn />);
      expect(screen.getByTestId('initiative-entry-card-turn-badge')).toHaveTextContent('Turn');
    });

    it('renders HP when provided', () => {
      render(<InitiativeEntryCard {...defaultProps} hp={25} maxHp={30} />);
      expect(screen.getByTestId('initiative-entry-card-hp')).toHaveTextContent('25/30');
    });

    it('renders AC when provided', () => {
      render(<InitiativeEntryCard {...defaultProps} ac={16} />);
      expect(screen.getByTestId('initiative-entry-card-ac')).toHaveTextContent('16');
    });

    it('renders conditions when provided', () => {
      render(<InitiativeEntryCard {...defaultProps} conditions={['Poisoned', 'Stunned']} />);
      const conditions = screen.getByTestId('initiative-entry-card-conditions');
      expect(conditions).toHaveTextContent('Poisoned');
      expect(conditions).toHaveTextContent('Stunned');
    });

    it('applies custom className', () => {
      render(<InitiativeEntryCard {...defaultProps} className="custom-class" />);
      expect(screen.getByTestId('initiative-entry-card')).toHaveClass('custom-class');
    });

    it('applies custom testId', () => {
      render(<InitiativeEntryCard {...defaultProps} testId="custom-entry" />);
      expect(screen.getByTestId('custom-entry')).toBeInTheDocument();
    });

    it('applies defeated styling when isDefeated', () => {
      render(<InitiativeEntryCard {...defaultProps} isDefeated />);
      expect(screen.getByTestId('initiative-entry-card')).toHaveClass('opacity-50');
    });

    it('applies current turn styling when isCurrentTurn', () => {
      render(<InitiativeEntryCard {...defaultProps} isCurrentTurn />);
      expect(screen.getByTestId('initiative-entry-card')).toHaveClass('bg-cfg-primary/20');
    });
  });

  describe('HP controls', () => {
    it('shows HP adjustment buttons when onHpChange provided', () => {
      const handleHpChange = jest.fn();
      render(<InitiativeEntryCard {...defaultProps} hp={25} maxHp={30} onHpChange={handleHpChange} />);
      expect(screen.getByTestId('initiative-entry-card-hp-decrease')).toBeInTheDocument();
      expect(screen.getByTestId('initiative-entry-card-hp-increase')).toBeInTheDocument();
    });

    it('calls onHpChange with decreased HP when minus clicked', () => {
      const handleHpChange = jest.fn();
      render(<InitiativeEntryCard {...defaultProps} hp={25} maxHp={30} onHpChange={handleHpChange} />);
      fireEvent.click(screen.getByTestId('initiative-entry-card-hp-decrease'));
      expect(handleHpChange).toHaveBeenCalledWith(24);
    });

    it('calls onHpChange with increased HP when plus clicked', () => {
      const handleHpChange = jest.fn();
      render(<InitiativeEntryCard {...defaultProps} hp={25} maxHp={30} onHpChange={handleHpChange} />);
      fireEvent.click(screen.getByTestId('initiative-entry-card-hp-increase'));
      expect(handleHpChange).toHaveBeenCalledWith(26);
    });

    it('does not go below 0 HP', () => {
      const handleHpChange = jest.fn();
      render(<InitiativeEntryCard {...defaultProps} hp={0} maxHp={30} onHpChange={handleHpChange} />);
      fireEvent.click(screen.getByTestId('initiative-entry-card-hp-decrease'));
      expect(handleHpChange).toHaveBeenCalledWith(0);
    });
  });

  describe('interactions', () => {
    it('calls onClick when clicked', () => {
      const handleClick = jest.fn();
      render(<InitiativeEntryCard {...defaultProps} onClick={handleClick} />);
      fireEvent.click(screen.getByTestId('initiative-entry-card'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick on Enter key', () => {
      const handleClick = jest.fn();
      render(<InitiativeEntryCard {...defaultProps} onClick={handleClick} />);
      fireEvent.keyDown(screen.getByTestId('initiative-entry-card'), { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick on Space key', () => {
      const handleClick = jest.fn();
      render(<InitiativeEntryCard {...defaultProps} onClick={handleClick} />);
      fireEvent.keyDown(screen.getByTestId('initiative-entry-card'), { key: ' ' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when loading', () => {
      const handleClick = jest.fn();
      render(<InitiativeEntryCard {...defaultProps} onClick={handleClick} isLoading />);
      fireEvent.click(screen.getByTestId('initiative-entry-card'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('calls onRemove when remove button clicked', () => {
      const handleRemove = jest.fn();
      render(<InitiativeEntryCard {...defaultProps} onRemove={handleRemove} />);
      fireEvent.click(screen.getByTestId('initiative-entry-card-remove'));
      expect(handleRemove).toHaveBeenCalledTimes(1);
    });

    it('stops propagation when clicking remove button', () => {
      const handleClick = jest.fn();
      const handleRemove = jest.fn();
      render(<InitiativeEntryCard {...defaultProps} onClick={handleClick} onRemove={handleRemove} />);
      fireEvent.click(screen.getByTestId('initiative-entry-card-remove'));
      expect(handleRemove).toHaveBeenCalled();
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('stops propagation when clicking HP buttons', () => {
      const handleClick = jest.fn();
      const handleHpChange = jest.fn();
      render(<InitiativeEntryCard {...defaultProps} onClick={handleClick} hp={25} maxHp={30} onHpChange={handleHpChange} />);
      fireEvent.click(screen.getByTestId('initiative-entry-card-hp-increase'));
      expect(handleHpChange).toHaveBeenCalled();
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('has button role when clickable', () => {
      render(<InitiativeEntryCard {...defaultProps} onClick={() => {}} />);
      expect(screen.getByTestId('initiative-entry-card')).toHaveAttribute('role', 'button');
    });

    it('has tabIndex when clickable', () => {
      render(<InitiativeEntryCard {...defaultProps} onClick={() => {}} />);
      expect(screen.getByTestId('initiative-entry-card')).toHaveAttribute('tabIndex', '0');
    });

    it('does not have button role when not clickable', () => {
      render(<InitiativeEntryCard {...defaultProps} />);
      expect(screen.getByTestId('initiative-entry-card')).not.toHaveAttribute('role');
    });

    it('remove button has accessible label', () => {
      render(<InitiativeEntryCard {...defaultProps} onRemove={() => {}} />);
      expect(screen.getByTestId('initiative-entry-card-remove')).toHaveAttribute('aria-label', 'Remove Thorin Ironforge');
    });
  });
});
