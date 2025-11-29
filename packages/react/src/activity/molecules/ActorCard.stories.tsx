import type { Meta, StoryObj } from '@storybook/react';
import { ActorCard, type FoundryActorInfo } from './ActorCard';

const meta: Meta<typeof ActorCard> = {
  title: 'Activity/Molecules/ActorCard',
  component: ActorCard,
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
type Story = StoryObj<typeof ActorCard>;

const characterActor: FoundryActorInfo = {
  id: 'actor-1',
  name: 'Gandalf the Grey',
  type: 'character',
  img: 'https://api.dicebear.com/7.x/adventurer/svg?seed=gandalf',
};

const npcActor: FoundryActorInfo = {
  id: 'actor-2',
  name: 'Goblin Archer',
  type: 'npc',
  img: 'https://api.dicebear.com/7.x/bottts/svg?seed=goblin',
};

const vehicleActor: FoundryActorInfo = {
  id: 'actor-3',
  name: 'Airship Valiant',
  type: 'vehicle',
};

const noImageActor: FoundryActorInfo = {
  id: 'actor-4',
  name: 'Mystery Figure',
  type: 'npc',
};

export const Character: Story = {
  args: {
    actor: characterActor,
  },
};

export const NPC: Story = {
  args: {
    actor: npcActor,
  },
};

export const Vehicle: Story = {
  args: {
    actor: vehicleActor,
  },
};

export const NoImage: Story = {
  args: {
    actor: noImageActor,
  },
};

export const Selected: Story = {
  args: {
    actor: characterActor,
    selected: true,
  },
};

export const Interactive: Story = {
  args: {
    actor: characterActor,
    onClick: () => alert('Actor clicked!'),
  },
};

export const SmallSize: Story = {
  args: {
    actor: characterActor,
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    actor: characterActor,
    size: 'lg',
  },
};

export const ActorGrid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[500px]">
      <ActorCard actor={characterActor} onClick={() => {}} />
      <ActorCard actor={npcActor} onClick={() => {}} />
      <ActorCard actor={vehicleActor} onClick={() => {}} />
      <ActorCard actor={noImageActor} onClick={() => {}} />
    </div>
  ),
};
