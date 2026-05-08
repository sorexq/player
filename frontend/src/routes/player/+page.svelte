<script lang="ts">
  import { videoStore } from '$lib/stores/video.svelte';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import VideoPlayer from '$lib/components/VideoPlayer.svelte';
  import MetadataSection from '$lib/components/MetadataSection.svelte';
  import SubtitleUpload from '$lib/components/SubtitleUpload.svelte';

  onMount(() => {
    if (!videoStore.blobUrl) {
      goto('/');
    }
  });
</script>

{#if videoStore.blobUrl}
  <div style="max-width: 1000px; margin:0 auto;">
    <VideoPlayer />
    <div style="margin-top:1rem; display:flex; gap:1rem; align-items:flex-start;">
      <div style="flex:1;">
        <MetadataSection />
      </div>
      <SubtitleUpload />
    </div>
  </div>
{/if}
