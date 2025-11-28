import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';
import { createRef } from 'react';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
];

describe('Select', () => {
  describe('rendering', () => {
    it('renders as a select element', () => {
      render(<Select options={mockOptions} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('applies testId when provided', () => {
      render(<Select testId="my-select" options={mockOptions} />);
      expect(screen.getByTestId('my-select')).toBeInTheDocument();
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLSelectElement>();
      render(<Select ref={ref} options={mockOptions} />);
      expect(ref.current).toBeInstanceOf(HTMLSelectElement);
    });

    it('renders all options', () => {
      render(<Select options={mockOptions} />);
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });
  });

  describe('placeholder', () => {
    it('renders placeholder when provided', () => {
      render(<Select options={mockOptions} placeholder="Select an option" />);
      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('placeholder option is disabled', () => {
      render(<Select options={mockOptions} placeholder="Select an option" />);
      const placeholderOption = screen.getByText('Select an option');
      expect(placeholderOption).toHaveAttribute('disabled');
    });

    it('placeholder has empty value', () => {
      render(<Select options={mockOptions} placeholder="Select an option" />);
      const placeholderOption = screen.getByText('Select an option');
      expect(placeholderOption).toHaveValue('');
    });
  });

  describe('options', () => {
    it('renders option values correctly', () => {
      render(<Select options={mockOptions} testId="select" />);
      const options = screen.getAllByRole('option');
      expect(options[0]).toHaveValue('option1');
      expect(options[1]).toHaveValue('option2');
      expect(options[2]).toHaveValue('option3');
    });

    it('handles disabled options', () => {
      render(<Select options={mockOptions} />);
      const disabledOption = screen.getByText('Option 3');
      expect(disabledOption).toBeDisabled();
    });
  });

  describe('error state', () => {
    it('applies error styling when error is true', () => {
      render(<Select testId="select" options={mockOptions} error />);
      expect(screen.getByTestId('select')).toHaveClass('border-cfg-red');
    });

    it('does not apply error styling when error is false', () => {
      render(<Select testId="select" options={mockOptions} error={false} />);
      expect(screen.getByTestId('select')).not.toHaveClass('border-cfg-red');
    });
  });

  describe('interactions', () => {
    it('handles value changes', () => {
      const handleChange = vi.fn();
      render(<Select options={mockOptions} onChange={handleChange} />);

      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'option2' } });
      expect(handleChange).toHaveBeenCalled();
    });

    it('can be controlled', () => {
      const { rerender } = render(
        <Select testId="select" options={mockOptions} value="option1" onChange={() => {}} />
      );
      expect(screen.getByTestId('select')).toHaveValue('option1');

      rerender(
        <Select testId="select" options={mockOptions} value="option2" onChange={() => {}} />
      );
      expect(screen.getByTestId('select')).toHaveValue('option2');
    });
  });

  describe('custom props', () => {
    it('merges custom className', () => {
      render(<Select testId="select" options={mockOptions} className="custom-class" />);
      expect(screen.getByTestId('select')).toHaveClass('custom-class');
    });

    it('supports disabled state', () => {
      render(<Select options={mockOptions} disabled />);
      expect(screen.getByRole('combobox')).toBeDisabled();
    });

    it('supports required attribute', () => {
      render(<Select testId="select" options={mockOptions} required />);
      expect(screen.getByTestId('select')).toBeRequired();
    });
  });
});
