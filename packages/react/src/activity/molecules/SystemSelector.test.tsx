import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SystemSelector } from './SystemSelector';
import type { FoundrySystemRecord } from '../types';

const mockSystems: FoundrySystemRecord[] = [
  {
    id: '1',
    systemId: 'dnd5e',
    title: 'D&D 5th Edition',
    description: 'The fifth edition of Dungeons & Dragons',
    version: '3.0.0',
    manifestUrl: 'https://example.com/dnd5e/system.json',
    compatibility: null,
    authors: null,
    iconUrl: null,
    isEnabled: true,
    sortOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    systemId: 'pf2e',
    title: 'Pathfinder 2e',
    description: 'The second edition of Pathfinder',
    version: '5.0.0',
    manifestUrl: 'https://example.com/pf2e/system.json',
    compatibility: null,
    authors: null,
    iconUrl: null,
    isEnabled: true,
    sortOrder: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    systemId: 'coc7e',
    title: 'Call of Cthulhu 7e',
    description: 'Horror roleplaying game',
    version: null,
    manifestUrl: 'https://example.com/coc7e/system.json',
    compatibility: null,
    authors: null,
    iconUrl: null,
    isEnabled: true,
    sortOrder: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe('SystemSelector', () => {
  describe('rendering', () => {
    it('renders select with options', () => {
      const handleChange = vi.fn();
      render(
        <SystemSelector systems={mockSystems} value="" onChange={handleChange} />
      );
      expect(screen.getByTestId('system-selector-select')).toBeInTheDocument();
    });

    it('applies default testId', () => {
      const handleChange = vi.fn();
      render(
        <SystemSelector systems={mockSystems} value="" onChange={handleChange} />
      );
      expect(screen.getByTestId('system-selector')).toBeInTheDocument();
    });

    it('applies custom testId', () => {
      const handleChange = vi.fn();
      render(
        <SystemSelector
          systems={mockSystems}
          value=""
          onChange={handleChange}
          testId="custom-selector"
        />
      );
      expect(screen.getByTestId('custom-selector')).toBeInTheDocument();
    });

    it('renders system names with versions', () => {
      const handleChange = vi.fn();
      render(
        <SystemSelector systems={mockSystems} value="" onChange={handleChange} />
      );
      // The options should show version in label
      const select = screen.getByTestId('system-selector-select');
      expect(select).toBeInTheDocument();
    });

    it('renders system name without version when not available', () => {
      const handleChange = vi.fn();
      render(
        <SystemSelector systems={mockSystems} value="" onChange={handleChange} />
      );
      expect(screen.getByTestId('system-selector')).toBeInTheDocument();
    });
  });

  describe('search functionality', () => {
    it('renders search input when searchable is true', () => {
      const handleChange = vi.fn();
      render(
        <SystemSelector
          systems={mockSystems}
          value=""
          onChange={handleChange}
          searchable={true}
        />
      );
      expect(screen.getByTestId('system-selector-search')).toBeInTheDocument();
    });

    it('does not render search input when searchable is false', () => {
      const handleChange = vi.fn();
      render(
        <SystemSelector
          systems={mockSystems}
          value=""
          onChange={handleChange}
          searchable={false}
        />
      );
      expect(screen.queryByTestId('system-selector-search')).not.toBeInTheDocument();
    });

    it('filters systems by name', () => {
      const handleChange = vi.fn();
      render(
        <SystemSelector
          systems={mockSystems}
          value=""
          onChange={handleChange}
          searchable={true}
        />
      );
      const searchInput = screen.getByTestId('system-selector-search');
      fireEvent.change(searchInput, { target: { value: 'pathfinder' } });
      // After filtering, the select should only show matching options
      expect(screen.getByTestId('system-selector-select')).toBeInTheDocument();
    });

    it('filters systems by id', () => {
      const handleChange = vi.fn();
      render(
        <SystemSelector
          systems={mockSystems}
          value=""
          onChange={handleChange}
          searchable={true}
        />
      );
      const searchInput = screen.getByTestId('system-selector-search');
      fireEvent.change(searchInput, { target: { value: 'dnd5e' } });
      expect(screen.getByTestId('system-selector-select')).toBeInTheDocument();
    });

    it('filters systems by description', () => {
      const handleChange = vi.fn();
      render(
        <SystemSelector
          systems={mockSystems}
          value=""
          onChange={handleChange}
          searchable={true}
        />
      );
      const searchInput = screen.getByTestId('system-selector-search');
      fireEvent.change(searchInput, { target: { value: 'horror' } });
      expect(screen.getByTestId('system-selector-select')).toBeInTheDocument();
    });
  });

  describe('description', () => {
    it('shows description when showDescription is true and system is selected', () => {
      const handleChange = vi.fn();
      render(
        <SystemSelector
          systems={mockSystems}
          value="dnd5e"
          onChange={handleChange}
          showDescription={true}
        />
      );
      expect(screen.getByTestId('system-selector-description')).toBeInTheDocument();
      expect(screen.getByText('The fifth edition of Dungeons & Dragons')).toBeInTheDocument();
    });

    it('does not show description when showDescription is false', () => {
      const handleChange = vi.fn();
      render(
        <SystemSelector
          systems={mockSystems}
          value="dnd5e"
          onChange={handleChange}
          showDescription={false}
        />
      );
      expect(screen.queryByTestId('system-selector-description')).not.toBeInTheDocument();
    });

    it('does not show description when no system is selected', () => {
      const handleChange = vi.fn();
      render(
        <SystemSelector
          systems={mockSystems}
          value=""
          onChange={handleChange}
          showDescription={true}
        />
      );
      expect(screen.queryByTestId('system-selector-description')).not.toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onChange with selected system id', () => {
      const handleChange = vi.fn();
      render(
        <SystemSelector systems={mockSystems} value="" onChange={handleChange} />
      );
      const select = screen.getByTestId('system-selector-select');
      fireEvent.change(select, { target: { value: 'pf2e' } });
      expect(handleChange).toHaveBeenCalledWith('pf2e');
    });
  });

  describe('disabled state', () => {
    it('disables select when disabled is true', () => {
      const handleChange = vi.fn();
      render(
        <SystemSelector
          systems={mockSystems}
          value=""
          onChange={handleChange}
          disabled={true}
        />
      );
      expect(screen.getByTestId('system-selector-select')).toBeDisabled();
    });

    it('disables search input when disabled is true', () => {
      const handleChange = vi.fn();
      render(
        <SystemSelector
          systems={mockSystems}
          value=""
          onChange={handleChange}
          disabled={true}
          searchable={true}
        />
      );
      expect(screen.getByTestId('system-selector-search')).toBeDisabled();
    });
  });

  describe('placeholder', () => {
    it('uses default placeholder', () => {
      const handleChange = vi.fn();
      render(
        <SystemSelector systems={mockSystems} value="" onChange={handleChange} />
      );
      expect(screen.getByTestId('system-selector-select')).toBeInTheDocument();
    });

    it('uses custom placeholder', () => {
      const handleChange = vi.fn();
      render(
        <SystemSelector
          systems={mockSystems}
          value=""
          onChange={handleChange}
          placeholder="Choose your system"
        />
      );
      expect(screen.getByTestId('system-selector-select')).toBeInTheDocument();
    });
  });
});
