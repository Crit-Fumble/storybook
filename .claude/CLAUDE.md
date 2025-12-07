# Crit-Fumble Gaming Monorepo

This is the monorepo for Crit-Fumble Gaming shared packages.

## Monorepo Structure

```
packages/
├── react/          # @crit-fumble/react - React component library
└── (future)        # Additional packages can be added here
```

## Quick Start

```bash
# Install all dependencies
npm install

# Run Storybook (React components)
npm run storybook

# Run all tests
npm test

# Build all packages
npm run build
```

## Packages

### @crit-fumble/react

Shared React component library for Crit-Fumble projects. See [packages/react/README.md](packages/react/README.md) for details.

```bash
# Work on React package specifically
npm run storybook                    # Start Storybook
npm run build:react                  # Build for publishing
npm test                             # Run tests
```

## License

This project is licensed under **Apache License 2.0**. Brand assets (logos, fonts, images) are proprietary to Crit-Fumble Gaming.

---

# @crit-fumble/react - Component Library Guidelines

## Project Overview

This is the shared React component library for Crit-Fumble Gaming projects. It provides UI components for:
- **crit-fumble.com** - The main website
- **CFGOS (Crit-Fumble Gaming OS)** - Gaming platform served on the website and Discord, includes FumbleBot chat, VTT, and interactive experiences

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
packages/react/
├── src/
│   ├── shared/           # Components used by both web and activity
│   │   ├── atoms/        # Basic building blocks (Button, Input, Badge, etc.)
│   │   └── molecules/    # Combinations of atoms (Card, Modal, FormField, etc.)
│   ├── web/              # Website-specific components
│   │   └── templates/    # Page layouts (MainLayout, CenteredLayout)
│   ├── activity/         # CFGOS activity components (includes FumbleBot chat)
│   │   ├── atoms/        # Activity-specific atoms (Avatar, StatusDot)
│   │   ├── molecules/    # Activity-specific molecules (ChatBubble, UserBadge)
│   │   └── organisms/    # Complex activity components (ChatWindow, FloatingChat)
│   └── index.ts          # Re-exports all categories
├── public/               # Static assets (fonts, images)
├── .storybook/           # Storybook configuration
└── package.json
```

## Brand Guidelines

### Color Palette

#### CFG (Crit-Fumble Gaming) Brand Colors - Default Theme

All components use CFG brand colors by default. Use `cfg-*` Tailwind classes:

**Primary Colors:**
- `cfg-primary`: `#552e66` - Main brand purple
- `cfg-primary-hover`: `#3d1f4a` - Darker variant for hover/active states
- `cfg-accent`: `#7a4599` - Lighter variant for accents

**Status Colors:**
- `cfg-green`: `#248046` - Success states
- `cfg-red`: `#da373c` - Error/danger states
- `cfg-yellow`: `#f0b232` - Warning states

**Background Colors:**
- `cfg-background-primary`: `#1a1a2e` - Main background
- `cfg-background-secondary`: `#16213e` - Secondary background
- `cfg-background-tertiary`: `#0f0f1a` - Darkest background
- `cfg-background-floating`: `#1f1f3a` - Modals/popups

**Text Colors:**
- `cfg-text-normal`: `#e8e8f0` - Primary text
- `cfg-text-muted`: `#9090a8` - Secondary/hint text
- `cfg-text-link`: `#7a4599` - Clickable links

**Border:**
- `cfg-border`: `#3a3a5a` - Border color

#### Discord Color Palette (Alternative Theme)

For Discord-specific implementations, use `discord-*` Tailwind classes:

- `discord-primary`: `#5865f2` - Discord brand blue
- `discord-background-primary`: `#313338`
- `discord-text-normal`: `#dbdee1`
- etc.

**Note:** Discord colors are available but components use CFG colors by default. Override at the implementation level if Discord theming is needed.

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

Brand assets are located in `packages/react/public/`:
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
        variant === 'primary' && 'bg-cfg-primary text-white hover:bg-cfg-primary-hover',
        variant === 'secondary' && 'bg-cfg-background-tertiary text-cfg-text-normal',
        variant === 'danger' && 'bg-cfg-red text-white hover:bg-red-700',
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

### Scripts (from monorepo root)
- `npm run storybook` - Start Storybook dev server
- `npm run build:react` - Build React library for publishing
- `npm test` - Run all tests
- `npm run build-storybook` - Build static Storybook

### Scripts (from packages/react)
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
