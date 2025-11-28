import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GuildSelector } from './GuildSelector';

describe('GuildSelector', () => {
  const mockGuilds = [
    { id: '1', name: 'Guild One' },
    { id: '2', name: 'Guild Two' },
    { id: '3', name: 'Guild Three', icon: 'icon-url' },
  ];

  describe('rendering', () => {
    it('renders the selector', () => {
      render(
        <GuildSelector
          guilds={mockGuilds}
          selectedGuildId={null}
          onChange={() => {}}
        />
      );
      expect(screen.getByTestId('guild-selector')).toBeInTheDocument();
    });

    it('applies custom testId', () => {
      render(
        <GuildSelector
          guilds={mockGuilds}
          selectedGuildId={null}
          onChange={() => {}}
          testId="custom-selector"
        />
      );
      expect(screen.getByTestId('custom-selector')).toBeInTheDocument();
    });

    it('renders label', () => {
      render(
        <GuildSelector
          guilds={mockGuilds}
          selectedGuildId={null}
          onChange={() => {}}
        />
      );
      expect(screen.getByTestId('guild-selector-label')).toHaveTextContent('Select Server');
    });

    it('renders select element', () => {
      render(
        <GuildSelector
          guilds={mockGuilds}
          selectedGuildId={null}
          onChange={() => {}}
        />
      );
      expect(screen.getByTestId('guild-selector-select')).toBeInTheDocument();
    });

    it('renders all guild options', () => {
      render(
        <GuildSelector
          guilds={mockGuilds}
          selectedGuildId={null}
          onChange={() => {}}
        />
      );
      expect(screen.getByText('Guild One')).toBeInTheDocument();
      expect(screen.getByText('Guild Two')).toBeInTheDocument();
      expect(screen.getByText('Guild Three')).toBeInTheDocument();
    });

    it('renders placeholder option', () => {
      render(
        <GuildSelector
          guilds={mockGuilds}
          selectedGuildId={null}
          onChange={() => {}}
        />
      );
      expect(screen.getByText('-- Choose a server --')).toBeInTheDocument();
    });
  });

  describe('controlled value', () => {
    it('selects correct guild when selectedGuildId is provided', () => {
      render(
        <GuildSelector
          guilds={mockGuilds}
          selectedGuildId="2"
          onChange={() => {}}
        />
      );
      expect(screen.getByTestId('guild-selector-select')).toHaveValue('2');
    });

    it('shows empty value when selectedGuildId is null', () => {
      render(
        <GuildSelector
          guilds={mockGuilds}
          selectedGuildId={null}
          onChange={() => {}}
        />
      );
      expect(screen.getByTestId('guild-selector-select')).toHaveValue('');
    });
  });

  describe('interactions', () => {
    it('calls onChange with guild id when selection changes', () => {
      const handleChange = vi.fn();
      render(
        <GuildSelector
          guilds={mockGuilds}
          selectedGuildId={null}
          onChange={handleChange}
        />
      );

      fireEvent.change(screen.getByTestId('guild-selector-select'), {
        target: { value: '2' },
      });
      expect(handleChange).toHaveBeenCalledWith('2');
    });

    it('calls onChange with different guild id', () => {
      const handleChange = vi.fn();
      render(
        <GuildSelector
          guilds={mockGuilds}
          selectedGuildId="1"
          onChange={handleChange}
        />
      );

      fireEvent.change(screen.getByTestId('guild-selector-select'), {
        target: { value: '3' },
      });
      expect(handleChange).toHaveBeenCalledWith('3');
    });
  });

  describe('empty guilds', () => {
    it('renders select with only placeholder when guilds array is empty', () => {
      render(
        <GuildSelector
          guilds={[]}
          selectedGuildId={null}
          onChange={() => {}}
        />
      );
      const select = screen.getByTestId('guild-selector-select');
      const options = select.querySelectorAll('option');
      // Only the placeholder option from Select component should be present
      expect(options).toHaveLength(1);
      expect(options[0]).toHaveTextContent('-- Choose a server --');
    });
  });
});
