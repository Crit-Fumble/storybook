import type { Meta, StoryObj } from '@storybook/react';
import { DashboardSidebar } from './DashboardSidebar';
import { PageListItem } from './PageListItem';

const meta: Meta<typeof DashboardSidebar> = {
  title: 'Web/Molecules/DashboardSidebar',
  component: DashboardSidebar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="h-[500px] bg-cfg-background-primary">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DashboardSidebar>;

const sampleUser = {
  name: 'John Doe',
  image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=john',
  role: 'editor',
};

const SamplePageList = () => (
  <div className="space-y-1">
    <PageListItem title="Home" slug="home" selected />
    <PageListItem title="Getting Started" slug="getting-started" onClick={() => {}} />
    <PageListItem title="Character Creation" slug="character-creation" onClick={() => {}} />
    <PageListItem title="Combat Rules" slug="combat-rules" onClick={() => {}} />
  </div>
);

export const Default: Story = {
  args: {
    user: sampleUser,
    children: <SamplePageList />,
  },
};

export const WithHeader: Story = {
  args: {
    user: sampleUser,
    header: (
      <div className="flex items-center justify-between px-2 py-1">
        <span className="text-xs font-semibold text-cfg-text-muted uppercase">Pages</span>
        <button className="text-xs text-cfg-primary hover:underline">+ New</button>
      </div>
    ),
    children: <SamplePageList />,
  },
};

export const WithFooter: Story = {
  args: {
    user: sampleUser,
    children: <SamplePageList />,
    footer: (
      <a href="#" className="text-sm text-cfg-text-muted hover:text-cfg-text-normal">
        Sign out
      </a>
    ),
  },
};

export const FullFeatured: Story = {
  args: {
    user: sampleUser,
    header: (
      <div className="flex items-center justify-between px-2 py-1">
        <span className="text-xs font-semibold text-cfg-text-muted uppercase">Pages</span>
        <button className="text-xs text-cfg-primary hover:underline">+ New</button>
      </div>
    ),
    children: <SamplePageList />,
    footer: (
      <a href="#" className="text-sm text-cfg-text-muted hover:text-cfg-text-normal">
        Sign out
      </a>
    ),
  },
};

export const NoAvatar: Story = {
  args: {
    user: {
      name: 'John Doe',
      role: 'viewer',
    },
    children: <SamplePageList />,
  },
};
