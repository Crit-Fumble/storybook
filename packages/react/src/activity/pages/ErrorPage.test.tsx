
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorPage } from './ErrorPage';

describe('ErrorPage', () => {
  it('renders error message', () => {
    const error = new Error('Test error message');
    render(<ErrorPage error={error} />);

    expect(screen.getByTestId('error-page')).toBeInTheDocument();
    expect(screen.getByTestId('error-page-icon')).toHaveTextContent('⚠️');
    expect(screen.getByTestId('error-page-title')).toHaveTextContent('Something went wrong');
    expect(screen.getByTestId('error-page-message')).toHaveTextContent('Test error message');
  });

  it('renders retry button when onRetry is provided', () => {
    const error = new Error('Test error');
    const onRetry = jest.fn();
    render(<ErrorPage error={error} onRetry={onRetry} />);

    const retryButton = screen.getByTestId('error-page-retry-btn');
    expect(retryButton).toBeInTheDocument();
    expect(retryButton).toHaveTextContent('Try Again');
  });

  it('does not render retry button when onRetry is not provided', () => {
    const error = new Error('Test error');
    render(<ErrorPage error={error} />);

    expect(screen.queryByTestId('error-page-retry-btn')).not.toBeInTheDocument();
  });

  it('calls onRetry when retry button is clicked', async () => {
    const user = userEvent.setup();
    const error = new Error('Test error');
    const onRetry = jest.fn();
    render(<ErrorPage error={error} onRetry={onRetry} />);

    const retryButton = screen.getByTestId('error-page-retry-btn');
    await user.click(retryButton);

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('accepts custom testId', () => {
    const error = new Error('Test error');
    render(<ErrorPage error={error} testId="custom-error" />);

    expect(screen.getByTestId('custom-error')).toBeInTheDocument();
    expect(screen.getByTestId('custom-error-icon')).toBeInTheDocument();
  });
});
