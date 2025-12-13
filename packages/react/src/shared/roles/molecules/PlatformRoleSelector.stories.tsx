import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PlatformRoleSelector } from './PlatformRoleSelector';
import type { PlatformRole } from '../types';

const meta: Meta<typeof PlatformRoleSelector> = {
  title: 'Shared/Roles/PlatformRoleSelector',
  component: PlatformRoleSelector,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PlatformRoleSelector>;

// Wrapper for interactive stories
function SelectorDemo(props: Omit<React.ComponentProps<typeof PlatformRoleSelector>, 'selectedRoles' | 'onChange'> & { initialRoles?: PlatformRole[] }) {
  const { initialRoles = [], ...rest } = props;
  const [selectedRoles, setSelectedRoles] = useState<PlatformRole[]>(initialRoles);
  return (
    <div className="space-y-4">
      <div className="text-cfg-text-muted text-sm">
        Selected: {selectedRoles.length > 0 ? selectedRoles.join(', ') : 'None'}
      </div>
      <PlatformRoleSelector
        {...rest}
        selectedRoles={selectedRoles}
        onChange={setSelectedRoles}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <SelectorDemo />,
};

export const WithPreselected: Story = {
  render: () => <SelectorDemo initialRoles={['player', 'game_master']} />,
};

export const Compact: Story = {
  render: () => <SelectorDemo compact />,
};

export const SingleColumn: Story = {
  render: () => <SelectorDemo columns={1} />,
};

export const TwoColumns: Story = {
  render: () => <SelectorDemo columns={2} />,
};

export const Disabled: Story = {
  render: () => <SelectorDemo disabled initialRoles={['player']} />,
};

export const LimitedSelection: Story = {
  render: () => <SelectorDemo maxSelections={3} />,
  parameters: {
    docs: {
      description: {
        story: 'Limits the number of roles that can be selected. Once the max is reached, unselected roles become disabled.',
      },
    },
  },
};

export const LimitedSelectionWithPreselected: Story = {
  render: () => <SelectorDemo maxSelections={2} initialRoles={['player', 'creator']} />,
};

export const FilteredRoles: Story = {
  render: () => (
    <SelectorDemo
      availableRoles={['player', 'trusted_player', 'game_master', 'assistant_gm', 'spectator']}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shows only TTRPG-related roles by filtering with availableRoles prop.',
      },
    },
  },
};

export const CreatorRoles: Story = {
  render: () => (
    <SelectorDemo
      availableRoles={['storyteller', 'worldbuilder', 'creator', 'developer']}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shows only content creation related roles.',
      },
    },
  },
};

export const CompactWithLimit: Story = {
  render: () => <SelectorDemo compact maxSelections={5} columns={4} />,
};

export const EmptyAvailableRoles: Story = {
  render: () => <SelectorDemo availableRoles={[]} />,
  parameters: {
    docs: {
      description: {
        story: 'Shows empty state when no roles are available.',
      },
    },
  },
};

export const AdminOnlyRoles: Story = {
  render: () => (
    <SelectorDemo
      availableRoles={['admin', 'developer']}
      compact
      columns={2}
    />
  ),
};

export const FullExample: Story = {
  render: function FullExampleStory() {
    const [roles, setRoles] = useState<PlatformRole[]>(['player']);

    return (
      <div className="max-w-3xl space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-cfg-text-normal">Assign Platform Roles</h3>
          <p className="text-sm text-cfg-text-muted">
            Select up to 3 roles for this user. Roles determine what features and permissions the user has across the platform.
          </p>
        </div>

        <PlatformRoleSelector
          selectedRoles={roles}
          onChange={setRoles}
          maxSelections={3}
        />

        <div className="pt-4 border-t border-cfg-border">
          <button
            type="button"
            className="px-4 py-2 bg-cfg-primary text-white rounded hover:bg-cfg-primary-hover transition-colors disabled:opacity-50"
            disabled={roles.length === 0}
          >
            Save Roles ({roles.length} selected)
          </button>
        </div>
      </div>
    );
  },
};
