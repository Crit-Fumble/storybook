
import { render, screen, fireEvent } from '@testing-library/react';
import { TabNav } from './TabNav';

describe('TabNav', () => {
  const defaultTabs = [
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3' },
  ];

  describe('rendering', () => {
    it('renders all tabs', () => {
      render(<TabNav tabs={defaultTabs} activeTab="tab1" onChange={() => {}} />);
      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
      expect(screen.getByText('Tab 3')).toBeInTheDocument();
    });

    it('applies testId to container', () => {
      render(<TabNav tabs={defaultTabs} activeTab="tab1" onChange={() => {}} testId="nav" />);
      expect(screen.getByTestId('nav')).toBeInTheDocument();
    });

    it('applies testId to individual tabs', () => {
      render(<TabNav tabs={defaultTabs} activeTab="tab1" onChange={() => {}} testId="nav" />);
      expect(screen.getByTestId('nav-tab1')).toBeInTheDocument();
      expect(screen.getByTestId('nav-tab2')).toBeInTheDocument();
      expect(screen.getByTestId('nav-tab3')).toBeInTheDocument();
    });

    it('renders tabs with icons', () => {
      const tabsWithIcons = [
        { id: 'tab1', label: 'Tab 1', icon: '🏠' },
        { id: 'tab2', label: 'Tab 2', icon: '⚙️' },
      ];
      render(<TabNav tabs={tabsWithIcons} activeTab="tab1" onChange={() => {}} />);
      expect(screen.getByText('🏠')).toBeInTheDocument();
      expect(screen.getByText('⚙️')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has tablist role', () => {
      render(<TabNav tabs={defaultTabs} activeTab="tab1" onChange={() => {}} />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('applies tab role to each button', () => {
      render(<TabNav tabs={defaultTabs} activeTab="tab1" onChange={() => {}} />);
      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(3);
    });

    it('marks active tab with aria-selected true', () => {
      render(<TabNav tabs={defaultTabs} activeTab="tab2" onChange={() => {}} />);
      const tabs = screen.getAllByRole('tab');
      expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
      expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
      expect(tabs[2]).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('interactions', () => {
    it('calls onChange when tab is clicked', () => {
      const handleChange = jest.fn();
      render(<TabNav tabs={defaultTabs} activeTab="tab1" onChange={handleChange} />);

      fireEvent.click(screen.getByText('Tab 2'));
      expect(handleChange).toHaveBeenCalledWith('tab2');
    });

    it('calls onChange with correct tab id', () => {
      const handleChange = jest.fn();
      render(<TabNav tabs={defaultTabs} activeTab="tab1" onChange={handleChange} />);

      fireEvent.click(screen.getByText('Tab 3'));
      expect(handleChange).toHaveBeenCalledWith('tab3');
    });
  });

  describe('variants', () => {
    it('applies default variant styling', () => {
      render(<TabNav tabs={defaultTabs} activeTab="tab1" onChange={() => {}} testId="nav" />);
      const container = screen.getByTestId('nav');
      expect(container).toHaveClass('flex', 'gap-1');
    });

    it('applies pills variant styling', () => {
      render(
        <TabNav tabs={defaultTabs} activeTab="tab1" onChange={() => {}} variant="pills" testId="nav" />
      );
      const container = screen.getByTestId('nav');
      expect(container).toHaveClass('p-1', 'bg-cfg-background-tertiary', 'rounded-lg');
    });

    it('applies active styling to active tab in default variant', () => {
      render(<TabNav tabs={defaultTabs} activeTab="tab1" onChange={() => {}} testId="nav" />);
      const activeTab = screen.getByTestId('nav-tab1');
      expect(activeTab).toHaveClass('border-cfg-primary', 'text-cfg-text-normal');
    });

    it('applies inactive styling to inactive tab in default variant', () => {
      render(<TabNav tabs={defaultTabs} activeTab="tab1" onChange={() => {}} testId="nav" />);
      const inactiveTab = screen.getByTestId('nav-tab2');
      expect(inactiveTab).toHaveClass('border-transparent', 'text-cfg-text-muted');
    });

    it('applies active styling in pills variant', () => {
      render(
        <TabNav tabs={defaultTabs} activeTab="tab1" onChange={() => {}} variant="pills" testId="nav" />
      );
      const activeTab = screen.getByTestId('nav-tab1');
      expect(activeTab).toHaveClass('bg-cfg-primary', 'text-white');
    });
  });
});
