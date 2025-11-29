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
  Campaign,
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
  // Voice
  VoiceStatusResponse,
  VoiceSessionsResponse,
  VoiceJoinRequest,
  VoiceJoinResponse,
  VoiceLeaveRequest,
  VoicePlayRequest,
  VoiceListenStartRequest,
  VoiceSuccessResponse,
  // Container API
  ContainerStartRequest,
  ContainerStartResponse,
  ContainerStopRequest,
  ContainerStopResponse,
  ContainerStatusResponse,
  ContainerExecRequest,
  ContainerExecResponse,
} from '@crit-fumble/core/types';

// Simplified campaign type for VTT launcher UI
// Uses subset of Campaign fields needed for container management
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

// Chat types (UI-specific)
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
