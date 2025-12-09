import { render, screen, fireEvent } from '@testing-library/react';
import { ContentToolbar } from './ContentToolbar';

describe('ContentToolbar', () => {
  const defaultProps = {
    title: 'Test Page',
  };

  it('renders with title', () => {
    render(<ContentToolbar {...defaultProps} />);
    expect(screen.getByTestId('content-toolbar-title')).toHaveTextContent('Test Page');
  });

  it('renders with default testId', () => {
    render(<ContentToolbar {...defaultProps} />);
    expect(screen.getByTestId('content-toolbar')).toBeInTheDocument();
  });

  it('renders with custom testId', () => {
    render(<ContentToolbar {...defaultProps} testId="custom-toolbar" />);
    expect(screen.getByTestId('custom-toolbar')).toBeInTheDocument();
  });

  describe('subtitle and metadata', () => {
    it('renders subtitle when provided', () => {
      render(<ContentToolbar {...defaultProps} subtitle="This is a subtitle" />);
      expect(screen.getByTestId('content-toolbar-subtitle')).toHaveTextContent('This is a subtitle');
    });

    it('does not render subtitle when not provided', () => {
      render(<ContentToolbar {...defaultProps} />);
      expect(screen.queryByTestId('content-toolbar-subtitle')).not.toBeInTheDocument();
    });

    it('renders metadata when provided', () => {
      render(<ContentToolbar {...defaultProps} metadata="Last updated: 2024-01-01" />);
      expect(screen.getByTestId('content-toolbar-metadata')).toHaveTextContent('Last updated: 2024-01-01');
    });

    it('does not render metadata when not provided', () => {
      render(<ContentToolbar {...defaultProps} />);
      expect(screen.queryByTestId('content-toolbar-metadata')).not.toBeInTheDocument();
    });
  });

  describe('view mode (not editing)', () => {
    it('shows Edit button when canEdit and onEdit provided', () => {
      const onEdit = jest.fn();
      render(<ContentToolbar {...defaultProps} canEdit onEdit={onEdit} />);
      expect(screen.getByTestId('content-toolbar-edit-btn')).toBeInTheDocument();
    });

    it('calls onEdit when Edit button clicked', () => {
      const onEdit = jest.fn();
      render(<ContentToolbar {...defaultProps} canEdit onEdit={onEdit} />);
      fireEvent.click(screen.getByTestId('content-toolbar-edit-btn'));
      expect(onEdit).toHaveBeenCalledTimes(1);
    });

    it('shows Delete button when canDelete and onDelete provided', () => {
      const onDelete = jest.fn();
      render(<ContentToolbar {...defaultProps} canDelete onDelete={onDelete} />);
      expect(screen.getByTestId('content-toolbar-delete-btn')).toBeInTheDocument();
    });

    it('calls onDelete when Delete button clicked', () => {
      const onDelete = jest.fn();
      render(<ContentToolbar {...defaultProps} canDelete onDelete={onDelete} />);
      fireEvent.click(screen.getByTestId('content-toolbar-delete-btn'));
      expect(onDelete).toHaveBeenCalledTimes(1);
    });

    it('shows Deleting... when deleting is true', () => {
      const onDelete = jest.fn();
      render(<ContentToolbar {...defaultProps} canDelete onDelete={onDelete} deleting />);
      expect(screen.getByText('Deleting...')).toBeInTheDocument();
    });

    it('shows Read-only when canEdit and canDelete are false', () => {
      render(<ContentToolbar {...defaultProps} canEdit={false} canDelete={false} />);
      expect(screen.getByText('Read-only')).toBeInTheDocument();
    });
  });

  describe('edit mode', () => {
    const editProps = {
      ...defaultProps,
      isEditing: true,
      editTitle: 'Edited Title',
      onTitleChange: jest.fn(),
      onSave: jest.fn(),
      onCancel: jest.fn(),
    };

    it('shows title input when editing', () => {
      render(<ContentToolbar {...editProps} />);
      const input = screen.getByTestId('content-toolbar-title-input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue('Edited Title');
    });

    it('calls onTitleChange when input changes', () => {
      const onTitleChange = jest.fn();
      render(<ContentToolbar {...editProps} onTitleChange={onTitleChange} />);
      fireEvent.change(screen.getByTestId('content-toolbar-title-input'), {
        target: { value: 'New Title' },
      });
      expect(onTitleChange).toHaveBeenCalledWith('New Title');
    });

    it('shows Save and Cancel buttons when editing', () => {
      render(<ContentToolbar {...editProps} />);
      expect(screen.getByTestId('content-toolbar-save-btn')).toBeInTheDocument();
      expect(screen.getByTestId('content-toolbar-cancel-btn')).toBeInTheDocument();
    });

    it('calls onSave when Save button clicked', () => {
      const onSave = jest.fn();
      render(<ContentToolbar {...editProps} onSave={onSave} />);
      fireEvent.click(screen.getByTestId('content-toolbar-save-btn'));
      expect(onSave).toHaveBeenCalledTimes(1);
    });

    it('calls onCancel when Cancel button clicked', () => {
      const onCancel = jest.fn();
      render(<ContentToolbar {...editProps} onCancel={onCancel} />);
      fireEvent.click(screen.getByTestId('content-toolbar-cancel-btn'));
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('shows Saving... when saving is true', () => {
      render(<ContentToolbar {...editProps} saving />);
      expect(screen.getByText('Saving...')).toBeInTheDocument();
    });

    it('disables Save button when saving', () => {
      render(<ContentToolbar {...editProps} saving />);
      expect(screen.getByTestId('content-toolbar-save-btn')).toBeDisabled();
    });
  });
});
