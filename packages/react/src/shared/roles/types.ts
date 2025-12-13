import type { RpgIconName } from '../atoms/RpgIcon';

/**
 * Platform-wide user roles
 *
 * These roles represent a user's capabilities across the entire platform,
 * complementing context-specific roles (campaign, party, adventure).
 * Users can have multiple platform roles simultaneously.
 */
export type PlatformRole =
  | 'gamer'
  | 'player'
  | 'trusted_player'
  | 'game_master'
  | 'assistant_gm'
  | 'spectator'
  | 'storyteller'
  | 'worldbuilder'
  | 'creator'
  | 'developer'
  | 'admin';

/**
 * Configuration for a platform role
 */
export interface PlatformRoleConfig {
  /** Role key identifier */
  key: PlatformRole;
  /** Human-readable label */
  label: string;
  /** Description of the role's purpose */
  description: string;
  /** Emoji representation */
  emoji: string;
  /** RPG Awesome icon name */
  icon: RpgIconName;
  /** Text/icon color (CSS color) */
  color: string;
  /** Background color with opacity (CSS color) */
  bgColor: string;
}

/**
 * Platform role configurations
 */
export const PLATFORM_ROLES: Record<PlatformRole, PlatformRoleConfig> = {
  admin: {
    key: 'admin',
    label: 'Admin',
    description: 'Platform admin with full access to all features',
    emoji: '👑',
    icon: 'crown',
    color: '#fbbf24', // gold
    bgColor: 'rgba(251, 191, 36, 0.2)',
  },
  developer: {
    key: 'developer',
    label: 'Developer',
    description: 'Creates development assets or develops PC games',
    emoji: '💻',
    icon: 'cog',
    color: '#5865f2', // blurple
    bgColor: 'rgba(88, 101, 242, 0.2)',
  },
  creator: {
    key: 'creator',
    label: 'Creator',
    description: 'Creates images, video, voice assets, and game content',
    emoji: '🎨',
    icon: 'forging',
    color: '#ec4899', // pink
    bgColor: 'rgba(236, 72, 153, 0.2)',
  },
  worldbuilder: {
    key: 'worldbuilder',
    label: 'Worldbuilder',
    description: 'Creates worlds, locations, creatures, and things within worlds',
    emoji: '🌍',
    icon: 'mountains',
    color: '#22c55e', // green
    bgColor: 'rgba(34, 197, 94, 0.2)',
  },
  storyteller: {
    key: 'storyteller',
    label: 'Storyteller',
    description: 'Writes story content for wiki and worldbuilding',
    emoji: '📖',
    icon: 'scroll-unfurled',
    color: '#8b5cf6', // purple
    bgColor: 'rgba(139, 92, 246, 0.2)',
  },
  game_master: {
    key: 'game_master',
    label: 'Game Master',
    description: 'TTRPG facilitator (DM/GM) who runs campaigns and sessions',
    emoji: '🎭',
    icon: 'book',
    color: '#f97316', // orange
    bgColor: 'rgba(249, 115, 22, 0.2)',
  },
  assistant_gm: {
    key: 'assistant_gm',
    label: 'Assistant GM',
    description: 'Assists the game master with platform-specific permissions',
    emoji: '🎪',
    icon: 'quill-ink',
    color: '#f59e0b', // amber
    bgColor: 'rgba(245, 158, 11, 0.2)',
  },
  trusted_player: {
    key: 'trusted_player',
    label: 'Trusted Player',
    description: 'TTRPG player with extra permissions on some platforms',
    emoji: '⭐',
    icon: 'player-king',
    color: '#3b82f6', // blue
    bgColor: 'rgba(59, 130, 246, 0.2)',
  },
  player: {
    key: 'player',
    label: 'Player',
    description: 'TTRPG player who participates in campaigns and parties',
    emoji: '🎮',
    icon: 'player',
    color: '#14b8a6', // teal
    bgColor: 'rgba(20, 184, 166, 0.2)',
  },
  gamer: {
    key: 'gamer',
    label: 'Gamer',
    description: 'PC/console gamer who plays games through the activity',
    emoji: '🕹️',
    icon: 'gamepad-cross',
    color: '#64748b', // blue-gray
    bgColor: 'rgba(100, 116, 139, 0.2)',
  },
  spectator: {
    key: 'spectator',
    label: 'Spectator',
    description: 'Watches games and streams without participating',
    emoji: '👁️',
    icon: 'eye-shield',
    color: '#6b7280', // gray
    bgColor: 'rgba(107, 114, 128, 0.2)',
  },
};

/**
 * Get the configuration for a platform role
 */
export function getPlatformRoleConfig(role: PlatformRole): PlatformRoleConfig {
  return PLATFORM_ROLES[role];
}

/**
 * Get all platform roles as an array
 */
export function getAllPlatformRoles(): PlatformRoleConfig[] {
  return Object.values(PLATFORM_ROLES);
}

/**
 * Check if a string is a valid platform role
 */
export function isPlatformRole(value: string): value is PlatformRole {
  return value in PLATFORM_ROLES;
}

/**
 * Campaign-eligible roles
 *
 * These are the platform roles that can be "assumed" in a campaign context.
 * Users select one of their owned eligible roles to participate in each campaign.
 */
export type CampaignEligibleRole =
  | 'game_master'
  | 'assistant_gm'
  | 'trusted_player'
  | 'player'
  | 'spectator';

/**
 * List of roles that can be assumed in a campaign
 */
export const CAMPAIGN_ELIGIBLE_ROLES: CampaignEligibleRole[] = [
  'game_master',
  'assistant_gm',
  'trusted_player',
  'player',
  'spectator',
];

/**
 * Check if a platform role can be used in a campaign
 */
export function isCampaignEligibleRole(role: PlatformRole): role is CampaignEligibleRole {
  return CAMPAIGN_ELIGIBLE_ROLES.includes(role as CampaignEligibleRole);
}

/**
 * Filter user's platform roles to only those eligible for campaigns
 */
export function getCampaignEligibleRoles(userRoles: PlatformRole[]): CampaignEligibleRole[] {
  return userRoles.filter(isCampaignEligibleRole);
}

/**
 * Get the highest-priority campaign role from a user's roles
 * Priority order: game_master > assistant_gm > trusted_player > player > spectator
 */
export function getDefaultCampaignRole(userRoles: PlatformRole[]): CampaignEligibleRole | null {
  const eligible = getCampaignEligibleRoles(userRoles);
  if (eligible.length === 0) return null;

  // Return first match in priority order
  for (const role of CAMPAIGN_ELIGIBLE_ROLES) {
    if (eligible.includes(role)) return role;
  }
  return null;
}

/**
 * User's role assignment in a specific campaign
 */
export interface CampaignRoleAssignment {
  /** The user's ID */
  userId: string;
  /** The campaign ID */
  campaignId: string;
  /** The role the user has assumed in this campaign */
  assumedRole: CampaignEligibleRole;
  /** All platform roles the user owns (for reference/switching) */
  ownedRoles: PlatformRole[];
}
