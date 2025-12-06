
import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterCard } from './CharacterCard';

describe('CharacterCard', () => {
  const defaultProps = {
    name: 'Thorin Ironforge',
    type: 'pc' as const,
  };

  describe('rendering', () => {
    it('renders character name', () => {
      render(<CharacterCard {...defaultProps} />);
      expect(screen.getByTestId('character-card-name')).toHaveTextContent('Thorin Ironforge');
    });

    it('renders character type badge', () => {
      render(<CharacterCard {...defaultProps} />);
      expect(screen.getByTestId('character-card-type-badge')).toHaveTextContent('PC');
    });

    it('renders NPC type correctly', () => {
      render(<CharacterCard {...defaultProps} type="npc" />);
      expect(screen.getByTestId('character-card-type-badge')).toHaveTextContent('NPC');
    });

    it('renders familiar type correctly', () => {
      render(<CharacterCard {...defaultProps} type="familiar" />);
      expect(screen.getByTestId('character-card-type-badge')).toHaveTextContent('Familiar');
    });

    it('renders companion type correctly', () => {
      render(<CharacterCard {...defaultProps} type="companion" />);
      expect(screen.getByTestId('character-card-type-badge')).toHaveTextContent('Companion');
    });

    it('renders monster type correctly', () => {
      render(<CharacterCard {...defaultProps} type="monster" />);
      expect(screen.getByTestId('character-card-type-badge')).toHaveTextContent('Monster');
    });

    it('renders avatar when provided', () => {
      render(<CharacterCard {...defaultProps} avatarUrl="https://example.com/avatar.png" />);
      expect(screen.getByTestId('character-card-avatar')).toBeInTheDocument();
    });

    it('renders owner name when provided', () => {
      render(<CharacterCard {...defaultProps} ownerName="John" />);
      expect(screen.getByTestId('character-card-owner')).toHaveTextContent('Played by John');
    });

    it('shows retired badge when retired', () => {
      render(<CharacterCard {...defaultProps} isRetired />);
      expect(screen.getByTestId('character-card-retired-badge')).toHaveTextContent('Retired');
    });

    it('shows active status when active', () => {
      render(<CharacterCard {...defaultProps} isActive />);
      expect(screen.getByTestId('character-card-status')).toHaveTextContent('Active');
    });

    it('shows inactive status when not active', () => {
      render(<CharacterCard {...defaultProps} isActive={false} />);
      expect(screen.getByTestId('character-card-status')).toHaveTextContent('Inactive');
    });

    it('shows sync time when provided', () => {
      const syncTime = new Date(Date.now() - 5 * 60000); // 5 minutes ago
      render(<CharacterCard {...defaultProps} lastSyncedAt={syncTime} />);
      expect(screen.getByTestId('character-card-sync-time')).toHaveTextContent('Synced 5m ago');
    });

    it('applies custom className', () => {
      render(<CharacterCard {...defaultProps} className="custom-class" />);
      expect(screen.getByTestId('character-card')).toHaveClass('custom-class');
    });

    it('applies custom testId', () => {
      render(<CharacterCard {...defaultProps} testId="custom-card" />);
      expect(screen.getByTestId('custom-card')).toBeInTheDocument();
    });
  });

  describe('sync time formatting', () => {
    it('shows "Just now" for recent syncs', () => {
      const syncTime = new Date(Date.now() - 30000); // 30 seconds ago
      render(<CharacterCard {...defaultProps} lastSyncedAt={syncTime} />);
      expect(screen.getByTestId('character-card-sync-time')).toHaveTextContent('Just now');
    });

    it('shows hours for older syncs', () => {
      const syncTime = new Date(Date.now() - 3 * 3600000); // 3 hours ago
      render(<CharacterCard {...defaultProps} lastSyncedAt={syncTime} />);
      expect(screen.getByTestId('character-card-sync-time')).toHaveTextContent('3h ago');
    });

    it('shows days for very old syncs', () => {
      const syncTime = new Date(Date.now() - 3 * 86400000); // 3 days ago
      render(<CharacterCard {...defaultProps} lastSyncedAt={syncTime} />);
      expect(screen.getByTestId('character-card-sync-time')).toHaveTextContent('3d ago');
    });
  });

  describe('interactions', () => {
    it('calls onClick when clicked', () => {
      const handleClick = jest.fn();
      render(<CharacterCard {...defaultProps} onClick={handleClick} />);
      fireEvent.click(screen.getByTestId('character-card'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick on Enter key', () => {
      const handleClick = jest.fn();
      render(<CharacterCard {...defaultProps} onClick={handleClick} />);
      fireEvent.keyDown(screen.getByTestId('character-card'), { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when loading', () => {
      const handleClick = jest.fn();
      render(<CharacterCard {...defaultProps} onClick={handleClick} isLoading />);
      fireEvent.click(screen.getByTestId('character-card'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('calls onEdit when edit button clicked', () => {
      const handleEdit = jest.fn();
      render(<CharacterCard {...defaultProps} onEdit={handleEdit} />);
      fireEvent.click(screen.getByTestId('character-card-edit-btn'));
      expect(handleEdit).toHaveBeenCalledTimes(1);
    });

    it('calls onDelete when delete button clicked', () => {
      const handleDelete = jest.fn();
      render(<CharacterCard {...defaultProps} onDelete={handleDelete} />);
      fireEvent.click(screen.getByTestId('character-card-delete-btn'));
      expect(handleDelete).toHaveBeenCalledTimes(1);
    });

    it('shows "Retire" on delete button when not retired', () => {
      render(<CharacterCard {...defaultProps} onDelete={() => {}} />);
      expect(screen.getByTestId('character-card-delete-btn')).toHaveTextContent('Retire');
    });

    it('shows "Delete" on delete button when retired', () => {
      render(<CharacterCard {...defaultProps} onDelete={() => {}} isRetired />);
      expect(screen.getByTestId('character-card-delete-btn')).toHaveTextContent('Delete');
    });

    it('disables action buttons when loading', () => {
      render(<CharacterCard {...defaultProps} onEdit={() => {}} onDelete={() => {}} isLoading />);
      expect(screen.getByTestId('character-card-edit-btn')).toBeDisabled();
      expect(screen.getByTestId('character-card-delete-btn')).toBeDisabled();
    });

    it('stops propagation when clicking action buttons', () => {
      const handleClick = jest.fn();
      const handleEdit = jest.fn();
      render(<CharacterCard {...defaultProps} onClick={handleClick} onEdit={handleEdit} />);
      fireEvent.click(screen.getByTestId('character-card-edit-btn'));
      expect(handleEdit).toHaveBeenCalled();
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('has button role when clickable', () => {
      render(<CharacterCard {...defaultProps} onClick={() => {}} />);
      expect(screen.getByTestId('character-card')).toHaveAttribute('role', 'button');
    });

    it('has tabIndex when clickable', () => {
      render(<CharacterCard {...defaultProps} onClick={() => {}} />);
      expect(screen.getByTestId('character-card')).toHaveAttribute('tabIndex', '0');
    });

    it('does not have button role when not clickable', () => {
      render(<CharacterCard {...defaultProps} />);
      expect(screen.getByTestId('character-card')).not.toHaveAttribute('role');
    });
  });
});
