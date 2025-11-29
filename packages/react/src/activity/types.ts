// Shared types for FumbleBot Activity components
// Re-export common types from @crit-fumble/core

// Core types - re-exported for convenience
export type {
  // User & Auth
  DiscordUser,
  User,
  Guild,
  DiscordContext,
  DiscordAuth,
  // Discord config
  DiscordChannel,
  DiscordRole,
  ChannelLinks,
  BotSettings,
  GuildSettings,
  // Campaign & Session
  ContainerStatus,
  CampaignStatus,
  Campaign as CoreCampaign,
  CampaignMember,
  CharacterType,
  Character,
  SessionStatus,
  GameSession,
  MessageType,
  SessionMessage,
  // Assets
  AssetType,
  Asset,
  WorldSnapshot,
  // Foundry
  FoundrySystemRecord,
  DiscordGuild,
  // Activity
  UserActivity,
} from '@crit-fumble/core/types';

// UI-specific campaign type (extends core Campaign with systemTitle for display)
// Note: Core Campaign now includes status and systemTitle fields as of v9.0.2
export interface Campaign {
  id: string;
  name: string;
  systemId: string;
  systemTitle: string;
  description: string | null;
  guildId: string;
  status: import('@crit-fumble/core/types').CampaignStatus;
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
