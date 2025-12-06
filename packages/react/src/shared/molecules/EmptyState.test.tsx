
import { render, screen, fireEvent } from '@testing-library/react';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  describe('rendering', () => {
    it('renders title', () => {
      render(<EmptyState title="No items found" />);
      expect(screen.getByText('No items found')).toBeInTheDocument();
    });

    it('renders default icon when not provided', () => {
      render(<EmptyState title="No items" testId="empty" />);
      expect(screen.getByTestId('empty-icon')).toHaveTextContent('📭');
    });

    it('renders custom icon when provided', () => {
      render(<EmptyState title="No items" icon="🔍" testId="empty" />);
      expect(screen.getByTestId('empty-icon')).toHaveTextContent('🔍');
    });

    it('renders description when provided', () => {
      render(<EmptyState title="No items" description="Try adding some items" />);
      expect(screen.getByText('Try adding some items')).toBeInTheDocument();
    });

    it('does not render description when not provided', () => {
      render(<EmptyState title="No items" testId="empty" />);
      expect(screen.queryByTestId('empty-description')).not.toBeInTheDocument();
    });

    it('applies testId to container', () => {
      render(<EmptyState title="No items" testId="empty" />);
      expect(screen.getByTestId('empty')).toBeInTheDocument();
    });

    it('applies testId to icon', () => {
      render(<EmptyState title="No items" testId="empty" />);
      expect(screen.getByTestId('empty-icon')).toBeInTheDocument();
    });

    it('applies testId to title', () => {
      render(<EmptyState title="No items" testId="empty" />);
      expect(screen.getByTestId('empty-title')).toBeInTheDocument();
    });

    it('applies testId to description when present', () => {
      render(<EmptyState title="No items" description="Description" testId="empty" />);
      expect(screen.getByTestId('empty-description')).toBeInTheDocument();
    });
  });

  describe('action button', () => {
    it('renders action button when both actionLabel and onAction are provided', () => {
      render(
        <EmptyState
          title="No items"
          actionLabel="Add Item"
          onAction={() => {}}
          testId="empty"
        />
      );
      expect(screen.getByTestId('empty-action')).toBeInTheDocument();
      expect(screen.getByText('Add Item')).toBeInTheDocument();
    });

    it('does not render action button when only actionLabel is provided', () => {
      render(<EmptyState title="No items" actionLabel="Add Item" testId="empty" />);
      expect(screen.queryByTestId('empty-action')).not.toBeInTheDocument();
    });

    it('does not render action button when only onAction is provided', () => {
      render(<EmptyState title="No items" onAction={() => {}} testId="empty" />);
      expect(screen.queryByTestId('empty-action')).not.toBeInTheDocument();
    });

    it('calls onAction when button is clicked', () => {
      const handleAction = jest.fn();
      render(
        <EmptyState
          title="No items"
          actionLabel="Add Item"
          onAction={handleAction}
          testId="empty"
        />
      );

      fireEvent.click(screen.getByTestId('empty-action'));
      expect(handleAction).toHaveBeenCalledTimes(1);
    });
  });

  describe('styling', () => {
    it('applies centering styles to container', () => {
      render(<EmptyState title="No items" testId="empty" />);
      const container = screen.getByTestId('empty');
      expect(container).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center', 'text-center');
    });

    it('applies correct title styling', () => {
      render(<EmptyState title="No items" testId="empty" />);
      const title = screen.getByTestId('empty-title');
      expect(title).toHaveClass('text-lg', 'font-semibold', 'text-cfg-text-normal');
    });

    it('applies correct description styling', () => {
      render(<EmptyState title="No items" description="Description" testId="empty" />);
      const description = screen.getByTestId('empty-description');
      expect(description).toHaveClass('text-cfg-text-muted', 'max-w-sm');
    });
  });
});
