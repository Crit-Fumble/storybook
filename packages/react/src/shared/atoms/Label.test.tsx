
import { render, screen } from '@testing-library/react';
import { Label } from './Label';

describe('Label', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(<Label>Email Address</Label>);
      expect(screen.getByText('Email Address')).toBeInTheDocument();
    });

    it('renders as a label element', () => {
      render(<Label testId="label">Test</Label>);
      expect(screen.getByTestId('label').tagName).toBe('LABEL');
    });

    it('applies testId when provided', () => {
      render(<Label testId="my-label">Test</Label>);
      expect(screen.getByTestId('my-label')).toBeInTheDocument();
    });
  });

  describe('required indicator', () => {
    it('shows required indicator when required is true', () => {
      render(<Label required>Required Field</Label>);
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('does not show required indicator when required is false', () => {
      render(<Label required={false}>Optional Field</Label>);
      expect(screen.queryByText('*')).not.toBeInTheDocument();
    });

    it('required indicator has correct styling', () => {
      render(<Label required>Field</Label>);
      expect(screen.getByText('*')).toHaveClass('text-cfg-red', 'ml-1');
    });
  });

  describe('styling', () => {
    it('applies base styling classes', () => {
      render(<Label testId="label">Test</Label>);
      const label = screen.getByTestId('label');
      expect(label).toHaveClass('block', 'text-sm', 'font-medium', 'text-cfg-text-muted', 'mb-1');
    });

    it('merges custom className', () => {
      render(<Label testId="label" className="custom-class">Test</Label>);
      expect(screen.getByTestId('label')).toHaveClass('custom-class');
    });
  });

  describe('htmlFor association', () => {
    it('supports htmlFor attribute', () => {
      render(<Label htmlFor="email-input">Email</Label>);
      expect(screen.getByText('Email')).toHaveAttribute('for', 'email-input');
    });

    it('associates with input when used together', () => {
      render(
        <>
          <Label htmlFor="test-input">Test Label</Label>
          <input id="test-input" type="text" />
        </>
      );
      const label = screen.getByText('Test Label');
      const input = screen.getByRole('textbox');
      expect(label).toHaveAttribute('for', 'test-input');
      expect(input).toHaveAttribute('id', 'test-input');
    });
  });
});
