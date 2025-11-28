import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Activity/Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: {
    src: 'https://avatars.githubusercontent.com/u/1?v=4',
    alt: 'User avatar',
    size: 'md',
  },
};

export const WithFallback: Story = {
  args: {
    fallback: 'JD',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    fallback: 'S',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    fallback: 'L',
    size: 'lg',
  },
};
