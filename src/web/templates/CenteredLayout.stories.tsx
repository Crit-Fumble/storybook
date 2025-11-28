import type { Meta, StoryObj } from '@storybook/react';
import { CenteredLayout } from './CenteredLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../shared/molecules';
import { Button, Spinner } from '../../shared/atoms';

const meta: Meta<typeof CenteredLayout> = {
  title: 'Web/Templates/CenteredLayout',
  component: CenteredLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof CenteredLayout>;

export const Default: Story = {
  args: {
    children: (
      <Card className="w-full max-w-md">
        <CardContent>
          <h2 className="text-xl font-bold text-cfg-text-normal text-center mb-4">
            Centered Content
          </h2>
          <p className="text-cfg-text-muted text-center">
            This layout centers content both vertically and horizontally.
          </p>
        </CardContent>
      </Card>
    ),
  },
};

export const LoginForm: Story = {
  args: {
    children: (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Welcome Back</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-cfg-text-muted text-center mb-6">
            Sign in to continue to Crit-Fumble
          </p>
          <Button variant="primary" className="w-full">
            Login with Discord
          </Button>
        </CardContent>
      </Card>
    ),
  },
};

export const LoadingState: Story = {
  args: {
    children: (
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" />
        <p className="text-cfg-text-muted">Loading your campaigns...</p>
      </div>
    ),
  },
};

export const ErrorState: Story = {
  args: {
    children: (
      <Card className="w-full max-w-md">
        <CardContent className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <h2 className="text-xl font-bold text-cfg-text-normal mb-2">
            Something went wrong
          </h2>
          <p className="text-cfg-text-muted mb-4">
            We couldn't connect to the server. Please try again.
          </p>
          <Button variant="primary">Retry</Button>
        </CardContent>
      </Card>
    ),
  },
};

export const SuccessMessage: Story = {
  args: {
    children: (
      <Card className="w-full max-w-md">
        <CardContent className="text-center">
          <div className="text-4xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-cfg-text-normal mb-2">
            Campaign Created!
          </h2>
          <p className="text-cfg-text-muted mb-4">
            Your new campaign "Dragon's Lair" has been created successfully.
          </p>
          <Button variant="primary">Go to Campaign</Button>
        </CardContent>
      </Card>
    ),
  },
};
