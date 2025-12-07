import { render, screen, fireEvent } from '@testing-library/react';
import { DesktopIcon } from './DesktopIcon';
import { RpgIcon } from '../../atoms/RpgIcon';

describe('DesktopIcon', () => {
  it('renders icon and label', () => {
    render(<DesktopIcon icon={<RpgIcon icon="tower" />} label="Campaign" testId="icon" />);

    expect(screen.getByTestId('icon-label')).toHaveTextContent('Campaign');
    expect(screen.getByTestId('icon-icon')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<DesktopIcon icon={<span>Icon</span>} label="Test" onClick={onClick} testId="icon" />);

    fireEvent.click(screen.getByTestId('icon'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onDoubleClick when double-clicked', () => {
    const onDoubleClick = jest.fn();
    render(<DesktopIcon icon={<span>Icon</span>} label="Test" onDoubleClick={onDoubleClick} testId="icon" />);

    fireEvent.doubleClick(screen.getByTestId('icon'));
    expect(onDoubleClick).toHaveBeenCalledTimes(1);
  });

  it('shows selected state when isSelected is true', () => {
    render(<DesktopIcon icon={<span>Icon</span>} label="Test" isSelected={true} testId="icon" />);

    expect(screen.getByTestId('icon')).toHaveClass('desktop-icon-selected');
  });

  it('supports keyboard interaction - Enter key triggers onDoubleClick', () => {
    const onDoubleClick = jest.fn();
    render(<DesktopIcon icon={<span>Icon</span>} label="Test" onDoubleClick={onDoubleClick} testId="icon" />);

    const icon = screen.getByTestId('icon');
    fireEvent.keyDown(icon, { key: 'Enter' });
    expect(onDoubleClick).toHaveBeenCalledTimes(1);
  });

  it('supports keyboard interaction - Space key triggers onClick', () => {
    const onClick = jest.fn();
    render(<DesktopIcon icon={<span>Icon</span>} label="Test" onClick={onClick} testId="icon" />);

    const icon = screen.getByTestId('icon');
    fireEvent.keyDown(icon, { key: ' ' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is keyboard accessible with tabIndex', () => {
    render(<DesktopIcon icon={<span>Icon</span>} label="Test" testId="icon" />);

    expect(screen.getByTestId('icon')).toHaveAttribute('tabIndex', '0');
  });

  it('applies custom className', () => {
    render(<DesktopIcon icon={<span>Icon</span>} label="Test" className="custom-class" testId="icon" />);

    expect(screen.getByTestId('icon')).toHaveClass('custom-class');
  });
});
