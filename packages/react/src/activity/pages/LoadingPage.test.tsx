import { render, screen } from '@testing-library/react';
import { LoadingPage } from './LoadingPage';

describe('LoadingPage', () => {
  it('renders with default testId', () => {
    render(<LoadingPage />);
    expect(screen.getByTestId('loading-page')).toBeInTheDocument();
  });

  it('renders with custom testId', () => {
    render(<LoadingPage testId="custom-loading" />);
    expect(screen.getByTestId('custom-loading')).toBeInTheDocument();
  });

  it('displays spinner', () => {
    render(<LoadingPage />);
    expect(screen.getByTestId('loading-page-spinner')).toBeInTheDocument();
  });

  it('displays default message', () => {
    render(<LoadingPage />);
    expect(screen.getByTestId('loading-page-message')).toHaveTextContent('Initializing Discord Activity...');
  });

  it('displays custom message', () => {
    render(<LoadingPage message="Loading campaign data..." />);
    expect(screen.getByTestId('loading-page-message')).toHaveTextContent('Loading campaign data...');
  });

  it('has centered layout', () => {
    render(<LoadingPage />);
    const layout = screen.getByTestId('loading-page');
    expect(layout).toHaveClass('flex', 'items-center', 'justify-center');
  });

  it('spinner has correct testId based on page testId', () => {
    render(<LoadingPage testId="my-loader" />);
    expect(screen.getByTestId('my-loader-spinner')).toBeInTheDocument();
  });

  it('message has correct testId based on page testId', () => {
    render(<LoadingPage testId="my-loader" />);
    expect(screen.getByTestId('my-loader-message')).toBeInTheDocument();
  });
});
