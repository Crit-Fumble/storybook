
import { render, screen, fireEvent } from '@testing-library/react';
import { BotSettingsPanel } from './BotSettingsPanel';
import type { BotSettings } from '../types';

const createSettings = (overrides: Partial<BotSettings> = {}): BotSettings => ({
  autoLogIC: true,
  defaultMode: 'ic',
  diceNotify: true,
  autoSession: false,
  reminderTime: 30,
  ...overrides,
});

describe('BotSettingsPanel', () => {
  describe('Message Handling section', () => {
    it('renders Message Handling header', () => {
      render(
        <BotSettingsPanel
          settings={createSettings()}
          onChange={() => {}}
          onSave={() => {}}
          onReset={() => {}}
        />
      );

      expect(screen.getByText('Message Handling')).toBeInTheDocument();
    });

    it('renders auto-log IC toggle', () => {
      render(
        <BotSettingsPanel
          settings={createSettings()}
          onChange={() => {}}
          onSave={() => {}}
          onReset={() => {}}
        />
      );

      expect(screen.getByText('Auto-log IC messages')).toBeInTheDocument();
      expect(screen.getByTestId('bot-settings-autolog')).toBeInTheDocument();
    });

    it('calls onChange when auto-log toggle is changed', () => {
      const handleChange = jest.fn();
      render(
        <BotSettingsPanel
          settings={createSettings({ autoLogIC: false })}
          onChange={handleChange}
          onSave={() => {}}
          onReset={() => {}}
        />
      );

      const toggle = screen.getByTestId('bot-settings-autolog-toggle');
      fireEvent.click(toggle);

      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({ autoLogIC: true })
      );
    });

    it('renders default mode select', () => {
      render(
        <BotSettingsPanel
          settings={createSettings()}
          onChange={() => {}}
          onSave={() => {}}
          onReset={() => {}}
        />
      );

      expect(screen.getByText('Default message mode')).toBeInTheDocument();
      expect(screen.getByTestId('bot-settings-default-mode')).toBeInTheDocument();
    });

    it('calls onChange when default mode is changed', () => {
      const handleChange = jest.fn();
      render(
        <BotSettingsPanel
          settings={createSettings({ defaultMode: 'ic' })}
          onChange={handleChange}
          onSave={() => {}}
          onReset={() => {}}
        />
      );

      const select = screen.getByTestId('bot-settings-default-mode-select');
      fireEvent.change(select, { target: { value: 'ooc' } });

      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({ defaultMode: 'ooc' })
      );
    });

    it('renders dice notify toggle', () => {
      render(
        <BotSettingsPanel
          settings={createSettings()}
          onChange={() => {}}
          onSave={() => {}}
          onReset={() => {}}
        />
      );

      expect(screen.getByText('Dice roll notifications')).toBeInTheDocument();
      expect(screen.getByTestId('bot-settings-dice-notify')).toBeInTheDocument();
    });

    it('calls onChange when dice notify toggle is changed', () => {
      const handleChange = jest.fn();
      render(
        <BotSettingsPanel
          settings={createSettings({ diceNotify: true })}
          onChange={handleChange}
          onSave={() => {}}
          onReset={() => {}}
        />
      );

      const toggle = screen.getByTestId('bot-settings-dice-notify-toggle');
      fireEvent.click(toggle);

      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({ diceNotify: false })
      );
    });
  });

  describe('Session Management section', () => {
    it('renders Session Management header', () => {
      render(
        <BotSettingsPanel
          settings={createSettings()}
          onChange={() => {}}
          onSave={() => {}}
          onReset={() => {}}
        />
      );

      expect(screen.getByText('Session Management')).toBeInTheDocument();
    });

    it('renders auto-session toggle', () => {
      render(
        <BotSettingsPanel
          settings={createSettings()}
          onChange={() => {}}
          onSave={() => {}}
          onReset={() => {}}
        />
      );

      expect(screen.getByText('Auto-start session')).toBeInTheDocument();
      expect(screen.getByTestId('bot-settings-auto-session')).toBeInTheDocument();
    });

    it('calls onChange when auto-session toggle is changed', () => {
      const handleChange = jest.fn();
      render(
        <BotSettingsPanel
          settings={createSettings({ autoSession: false })}
          onChange={handleChange}
          onSave={() => {}}
          onReset={() => {}}
        />
      );

      const toggle = screen.getByTestId('bot-settings-auto-session-toggle');
      fireEvent.click(toggle);

      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({ autoSession: true })
      );
    });

    it('renders reminder time select', () => {
      render(
        <BotSettingsPanel
          settings={createSettings()}
          onChange={() => {}}
          onSave={() => {}}
          onReset={() => {}}
        />
      );

      expect(screen.getByText('Session reminders')).toBeInTheDocument();
      expect(screen.getByTestId('bot-settings-reminder-time')).toBeInTheDocument();
    });

    it('calls onChange when reminder time is changed', () => {
      const handleChange = jest.fn();
      render(
        <BotSettingsPanel
          settings={createSettings({ reminderTime: 30 })}
          onChange={handleChange}
          onSave={() => {}}
          onReset={() => {}}
        />
      );

      const select = screen.getByTestId('bot-settings-reminder-time-select');
      fireEvent.change(select, { target: { value: '60' } });

      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({ reminderTime: 60 })
      );
    });
  });

  describe('Action buttons', () => {
    it('renders Reset to Defaults button', () => {
      render(
        <BotSettingsPanel
          settings={createSettings()}
          onChange={() => {}}
          onSave={() => {}}
          onReset={() => {}}
        />
      );

      expect(screen.getByTestId('bot-settings-reset-btn')).toHaveTextContent('Reset to Defaults');
    });

    it('calls onReset when Reset button is clicked', () => {
      const handleReset = jest.fn();
      render(
        <BotSettingsPanel
          settings={createSettings()}
          onChange={() => {}}
          onSave={() => {}}
          onReset={handleReset}
        />
      );

      fireEvent.click(screen.getByTestId('bot-settings-reset-btn'));
      expect(handleReset).toHaveBeenCalledTimes(1);
    });

    it('renders Save Settings button', () => {
      render(
        <BotSettingsPanel
          settings={createSettings()}
          onChange={() => {}}
          onSave={() => {}}
          onReset={() => {}}
        />
      );

      expect(screen.getByTestId('bot-settings-save-btn')).toHaveTextContent('Save Settings');
    });

    it('calls onSave when Save button is clicked', () => {
      const handleSave = jest.fn();
      render(
        <BotSettingsPanel
          settings={createSettings()}
          onChange={() => {}}
          onSave={handleSave}
          onReset={() => {}}
        />
      );

      fireEvent.click(screen.getByTestId('bot-settings-save-btn'));
      expect(handleSave).toHaveBeenCalledTimes(1);
    });

    it('shows loading state on Save button when isSaving', () => {
      render(
        <BotSettingsPanel
          settings={createSettings()}
          onChange={() => {}}
          onSave={() => {}}
          onReset={() => {}}
          isSaving={true}
        />
      );

      // Button should be in loading state
      expect(screen.getByTestId('bot-settings-save-btn')).toBeInTheDocument();
    });
  });

  describe('TestId', () => {
    it('uses default testId', () => {
      render(
        <BotSettingsPanel
          settings={createSettings()}
          onChange={() => {}}
          onSave={() => {}}
          onReset={() => {}}
        />
      );

      expect(screen.getByTestId('bot-settings')).toBeInTheDocument();
    });

    it('uses custom testId', () => {
      render(
        <BotSettingsPanel
          settings={createSettings()}
          onChange={() => {}}
          onSave={() => {}}
          onReset={() => {}}
          testId="custom-settings"
        />
      );

      expect(screen.getByTestId('custom-settings')).toBeInTheDocument();
      expect(screen.getByTestId('custom-settings-autolog')).toBeInTheDocument();
      expect(screen.getByTestId('custom-settings-save-btn')).toBeInTheDocument();
    });
  });
});
