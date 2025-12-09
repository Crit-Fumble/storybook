
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Banner } from './Banner';

describe('Banner', () => {
  it('renders children', () => {
    render(<Banner>Test Message</Banner>);

    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('renders warning variant by default', () => {
    render(<Banner testId="test-banner">Warning</Banner>);

    const banner = screen.getByTestId('test-banner');
    expect(banner).toHaveClass('bg-cfg-yellow');
  });

  it('renders info variant', () => {
    render(<Banner variant="info" testId="test-banner">Info</Banner>);

    const banner = screen.getByTestId('test-banner');
    expect(banner).toHaveClass('bg-cfg-primary');
  });

  it('renders success variant', () => {
    render(<Banner variant="success" testId="test-banner">Success</Banner>);

    const banner = screen.getByTestId('test-banner');
    expect(banner).toHaveClass('bg-cfg-green');
  });

  it('renders danger variant', () => {
    render(<Banner variant="danger" testId="test-banner">Danger</Banner>);

    const banner = screen.getByTestId('test-banner');
    expect(banner).toHaveClass('bg-cfg-red');
  });

  it('applies sticky class when sticky is true', () => {
    render(<Banner sticky testId="test-banner">Sticky</Banner>);

    const banner = screen.getByTestId('test-banner');
    expect(banner).toHaveClass('sticky');
  });

  it('does not apply sticky class by default', () => {
    render(<Banner testId="test-banner">Not Sticky</Banner>);

    const banner = screen.getByTestId('test-banner');
    expect(banner).not.toHaveClass('sticky');
  });

  it('renders dismiss button when onDismiss is provided', () => {
    render(<Banner onDismiss={jest.fn()} testId="test-banner">Dismissible</Banner>);

    expect(screen.getByTestId('test-banner-dismiss')).toBeInTheDocument();
  });

  it('does not render dismiss button when onDismiss is not provided', () => {
    render(<Banner testId="test-banner">Not Dismissible</Banner>);

    expect(screen.queryByTestId('test-banner-dismiss')).not.toBeInTheDocument();
  });

  it('calls onDismiss when dismiss button is clicked', async () => {
    const user = userEvent.setup();
    const onDismiss = jest.fn();

    render(<Banner onDismiss={onDismiss} testId="test-banner">Dismissible</Banner>);

    const dismissButton = screen.getByTestId('test-banner-dismiss');
    await user.click(dismissButton);

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(
      <Banner className="custom-class" testId="test-banner">
        Custom
      </Banner>
    );

    const banner = screen.getByTestId('test-banner');
    expect(banner).toHaveClass('custom-class');
  });

  it('has role="alert"', () => {
    render(<Banner testId="test-banner">Alert</Banner>);

    const banner = screen.getByTestId('test-banner');
    expect(banner).toHaveAttribute('role', 'alert');
  });
});
