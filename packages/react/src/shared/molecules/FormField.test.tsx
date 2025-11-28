import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormField } from './FormField';

describe('FormField', () => {
  const defaultProps = {
    label: 'Email',
    name: 'email',
    value: '',
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('renders label correctly', () => {
      render(<FormField {...defaultProps} />);
      expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('renders input by default', () => {
      render(<FormField {...defaultProps} />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('applies testId to wrapper and elements', () => {
      render(<FormField {...defaultProps} testId="email" />);
      expect(screen.getByTestId('email-field')).toBeInTheDocument();
      expect(screen.getByTestId('email-label')).toBeInTheDocument();
      expect(screen.getByTestId('email')).toBeInTheDocument();
    });

    it('uses name as testId fallback', () => {
      render(<FormField {...defaultProps} />);
      expect(screen.getByTestId('email-field')).toBeInTheDocument();
      expect(screen.getByTestId('email-label')).toBeInTheDocument();
      expect(screen.getByTestId('email')).toBeInTheDocument();
    });
  });

  describe('input types', () => {
    it('renders text input by default', () => {
      render(<FormField {...defaultProps} testId="field" />);
      expect(screen.getByTestId('field')).toHaveAttribute('type', 'text');
    });

    it('renders email input', () => {
      render(<FormField {...defaultProps} type="email" testId="field" />);
      expect(screen.getByTestId('field')).toHaveAttribute('type', 'email');
    });

    it('renders password input', () => {
      render(<FormField {...defaultProps} type="password" testId="field" />);
      expect(screen.getByTestId('field')).toHaveAttribute('type', 'password');
    });

    it('renders number input', () => {
      render(<FormField {...defaultProps} type="number" testId="field" />);
      expect(screen.getByTestId('field')).toHaveAttribute('type', 'number');
    });

    it('renders url input', () => {
      render(<FormField {...defaultProps} type="url" testId="field" />);
      expect(screen.getByTestId('field')).toHaveAttribute('type', 'url');
    });

    it('renders textarea when type is textarea', () => {
      render(<FormField {...defaultProps} type="textarea" />);
      expect(screen.getByRole('textbox').tagName).toBe('TEXTAREA');
    });

    it('renders select when type is select', () => {
      const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ];
      render(<FormField {...defaultProps} type="select" options={options} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('required field', () => {
    it('shows required indicator when required is true', () => {
      render(<FormField {...defaultProps} required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('does not show required indicator when required is false', () => {
      render(<FormField {...defaultProps} required={false} />);
      expect(screen.queryByText('*')).not.toBeInTheDocument();
    });
  });

  describe('error handling', () => {
    it('displays error message when error is provided', () => {
      render(<FormField {...defaultProps} error="This field is required" testId="email" />);
      expect(screen.getByTestId('email-error')).toHaveTextContent('This field is required');
    });

    it('does not display error when not provided', () => {
      render(<FormField {...defaultProps} testId="email" />);
      expect(screen.queryByTestId('email-error')).not.toBeInTheDocument();
    });

    it('applies error styling to input when error exists', () => {
      render(<FormField {...defaultProps} error="Error" testId="email" />);
      expect(screen.getByTestId('email')).toHaveClass('border-cfg-red');
    });
  });

  describe('interactions', () => {
    it('calls onChange with new value for text input', () => {
      const onChange = vi.fn();
      render(<FormField {...defaultProps} onChange={onChange} />);
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test@example.com' } });
      expect(onChange).toHaveBeenCalledWith('test@example.com');
    });

    it('calls onChange with new value for textarea', () => {
      const onChange = vi.fn();
      render(<FormField {...defaultProps} type="textarea" onChange={onChange} />);
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Long text content' } });
      expect(onChange).toHaveBeenCalledWith('Long text content');
    });

    it('calls onChange with new value for select', () => {
      const onChange = vi.fn();
      const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ];
      render(<FormField {...defaultProps} type="select" options={options} onChange={onChange} />);
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'option2' } });
      expect(onChange).toHaveBeenCalledWith('option2');
    });
  });

  describe('controlled value', () => {
    it('displays controlled value in input', () => {
      render(<FormField {...defaultProps} value="test@example.com" />);
      expect(screen.getByRole('textbox')).toHaveValue('test@example.com');
    });

    it('displays controlled value in textarea', () => {
      render(<FormField {...defaultProps} type="textarea" value="Some text" />);
      expect(screen.getByRole('textbox')).toHaveValue('Some text');
    });

    it('displays controlled value in select', () => {
      const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ];
      render(<FormField {...defaultProps} type="select" options={options} value="option2" />);
      expect(screen.getByRole('combobox')).toHaveValue('option2');
    });
  });

  describe('disabled state', () => {
    it('disables text input when disabled is true', () => {
      render(<FormField {...defaultProps} disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('disables textarea when disabled is true', () => {
      render(<FormField {...defaultProps} type="textarea" disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('disables select when disabled is true', () => {
      const options = [{ value: 'option1', label: 'Option 1' }];
      render(<FormField {...defaultProps} type="select" options={options} disabled />);
      expect(screen.getByRole('combobox')).toBeDisabled();
    });
  });

  describe('placeholder', () => {
    it('shows placeholder in text input', () => {
      render(<FormField {...defaultProps} placeholder="Enter your email" />);
      expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    });

    it('shows placeholder in textarea', () => {
      render(<FormField {...defaultProps} type="textarea" placeholder="Enter description" />);
      expect(screen.getByPlaceholderText('Enter description')).toBeInTheDocument();
    });
  });

  describe('label association', () => {
    it('associates label with input via htmlFor', () => {
      render(<FormField {...defaultProps} testId="email" />);
      const label = screen.getByTestId('email-label');
      const input = screen.getByTestId('email');
      expect(label).toHaveAttribute('for', 'email');
      expect(input).toHaveAttribute('id', 'email');
    });
  });
});
