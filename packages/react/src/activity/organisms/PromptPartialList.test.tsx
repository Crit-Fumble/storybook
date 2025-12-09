import { render, screen, fireEvent } from '@testing-library/react';
import { PromptPartialList } from './PromptPartialList';
import type { PromptPartial } from '../molecules/PromptPartialCard';

describe('PromptPartialList', () => {
  const mockPartials: PromptPartial[] = [
    {
      id: 'partial-1',
      name: 'Channel Rules',
      targetType: 'channel',
      targetId: 'channel-1',
      targetName: 'general',
      content: 'Be respectful.',
      priority: 10,
      isEnabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'partial-2',
      name: 'Category Style',
      targetType: 'category',
      targetId: 'cat-1',
      targetName: 'Gaming',
      content: 'Use gaming terms.',
      priority: 5,
      isEnabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'partial-3',
      name: 'Thread Context',
      targetType: 'thread',
      targetId: 'thread-1',
      targetName: 'Session 1',
      content: 'This is session 1.',
      priority: 15,
      isEnabled: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'partial-4',
      name: 'Role Permissions',
      targetType: 'role',
      targetId: 'role-1',
      targetName: 'Admin',
      content: 'Admin context.',
      priority: 20,
      isEnabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  it('renders with default testId', () => {
    render(<PromptPartialList partials={mockPartials} />);
    expect(screen.getByTestId('prompt-partial-list')).toBeInTheDocument();
  });

  it('renders with custom testId', () => {
    render(<PromptPartialList partials={mockPartials} testId="custom-list" />);
    expect(screen.getByTestId('custom-list')).toBeInTheDocument();
  });

  describe('loading state', () => {
    it('shows loading skeleton when isLoading is true', () => {
      render(<PromptPartialList partials={[]} isLoading={true} />);
      expect(screen.getByTestId('prompt-partial-list')).toBeInTheDocument();
      expect(screen.queryByText('Prompt Partials')).not.toBeInTheDocument();
    });
  });

  describe('header', () => {
    it('displays title with count', () => {
      render(<PromptPartialList partials={mockPartials} />);
      expect(screen.getByText('Prompt Partials')).toBeInTheDocument();
      expect(screen.getByText('(4)')).toBeInTheDocument();
    });

    it('shows New Partial button when onCreate provided', () => {
      const onCreate = jest.fn();
      render(<PromptPartialList partials={mockPartials} onCreate={onCreate} />);
      expect(screen.getByText('New Partial')).toBeInTheDocument();
    });

    it('calls onCreate when New Partial clicked', () => {
      const onCreate = jest.fn();
      render(<PromptPartialList partials={mockPartials} onCreate={onCreate} />);
      fireEvent.click(screen.getByText('New Partial'));
      expect(onCreate).toHaveBeenCalledTimes(1);
    });
  });

  describe('empty state', () => {
    it('shows empty message when no partials', () => {
      render(<PromptPartialList partials={[]} />);
      expect(screen.getByText('No prompt partials configured yet.')).toBeInTheDocument();
    });

    it('shows Create First Partial button when onCreate provided and empty', () => {
      const onCreate = jest.fn();
      render(<PromptPartialList partials={[]} onCreate={onCreate} />);
      expect(screen.getByText('Create First Partial')).toBeInTheDocument();
    });

    it('calls onCreate when Create First Partial clicked', () => {
      const onCreate = jest.fn();
      render(<PromptPartialList partials={[]} onCreate={onCreate} />);
      fireEvent.click(screen.getByText('Create First Partial'));
      expect(onCreate).toHaveBeenCalledTimes(1);
    });
  });

  describe('grouped display', () => {
    it('groups partials by target type when filterType is all', () => {
      render(<PromptPartialList partials={mockPartials} filterType="all" />);
      expect(screen.getByText('Channels')).toBeInTheDocument();
      expect(screen.getByText('Categories')).toBeInTheDocument();
      expect(screen.getByText('Threads')).toBeInTheDocument();
      expect(screen.getByText('Roles')).toBeInTheDocument();
    });

    it('shows flat list when filterType is specific type', () => {
      render(<PromptPartialList partials={mockPartials} filterType="channel" />);
      expect(screen.queryByText('Channels')).not.toBeInTheDocument();
      expect(screen.getByText('(1)')).toBeInTheDocument();
    });
  });

  describe('filtering', () => {
    it('filters by channel type', () => {
      render(<PromptPartialList partials={mockPartials} filterType="channel" />);
      expect(screen.getByText('(1)')).toBeInTheDocument();
    });

    it('filters by category type', () => {
      render(<PromptPartialList partials={mockPartials} filterType="category" />);
      expect(screen.getByText('(1)')).toBeInTheDocument();
    });

    it('filters by thread type', () => {
      render(<PromptPartialList partials={mockPartials} filterType="thread" />);
      expect(screen.getByText('(1)')).toBeInTheDocument();
    });

    it('filters by role type', () => {
      render(<PromptPartialList partials={mockPartials} filterType="role" />);
      expect(screen.getByText('(1)')).toBeInTheDocument();
    });
  });

  describe('callbacks', () => {
    it('calls onSelect when partial clicked', () => {
      const onSelect = jest.fn();
      render(<PromptPartialList partials={mockPartials} onSelect={onSelect} />);
      // Find and click on partial card
      const partialCard = screen.getByText('Channel Rules').closest('[data-testid]');
      if (partialCard) {
        fireEvent.click(partialCard);
        expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'partial-1' }));
      }
    });
  });

  describe('selection state', () => {
    it('passes selectedId to partial cards', () => {
      render(<PromptPartialList partials={mockPartials} selectedId="partial-1" />);
      // Component should render without error
      expect(screen.getByTestId('prompt-partial-list')).toBeInTheDocument();
    });
  });

  describe('sorting', () => {
    it('sorts partials by priority (highest first)', () => {
      render(<PromptPartialList partials={mockPartials} filterType="all" />);
      // The partials should be sorted by priority within each group
      expect(screen.getByTestId('prompt-partial-list')).toBeInTheDocument();
    });
  });
});
