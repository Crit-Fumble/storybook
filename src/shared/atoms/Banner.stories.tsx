import type { Meta, StoryObj } from '@storybook/react';
import { Banner } from './Banner';

const meta: Meta<typeof Banner> = {
  title: 'Shared/Atoms/Banner',
  component: Banner,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['warning', 'info', 'success', 'danger'],
    },
    sticky: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: '⚠️ STAGING ENVIRONMENT - This is a test environment.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'ℹ️ New features are now available!',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: '✓ Your changes have been saved successfully.',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: '⚠️ Action required: Please verify your email.',
  },
};

export const Sticky: Story = {
  args: {
    variant: 'warning',
    children: '⚠️ This banner sticks to the top of the page.',
    sticky: true,
  },
};
