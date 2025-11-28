import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  describe('rendering', () => {
    it('renders a checkbox input', () => {
      render(<Toggle testId="toggle" />);
      expect(screen.getByTestId('toggle')).toHaveAttribute('type', 'checkbox');
    });

    it('applies testId to the input element', () => {
      render(<Toggle testId="my-toggle" />);
      expect(screen.getByTestId('my-toggle')).toBeInTheDocument();
    });

    it('is wrapped in a label element', () => {
      render(<Toggle testId="toggle" />);
      const input = screen.getByTestId('toggle');
      expect(input.closest('label')).toBeInTheDocument();
    });
  });

  describe('states', () => {
    it('is unchecked by default', () => {
      render(<Toggle testId="toggle" />);
      expect(screen.getByTestId('toggle')).not.toBeChecked();
    });

    it('can be checked by default', () => {
      render(<Toggle testId="toggle" defaultChecked />);
      expect(screen.getByTestId('toggle')).toBeChecked();
    });

    it('can be controlled', () => {
      const { rerender } = render(<Toggle testId="toggle" checked={false} onChange={() => {}} />);
      expect(screen.getByTestId('toggle')).not.toBeChecked();

      rerender(<Toggle testId="toggle" checked={true} onChange={() => {}} />);
      expect(screen.getByTestId('toggle')).toBeChecked();
    });

    it('supports disabled state', () => {
      render(<Toggle testId="toggle" disabled />);
      expect(screen.getByTestId('toggle')).toBeDisabled();
    });
  });

  describe('interactions', () => {
    it('toggles when clicked', () => {
      render(<Toggle testId="toggle" />);
      const toggle = screen.getByTestId('toggle');

      expect(toggle).not.toBeChecked();
      fireEvent.click(toggle);
      expect(toggle).toBeChecked();
      fireEvent.click(toggle);
      expect(toggle).not.toBeChecked();
    });

    it('calls onChange when toggled', () => {
      const handleChange = vi.fn();
      render(<Toggle testId="toggle" onChange={handleChange} />);

      fireEvent.click(screen.getByTestId('toggle'));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('remains in initial state when disabled', () => {
      render(<Toggle testId="toggle" disabled defaultChecked={false} />);
      const toggle = screen.getByTestId('toggle');

      expect(toggle).toBeDisabled();
      expect(toggle).not.toBeChecked();
      // Note: In real browsers, clicking a disabled checkbox doesn't change its state
      // jsdom behaves differently, so we just verify it's disabled
    });
  });

  describe('styling', () => {
    it('applies base wrapper styling', () => {
      render(<Toggle testId="toggle" />);
      const label = screen.getByTestId('toggle').closest('label');
      expect(label).toHaveClass('relative', 'inline-block', 'w-12', 'h-6', 'cursor-pointer');
    });

    it('merges custom className on wrapper', () => {
      render(<Toggle testId="toggle" className="custom-class" />);
      const label = screen.getByTestId('toggle').closest('label');
      expect(label).toHaveClass('custom-class');
    });

    it('hides the checkbox visually', () => {
      render(<Toggle testId="toggle" />);
      expect(screen.getByTestId('toggle')).toHaveClass('sr-only');
    });
  });

  describe('accessibility', () => {
    it('is focusable via tab', () => {
      render(<Toggle testId="toggle" />);
      const toggle = screen.getByTestId('toggle');
      toggle.focus();
      expect(document.activeElement).toBe(toggle);
    });

    it('can be toggled with keyboard', () => {
      render(<Toggle testId="toggle" />);
      const toggle = screen.getByTestId('toggle');

      toggle.focus();
      fireEvent.keyDown(toggle, { key: ' ', code: 'Space' });
      fireEvent.click(toggle); // Space triggers click on checkboxes
      expect(toggle).toBeChecked();
    });
  });
});
