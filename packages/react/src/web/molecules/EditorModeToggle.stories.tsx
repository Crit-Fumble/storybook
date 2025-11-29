import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { EditorModeToggle, type EditorMode } from './EditorModeToggle';

const meta: Meta<typeof EditorModeToggle> = {
  title: 'Web/Molecules/EditorModeToggle',
  component: EditorModeToggle,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-4 bg-cfg-background-primary">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EditorModeToggle>;

function EditorModeToggleWrapper(props: React.ComponentProps<typeof EditorModeToggle>) {
  const [mode, setMode] = useState<EditorMode>(props.mode);
  return <EditorModeToggle {...props} mode={mode} onChange={setMode} />;
}

export const Default: Story = {
  render: (args) => <EditorModeToggleWrapper {...args} />,
  args: {
    mode: 'wysiwyg',
  },
};

export const MarkdownSelected: Story = {
  render: (args) => <EditorModeToggleWrapper {...args} />,
  args: {
    mode: 'markdown',
  },
};

export const ThreeModes: Story = {
  render: (args) => <EditorModeToggleWrapper {...args} />,
  args: {
    mode: 'wysiwyg',
    modes: ['wysiwyg', 'markdown', 'preview'],
  },
};

export const Disabled: Story = {
  render: (args) => <EditorModeToggleWrapper {...args} />,
  args: {
    mode: 'wysiwyg',
    disabled: true,
  },
};
