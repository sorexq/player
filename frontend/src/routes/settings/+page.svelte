<script lang="ts">
  import { settings } from '$lib/stores/settings.svelte';
  import { Switch } from '@ark-ui/svelte';
  import { goto } from '$app/navigation';

  function addAudioUrl() {
    settings.externalAudioUrls = [...settings.externalAudioUrls, { label: `Audio Track ${settings.externalAudioUrls.length + 1}`, url: '' }];
  }

  function removeAudioUrl(index: number) {
    settings.externalAudioUrls = settings.externalAudioUrls.filter((_, i) => i !== index);
  }
</script>

<div style="max-width:900px; margin:0 auto; padding:0 1.5rem 3rem 1.5rem; animation:fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);">
  <button onclick={() => goto('/')} style="background:none; border:none; color:var(--accent); cursor:pointer; margin:1.5rem 0; font-size:1rem; display:inline-flex; align-items:center; gap:0.5rem; padding:0.5rem 0; transition:all 0.3s ease;" onmouseenter={(e) => e.currentTarget.style.opacity='0.7'} onmouseleave={(e) => e.currentTarget.style.opacity='1'}>
    ← Back Home
  </button>

  <div style="display:flex; align-items:center; gap:1rem; margin-bottom:2.5rem;">
    <div style="width:5px; height:32px; background:linear-gradient(to bottom, var(--accent), var(--accent-hover)); border-radius:3px;"></div>
    <h1 style="color:var(--fg); margin:0; font-weight:800; font-size:2rem; letter-spacing:-0.75px;">Settings</h1>
  </div>

  <div class="card" style="margin-bottom:1.5rem; padding:2rem; animation:slideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both;">
    <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1.5rem;">
      <span style="font-size:1.5rem;">▶️</span>
      <div>
        <h2 style="color:var(--fg); margin:0 0 0.25rem 0; font-size:1.25rem; font-weight:700;">Playback Preferences</h2>
        <p style="color:var(--fg-subtle); margin:0; font-size:0.875rem;">Configure how videos behave when loaded</p>
      </div>
    </div>
    <div style="display:flex; align-items:center; gap:1rem; background:var(--bg); padding:1rem 1.25rem; border-radius:var(--radius-md); border:1px solid var(--bg-subtle);">
      <span style="font-size:0.875rem; color:var(--fg-subtle); min-width:140px;">Default Initial State</span>
      <select bind:value={settings.initialPlayState} style="flex:1; background:var(--bg-soft); color:var(--fg); border:1px solid var(--bg-subtle); padding:0.625rem 1rem; border-radius:var(--radius-md); cursor:pointer; font-size:0.875rem; font-weight:500;">
        <option value="paused">⏸️ Paused (Default)</option>
        <option value="playing">▶️ Playing</option>
      </select>
    </div>
  </div>

  <div class="card" style="margin-bottom:1.5rem; padding:2rem; animation:slideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;">
    <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1.5rem;">
      <span style="font-size:1.5rem;">📊</span>
      <div>
        <h2 style="color:var(--fg); margin:0 0 0.25rem 0; font-size:1.25rem; font-weight:700;">Metadata Display</h2>
        <p style="color:var(--fg-subtle); margin:0; font-size:0.875rem;">Show video information below the player</p>
      </div>
    </div>
    <div style="display:flex; align-items:center; gap:1rem; background:var(--bg); padding:1rem 1.25rem; border-radius:var(--radius-md); border:1px solid var(--bg-subtle);">
      <div style="flex:1;">
        <p style="color:var(--fg); margin:0 0 0.25rem 0; font-size:0.875rem; font-weight:600;">Show Metadata Below Video</p>
        <p style="color:var(--fg-subtle); margin:0; font-size:0.75rem;">Displays file name, duration, and subtitle info</p>
      </div>
      <Switch.Root bind:checked={settings.showMetadata}>
        <Switch.Control style="position:relative; width:52px; height:28px; background:{settings.showMetadata ? 'var(--accent)' : 'var(--bg-hover)'}; border-radius:14px; transition:background 0.3s ease; cursor:pointer;">
          <Switch.Thumb style="position:absolute; top:3px; left:{settings.showMetadata ? '25px' : '3px'}; background:white; border-radius:50%; width:22px; height:22px; display:block; transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow:var(--shadow-sm);" />
        </Switch.Control>
      </Switch.Root>
    </div>
  </div>

  <div class="card" style="margin-bottom:1.5rem; padding:2rem; animation:slideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;">
    <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem;">
      <span style="font-size:1.5rem;">🔊</span>
      <div style="flex:1;">
        <h2 style="color:var(--fg); margin:0 0 0.25rem 0; font-size:1.25rem; font-weight:700;">External Audio Tracks</h2>
        <p style="color:var(--fg-subtle); margin:0; font-size:0.875rem;">Add external audio track URLs to sync with video</p>
      </div>
    </div>
    <div style="display:flex; flex-direction:column; gap:0.75rem; margin-bottom:1.25rem;">
      {#each settings.externalAudioUrls as track, index}
        <div role="none" style="display:flex; gap:0.75rem; align-items:center; background:var(--bg); padding:0.875rem 1.25rem; border-radius:var(--radius-md); border:1px solid var(--bg-subtle); transition:all 0.2s ease;" onmouseenter={(e) => e.currentTarget.style.borderColor='var(--accent)'} onmouseleave={(e) => e.currentTarget.style.borderColor='var(--bg-subtle)'}>
          <span style="color:var(--fg-muted); font-size:0.875rem;">🔊</span>
          <input type="text" bind:value={track.label} placeholder="Track Label" style="flex:1;" />
          <input type="url" bind:value={track.url} placeholder="Audio URL" style="flex:2;" />
          <button onclick={() => removeAudioUrl(index)} style="background:linear-gradient(135deg, var(--red), #cc241d); color:white; border:none; padding:0.625rem 1.25rem; border-radius:var(--radius-md); cursor:pointer; font-size:0.875rem; font-weight:500; transition:all 0.2s ease;" onmouseenter={(e) => e.currentTarget.style.transform='translateY(-1px)'} onmouseleave={(e) => e.currentTarget.style.transform='translateY(0)'}>
            Remove
          </button>
        </div>
      {/each}
    </div>
    <button onclick={addAudioUrl} style="background:linear-gradient(135deg, var(--accent), var(--accent-hover)); color:var(--bg); border:none; padding:0.75rem 1.5rem; border-radius:var(--radius-md); cursor:pointer; font-size:0.875rem; font-weight:600; display:inline-flex; align-items:center; gap:0.5rem; transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);" onmouseenter={(e) => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 4px 16px var(--accent-glow)'; }} onmouseleave={(e) => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}>
      + Add Audio Track
    </button>
  </div>

  <div class="card" style="padding:2rem; animation:slideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;">
    <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1.5rem;">
      <span style="font-size:1.5rem;">🎛️</span>
      <div>
        <h2 style="color:var(--fg); margin:0 0 0.25rem 0; font-size:1.25rem; font-weight:700;">Audio Control Interface</h2>
        <p style="color:var(--fg-subtle); margin:0; font-size:0.875rem;">Choose how audio tracks are selected</p>
      </div>
    </div>
    <div style="display:flex; align-items:center; gap:1rem; background:var(--bg); padding:1rem 1.25rem; border-radius:var(--radius-md); border:1px solid var(--bg-subtle);">
      <div style="flex:1;">
        <p style="color:var(--fg); margin:0 0 0.25rem 0; font-size:0.875rem; font-weight:600;">Use Ark UI Dropdown for Audio Tracks</p>
        <p style="color:var(--fg-subtle); margin:0; font-size:0.75rem;">Replaces Plyr's default audio track menu with a custom dropdown</p>
      </div>
      <Switch.Root bind:checked={settings.arkAudioDropdownEnabled}>
        <Switch.Control style="position:relative; width:52px; height:28px; background:{settings.arkAudioDropdownEnabled ? 'var(--accent)' : 'var(--bg-hover)'}; border-radius:14px; transition:background 0.3s ease; cursor:pointer;">
          <Switch.Thumb style="position:absolute; top:3px; left:{settings.arkAudioDropdownEnabled ? '25px' : '3px'}; background:white; border-radius:50%; width:22px; height:22px; display:block; transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow:var(--shadow-sm);" />
        </Switch.Control>
      </Switch.Root>
    </div>
  </div>
</div>
