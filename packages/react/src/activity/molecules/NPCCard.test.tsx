import { render, screen, fireEvent } from '@testing-library/react';
import { NPCCard } from './NPCCard';

describe('NPCCard', () => {
  const defaultProps = {
    name: 'Bartender Bob',
  };

  describe('rendering', () => {
    it('renders NPC name', () => {
      render(<NPCCard {...defaultProps} />);
      expect(screen.getByTestId('npc-card-name')).toHaveTextContent('Bartender Bob');
    });

    it('renders avatar when provided', () => {
      render(<NPCCard {...defaultProps} avatarUrl="https://example.com/avatar.png" />);
      expect(screen.getByTestId('npc-card-avatar')).toBeInTheDocument();
    });

    it('renders avatar placeholder when no avatar', () => {
      render(<NPCCard {...defaultProps} />);
      expect(screen.getByTestId('npc-card-avatar-placeholder')).toHaveTextContent('B');
    });

    it('renders race when provided', () => {
      render(<NPCCard {...defaultProps} race="Human" />);
      expect(screen.getByTestId('npc-card-race')).toHaveTextContent('Human');
    });

    it('renders occupation when provided', () => {
      render(<NPCCard {...defaultProps} occupation="Tavern Owner" />);
      expect(screen.getByTestId('npc-card-occupation')).toHaveTextContent('Tavern Owner');
    });

    it('renders description when provided', () => {
      render(<NPCCard {...defaultProps} description="A friendly barkeep with a missing tooth." />);
      expect(screen.getByTestId('npc-card-description')).toHaveTextContent('A friendly barkeep with a missing tooth.');
    });

    it('renders traits when provided', () => {
      render(<NPCCard {...defaultProps} traits={['Friendly', 'Talkative']} />);
      const traits = screen.getByTestId('npc-card-traits');
      expect(traits).toHaveTextContent('Friendly');
      expect(traits).toHaveTextContent('Talkative');
    });

    it('renders quirk when provided', () => {
      render(<NPCCard {...defaultProps} quirk="Always wipes glasses nervously." />);
      expect(screen.getByTestId('npc-card-quirk')).toHaveTextContent('Always wipes glasses nervously.');
    });

    it('renders quote when provided', () => {
      render(<NPCCard {...defaultProps} quote="What'll it be, stranger?" />);
      expect(screen.getByTestId('npc-card-quote')).toHaveTextContent('"What\'ll it be, stranger?"');
    });

    it('renders secret section when secret provided', () => {
      render(<NPCCard {...defaultProps} secret="He is a spy for the crown." />);
      expect(screen.getByTestId('npc-card-secret')).toBeInTheDocument();
    });

    it('hides secret content by default', () => {
      render(<NPCCard {...defaultProps} secret="He is a spy for the crown." />);
      expect(screen.getByTestId('npc-card-secret')).toHaveTextContent('[Hidden - click reveal to show]');
    });

    it('shows secret content when showSecret is true', () => {
      render(<NPCCard {...defaultProps} secret="He is a spy for the crown." showSecret />);
      expect(screen.getByTestId('npc-card-secret')).toHaveTextContent('He is a spy for the crown.');
    });

    it('applies custom className', () => {
      render(<NPCCard {...defaultProps} className="custom-class" />);
      expect(screen.getByTestId('npc-card')).toHaveClass('custom-class');
    });

    it('applies custom testId', () => {
      render(<NPCCard {...defaultProps} testId="custom-npc" />);
      expect(screen.getByTestId('custom-npc')).toBeInTheDocument();
    });

    it('applies loading state styling', () => {
      render(<NPCCard {...defaultProps} isLoading />);
      expect(screen.getByTestId('npc-card')).toHaveClass('opacity-70');
    });
  });

  describe('save button', () => {
    it('renders save button when onSave provided', () => {
      render(<NPCCard {...defaultProps} onSave={() => {}} />);
      expect(screen.getByTestId('npc-card-save-btn')).toBeInTheDocument();
    });

    it('shows star when saved', () => {
      render(<NPCCard {...defaultProps} onSave={() => {}} isSaved />);
      expect(screen.getByTestId('npc-card-save-btn')).toHaveTextContent('★');
    });

    it('shows empty star when not saved', () => {
      render(<NPCCard {...defaultProps} onSave={() => {}} isSaved={false} />);
      expect(screen.getByTestId('npc-card-save-btn')).toHaveTextContent('☆');
    });

    it('calls onSave when clicked', () => {
      const handleSave = jest.fn();
      render(<NPCCard {...defaultProps} onSave={handleSave} />);
      fireEvent.click(screen.getByTestId('npc-card-save-btn'));
      expect(handleSave).toHaveBeenCalledTimes(1);
    });

    it('disables save button when loading', () => {
      render(<NPCCard {...defaultProps} onSave={() => {}} isLoading />);
      expect(screen.getByTestId('npc-card-save-btn')).toBeDisabled();
    });
  });

  describe('edit button', () => {
    it('renders edit button when onEdit provided', () => {
      render(<NPCCard {...defaultProps} onEdit={() => {}} />);
      expect(screen.getByTestId('npc-card-edit-btn')).toBeInTheDocument();
    });

    it('calls onEdit when clicked', () => {
      const handleEdit = jest.fn();
      render(<NPCCard {...defaultProps} onEdit={handleEdit} />);
      fireEvent.click(screen.getByTestId('npc-card-edit-btn'));
      expect(handleEdit).toHaveBeenCalledTimes(1);
    });

    it('disables edit button when loading', () => {
      render(<NPCCard {...defaultProps} onEdit={() => {}} isLoading />);
      expect(screen.getByTestId('npc-card-edit-btn')).toBeDisabled();
    });
  });

  describe('use button', () => {
    it('renders use button when onUse provided', () => {
      render(<NPCCard {...defaultProps} onUse={() => {}} />);
      expect(screen.getByTestId('npc-card-use-btn')).toBeInTheDocument();
    });

    it('calls onUse when clicked', () => {
      const handleUse = jest.fn();
      render(<NPCCard {...defaultProps} onUse={handleUse} />);
      fireEvent.click(screen.getByTestId('npc-card-use-btn'));
      expect(handleUse).toHaveBeenCalledTimes(1);
    });

    it('disables use button when loading', () => {
      render(<NPCCard {...defaultProps} onUse={() => {}} isLoading />);
      expect(screen.getByTestId('npc-card-use-btn')).toBeDisabled();
    });
  });

  describe('secret toggle', () => {
    it('renders toggle button when onToggleSecret provided', () => {
      render(<NPCCard {...defaultProps} secret="Hidden info" onToggleSecret={() => {}} />);
      expect(screen.getByTestId('npc-card-toggle-secret')).toBeInTheDocument();
    });

    it('shows "Reveal" when secret hidden', () => {
      render(<NPCCard {...defaultProps} secret="Hidden info" onToggleSecret={() => {}} showSecret={false} />);
      expect(screen.getByTestId('npc-card-toggle-secret')).toHaveTextContent('Reveal');
    });

    it('shows "Hide" when secret visible', () => {
      render(<NPCCard {...defaultProps} secret="Hidden info" onToggleSecret={() => {}} showSecret />);
      expect(screen.getByTestId('npc-card-toggle-secret')).toHaveTextContent('Hide');
    });

    it('calls onToggleSecret when clicked', () => {
      const handleToggle = jest.fn();
      render(<NPCCard {...defaultProps} secret="Hidden info" onToggleSecret={handleToggle} />);
      fireEvent.click(screen.getByTestId('npc-card-toggle-secret'));
      expect(handleToggle).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('save button has accessible label when not saved', () => {
      render(<NPCCard {...defaultProps} onSave={() => {}} isSaved={false} />);
      expect(screen.getByTestId('npc-card-save-btn')).toHaveAttribute('aria-label', 'Save NPC');
    });

    it('save button has accessible label when saved', () => {
      render(<NPCCard {...defaultProps} onSave={() => {}} isSaved />);
      expect(screen.getByTestId('npc-card-save-btn')).toHaveAttribute('aria-label', 'Unsave NPC');
    });

    it('edit button has accessible label', () => {
      render(<NPCCard {...defaultProps} onEdit={() => {}} />);
      expect(screen.getByTestId('npc-card-edit-btn')).toHaveAttribute('aria-label', 'Edit NPC');
    });
  });
});
