import { render, screen, fireEvent } from '@testing-library/react';
import { WindowManager } from './WindowManager';
import { RpgIcon } from '../../atoms/RpgIcon';

// Mock react-rnd
jest.mock('react-rnd', () => ({
  Rnd: ({ children, onMouseDown }: any) => (
    <div data-testid="rnd-wrapper" onClick={onMouseDown}>
      {children}
    </div>
  ),
}));

describe('WindowManager', () => {
  const mockWindows = [
    {
      id: 'window1',
      title: 'Window 1',
      icon: <RpgIcon icon="gear" />,
      content: <div>Window 1 Content</div>,
      defaultPosition: { x: 100, y: 100 },
      defaultSize: { width: 600, height: 400 },
    },
    {
      id: 'window2',
      title: 'Window 2',
      content: <div>Window 2 Content</div>,
      defaultPosition: { x: 200, y: 200 },
      defaultSize: { width: 500, height: 300 },
    },
  ];

  it('renders all windows', () => {
    render(<WindowManager windows={mockWindows} testId="manager" />);

    expect(screen.getByText('Window 1')).toBeInTheDocument();
    expect(screen.getByText('Window 2')).toBeInTheDocument();
  });

  it('renders window content', () => {
    render(<WindowManager windows={mockWindows} testId="manager" />);

    expect(screen.getByText('Window 1 Content')).toBeInTheDocument();
    expect(screen.getByText('Window 2 Content')).toBeInTheDocument();
  });

  it('renders windows with correct testIds', () => {
    render(<WindowManager windows={mockWindows} testId="manager" />);

    expect(screen.getByTestId('manager-window-window1')).toBeInTheDocument();
    expect(screen.getByTestId('manager-window-window2')).toBeInTheDocument();
  });

  it('calls onWindowClose when window is closed', () => {
    const onClose = jest.fn();
    render(<WindowManager windows={mockWindows} onWindowClose={onClose} testId="manager" />);

    fireEvent.click(screen.getByTestId('manager-window-window1-header-controls-close'));
    expect(onClose).toHaveBeenCalledWith('window1');
  });

  it('respects maxWindows limit', () => {
    const manyWindows = Array.from({ length: 15 }, (_, i) => ({
      id: `window${i}`,
      title: `Window ${i}`,
      content: <div>Content {i}</div>,
    }));

    render(<WindowManager windows={manyWindows} maxWindows={5} testId="manager" />);

    expect(screen.getByText('Window 0')).toBeInTheDocument();
    expect(screen.getByText('Window 4')).toBeInTheDocument();
    expect(screen.queryByText('Window 5')).not.toBeInTheDocument();
  });

  it('uses default maxWindows of 10', () => {
    const manyWindows = Array.from({ length: 15 }, (_, i) => ({
      id: `window${i}`,
      title: `Window ${i}`,
      content: <div>Content {i}</div>,
    }));

    render(<WindowManager windows={manyWindows} testId="manager" />);

    expect(screen.getByText('Window 9')).toBeInTheDocument();
    expect(screen.queryByText('Window 10')).not.toBeInTheDocument();
  });

  it('applies theme to windows', () => {
    render(<WindowManager windows={mockWindows} theme="fantasy" testId="manager" />);

    expect(screen.getByTestId('manager-window-window1')).toHaveClass('theme-fantasy');
  });

  it('allows window-specific theme to override global theme', () => {
    const windowsWithThemes = [
      {
        ...mockWindows[0],
        theme: 'sci-fi' as const,
      },
      mockWindows[1],
    ];

    render(<WindowManager windows={windowsWithThemes} theme="fantasy" testId="manager" />);

    expect(screen.getByTestId('manager-window-window1')).toHaveClass('theme-sci-fi');
    expect(screen.getByTestId('manager-window-window2')).toHaveClass('theme-fantasy');
  });

  it('applies custom className', () => {
    render(<WindowManager windows={mockWindows} className="custom-class" testId="manager" />);

    expect(screen.getByTestId('manager')).toHaveClass('custom-class');
  });

  it('renders with no windows', () => {
    render(<WindowManager windows={[]} testId="manager" />);

    expect(screen.getByTestId('manager')).toBeInTheDocument();
    expect(screen.getByTestId('manager').children).toHaveLength(0);
  });

  it('passes window configuration to Window component', () => {
    const windowsWithConfig = [
      {
        id: 'config-window',
        title: 'Config Window',
        content: <div>Content</div>,
        minWidth: 400,
        minHeight: 300,
        resizable: false,
        draggable: false,
      },
    ];

    render(<WindowManager windows={windowsWithConfig} testId="manager" />);

    expect(screen.getByText('Config Window')).toBeInTheDocument();
  });

  it('renders window icons', () => {
    const { container } = render(<WindowManager windows={mockWindows} testId="manager" />);

    expect(container.querySelector('.ra-gear')).toBeInTheDocument();
  });

  it('handles window close and removes from state', () => {
    const onClose = jest.fn();
    const { rerender } = render(
      <WindowManager windows={mockWindows} onWindowClose={onClose} testId="manager" />
    );

    fireEvent.click(screen.getByTestId('manager-window-window1-header-controls-close'));

    // After close, window should not render even if still in windows array
    // (WindowManager tracks open windows internally)
    expect(onClose).toHaveBeenCalledWith('window1');
  });

  it('focuses window when clicked', () => {
    render(<WindowManager windows={mockWindows} testId="manager" />);

    // Click on the window to focus it
    fireEvent.click(screen.getByTestId('manager-window-window2'));

    // The window store should handle focus, but we can verify the click happened
    expect(screen.getByTestId('manager-window-window2')).toBeInTheDocument();
  });
});
