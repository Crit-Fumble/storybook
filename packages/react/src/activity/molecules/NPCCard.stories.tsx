import type { Meta, StoryObj } from '@storybook/react';
import { NPCCard } from './NPCCard';

const meta = {
  title: 'Activity/Molecules/NPCCard',
  component: NPCCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSave: { action: 'saved' },
    onEdit: { action: 'edited' },
    onUse: { action: 'used' },
    onToggleSecret: { action: 'toggleSecret' },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NPCCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Bartender Bob',
  },
};

export const FullNPC: Story = {
  args: {
    name: 'Eliza Thornwood',
    race: 'Half-Elf',
    occupation: 'Herbalist',
    description: 'A weathered woman with knowing eyes and dirt-stained fingers.',
    traits: ['Cautious', 'Knowledgeable', 'Secretive'],
    quirk: 'Always smells faintly of lavender and grave soil.',
    quote: "Every poison is just medicine in the wrong hands.",
    secret: 'She once served as court poisoner to the old king.',
    avatarUrl: 'https://i.pravatar.cc/150?u=eliza',
  },
};

export const TavernKeeper: Story = {
  args: {
    name: 'Grimjaw Ironbelly',
    race: 'Dwarf',
    occupation: 'Tavern Owner',
    description: 'A gruff but fair dwarven innkeeper with a legendary beard.',
    traits: ['Gruff', 'Fair', 'Protective'],
    quirk: 'Polishes the same mug obsessively when nervous.',
    quote: "What happens in my tavern stays in my tavern. Unless you break something.",
    avatarUrl: 'https://i.pravatar.cc/150?u=grimjaw',
  },
};

export const MysteriousStranger: Story = {
  args: {
    name: 'The Hooded Figure',
    race: 'Unknown',
    occupation: 'Information Broker',
    description: 'A shadowy figure who always sits in the darkest corner.',
    traits: ['Enigmatic', 'Well-connected', 'Paranoid'],
    quirk: 'Never shows their face and speaks in whispers.',
    quote: "Information is the only currency that matters.",
    secret: 'They are actually three halflings in a trench coat.',
  },
};

export const WithSecretRevealed: Story = {
  args: {
    name: 'Merchant Marcus',
    race: 'Human',
    occupation: 'Traveling Merchant',
    description: 'A jolly merchant with an easy smile and quick wit.',
    traits: ['Charming', 'Shrewd', 'Opportunistic'],
    quirk: 'Constantly adjusts his hat.',
    quote: "I have exactly what you need, friend!",
    secret: 'He is a spy for the thieves guild, using his cart to move stolen goods.',
    showSecret: true,
    avatarUrl: 'https://i.pravatar.cc/150?u=marcus',
  },
};

export const Saved: Story = {
  args: {
    name: 'Favorite NPC',
    race: 'Tiefling',
    occupation: 'Fortune Teller',
    traits: ['Mystical', 'Dramatic'],
    isSaved: true,
    onSave: () => {},
    avatarUrl: 'https://i.pravatar.cc/150?u=fortune',
  },
};

export const WithAllActions: Story = {
  args: {
    name: 'Interactive NPC',
    race: 'Gnome',
    occupation: 'Inventor',
    description: 'A wild-haired gnome surrounded by clanking contraptions.',
    traits: ['Eccentric', 'Brilliant', 'Forgetful'],
    quirk: 'Talks to their inventions like they are pets.',
    quote: "It is not a malfunction, it is a feature!",
    secret: 'Their inventions are powered by trapped elementals.',
    onSave: () => console.log('Saved'),
    onEdit: () => console.log('Edited'),
    onUse: () => console.log('Used'),
    onToggleSecret: () => console.log('Toggle secret'),
    avatarUrl: 'https://i.pravatar.cc/150?u=inventor',
  },
};

export const Loading: Story = {
  args: {
    name: 'Loading NPC',
    race: 'Elf',
    occupation: 'Ranger',
    onSave: () => {},
    onEdit: () => {},
    onUse: () => {},
    isLoading: true,
  },
};

export const MinimalNPC: Story = {
  args: {
    name: 'Guard #3',
    occupation: 'City Guard',
    traits: ['Alert'],
    quote: "Move along, citizen.",
  },
};

export const NoAvatar: Story = {
  args: {
    name: 'Nameless Beggar',
    race: 'Human',
    occupation: 'Beggar',
    description: 'A disheveled figure huddled in the alley.',
    traits: ['Observant', 'Streetwise'],
    quirk: 'Knows everyone by name.',
    secret: 'Former spymaster for the crown.',
  },
};

export const NPCGallery: StoryObj<typeof NPCCard> = {
  render: () => (
    <div className="space-y-4 w-96">
      <NPCCard
        name="Captain Helena"
        race="Human"
        occupation="Ship Captain"
        traits={['Bold', 'Superstitious']}
        quirk="Refuses to sail on Tuesdays."
        avatarUrl="https://i.pravatar.cc/150?u=helena"
        onSave={() => {}}
        onUse={() => {}}
      />
      <NPCCard
        name="Old Zephyr"
        race="Dragonborn"
        occupation="Retired Adventurer"
        traits={['Nostalgic', 'Grumpy']}
        quote="Back in my day, we fought REAL dragons!"
        avatarUrl="https://i.pravatar.cc/150?u=zephyr"
        onSave={() => {}}
        isSaved
      />
      <NPCCard
        name="The Twins"
        race="Halfling"
        occupation="Street Performers"
        traits={['Mischievous', 'Charming']}
        quirk="Always finish each others sentences."
        secret="Master pickpockets working for the guild."
        onToggleSecret={() => {}}
      />
    </div>
  ),
};
