import type { Meta, StoryObj } from '@storybook/react';
import { ManifestInfo, type FoundryManifestInfo } from './ManifestInfo';

const meta: Meta<typeof ManifestInfo> = {
  title: 'Activity/Molecules/ManifestInfo',
  component: ManifestInfo,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-4 bg-discord-background-secondary rounded-lg w-[500px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ManifestInfo>;

const fullManifest: FoundryManifestInfo = {
  id: 'dnd5e',
  title: 'D&D 5th Edition',
  description:
    'The official system implementation for Dungeons & Dragons 5th Edition in Foundry Virtual Tabletop. Includes character sheets, item management, and full rules automation.',
  version: '3.0.0',
  compatibility: {
    minimum: '11',
    verified: '11.315',
    maximum: '12',
  },
  authors: [
    {
      name: 'Atropos',
      url: 'https://foundryvtt.com',
    },
    {
      name: 'Kim',
      url: 'https://github.com/kmoschcau',
    },
  ],
  url: 'https://github.com/foundryvtt/dnd5e',
  license: 'MIT',
};

const minimalManifest: FoundryManifestInfo = {
  id: 'homebrew-system',
  title: 'Homebrew System',
};

const moduleManifest: FoundryManifestInfo = {
  id: 'dice-so-nice',
  title: 'Dice So Nice!',
  description: '3D dice rolling animation for Foundry VTT.',
  version: '4.6.0',
  compatibility: {
    minimum: '10',
    verified: '11',
  },
  authors: [
    {
      name: 'Simone',
      url: 'https://gitlab.com/riccisi',
    },
  ],
  license: 'MIT',
};

export const FullManifest: Story = {
  args: {
    manifest: fullManifest,
  },
};

export const MinimalManifest: Story = {
  args: {
    manifest: minimalManifest,
  },
};

export const ModuleManifest: Story = {
  args: {
    manifest: moduleManifest,
  },
};

export const Compact: Story = {
  args: {
    manifest: fullManifest,
    compact: true,
  },
};

export const HideCompatibility: Story = {
  args: {
    manifest: fullManifest,
    showCompatibility: false,
  },
};

export const HideAuthors: Story = {
  args: {
    manifest: fullManifest,
    showAuthors: false,
  },
};

export const OnlyHeader: Story = {
  args: {
    manifest: fullManifest,
    compact: true,
    showCompatibility: false,
    showAuthors: false,
  },
};

export const ManifestList: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="p-4 bg-discord-background-secondary rounded-lg">
        <ManifestInfo manifest={fullManifest} compact />
      </div>
      <div className="p-4 bg-discord-background-secondary rounded-lg">
        <ManifestInfo manifest={moduleManifest} compact />
      </div>
      <div className="p-4 bg-discord-background-secondary rounded-lg">
        <ManifestInfo manifest={minimalManifest} compact />
      </div>
    </div>
  ),
};
