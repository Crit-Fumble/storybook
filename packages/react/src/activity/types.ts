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

// Campaign types
export type CampaignStatus = 'active' | 'paused' | 'completed' | 'archived';

export interface Campaign {
  id: string;
  name: string;
  systemId: string;
  systemTitle: string;
  description: string | null;
  guildId: string;
  status: CampaignStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface FoundrySystem {
  id: string;
  title: string;
  version?: string;
}

// Discord types
export interface DiscordChannel {
  id: string;
  name: string;
  type: number; // 0 = text, 2 = voice
}

export interface DiscordRole {
  id: string;
  name: string;
  color: number;
  managed: boolean;
}

// Settings types
export interface ChannelLinks {
  ic: string;
  ooc: string;
  dice: string;
  gm: string;
  announce: string;
  voice: string;
}

export interface BotSettings {
  autoLogIC: boolean;
  defaultMode: string;
  diceNotify: boolean;
  autoSession: boolean;
  reminderTime: number;
}

// Chat types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
