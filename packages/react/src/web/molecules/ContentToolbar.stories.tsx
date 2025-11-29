import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ContentToolbar } from './ContentToolbar';

const meta: Meta<typeof ContentToolbar> = {
  title: 'Web/Molecules/ContentToolbar',
  component: ContentToolbar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-cfg-background-primary">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ContentToolbar>;

export const ViewMode: Story = {
  args: {
    title: 'Getting Started Guide',
    subtitle: '/getting-started',
    metadata: 'Created by John Doe · Last edited by Jane Smith',
    canEdit: true,
    canDelete: true,
    onEdit: () => alert('Edit clicked'),
    onDelete: () => alert('Delete clicked'),
  },
};

export const EditMode: Story = {
  render: () => {
    const [title, setTitle] = useState('Getting Started Guide');
    return (
      <ContentToolbar
        title="Getting Started Guide"
        subtitle="/getting-started"
        isEditing
        editTitle={title}
        onTitleChange={setTitle}
        onSave={() => alert('Save clicked')}
        onCancel={() => alert('Cancel clicked')}
      />
    );
  },
};

export const Saving: Story = {
  args: {
    title: 'Getting Started Guide',
    subtitle: '/getting-started',
    isEditing: true,
    editTitle: 'Getting Started Guide',
    saving: true,
    onSave: () => {},
    onCancel: () => {},
  },
};

export const ReadOnly: Story = {
  args: {
    title: 'Getting Started Guide',
    subtitle: '/getting-started',
    metadata: 'Created by John Doe',
    canEdit: false,
    canDelete: false,
  },
};

export const EditOnly: Story = {
  args: {
    title: 'Getting Started Guide',
    subtitle: '/getting-started',
    canEdit: true,
    canDelete: false,
    onEdit: () => alert('Edit clicked'),
  },
};

export const Deleting: Story = {
  args: {
    title: 'Getting Started Guide',
    subtitle: '/getting-started',
    canEdit: true,
    canDelete: true,
    deleting: true,
    onEdit: () => {},
    onDelete: () => {},
  },
};

export const NoSubtitle: Story = {
  args: {
    title: 'Quick Note',
    canEdit: true,
    onEdit: () => alert('Edit clicked'),
  },
};
