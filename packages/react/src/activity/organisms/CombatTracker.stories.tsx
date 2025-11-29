import type { Meta, StoryObj } from '@storybook/react';
import { CombatTracker, type CombatInfo } from './CombatTracker';

const meta: Meta<typeof CombatTracker> = {
  title: 'Activity/Organisms/CombatTracker',
  component: CombatTracker,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-4 bg-discord-background-primary w-[450px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CombatTracker>;

const activeCombat: CombatInfo = {
  id: 'combat-1',
  active: true,
  round: 3,
  turn: 1,
  combatants: [
    {
      id: 'c1',
      name: 'Gandalf',
      actorId: 'actor-1',
      initiative: 22,
      img: 'https://api.dicebear.com/7.x/adventurer/svg?seed=gandalf',
      hp: { value: 45, max: 50 },
    },
    {
      id: 'c2',
      name: 'Aragorn',
      actorId: 'actor-2',
      initiative: 18,
      img: 'https://api.dicebear.com/7.x/adventurer/svg?seed=aragorn',
      hp: { value: 72, max: 85 },
    },
    {
      id: 'c3',
      name: 'Orc Warchief',
      actorId: 'actor-3',
      initiative: 15,
      img: 'https://api.dicebear.com/7.x/bottts/svg?seed=orc',
      hp: { value: 35, max: 120 },
    },
    {
      id: 'c4',
      name: 'Legolas',
      actorId: 'actor-4',
      initiative: 12,
      img: 'https://api.dicebear.com/7.x/adventurer/svg?seed=legolas',
      hp: { value: 60, max: 60 },
    },
    {
      id: 'c5',
      name: 'Goblin Archer',
      actorId: 'actor-5',
      initiative: 8,
      hp: { value: 0, max: 15 },
      defeated: true,
    },
  ],
};

const inactiveCombat: CombatInfo = {
  id: 'combat-2',
  active: false,
  round: 0,
  turn: 0,
  combatants: [],
};

const largeCombat: CombatInfo = {
  id: 'combat-3',
  active: true,
  round: 1,
  turn: 0,
  combatants: [
    { id: 'c1', name: 'Fighter', initiative: 20, hp: { value: 100, max: 100 } },
    { id: 'c2', name: 'Cleric', initiative: 18, hp: { value: 75, max: 80 } },
    { id: 'c3', name: 'Wizard', initiative: 16, hp: { value: 30, max: 45 } },
    { id: 'c4', name: 'Rogue', initiative: 14, hp: { value: 55, max: 65 } },
    { id: 'c5', name: 'Enemy 1', initiative: 12, hp: { value: 20, max: 30 } },
    { id: 'c6', name: 'Enemy 2', initiative: 10, hp: { value: 25, max: 30 } },
    { id: 'c7', name: 'Enemy 3', initiative: 8, hp: { value: 0, max: 30 }, defeated: true },
    { id: 'c8', name: 'Boss', initiative: 5, hp: { value: 150, max: 200 } },
  ],
};

const noHpCombat: CombatInfo = {
  id: 'combat-4',
  active: true,
  round: 2,
  turn: 2,
  combatants: [
    { id: 'c1', name: 'Player 1', initiative: 18 },
    { id: 'c2', name: 'Player 2', initiative: 15 },
    { id: 'c3', name: 'Player 3', initiative: 12 },
    { id: 'c4', name: 'NPC', initiative: 10 },
  ],
};

export const ActiveCombat: Story = {
  args: {
    combat: activeCombat,
    onNextTurn: () => {},
    onPrevTurn: () => {},
    onEndCombat: () => {},
    onSelectCombatant: (c) => alert(`Selected: ${c.name}`),
  },
};

export const InactiveCombat: Story = {
  args: {
    combat: inactiveCombat,
  },
};

export const LargeCombat: Story = {
  args: {
    combat: largeCombat,
    onNextTurn: () => {},
    onPrevTurn: () => {},
    onEndCombat: () => {},
  },
};

export const NoHPTracking: Story = {
  args: {
    combat: noHpCombat,
    onNextTurn: () => {},
    onPrevTurn: () => {},
    onEndCombat: () => {},
  },
};

export const NoControls: Story = {
  args: {
    combat: activeCombat,
    showControls: false,
  },
};

export const NextTurnOnly: Story = {
  args: {
    combat: activeCombat,
    onNextTurn: () => {},
  },
};

export const ReadOnly: Story = {
  args: {
    combat: activeCombat,
    showControls: false,
    onSelectCombatant: undefined,
  },
};
