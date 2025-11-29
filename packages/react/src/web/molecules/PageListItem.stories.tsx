import type { Meta, StoryObj } from '@storybook/react';
import { PageListItem } from './PageListItem';

const meta: Meta<typeof PageListItem> = {
  title: 'Web/Molecules/PageListItem',
  component: PageListItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-60 bg-cfg-background-secondary p-2">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PageListItem>;

export const Default: Story = {
  args: {
    title: 'Getting Started',
    slug: 'getting-started',
  },
};

export const Selected: Story = {
  args: {
    title: 'Getting Started',
    slug: 'getting-started',
    selected: true,
  },
};

export const LongTitle: Story = {
  args: {
    title: 'This is a Very Long Page Title That Should Truncate',
    slug: 'very-long-page-title',
  },
};

export const Interactive: Story = {
  args: {
    title: 'Click Me',
    slug: 'click-me',
    onClick: () => alert('Page clicked!'),
  },
};

export const PageList: Story = {
  render: () => (
    <div className="space-y-1">
      <PageListItem title="Home" slug="home" selected />
      <PageListItem title="Getting Started" slug="getting-started" onClick={() => {}} />
      <PageListItem title="Character Creation" slug="character-creation" onClick={() => {}} />
      <PageListItem title="Combat Rules" slug="combat-rules" onClick={() => {}} />
      <PageListItem title="Magic System" slug="magic-system" onClick={() => {}} />
    </div>
  ),
};
