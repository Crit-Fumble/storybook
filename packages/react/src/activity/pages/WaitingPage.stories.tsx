import type { Meta, StoryObj } from '@storybook/react';
import { WaitingPage } from './WaitingPage';

const meta: Meta<typeof WaitingPage> = {
  title: 'Activity/Pages/WaitingPage',
  component: WaitingPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof WaitingPage>;

export const Default: Story = {
  args: {},
};
