import type { Meta, StoryObj } from '@storybook/react';
import { RollResultDisplay, type FoundryRollResultInfo } from './RollResultDisplay';

const meta: Meta<typeof RollResultDisplay> = {
  title: 'Activity/Molecules/RollResultDisplay',
  component: RollResultDisplay,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-4 bg-discord-background-primary flex justify-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RollResultDisplay>;

const simpleD20Roll: FoundryRollResultInfo = {
  formula: '1d20+5',
  total: 18,
  terms: [],
  dice: [
    {
      class: 'Die',
      faces: 20,
      number: 1,
      results: [{ result: 13, active: true }],
    },
  ],
};

const fireball: FoundryRollResultInfo = {
  formula: '8d6',
  total: 28,
  terms: [],
  dice: [
    {
      class: 'Die',
      faces: 6,
      number: 8,
      results: [
        { result: 4, active: true },
        { result: 6, active: true },
        { result: 2, active: true },
        { result: 5, active: true },
        { result: 3, active: true },
        { result: 1, active: true },
        { result: 4, active: true },
        { result: 3, active: true },
      ],
    },
  ],
};

const mixedDice: FoundryRollResultInfo = {
  formula: '2d10+1d8+4',
  total: 22,
  terms: [],
  dice: [
    {
      class: 'Die',
      faces: 10,
      number: 2,
      results: [
        { result: 7, active: true },
        { result: 5, active: true },
      ],
    },
    {
      class: 'Die',
      faces: 8,
      number: 1,
      results: [{ result: 6, active: true }],
    },
  ],
};

const criticalHit: FoundryRollResultInfo = {
  formula: '1d20',
  total: 20,
  terms: [],
  dice: [
    {
      class: 'Die',
      faces: 20,
      number: 1,
      results: [{ result: 20, active: true }],
    },
  ],
};

const advantageRoll: FoundryRollResultInfo = {
  formula: '2d20kh+3',
  total: 21,
  terms: [],
  dice: [
    {
      class: 'Die',
      faces: 20,
      number: 2,
      results: [
        { result: 18, active: true },
        { result: 7, active: false },
      ],
    },
  ],
};

const allDiceTypes: FoundryRollResultInfo = {
  formula: '1d4+1d6+1d8+1d10+1d12+1d20+1d100',
  total: 127,
  terms: [],
  dice: [
    { class: 'Die', faces: 4, number: 1, results: [{ result: 3, active: true }] },
    { class: 'Die', faces: 6, number: 1, results: [{ result: 5, active: true }] },
    { class: 'Die', faces: 8, number: 1, results: [{ result: 7, active: true }] },
    { class: 'Die', faces: 10, number: 1, results: [{ result: 8, active: true }] },
    { class: 'Die', faces: 12, number: 1, results: [{ result: 11, active: true }] },
    { class: 'Die', faces: 20, number: 1, results: [{ result: 18, active: true }] },
    { class: 'Die', faces: 100, number: 1, results: [{ result: 75, active: true }] },
  ],
};

export const SimpleD20: Story = {
  args: {
    roll: simpleD20Roll,
  },
};

export const Fireball: Story = {
  args: {
    roll: fireball,
  },
};

export const MixedDice: Story = {
  args: {
    roll: mixedDice,
  },
};

export const CriticalHit: Story = {
  args: {
    roll: criticalHit,
  },
};

export const Advantage: Story = {
  args: {
    roll: advantageRoll,
  },
};

export const AllDiceTypes: Story = {
  args: {
    roll: allDiceTypes,
  },
};

export const SmallSize: Story = {
  args: {
    roll: simpleD20Roll,
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    roll: criticalHit,
    size: 'lg',
  },
};

export const HideFormula: Story = {
  args: {
    roll: fireball,
    showFormula: false,
  },
};

export const HideDice: Story = {
  args: {
    roll: mixedDice,
    showDice: false,
  },
};

export const TotalOnly: Story = {
  args: {
    roll: criticalHit,
    showFormula: false,
    showDice: false,
  },
};
