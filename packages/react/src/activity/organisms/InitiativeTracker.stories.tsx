import type { Meta, StoryObj } from '@storybook/react';
import { InitiativeTracker } from './InitiativeTracker';

const meta = {
  title: 'Activity/Organisms/InitiativeTracker',
  component: InitiativeTracker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onEntryClick: { action: 'entryClicked' },
    onHpChange: { action: 'hpChanged' },
    onRemoveEntry: { action: 'entryRemoved' },
    onNextTurn: { action: 'nextTurn' },
    onPrevTurn: { action: 'prevTurn' },
    onResetRound: { action: 'resetRound' },
  },
  decorators: [
    (Story) => (
      <div className="w-[480px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InitiativeTracker>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleEntries = [
  {
    id: '1',
    name: 'Elara Moonwhisper',
    initiative: 21,
    isPlayer: true,
    hp: 45,
    maxHp: 52,
    ac: 16,
    avatarUrl: 'https://i.pravatar.cc/150?u=elara',
  },
  {
    id: '2',
    name: 'Thorin Ironforge',
    initiative: 18,
    isPlayer: true,
    hp: 38,
    maxHp: 65,
    ac: 18,
    avatarUrl: 'https://i.pravatar.cc/150?u=thorin',
  },
  {
    id: '3',
    name: 'Hobgoblin Captain',
    initiative: 15,
    hp: 22,
    maxHp: 39,
    ac: 17,
    conditions: ['Frightened'],
  },
  {
    id: '4',
    name: 'Goblin Warrior',
    initiative: 12,
    hp: 7,
    maxHp: 12,
    ac: 13,
  },
  {
    id: '5',
    name: 'Goblin Archer',
    initiative: 10,
    hp: 0,
    maxHp: 12,
    ac: 13,
  },
];

export const Default: Story = {
  args: {
    entries: sampleEntries,
    currentTurnId: '1',
    round: 1,
  },
};

export const Empty: Story = {
  args: {
    entries: [],
  },
};

export const CustomEmptyMessage: Story = {
  args: {
    entries: [],
    emptyMessage: 'Roll for initiative to begin combat!',
  },
};

export const RoundThree: Story = {
  args: {
    entries: sampleEntries,
    currentTurnId: '3',
    round: 3,
    title: 'Battle at the Bridge',
  },
};

export const Inactive: Story = {
  args: {
    entries: sampleEntries,
    isActive: false,
    title: 'Combat Paused',
  },
};

export const WithControls: Story = {
  args: {
    entries: sampleEntries,
    currentTurnId: '2',
    round: 2,
    onNextTurn: () => console.log('Next turn'),
    onPrevTurn: () => console.log('Prev turn'),
    onResetRound: () => console.log('Reset'),
  },
};

export const FullyInteractive: Story = {
  args: {
    entries: sampleEntries,
    currentTurnId: '1',
    round: 1,
    onEntryClick: (entry) => console.log('Clicked:', entry.name),
    onHpChange: (id, hp) => console.log('HP change:', id, hp),
    onRemoveEntry: (id) => console.log('Remove:', id),
    onNextTurn: () => console.log('Next turn'),
    onPrevTurn: () => console.log('Prev turn'),
    onResetRound: () => console.log('Reset'),
  },
};

export const Loading: Story = {
  args: {
    entries: sampleEntries,
    currentTurnId: '1',
    round: 1,
    onNextTurn: () => {},
    onPrevTurn: () => {},
    onResetRound: () => {},
    isLoading: true,
  },
};

export const UnsortedOrder: Story = {
  args: {
    entries: [
      { id: '1', name: 'Last', initiative: 5, isPlayer: true },
      { id: '2', name: 'First', initiative: 20, isPlayer: true },
      { id: '3', name: 'Middle', initiative: 12 },
    ],
    autoSort: false,
    title: 'Manual Order',
  },
};

export const LargeBattle: Story = {
  args: {
    entries: [
      { id: '1', name: 'Elara Moonwhisper', initiative: 23, isPlayer: true, hp: 45, maxHp: 52, ac: 16 },
      { id: '2', name: 'Thorin Ironforge', initiative: 20, isPlayer: true, hp: 55, maxHp: 65, ac: 18 },
      { id: '3', name: 'Gandalf the Grey', initiative: 19, isPlayer: true, hp: 78, maxHp: 78, ac: 14 },
      { id: '4', name: 'Frodo Baggins', initiative: 17, isPlayer: true, hp: 28, maxHp: 35, ac: 12 },
      { id: '5', name: 'Young Dragon', initiative: 16, hp: 150, maxHp: 178, ac: 18, conditions: ['Flying'] },
      { id: '6', name: 'Kobold Sorcerer', initiative: 15, hp: 15, maxHp: 22, ac: 12 },
      { id: '7', name: 'Kobold Guard 1', initiative: 14, hp: 8, maxHp: 12, ac: 13 },
      { id: '8', name: 'Kobold Guard 2', initiative: 13, hp: 12, maxHp: 12, ac: 13 },
      { id: '9', name: 'Kobold Guard 3', initiative: 11, hp: 5, maxHp: 12, ac: 13, conditions: ['Poisoned'] },
      { id: '10', name: 'Kobold Guard 4', initiative: 8, hp: 0, maxHp: 12, ac: 13 },
    ],
    currentTurnId: '5',
    round: 4,
    title: 'Dragon Lair Battle',
    onNextTurn: () => {},
    onPrevTurn: () => {},
    onHpChange: () => {},
    onRemoveEntry: () => {},
  },
};

export const ColorfulEntries: Story = {
  args: {
    entries: [
      { id: '1', name: 'Fire Elemental', initiative: 18, hp: 90, maxHp: 102, color: '#ff6b00' },
      { id: '2', name: 'Water Elemental', initiative: 16, hp: 95, maxHp: 114, color: '#00a8ff' },
      { id: '3', name: 'Earth Elemental', initiative: 12, hp: 110, maxHp: 126, color: '#8b5a2b' },
      { id: '4', name: 'Air Elemental', initiative: 20, hp: 78, maxHp: 90, color: '#87ceeb' },
    ],
    currentTurnId: '4',
    round: 1,
    title: 'Elemental Chaos',
    onNextTurn: () => {},
    onPrevTurn: () => {},
  },
};

export const ManyDefeated: Story = {
  args: {
    entries: [
      { id: '1', name: 'Last Hero Standing', initiative: 18, isPlayer: true, hp: 12, maxHp: 45, ac: 16 },
      { id: '2', name: 'Fallen Paladin', initiative: 15, isPlayer: true, hp: 0, maxHp: 65, ac: 18 },
      { id: '3', name: 'Unconscious Wizard', initiative: 14, isPlayer: true, hp: 0, maxHp: 35, ac: 12 },
      { id: '4', name: 'Dead Goblin 1', initiative: 12, hp: 0, maxHp: 12, ac: 13 },
      { id: '5', name: 'Dead Goblin 2', initiative: 10, hp: 0, maxHp: 12, ac: 13 },
      { id: '6', name: 'Barely Alive Boss', initiative: 8, hp: 3, maxHp: 100, ac: 17 },
    ],
    currentTurnId: '1',
    round: 8,
    title: 'Final Showdown',
    onNextTurn: () => {},
    onPrevTurn: () => {},
    onResetRound: () => {},
  },
};

export const CustomTitle: Story = {
  args: {
    entries: sampleEntries.slice(0, 3),
    currentTurnId: '1',
    round: 1,
    title: 'Ambush at Dawn',
  },
};
