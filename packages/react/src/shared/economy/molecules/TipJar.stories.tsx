import type { Meta, StoryObj } from '@storybook/react';
import { TipJar } from './TipJar';

const meta: Meta<typeof TipJar> = {
  title: 'Shared/Economy/Molecules/TipJar',
  component: TipJar,
  tags: ['autodocs'],
  argTypes: {
    onTip: { action: 'tip-sent' },
  },
};

export default meta;
type Story = StoryObj<typeof TipJar>;

export const Default: Story = {
  args: {
    recipientName: 'Game Master Dave',
    userBalance: 100,
  },
};

export const WithAvatar: Story = {
  args: {
    recipientName: 'Dungeon Master Sarah',
    recipientAvatar: 'https://via.placeholder.com/48',
    userBalance: 500,
  },
};

export const LowBalance: Story = {
  args: {
    recipientName: 'Story Teller Alex',
    userBalance: 3,
    suggestedAmounts: [1, 2, 3, 5],
  },
};

export const HighBalance: Story = {
  args: {
    recipientName: 'Campaign Creator Jordan',
    userBalance: 10000,
    suggestedAmounts: [10, 25, 50, 100],
  },
};

export const NoBalance: Story = {
  args: {
    recipientName: 'Content Creator',
    userBalance: 0,
  },
};
