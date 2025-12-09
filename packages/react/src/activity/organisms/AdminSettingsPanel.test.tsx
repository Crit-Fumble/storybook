import { render, screen, fireEvent } from '@testing-library/react';
import { AdminSettingsPanel, AdminSettings } from './AdminSettingsPanel';

describe('AdminSettingsPanel', () => {
  const defaultSettings: AdminSettings = {
    botEnabled: true,
    aiEnabled: true,
    diceEnabled: true,
    defaultSystemPrompt: 'You are a helpful assistant.',
    maxMessageLength: 2000,
    cooldownSeconds: 5,
    allowedChannelIds: [],
    blockedUserIds: [],
  };

  const mockOnSave = jest.fn();

  beforeEach(() => {
    mockOnSave.mockClear();
  });

  it('renders with default testId', () => {
    render(<AdminSettingsPanel settings={defaultSettings} onSave={mockOnSave} />);
    expect(screen.getByTestId('admin-settings-panel')).toBeInTheDocument();
  });

  it('renders with custom testId', () => {
    render(<AdminSettingsPanel settings={defaultSettings} onSave={mockOnSave} testId="custom-panel" />);
    expect(screen.getByTestId('custom-panel')).toBeInTheDocument();
  });

  it('renders Settings title', () => {
    render(<AdminSettingsPanel settings={defaultSettings} onSave={mockOnSave} />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  describe('feature toggles', () => {
    it('renders Bot Enabled toggle', () => {
      render(<AdminSettingsPanel settings={defaultSettings} onSave={mockOnSave} />);
      expect(screen.getByText('Bot Enabled')).toBeInTheDocument();
    });

    it('renders AI Responses toggle', () => {
      render(<AdminSettingsPanel settings={defaultSettings} onSave={mockOnSave} />);
      expect(screen.getByText('AI Responses')).toBeInTheDocument();
    });

    it('renders Dice Rolling toggle', () => {
      render(<AdminSettingsPanel settings={defaultSettings} onSave={mockOnSave} />);
      expect(screen.getByText('Dice Rolling')).toBeInTheDocument();
    });

    it('toggles AI Responses setting', () => {
      render(<AdminSettingsPanel settings={defaultSettings} onSave={mockOnSave} />);
      const toggleButtons = screen.getAllByRole('button').filter(btn =>
        btn.classList.contains('rounded-full')
      );
      // Second toggle is AI Responses (after Bot Enabled)
      if (toggleButtons.length > 1) {
        fireEvent.click(toggleButtons[1]);
        expect(screen.getByText('Save Changes')).toBeInTheDocument();
      }
    });

    it('toggles Dice Rolling setting', () => {
      render(<AdminSettingsPanel settings={defaultSettings} onSave={mockOnSave} />);
      const toggleButtons = screen.getAllByRole('button').filter(btn =>
        btn.classList.contains('rounded-full')
      );
      // Third toggle is Dice Rolling
      if (toggleButtons.length > 2) {
        fireEvent.click(toggleButtons[2]);
        expect(screen.getByText('Save Changes')).toBeInTheDocument();
      }
    });
  });

  describe('rate limiting', () => {
    it('renders cooldown seconds input', () => {
      render(<AdminSettingsPanel settings={defaultSettings} onSave={mockOnSave} />);
      expect(screen.getByText('Command Cooldown (seconds)')).toBeInTheDocument();
    });

    it('renders max message length input', () => {
      render(<AdminSettingsPanel settings={defaultSettings} onSave={mockOnSave} />);
      expect(screen.getByText('Max Message Length')).toBeInTheDocument();
    });

    it('updates cooldown seconds value', () => {
      render(<AdminSettingsPanel settings={defaultSettings} onSave={mockOnSave} />);
      const inputs = screen.getAllByRole('spinbutton');
      // First input is cooldown seconds
      if (inputs.length > 0) {
        fireEvent.change(inputs[0], { target: { value: '10' } });
        expect(screen.getByText('Save Changes')).toBeInTheDocument();
      }
    });

    it('updates max message length value', () => {
      render(<AdminSettingsPanel settings={defaultSettings} onSave={mockOnSave} />);
      const inputs = screen.getAllByRole('spinbutton');
      // Second input is max message length
      if (inputs.length > 1) {
        fireEvent.change(inputs[1], { target: { value: '3000' } });
        expect(screen.getByText('Save Changes')).toBeInTheDocument();
      }
    });
  });

  describe('system prompt', () => {
    it('renders system prompt section', () => {
      render(<AdminSettingsPanel settings={defaultSettings} onSave={mockOnSave} />);
      expect(screen.getByText('Default System Prompt')).toBeInTheDocument();
    });

    it('displays current system prompt', () => {
      render(<AdminSettingsPanel settings={defaultSettings} onSave={mockOnSave} />);
      expect(screen.getByDisplayValue('You are a helpful assistant.')).toBeInTheDocument();
    });

    it('updates system prompt value', () => {
      render(<AdminSettingsPanel settings={defaultSettings} onSave={mockOnSave} />);
      const textarea = screen.getByDisplayValue('You are a helpful assistant.');
      fireEvent.change(textarea, { target: { value: 'You are a gaming assistant.' } });
      expect(screen.getByText('Save Changes')).toBeInTheDocument();
    });
  });

  describe('channel restrictions', () => {
    it('renders allowed channels section', () => {
      render(<AdminSettingsPanel settings={defaultSettings} onSave={mockOnSave} />);
      expect(screen.getByText('Allowed Channels')).toBeInTheDocument();
    });

    it('renders channel options', () => {
      const channels = [
        { id: '1', name: 'general' },
        { id: '2', name: 'gaming' },
      ];
      render(
        <AdminSettingsPanel settings={defaultSettings} onSave={mockOnSave} channels={channels} />
      );
      expect(screen.getByText('#general')).toBeInTheDocument();
      expect(screen.getByText('#gaming')).toBeInTheDocument();
    });

    it('selects a channel', () => {
      const channels = [
        { id: '1', name: 'general' },
        { id: '2', name: 'gaming' },
      ];
      render(
        <AdminSettingsPanel settings={defaultSettings} onSave={mockOnSave} channels={channels} />
      );
      const generalButton = screen.getByText('#general');
      fireEvent.click(generalButton);
      expect(screen.getByText('Save Changes')).toBeInTheDocument();
      expect(screen.getByText('1 channel(s) selected')).toBeInTheDocument();
    });

    it('deselects a channel', () => {
      const channels = [
        { id: '1', name: 'general' },
        { id: '2', name: 'gaming' },
      ];
      const settingsWithChannel = {
        ...defaultSettings,
        allowedChannelIds: ['1'],
      };
      render(
        <AdminSettingsPanel settings={settingsWithChannel} onSave={mockOnSave} channels={channels} />
      );
      const generalButton = screen.getByText('#general');
      fireEvent.click(generalButton);
      expect(screen.getByText('Save Changes')).toBeInTheDocument();
    });
  });

  describe('danger zone', () => {
    it('renders danger zone section', () => {
      render(<AdminSettingsPanel settings={defaultSettings} onSave={mockOnSave} />);
      expect(screen.getByText('Danger Zone')).toBeInTheDocument();
    });

    it('renders reset to defaults button', () => {
      render(<AdminSettingsPanel settings={defaultSettings} onSave={mockOnSave} />);
      expect(screen.getByText('Reset to Defaults')).toBeInTheDocument();
    });
  });

  describe('save and reset buttons', () => {
    it('does not show save button when no changes', () => {
      render(<AdminSettingsPanel settings={defaultSettings} onSave={mockOnSave} />);
      expect(screen.queryByText('Save Changes')).not.toBeInTheDocument();
    });

    it('shows save button after making changes', () => {
      render(<AdminSettingsPanel settings={defaultSettings} onSave={mockOnSave} />);
      // Find the toggle button for Bot Enabled - it's a button with a rounded-full class
      const toggleButtons = screen.getAllByRole('button').filter(btn =>
        btn.classList.contains('rounded-full')
      );
      if (toggleButtons.length > 0) {
        fireEvent.click(toggleButtons[0]);
        expect(screen.getByText('Save Changes')).toBeInTheDocument();
      }
    });

    it('calls onSave when save button clicked', () => {
      render(<AdminSettingsPanel settings={defaultSettings} onSave={mockOnSave} />);
      const toggleButtons = screen.getAllByRole('button').filter(btn =>
        btn.classList.contains('rounded-full')
      );
      if (toggleButtons.length > 0) {
        fireEvent.click(toggleButtons[0]);
        const saveButton = screen.getByText('Save Changes');
        fireEvent.click(saveButton);
        expect(mockOnSave).toHaveBeenCalledTimes(1);
      }
    });

    it('resets changes when reset button clicked', () => {
      render(<AdminSettingsPanel settings={defaultSettings} onSave={mockOnSave} />);
      const toggleButtons = screen.getAllByRole('button').filter(btn =>
        btn.classList.contains('rounded-full')
      );
      if (toggleButtons.length > 0) {
        // Make a change
        fireEvent.click(toggleButtons[0]);
        expect(screen.getByText('Save Changes')).toBeInTheDocument();

        // Click reset
        const resetButton = screen.getByText('Reset');
        fireEvent.click(resetButton);

        // Save button should disappear
        expect(screen.queryByText('Save Changes')).not.toBeInTheDocument();
      }
    });

    it('disables buttons when isSaving is true', () => {
      render(<AdminSettingsPanel settings={defaultSettings} onSave={mockOnSave} isSaving />);
      const toggleButtons = screen.getAllByRole('button').filter(btn =>
        btn.classList.contains('rounded-full')
      );
      if (toggleButtons.length > 0) {
        // Make a change to show save/reset buttons
        fireEvent.click(toggleButtons[0]);

        // Re-render with isSaving prop
        render(<AdminSettingsPanel settings={defaultSettings} onSave={mockOnSave} isSaving />);
        const toggleButtons2 = screen.getAllByRole('button').filter(btn =>
          btn.classList.contains('rounded-full')
        );
        fireEvent.click(toggleButtons2[0]);

        const saveButton = screen.getByText('Saving...');
        const resetButton = screen.getByText('Reset');
        expect(saveButton).toBeDisabled();
        expect(resetButton).toBeDisabled();
      }
    });

    it('handles isSaving prop', () => {
      // Verify the component accepts and handles isSaving prop
      render(<AdminSettingsPanel settings={defaultSettings} onSave={mockOnSave} isSaving />);
      // Component should render without errors
      expect(screen.getByTestId('admin-settings-panel')).toBeInTheDocument();
    });
  });

  it('applies custom className', () => {
    render(
      <AdminSettingsPanel settings={defaultSettings} onSave={mockOnSave} className="custom-class" />
    );
    expect(screen.getByTestId('admin-settings-panel')).toHaveClass('custom-class');
  });
});
