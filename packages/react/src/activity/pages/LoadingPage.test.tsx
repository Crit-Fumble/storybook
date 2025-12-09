
import { render, screen } from '@testing-library/react';
import { LoadingPage } from './LoadingPage';

describe('LoadingPage', () => {
  it('renders with default message', () => {
    render(<LoadingPage />);

    expect(screen.getByTestId('loading-page')).toBeInTheDocument();
    expect(screen.getByTestId('loading-page-spinner')).toBeInTheDocument();
    expect(screen.getByTestId('loading-page-message')).toHaveTextContent(
      'Initializing Discord Activity...'
    );
  });

  it('renders with custom message', () => {
    render(<LoadingPage message="Loading campaign data..." />);

    expect(screen.getByTestId('loading-page-message')).toHaveTextContent(
      'Loading campaign data...'
    );
  });

  it('accepts custom testId', () => {
    render(<LoadingPage testId="custom-loading" />);

    expect(screen.getByTestId('custom-loading')).toBeInTheDocument();
    expect(screen.getByTestId('custom-loading-spinner')).toBeInTheDocument();
  });
});
