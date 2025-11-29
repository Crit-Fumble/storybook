import type { Meta, StoryObj } from '@storybook/react';
import { StagingBanner } from './StagingBanner';

const meta: Meta<typeof StagingBanner> = {
  title: 'Web/Atoms/StagingBanner',
  component: StagingBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof StagingBanner>;

export const Staging: Story = {
  args: {
    environment: 'staging',
  },
};

export const Production: Story = {
  args: {
    environment: 'production',
  },
  parameters: {
    docs: {
      description: {
        story: 'In production environment, the banner is not rendered.',
      },
    },
  },
};

export const Development: Story = {
  args: {
    environment: 'development',
  },
  parameters: {
    docs: {
      description: {
        story: 'In development environment, the banner is not rendered.',
      },
    },
  },
};

// Show banner with page content
export const WithPageContent: Story = {
  args: {
    environment: 'staging',
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div className="p-8 bg-discord-background-primary min-h-screen">
          <h1 className="text-2xl font-bold text-discord-text-normal mb-4">Page Content</h1>
          <p className="text-discord-text-muted">
            The staging banner appears at the top of the page to warn users they are in a test environment.
          </p>
        </div>
      </div>
    ),
  ],
};
