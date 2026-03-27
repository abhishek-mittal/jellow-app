import { atom } from 'jotai';

// Example types for user preferences
export type ThemePreference = 'light' | 'dark' | 'system';

interface UserPreferences {
  theme: ThemePreference;
  notificationsEnabled: boolean;
  onboardingCompleted: boolean;
}

// Global UI State Atoms
export const themeAtom = atom<ThemePreference>('system');
export const uiStateAtom = atom({
  isBottomNavVisible: true,
  isScanModalOpen: false,
});

// Domain: User Atoms
export const userPreferencesAtom = atom<UserPreferences>({
  theme: 'system',
  notificationsEnabled: true,
  onboardingCompleted: false,
});

// Domain: Scanner / Pipeline Atoms
export const currentScanAtom = atom<{
  barcode: string | null;
  status: 'idle' | 'scanning' | 'processing' | 'success' | 'error';
}>({
  barcode: null,
  status: 'idle',
});
