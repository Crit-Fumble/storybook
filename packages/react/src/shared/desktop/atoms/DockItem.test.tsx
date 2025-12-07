import { render, screen, fireEvent } from '@testing-library/react';
import { DockItem } from './DockItem';
import { RpgIcon } from '../../atoms/RpgIcon';

describe('DockItem', () => {
  it('renders icon and has label as title attribute', () => {
    render(<DockItem icon={<RpgIcon icon="tower" />} label="Campaign" testId="dock-item" />);

    expect(screen.getByTestId('dock-item')).toHaveAttribute('title', 'Campaign');
    expect(screen.getByTestId('dock-item-icon')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<DockItem icon={<span>Icon</span>} label="Test" onClick={onClick} testId="dock-item" />);

    fireEvent.click(screen.getByTestId('dock-item'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('shows active state when isActive is true', () => {
    render(<DockItem icon={<span>Icon</span>} label="Test" isActive={true} testId="dock-item" />);

    expect(screen.getByTestId('dock-item')).toHaveClass('desktop-dock-item-active');
  });

  it('displays badge when provided', () => {
    render(<DockItem icon={<span>Icon</span>} label="Test" badge={5} testId="dock-item" />);

    const badge = screen.getByTestId('dock-item-badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('5');
  });

  it('shows 99+ for badges over 99', () => {
    render(<DockItem icon={<span>Icon</span>} label="Test" badge={127} testId="dock-item" />);

    expect(screen.getByTestId('dock-item-badge')).toHaveTextContent('99+');
  });

  it('does not show badge when badge is 0', () => {
    render(<DockItem icon={<span>Icon</span>} label="Test" badge={0} testId="dock-item" />);

    expect(screen.queryByTestId('dock-item-badge')).not.toBeInTheDocument();
  });

  it('supports keyboard interaction - Enter key', () => {
    const onClick = jest.fn();
    render(<DockItem icon={<span>Icon</span>} label="Test" onClick={onClick} testId="dock-item" />);

    fireEvent.keyDown(screen.getByTestId('dock-item'), { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('supports keyboard interaction - Space key', () => {
    const onClick = jest.fn();
    render(<DockItem icon={<span>Icon</span>} label="Test" onClick={onClick} testId="dock-item" />);

    fireEvent.keyDown(screen.getByTestId('dock-item'), { key: ' ' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<DockItem icon={<span>Icon</span>} label="Test" className="custom-class" testId="dock-item" />);

    expect(screen.getByTestId('dock-item')).toHaveClass('custom-class');
  });
});
