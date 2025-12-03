import type { Meta, StoryObj } from '@storybook/react';
import { DiscordEmbed } from './DiscordEmbed';

const meta = {
  title: 'Activity/Molecules/DiscordEmbed',
  component: DiscordEmbed,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[480px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DiscordEmbed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Embed Title',
    description: 'This is a basic Discord-style embed with a title and description.',
  },
};

export const WithColor: Story = {
  args: {
    title: 'Colored Embed',
    description: 'This embed has a custom accent color.',
    color: '#5865f2',
  },
};

export const WithDecimalColor: Story = {
  args: {
    title: 'Discord API Color',
    description: 'Discord sends colors as decimal numbers. This uses 5793266 (Discord blue).',
    color: 5793266,
  },
};

export const WithAuthor: Story = {
  args: {
    author: 'FumbleBot',
    authorIcon: 'https://i.pravatar.cc/150?u=fumblebot',
    authorUrl: 'https://fumblebot.crit-fumble.com',
    title: 'Roll Result',
    description: 'The bot rolled some dice!',
    color: '#552e66',
  },
};

export const WithThumbnail: Story = {
  args: {
    title: 'Character Sheet',
    description: 'Thorin Ironforge, Level 5 Dwarf Fighter',
    thumbnail: 'https://i.pravatar.cc/150?u=thorin',
    color: '#248046',
  },
};

export const WithImage: Story = {
  args: {
    title: 'Battle Map',
    description: 'The party enters the dungeon...',
    image: 'https://picsum.photos/400/200',
    color: '#da373c',
  },
};

export const WithFields: Story = {
  args: {
    title: 'Roll Result: Attack',
    description: 'Thorin attacks the goblin!',
    color: '#f0b232',
    fields: [
      { name: 'Attack Roll', value: '**18** (d20: 13 + 5)', inline: true },
      { name: 'Damage', value: '**12** (2d6 + 4)', inline: true },
      { name: 'Result', value: '**HIT!** The goblin takes 12 slashing damage.', inline: false },
    ],
  },
};

export const WithFooter: Story = {
  args: {
    title: 'Session Reminder',
    description: 'Your next game session is coming up!',
    footer: 'Campaign: The Dragon of Icespire Peak',
    footerIcon: 'https://i.pravatar.cc/150?u=campaign',
    timestamp: new Date(),
    color: '#5865f2',
  },
};

export const FullEmbed: Story = {
  args: {
    author: 'FumbleBot',
    authorIcon: 'https://i.pravatar.cc/150?u=fumblebot',
    authorUrl: 'https://fumblebot.crit-fumble.com',
    title: 'Critical Hit!',
    url: 'https://crit-fumble.com',
    description: 'Elara Moonwhisper lands a devastating blow against the Hobgoblin Captain!',
    color: '#248046',
    thumbnail: 'https://i.pravatar.cc/150?u=elara',
    fields: [
      { name: 'Attack Roll', value: '**Natural 20!**', inline: true },
      { name: 'Damage', value: '**24** (4d6 + 4)', inline: true },
      { name: 'Target HP', value: '15/39', inline: true },
      { name: 'Special Effect', value: 'The hobgoblin is staggered and loses its next reaction.', inline: false },
    ],
    image: 'https://picsum.photos/400/150',
    footer: 'Round 3 of Combat',
    footerIcon: 'https://i.pravatar.cc/150?u=combat',
    timestamp: new Date(),
  },
};

export const DiceRoll: Story = {
  args: {
    author: 'Dice Roller',
    authorIcon: 'https://i.pravatar.cc/150?u=dice',
    title: '2d20kh1 + 5',
    description: '**Result: 23**',
    color: '#552e66',
    fields: [
      { name: 'Rolls', value: '~~8~~, **18**', inline: true },
      { name: 'Modifier', value: '+5', inline: true },
      { name: 'Total', value: '23', inline: true },
    ],
    footer: 'Rolled by Thorin',
    timestamp: new Date(),
  },
};

export const ErrorEmbed: Story = {
  args: {
    title: 'Error',
    description: 'Something went wrong while processing your request.',
    color: '#da373c',
    fields: [
      { name: 'Error Code', value: 'INVALID_ROLL', inline: true },
      { name: 'Details', value: 'The dice notation "2d0" is invalid.', inline: false },
    ],
    footer: 'Please check your input and try again.',
  },
};

export const SuccessEmbed: Story = {
  args: {
    title: 'Character Saved',
    description: 'Your character has been saved successfully.',
    color: '#248046',
    thumbnail: 'https://i.pravatar.cc/150?u=character',
    fields: [
      { name: 'Name', value: 'Gandalf the Grey', inline: true },
      { name: 'Class', value: 'Wizard (Level 20)', inline: true },
    ],
    footer: 'Last updated',
    timestamp: new Date(),
  },
};

export const WarningEmbed: Story = {
  args: {
    title: 'Session Starting Soon',
    description: 'Your game session begins in 15 minutes!',
    color: '#f0b232',
    fields: [
      { name: 'Campaign', value: 'Curse of Strahd', inline: true },
      { name: 'Time', value: '7:00 PM EST', inline: true },
    ],
    footer: 'Click to join the voice channel',
  },
};

export const DescriptionOnly: Story = {
  args: {
    description: 'This is a simple embed with just a description. It works great for quick messages or notes.',
    color: '#552e66',
  },
};

export const InlineFields: Story = {
  args: {
    title: 'Party Stats',
    color: '#5865f2',
    fields: [
      { name: 'Thorin', value: 'HP: 65/65', inline: true },
      { name: 'Elara', value: 'HP: 45/52', inline: true },
      { name: 'Gandalf', value: 'HP: 78/78', inline: true },
      { name: 'Frodo', value: 'HP: 28/35', inline: true },
      { name: 'Legolas', value: 'HP: 55/55', inline: true },
      { name: 'Gimli', value: 'HP: 72/80', inline: true },
    ],
  },
};

export const EmbedGallery: StoryObj<typeof DiscordEmbed> = {
  render: () => (
    <div className="space-y-4 w-[480px]">
      <DiscordEmbed
        title="Roll Result"
        description="**18** (d20 + 5)"
        color="#552e66"
        footer="Rolled by Thorin"
        timestamp={new Date()}
      />
      <DiscordEmbed
        title="Initiative Order"
        color="#5865f2"
        fields={[
          { name: '21', value: 'Elara', inline: true },
          { name: '18', value: 'Thorin', inline: true },
          { name: '15', value: 'Goblin', inline: true },
        ]}
      />
      <DiscordEmbed
        author="Session Log"
        authorIcon="https://i.pravatar.cc/150?u=log"
        description="The party defeated the goblin ambush and found a mysterious map leading to the old ruins."
        color="#248046"
        footer="Session 5"
        timestamp={new Date()}
      />
    </div>
  ),
};
