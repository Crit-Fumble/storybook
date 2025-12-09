import { render, screen, fireEvent } from '@testing-library/react';
import { PromptPartialEditor } from './PromptPartialEditor';
import type { PromptPartial } from '../molecules/PromptPartialCard';

describe('PromptPartialEditor', () => {
  const mockChannels = [
    { id: 'channel-1', name: 'general' },
    { id: 'channel-2', name: 'rules' },
  ];

  const mockCategories = [
    { id: 'cat-1', name: 'Gaming' },
    { id: 'cat-2', name: 'Discussion' },
  ];

  const mockRoles = [
    { id: 'role-1', name: 'Admin' },
    { id: 'role-2', name: 'Moderator' },
  ];

  const mockPartial: Partial<PromptPartial> = {
    id: 'partial-1',
    name: 'Test Partial',
    targetType: 'channel',
    targetId: 'channel-1',
    targetName: 'general',
    content: 'Test content',
    priority: 10,
    isEnabled: true,
  };

  const defaultProps = {
    channels: mockChannels,
    categories: mockCategories,
    roles: mockRoles,
    onSave: jest.fn(),
    onCancel: jest.fn(),
  };

  beforeEach(() => {
    defaultProps.onSave.mockClear();
    defaultProps.onCancel.mockClear();
  });

  it('renders with default testId', () => {
    render(<PromptPartialEditor {...defaultProps} />);
    expect(screen.getByTestId('prompt-partial-editor')).toBeInTheDocument();
  });

  it('renders with custom testId', () => {
    render(<PromptPartialEditor {...defaultProps} testId="custom-editor" />);
    expect(screen.getByTestId('custom-editor')).toBeInTheDocument();
  });

  describe('create mode', () => {
    it('shows Create button when no partial', () => {
      render(<PromptPartialEditor {...defaultProps} />);
      expect(screen.getByText('Create')).toBeInTheDocument();
    });

    it('has empty form fields by default', () => {
      render(<PromptPartialEditor {...defaultProps} />);
      expect(screen.getByLabelText('Name')).toHaveValue('');
    });
  });

  describe('edit mode', () => {
    it('shows Update button when partial provided', () => {
      render(<PromptPartialEditor {...defaultProps} partial={mockPartial} />);
      expect(screen.getByText('Update')).toBeInTheDocument();
    });

    it('populates form with partial data', () => {
      render(<PromptPartialEditor {...defaultProps} partial={mockPartial} />);
      expect(screen.getByLabelText('Name')).toHaveValue('Test Partial');
      expect(screen.getByLabelText('Prompt Content')).toHaveValue('Test content');
    });
  });

  describe('form fields', () => {
    it('renders name input', () => {
      render(<PromptPartialEditor {...defaultProps} />);
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    it('renders target type select', () => {
      render(<PromptPartialEditor {...defaultProps} />);
      expect(screen.getByLabelText('Target Type')).toBeInTheDocument();
    });

    it('renders target select', () => {
      render(<PromptPartialEditor {...defaultProps} />);
      expect(screen.getByLabelText('Target')).toBeInTheDocument();
    });

    it('renders priority input', () => {
      render(<PromptPartialEditor {...defaultProps} />);
      expect(screen.getByLabelText(/Priority/)).toBeInTheDocument();
    });

    it('renders content textarea', () => {
      render(<PromptPartialEditor {...defaultProps} />);
      expect(screen.getByLabelText('Prompt Content')).toBeInTheDocument();
    });

    it('renders enabled toggle', () => {
      render(<PromptPartialEditor {...defaultProps} />);
      expect(screen.getByText('Enabled')).toBeInTheDocument();
    });
  });

  describe('target type switching', () => {
    it('shows channels when target type is channel', () => {
      render(<PromptPartialEditor {...defaultProps} />);
      expect(screen.getByLabelText('Target')).toBeInTheDocument();
      // Channel should be default, options should include channels
    });

    it('clears targetId when target type changes', () => {
      render(<PromptPartialEditor {...defaultProps} partial={mockPartial} />);
      fireEvent.change(screen.getByLabelText('Target Type'), { target: { value: 'category' } });
      expect(screen.getByLabelText('Target')).toHaveValue('');
    });

    it('shows categories when target type is category', () => {
      render(<PromptPartialEditor {...defaultProps} />);
      fireEvent.change(screen.getByLabelText('Target Type'), { target: { value: 'category' } });
      expect(screen.getByLabelText('Target')).toBeInTheDocument();
    });

    it('shows roles when target type is role', () => {
      render(<PromptPartialEditor {...defaultProps} />);
      fireEvent.change(screen.getByLabelText('Target Type'), { target: { value: 'role' } });
      expect(screen.getByLabelText('Target')).toBeInTheDocument();
    });
  });

  describe('enabled toggle', () => {
    it('shows Enabled when toggle is on', () => {
      render(<PromptPartialEditor {...defaultProps} />);
      expect(screen.getByText('Enabled')).toBeInTheDocument();
    });

    it('shows Disabled when toggle is off', () => {
      render(<PromptPartialEditor {...defaultProps} partial={{ ...mockPartial, isEnabled: false }} />);
      expect(screen.getByText('Disabled')).toBeInTheDocument();
    });

    it('toggles enabled state when clicked', () => {
      render(<PromptPartialEditor {...defaultProps} />);
      const toggleButton = screen.getByRole('button', { name: '' });
      fireEvent.click(toggleButton);
      expect(screen.getByText('Disabled')).toBeInTheDocument();
    });
  });

  describe('form submission', () => {
    it('calls onSave with form data when valid', () => {
      render(<PromptPartialEditor {...defaultProps} partial={mockPartial} />);
      fireEvent.click(screen.getByText('Update'));
      expect(defaultProps.onSave).toHaveBeenCalledWith(expect.objectContaining({
        name: 'Test Partial',
        targetType: 'channel',
        targetId: 'channel-1',
        content: 'Test content',
      }));
    });

    it('disables submit when form is invalid', () => {
      render(<PromptPartialEditor {...defaultProps} />);
      expect(screen.getByText('Create')).toBeDisabled();
    });

    it('enables submit when form is valid', () => {
      render(<PromptPartialEditor {...defaultProps} partial={mockPartial} />);
      expect(screen.getByText('Update')).not.toBeDisabled();
    });

    it('calls onCancel when cancel clicked', () => {
      render(<PromptPartialEditor {...defaultProps} />);
      fireEvent.click(screen.getByText('Cancel'));
      expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe('saving state', () => {
    it('shows Saving... text when isSaving', () => {
      render(<PromptPartialEditor {...defaultProps} isSaving={true} />);
      expect(screen.getByText('Saving...')).toBeInTheDocument();
    });

    it('disables buttons when isSaving', () => {
      render(<PromptPartialEditor {...defaultProps} isSaving={true} />);
      expect(screen.getByText('Saving...')).toBeDisabled();
      expect(screen.getByText('Cancel')).toBeDisabled();
    });
  });

  describe('form input changes', () => {
    it('updates name on input', () => {
      render(<PromptPartialEditor {...defaultProps} />);
      fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'New Name' } });
      expect(screen.getByLabelText('Name')).toHaveValue('New Name');
    });

    it('updates content on input', () => {
      render(<PromptPartialEditor {...defaultProps} />);
      fireEvent.change(screen.getByLabelText('Prompt Content'), { target: { value: 'New content' } });
      expect(screen.getByLabelText('Prompt Content')).toHaveValue('New content');
    });

    it('updates priority on input', () => {
      render(<PromptPartialEditor {...defaultProps} />);
      fireEvent.change(screen.getByLabelText(/Priority/), { target: { value: '25' } });
      expect(screen.getByLabelText(/Priority/)).toHaveValue(25);
    });
  });
});
