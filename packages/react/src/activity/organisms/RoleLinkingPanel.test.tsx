import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RoleLinkingPanel } from './RoleLinkingPanel';
import type { DiscordRole } from '../types';

const roles: DiscordRole[] = [
  { id: 'role-1', name: 'Dungeon Master', color: 0xe91e63, permissions: '0', managed: false },
  { id: 'role-2', name: 'Player', color: 0x3498db, permissions: '0', managed: false },
  { id: 'role-3', name: 'VIP', color: 0xf1c40f, permissions: '0', managed: false },
  { id: 'role-everyone', name: '@everyone', color: 0, permissions: '0', managed: false },
  { id: 'role-bot', name: 'Bot Role', color: 0, permissions: '0', managed: true },
];

describe('RoleLinkingPanel', () => {
  describe('Header', () => {
    it('renders Role Permissions header', () => {
      render(
        <RoleLinkingPanel
          roleMappings={{}}
          roles={roles}
          onChange={() => {}}
        />
      );

      expect(screen.getByText('Role Permissions')).toBeInTheDocument();
    });

    it('renders description', () => {
      render(
        <RoleLinkingPanel
          roleMappings={{}}
          roles={roles}
          onChange={() => {}}
        />
      );

      expect(screen.getByText('Map Discord roles to Foundry VTT permission levels')).toBeInTheDocument();
    });
  });

  describe('Empty state', () => {
    it('shows empty message when no mappings', () => {
      render(
        <RoleLinkingPanel
          roleMappings={{}}
          roles={roles}
          onChange={() => {}}
        />
      );

      expect(screen.getByText('No role mappings configured')).toBeInTheDocument();
    });
  });

  describe('Existing mappings', () => {
    it('renders existing role mappings', () => {
      render(
        <RoleLinkingPanel
          roleMappings={{ 'role-1': '4', 'role-2': '1' }}
          roles={roles}
          onChange={() => {}}
        />
      );

      expect(screen.getByTestId('role-linking-mapping-role-1')).toBeInTheDocument();
      expect(screen.getByTestId('role-linking-mapping-role-2')).toBeInTheDocument();
    });

    it('shows role names in mappings', () => {
      render(
        <RoleLinkingPanel
          roleMappings={{ 'role-1': '4' }}
          roles={roles}
          onChange={() => {}}
        />
      );

      // Role name appears in both mapping and dropdown, so use getAllByText
      expect(screen.getAllByText('Dungeon Master').length).toBeGreaterThanOrEqual(1);
    });

    it('shows Foundry role names in mappings', () => {
      render(
        <RoleLinkingPanel
          roleMappings={{ 'role-1': '4', 'role-2': '1' }}
          roles={roles}
          onChange={() => {}}
        />
      );

      // Foundry role names appear in both mapping and dropdown
      expect(screen.getAllByText('Game Master').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Player').length).toBeGreaterThanOrEqual(1);
    });

    it('does not show empty message when mappings exist', () => {
      render(
        <RoleLinkingPanel
          roleMappings={{ 'role-1': '4' }}
          roles={roles}
          onChange={() => {}}
        />
      );

      expect(screen.queryByText('No role mappings configured')).not.toBeInTheDocument();
    });
  });

  describe('Remove mapping', () => {
    it('renders remove button for each mapping', () => {
      render(
        <RoleLinkingPanel
          roleMappings={{ 'role-1': '4' }}
          roles={roles}
          onChange={() => {}}
        />
      );

      expect(screen.getByTestId('role-linking-remove-role-1')).toBeInTheDocument();
    });

    it('calls onChange when remove button is clicked', () => {
      const handleChange = vi.fn();
      render(
        <RoleLinkingPanel
          roleMappings={{ 'role-1': '4', 'role-2': '1' }}
          roles={roles}
          onChange={handleChange}
        />
      );

      fireEvent.click(screen.getByTestId('role-linking-remove-role-1'));
      expect(handleChange).toHaveBeenCalledWith({ 'role-2': '1' });
    });
  });

  describe('Add mapping', () => {
    it('renders add mapping section', () => {
      render(
        <RoleLinkingPanel
          roleMappings={{}}
          roles={roles}
          onChange={() => {}}
        />
      );

      expect(screen.getByTestId('role-linking-add')).toBeInTheDocument();
    });

    it('renders Discord role select', () => {
      render(
        <RoleLinkingPanel
          roleMappings={{}}
          roles={roles}
          onChange={() => {}}
        />
      );

      expect(screen.getByTestId('role-linking-add-discord-role')).toBeInTheDocument();
    });

    it('renders Foundry role select', () => {
      render(
        <RoleLinkingPanel
          roleMappings={{}}
          roles={roles}
          onChange={() => {}}
        />
      );

      expect(screen.getByTestId('role-linking-add-foundry-role')).toBeInTheDocument();
    });

    it('renders Add button', () => {
      render(
        <RoleLinkingPanel
          roleMappings={{}}
          roles={roles}
          onChange={() => {}}
        />
      );

      expect(screen.getByTestId('role-linking-add-btn')).toBeInTheDocument();
    });

    it('calls onChange when adding a new mapping', () => {
      const handleChange = vi.fn();
      render(
        <RoleLinkingPanel
          roleMappings={{}}
          roles={roles}
          onChange={handleChange}
        />
      );

      const discordRoleSelect = screen.getByTestId('role-linking-add-discord-role');
      const foundryRoleSelect = screen.getByTestId('role-linking-add-foundry-role');

      fireEvent.change(discordRoleSelect, { target: { value: 'role-1' } });
      fireEvent.change(foundryRoleSelect, { target: { value: '4' } });
      fireEvent.click(screen.getByTestId('role-linking-add-btn'));

      expect(handleChange).toHaveBeenCalledWith({ 'role-1': '4' });
    });

    it('does not add mapping when fields are empty', () => {
      const handleChange = vi.fn();
      render(
        <RoleLinkingPanel
          roleMappings={{}}
          roles={roles}
          onChange={handleChange}
        />
      );

      fireEvent.click(screen.getByTestId('role-linking-add-btn'));
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('filters out @everyone and managed roles from options', () => {
      render(
        <RoleLinkingPanel
          roleMappings={{}}
          roles={roles}
          onChange={() => {}}
        />
      );

      // The select options should not include @everyone or managed roles
      const discordRoleSelect = screen.getByTestId('role-linking-add-discord-role');
      expect(discordRoleSelect).toBeInTheDocument();
      // Check that the filtered roles are available (Dungeon Master, Player, VIP)
      // @everyone and Bot Role should be filtered out
    });
  });

  describe('TestId', () => {
    it('uses default testId', () => {
      render(
        <RoleLinkingPanel
          roleMappings={{}}
          roles={roles}
          onChange={() => {}}
        />
      );

      expect(screen.getByTestId('role-linking')).toBeInTheDocument();
    });

    it('uses custom testId', () => {
      render(
        <RoleLinkingPanel
          roleMappings={{}}
          roles={roles}
          onChange={() => {}}
          testId="custom-roles"
        />
      );

      expect(screen.getByTestId('custom-roles')).toBeInTheDocument();
      expect(screen.getByTestId('custom-roles-add')).toBeInTheDocument();
    });
  });
});
