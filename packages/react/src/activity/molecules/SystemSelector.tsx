import { useState, useMemo } from 'react';
import { Select, Input, type SelectOption } from '../../shared/atoms';
import type { FoundrySystemRecord } from '../types';

export interface SystemSelectorProps {
  systems: FoundrySystemRecord[];
  value: string;
  onChange: (systemId: string) => void;
  placeholder?: string;
  searchable?: boolean;
  showDescription?: boolean;
  disabled?: boolean;
  testId?: string;
}

export function SystemSelector({
  systems,
  value,
  onChange,
  placeholder = 'Select a game system...',
  searchable = true,
  showDescription = false,
  disabled = false,
  testId = 'system-selector',
}: SystemSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSystems = useMemo(() => {
    if (!searchQuery.trim()) return systems;
    const query = searchQuery.toLowerCase();
    return systems.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.systemId.toLowerCase().includes(query) ||
        (s.description?.toLowerCase().includes(query) ?? false)
    );
  }, [systems, searchQuery]);

  const options: SelectOption[] = filteredSystems.map((s) => ({
    value: s.systemId,
    label: s.version ? `${s.title} (v${s.version})` : s.title,
  }));

  const selectedSystem = systems.find((s) => s.systemId === value);

  return (
    <div data-testid={testId}>
      {searchable && (
        <div className="mb-2">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search systems..."
            disabled={disabled}
            testId={`${testId}-search`}
          />
        </div>
      )}
      <Select
        options={options}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        testId={`${testId}-select`}
      />
      {showDescription && selectedSystem && (
        <p
          className="mt-2 text-sm text-discord-text-muted"
          data-testid={`${testId}-description`}
        >
          {selectedSystem.description}
        </p>
      )}
    </div>
  );
}
