import { render, screen, fireEvent } from '@testing-library/react';
import { Dock } from './Dock';
import { RpgIcon } from '../../atoms/RpgIcon';

describe('Dock', () => {
  const mockItems = [
    {
      id: 'item1',
      icon: <RpgIcon icon="gear" />,
      label: 'Settings',
      onClick: jest.fn(),
    },
    {
      id: 'item2',
      icon: <RpgIcon icon="scroll-unfurled" />,
      label: 'Chat',
      onClick: jest.fn(),
      badge: 5,
    },
    {
      id: 'item3',
      icon: <RpgIcon icon="d20" />,
      label: 'Games',
      onClick: jest.fn(),
    },
  ];

  beforeEach(() => {
    mockItems.forEach((item) => (item.onClick as jest.Mock).mockClear());
  });

  it('renders all dock items', () => {
    render(<Dock items={mockItems} testId="dock" />);

    expect(screen.getByTestId('dock-item-item1')).toBeInTheDocument();
    expect(screen.getByTestId('dock-item-item2')).toBeInTheDocument();
    expect(screen.getByTestId('dock-item-item3')).toBeInTheDocument();
  });

  it('renders with bottom position by default', () => {
    render(<Dock items={mockItems} testId="dock" />);

    expect(screen.getByTestId('dock')).toHaveClass('bottom-0', 'left-0', 'right-0', 'flex-row');
  });

  it('renders with top position', () => {
    render(<Dock items={mockItems} position="top" testId="dock" />);

    expect(screen.getByTestId('dock')).toHaveClass('top-0', 'left-0', 'right-0', 'flex-row');
  });

  it('renders with left position', () => {
    render(<Dock items={mockItems} position="left" testId="dock" />);

    expect(screen.getByTestId('dock')).toHaveClass('left-0', 'top-0', 'bottom-0', 'flex-col');
  });

  it('renders with right position', () => {
    render(<Dock items={mockItems} position="right" testId="dock" />);

    expect(screen.getByTestId('dock')).toHaveClass('right-0', 'top-0', 'bottom-0', 'flex-col');
  });

  it('renders with small size', () => {
    render(<Dock items={mockItems} size="sm" testId="dock" />);

    expect(screen.getByTestId('dock')).toHaveClass('p-1');
  });

  it('renders with medium size by default', () => {
    render(<Dock items={mockItems} testId="dock" />);

    expect(screen.getByTestId('dock')).toHaveClass('p-2');
  });

  it('renders with large size', () => {
    render(<Dock items={mockItems} size="lg" testId="dock" />);

    expect(screen.getByTestId('dock')).toHaveClass('p-3');
  });

  it('marks active item correctly', () => {
    render(<Dock items={mockItems} activeItemId="item2" testId="dock" />);

    const activeItem = screen.getByTestId('dock-item-item2');
    expect(activeItem).toHaveClass('desktop-dock-item-active');
  });

  it('calls onClick when item is clicked', () => {
    render(<Dock items={mockItems} testId="dock" />);

    fireEvent.click(screen.getByTestId('dock-item-item1'));
    expect(mockItems[0].onClick).toHaveBeenCalledTimes(1);
  });

  it('renders badges on items', () => {
    render(<Dock items={mockItems} testId="dock" />);

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders empty dock with no items', () => {
    render(<Dock items={[]} testId="dock" />);

    const dock = screen.getByTestId('dock');
    expect(dock).toBeInTheDocument();
    expect(dock.children).toHaveLength(0);
  });

  it('applies custom className', () => {
    render(<Dock items={mockItems} className="custom-class" testId="dock" />);

    expect(screen.getByTestId('dock')).toHaveClass('custom-class');
  });

  it('has desktop-dock class', () => {
    render(<Dock items={mockItems} testId="dock" />);

    expect(screen.getByTestId('dock')).toHaveClass('desktop-dock');
  });

  it('is positioned absolutely', () => {
    render(<Dock items={mockItems} testId="dock" />);

    expect(screen.getByTestId('dock')).toHaveClass('absolute');
  });

  it('renders item labels correctly', () => {
    render(<Dock items={mockItems} testId="dock" />);

    // Labels are in title attributes, not visible text
    expect(screen.getByTestId('dock-item-item1')).toHaveAttribute('title', 'Settings');
    expect(screen.getByTestId('dock-item-item2')).toHaveAttribute('title', 'Chat');
    expect(screen.getByTestId('dock-item-item3')).toHaveAttribute('title', 'Games');
  });
});
