
import { render, screen } from '@testing-library/react';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders dice icon', () => {
    render(<Icon name="dice" testId="test-icon" />);

    const icon = screen.getByTestId('test-icon');
    expect(icon).toHaveTextContent('🎲');
  });

  it('renders campaign icon', () => {
    render(<Icon name="campaign" testId="test-icon" />);

    expect(screen.getByTestId('test-icon')).toHaveTextContent('🏰');
  });

  it('renders settings icon', () => {
    render(<Icon name="settings" testId="test-icon" />);

    expect(screen.getByTestId('test-icon')).toHaveTextContent('⚙️');
  });

  it('renders user icon', () => {
    render(<Icon name="user" testId="test-icon" />);

    expect(screen.getByTestId('test-icon')).toHaveTextContent('👤');
  });

  it('renders question mark for unknown icon', () => {
    render(<Icon name="unknown" testId="test-icon" />);

    expect(screen.getByTestId('test-icon')).toHaveTextContent('?');
  });

  it('applies small size', () => {
    render(<Icon name="dice" size="sm" testId="test-icon" />);

    const icon = screen.getByTestId('test-icon');
    expect(icon).toHaveClass('text-sm');
  });

  it('applies medium size by default', () => {
    render(<Icon name="dice" testId="test-icon" />);

    const icon = screen.getByTestId('test-icon');
    expect(icon).toHaveClass('text-base');
  });

  it('applies large size', () => {
    render(<Icon name="dice" size="lg" testId="test-icon" />);

    const icon = screen.getByTestId('test-icon');
    expect(icon).toHaveClass('text-xl');
  });

  it('applies extra large size', () => {
    render(<Icon name="dice" size="xl" testId="test-icon" />);

    const icon = screen.getByTestId('test-icon');
    expect(icon).toHaveClass('text-2xl');
  });

  it('applies custom className', () => {
    render(<Icon name="dice" className="custom-class" testId="test-icon" />);

    const icon = screen.getByTestId('test-icon');
    expect(icon).toHaveClass('custom-class');
  });

  it('has role="img"', () => {
    render(<Icon name="dice" testId="test-icon" />);

    const icon = screen.getByTestId('test-icon');
    expect(icon).toHaveAttribute('role', 'img');
  });

  it('has aria-label with icon name', () => {
    render(<Icon name="dice" testId="test-icon" />);

    const icon = screen.getByTestId('test-icon');
    expect(icon).toHaveAttribute('aria-label', 'dice');
  });

  it('renders all icon types', () => {
    const iconNames = [
      'dice', 'campaign', 'settings', 'user', 'users', 'add', 'back', 'close',
      'check', 'warning', 'error', 'chat', 'voice', 'announcements', 'notes',
      'refresh', 'save', 'play', 'stop', 'pause',
    ];

    iconNames.forEach((name) => {
      const { unmount } = render(<Icon name={name} testId={`icon-${name}`} />);
      expect(screen.getByTestId(`icon-${name}`)).toBeInTheDocument();
      unmount();
    });
  });
});
