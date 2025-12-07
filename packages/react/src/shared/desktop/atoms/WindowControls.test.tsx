import { render, screen, fireEvent } from '@testing-library/react';
import { WindowControls } from './WindowControls';

describe('WindowControls', () => {
  it('renders all control buttons by default', () => {
    render(<WindowControls testId="controls" />);

    expect(screen.getByTestId('controls-minimize')).toBeInTheDocument();
    expect(screen.getByTestId('controls-maximize')).toBeInTheDocument();
    expect(screen.getByTestId('controls-close')).toBeInTheDocument();
  });

  it('calls onMinimize when minimize button is clicked', () => {
    const onMinimize = jest.fn();
    render(<WindowControls onMinimize={onMinimize} testId="controls" />);

    fireEvent.click(screen.getByTestId('controls-minimize'));
    expect(onMinimize).toHaveBeenCalledTimes(1);
  });

  it('calls onMaximize when maximize button is clicked', () => {
    const onMaximize = jest.fn();
    render(<WindowControls onMaximize={onMaximize} testId="controls" />);

    fireEvent.click(screen.getByTestId('controls-maximize'));
    expect(onMaximize).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<WindowControls onClose={onClose} testId="controls" />);

    fireEvent.click(screen.getByTestId('controls-close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('shows different maximize icon when maximized', () => {
    const { rerender } = render(<WindowControls isMaximized={false} testId="controls" />);
    const maximizeBtn = screen.getByTestId('controls-maximize');

    // When not maximized, should show single rectangle
    expect(maximizeBtn).toHaveAttribute('aria-label', 'Maximize window');
    expect(maximizeBtn).toHaveAttribute('title', 'Maximize');

    rerender(<WindowControls isMaximized={true} testId="controls" />);

    // When maximized, should show overlapping rectangles and different aria-label
    expect(screen.getByTestId('controls-maximize')).toHaveAttribute('aria-label', 'Restore window');
    expect(screen.getByTestId('controls-maximize')).toHaveAttribute('title', 'Restore');
  });

  it('hides minimize button when showMinimize is false', () => {
    render(<WindowControls showMinimize={false} testId="controls" />);

    expect(screen.queryByTestId('controls-minimize')).not.toBeInTheDocument();
    expect(screen.getByTestId('controls-maximize')).toBeInTheDocument();
    expect(screen.getByTestId('controls-close')).toBeInTheDocument();
  });

  it('hides maximize button when showMaximize is false', () => {
    render(<WindowControls showMaximize={false} testId="controls" />);

    expect(screen.getByTestId('controls-minimize')).toBeInTheDocument();
    expect(screen.queryByTestId('controls-maximize')).not.toBeInTheDocument();
    expect(screen.getByTestId('controls-close')).toBeInTheDocument();
  });

  it('hides close button when showClose is false', () => {
    render(<WindowControls showClose={false} testId="controls" />);

    expect(screen.getByTestId('controls-minimize')).toBeInTheDocument();
    expect(screen.getByTestId('controls-maximize')).toBeInTheDocument();
    expect(screen.queryByTestId('controls-close')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<WindowControls className="custom-class" testId="controls" />);

    expect(screen.getByTestId('controls')).toHaveClass('custom-class');
  });
});
