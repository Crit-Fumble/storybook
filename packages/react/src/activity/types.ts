// Shared types for FumbleBot Activity components
// Re-export common types from @crit-fumble/core

// Core types - re-exported for convenience
export type {
  ContainerStatus,
  DiscordChannel,
  DiscordRole,
  ChannelLinks,
  BotSettings,
  Campaign as CoreCampaign,
  FoundrySystemRecord,
  GameSession,
  SessionStatus,
  CampaignMember,
  CharacterType,
  Character,
} from '@crit-fumble/core/types';

// UI-specific campaign type (extends core with display fields)
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

// Simplified types for UI components
export interface FumbleCampaign {
  id: string;
  guildId: string;
  name: string;
  description?: string;
  foundrySystemId?: string;
  containerId?: string;
  containerPort?: number;
  containerStatus: import('@crit-fumble/core/types').ContainerStatus;
  lastActiveAt?: Date;
}

export interface FoundrySystem {
  id: string;
  title: string;
  version?: string;
}

// Chat types (UI-specific)
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
