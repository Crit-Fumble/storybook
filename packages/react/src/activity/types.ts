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
  VoiceSession,
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
  // Schedule/Party types
  Party,
  PartySchedule,
  PartyMember,
  PartyMemberRole,
  ScheduleOccurrence,
  // Adventure types
  Adventure,
  AdventureSummary,
  AdventureStatus,
  AdventureRole,
  AdventureMessageType,
  AdventurePlayer,
  AdventureMessage as AdventureMessageData,
  // Game content types
  RandomTableEntry,
  GameRandomTable,
  DialogueNode,
  DialogueResponse,
  GameDialogueTree,
  BehaviorCondition,
  GameScriptedBehavior,
  // Combat types (v10.22+)
  Combat,
  Combatant,
  InitiativeEntry,
  InitiativeState,
  DamageType,
  // Economy types (v10.22+)
  EconomyTransactionType,
  EconomyCurrency,
  EconomyTransactionStatus,
  EconomyPayoutStatus,
  EconomyPayoutMethod,
  UserWallet,
  EconomyTransaction,
  EconomyPayout,
  EconomyStats,
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

// Channel KB Source types
export type ChannelKBType = 'text' | 'forum' | 'thread';

export interface ChannelKBSource {
  id: string;
  guildId: string;
  channelId: string;
  channelName: string | null;
  channelType: ChannelKBType;
  name: string;
  description: string | null;
  category: string;
  syncEnabled: boolean;
  syncThreads: boolean;
  syncPinned: boolean;
  maxMessages: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  lastSyncAt: Date | null;
  lastSyncStatus: 'success' | 'error' | 'partial' | null;
  lastSyncError: string | null;
}

export interface ChannelKBChannel {
  id: string;
  name: string;
  type: 'text' | 'forum' | 'thread';
  category?: string;
  isConfigured?: boolean;
}
