import type { Meta, StoryObj } from '@storybook/react';
import { WebLoginPage } from './WebLoginPage';

const meta: Meta<typeof WebLoginPage> = {
  title: 'Activity/Pages/WebLoginPage',
  component: WebLoginPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof WebLoginPage>;

export const Default: Story = {
  args: {
    onLogin: () => alert('Login with Discord clicked'),
  },
};
