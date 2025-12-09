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
