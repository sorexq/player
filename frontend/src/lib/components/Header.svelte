<script lang="ts">
  import { themeStore } from '$lib/stores/theme.svelte';
  import { Switch } from '@ark-ui/svelte';
  import { goto } from '$app/navigation';

  let theme = $derived(themeStore.value);
</script>

<header class="glass" style="display:flex; justify-content:space-between; align-items:center; padding:1rem 1.5rem; position:sticky; top:0; z-index:100; margin:-1rem -1rem 1.5rem -1rem; padding:1rem 1.5rem;">
  <a href="/" style="color:var(--accent); margin:0; font-size:1.75rem; font-weight:800; letter-spacing:-0.75px; text-decoration:none; cursor:pointer; display:block;">
    <span style="background:linear-gradient(135deg, var(--accent), var(--accent-hover)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;">Player</span>
  </a>
  <div style="display:flex; gap:1.25rem; align-items:center;">
    <div style="display:flex; align-items:center; gap:0.75rem; background:var(--bg-soft); padding:0.375rem 1rem; border-radius:var(--radius-xl); border:1px solid var(--bg-subtle);">
      <span style="font-size:0.75rem; color:var(--fg-subtle);">🌙</span>
      <Switch.Root checked={theme === 'light'} onCheckedChange={(details) => themeStore.value = details.checked ? 'light' : 'dark'}>
        <Switch.Control style="position:relative; width:48px; height:26px; background:var(--bg-hover); border-radius:13px; transition:background 0.3s ease; cursor:pointer;">
          <Switch.Thumb style="position:absolute; top:3px; left:{theme === 'light' ? '25px' : '3px'}; background:var(--accent); border-radius:50%; width:20px; height:20px; display:block; transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow:0 2px 8px var(--accent-glow);" />
        </Switch.Control>
      </Switch.Root>
      <span style="font-size:0.75rem; color:var(--fg-subtle);">☀️</span>
    </div>

    <button onclick={() => goto('/settings')} style="background:var(--bg-soft); border:1px solid var(--bg-subtle); color:var(--fg); padding:0.5rem 1rem; border-radius:var(--radius-xl); cursor:pointer; font-size:1.1rem; transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1); display:flex; align-items:center; gap:0.5rem;" onmouseenter={(e) => { e.currentTarget.style.background='var(--bg-hover)'; e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.boxShadow='var(--shadow-glow)'; }} onmouseleave={(e) => { e.currentTarget.style.background='var(--bg-soft)'; e.currentTarget.style.borderColor='var(--bg-subtle)'; e.currentTarget.style.boxShadow='none'; }}>
      ⚙️ <span style="font-size:0.75rem; color:var(--fg-subtle);">Settings</span>
    </button>
  </div>
</header>
