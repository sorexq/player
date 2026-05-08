<script lang="ts">
  import '../lib/styles/gruvbox.css';
  import Header from '$lib/components/Header.svelte';
  import { themeStore } from '$lib/stores/theme.svelte';
  import { settings } from '$lib/stores/settings.svelte';
  import { browser } from '$app/environment';
  let { children } = $props();

  // Persist theme to DOM + localStorage (runs inside component context)
  $effect(() => {
    if (browser) {
      document.documentElement.setAttribute('data-theme', themeStore.value);
      localStorage.setItem('theme', themeStore.value);
    }
  });

  // Persist settings to localStorage
  $effect(() => {
    if (browser) {
      localStorage.setItem('player-settings', JSON.stringify(settings));
    }
  });
</script>

<Header />
<main>
  {@render children()}
</main>

<style>
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
  }
</style>
