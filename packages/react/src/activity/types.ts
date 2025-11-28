// Shared types for FumbleBot Activity components

export type ContainerStatus = 'stopped' | 'starting' | 'running' | 'error';

export interface FumbleCampaign {
  id: string;
  guildId: string;
  name: string;
  description?: string;
  foundrySystemId?: string;
  containerId?: string;
  containerPort?: number;
  containerStatus: ContainerStatus;
  lastActiveAt?: Date;
}
