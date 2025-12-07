import { render, screen, fireEvent } from '@testing-library/react';
import { WindowHeader } from './WindowHeader';
import { RpgIcon } from '../../atoms/RpgIcon';

describe('WindowHeader', () => {
  it('renders title', () => {
    render(<WindowHeader title="Test Window" testId="header" />);

    expect(screen.getByText('Test Window')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    const { container } = render(
      <WindowHeader title="Test" icon={<RpgIcon icon="gear" />} testId="header" />
    );

    expect(container.querySelector('.ra-gear')).toBeInTheDocument();
  });

  it('renders all control buttons by default', () => {
    render(<WindowHeader title="Test" testId="header" />);

    expect(screen.getByTestId('header-controls-minimize')).toBeInTheDocument();
    expect(screen.getByTestId('header-controls-maximize')).toBeInTheDocument();
    expect(screen.getByTestId('header-controls-close')).toBeInTheDocument();
  });

  it('calls onMinimize when minimize is clicked', () => {
    const onMinimize = jest.fn();
    render(<WindowHeader title="Test" onMinimize={onMinimize} testId="header" />);

    fireEvent.click(screen.getByTestId('header-controls-minimize'));
    expect(onMinimize).toHaveBeenCalledTimes(1);
  });

  it('calls onMaximize when maximize is clicked', () => {
    const onMaximize = jest.fn();
    render(<WindowHeader title="Test" onMaximize={onMaximize} testId="header" />);

    fireEvent.click(screen.getByTestId('header-controls-maximize'));
    expect(onMaximize).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close is clicked', () => {
    const onClose = jest.fn();
    render(<WindowHeader title="Test" onClose={onClose} testId="header" />);

    fireEvent.click(screen.getByTestId('header-controls-close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onDoubleClick when title is double-clicked', () => {
    const onDoubleClick = jest.fn();
    render(<WindowHeader title="Test" onDoubleClick={onDoubleClick} testId="header" />);

    fireEvent.doubleClick(screen.getByTestId('header-titlebar'));
    expect(onDoubleClick).toHaveBeenCalledTimes(1);
  });

  it('passes isMaximized state to controls', () => {
    const { rerender } = render(<WindowHeader title="Test" isMaximized={false} testId="header" />);

    const maximizeBtn = screen.getByTestId('header-controls-maximize');
    expect(maximizeBtn).toHaveAttribute('aria-label', 'Maximize window');

    rerender(<WindowHeader title="Test" isMaximized={true} testId="header" />);
    expect(screen.getByTestId('header-controls-maximize')).toHaveAttribute('aria-label', 'Restore window');
  });

  it('hides minimize when showMinimize is false', () => {
    render(<WindowHeader title="Test" showMinimize={false} testId="header" />);

    expect(screen.queryByTestId('header-controls-minimize')).not.toBeInTheDocument();
  });

  it('hides maximize when showMaximize is false', () => {
    render(<WindowHeader title="Test" showMaximize={false} testId="header" />);

    expect(screen.queryByTestId('header-controls-maximize')).not.toBeInTheDocument();
  });

  it('hides close when showClose is false', () => {
    render(<WindowHeader title="Test" showClose={false} testId="header" />);

    expect(screen.queryByTestId('header-controls-close')).not.toBeInTheDocument();
  });

  it('has desktop-window-titlebar class', () => {
    render(<WindowHeader title="Test" testId="header" />);

    expect(screen.getByTestId('header')).toHaveClass('desktop-window-titlebar');
  });

  it('applies custom className', () => {
    render(<WindowHeader title="Test" className="custom-class" testId="header" />);

    expect(screen.getByTestId('header')).toHaveClass('custom-class');
  });
});
