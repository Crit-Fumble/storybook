import { render, screen, fireEvent } from '@testing-library/react';
import { Desktop } from './Desktop';
import { RpgIcon } from '../../atoms/RpgIcon';

describe('Desktop', () => {
  const mockIcons = [
    {
      id: 'settings',
      icon: <RpgIcon icon="gear" />,
      label: 'Settings',
      onOpen: jest.fn(),
    },
    {
      id: 'chat',
      icon: <RpgIcon icon="scroll-unfurled" />,
      label: 'Chat',
      onOpen: jest.fn(),
    },
  ];

  beforeEach(() => {
    mockIcons.forEach((icon) => (icon.onOpen as jest.Mock).mockClear());
  });

  it('renders desktop container', () => {
    render(<Desktop testId="desktop" />);

    expect(screen.getByTestId('desktop')).toBeInTheDocument();
  });

  it('renders desktop icons', () => {
    render(<Desktop icons={mockIcons} testId="desktop" />);

    expect(screen.getByTestId('desktop-icon-settings')).toBeInTheDocument();
    expect(screen.getByTestId('desktop-icon-chat')).toBeInTheDocument();
  });

  it('renders icons container when icons are provided', () => {
    render(<Desktop icons={mockIcons} testId="desktop" />);

    expect(screen.getByTestId('desktop-icons')).toBeInTheDocument();
  });

  it('does not render icons container when no icons', () => {
    render(<Desktop icons={[]} testId="desktop" />);

    expect(screen.queryByTestId('desktop-icons')).not.toBeInTheDocument();
  });

  it('calls onOpen when icon is double-clicked', () => {
    render(<Desktop icons={mockIcons} testId="desktop" />);

    fireEvent.doubleClick(screen.getByTestId('desktop-icon-settings'));
    expect(mockIcons[0].onOpen).toHaveBeenCalledTimes(1);
  });

  it('renders windows container', () => {
    render(
      <Desktop testId="desktop">
        <div>Window content</div>
      </Desktop>
    );

    expect(screen.getByTestId('desktop-windows')).toBeInTheDocument();
    expect(screen.getByText('Window content')).toBeInTheDocument();
  });

  it('does not show dock by default', () => {
    render(<Desktop icons={mockIcons} testId="desktop" />);

    expect(screen.queryByTestId('desktop-dock')).not.toBeInTheDocument();
  });

  it('shows dock when showDock is true', () => {
    render(<Desktop icons={mockIcons} showDock testId="desktop" />);

    expect(screen.getByTestId('desktop-dock')).toBeInTheDocument();
  });

  it('does not show dock when no icons even if showDock is true', () => {
    render(<Desktop icons={[]} showDock testId="desktop" />);

    expect(screen.queryByTestId('desktop-dock')).not.toBeInTheDocument();
  });

  it('renders dock at bottom position by default', () => {
    render(<Desktop icons={mockIcons} showDock testId="desktop" />);

    expect(screen.getByTestId('desktop-dock')).toHaveClass('bottom-0');
  });

  it('renders dock at specified position', () => {
    render(<Desktop icons={mockIcons} showDock dockPosition="top" testId="desktop" />);

    expect(screen.getByTestId('desktop-dock')).toHaveClass('top-0');
  });

  it('applies modern theme by default', () => {
    render(<Desktop testId="desktop" />);

    expect(screen.getByTestId('desktop')).toHaveClass('theme-modern');
  });

  it('applies specified theme name', () => {
    render(<Desktop theme="fantasy" testId="desktop" />);

    expect(screen.getByTestId('desktop')).toHaveClass('theme-fantasy');
  });

  it('applies string background', () => {
    render(<Desktop background="#123456" testId="desktop" />);

    expect(screen.getByTestId('desktop')).toHaveStyle({ background: '#123456' });
  });

  it('renders ReactNode background', () => {
    render(
      <Desktop
        background={<div data-testid="custom-bg">Custom Background</div>}
        testId="desktop"
      />
    );

    expect(screen.getByTestId('custom-bg')).toBeInTheDocument();
    expect(screen.getByText('Custom Background')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Desktop className="custom-class" testId="desktop" />);

    expect(screen.getByTestId('desktop')).toHaveClass('custom-class');
  });

  it('has desktop-background class', () => {
    render(<Desktop testId="desktop" />);

    expect(screen.getByTestId('desktop')).toHaveClass('desktop-background');
  });

  it('is full width and height', () => {
    render(<Desktop testId="desktop" />);

    expect(screen.getByTestId('desktop')).toHaveClass('w-full', 'h-full');
  });

  it('converts icons to dock items correctly', () => {
    render(<Desktop icons={mockIcons} showDock testId="desktop" />);

    expect(screen.getByTestId('desktop-dock-item-settings')).toBeInTheDocument();
    expect(screen.getByTestId('desktop-dock-item-chat')).toBeInTheDocument();
  });

  it('renders children inside windows container', () => {
    render(
      <Desktop testId="desktop">
        <div data-testid="child1">Child 1</div>
        <div data-testid="child2">Child 2</div>
      </Desktop>
    );

    const windowsContainer = screen.getByTestId('desktop-windows');
    expect(windowsContainer).toContainElement(screen.getByTestId('child1'));
    expect(windowsContainer).toContainElement(screen.getByTestId('child2'));
  });
});
