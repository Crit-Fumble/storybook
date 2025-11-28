# @crit-fumble/react - Component Library Guidelines

## Project Overview

This is the shared React component library for Crit-Fumble Gaming projects. It provides UI components for:
- **crit-fumble.com** - The main website
- **FumbleBot Discord Activities** - VTT, chat mode, and other Discord embedded experiences

## License

This project is licensed under **Apache License 2.0**. Brand assets (logos, fonts, images) are proprietary to Crit-Fumble Gaming.

## Architecture

### Component Categories

Components are organized into three main categories with distinct import paths:

```typescript
// All components
import { Button, Card, ChatWindow } from '@crit-fumble/react'

// Shared components only (used by both web and activity)
import { Button, Card } from '@crit-fumble/react/shared'

// Web components (website-specific + shared)
import { MainLayout, Button } from '@crit-fumble/react/web'

// Activity components (Discord activity-specific + shared)
import { ChatWindow, Avatar } from '@crit-fumble/react/activity'

// Styles
import '@crit-fumble/react/styles'
```

### Folder Structure

```
src/
├── shared/           # Components used by both web and activity
│   ├── atoms/        # Basic building blocks (Button, Input, Badge, etc.)
│   └── molecules/    # Combinations of atoms (Card, Modal, FormField, etc.)
├── web/              # Website-specific components
│   └── templates/    # Page layouts (MainLayout, CenteredLayout)
├── activity/         # FumbleBot Discord activity components
│   ├── atoms/        # Activity-specific atoms (Avatar, StatusDot)
│   ├── molecules/    # Activity-specific molecules (ChatBubble, UserBadge)
│   └── organisms/    # Complex activity components (ChatWindow, FloatingChat)
└── index.ts          # Re-exports all categories
```

## Brand Guidelines

### Color Palette

#### Crit-Fumble Brand Colors
- **Primary Purple**: `#552e66` - Main brand color
- **Dark Purple**: `#3d1f4a` - Darker variant for hover/active states
- **Light Purple**: `#7a4599` - Lighter variant for accents

Use Tailwind classes: `crit-purple-primary`, `crit-purple-dark`, `crit-purple-light`

#### Discord Color Palette (for Activity components)
- **Primary Blue**: `#5865f2` - Discord brand blue
- **Green**: `#248046` - Success states
- **Red**: `#da373c` - Error/danger states
- **Yellow**: `#f0b232` - Warning states

Background colors:
- **Primary**: `#313338` - Main background
- **Secondary**: `#2b2d31` - Secondary background
- **Tertiary**: `#1e1f22` - Darkest background
- **Floating**: `#232428` - Modals/popups

Text colors:
- **Normal**: `#dbdee1` - Primary text
- **Muted**: `#80848e` - Secondary/hint text
- **Link**: `#00a8fc` - Clickable links

Use Tailwind classes: `discord-primary`, `discord-background-primary`, `discord-text-normal`, etc.

### Typography

#### Font Families
- **Sans (Body)**: IBM Plex Sans, Inter - Use for body text, inputs, descriptions
- **Display (Headings)**: Changa, Rubik - Use for headings, buttons, emphasis
- **Mono**: IBM Plex Mono - Use for code snippets

Use Tailwind classes: `font-sans`, `font-display`, `font-mono`

#### Specific Brand Fonts
- `font-rubik` - Rubik font
- `font-jakarta` - Plus Jakarta Sans
- `font-changa` - Changa font (primary display)
- `font-discord` - Discord-style font stack

### Assets

Brand assets are located in `public/`:
- `public/fonts/` - Font files (Rubik, Changa, IBM Plex, Inter, Plus Jakarta Sans)
- `public/img/` - Brand images and icons
  - `cfg-logo.jpg` - Main Crit-Fumble Gaming logo
  - `crit-coin.png` - Crit coin icon
  - `dice-d20.svg` - D20 dice icon
  - Social icons: `discord.svg`, `github.svg`, `patreon.svg`

## Component Development

### Storybook

Stories are organized under category prefixes:
- `Shared/Atoms/...` - Shared atom components
- `Shared/Molecules/...` - Shared molecule components
- `Web/Templates/...` - Web-specific templates
- `Activity/Atoms/...` - Activity-specific atoms
- `Activity/Molecules/...` - Activity-specific molecules
- `Activity/Organisms/...` - Activity-specific organisms

Run Storybook:
```bash
npm run storybook
```

### Component Patterns

1. **Use Tailwind CSS** - All styling should use Tailwind utility classes
2. **Use clsx for conditional classes** - Import from 'clsx' for merging class names
3. **Export types** - Always export component prop types for consumers
4. **Support className prop** - Components should accept and merge custom classNames
5. **Use semantic HTML** - Use appropriate HTML elements for accessibility

### Example Component

```tsx
import { clsx } from 'clsx';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'rounded font-display transition-colors',
        // Size variants
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-4 py-2 text-base',
        size === 'lg' && 'px-6 py-3 text-lg',
        // Color variants
        variant === 'primary' && 'bg-discord-primary text-white hover:bg-discord-primary-hover',
        variant === 'secondary' && 'bg-discord-background-tertiary text-discord-text-normal',
        variant === 'danger' && 'bg-discord-red text-white hover:bg-red-700',
        // States
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

## Build & Release

### Scripts
- `npm run storybook` - Start Storybook dev server
- `npm run build:lib` - Build library for publishing
- `npm run release` - Build and publish to npm
- `npm run release:patch` - Bump patch version and release
- `npm run release:minor` - Bump minor version and release

### Publishing

The package is published as `@crit-fumble/react` on npm with public access.

## Coding Standards

1. **TypeScript** - All code must be TypeScript with strict mode
2. **No any types** - Avoid `any`, use proper typing
3. **Functional components** - Use function declarations, not arrow functions for components
4. **Named exports** - Use named exports, avoid default exports
5. **Co-locate stories** - Story files should be next to their components
