import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Shared/Atoms/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const sampleOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Select an option...',
  },
};

export const WithValue: Story = {
  args: {
    options: sampleOptions,
    value: 'option2',
  },
};

export const Error: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Select an option...',
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Select an option...',
    disabled: true,
  },
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2 (disabled)', disabled: true },
      { value: 'option3', label: 'Option 3' },
    ],
    placeholder: 'Select an option...',
  },
};
