import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';
import { createRef } from 'react';

describe('Input', () => {
  describe('rendering', () => {
    it('renders as an input element', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('applies testId when provided', () => {
      render(<Input testId="my-input" />);
      expect(screen.getByTestId('my-input')).toBeInTheDocument();
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('applies base input class', () => {
      render(<Input testId="input" />);
      expect(screen.getByTestId('input')).toHaveClass('input');
    });
  });

  describe('error state', () => {
    it('applies error styling when error is true', () => {
      render(<Input testId="input" error />);
      expect(screen.getByTestId('input')).toHaveClass('border-cfg-red');
    });

    it('does not apply error styling when error is false', () => {
      render(<Input testId="input" error={false} />);
      expect(screen.getByTestId('input')).not.toHaveClass('border-cfg-red');
    });
  });

  describe('interactions', () => {
    it('handles value changes', () => {
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
      expect(handleChange).toHaveBeenCalled();
    });

    it('can be controlled', () => {
      const { rerender } = render(<Input value="initial" onChange={() => {}} />);
      expect(screen.getByRole('textbox')).toHaveValue('initial');

      rerender(<Input value="updated" onChange={() => {}} />);
      expect(screen.getByRole('textbox')).toHaveValue('updated');
    });

    it('handles focus events', () => {
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      render(<Input onFocus={handleFocus} onBlur={handleBlur} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      expect(handleFocus).toHaveBeenCalled();

      fireEvent.blur(input);
      expect(handleBlur).toHaveBeenCalled();
    });
  });

  describe('custom props', () => {
    it('merges custom className', () => {
      render(<Input testId="input" className="custom-class" />);
      expect(screen.getByTestId('input')).toHaveClass('custom-class', 'input');
    });

    it('supports placeholder', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('supports disabled state', () => {
      render(<Input disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('supports different input types', () => {
      render(<Input type="email" testId="email-input" />);
      expect(screen.getByTestId('email-input')).toHaveAttribute('type', 'email');
    });

    it('supports maxLength', () => {
      render(<Input maxLength={10} testId="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('maxLength', '10');
    });
  });
});
