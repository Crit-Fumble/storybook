import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './Card';
import { Button } from '../atoms';

const meta: Meta<typeof Card> = {
  title: 'Shared/Molecules/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'interactive'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: <CardContent>This is a basic card with content.</CardContent>,
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: <CardContent>This is an elevated card with a shadow.</CardContent>,
  },
};

export const Interactive: Story = {
  args: {
    variant: 'interactive',
    children: <CardContent>This card is interactive - hover over it!</CardContent>,
  },
};

export const WithHeader: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        This is a card with a header and content section.
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card with Footer</CardTitle>
      </CardHeader>
      <CardContent>
        This card has both a header and a footer with action buttons.
      </CardContent>
      <CardFooter>
        <Button variant="secondary" size="sm">Cancel</Button>
        <Button variant="primary" size="sm">Save</Button>
      </CardFooter>
    </Card>
  ),
};

export const FullExample: Story = {
  render: () => (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>Campaign Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-discord-text-muted">
          Configure your campaign settings, including player permissions,
          dice rolling options, and more.
        </p>
      </CardContent>
      <CardFooter>
        <span className="text-sm text-discord-text-muted">Last updated: 2 hours ago</span>
        <Button variant="primary" size="sm">Edit Settings</Button>
      </CardFooter>
    </Card>
  ),
};
