import type { Meta, StoryObj } from '@storybook/react';
import { ErrorPage } from './ErrorPage';

const meta: Meta<typeof ErrorPage> = {
  title: 'Activity/Pages/ErrorPage',
  component: ErrorPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ErrorPage>;

export const Default: Story = {
  args: {
    error: new Error('Failed to connect to Discord'),
    onRetry: () => alert('Retrying...'),
  },
};

export const NetworkError: Story = {
  args: {
    error: new Error('Network connection lost. Please check your internet connection.'),
    onRetry: () => alert('Retrying...'),
  },
};

export const AuthenticationError: Story = {
  args: {
    error: new Error('Authentication failed. Your session may have expired.'),
    onRetry: () => alert('Retrying...'),
  },
};

export const PermissionError: Story = {
  args: {
    error: new Error('You do not have permission to access this activity.'),
  },
};

export const NoRetry: Story = {
  args: {
    error: new Error('This feature is not available in your current plan.'),
  },
};

export const LongErrorMessage: Story = {
  args: {
    error: new Error('An unexpected error occurred while loading the Discord Activity. This could be due to a temporary server issue, network problems, or an outdated client version. Please try again or contact support if the issue persists.'),
    onRetry: () => alert('Retrying...'),
  },
};
