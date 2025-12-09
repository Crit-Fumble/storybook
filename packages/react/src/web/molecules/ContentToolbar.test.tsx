
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContentToolbar } from './ContentToolbar';

describe('ContentToolbar', () => {
  it('renders title in display mode', () => {
    render(<ContentToolbar title="Test Title" />);

    expect(screen.getByTestId('content-toolbar-title')).toHaveTextContent('Test Title');
  });

  it('renders subtitle when provided', () => {
    render(<ContentToolbar title="Title" subtitle="Subtitle" />);

    expect(screen.getByTestId('content-toolbar-subtitle')).toHaveTextContent('Subtitle');
  });

  it('renders metadata when provided', () => {
    render(<ContentToolbar title="Title" metadata="Last updated: 2024" />);

    expect(screen.getByTestId('content-toolbar-metadata')).toHaveTextContent(
      'Last updated: 2024'
    );
  });

  it('shows edit button when canEdit is true', () => {
    render(<ContentToolbar title="Title" canEdit onEdit={jest.fn()} />);

    expect(screen.getByTestId('content-toolbar-edit-btn')).toBeInTheDocument();
  });

  it('shows delete button when canDelete is true', () => {
    render(<ContentToolbar title="Title" canDelete onDelete={jest.fn()} />);

    expect(screen.getByTestId('content-toolbar-delete-btn')).toBeInTheDocument();
  });

  it('shows read-only message when cannot edit or delete', () => {
    render(<ContentToolbar title="Title" canEdit={false} canDelete={false} />);

    expect(screen.getByText('Read-only')).toBeInTheDocument();
  });

  it('calls onEdit when edit button clicked', async () => {
    const user = userEvent.setup();
    const onEdit = jest.fn();

    render(<ContentToolbar title="Title" canEdit onEdit={onEdit} />);

    await user.click(screen.getByTestId('content-toolbar-edit-btn'));
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when delete button clicked', async () => {
    const user = userEvent.setup();
    const onDelete = jest.fn();

    render(<ContentToolbar title="Title" canDelete onDelete={onDelete} />);

    await user.click(screen.getByTestId('content-toolbar-delete-btn'));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('shows title input in editing mode', () => {
    render(
      <ContentToolbar
        title="Title"
        isEditing
        editTitle="Edit Title"
        onTitleChange={jest.fn()}
      />
    );

    const input = screen.getByTestId('content-toolbar-title-input');
    expect(input).toHaveValue('Edit Title');
  });

  it('shows save and cancel buttons in editing mode', () => {
    render(
      <ContentToolbar
        title="Title"
        isEditing
        editTitle="Edit Title"
        onSave={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    expect(screen.getByTestId('content-toolbar-save-btn')).toBeInTheDocument();
    expect(screen.getByTestId('content-toolbar-cancel-btn')).toBeInTheDocument();
  });

  it('calls onTitleChange when input changes', async () => {
    const user = userEvent.setup();
    const onTitleChange = jest.fn();

    render(
      <ContentToolbar
        title="Title"
        isEditing
        editTitle="Edit Title"
        onTitleChange={onTitleChange}
      />
    );

    const input = screen.getByTestId('content-toolbar-title-input');
    await user.clear(input);
    await user.type(input, 'New Title');

    expect(onTitleChange).toHaveBeenCalled();
  });

  it('calls onSave when save button clicked', async () => {
    const user = userEvent.setup();
    const onSave = jest.fn();

    render(
      <ContentToolbar
        title="Title"
        isEditing
        editTitle="Edit Title"
        onSave={onSave}
      />
    );

    await user.click(screen.getByTestId('content-toolbar-save-btn'));
    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when cancel button clicked', async () => {
    const user = userEvent.setup();
    const onCancel = jest.fn();

    render(
      <ContentToolbar
        title="Title"
        isEditing
        editTitle="Edit Title"
        onCancel={onCancel}
      />
    );

    await user.click(screen.getByTestId('content-toolbar-cancel-btn'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('shows saving state on save button', () => {
    render(
      <ContentToolbar
        title="Title"
        isEditing
        saving
        onSave={jest.fn()}
      />
    );

    expect(screen.getByText('Saving...')).toBeInTheDocument();
  });

  it('shows deleting state on delete button', () => {
    render(
      <ContentToolbar
        title="Title"
        canDelete
        deleting
        onDelete={jest.fn()}
      />
    );

    expect(screen.getByText('Deleting...')).toBeInTheDocument();
  });

  it('disables save button when saving', () => {
    render(
      <ContentToolbar
        title="Title"
        isEditing
        saving
        onSave={jest.fn()}
      />
    );

    expect(screen.getByTestId('content-toolbar-save-btn')).toBeDisabled();
  });

  it('disables delete button when deleting', () => {
    render(
      <ContentToolbar
        title="Title"
        canDelete
        deleting
        onDelete={jest.fn()}
      />
    );

    expect(screen.getByTestId('content-toolbar-delete-btn')).toBeDisabled();
  });

  it('accepts custom testId', () => {
    render(<ContentToolbar title="Title" testId="custom-toolbar" />);

    expect(screen.getByTestId('custom-toolbar')).toBeInTheDocument();
  });
});
