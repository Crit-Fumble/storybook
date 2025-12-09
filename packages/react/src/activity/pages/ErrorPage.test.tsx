import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorPage } from './ErrorPage';

describe('ErrorPage', () => {
  const mockError = new Error('Test error message');

  it('renders with default testId', () => {
    render(<ErrorPage error={mockError} />);
    expect(screen.getByTestId('error-page')).toBeInTheDocument();
  });

  it('renders with custom testId', () => {
    render(<ErrorPage error={mockError} testId="custom-error" />);
    expect(screen.getByTestId('custom-error')).toBeInTheDocument();
  });

  it('displays error icon', () => {
    render(<ErrorPage error={mockError} />);
    expect(screen.getByTestId('error-page-icon')).toHaveTextContent('⚠️');
  });

  it('displays error title', () => {
    render(<ErrorPage error={mockError} />);
    expect(screen.getByTestId('error-page-title')).toHaveTextContent('Something went wrong');
  });

  it('displays error message', () => {
    render(<ErrorPage error={mockError} />);
    expect(screen.getByTestId('error-page-message')).toHaveTextContent('Test error message');
  });

  describe('retry button', () => {
    it('does not show retry button by default', () => {
      render(<ErrorPage error={mockError} />);
      expect(screen.queryByTestId('error-page-retry-btn')).not.toBeInTheDocument();
    });

    it('shows retry button when onRetry is provided', () => {
      const onRetry = jest.fn();
      render(<ErrorPage error={mockError} onRetry={onRetry} />);
      expect(screen.getByTestId('error-page-retry-btn')).toBeInTheDocument();
      expect(screen.getByText('Try Again')).toBeInTheDocument();
    });

    it('calls onRetry when retry button is clicked', () => {
      const onRetry = jest.fn();
      render(<ErrorPage error={mockError} onRetry={onRetry} />);
      fireEvent.click(screen.getByTestId('error-page-retry-btn'));
      expect(onRetry).toHaveBeenCalledTimes(1);
    });
  });

  it('handles different error messages', () => {
    const customError = new Error('Network connection failed');
    render(<ErrorPage error={customError} />);
    expect(screen.getByTestId('error-page-message')).toHaveTextContent('Network connection failed');
  });
});
