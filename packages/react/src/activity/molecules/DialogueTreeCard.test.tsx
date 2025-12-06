import { render, screen, fireEvent } from '@testing-library/react';
import { DialogueTreeCard, type DialogueNodePreview } from './DialogueTreeCard';

describe('DialogueTreeCard', () => {
  const defaultProps = {
    id: 'dialogue-1',
    npcId: 'npc-1',
    npcName: 'Mysterious Merchant',
    nodeCount: 5,
  };

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-15T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('rendering', () => {
    it('renders the card with NPC name', () => {
      render(<DialogueTreeCard {...defaultProps} />);
      expect(screen.getByTestId('dialogue-tree-card-npc-name')).toHaveTextContent('Mysterious Merchant');
    });

    it('renders with custom testId', () => {
      render(<DialogueTreeCard {...defaultProps} testId="custom-dialogue" />);
      expect(screen.getByTestId('custom-dialogue')).toBeInTheDocument();
    });

    it('shows "Dialogue Tree" subtitle', () => {
      render(<DialogueTreeCard {...defaultProps} />);
      expect(screen.getByText('Dialogue Tree')).toBeInTheDocument();
    });
  });

  describe('node count badge', () => {
    it('displays node count singular', () => {
      render(<DialogueTreeCard {...defaultProps} nodeCount={1} />);
      expect(screen.getByTestId('dialogue-tree-card-node-badge')).toHaveTextContent('1 node');
    });

    it('displays node count plural', () => {
      render(<DialogueTreeCard {...defaultProps} nodeCount={5} />);
      expect(screen.getByTestId('dialogue-tree-card-node-badge')).toHaveTextContent('5 nodes');
    });
  });

  describe('inactive badge', () => {
    it('shows inactive badge when not active', () => {
      render(<DialogueTreeCard {...defaultProps} isActive={false} />);
      expect(screen.getByTestId('dialogue-tree-card-inactive-badge')).toHaveTextContent('Inactive');
    });

    it('does not show inactive badge when active', () => {
      render(<DialogueTreeCard {...defaultProps} isActive={true} />);
      expect(screen.queryByTestId('dialogue-tree-card-inactive-badge')).not.toBeInTheDocument();
    });
  });

  describe('start node preview', () => {
    const startNodePreview: DialogueNodePreview = {
      id: 'node-1',
      text: 'Welcome, traveler! What brings you to my shop?',
      responseCount: 3,
    };

    it('renders start node preview when provided', () => {
      render(<DialogueTreeCard {...defaultProps} startNodePreview={startNodePreview} />);
      expect(screen.getByTestId('dialogue-tree-card-start-preview')).toBeInTheDocument();
    });

    it('displays starting dialogue text', () => {
      render(<DialogueTreeCard {...defaultProps} startNodePreview={startNodePreview} />);
      expect(screen.getByTestId('dialogue-tree-card-start-preview')).toHaveTextContent(
        'Welcome, traveler!'
      );
    });

    it('displays response count singular', () => {
      const preview: DialogueNodePreview = { ...startNodePreview, responseCount: 1 };
      render(<DialogueTreeCard {...defaultProps} startNodePreview={preview} />);
      expect(screen.getByTestId('dialogue-tree-card-start-preview')).toHaveTextContent('1 response option');
    });

    it('displays response count plural', () => {
      render(<DialogueTreeCard {...defaultProps} startNodePreview={startNodePreview} />);
      expect(screen.getByTestId('dialogue-tree-card-start-preview')).toHaveTextContent('3 response options');
    });

    it('does not display response count when zero', () => {
      const preview: DialogueNodePreview = { ...startNodePreview, responseCount: 0 };
      render(<DialogueTreeCard {...defaultProps} startNodePreview={preview} />);
      expect(screen.getByTestId('dialogue-tree-card-start-preview')).not.toHaveTextContent('response option');
    });

    it('does not render preview when not provided', () => {
      render(<DialogueTreeCard {...defaultProps} />);
      expect(screen.queryByTestId('dialogue-tree-card-start-preview')).not.toBeInTheDocument();
    });
  });

  describe('created by and generated at', () => {
    it('displays created by when provided', () => {
      render(<DialogueTreeCard {...defaultProps} createdBy="DungeonMaster" />);
      expect(screen.getByTestId('dialogue-tree-card-created-by')).toHaveTextContent('by DungeonMaster');
    });

    it('does not display created by when not provided', () => {
      render(<DialogueTreeCard {...defaultProps} />);
      expect(screen.queryByTestId('dialogue-tree-card-created-by')).not.toBeInTheDocument();
    });

    it('displays generated at as "Just now"', () => {
      render(<DialogueTreeCard {...defaultProps} generatedAt="2024-01-15T11:59:30Z" />);
      expect(screen.getByTestId('dialogue-tree-card-generated-at')).toHaveTextContent('Just now');
    });

    it('displays generated at in minutes', () => {
      render(<DialogueTreeCard {...defaultProps} generatedAt="2024-01-15T11:30:00Z" />);
      expect(screen.getByTestId('dialogue-tree-card-generated-at')).toHaveTextContent('30m ago');
    });

    it('displays generated at in hours', () => {
      render(<DialogueTreeCard {...defaultProps} generatedAt="2024-01-15T09:00:00Z" />);
      expect(screen.getByTestId('dialogue-tree-card-generated-at')).toHaveTextContent('3h ago');
    });

    it('displays generated at in days', () => {
      render(<DialogueTreeCard {...defaultProps} generatedAt="2024-01-12T12:00:00Z" />);
      expect(screen.getByTestId('dialogue-tree-card-generated-at')).toHaveTextContent('3d ago');
    });

    it('displays generated at as date for old dates', () => {
      render(<DialogueTreeCard {...defaultProps} generatedAt="2023-12-01T12:00:00Z" />);
      expect(screen.getByTestId('dialogue-tree-card-generated-at')).toBeInTheDocument();
    });

    it('does not display generated at when not provided', () => {
      render(<DialogueTreeCard {...defaultProps} />);
      expect(screen.queryByTestId('dialogue-tree-card-generated-at')).not.toBeInTheDocument();
    });
  });

  describe('click behavior', () => {
    it('calls onClick when card is clicked', () => {
      const handleClick = jest.fn();
      render(<DialogueTreeCard {...defaultProps} onClick={handleClick} />);
      fireEvent.click(screen.getByTestId('dialogue-tree-card'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('has button role when onClick is provided', () => {
      render(<DialogueTreeCard {...defaultProps} onClick={() => {}} />);
      expect(screen.getByTestId('dialogue-tree-card')).toHaveAttribute('role', 'button');
    });

    it('responds to Enter key', () => {
      const handleClick = jest.fn();
      render(<DialogueTreeCard {...defaultProps} onClick={handleClick} />);
      fireEvent.keyDown(screen.getByTestId('dialogue-tree-card'), { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('responds to Space key', () => {
      const handleClick = jest.fn();
      render(<DialogueTreeCard {...defaultProps} onClick={handleClick} />);
      fireEvent.keyDown(screen.getByTestId('dialogue-tree-card'), { key: ' ' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when loading', () => {
      const handleClick = jest.fn();
      render(<DialogueTreeCard {...defaultProps} onClick={handleClick} isLoading={true} />);
      fireEvent.click(screen.getByTestId('dialogue-tree-card'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('action buttons', () => {
    describe('preview button', () => {
      it('renders when onPreview provided', () => {
        render(<DialogueTreeCard {...defaultProps} onPreview={() => {}} />);
        expect(screen.getByTestId('dialogue-tree-card-preview-btn')).toBeInTheDocument();
      });

      it('calls onPreview when clicked', () => {
        const handlePreview = jest.fn();
        render(<DialogueTreeCard {...defaultProps} onPreview={handlePreview} />);
        fireEvent.click(screen.getByTestId('dialogue-tree-card-preview-btn'));
        expect(handlePreview).toHaveBeenCalledTimes(1);
      });

      it('stops propagation', () => {
        const handleClick = jest.fn();
        const handlePreview = jest.fn();
        render(<DialogueTreeCard {...defaultProps} onClick={handleClick} onPreview={handlePreview} />);
        fireEvent.click(screen.getByTestId('dialogue-tree-card-preview-btn'));
        expect(handlePreview).toHaveBeenCalled();
        expect(handleClick).not.toHaveBeenCalled();
      });
    });

    describe('edit button', () => {
      it('renders when onEdit provided', () => {
        render(<DialogueTreeCard {...defaultProps} onEdit={() => {}} />);
        expect(screen.getByTestId('dialogue-tree-card-edit-btn')).toBeInTheDocument();
      });

      it('calls onEdit when clicked', () => {
        const handleEdit = jest.fn();
        render(<DialogueTreeCard {...defaultProps} onEdit={handleEdit} />);
        fireEvent.click(screen.getByTestId('dialogue-tree-card-edit-btn'));
        expect(handleEdit).toHaveBeenCalledTimes(1);
      });

      it('stops propagation', () => {
        const handleClick = jest.fn();
        const handleEdit = jest.fn();
        render(<DialogueTreeCard {...defaultProps} onClick={handleClick} onEdit={handleEdit} />);
        fireEvent.click(screen.getByTestId('dialogue-tree-card-edit-btn'));
        expect(handleEdit).toHaveBeenCalled();
        expect(handleClick).not.toHaveBeenCalled();
      });
    });

    describe('delete button', () => {
      it('renders when onDelete provided', () => {
        render(<DialogueTreeCard {...defaultProps} onDelete={() => {}} />);
        expect(screen.getByTestId('dialogue-tree-card-delete-btn')).toBeInTheDocument();
      });

      it('calls onDelete when clicked', () => {
        const handleDelete = jest.fn();
        render(<DialogueTreeCard {...defaultProps} onDelete={handleDelete} />);
        fireEvent.click(screen.getByTestId('dialogue-tree-card-delete-btn'));
        expect(handleDelete).toHaveBeenCalledTimes(1);
      });

      it('stops propagation', () => {
        const handleClick = jest.fn();
        const handleDelete = jest.fn();
        render(<DialogueTreeCard {...defaultProps} onClick={handleClick} onDelete={handleDelete} />);
        fireEvent.click(screen.getByTestId('dialogue-tree-card-delete-btn'));
        expect(handleDelete).toHaveBeenCalled();
        expect(handleClick).not.toHaveBeenCalled();
      });
    });

    it('disables buttons when loading', () => {
      render(
        <DialogueTreeCard
          {...defaultProps}
          onPreview={() => {}}
          onEdit={() => {}}
          onDelete={() => {}}
          isLoading={true}
        />
      );
      expect(screen.getByTestId('dialogue-tree-card-preview-btn')).toBeDisabled();
      expect(screen.getByTestId('dialogue-tree-card-edit-btn')).toBeDisabled();
      expect(screen.getByTestId('dialogue-tree-card-delete-btn')).toBeDisabled();
    });
  });

  describe('styling', () => {
    it('applies custom className', () => {
      render(<DialogueTreeCard {...defaultProps} className="custom-class" />);
      expect(screen.getByTestId('dialogue-tree-card')).toHaveClass('custom-class');
    });

    it('applies inactive styling when not active', () => {
      render(<DialogueTreeCard {...defaultProps} isActive={false} />);
      expect(screen.getByTestId('dialogue-tree-card')).toHaveClass('opacity-60');
    });

    it('applies loading styling when loading', () => {
      render(<DialogueTreeCard {...defaultProps} isLoading={true} />);
      expect(screen.getByTestId('dialogue-tree-card')).toHaveClass('opacity-70');
    });
  });
});
