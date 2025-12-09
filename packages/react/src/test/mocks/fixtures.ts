/**
 * Test fixtures and mock factories based on @crit-fumble/core types
 */

import type {
  Campaign,
  CampaignMember,
  CampaignStatus,
  ContainerStatus,
  FoundrySystemRecord,
  GuildConfig,
  AdminGameSystem,
  AdminGameIntegration,
  AdminSystemIntegration,
  AdminIntegrationSystem,
  AdminSystemIntegrationLink,
} from '@crit-fumble/core/dist/types';

/**
 * Create a mock campaign member
 */
export function createMockCampaignMember(
  overrides: Partial<CampaignMember> = {}
): CampaignMember {
  return {
    username: 'TestPlayer',
    role: 'player',
    foundryUserId: undefined,
    joinedAt: new Date().toISOString(),
    ...overrides,
  };
}

/**
 * Create a mock campaign
 */
export function createMockCampaign(
  overrides: Partial<Campaign> = {}
): Campaign {
  const now = new Date();
  return {
    id: 'campaign-1',
    guildId: 'guild-123',
    name: 'Test Campaign',
    description: 'A test campaign',
    status: 'active' as CampaignStatus,
    foundrySystemId: 'dnd5e',
    systemTitle: 'D&D 5e',
    worldAnvilWorldId: null,
    worldAnvilWorldName: null,
    worldAnvilWorldUrl: null,
    worldAnvilNotebookId: null,
    members: {
      'user-1': createMockCampaignMember(),
    },
    roleMappings: {},
    containerId: null,
    containerPort: null,
    containerStatus: 'stopped' as ContainerStatus,
    lastActiveAt: null,
    createdBy: 'user-1',
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

/**
 * Create a mock Foundry system
 */
export function createMockFoundrySystem(
  overrides: Partial<FoundrySystemRecord> = {}
): FoundrySystemRecord {
  const now = new Date();
  return {
    id: 'system-1',
    systemId: 'dnd5e',
    title: 'Dungeons & Dragons 5th Edition',
    description: 'The fifth edition of the world\'s oldest fantasy roleplaying game',
    version: '2.4.1',
    manifestUrl: 'https://example.com/manifest.json',
    compatibility: {
      minimum: '11',
      verified: '12',
      maximum: '12',
    },
    authors: [
      {
        name: 'Atropos',
        url: 'https://foundryvtt.com',
      },
    ],
    iconUrl: 'https://example.com/icon.png',
    isEnabled: true,
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

/**
 * Create a mock guild config
 */
export function createMockGuildConfig(
  overrides: Partial<GuildConfig> = {}
): GuildConfig {
  return {
    id: 'config-1',
    guildId: 'guild-123',
    prefix: '!',
    language: 'en',
    timezone: 'America/New_York',
    allowDMs: true,
    diceRolling: true,
    voiceCommands: false,
    aiAssistant: true,
    knowledgeBase: true,
    scheduling: true,
    aiModel: 'gpt-4',
    aiTemperature: 0.7,
    maxTokens: 2000,
    customSettings: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

/**
 * Create multiple mock campaigns
 */
export function createMockCampaigns(count: number): Campaign[] {
  return Array.from({ length: count }, (_, i) =>
    createMockCampaign({
      id: `campaign-${i + 1}`,
      name: `Campaign ${i + 1}`,
    })
  );
}

/**
 * Create multiple mock Foundry systems
 */
export function createMockFoundrySystems(count: number): FoundrySystemRecord[] {
  const systems = [
    { systemId: 'dnd5e', title: 'D&D 5e' },
    { systemId: 'pf2e', title: 'Pathfinder 2e' },
    { systemId: 'swade', title: 'Savage Worlds' },
    { systemId: 'coc7', title: 'Call of Cthulhu 7th Ed' },
    { systemId: 'forbidden-lands', title: 'Forbidden Lands' },
  ];

  return Array.from({ length: count }, (_, i) =>
    createMockFoundrySystem({
      id: `system-${i + 1}`,
      systemId: systems[i % systems.length].systemId,
      title: systems[i % systems.length].title,
      sortOrder: i + 1,
    })
  );
}

/**
 * Mock Discord user
 */
export interface MockDiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  globalName: string | null;
}

/**
 * Create a mock Discord user
 */
export function createMockDiscordUser(
  overrides: Partial<MockDiscordUser> = {}
): MockDiscordUser {
  return {
    id: 'user-123',
    username: 'TestUser',
    discriminator: '1234',
    avatar: 'avatar-hash',
    globalName: 'Test User',
    ...overrides,
  };
}

/**
 * Create a mock admin system integration
 */
export function createMockAdminSystemIntegration(
  overrides: Partial<AdminSystemIntegration> = {}
): AdminSystemIntegration {
  return {
    id: 'sys-int-1',
    integrationId: 'integration-1',
    integrationSlug: 'foundry-vtt',
    integrationName: 'Foundry VTT',
    platformSystemId: 'dnd5e',
    manifestUrl: 'https://example.com/systems/dnd5e/manifest.json',
    settings: {},
    ...overrides,
  };
}

/**
 * Create a mock admin integration system
 */
export function createMockAdminIntegrationSystem(
  overrides: Partial<AdminIntegrationSystem> = {}
): AdminIntegrationSystem {
  return {
    id: 'int-sys-1',
    systemId: 'system-1',
    systemSlug: 'dnd5e',
    systemName: 'D&D 5e',
    platformSystemId: 'dnd5e',
    manifestUrl: 'https://example.com/systems/dnd5e/manifest.json',
    settings: {},
    ...overrides,
  };
}

/**
 * Create a mock admin game system
 */
export function createMockAdminGameSystem(
  overrides: Partial<AdminGameSystem> = {}
): AdminGameSystem {
  return {
    id: 'system-1',
    slug: 'dnd5e',
    name: 'D&D 5e',
    type: 'tabletop',
    publisher: 'Wizards of the Coast',
    description: 'The fifth edition of the world\'s oldest fantasy roleplaying game',
    iconUrl: 'https://example.com/icons/dnd5e.png',
    genres: ['Fantasy', 'Adventure'],
    isEnabled: true,
    sortOrder: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    integrations: [],
    ...overrides,
  };
}

/**
 * Create a mock admin game integration
 */
export function createMockAdminGameIntegration(
  overrides: Partial<AdminGameIntegration> = {}
): AdminGameIntegration {
  return {
    id: 'integration-1',
    slug: 'foundry-vtt',
    name: 'Foundry VTT',
    websiteUrl: 'https://foundryvtt.com',
    iconUrl: 'https://example.com/icons/foundry.png',
    hasOAuth: false,
    hasApi: true,
    hasContainers: true,
    hasSheets: true,
    hasVtt: true,
    isEnabled: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    systems: [],
    ...overrides,
  };
}

/**
 * Create a mock admin system integration link
 */
export function createMockAdminSystemIntegrationLink(
  overrides: Partial<AdminSystemIntegrationLink> = {}
): AdminSystemIntegrationLink {
  return {
    id: 'link-1',
    systemId: 'system-1',
    systemSlug: 'dnd5e',
    systemName: 'D&D 5e',
    integrationId: 'integration-1',
    integrationSlug: 'foundry-vtt',
    integrationName: 'Foundry VTT',
    platformSystemId: 'dnd5e',
    manifestUrl: 'https://example.com/systems/dnd5e/manifest.json',
    settings: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

/**
 * Create multiple mock admin game systems
 */
export function createMockAdminGameSystems(count: number): AdminGameSystem[] {
  const systems = [
    { slug: 'dnd5e', name: 'D&D 5e', type: 'tabletop', publisher: 'Wizards of the Coast' },
    { slug: 'pf2e', name: 'Pathfinder 2e', type: 'tabletop', publisher: 'Paizo' },
    { slug: 'swade', name: 'Savage Worlds', type: 'tabletop', publisher: 'Pinnacle Entertainment' },
    { slug: 'coc7', name: 'Call of Cthulhu 7th Ed', type: 'tabletop', publisher: 'Chaosium' },
    { slug: 'forbidden-lands', name: 'Forbidden Lands', type: 'tabletop', publisher: 'Free League' },
  ];

  return Array.from({ length: count }, (_, i) =>
    createMockAdminGameSystem({
      id: `system-${i + 1}`,
      slug: systems[i % systems.length].slug,
      name: systems[i % systems.length].name,
      type: systems[i % systems.length].type,
      publisher: systems[i % systems.length].publisher,
      sortOrder: i + 1,
    })
  );
}

/**
 * Create multiple mock admin game integrations
 */
export function createMockAdminGameIntegrations(count: number): AdminGameIntegration[] {
  const integrations = [
    { slug: 'foundry-vtt', name: 'Foundry VTT' },
    { slug: 'roll20', name: 'Roll20' },
    { slug: 'world-anvil', name: 'World Anvil' },
    { slug: 'dnd-beyond', name: 'D&D Beyond' },
    { slug: 'fantasy-grounds', name: 'Fantasy Grounds' },
  ];

  return Array.from({ length: count }, (_, i) =>
    createMockAdminGameIntegration({
      id: `integration-${i + 1}`,
      slug: integrations[i % integrations.length].slug,
      name: integrations[i % integrations.length].name,
      sortOrder: i + 1,
    })
  );
}
