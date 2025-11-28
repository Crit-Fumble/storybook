import type { Meta, StoryObj } from '@storybook/react';
import { MainLayout } from './MainLayout';
import { Button } from '../../shared/atoms';
import { Card, CardHeader, CardTitle, CardContent } from '../../shared/molecules';

const meta: Meta<typeof MainLayout> = {
  title: 'Web/Templates/MainLayout',
  component: MainLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof MainLayout>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-cfg-text-normal mb-4">Page Content</h1>
        <p className="text-cfg-text-muted">This is the main content area.</p>
      </div>
    ),
  },
};

export const WithHeader: Story = {
  args: {
    header: (
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <h1 className="text-xl font-bold text-cfg-text-normal">Crit-Fumble</h1>
        <nav className="flex gap-4">
          <Button variant="ghost" size="sm">Dashboard</Button>
          <Button variant="ghost" size="sm">Campaigns</Button>
          <Button variant="ghost" size="sm">Settings</Button>
        </nav>
      </div>
    ),
    children: (
      <div className="p-4">
        <h2 className="text-xl font-bold text-cfg-text-normal mb-4">Welcome Back!</h2>
        <p className="text-cfg-text-muted">Here's what's happening in your campaigns.</p>
      </div>
    ),
  },
};

export const DashboardExample: Story = {
  args: {
    header: (
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎲</span>
          <h1 className="text-xl font-bold text-cfg-text-normal">Crit-Fumble</h1>
        </div>
        <Button variant="primary" size="sm">New Campaign</Button>
      </div>
    ),
    children: (
      <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Campaign: Dragon's Keep</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-cfg-text-muted text-sm">5 players • Last session: 2 days ago</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Campaign: Lost Mines</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-cfg-text-muted text-sm">4 players • Last session: 1 week ago</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Campaign: Curse of Strahd</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-cfg-text-muted text-sm">6 players • Last session: 3 days ago</p>
          </CardContent>
        </Card>
      </div>
    ),
  },
};
