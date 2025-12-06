import { render, screen, fireEvent } from '@testing-library/react';
import { KBArticleCard } from './KBArticleCard';

describe('KBArticleCard', () => {
  const defaultProps = {
    slug: 'fireball-spell',
    title: 'Fireball',
    system: 'dnd5e',
    category: 'Spells',
  };

  describe('rendering', () => {
    it('renders the card with title', () => {
      render(<KBArticleCard {...defaultProps} />);
      expect(screen.getByTestId('kb-article-card-title')).toHaveTextContent('Fireball');
    });

    it('renders with custom testId', () => {
      render(<KBArticleCard {...defaultProps} testId="custom-kb" />);
      expect(screen.getByTestId('custom-kb')).toBeInTheDocument();
    });

    it('renders category', () => {
      render(<KBArticleCard {...defaultProps} />);
      expect(screen.getByTestId('kb-article-card-category')).toHaveTextContent('Spells');
    });
  });

  describe('system badge', () => {
    it('displays D&D 5e for dnd5e', () => {
      render(<KBArticleCard {...defaultProps} system="dnd5e" />);
      expect(screen.getByTestId('kb-article-card-system-badge')).toHaveTextContent('D&D 5e');
    });

    it('displays D&D 2024 for dnd2024', () => {
      render(<KBArticleCard {...defaultProps} system="dnd2024" />);
      expect(screen.getByTestId('kb-article-card-system-badge')).toHaveTextContent('D&D 2024');
    });

    it('displays Pathfinder 2e for pathfinder2e', () => {
      render(<KBArticleCard {...defaultProps} system="pathfinder2e" />);
      expect(screen.getByTestId('kb-article-card-system-badge')).toHaveTextContent('Pathfinder 2e');
    });

    it('displays Pathfinder 2e for pf2e', () => {
      render(<KBArticleCard {...defaultProps} system="pf2e" />);
      expect(screen.getByTestId('kb-article-card-system-badge')).toHaveTextContent('Pathfinder 2e');
    });

    it('displays 13th Age for 13thage', () => {
      render(<KBArticleCard {...defaultProps} system="13thage" />);
      expect(screen.getByTestId('kb-article-card-system-badge')).toHaveTextContent('13th Age');
    });

    it('displays Starfinder for starfinder', () => {
      render(<KBArticleCard {...defaultProps} system="starfinder" />);
      expect(screen.getByTestId('kb-article-card-system-badge')).toHaveTextContent('Starfinder');
    });

    it('displays Fate for fate', () => {
      render(<KBArticleCard {...defaultProps} system="fate" />);
      expect(screen.getByTestId('kb-article-card-system-badge')).toHaveTextContent('Fate');
    });

    it('displays Powered by the Apocalypse for pbta', () => {
      render(<KBArticleCard {...defaultProps} system="pbta" />);
      expect(screen.getByTestId('kb-article-card-system-badge')).toHaveTextContent('Powered by the Apocalypse');
    });

    it('displays Call of Cthulhu for coc', () => {
      render(<KBArticleCard {...defaultProps} system="coc" />);
      expect(screen.getByTestId('kb-article-card-system-badge')).toHaveTextContent('Call of Cthulhu');
    });

    it('displays Warhammer Fantasy for wfrp', () => {
      render(<KBArticleCard {...defaultProps} system="wfrp" />);
      expect(screen.getByTestId('kb-article-card-system-badge')).toHaveTextContent('Warhammer Fantasy');
    });

    it('displays raw system name for unknown systems', () => {
      render(<KBArticleCard {...defaultProps} system="custom-system" />);
      expect(screen.getByTestId('kb-article-card-system-badge')).toHaveTextContent('custom-system');
    });

    it('handles case-insensitive system lookup', () => {
      render(<KBArticleCard {...defaultProps} system="DND5E" />);
      expect(screen.getByTestId('kb-article-card-system-badge')).toHaveTextContent('D&D 5e');
    });
  });

  describe('source', () => {
    it('displays source when provided', () => {
      render(<KBArticleCard {...defaultProps} source="Player's Handbook" />);
      expect(screen.getByTestId('kb-article-card-source')).toHaveTextContent("Player's Handbook");
    });

    it('does not display source when not provided', () => {
      render(<KBArticleCard {...defaultProps} />);
      expect(screen.queryByTestId('kb-article-card-source')).not.toBeInTheDocument();
    });
  });

  describe('tags', () => {
    it('renders tags container when tags provided', () => {
      render(<KBArticleCard {...defaultProps} tags={['fire', 'damage', 'evocation']} />);
      expect(screen.getByTestId('kb-article-card-tags')).toBeInTheDocument();
    });

    it('displays tags', () => {
      render(<KBArticleCard {...defaultProps} tags={['fire', 'damage', 'evocation']} />);
      expect(screen.getByText('fire')).toBeInTheDocument();
      expect(screen.getByText('damage')).toBeInTheDocument();
      expect(screen.getByText('evocation')).toBeInTheDocument();
    });

    it('limits displayed tags to maxTags', () => {
      const tags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'];
      render(<KBArticleCard {...defaultProps} tags={tags} maxTags={3} />);
      expect(screen.getByText('tag1')).toBeInTheDocument();
      expect(screen.getByText('tag2')).toBeInTheDocument();
      expect(screen.getByText('tag3')).toBeInTheDocument();
      expect(screen.queryByText('tag4')).not.toBeInTheDocument();
    });

    it('shows remaining count when tags exceed maxTags', () => {
      const tags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'];
      render(<KBArticleCard {...defaultProps} tags={tags} maxTags={3} />);
      expect(screen.getByText('+2 more')).toBeInTheDocument();
    });

    it('uses default maxTags of 3', () => {
      const tags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6'];
      render(<KBArticleCard {...defaultProps} tags={tags} />);
      expect(screen.getByText('+3 more')).toBeInTheDocument();
    });

    it('does not render tags container when no tags', () => {
      render(<KBArticleCard {...defaultProps} />);
      expect(screen.queryByTestId('kb-article-card-tags')).not.toBeInTheDocument();
    });

    it('does not render tags container when empty tags array', () => {
      render(<KBArticleCard {...defaultProps} tags={[]} />);
      expect(screen.queryByTestId('kb-article-card-tags')).not.toBeInTheDocument();
    });
  });

  describe('click behavior', () => {
    it('calls onClick when card is clicked', () => {
      const handleClick = jest.fn();
      render(<KBArticleCard {...defaultProps} onClick={handleClick} />);
      fireEvent.click(screen.getByTestId('kb-article-card'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('has button role when onClick is provided', () => {
      render(<KBArticleCard {...defaultProps} onClick={() => {}} />);
      expect(screen.getByTestId('kb-article-card')).toHaveAttribute('role', 'button');
    });

    it('does not have button role when onClick is not provided', () => {
      render(<KBArticleCard {...defaultProps} />);
      expect(screen.getByTestId('kb-article-card')).not.toHaveAttribute('role');
    });

    it('responds to Enter key', () => {
      const handleClick = jest.fn();
      render(<KBArticleCard {...defaultProps} onClick={handleClick} />);
      fireEvent.keyDown(screen.getByTestId('kb-article-card'), { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('responds to Space key', () => {
      const handleClick = jest.fn();
      render(<KBArticleCard {...defaultProps} onClick={handleClick} />);
      fireEvent.keyDown(screen.getByTestId('kb-article-card'), { key: ' ' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not respond to other keys', () => {
      const handleClick = jest.fn();
      render(<KBArticleCard {...defaultProps} onClick={handleClick} />);
      fireEvent.keyDown(screen.getByTestId('kb-article-card'), { key: 'a' });
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', () => {
      const handleClick = jest.fn();
      render(<KBArticleCard {...defaultProps} onClick={handleClick} isLoading={true} />);
      fireEvent.click(screen.getByTestId('kb-article-card'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('view button', () => {
    it('renders when onView provided', () => {
      render(<KBArticleCard {...defaultProps} onView={() => {}} />);
      expect(screen.getByTestId('kb-article-card-view-btn')).toBeInTheDocument();
    });

    it('displays "Read Article" text', () => {
      render(<KBArticleCard {...defaultProps} onView={() => {}} />);
      expect(screen.getByTestId('kb-article-card-view-btn')).toHaveTextContent('Read Article');
    });

    it('calls onView when clicked', () => {
      const handleView = jest.fn();
      render(<KBArticleCard {...defaultProps} onView={handleView} />);
      fireEvent.click(screen.getByTestId('kb-article-card-view-btn'));
      expect(handleView).toHaveBeenCalledTimes(1);
    });

    it('stops propagation', () => {
      const handleClick = jest.fn();
      const handleView = jest.fn();
      render(<KBArticleCard {...defaultProps} onClick={handleClick} onView={handleView} />);
      fireEvent.click(screen.getByTestId('kb-article-card-view-btn'));
      expect(handleView).toHaveBeenCalled();
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('disables button when loading', () => {
      render(<KBArticleCard {...defaultProps} onView={() => {}} isLoading={true} />);
      expect(screen.getByTestId('kb-article-card-view-btn')).toBeDisabled();
    });

    it('does not render when onView not provided', () => {
      render(<KBArticleCard {...defaultProps} />);
      expect(screen.queryByTestId('kb-article-card-view-btn')).not.toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('applies custom className', () => {
      render(<KBArticleCard {...defaultProps} className="custom-class" />);
      expect(screen.getByTestId('kb-article-card')).toHaveClass('custom-class');
    });

    it('applies loading styling when loading', () => {
      render(<KBArticleCard {...defaultProps} isLoading={true} />);
      expect(screen.getByTestId('kb-article-card')).toHaveClass('opacity-70');
    });
  });
});
