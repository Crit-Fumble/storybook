import type { Meta, StoryObj } from '@storybook/react';
import { PageLayout } from './PageLayout';

const meta: Meta<typeof PageLayout> = {
  title: 'Web/Templates/PageLayout',
  component: PageLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof PageLayout>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h1 className="text-2xl font-bold text-white mb-4">Page Content</h1>
        <p className="text-gray-400">This is the main content area.</p>
      </div>
    ),
  },
};

export const WithUser: Story = {
  args: {
    user: { role: 'member' },
    children: (
      <div>
        <h1 className="text-2xl font-bold text-white mb-4">Welcome</h1>
        <p className="text-gray-400">You are logged in as a member.</p>
      </div>
    ),
  },
};

export const AdminUser: Story = {
  args: {
    user: { role: 'admin', canEdit: true },
    children: (
      <div>
        <h1 className="text-2xl font-bold text-white mb-4">Admin View</h1>
        <p className="text-gray-400">You have admin privileges and can see the Dashboard link.</p>
      </div>
    ),
  },
};

export const OwnerUser: Story = {
  args: {
    user: { role: 'owner', canEdit: true },
    children: (
      <div>
        <h1 className="text-2xl font-bold text-white mb-4">Owner View</h1>
        <p className="text-gray-400">You are the owner with full access.</p>
      </div>
    ),
  },
};

export const WikiPage: Story = {
  args: {
    user: { role: 'admin', canEdit: true },
    nav: { current: 'wiki' },
    children: (
      <div>
        <h1 className="text-2xl font-bold text-white mb-4">Wiki</h1>
        <p className="text-gray-400">The Wiki nav item is rendered as white text instead of a link.</p>
      </div>
    ),
  },
};

export const ActivityPage: Story = {
  args: {
    user: { role: 'member' },
    nav: { current: 'activity' },
    children: (
      <div>
        <h1 className="text-2xl font-bold text-white mb-4">Activity</h1>
        <p className="text-gray-400">The Activity nav item is rendered as white text instead of a link.</p>
      </div>
    ),
  },
};

export const DashboardPage: Story = {
  args: {
    user: { role: 'owner', canEdit: true },
    nav: { current: 'dashboard' },
    children: (
      <div>
        <h1 className="text-2xl font-bold text-white mb-4">Dashboard</h1>
        <p className="text-gray-400">The Dashboard nav item is rendered as white text instead of a link.</p>
      </div>
    ),
  },
};

export const HiddenDashboard: Story = {
  args: {
    user: { role: 'admin', canEdit: true },
    nav: { hideDashboard: true },
    children: (
      <div>
        <h1 className="text-2xl font-bold text-white mb-4">Hidden Dashboard</h1>
        <p className="text-gray-400">Even though canEdit is true, the Dashboard link is hidden via hideDashboard.</p>
      </div>
    ),
  },
};

export const NoUser: Story = {
  args: {
    user: null,
    children: (
      <div>
        <h1 className="text-2xl font-bold text-white mb-4">Public View</h1>
        <p className="text-gray-400">No user is logged in. No role badge or dashboard link shown.</p>
      </div>
    ),
  },
};
