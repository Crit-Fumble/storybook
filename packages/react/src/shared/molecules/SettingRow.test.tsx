import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SettingRow, SettingToggleRow, SettingSelectRow } from './SettingRow';

describe('SettingRow', () => {
  describe('rendering', () => {
    it('renders label', () => {
      render(<SettingRow label="Notifications" />);
      expect(screen.getByText('Notifications')).toBeInTheDocument();
    });

    it('renders description when provided', () => {
      render(<SettingRow label="Notifications" description="Enable push notifications" />);
      expect(screen.getByText('Enable push notifications')).toBeInTheDocument();
    });

    it('does not render description when not provided', () => {
      const { container } = render(<SettingRow label="Notifications" />);
      expect(container.querySelector('p')).not.toBeInTheDocument();
    });

    it('renders children', () => {
      render(
        <SettingRow label="Custom">
          <button>Custom Button</button>
        </SettingRow>
      );
      expect(screen.getByText('Custom Button')).toBeInTheDocument();
    });

    it('applies testId', () => {
      render(<SettingRow label="Notifications" testId="setting" />);
      expect(screen.getByTestId('setting')).toBeInTheDocument();
    });

    it('merges custom className', () => {
      render(<SettingRow label="Notifications" testId="setting" className="custom-class" />);
      expect(screen.getByTestId('setting')).toHaveClass('custom-class');
    });
  });

  describe('styling', () => {
    it('applies base styling', () => {
      render(<SettingRow label="Notifications" testId="setting" />);
      const row = screen.getByTestId('setting');
      expect(row).toHaveClass('flex', 'justify-between', 'items-center', 'p-4', 'bg-cfg-border', 'rounded-lg');
    });
  });
});

describe('SettingToggleRow', () => {
  describe('rendering', () => {
    it('renders label', () => {
      render(<SettingToggleRow label="Dark Mode" checked={false} onChange={() => {}} />);
      expect(screen.getByText('Dark Mode')).toBeInTheDocument();
    });

    it('renders description when provided', () => {
      render(
        <SettingToggleRow
          label="Dark Mode"
          description="Enable dark theme"
          checked={false}
          onChange={() => {}}
        />
      );
      expect(screen.getByText('Enable dark theme')).toBeInTheDocument();
    });

    it('renders toggle control', () => {
      render(<SettingToggleRow label="Dark Mode" checked={false} onChange={() => {}} testId="setting" />);
      expect(screen.getByTestId('setting-toggle')).toBeInTheDocument();
    });

    it('applies testId to row and toggle', () => {
      render(<SettingToggleRow label="Dark Mode" checked={false} onChange={() => {}} testId="setting" />);
      expect(screen.getByTestId('setting')).toBeInTheDocument();
      expect(screen.getByTestId('setting-toggle')).toBeInTheDocument();
    });
  });

  describe('states', () => {
    it('reflects checked state', () => {
      render(<SettingToggleRow label="Dark Mode" checked={true} onChange={() => {}} testId="setting" />);
      expect(screen.getByTestId('setting-toggle')).toBeChecked();
    });

    it('reflects unchecked state', () => {
      render(<SettingToggleRow label="Dark Mode" checked={false} onChange={() => {}} testId="setting" />);
      expect(screen.getByTestId('setting-toggle')).not.toBeChecked();
    });
  });

  describe('interactions', () => {
    it('calls onChange with new state when toggled', () => {
      const handleChange = vi.fn();
      render(<SettingToggleRow label="Dark Mode" checked={false} onChange={handleChange} testId="setting" />);

      fireEvent.click(screen.getByTestId('setting-toggle'));
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('calls onChange with false when unchecked', () => {
      const handleChange = vi.fn();
      render(<SettingToggleRow label="Dark Mode" checked={true} onChange={handleChange} testId="setting" />);

      fireEvent.click(screen.getByTestId('setting-toggle'));
      expect(handleChange).toHaveBeenCalledWith(false);
    });
  });
});

describe('SettingSelectRow', () => {
  const options = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
  ];

  describe('rendering', () => {
    it('renders label', () => {
      render(
        <SettingSelectRow
          label="Theme"
          value="light"
          onChange={() => {}}
          options={options}
        />
      );
      expect(screen.getByText('Theme')).toBeInTheDocument();
    });

    it('renders description when provided', () => {
      render(
        <SettingSelectRow
          label="Theme"
          description="Choose your preferred theme"
          value="light"
          onChange={() => {}}
          options={options}
        />
      );
      expect(screen.getByText('Choose your preferred theme')).toBeInTheDocument();
    });

    it('renders select with all options', () => {
      render(
        <SettingSelectRow
          label="Theme"
          value="light"
          onChange={() => {}}
          options={options}
        />
      );
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByText('Light')).toBeInTheDocument();
      expect(screen.getByText('Dark')).toBeInTheDocument();
      expect(screen.getByText('System')).toBeInTheDocument();
    });

    it('applies testId to row and select', () => {
      render(
        <SettingSelectRow
          label="Theme"
          value="light"
          onChange={() => {}}
          options={options}
          testId="setting"
        />
      );
      expect(screen.getByTestId('setting')).toBeInTheDocument();
      expect(screen.getByTestId('setting-select')).toBeInTheDocument();
    });
  });

  describe('controlled value', () => {
    it('displays current value', () => {
      render(
        <SettingSelectRow
          label="Theme"
          value="dark"
          onChange={() => {}}
          options={options}
          testId="setting"
        />
      );
      expect(screen.getByTestId('setting-select')).toHaveValue('dark');
    });
  });

  describe('interactions', () => {
    it('calls onChange with new value when selection changes', () => {
      const handleChange = vi.fn();
      render(
        <SettingSelectRow
          label="Theme"
          value="light"
          onChange={handleChange}
          options={options}
          testId="setting"
        />
      );

      fireEvent.change(screen.getByTestId('setting-select'), { target: { value: 'dark' } });
      expect(handleChange).toHaveBeenCalledWith('dark');
    });
  });
});
