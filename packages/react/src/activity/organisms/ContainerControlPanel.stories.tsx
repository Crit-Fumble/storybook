import type { Meta, StoryObj } from '@storybook/react';
import { ContainerControlPanel, type ContainerInfo } from './ContainerControlPanel';

const meta: Meta<typeof ContainerControlPanel> = {
  title: 'Activity/Organisms/ContainerControlPanel',
  component: ContainerControlPanel,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-cfg-background-primary min-h-screen">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ContainerControlPanel>;

const createContainer = (
  id: string,
  campaignId: string,
  campaignName: string,
  status: 'stopped' | 'starting' | 'running' | 'error'
): ContainerInfo => ({
  id,
  campaignId,
  campaignName,
  status,
  containerId: status === 'running' ? `container-${id}` : null,
  containerPort: status === 'running' ? 30000 + parseInt(id) : null,
  lastActiveAt: status === 'running' ? new Date(Date.now() - Math.random() * 3600000) : null,
});

const mixedContainers: ContainerInfo[] = [
  createContainer('1', 'campaign-1', 'Dragon Quest', 'running'),
  createContainer('2', 'campaign-2', 'Sword Coast Adventure', 'stopped'),
  createContainer('3', 'campaign-3', 'Curse of Strahd', 'starting'),
  createContainer('4', 'campaign-4', 'Lost Mine of Phandelver', 'error'),
  createContainer('5', 'campaign-5', 'Tomb of Annihilation', 'running'),
];

export const Default: Story = {
  args: {
    containers: mixedContainers,
    onStart: (id) => alert(`Start: ${id}`),
    onStop: (id) => alert(`Stop: ${id}`),
    onRestart: (id) => alert(`Restart: ${id}`),
    onStopAll: () => alert('Stop All'),
  },
};

export const Empty: Story = {
  args: {
    containers: [],
    onStart: (id) => alert(`Start: ${id}`),
  },
};

export const AllRunning: Story = {
  args: {
    containers: [
      createContainer('1', 'c-1', 'Campaign Alpha', 'running'),
      createContainer('2', 'c-2', 'Campaign Beta', 'running'),
      createContainer('3', 'c-3', 'Campaign Gamma', 'running'),
    ],
    onStop: (id) => alert(`Stop: ${id}`),
    onRestart: (id) => alert(`Restart: ${id}`),
    onStopAll: () => alert('Stop All'),
  },
};

export const AllStopped: Story = {
  args: {
    containers: [
      createContainer('1', 'c-1', 'Campaign Alpha', 'stopped'),
      createContainer('2', 'c-2', 'Campaign Beta', 'stopped'),
      createContainer('3', 'c-3', 'Campaign Gamma', 'stopped'),
    ],
    onStart: (id) => alert(`Start: ${id}`),
  },
};

export const WithErrors: Story = {
  args: {
    containers: [
      createContainer('1', 'c-1', 'Healthy Campaign', 'running'),
      createContainer('2', 'c-2', 'Failed Campaign 1', 'error'),
      createContainer('3', 'c-3', 'Failed Campaign 2', 'error'),
    ],
    onStart: (id) => alert(`Start: ${id}`),
    onStop: (id) => alert(`Stop: ${id}`),
    onStopAll: () => alert('Stop All'),
  },
};

export const LoadingState: Story = {
  args: {
    containers: [
      createContainer('1', 'c-1', 'Campaign Alpha', 'stopped'),
      createContainer('2', 'c-2', 'Campaign Beta', 'stopped'),
    ],
    onStart: (id) => alert(`Start: ${id}`),
    loadingContainerId: 'c-1',
  },
};

export const StoppingAll: Story = {
  args: {
    containers: [
      createContainer('1', 'c-1', 'Campaign Alpha', 'running'),
      createContainer('2', 'c-2', 'Campaign Beta', 'running'),
    ],
    onStop: (id) => alert(`Stop: ${id}`),
    onStopAll: () => {},
    isStoppingAll: true,
  },
};

export const SingleContainer: Story = {
  args: {
    containers: [createContainer('1', 'c-1', 'My Only Campaign', 'running')],
    onStop: (id) => alert(`Stop: ${id}`),
    onRestart: (id) => alert(`Restart: ${id}`),
    showStopAll: false,
  },
};
