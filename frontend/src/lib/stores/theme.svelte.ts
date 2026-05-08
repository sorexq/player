import { browser } from '$app/environment';

export type Theme = 'dark' | 'light';

class ThemeStore {
  value = $state<Theme>(() => {
    if (browser) {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved as Theme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark' as Theme;
  });
}

export const themeStore = new ThemeStore();
