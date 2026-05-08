<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Plyr from 'plyr';
  import 'plyr/dist/plyr.css';
  import { videoStore } from '$lib/stores/video.svelte';
  import { settings } from '$lib/stores/settings.svelte';
  import { getPlyrOptions, initLongPressSpacebar } from '$lib/plyr-config';

  let player: any = null;
  let videoElement: HTMLVideoElement;
  let resolutionBadge = $state('');
  let destroyLongPress: (() => void) | null = null;

  onMount(() => {
    if (!videoStore.blobUrl) return;

    player = new Plyr(videoElement, getPlyrOptions());
    videoElement.src = videoStore.blobUrl;

    videoElement.addEventListener('loadedmetadata', () => {
      const height = videoElement.videoHeight;
      if (height >= 2160) resolutionBadge = '4K';
      else if (height >= 1080) resolutionBadge = '1080p';
      else if (height >= 720) resolutionBadge = '720p';
      else if (height >= 480) resolutionBadge = '480p';
      else resolutionBadge = `${height}p`;

      if (settings.initialPlayState === 'playing') {
        player?.play();
      }
    });

    destroyLongPress = initLongPressSpacebar(player);

    // Sync external audio tracks
    settings.externalAudioUrls.forEach((track) => {
      if (!track.url) return;
      const audio = new Audio(track.url);
      const syncAudio = () => {
        if (Math.abs(audio.currentTime - videoElement.currentTime) > 0.5) {
          audio.currentTime = videoElement.currentTime;
        }
      };
      videoElement.addEventListener('timeupdate', syncAudio);
      videoElement.addEventListener('play', () => audio.play());
      videoElement.addEventListener('pause', () => audio.pause());
      videoElement.addEventListener('seeked', () => { audio.currentTime = videoElement.currentTime; });
    });

    // Expose player for subtitle upload
    (window as any).plyr = player;
  });

  onDestroy(() => {
    destroyLongPress?.();
    player?.destroy();
    videoStore.clearVideo();
  });
</script>

<div style="border-radius:var(--radius-lg); overflow:hidden; box-shadow:var(--shadow-lg), var(--shadow-glow); animation:fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1); position:relative;">
  <video bind:this={videoElement} playsinline style="width:100%; display:block;"></video>
  {#if resolutionBadge}
    <div style="position:absolute; top:1.25rem; right:1.25rem; background:var(--bg-overlay); color:var(--accent); padding:0.5rem 1.25rem; border-radius:var(--radius-xl); font-size:0.875rem; font-weight:700; backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); border:1px solid rgba(250, 189, 47, 0.3); letter-spacing:0.5px; box-shadow:var(--shadow-sm);">
      {resolutionBadge}
    </div>
  {/if}
</div>
