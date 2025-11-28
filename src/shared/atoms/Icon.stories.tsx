import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Shared/Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: [
        'dice',
        'campaign',
        'settings',
        'user',
        'users',
        'add',
        'back',
        'close',
        'check',
        'warning',
        'error',
        'chat',
        'voice',
        'announcements',
        'notes',
        'refresh',
        'save',
        'play',
        'stop',
        'pause',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'dice',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    name: 'dice',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    name: 'dice',
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    name: 'dice',
    size: 'xl',
  },
};

export const AllIcons: Story = {
  render: () => (
    <div className="grid grid-cols-5 gap-4">
      {[
        'dice',
        'campaign',
        'settings',
        'user',
        'users',
        'add',
        'back',
        'close',
        'check',
        'warning',
        'error',
        'chat',
        'voice',
        'announcements',
        'notes',
        'refresh',
        'save',
        'play',
        'stop',
        'pause',
      ].map((name) => (
        <div key={name} className="flex flex-col items-center gap-1">
          <Icon name={name} size="lg" />
          <span className="text-discord-text-muted text-xs">{name}</span>
        </div>
      ))}
    </div>
  ),
};
