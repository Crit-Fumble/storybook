import type { Meta, StoryObj } from '@storybook/react';
import { RpgIcon, RpgIconGroups, type RpgIconName } from './RpgIcon';

const meta = {
  title: 'Shared/Atoms/RpgIcon',
  component: RpgIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'select',
      options: ['sword', 'axe', 'dragon', 'potion', 'crystal-ball', 'shield', 'dice-six', 'health'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', '2x', '3x', '4x', '5x'],
    },
    color: {
      control: 'color',
    },
  },
} satisfies Meta<typeof RpgIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: 'sword',
  },
};

export const Dragon: Story = {
  args: {
    icon: 'dragon',
    size: '3x',
    color: '#da373c',
  },
};

export const AllSizes: StoryObj<typeof RpgIcon> = {
  render: () => (
    <div className="flex items-end gap-4 text-cfg-text-normal">
      <div className="text-center">
        <RpgIcon icon="sword" size="sm" />
        <div className="text-xs mt-1">sm</div>
      </div>
      <div className="text-center">
        <RpgIcon icon="sword" size="md" />
        <div className="text-xs mt-1">md</div>
      </div>
      <div className="text-center">
        <RpgIcon icon="sword" size="lg" />
        <div className="text-xs mt-1">lg</div>
      </div>
      <div className="text-center">
        <RpgIcon icon="sword" size="2x" />
        <div className="text-xs mt-1">2x</div>
      </div>
      <div className="text-center">
        <RpgIcon icon="sword" size="3x" />
        <div className="text-xs mt-1">3x</div>
      </div>
      <div className="text-center">
        <RpgIcon icon="sword" size="4x" />
        <div className="text-xs mt-1">4x</div>
      </div>
      <div className="text-center">
        <RpgIcon icon="sword" size="5x" />
        <div className="text-xs mt-1">5x</div>
      </div>
    </div>
  ),
};

export const Spinning: Story = {
  args: {
    icon: 'cog',
    size: '3x',
    spin: true,
  },
};

export const FixedWidth: StoryObj<typeof RpgIcon> = {
  render: () => (
    <div className="text-cfg-text-normal">
      <div className="mb-4">
        <h3 className="text-sm mb-2 text-cfg-text-muted">Without fixed width:</h3>
        <div className="space-y-1">
          <div><RpgIcon icon="sword" /> Sword</div>
          <div><RpgIcon icon="axe" /> Axe</div>
          <div><RpgIcon icon="dragon" /> Dragon</div>
        </div>
      </div>
      <div>
        <h3 className="text-sm mb-2 text-cfg-text-muted">With fixed width:</h3>
        <div className="space-y-1">
          <div><RpgIcon icon="sword" fixedWidth /> Sword</div>
          <div><RpgIcon icon="axe" fixedWidth /> Axe</div>
          <div><RpgIcon icon="dragon" fixedWidth /> Dragon</div>
        </div>
      </div>
    </div>
  ),
};

export const CustomColors: StoryObj<typeof RpgIcon> = {
  render: () => (
    <div className="flex gap-4">
      <RpgIcon icon="fire" size="3x" color="#f0b232" />
      <RpgIcon icon="snowflake" size="3x" color="#3b82f6" />
      <RpgIcon icon="health" size="3x" color="#248046" />
      <RpgIcon icon="skull" size="3x" color="#da373c" />
      <RpgIcon icon="potion" size="3x" color="#7a4599" />
    </div>
  ),
};

export const DiceIcons: StoryObj<typeof RpgIcon> = {
  render: () => (
    <div className="text-cfg-text-normal">
      <h3 className="text-lg mb-4 font-display">Dice Icons</h3>
      <div className="flex flex-wrap gap-4">
        {RpgIconGroups.dice.map((icon) => (
          <div key={icon} className="text-center w-20">
            <RpgIcon icon={icon} size="2x" />
            <div className="text-xs mt-1 text-cfg-text-muted truncate">{icon}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const WeaponIcons: StoryObj<typeof RpgIcon> = {
  render: () => (
    <div className="text-cfg-text-normal">
      <h3 className="text-lg mb-4 font-display">Weapon Icons</h3>
      <div className="flex flex-wrap gap-4">
        {RpgIconGroups.weapons.map((icon) => (
          <div key={icon} className="text-center w-20">
            <RpgIcon icon={icon} size="2x" />
            <div className="text-xs mt-1 text-cfg-text-muted truncate">{icon}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const MagicIcons: StoryObj<typeof RpgIcon> = {
  render: () => (
    <div className="text-cfg-text-normal">
      <h3 className="text-lg mb-4 font-display">Magic Icons</h3>
      <div className="flex flex-wrap gap-4">
        {RpgIconGroups.magic.map((icon) => (
          <div key={icon} className="text-center w-20">
            <RpgIcon icon={icon} size="2x" color="#7a4599" />
            <div className="text-xs mt-1 text-cfg-text-muted truncate">{icon}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const CreatureIcons: StoryObj<typeof RpgIcon> = {
  render: () => (
    <div className="text-cfg-text-normal">
      <h3 className="text-lg mb-4 font-display">Creature Icons</h3>
      <div className="flex flex-wrap gap-4">
        {RpgIconGroups.creatures.map((icon) => (
          <div key={icon} className="text-center w-20">
            <RpgIcon icon={icon} size="2x" />
            <div className="text-xs mt-1 text-cfg-text-muted truncate">{icon}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const ArmorIcons: StoryObj<typeof RpgIcon> = {
  render: () => (
    <div className="text-cfg-text-normal">
      <h3 className="text-lg mb-4 font-display">Armor Icons</h3>
      <div className="flex flex-wrap gap-4">
        {RpgIconGroups.armor.map((icon) => (
          <div key={icon} className="text-center w-20">
            <RpgIcon icon={icon} size="2x" />
            <div className="text-xs mt-1 text-cfg-text-muted truncate">{icon}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const StatusIcons: StoryObj<typeof RpgIcon> = {
  render: () => (
    <div className="text-cfg-text-normal">
      <h3 className="text-lg mb-4 font-display">Status Icons</h3>
      <div className="flex flex-wrap gap-4">
        {RpgIconGroups.status.map((icon) => (
          <div key={icon} className="text-center w-20">
            <RpgIcon icon={icon} size="2x" />
            <div className="text-xs mt-1 text-cfg-text-muted truncate">{icon}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const ZodiacIcons: StoryObj<typeof RpgIcon> = {
  render: () => (
    <div className="text-cfg-text-normal">
      <h3 className="text-lg mb-4 font-display">Zodiac Icons</h3>
      <div className="flex flex-wrap gap-4">
        {RpgIconGroups.zodiac.map((icon) => (
          <div key={icon} className="text-center w-20">
            <RpgIcon icon={icon} size="2x" />
            <div className="text-xs mt-1 text-cfg-text-muted truncate">{icon}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const CardSuitIcons: StoryObj<typeof RpgIcon> = {
  render: () => (
    <div className="text-cfg-text-normal">
      <h3 className="text-lg mb-4 font-display">Card Suit Icons</h3>
      <div className="flex flex-wrap gap-4">
        {RpgIconGroups.cards.map((icon) => (
          <div key={icon} className="text-center w-20">
            <RpgIcon
              icon={icon}
              size="2x"
              color={icon.includes('hearts') || icon.includes('diamonds') ? '#da373c' : undefined}
            />
            <div className="text-xs mt-1 text-cfg-text-muted truncate">{icon}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const FoodIcons: StoryObj<typeof RpgIcon> = {
  render: () => (
    <div className="text-cfg-text-normal">
      <h3 className="text-lg mb-4 font-display">Food Icons</h3>
      <div className="flex flex-wrap gap-4">
        {RpgIconGroups.food.map((icon) => (
          <div key={icon} className="text-center w-20">
            <RpgIcon icon={icon} size="2x" />
            <div className="text-xs mt-1 text-cfg-text-muted truncate">{icon}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const WithAccessibility: Story = {
  args: {
    icon: 'health',
    size: '3x',
    color: '#248046',
    'aria-label': 'Health indicator showing full health',
  },
};

// Sample selection of popular RPG icons
const popularIcons: RpgIconName[] = [
  'sword', 'axe', 'shield', 'helmet',
  'dragon', 'skull', 'potion', 'crystal-ball',
  'fire', 'lightning-bolt', 'snowflake', 'health',
  'dice-six', 'crown', 'key', 'gold-bar',
  'book', 'scroll-unfurled', 'torch', 'campfire',
];

export const PopularIcons: StoryObj<typeof RpgIcon> = {
  render: () => (
    <div className="text-cfg-text-normal">
      <h3 className="text-lg mb-4 font-display">Popular RPG Icons</h3>
      <div className="grid grid-cols-5 gap-4">
        {popularIcons.map((icon) => (
          <div key={icon} className="text-center p-2 bg-cfg-background-secondary rounded">
            <RpgIcon icon={icon} size="2x" />
            <div className="text-xs mt-2 text-cfg-text-muted">{icon}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const InlineWithText: StoryObj<typeof RpgIcon> = {
  render: () => (
    <div className="text-cfg-text-normal space-y-2">
      <p>
        <RpgIcon icon="sword" fixedWidth /> Attack with your sword
      </p>
      <p>
        <RpgIcon icon="shield" fixedWidth /> Defend against enemies
      </p>
      <p>
        <RpgIcon icon="potion" fixedWidth color="#da373c" /> Drink a health potion
      </p>
      <p>
        <RpgIcon icon="crystal-ball" fixedWidth color="#7a4599" /> Cast a magic spell
      </p>
    </div>
  ),
};
