import { render, screen, fireEvent } from '@testing-library/react';
import { PromptPartialCard, type PromptPartial } from './PromptPartialCard';

describe('PromptPartialCard', () => {
  const mockPartial: PromptPartial = {
    id: 'partial-1',
    name: 'Test Partial',
    targetType: 'channel',
    targetId: 'channel-123',
    targetName: 'general',
    content: 'This is a test prompt partial content',
    priority: 10,
    isEnabled: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-02'),
  };

  const mockOnClick = jest.fn();
  const mockOnToggleEnabled = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
    mockOnToggleEnabled.mockClear();
    mockOnDelete.mockClear();
  });

  it('renders with default testId', () => {
    render(<PromptPartialCard partial={mockPartial} />);
    expect(screen.getByTestId('prompt-partial-card')).toBeInTheDocument();
  });

  it('renders with custom testId', () => {
    render(<PromptPartialCard partial={mockPartial} testId="custom-card" />);
    expect(screen.getByTestId('custom-card')).toBeInTheDocument();
  });

  describe('content display', () => {
    it('displays partial name', () => {
      render(<PromptPartialCard partial={mockPartial} />);
      expect(screen.getByText('Test Partial')).toBeInTheDocument();
    });

    it('displays target name when provided', () => {
      render(<PromptPartialCard partial={mockPartial} />);
      expect(screen.getByText(/Target: general/)).toBeInTheDocument();
    });

    it('displays target id when target name is not provided', () => {
      const partialWithoutTargetName = { ...mockPartial, targetName: undefined };
      render(<PromptPartialCard partial={partialWithoutTargetName} />);
      expect(screen.getByText(/Target: channel-123/)).toBeInTheDocument();
    });

    it('displays priority', () => {
      render(<PromptPartialCard partial={mockPartial} />);
      expect(screen.getByText(/Priority: 10/)).toBeInTheDocument();
    });

    it('displays content', () => {
      render(<PromptPartialCard partial={mockPartial} />);
      expect(screen.getByText('This is a test prompt partial content')).toBeInTheDocument();
    });
  });

  describe('target type badges', () => {
    it('renders channel badge with correct color', () => {
      render(<PromptPartialCard partial={mockPartial} />);
      expect(screen.getByText('channel')).toBeInTheDocument();
    });

    it('renders category badge with correct color', () => {
      const categoryPartial = { ...mockPartial, targetType: 'category' as const };
      render(<PromptPartialCard partial={categoryPartial} />);
      expect(screen.getByText('category')).toBeInTheDocument();
    });

    it('renders thread badge with correct color', () => {
      const threadPartial = { ...mockPartial, targetType: 'thread' as const };
      render(<PromptPartialCard partial={threadPartial} />);
      expect(screen.getByText('thread')).toBeInTheDocument();
    });

    it('renders role badge with correct color', () => {
      const rolePartial = { ...mockPartial, targetType: 'role' as const };
      render(<PromptPartialCard partial={rolePartial} />);
      expect(screen.getByText('role')).toBeInTheDocument();
    });
  });

  describe('states', () => {
    it('applies selected styling when isSelected is true', () => {
      render(<PromptPartialCard partial={mockPartial} isSelected={true} />);
      const card = screen.getByTestId('prompt-partial-card');
      expect(card).toHaveClass('ring-2', 'ring-discord-primary');
    });

    it('does not apply selected styling when isSelected is false', () => {
      render(<PromptPartialCard partial={mockPartial} isSelected={false} />);
      const card = screen.getByTestId('prompt-partial-card');
      expect(card).not.toHaveClass('ring-2');
    });

    it('applies disabled opacity when isEnabled is false', () => {
      const disabledPartial = { ...mockPartial, isEnabled: false };
      render(<PromptPartialCard partial={disabledPartial} />);
      const card = screen.getByTestId('prompt-partial-card');
      expect(card).toHaveClass('opacity-60');
    });

    it('does not apply disabled opacity when isEnabled is true', () => {
      render(<PromptPartialCard partial={mockPartial} />);
      const card = screen.getByTestId('prompt-partial-card');
      expect(card).not.toHaveClass('opacity-60');
    });

    it('applies cursor pointer and hover state when onClick is provided', () => {
      render(<PromptPartialCard partial={mockPartial} onClick={mockOnClick} />);
      const card = screen.getByTestId('prompt-partial-card');
      expect(card).toHaveClass('cursor-pointer', 'hover:bg-discord-background-floating');
    });

    it('does not apply cursor pointer when onClick is not provided', () => {
      render(<PromptPartialCard partial={mockPartial} />);
      const card = screen.getByTestId('prompt-partial-card');
      expect(card).not.toHaveClass('cursor-pointer');
    });
  });

  describe('card click handler', () => {
    it('calls onClick when card is clicked', () => {
      render(<PromptPartialCard partial={mockPartial} onClick={mockOnClick} />);
      const card = screen.getByTestId('prompt-partial-card');
      fireEvent.click(card);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('does not throw error when clicked without onClick handler', () => {
      render(<PromptPartialCard partial={mockPartial} />);
      const card = screen.getByTestId('prompt-partial-card');
      expect(() => fireEvent.click(card)).not.toThrow();
    });
  });

  describe('toggle enabled/disabled', () => {
    it('renders toggle button when onToggleEnabled is provided', () => {
      render(<PromptPartialCard partial={mockPartial} onToggleEnabled={mockOnToggleEnabled} />);
      expect(screen.getByLabelText('Disable')).toBeInTheDocument();
    });

    it('does not render toggle button when onToggleEnabled is not provided', () => {
      render(<PromptPartialCard partial={mockPartial} />);
      expect(screen.queryByLabelText('Disable')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Enable')).not.toBeInTheDocument();
    });

    it('shows "Disable" label when partial is enabled', () => {
      render(<PromptPartialCard partial={mockPartial} onToggleEnabled={mockOnToggleEnabled} />);
      expect(screen.getByLabelText('Disable')).toBeInTheDocument();
    });

    it('shows "Enable" label when partial is disabled', () => {
      const disabledPartial = { ...mockPartial, isEnabled: false };
      render(<PromptPartialCard partial={disabledPartial} onToggleEnabled={mockOnToggleEnabled} />);
      expect(screen.getByLabelText('Enable')).toBeInTheDocument();
    });

    it('calls onToggleEnabled with true when clicking disabled toggle', () => {
      const disabledPartial = { ...mockPartial, isEnabled: false };
      render(<PromptPartialCard partial={disabledPartial} onToggleEnabled={mockOnToggleEnabled} />);
      const toggleButton = screen.getByLabelText('Enable');
      fireEvent.click(toggleButton);
      expect(mockOnToggleEnabled).toHaveBeenCalledTimes(1);
      expect(mockOnToggleEnabled).toHaveBeenCalledWith(true);
    });

    it('calls onToggleEnabled with false when clicking enabled toggle', () => {
      render(<PromptPartialCard partial={mockPartial} onToggleEnabled={mockOnToggleEnabled} />);
      const toggleButton = screen.getByLabelText('Disable');
      fireEvent.click(toggleButton);
      expect(mockOnToggleEnabled).toHaveBeenCalledTimes(1);
      expect(mockOnToggleEnabled).toHaveBeenCalledWith(false);
    });

    it('stops propagation when toggle is clicked', () => {
      render(
        <PromptPartialCard
          partial={mockPartial}
          onClick={mockOnClick}
          onToggleEnabled={mockOnToggleEnabled}
        />
      );
      const toggleButton = screen.getByLabelText('Disable');
      fireEvent.click(toggleButton);

      // Toggle handler should be called but card onClick should not
      expect(mockOnToggleEnabled).toHaveBeenCalledTimes(1);
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it('applies correct styling when toggle is enabled', () => {
      render(<PromptPartialCard partial={mockPartial} onToggleEnabled={mockOnToggleEnabled} />);
      const toggleButton = screen.getByLabelText('Disable');
      expect(toggleButton).toHaveClass('bg-discord-green');
    });

    it('applies correct styling when toggle is disabled', () => {
      const disabledPartial = { ...mockPartial, isEnabled: false };
      render(<PromptPartialCard partial={disabledPartial} onToggleEnabled={mockOnToggleEnabled} />);
      const toggleButton = screen.getByLabelText('Enable');
      expect(toggleButton).toHaveClass('bg-discord-background-tertiary');
    });
  });

  describe('delete button', () => {
    it('renders delete button when onDelete is provided', () => {
      render(<PromptPartialCard partial={mockPartial} onDelete={mockOnDelete} />);
      expect(screen.getByLabelText('Delete')).toBeInTheDocument();
    });

    it('does not render delete button when onDelete is not provided', () => {
      render(<PromptPartialCard partial={mockPartial} />);
      expect(screen.queryByLabelText('Delete')).not.toBeInTheDocument();
    });

    it('calls onDelete when delete button is clicked', () => {
      render(<PromptPartialCard partial={mockPartial} onDelete={mockOnDelete} />);
      const deleteButton = screen.getByLabelText('Delete');
      fireEvent.click(deleteButton);
      expect(mockOnDelete).toHaveBeenCalledTimes(1);
    });

    it('stops propagation when delete button is clicked', () => {
      render(
        <PromptPartialCard
          partial={mockPartial}
          onClick={mockOnClick}
          onDelete={mockOnDelete}
        />
      );
      const deleteButton = screen.getByLabelText('Delete');
      fireEvent.click(deleteButton);

      // Delete handler should be called but card onClick should not
      expect(mockOnDelete).toHaveBeenCalledTimes(1);
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });

  describe('combined functionality', () => {
    it('renders both toggle and delete buttons when both handlers provided', () => {
      render(
        <PromptPartialCard
          partial={mockPartial}
          onToggleEnabled={mockOnToggleEnabled}
          onDelete={mockOnDelete}
        />
      );
      expect(screen.getByLabelText('Disable')).toBeInTheDocument();
      expect(screen.getByLabelText('Delete')).toBeInTheDocument();
    });

    it('handles all interactions correctly when all handlers provided', () => {
      render(
        <PromptPartialCard
          partial={mockPartial}
          onClick={mockOnClick}
          onToggleEnabled={mockOnToggleEnabled}
          onDelete={mockOnDelete}
        />
      );

      // Click card
      const card = screen.getByTestId('prompt-partial-card');
      fireEvent.click(card);
      expect(mockOnClick).toHaveBeenCalledTimes(1);

      // Click toggle
      const toggleButton = screen.getByLabelText('Disable');
      fireEvent.click(toggleButton);
      expect(mockOnToggleEnabled).toHaveBeenCalledTimes(1);
      expect(mockOnClick).toHaveBeenCalledTimes(1); // Still 1, not 2

      // Click delete
      const deleteButton = screen.getByLabelText('Delete');
      fireEvent.click(deleteButton);
      expect(mockOnDelete).toHaveBeenCalledTimes(1);
      expect(mockOnClick).toHaveBeenCalledTimes(1); // Still 1, not 2
    });
  });

  describe('custom className', () => {
    it('applies custom className', () => {
      render(<PromptPartialCard partial={mockPartial} className="custom-class" />);
      const card = screen.getByTestId('prompt-partial-card');
      expect(card).toHaveClass('custom-class');
    });

    it('merges custom className with default classes', () => {
      render(<PromptPartialCard partial={mockPartial} className="custom-class" />);
      const card = screen.getByTestId('prompt-partial-card');
      expect(card).toHaveClass('custom-class', 'bg-discord-background-secondary', 'rounded-lg');
    });
  });
});
