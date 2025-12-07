export { modernTheme } from './modern.theme';
export { fantasyTheme } from './fantasy.theme';
export { scifiTheme } from './scifi.theme';
export { cyberpunkTheme } from './cyberpunk.theme';
export { horrorTheme } from './horror.theme';

import { modernTheme } from './modern.theme';
import { fantasyTheme } from './fantasy.theme';
import { scifiTheme } from './scifi.theme';
import { cyberpunkTheme } from './cyberpunk.theme';
import { horrorTheme } from './horror.theme';
import type { DesktopTheme, ThemeName } from '../types';

export const themes: Record<ThemeName, DesktopTheme> = {
  modern: modernTheme,
  fantasy: fantasyTheme,
  'sci-fi': scifiTheme,
  cyberpunk: cyberpunkTheme,
  horror: horrorTheme,
};

export function getTheme(themeName: ThemeName): DesktopTheme {
  return themes[themeName];
}
