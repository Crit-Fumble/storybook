import { render, screen, fireEvent } from '@testing-library/react';
import { WikiPageCard, type WikiPageAuthor } from './WikiPageCard';

describe('WikiPageCard', () => {
  const defaultProps = {
    id: 'page-1',
    slug: 'getting-started',
    title: 'Getting Started Guide',
    category: 'Documentation',
  };

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-15T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('rendering', () => {
    it('renders the card with title', () => {
      render(<WikiPageCard {...defaultProps} />);
      expect(screen.getByTestId('wiki-page-card-title')).toHaveTextContent('Getting Started Guide');
    });

    it('renders with custom testId', () => {
      render(<WikiPageCard {...defaultProps} testId="custom-wiki" />);
      expect(screen.getByTestId('custom-wiki')).toBeInTheDocument();
    });

    it('renders category', () => {
      render(<WikiPageCard {...defaultProps} />);
      expect(screen.getByTestId('wiki-page-card-category')).toHaveTextContent('Documentation');
    });
  });

  describe('description', () => {
    it('renders description when provided', () => {
      render(<WikiPageCard {...defaultProps} description="A comprehensive guide to getting started" />);
      expect(screen.getByTestId('wiki-page-card-description')).toHaveTextContent(
        'A comprehensive guide to getting started'
      );
    });

    it('does not render description when not provided', () => {
      render(<WikiPageCard {...defaultProps} />);
      expect(screen.queryByTestId('wiki-page-card-description')).not.toBeInTheDocument();
    });
  });

  describe('published status badge', () => {
    it('shows published badge when published', () => {
      render(<WikiPageCard {...defaultProps} isPublished={true} />);
      expect(screen.getByTestId('wiki-page-card-published-badge')).toHaveTextContent('Published');
    });

    it('shows draft badge when not published', () => {
      render(<WikiPageCard {...defaultProps} isPublished={false} />);
      expect(screen.getByTestId('wiki-page-card-draft-badge')).toHaveTextContent('Draft');
    });

    it('defaults to published', () => {
      render(<WikiPageCard {...defaultProps} />);
      expect(screen.getByTestId('wiki-page-card-published-badge')).toBeInTheDocument();
    });
  });

  describe('author', () => {
    const author: WikiPageAuthor = {
      id: 'user-1',
      name: 'John Doe',
    };

    it('displays author name', () => {
      render(<WikiPageCard {...defaultProps} author={author} />);
      expect(screen.getByTestId('wiki-page-card-author')).toHaveTextContent('by John Doe');
    });

    it('displays "Unknown" when author has no name', () => {
      render(<WikiPageCard {...defaultProps} author={{ id: 'user-1' }} />);
      expect(screen.getByTestId('wiki-page-card-author')).toHaveTextContent('by Unknown');
    });

    it('displays author image when provided', () => {
      const authorWithImage: WikiPageAuthor = {
        ...author,
        image: 'https://example.com/avatar.jpg',
      };
      render(<WikiPageCard {...defaultProps} author={authorWithImage} />);
      const img = screen.getByTestId('wiki-page-card-author').querySelector('img');
      expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });

    it('does not display author when not provided', () => {
      render(<WikiPageCard {...defaultProps} />);
      expect(screen.queryByTestId('wiki-page-card-author')).not.toBeInTheDocument();
    });
  });

  describe('last editor', () => {
    const author: WikiPageAuthor = { id: 'user-1', name: 'John Doe' };
    const lastEditor: WikiPageAuthor = { id: 'user-2', name: 'Jane Smith' };

    it('displays last editor when different from author', () => {
      render(<WikiPageCard {...defaultProps} author={author} lastEditor={lastEditor} />);
      expect(screen.getByTestId('wiki-page-card-editor')).toHaveTextContent('edited by Jane Smith');
    });

    it('does not display last editor when same as author', () => {
      render(<WikiPageCard {...defaultProps} author={author} lastEditor={author} />);
      expect(screen.queryByTestId('wiki-page-card-editor')).not.toBeInTheDocument();
    });

    it('displays last editor image when provided', () => {
      const editorWithImage: WikiPageAuthor = {
        ...lastEditor,
        image: 'https://example.com/editor.jpg',
      };
      render(<WikiPageCard {...defaultProps} author={author} lastEditor={editorWithImage} />);
      const img = screen.getByTestId('wiki-page-card-editor').querySelector('img');
      expect(img).toHaveAttribute('src', 'https://example.com/editor.jpg');
    });
  });

  describe('updated at', () => {
    it('displays updated at as "Just now"', () => {
      render(<WikiPageCard {...defaultProps} updatedAt="2024-01-15T11:59:30Z" />);
      expect(screen.getByTestId('wiki-page-card-updated')).toHaveTextContent('Just now');
    });

    it('displays updated at in minutes', () => {
      render(<WikiPageCard {...defaultProps} updatedAt="2024-01-15T11:30:00Z" />);
      expect(screen.getByTestId('wiki-page-card-updated')).toHaveTextContent('30m ago');
    });

    it('displays updated at in hours', () => {
      render(<WikiPageCard {...defaultProps} updatedAt="2024-01-15T09:00:00Z" />);
      expect(screen.getByTestId('wiki-page-card-updated')).toHaveTextContent('3h ago');
    });

    it('displays updated at in days', () => {
      render(<WikiPageCard {...defaultProps} updatedAt="2024-01-12T12:00:00Z" />);
      expect(screen.getByTestId('wiki-page-card-updated')).toHaveTextContent('3d ago');
    });

    it('displays updated at as date for old dates', () => {
      render(<WikiPageCard {...defaultProps} updatedAt="2023-12-01T12:00:00Z" />);
      expect(screen.getByTestId('wiki-page-card-updated')).toBeInTheDocument();
    });

    it('does not display updated at when not provided', () => {
      render(<WikiPageCard {...defaultProps} />);
      expect(screen.queryByTestId('wiki-page-card-updated')).not.toBeInTheDocument();
    });
  });

  describe('click behavior', () => {
    it('calls onClick when card is clicked', () => {
      const handleClick = jest.fn();
      render(<WikiPageCard {...defaultProps} onClick={handleClick} />);
      fireEvent.click(screen.getByTestId('wiki-page-card'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('has button role when onClick is provided', () => {
      render(<WikiPageCard {...defaultProps} onClick={() => {}} />);
      expect(screen.getByTestId('wiki-page-card')).toHaveAttribute('role', 'button');
    });

    it('responds to Enter key', () => {
      const handleClick = jest.fn();
      render(<WikiPageCard {...defaultProps} onClick={handleClick} />);
      fireEvent.keyDown(screen.getByTestId('wiki-page-card'), { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('responds to Space key', () => {
      const handleClick = jest.fn();
      render(<WikiPageCard {...defaultProps} onClick={handleClick} />);
      fireEvent.keyDown(screen.getByTestId('wiki-page-card'), { key: ' ' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when loading', () => {
      const handleClick = jest.fn();
      render(<WikiPageCard {...defaultProps} onClick={handleClick} isLoading={true} />);
      fireEvent.click(screen.getByTestId('wiki-page-card'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('action buttons', () => {
    describe('view button', () => {
      it('renders when onView provided', () => {
        render(<WikiPageCard {...defaultProps} onView={() => {}} />);
        expect(screen.getByTestId('wiki-page-card-view-btn')).toBeInTheDocument();
      });

      it('calls onView when clicked', () => {
        const handleView = jest.fn();
        render(<WikiPageCard {...defaultProps} onView={handleView} />);
        fireEvent.click(screen.getByTestId('wiki-page-card-view-btn'));
        expect(handleView).toHaveBeenCalledTimes(1);
      });

      it('stops propagation', () => {
        const handleClick = jest.fn();
        const handleView = jest.fn();
        render(<WikiPageCard {...defaultProps} onClick={handleClick} onView={handleView} />);
        fireEvent.click(screen.getByTestId('wiki-page-card-view-btn'));
        expect(handleView).toHaveBeenCalled();
        expect(handleClick).not.toHaveBeenCalled();
      });
    });

    describe('edit button', () => {
      it('renders when onEdit provided', () => {
        render(<WikiPageCard {...defaultProps} onEdit={() => {}} />);
        expect(screen.getByTestId('wiki-page-card-edit-btn')).toBeInTheDocument();
      });

      it('calls onEdit when clicked', () => {
        const handleEdit = jest.fn();
        render(<WikiPageCard {...defaultProps} onEdit={handleEdit} />);
        fireEvent.click(screen.getByTestId('wiki-page-card-edit-btn'));
        expect(handleEdit).toHaveBeenCalledTimes(1);
      });

      it('stops propagation', () => {
        const handleClick = jest.fn();
        const handleEdit = jest.fn();
        render(<WikiPageCard {...defaultProps} onClick={handleClick} onEdit={handleEdit} />);
        fireEvent.click(screen.getByTestId('wiki-page-card-edit-btn'));
        expect(handleEdit).toHaveBeenCalled();
        expect(handleClick).not.toHaveBeenCalled();
      });
    });

    describe('delete button', () => {
      it('renders when onDelete provided', () => {
        render(<WikiPageCard {...defaultProps} onDelete={() => {}} />);
        expect(screen.getByTestId('wiki-page-card-delete-btn')).toBeInTheDocument();
      });

      it('calls onDelete when clicked', () => {
        const handleDelete = jest.fn();
        render(<WikiPageCard {...defaultProps} onDelete={handleDelete} />);
        fireEvent.click(screen.getByTestId('wiki-page-card-delete-btn'));
        expect(handleDelete).toHaveBeenCalledTimes(1);
      });

      it('stops propagation', () => {
        const handleClick = jest.fn();
        const handleDelete = jest.fn();
        render(<WikiPageCard {...defaultProps} onClick={handleClick} onDelete={handleDelete} />);
        fireEvent.click(screen.getByTestId('wiki-page-card-delete-btn'));
        expect(handleDelete).toHaveBeenCalled();
        expect(handleClick).not.toHaveBeenCalled();
      });
    });

    it('disables buttons when loading', () => {
      render(
        <WikiPageCard
          {...defaultProps}
          onView={() => {}}
          onEdit={() => {}}
          onDelete={() => {}}
          isLoading={true}
        />
      );
      expect(screen.getByTestId('wiki-page-card-view-btn')).toBeDisabled();
      expect(screen.getByTestId('wiki-page-card-edit-btn')).toBeDisabled();
      expect(screen.getByTestId('wiki-page-card-delete-btn')).toBeDisabled();
    });
  });

  describe('styling', () => {
    it('applies custom className', () => {
      render(<WikiPageCard {...defaultProps} className="custom-class" />);
      expect(screen.getByTestId('wiki-page-card')).toHaveClass('custom-class');
    });

    it('applies loading styling when loading', () => {
      render(<WikiPageCard {...defaultProps} isLoading={true} />);
      expect(screen.getByTestId('wiki-page-card')).toHaveClass('opacity-70');
    });
  });
});
