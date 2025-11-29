import type { Meta, StoryObj } from '@storybook/react';
import { ScenePreview, type FoundrySceneInfo } from './ScenePreview';

const meta: Meta<typeof ScenePreview> = {
  title: 'Activity/Molecules/ScenePreview',
  component: ScenePreview,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-4 bg-discord-background-primary">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ScenePreview>;

const activeScene: FoundrySceneInfo = {
  id: 'scene-1',
  name: 'Dragon\'s Lair',
  active: true,
  background: 'https://picsum.photos/seed/dragon/800/600',
  width: 4000,
  height: 3000,
};

const inactiveScene: FoundrySceneInfo = {
  id: 'scene-2',
  name: 'Village Square',
  active: false,
  background: 'https://picsum.photos/seed/village/800/600',
  width: 2800,
  height: 2100,
};

const noBackgroundScene: FoundrySceneInfo = {
  id: 'scene-3',
  name: 'Dungeon Level 1',
  active: false,
  width: 3200,
  height: 2400,
};

export const ActiveScene: Story = {
  args: {
    scene: activeScene,
  },
};

export const InactiveScene: Story = {
  args: {
    scene: inactiveScene,
  },
};

export const NoBackground: Story = {
  args: {
    scene: noBackgroundScene,
  },
};

export const HideDimensions: Story = {
  args: {
    scene: activeScene,
    showDimensions: false,
  },
};

export const Interactive: Story = {
  args: {
    scene: inactiveScene,
    onClick: () => alert('Scene clicked!'),
  },
};

export const SceneGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 w-[700px]">
      <ScenePreview scene={activeScene} onClick={() => {}} />
      <ScenePreview scene={inactiveScene} onClick={() => {}} />
      <ScenePreview scene={noBackgroundScene} onClick={() => {}} />
      <ScenePreview
        scene={{
          id: 'scene-4',
          name: 'Tavern Interior',
          active: false,
          background: 'https://picsum.photos/seed/tavern/800/600',
          width: 1600,
          height: 1200,
        }}
        onClick={() => {}}
      />
      <ScenePreview
        scene={{
          id: 'scene-5',
          name: 'Forest Path',
          active: false,
          background: 'https://picsum.photos/seed/forest/800/600',
          width: 4800,
          height: 2400,
        }}
        onClick={() => {}}
      />
      <ScenePreview
        scene={{
          id: 'scene-6',
          name: 'Ship Deck',
          active: false,
          width: 2000,
          height: 1500,
        }}
        onClick={() => {}}
      />
    </div>
  ),
};
