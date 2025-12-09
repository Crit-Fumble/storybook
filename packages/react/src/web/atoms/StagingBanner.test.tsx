import { render, screen } from '@testing-library/react';
import { StagingBanner } from './StagingBanner';

describe('StagingBanner', () => {
  it('renders when environment is staging', () => {
    render(<StagingBanner environment="staging" />);
    expect(screen.getByTestId('staging-banner')).toBeInTheDocument();
  });

  it('shows correct warning message', () => {
    render(<StagingBanner environment="staging" />);
    expect(screen.getByText(/STAGING ENVIRONMENT/)).toBeInTheDocument();
    expect(screen.getByText(/Data may be reset at any time/)).toBeInTheDocument();
  });

  it('does not render in production environment', () => {
    render(<StagingBanner environment="production" />);
    expect(screen.queryByTestId('staging-banner')).not.toBeInTheDocument();
  });

  it('does not render in development environment', () => {
    render(<StagingBanner environment="development" />);
    expect(screen.queryByTestId('staging-banner')).not.toBeInTheDocument();
  });

  it('does not render when environment is undefined', () => {
    render(<StagingBanner environment={undefined} />);
    expect(screen.queryByTestId('staging-banner')).not.toBeInTheDocument();
  });

  it('renders with custom testId', () => {
    render(<StagingBanner environment="staging" testId="custom-banner" />);
    expect(screen.getByTestId('custom-banner')).toBeInTheDocument();
  });

  it('has sticky positioning', () => {
    render(<StagingBanner environment="staging" />);
    const banner = screen.getByTestId('staging-banner');
    expect(banner).toHaveClass('sticky', 'top-0', 'z-50');
  });

  it('has warning styling', () => {
    render(<StagingBanner environment="staging" />);
    const banner = screen.getByTestId('staging-banner');
    expect(banner).toHaveClass('bg-yellow-500', 'text-black');
  });
});
