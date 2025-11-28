import type { Meta, StoryObj } from '@storybook/react';
import { TypingIndicator } from './TypingIndicator';

const meta: Meta<typeof TypingIndicator> = {
  title: 'Activity/Molecules/TypingIndicator',
  component: TypingIndicator,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-4 bg-cfg-bg-primary min-h-[100px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TypingIndicator>;

export const Default: Story = {};
