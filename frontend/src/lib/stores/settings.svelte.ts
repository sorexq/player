import { browser } from '$app/environment';

export type InitialPlayState = 'paused' | 'playing';

interface Settings {
  initialPlayState: InitialPlayState;
  showMetadata: boolean;
  arkAudioDropdownEnabled: boolean;
  externalAudioUrls: { label: string; url: string }[];
}

const defaultSettings: Settings = {
  initialPlayState: 'paused',
  showMetadata: false,
  arkAudioDropdownEnabled: false,
  externalAudioUrls: []
};

export const settings = $state<Settings>(() => {
  if (browser) {
    const saved = localStorage.getItem('player-settings');
    if (saved) {
      try { return { ...defaultSettings, ...JSON.parse(saved) }; } catch { return defaultSettings; }
    }
  }
  return defaultSettings;
});
