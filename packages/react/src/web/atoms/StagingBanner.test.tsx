
import { render, screen } from '@testing-library/react';
import { StagingBanner } from './StagingBanner';

describe('StagingBanner', () => {
  it('renders when environment is staging', () => {
    render(<StagingBanner environment="staging" />);

    expect(screen.getByTestId('staging-banner')).toBeInTheDocument();
    expect(screen.getByText(/STAGING ENVIRONMENT/)).toBeInTheDocument();
  });

  it('does not render when environment is production', () => {
    render(<StagingBanner environment="production" />);

    expect(screen.queryByTestId('staging-banner')).not.toBeInTheDocument();
  });

  it('does not render when environment is development', () => {
    render(<StagingBanner environment="development" />);

    expect(screen.queryByTestId('staging-banner')).not.toBeInTheDocument();
  });

  it('does not render when environment is not provided', () => {
    render(<StagingBanner />);

    expect(screen.queryByTestId('staging-banner')).not.toBeInTheDocument();
  });

  it('displays warning message', () => {
    render(<StagingBanner environment="staging" />);

    expect(
      screen.getByText(/This is a test environment. Data may be reset at any time./)
    ).toBeInTheDocument();
  });

  it('accepts custom testId', () => {
    render(<StagingBanner environment="staging" testId="custom-banner" />);

    expect(screen.getByTestId('custom-banner')).toBeInTheDocument();
  });
});
