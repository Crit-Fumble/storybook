
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  describe('rendering', () => {
    it('renders with role="status"', () => {
      render(<Spinner />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('has accessible label', () => {
      render(<Spinner />);
      expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
    });

    it('applies testId when provided', () => {
      render(<Spinner testId="my-spinner" />);
      expect(screen.getByTestId('my-spinner')).toBeInTheDocument();
    });

    it('applies animation class', () => {
      render(<Spinner testId="spinner" />);
      expect(screen.getByTestId('spinner')).toHaveClass('animate-spin');
    });
  });

  describe('sizes', () => {
    it('applies medium size by default', () => {
      render(<Spinner testId="spinner" />);
      expect(screen.getByTestId('spinner')).toHaveClass('w-6', 'h-6');
    });

    it('applies small size', () => {
      render(<Spinner testId="spinner" size="sm" />);
      expect(screen.getByTestId('spinner')).toHaveClass('w-4', 'h-4');
    });

    it('applies large size', () => {
      render(<Spinner testId="spinner" size="lg" />);
      expect(screen.getByTestId('spinner')).toHaveClass('w-8', 'h-8');
    });
  });

  describe('styling', () => {
    it('applies base styling', () => {
      render(<Spinner testId="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass(
        'rounded-full',
        'border-2',
        'border-cfg-text-muted',
        'border-t-cfg-primary'
      );
    });

    it('merges custom className', () => {
      render(<Spinner testId="spinner" className="custom-class" />);
      expect(screen.getByTestId('spinner')).toHaveClass('custom-class');
    });
  });
});
