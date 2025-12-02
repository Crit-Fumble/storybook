import { clsx } from 'clsx';

/** All available RPG Awesome icon names */
export type RpgIconName =
  | 'acid' | 'acorn' | 'alien-fire' | 'all-for-one' | 'alligator-clip'
  | 'ammo-bag' | 'anchor' | 'angel-wings' | 'ankh' | 'anvil'
  | 'apple' | 'aquarius' | 'arcane-mask' | 'archer' | 'archery-target'
  | 'arena' | 'aries' | 'arrow-cluster' | 'arrow-flights' | 'arson'
  | 'aura' | 'aware' | 'axe' | 'axe-swing' | 'ball'
  | 'barbed-arrow' | 'barrier' | 'bat-sword' | 'battered-axe' | 'batteries'
  | 'battery-0' | 'battery-100' | 'battery-25' | 'battery-50' | 'battery-75'
  | 'battery-black' | 'battery-negative' | 'battery-positive' | 'battery-white' | 'batwings'
  | 'beam-wake' | 'bear-trap' | 'beer' | 'beetle' | 'bell'
  | 'biohazard' | 'bird-claw' | 'bird-mask' | 'blade-bite' | 'blast'
  | 'blaster' | 'bleeding-eye' | 'bleeding-hearts' | 'bolt-shield' | 'bomb-explosion'
  | 'bombs' | 'bone-bite' | 'bone-knife' | 'book' | 'boomerang'
  | 'boot-stomp' | 'bottled-bolt' | 'bottle-vapors' | 'bottom-right' | 'bowie-knife'
  | 'bowling-pin' | 'brain-freeze' | 'brandy-bottle' | 'bridge' | 'broadhead-arrow'
  | 'broadsword' | 'broken-bone' | 'broken-bottle' | 'broken-heart' | 'broken-shield'
  | 'broken-skull' | 'bubbling-potion' | 'bullets' | 'burning-book' | 'burning-embers'
  | 'burning-eye' | 'burning-meteor' | 'burst-blob' | 'butterfly' | 'campfire'
  | 'cancel' | 'cancer' | 'candle' | 'candle-fire' | 'cannon-shot'
  | 'capitol' | 'capricorn' | 'carrot' | 'castle-emblem' | 'castle-flag'
  | 'cat' | 'chain' | 'cheese' | 'chemical-arrow' | 'chessboard'
  | 'chicken-leg' | 'circle-of-circles' | 'circular-saw' | 'circular-shield' | 'cloak-and-dagger'
  | 'clockwork' | 'clover' | 'clovers' | 'clovers-card' | 'cluster-bomb'
  | 'coffee-mug' | 'cog' | 'cog-wheel' | 'cold-heart' | 'compass'
  | 'corked-tube' | 'crab-claw' | 'cracked-helm' | 'cracked-shield' | 'croc-sword'
  | 'crossbow' | 'crossed-axes' | 'crossed-bones' | 'crossed-pistols' | 'crossed-sabres'
  | 'crossed-swords' | 'crown' | 'crowned-heart' | 'crown-of-thorns' | 'crush'
  | 'crystal-ball' | 'crystal-cluster' | 'crystals' | 'crystal-wand' | 'cubes'
  | 'cut-palm' | 'cycle' | 'daggers' | 'daisy' | 'dead-tree'
  | 'death-skull' | 'decapitation' | 'defibrillate' | 'demolish' | 'dervish-swords'
  | 'desert-skull' | 'diamond' | 'diamonds' | 'diamonds-card' | 'dice-five'
  | 'dice-four' | 'dice-one' | 'dice-six' | 'dice-three' | 'dice-two'
  | 'dinosaur' | 'divert' | 'diving-dagger' | 'doubled' | 'double-team'
  | 'dragon' | 'dragon-breath' | 'dragonfly' | 'dragon-wing' | 'drill'
  | 'dripping-blade' | 'dripping-knife' | 'dripping-sword' | 'droplet' | 'droplets'
  | 'droplet-splash' | 'duel' | 'egg' | 'eggplant' | 'egg-pod'
  | 'emerald' | 'energise' | 'explosion' | 'explosive-materials' | 'eyeball'
  | 'eye-monster' | 'eye-shield' | 'fairy' | 'fairy-wand' | 'fall-down'
  | 'falling' | 'fast-ship' | 'feathered-wing' | 'feather-wing' | 'fedora'
  | 'fire' | 'fireball-sword' | 'fire-bomb' | 'fire-breath' | 'fire-ring'
  | 'fire-shield' | 'fire-symbol' | 'fish' | 'fizzing-flask' | 'flame-symbol'
  | 'flaming-arrow' | 'flaming-claw' | 'flaming-trident' | 'flask' | 'flat-hammer'
  | 'flower' | 'flowers' | 'fluffy-swirl' | 'focused-lightning' | 'food-chain'
  | 'footprint' | 'forging' | 'forward' | 'fox' | 'frost-emblem'
  | 'frostfire' | 'frozen-arrow' | 'gamepad-cross' | 'gavel' | 'gear-hammer'
  | 'gear-heart' | 'gears' | 'gecko' | 'gem' | 'gemini'
  | 'gem-pendant' | 'glass-heart' | 'gloop' | 'gold-bar' | 'grappling-hook'
  | 'grass' | 'grass-patch' | 'grenade' | 'groundbreaker' | 'guarded-tower'
  | 'guillotine' | 'halberd' | 'hammer' | 'hammer-drop' | 'hand'
  | 'hand-emblem' | 'hand-saw' | 'harpoon-trident' | 'health' | 'health-decrease'
  | 'health-increase' | 'heart-bottle' | 'heartburn' | 'hearts' | 'hearts-card'
  | 'heart-tower' | 'heat-haze' | 'heavy-fall' | 'heavy-shield' | 'helmet'
  | 'help' | 'hive-emblem' | 'hole-ladder' | 'honeycomb' | 'hood'
  | 'horn-call' | 'horns' | 'horseshoe' | 'hospital-cross' | 'hot-surface'
  | 'hourglass' | 'hydra' | 'hydra-shot' | 'ice-cube' | 'implosion'
  | 'incense' | 'insect-jaws' | 'interdiction' | 'jetpack' | 'jigsaw-piece'
  | 'kaleidoscope' | 'kettlebell' | 'key' | 'key-basic' | 'kitchen-knives'
  | 'knife' | 'knife-fork' | 'knight-helmet' | 'kunai' | 'lantern-flame'
  | 'large-hammer' | 'laser-blast' | 'laser-site' | 'lava' | 'leaf'
  | 'leo' | 'level-four' | 'level-four-advanced' | 'level-three' | 'level-three-advanced'
  | 'level-two' | 'level-two-advanced' | 'lever' | 'libra' | 'light-bulb'
  | 'lighthouse' | 'lightning' | 'lightning-bolt' | 'lightning-storm' | 'lightning-sword'
  | 'lightning-trio' | 'lion' | 'lit-candelabra' | 'load' | 'locked-fortress'
  | 'love-howl' | 'maggot' | 'magnet' | 'mass-driver' | 'match'
  | 'meat' | 'meat-hook' | 'medical-pack' | 'metal-gate' | 'microphone'
  | 'mine-wagon' | 'mining-diamonds' | 'mirror' | 'monster-skull' | 'moon-sun'
  | 'mountains' | 'mp5' | 'muscle-fat' | 'muscle-up' | 'musket'
  | 'nails' | 'nodular' | 'noose' | 'nuclear' | 'ocarina'
  | 'ocean-emblem' | 'octopus' | 'omega' | 'on-target' | 'ophiuchus'
  | 'overhead' | 'overmind' | 'palm-tree' | 'pawn' | 'pawprint'
  | 'perspective-dice-five' | 'perspective-dice-four' | 'perspective-dice-one' | 'perspective-dice-random' | 'perspective-dice-six'
  | 'perspective-dice-three' | 'perspective-dice-two' | 'pill' | 'pills' | 'pine-tree'
  | 'ping-pong' | 'pisces' | 'plain-dagger' | 'player' | 'player-despair'
  | 'player-dodge' | 'player-king' | 'player-lift' | 'player-pain' | 'player-pyromaniac'
  | 'player-shot' | 'player-teleport' | 'player-thunder-struck' | 'podium' | 'poison-cloud'
  | 'potion' | 'pyramids' | 'queen-crown' | 'quill-ink' | 'rabbit'
  | 'radar-dish' | 'radial-balance' | 'radioactive' | 'raven' | 'reactor'
  | 'recycle' | 'regeneration' | 'relic-blade' | 'repair' | 'reverse'
  | 'revolver' | 'rifle' | 'ringing-bell' | 'roast-chicken' | 'robot-arm'
  | 'round-bottom-flask' | 'round-shield' | 'rss' | 'rune-stone' | 'sagittarius'
  | 'sapphire' | 'satellite' | 'save' | 'scorpio' | 'scroll-unfurled'
  | 'scythe' | 'seagull' | 'sea-serpent' | 'shark' | 'sheep'
  | 'sheriff' | 'shield' | 'ship-emblem' | 'shoe-prints' | 'shotgun-shell'
  | 'shot-through-the-heart' | 'shovel' | 'shuriken' | 'sickle' | 'sideswipe'
  | 'site' | 'skull' | 'skull-trophy' | 'slash-ring' | 'small-fire'
  | 'snail' | 'snake' | 'snorkel' | 'snowflake' | 'soccer-ball'
  | 'spades' | 'spades-card' | 'spawn-node' | 'spear-head' | 'speech-bubble'
  | 'speech-bubbles' | 'spider-face' | 'spikeball' | 'spiked-mace' | 'spiked-tentacle'
  | 'spinning-sword' | 'spiral-shell' | 'splash' | 'spray-can' | 'sprout'
  | 'sprout-emblem' | 'stopwatch' | 'suckered-tentacle' | 'suits' | 'sun'
  | 'sunbeams' | 'sun-symbol' | 'super-mushroom' | 'supersonic-arrow' | 'surveillance-camera'
  | 'sword' | 'syringe' | 'target-arrows' | 'targeted' | 'target-laser'
  | 'taurus' | 'telescope' | 'tentacle' | 'tesla' | 'thorn-arrow'
  | 'thorny-vine' | 'three-keys' | 'tic-tac-toe' | 'toast' | 'tombstone'
  | 'tooth' | 'torch' | 'tower' | 'trail' | 'trefoil-lily'
  | 'trident' | 'triforce' | 'trophy' | 'turd' | 'two-dragons'
  | 'two-hearts' | 'uncertainty' | 'underhand' | 'unplugged' | 'vase'
  | 'venomous-snake' | 'vest' | 'vial' | 'vine-whip' | 'virgo'
  | 'water-drop' | 'wifi' | 'wireless-signal' | 'wolf-head' | 'wolf-howl'
  | 'wooden-sign' | 'wrench' | 'wyvern' | 'x-mark' | 'zebra-shield'
  | 'zigzag-leaf';

/** Icon size options */
export type RpgIconSize = 'sm' | 'md' | 'lg' | '2x' | '3x' | '4x' | '5x';

export interface RpgIconProps {
  /** Icon name (without 'ra-' prefix) */
  icon: RpgIconName;
  /** Icon size */
  size?: RpgIconSize;
  /** Fixed width (useful for alignment) */
  fixedWidth?: boolean;
  /** Spin animation */
  spin?: boolean;
  /** Custom color (CSS color value) */
  color?: string;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
  /** Accessible label */
  'aria-label'?: string;
  /** Whether icon is decorative (hidden from screen readers) */
  'aria-hidden'?: boolean;
}

const sizeClasses: Record<RpgIconSize, string> = {
  sm: 'text-sm',
  md: '',
  lg: 'ra-lg',
  '2x': 'ra-2x',
  '3x': 'ra-3x',
  '4x': 'ra-4x',
  '5x': 'ra-5x',
};

export function RpgIcon({
  icon,
  size = 'md',
  fixedWidth = false,
  spin = false,
  color,
  className,
  testId = 'rpg-icon',
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden = !ariaLabel,
}: RpgIconProps) {
  return (
    <i
      className={clsx(
        'ra',
        `ra-${icon}`,
        sizeClasses[size],
        fixedWidth && 'ra-fw',
        spin && 'ra-spin',
        className
      )}
      style={color ? { color } : undefined}
      data-testid={testId}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      role={ariaLabel ? 'img' : undefined}
    />
  );
}

/** Common icon groups for easy discovery */
export const RpgIconGroups = {
  dice: ['dice-one', 'dice-two', 'dice-three', 'dice-four', 'dice-five', 'dice-six', 'perspective-dice-one', 'perspective-dice-two', 'perspective-dice-three', 'perspective-dice-four', 'perspective-dice-five', 'perspective-dice-six', 'perspective-dice-random'] as RpgIconName[],
  weapons: ['sword', 'axe', 'dagger', 'crossbow', 'bow', 'mace', 'hammer', 'spear-head', 'trident', 'scythe', 'halberd', 'broadsword', 'kunai', 'shuriken'] as RpgIconName[],
  magic: ['crystal-ball', 'potion', 'flask', 'wand', 'scroll-unfurled', 'rune-stone', 'aura', 'lightning-bolt', 'fire', 'snowflake'] as RpgIconName[],
  creatures: ['dragon', 'wolf-head', 'spider-face', 'snake', 'octopus', 'wyvern', 'hydra', 'shark', 'raven', 'fox', 'cat', 'rabbit'] as RpgIconName[],
  armor: ['helmet', 'shield', 'knight-helmet', 'heavy-shield', 'round-shield', 'vest', 'hood'] as RpgIconName[],
  status: ['health', 'health-increase', 'health-decrease', 'poison-cloud', 'fire', 'snowflake', 'lightning', 'skull', 'broken-heart'] as RpgIconName[],
  cards: ['hearts-card', 'diamonds-card', 'spades-card', 'clovers-card', 'suits'] as RpgIconName[],
  players: ['player', 'player-dodge', 'player-king', 'player-lift', 'player-pain', 'player-shot', 'player-teleport'] as RpgIconName[],
  food: ['apple', 'carrot', 'cheese', 'chicken-leg', 'roast-chicken', 'beer', 'meat', 'toast'] as RpgIconName[],
  zodiac: ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'] as RpgIconName[],
} as const;
