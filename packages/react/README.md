# @crit-fumble/react

Shared React component library for Crit-Fumble Gaming projects.

## Installation

```bash
npm install @crit-fumble/react
```

### Peer Dependencies

This package requires the following peer dependencies:

```bash
npm install @crit-fumble/core clsx react react-dom

# Optional - only needed for desktop components
npm install framer-motion react-rnd zustand
```

## Entry Points

The package provides multiple entry points for different use cases:

```typescript
// All components
import { Button, Card, ChatWindow, Desktop } from '@crit-fumble/react'

// Shared components only (atoms, molecules, economy - NO desktop)
import { Button, Card, CritCoin } from '@crit-fumble/react/shared'

// Desktop components (requires framer-motion, react-rnd, zustand)
import { Desktop, Window, WindowManager } from '@crit-fumble/react/desktop'

// Web components (website-specific + shared)
import { MainLayout, Button } from '@crit-fumble/react/web'

// Activity components (Discord activity-specific + shared)
import { ChatWindow, FloatingChat, TabNav } from '@crit-fumble/react/activity'

// Styles (required)
import '@crit-fumble/react/styles'

// Tailwind config (for extending in your project)
import { baseConfig } from '@crit-fumble/react/tailwind'
```

## Activity Components

For Discord Activities and FumbleBot integrations:

```typescript
import {
  // Pages
  LoadingPage,
  ErrorPage,
  WebLoginPage,

  // Organisms
  FloatingChat,
  ChatPanel,
  AdminDashboardPage,

  // Molecules
  TabNav,
  Card, CardHeader, CardTitle, CardContent,
  Modal, ModalFooter,
  FormField,
  EmptyState,

  // Atoms
  Button,
  Input,
  Toggle,
  Badge,
  Spinner,
  Textarea,

  // Types
  type ChatMessage,
  type Tab,
} from '@crit-fumble/react/activity'
```

## Types from @crit-fumble/core

The activity entry point re-exports commonly used types from `@crit-fumble/core`:

```typescript
import type {
  // User & Auth
  DiscordUser, User, Guild, DiscordContext, DiscordAuth,

  // Discord config
  DiscordChannel, DiscordRole, ChannelLinks, BotSettings, GuildSettings,

  // Campaign & Session
  Campaign, CampaignMember, Character, GameSession, SessionMessage,

  // Schedule/Party
  Party, PartySchedule, PartyMember, PartyMemberRole,

  // Adventure
  Adventure, AdventureStatus, AdventureMessage, AdventureMessageType,

  // Game Content
  RandomTableEntry, GameRandomTable, DialogueNode, GameDialogueTree,

  // Container
  ContainerStatus, ContainerStartRequest, ContainerStartResponse,
} from '@crit-fumble/react/activity'
```

## Tailwind Configuration

Extend your Tailwind config with the CFG brand theme:

```javascript
// tailwind.config.js
import { baseConfig } from '@crit-fumble/react/tailwind'

export default {
  ...baseConfig,
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@crit-fumble/react/dist/**/*.js',
  ],
}
```

### Brand Colors

The config provides CFG brand colors via Tailwind classes:

```typescript
// Primary colors
'cfg-primary'        // #552e66 - Main brand purple
'cfg-primary-hover'  // #3d1f4a - Darker variant
'cfg-accent'         // #7a4599 - Lighter accent

// Status colors
'cfg-green'   // #248046 - Success
'cfg-red'     // #da373c - Error/danger
'cfg-yellow'  // #f0b232 - Warning

// Background colors
'cfg-background-primary'    // #1a1a2e
'cfg-background-secondary'  // #16213e
'cfg-background-tertiary'   // #0f0f1a
'cfg-background-floating'   // #1f1f3a

// Text colors
'cfg-text-normal'  // #e8e8f0
'cfg-text-muted'   // #9090a8
'cfg-text-link'    // #7a4599

// Border
'cfg-border'  // #3a3a5a
```

### Font Families

```typescript
'font-sans'     // IBM Plex Sans, Inter
'font-display'  // Changa, Rubik (headings, buttons)
'font-mono'     // IBM Plex Mono
```

## Example Usage

### Activity App Setup

```typescript
// App.tsx
import { useState } from 'react'
import {
  LoadingPage,
  ErrorPage,
  FloatingChat,
  type ChatMessage,
} from '@crit-fumble/react/activity'
import '@crit-fumble/react/styles'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])

  if (isLoading) {
    return <LoadingPage message="Connecting to Discord..." />
  }

  if (error) {
    return <ErrorPage error={error} onRetry={() => window.location.reload()} />
  }

  return (
    <div className="min-h-screen bg-cfg-background-primary">
      <FloatingChat
        messages={messages}
        onSendMessage={(content) => {
          // Handle message sending
        }}
      />
    </div>
  )
}
```

### Admin Panel Setup

```typescript
// AdminPanel.tsx
import {
  TabNav,
  Card, CardHeader, CardTitle, CardContent,
  Button, Input, Toggle, Badge,
  type Tab,
} from '@crit-fumble/react/activity'

const tabs: Tab[] = [
  { id: 'settings', label: 'Settings' },
  { id: 'users', label: 'Users' },
  { id: 'campaigns', label: 'Campaigns' },
]

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('settings')

  return (
    <div>
      <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <Card>
        <CardHeader>
          <CardTitle>Server Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Toggle label="Enable notifications" />
          <Button variant="primary">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  )
}
```

## License

Apache-2.0
