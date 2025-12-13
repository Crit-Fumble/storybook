import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CampaignRoleSelector } from './CampaignRoleSelector';
import type { PlatformRole, CampaignEligibleRole } from '../types';

const meta: Meta<typeof CampaignRoleSelector> = {
  title: 'Shared/Roles/CampaignRoleSelector',
  component: CampaignRoleSelector,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['dropdown', 'inline', 'compact'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CampaignRoleSelector>;

// Demo wrapper for interactive stories
function SelectorDemo(props: Omit<React.ComponentProps<typeof CampaignRoleSelector>, 'onRoleChange'> & { initialRole?: CampaignEligibleRole | null }) {
  const { initialRole = null, selectedRole: _, ...rest } = props;
  const [role, setRole] = useState<CampaignEligibleRole | null>(initialRole);

  return (
    <div className="space-y-4">
      <CampaignRoleSelector
        {...rest}
        selectedRole={role}
        onRoleChange={setRole}
      />
      <div className="text-sm text-cfg-text-muted">
        Selected: {role ?? 'None'}
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <SelectorDemo
      ownedRoles={['player', 'game_master', 'spectator']}
      initialRole="player"
    />
  ),
};

export const Dropdown: Story = {
  render: () => (
    <div className="w-64">
      <SelectorDemo
        ownedRoles={['player', 'trusted_player', 'game_master', 'assistant_gm', 'spectator']}
        initialRole="player"
        variant="dropdown"
      />
    </div>
  ),
};

export const Inline: Story = {
  render: () => (
    <SelectorDemo
      ownedRoles={['player', 'game_master', 'spectator']}
      initialRole="player"
      variant="inline"
    />
  ),
};

export const Compact: Story = {
  render: () => (
    <SelectorDemo
      ownedRoles={['player', 'trusted_player', 'game_master']}
      initialRole="trusted_player"
      variant="compact"
    />
  ),
};

export const AllEligibleRoles: Story = {
  render: () => (
    <SelectorDemo
      ownedRoles={['game_master', 'assistant_gm', 'trusted_player', 'player', 'spectator']}
      initialRole="game_master"
      variant="inline"
    />
  ),
};

export const SingleRole: Story = {
  render: () => (
    <SelectorDemo
      ownedRoles={['player']}
      initialRole="player"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'When user has only one eligible role, just displays the badge (no selection needed).',
      },
    },
  },
};

export const NoEligibleRoles: Story = {
  render: () => (
    <SelectorDemo
      ownedRoles={['creator', 'developer', 'admin']}
      initialRole={null}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'User has platform roles but none are campaign-eligible (creator, developer, admin are not campaign roles).',
      },
    },
  },
};

export const MixedRoles: Story = {
  render: () => (
    <SelectorDemo
      ownedRoles={['admin', 'developer', 'game_master', 'player', 'creator']}
      initialRole="game_master"
      variant="inline"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'User has both campaign-eligible and non-eligible roles. Only eligible roles are shown.',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-cfg-text-muted mb-2">Dropdown:</p>
        <CampaignRoleSelector
          ownedRoles={['player', 'game_master']}
          selectedRole="player"
          onRoleChange={() => {}}
          disabled
          variant="dropdown"
        />
      </div>
      <div>
        <p className="text-cfg-text-muted mb-2">Inline:</p>
        <CampaignRoleSelector
          ownedRoles={['player', 'game_master']}
          selectedRole="game_master"
          onRoleChange={() => {}}
          disabled
          variant="inline"
        />
      </div>
      <div>
        <p className="text-cfg-text-muted mb-2">Compact:</p>
        <CampaignRoleSelector
          ownedRoles={['player', 'game_master']}
          selectedRole="player"
          onRoleChange={() => {}}
          disabled
          variant="compact"
        />
      </div>
    </div>
  ),
};

export const NoSelection: Story = {
  render: () => (
    <div className="w-64">
      <SelectorDemo
        ownedRoles={['player', 'game_master', 'spectator']}
        initialRole={null}
        variant="dropdown"
      />
    </div>
  ),
};

export const InCampaignCard: Story = {
  render: function CampaignCardDemo() {
    const [role, setRole] = useState<CampaignEligibleRole>('player');

    return (
      <div className="bg-cfg-background-secondary rounded-lg p-4 max-w-md border border-cfg-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-cfg-text-normal">Dragon's Lair Campaign</h3>
          <span className="text-xs text-cfg-text-muted">Session #12</span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm text-cfg-text-muted mb-1">
              Your role in this campaign:
            </label>
            <CampaignRoleSelector
              ownedRoles={['player', 'trusted_player', 'game_master']}
              selectedRole={role}
              onRoleChange={setRole}
              variant="inline"
            />
          </div>

          <p className="text-sm text-cfg-text-muted">
            {role === 'game_master' && 'You are running this campaign.'}
            {role === 'trusted_player' && 'You have advanced permissions in this campaign.'}
            {role === 'player' && 'You are participating as a player.'}
          </p>
        </div>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: function AllVariantsDemo() {
    const ownedRoles: PlatformRole[] = ['player', 'trusted_player', 'game_master', 'spectator'];
    const [dropdownRole, setDropdownRole] = useState<CampaignEligibleRole>('player');
    const [inlineRole, setInlineRole] = useState<CampaignEligibleRole>('game_master');
    const [compactRole, setCompactRole] = useState<CampaignEligibleRole>('trusted_player');

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-cfg-text-muted mb-2 font-medium">Dropdown Variant</h3>
          <div className="w-64">
            <CampaignRoleSelector
              ownedRoles={ownedRoles}
              selectedRole={dropdownRole}
              onRoleChange={setDropdownRole}
              variant="dropdown"
            />
          </div>
        </div>

        <div>
          <h3 className="text-cfg-text-muted mb-2 font-medium">Inline Variant</h3>
          <CampaignRoleSelector
            ownedRoles={ownedRoles}
            selectedRole={inlineRole}
            onRoleChange={setInlineRole}
            variant="inline"
          />
        </div>

        <div>
          <h3 className="text-cfg-text-muted mb-2 font-medium">Compact Variant</h3>
          <CampaignRoleSelector
            ownedRoles={ownedRoles}
            selectedRole={compactRole}
            onRoleChange={setCompactRole}
            variant="compact"
          />
        </div>
      </div>
    );
  },
};
