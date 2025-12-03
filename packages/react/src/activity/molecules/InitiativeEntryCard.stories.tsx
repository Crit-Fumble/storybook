import type { Meta, StoryObj } from '@storybook/react';
import { InitiativeEntryCard } from './InitiativeEntryCard';

const meta = {
  title: 'Activity/Molecules/InitiativeEntryCard',
  component: InitiativeEntryCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    onHpChange: { action: 'hpChanged' },
    onRemove: { action: 'removed' },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InitiativeEntryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'entry-1',
    name: 'Thorin Ironforge',
    initiative: 18,
  },
};

export const PlayerCharacter: Story = {
  args: {
    id: 'pc-1',
    name: 'Elara Moonwhisper',
    initiative: 21,
    isPlayer: true,
    hp: 45,
    maxHp: 52,
    ac: 16,
    avatarUrl: 'https://i.pravatar.cc/150?u=elara',
  },
};

export const CurrentTurn: Story = {
  args: {
    id: 'current-1',
    name: 'Gandalf the Grey',
    initiative: 19,
    isCurrentTurn: true,
    hp: 78,
    maxHp: 78,
    ac: 14,
    avatarUrl: 'https://i.pravatar.cc/150?u=gandalf',
  },
};

export const LowHealth: Story = {
  args: {
    id: 'low-hp-1',
    name: 'Wounded Warrior',
    initiative: 14,
    hp: 8,
    maxHp: 40,
    ac: 18,
  },
};

export const CriticalHealth: Story = {
  args: {
    id: 'crit-hp-1',
    name: 'Nearly Dead Knight',
    initiative: 10,
    hp: 3,
    maxHp: 60,
    ac: 20,
  },
};

export const Defeated: Story = {
  args: {
    id: 'defeated-1',
    name: 'Fallen Goblin',
    initiative: 8,
    hp: 0,
    maxHp: 12,
    isDefeated: true,
  },
};

export const WithConditions: Story = {
  args: {
    id: 'conditions-1',
    name: 'Cursed Mage',
    initiative: 16,
    hp: 30,
    maxHp: 35,
    ac: 12,
    conditions: ['Poisoned', 'Frightened'],
  },
};

export const ManyConditions: Story = {
  args: {
    id: 'many-conditions-1',
    name: 'Unfortunate Adventurer',
    initiative: 5,
    hp: 15,
    maxHp: 45,
    ac: 15,
    conditions: ['Blinded', 'Deafened', 'Poisoned', 'Exhausted', 'Prone'],
  },
};

export const WithCustomColor: Story = {
  args: {
    id: 'color-1',
    name: 'Fire Elemental',
    initiative: 17,
    hp: 102,
    maxHp: 102,
    color: '#ff6b00',
  },
};

export const WithActions: Story = {
  args: {
    id: 'actions-1',
    name: 'Interactive Entry',
    initiative: 15,
    hp: 25,
    maxHp: 30,
    ac: 14,
    onHpChange: (hp) => console.log('HP changed to:', hp),
    onRemove: () => console.log('Entry removed'),
    onClick: () => console.log('Entry clicked'),
  },
};

export const NoAvatar: Story = {
  args: {
    id: 'no-avatar-1',
    name: 'Mystery Figure',
    initiative: 12,
    hp: 50,
    maxHp: 50,
    ac: 13,
  },
};

export const Loading: Story = {
  args: {
    id: 'loading-1',
    name: 'Loading Entry',
    initiative: 15,
    hp: 25,
    maxHp: 30,
    onHpChange: () => {},
    onRemove: () => {},
    isLoading: true,
  },
};

export const FullCombatExample: StoryObj<typeof InitiativeEntryCard> = {
  render: () => (
    <div className="space-y-2 w-96">
      <InitiativeEntryCard
        id="1"
        name="Elara Moonwhisper"
        initiative={21}
        isPlayer
        isCurrentTurn
        hp={45}
        maxHp={52}
        ac={16}
        avatarUrl="https://i.pravatar.cc/150?u=elara"
        onHpChange={() => {}}
        onRemove={() => {}}
      />
      <InitiativeEntryCard
        id="2"
        name="Thorin Ironforge"
        initiative={18}
        isPlayer
        hp={38}
        maxHp={65}
        ac={18}
        avatarUrl="https://i.pravatar.cc/150?u=thorin"
        onHpChange={() => {}}
        onRemove={() => {}}
      />
      <InitiativeEntryCard
        id="3"
        name="Goblin Warrior"
        initiative={15}
        hp={7}
        maxHp={12}
        ac={13}
        onHpChange={() => {}}
        onRemove={() => {}}
      />
      <InitiativeEntryCard
        id="4"
        name="Hobgoblin Captain"
        initiative={14}
        hp={22}
        maxHp={39}
        ac={17}
        conditions={['Frightened']}
        onHpChange={() => {}}
        onRemove={() => {}}
      />
      <InitiativeEntryCard
        id="5"
        name="Dead Goblin"
        initiative={8}
        hp={0}
        maxHp={12}
        isDefeated
        onRemove={() => {}}
      />
    </div>
  ),
};
