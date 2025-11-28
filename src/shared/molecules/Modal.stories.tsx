import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal, ModalFooter } from './Modal';
import { Button } from '../atoms';

const meta: Meta<typeof Modal> = {
  title: 'Shared/Molecules/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isOpen: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: 'Modal Title',
    children: <p className="text-discord-text-normal">This is the modal content.</p>,
  },
};

export const Small: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: 'Small Modal',
    size: 'sm',
    children: <p className="text-discord-text-normal">A compact modal for simple confirmations.</p>,
  },
};

export const Large: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: 'Large Modal',
    size: 'lg',
    children: (
      <div className="text-discord-text-normal">
        <p>A larger modal for more complex content.</p>
        <p className="mt-2 text-discord-text-muted">
          This size is great for forms, detailed information, or multi-step processes.
        </p>
      </div>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: 'Confirm Action',
    children: (
      <>
        <p className="text-discord-text-normal">Are you sure you want to delete this item?</p>
        <ModalFooter>
          <Button variant="secondary">Cancel</Button>
          <Button variant="danger">Delete</Button>
        </ModalFooter>
      </>
    ),
  },
};

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Interactive Modal"
        >
          <p className="text-discord-text-normal">
            Click the X button or press Escape to close this modal.
          </p>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};
