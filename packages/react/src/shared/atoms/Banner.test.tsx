import { render, screen, fireEvent } from '@testing-library/react';
import { Banner } from './Banner';

describe('Banner', () => {
  it('renders children content', () => {
    render(<Banner>Test message</Banner>);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders with testId', () => {
    render(<Banner testId="test-banner">Content</Banner>);
    expect(screen.getByTestId('test-banner')).toBeInTheDocument();
  });

  it('has role="alert" for accessibility', () => {
    render(<Banner>Alert content</Banner>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  describe('variants', () => {
    it('renders warning variant by default', () => {
      render(<Banner testId="banner">Warning</Banner>);
      const banner = screen.getByTestId('banner');
      expect(banner).toHaveClass('bg-cfg-yellow', 'text-black');
    });

    it('renders info variant', () => {
      render(<Banner variant="info" testId="banner">Info</Banner>);
      const banner = screen.getByTestId('banner');
      expect(banner).toHaveClass('bg-cfg-primary', 'text-white');
    });

    it('renders success variant', () => {
      render(<Banner variant="success" testId="banner">Success</Banner>);
      const banner = screen.getByTestId('banner');
      expect(banner).toHaveClass('bg-cfg-green', 'text-white');
    });

    it('renders danger variant', () => {
      render(<Banner variant="danger" testId="banner">Danger</Banner>);
      const banner = screen.getByTestId('banner');
      expect(banner).toHaveClass('bg-cfg-red', 'text-white');
    });
  });

  describe('sticky behavior', () => {
    it('is not sticky by default', () => {
      render(<Banner testId="banner">Content</Banner>);
      const banner = screen.getByTestId('banner');
      expect(banner).not.toHaveClass('sticky');
    });

    it('is sticky when sticky prop is true', () => {
      render(<Banner sticky testId="banner">Content</Banner>);
      const banner = screen.getByTestId('banner');
      expect(banner).toHaveClass('sticky', 'top-0');
    });
  });

  describe('dismiss button', () => {
    it('does not show dismiss button by default', () => {
      render(<Banner testId="banner">Content</Banner>);
      expect(screen.queryByLabelText('Dismiss')).not.toBeInTheDocument();
    });

    it('shows dismiss button when onDismiss is provided', () => {
      const onDismiss = jest.fn();
      render(<Banner onDismiss={onDismiss} testId="banner">Content</Banner>);
      expect(screen.getByLabelText('Dismiss')).toBeInTheDocument();
    });

    it('calls onDismiss when dismiss button is clicked', () => {
      const onDismiss = jest.fn();
      render(<Banner onDismiss={onDismiss} testId="banner">Content</Banner>);
      fireEvent.click(screen.getByLabelText('Dismiss'));
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('dismiss button has correct testId', () => {
      const onDismiss = jest.fn();
      render(<Banner onDismiss={onDismiss} testId="banner">Content</Banner>);
      expect(screen.getByTestId('banner-dismiss')).toBeInTheDocument();
    });
  });

  it('applies custom className', () => {
    render(<Banner className="custom-class" testId="banner">Content</Banner>);
    const banner = screen.getByTestId('banner');
    expect(banner).toHaveClass('custom-class');
  });
});
