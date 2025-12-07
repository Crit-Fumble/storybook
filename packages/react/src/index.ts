// @crit-fumble/react - Shared React Component Library
//
// Import paths:
//   import { Button, Card } from '@crit-fumble/react'           // All components
//   import { Button, Card } from '@crit-fumble/react/shared'    // Shared only (no desktop)
//   import { Desktop, Window } from '@crit-fumble/react/desktop' // Desktop components
//   import { MainLayout } from '@crit-fumble/react/web'         // Web + shared
//   import { ChatWindow } from '@crit-fumble/react/activity'    // Activity + shared
//   import '@crit-fumble/react/styles'                          // Styles

// Re-export all components from all categories
export * from './shared';
export * from './desktop';
export * from './web';
export * from './activity';
