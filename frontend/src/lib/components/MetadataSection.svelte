<script lang="ts">
  import { videoStore } from '$lib/stores/video.svelte';
  import { settings } from '$lib/stores/settings.svelte';
  import { onMount } from 'svelte';

  let duration = $state('');

  onMount(() => {
    if (!videoStore.blobUrl) return;
    const video = document.createElement('video');
    video.src = videoStore.blobUrl;
    video.addEventListener('loadedmetadata', () => {
      const mins = Math.floor(video.duration / 60);
      const secs = Math.floor(video.duration % 60);
      duration = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    });
  });
</script>

{#if settings.showMetadata}
  <div class="card" style="padding:1.5rem 2rem; box-shadow:var(--shadow-md); animation:slideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);">
    <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1.25rem; padding-bottom:1rem; border-bottom:1px solid var(--bg-subtle);">
      <div style="width:4px; height:24px; background:linear-gradient(to bottom, var(--accent), var(--accent-hover)); border-radius:2px;"></div>
      <h3 style="color:var(--fg); margin:0; font-weight:700; font-size:1.125rem;">Video Information</h3>
    </div>
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:1rem;">
      {#if videoStore.fileName}
        <div role="none" style="display:flex; align-items:center; gap:1rem; padding:0.875rem 1.25rem; background:var(--bg); border-radius:var(--radius-md); border:1px solid var(--bg-subtle); transition:all 0.2s ease;" onmouseenter={(e) => e.currentTarget.style.borderColor='var(--accent)'} onmouseleave={(e) => e.currentTarget.style.borderColor='var(--bg-subtle)'}>
          <span style="font-size:1.5rem;">🎥</span>
          <div>
            <p style="color:var(--fg-subtle); font-size:0.75rem; margin:0 0 0.25rem 0; text-transform:uppercase; letter-spacing:1px;">File Name</p>
            <p style="color:var(--fg); font-weight:600; margin:0; font-size:0.9375rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">{videoStore.fileName}</p>
          </div>
        </div>
      {/if}
      {#if duration}
        <div role="none" style="display:flex; align-items:center; gap:1rem; padding:0.875rem 1.25rem; background:var(--bg); border-radius:var(--radius-md); border:1px solid var(--bg-subtle); transition:all 0.2s ease;" onmouseenter={(e) => e.currentTarget.style.borderColor='var(--accent)'} onmouseleave={(e) => e.currentTarget.style.borderColor='var(--bg-subtle)'}>
          <span style="font-size:1.5rem;">⏱️</span>
          <div>
            <p style="color:var(--fg-subtle); font-size:0.75rem; margin:0 0 0.25rem 0; text-transform:uppercase; letter-spacing:1px;">Duration</p>
            <p style="color:var(--fg); font-weight:600; margin:0; font-size:0.9375rem;">{duration}</p>
          </div>
        </div>
      {/if}
      {#if videoStore.subtitleName}
        <div role="none" style="display:flex; align-items:center; gap:1rem; padding:0.875rem 1.25rem; background:var(--bg); border-radius:var(--radius-md); border:1px solid var(--bg-subtle); transition:all 0.2s ease;" onmouseenter={(e) => e.currentTarget.style.borderColor='var(--accent)'} onmouseleave={(e) => e.currentTarget.style.borderColor='var(--bg-subtle)'}>
          <span style="font-size:1.5rem;">📄</span>
          <div>
            <p style="color:var(--fg-subtle); font-size:0.75rem; margin:0 0 0.25rem 0; text-transform:uppercase; letter-spacing:1px;">Subtitle</p>
            <p style="color:var(--accent); font-weight:600; margin:0; font-size:0.9375rem;">{videoStore.subtitleName}</p>
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}
