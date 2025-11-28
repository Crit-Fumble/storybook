import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';

const meta: Meta<typeof FormField> = {
  title: 'Shared/Molecules/FormField',
  component: FormField,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'url', 'textarea', 'select'],
    },
    required: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Text: Story = {
  args: {
    label: 'Username',
    name: 'username',
    value: '',
    onChange: () => {},
    placeholder: 'Enter your username',
  },
};

export const Email: Story = {
  args: {
    label: 'Email Address',
    name: 'email',
    type: 'email',
    value: '',
    onChange: () => {},
    placeholder: 'you@example.com',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    name: 'password',
    type: 'password',
    value: '',
    onChange: () => {},
    placeholder: 'Enter your password',
  },
};

export const Required: Story = {
  args: {
    label: 'Required Field',
    name: 'required',
    value: '',
    onChange: () => {},
    required: true,
    placeholder: 'This field is required',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    name: 'email-error',
    type: 'email',
    value: 'invalid-email',
    onChange: () => {},
    error: 'Please enter a valid email address',
  },
};

export const Textarea: Story = {
  args: {
    label: 'Description',
    name: 'description',
    type: 'textarea',
    value: '',
    onChange: () => {},
    placeholder: 'Enter a description...',
  },
};

export const Select: Story = {
  args: {
    label: 'Role',
    name: 'role',
    type: 'select',
    value: '',
    onChange: () => {},
    placeholder: 'Select a role',
    options: [
      { value: 'player', label: 'Player' },
      { value: 'gm', label: 'Game Master' },
      { value: 'admin', label: 'Admin' },
    ],
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    name: 'disabled',
    value: 'Cannot edit this',
    onChange: () => {},
    disabled: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormField
        label="Campaign Name"
        name="campaign"
        value={value}
        onChange={setValue}
        placeholder="Enter campaign name"
        required
      />
    );
  },
};
