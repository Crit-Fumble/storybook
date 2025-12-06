
import { render, screen, fireEvent } from '@testing-library/react';
import { Textarea } from './Textarea';
import { createRef } from 'react';

describe('Textarea', () => {
  describe('rendering', () => {
    it('renders as a textarea element', () => {
      render(<Textarea />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('applies testId when provided', () => {
      render(<Textarea testId="my-textarea" />);
      expect(screen.getByTestId('my-textarea')).toBeInTheDocument();
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLTextAreaElement>();
      render(<Textarea ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    });
  });

  describe('styling', () => {
    it('applies base input class', () => {
      render(<Textarea testId="textarea" />);
      expect(screen.getByTestId('textarea')).toHaveClass('input');
    });

    it('has resize-none class', () => {
      render(<Textarea testId="textarea" />);
      expect(screen.getByTestId('textarea')).toHaveClass('resize-none');
    });

    it('has minimum height', () => {
      render(<Textarea testId="textarea" />);
      expect(screen.getByTestId('textarea')).toHaveClass('min-h-[80px]');
    });

    it('merges custom className', () => {
      render(<Textarea testId="textarea" className="custom-class" />);
      expect(screen.getByTestId('textarea')).toHaveClass('custom-class');
    });
  });

  describe('error state', () => {
    it('applies error styling when error is true', () => {
      render(<Textarea testId="textarea" error />);
      expect(screen.getByTestId('textarea')).toHaveClass('border-cfg-red');
    });

    it('does not apply error styling when error is false', () => {
      render(<Textarea testId="textarea" error={false} />);
      expect(screen.getByTestId('textarea')).not.toHaveClass('border-cfg-red');
    });
  });

  describe('interactions', () => {
    it('handles value changes', () => {
      const handleChange = jest.fn();
      render(<Textarea onChange={handleChange} />);
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test content' } });
      expect(handleChange).toHaveBeenCalled();
    });

    it('can be controlled', () => {
      const { rerender } = render(<Textarea value="initial" onChange={() => {}} />);
      expect(screen.getByRole('textbox')).toHaveValue('initial');

      rerender(<Textarea value="updated" onChange={() => {}} />);
      expect(screen.getByRole('textbox')).toHaveValue('updated');
    });

    it('handles focus events', () => {
      const handleFocus = jest.fn();
      const handleBlur = jest.fn();
      render(<Textarea onFocus={handleFocus} onBlur={handleBlur} />);

      const textarea = screen.getByRole('textbox');
      fireEvent.focus(textarea);
      expect(handleFocus).toHaveBeenCalled();

      fireEvent.blur(textarea);
      expect(handleBlur).toHaveBeenCalled();
    });
  });

  describe('custom props', () => {
    it('supports placeholder', () => {
      render(<Textarea placeholder="Enter description" />);
      expect(screen.getByPlaceholderText('Enter description')).toBeInTheDocument();
    });

    it('supports disabled state', () => {
      render(<Textarea disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('supports rows attribute', () => {
      render(<Textarea testId="textarea" rows={5} />);
      expect(screen.getByTestId('textarea')).toHaveAttribute('rows', '5');
    });

    it('supports maxLength', () => {
      render(<Textarea testId="textarea" maxLength={500} />);
      expect(screen.getByTestId('textarea')).toHaveAttribute('maxLength', '500');
    });

    it('supports readOnly', () => {
      render(<Textarea testId="textarea" readOnly />);
      expect(screen.getByTestId('textarea')).toHaveAttribute('readonly');
    });
  });
});
