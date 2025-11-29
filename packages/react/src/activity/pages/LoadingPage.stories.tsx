import type { Meta, StoryObj } from '@storybook/react';
import { LoadingPage } from './LoadingPage';

const meta: Meta<typeof LoadingPage> = {
  title: 'Activity/Pages/LoadingPage',
  component: LoadingPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof LoadingPage>;

export const Default: Story = {
  args: {},
};

export const CustomMessage: Story = {
  args: {
    message: 'Connecting to Discord...',
  },
};

export const AuthenticatingMessage: Story = {
  args: {
    message: 'Authenticating with Discord...',
  },
};

export const LoadingCampaign: Story = {
  args: {
    message: 'Loading campaign data...',
  },
};
