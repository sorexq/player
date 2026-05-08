<script lang="ts">
  import { srtToVtt } from '$lib/srt-to-vtt';
  import { videoStore } from '$lib/stores/video.svelte';

  let subtitleReady = $state(false);

  function handleSubtitleUpload(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files?.[0] || !videoStore.blobUrl) return;

    const file = input.files[0];
    videoStore.subtitleName = file.name;
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target?.result as string;
      let vttContent = content;

      if (file.name.endsWith('.srt')) {
        vttContent = srtToVtt(content);
      } else if (!file.name.endsWith('.vtt')) {
        alert('Please upload a .vtt or .srt file');
        return;
      }

      const video = document.querySelector('video') as HTMLVideoElement;
      if (!video) return;

      // Create blob URL for VTT content
      const vttBlob = new Blob([vttContent], { type: 'text/vtt' });
      const trackUrl = URL.createObjectURL(vttBlob);

      // Remove any existing subtitle tracks from video element
      const existingTracks = video.querySelectorAll('track[kind="subtitles"]');
      existingTracks.forEach(t => t.remove());

      // Disable any remaining text tracks
      if (video.textTracks) {
        for (let i = 0; i < video.textTracks.length; i++) {
          video.textTracks[i].mode = 'disabled';
        }
      }

      // Add new track element
      const track = document.createElement('track');
      track.kind = 'subtitles';
      track.label = file.name.replace(/\.(vtt|srt)$/, '');
      track.srclang = 'en';
      track.src = trackUrl;
      track.default = true;
      video.appendChild(track);

      console.log('Subtitle track added to video:', file.name);

      // Add subtitle via Plyr's API (proper way)
      const plyrInstance = (window as any).plyr;
      if (plyrInstance && plyrInstance.captions) {
        try {
          // Remove existing captions via Plyr API
          if (plyrInstance.captions.captions) {
            plyrInstance.captions.captions = [];
          }
          
          // Add new caption track
          if (typeof plyrInstance.captions.add === 'function') {
            plyrInstance.captions.add({
              src: trackUrl,
              kind: 'subtitles',
              srclang: 'en',
              label: file.name.replace(/\.(vtt|srt)$/, ''),
              default: true
            });
          } else {
            // Fallback: directly modify video element
            if (video.textTracks) {
              for (let i = 0; i < video.textTracks.length; i++) {
                video.textTracks[i].mode = 'disabled';
              }
            }
            const newTrack = video.addTextTrack('subtitles', file.name.replace(/\.(vtt|srt)$/, ''), 'en');
            // Note: addTextTrack doesn't allow setting src directly; need to use track element
            // So we still need the track element approach
          }
          
          // Enable captions
          plyrInstance.captions.enabled = true;
          
          // Set current track to the new one
          setTimeout(() => {
            if (plyrInstance.captions && plyrInstance.captions.current !== undefined) {
              // Find the index of the newly added track
              if (video.textTracks) {
                for (let i = 0; i < video.textTracks.length; i++) {
                  if (video.textTracks[i].kind === 'subtitles' && video.textTracks[i].label === file.name.replace(/\.(vtt|srt)$/, '')) {
                    plyrInstance.captions.current = i;
                    video.textTracks[i].mode = 'showing';
                    break;
                  }
                }
              }
            }
          }, 200);
          
          console.log('Subtitle added via Plyr API:', file.name);
          subtitleReady = true;
        } catch (err) {
          console.error('Error adding subtitle via Plyr:', err);
          // Fallback to DOM
          addTrackFallback(video, trackUrl, file.name);
          subtitleReady = true;
        }
      } else {
        // No Plyr instance, use fallback
        addTrackFallback(video, trackUrl, file.name);
        subtitleReady = true;
      }
    };

    reader.readAsText(file);
  }

  function addTrackFallback(video: HTMLVideoElement, trackUrl: string, fileName: string) {
    // Remove existing subtitle track elements
    const oldTracks = video.querySelectorAll('track[kind="subtitles"]');
    oldTracks.forEach(t => t.remove());

    // Disable any remaining text tracks
    if (video.textTracks) {
      for (let i = 0; i < video.textTracks.length; i++) {
        video.textTracks[i].mode = 'disabled';
      }
    }

    // Add new track element
    const track = document.createElement('track');
    track.kind = 'subtitles';
    track.label = fileName.replace(/\.(vtt|srt)$/, '');
    track.srclang = 'en';
    track.src = trackUrl;
    track.default = true;
    video.appendChild(track);

    // Force Plyr to update
    setTimeout(() => {
      const plyrInstance = (window as any).plyr;
      if (plyrInstance && plyrInstance.initCaptions) {
        plyrInstance.initCaptions();
      }
      
      // Enable the track
      if (video.textTracks) {
        for (let i = 0; i < video.textTracks.length; i++) {
          if (video.textTracks[i].kind === 'subtitles') {
            video.textTracks[i].mode = 'showing';
            break;
          }
        }
      }
    }, 300);
  }
</script>

<div class="card" style="padding:1.5rem 2rem; box-shadow:var(--shadow-md); animation:slideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1); height:100%;">
  <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1.25rem; padding-bottom:1rem; border-bottom:1px solid var(--bg-subtle);">
    <div style="width:4px; height:24px; background:linear-gradient(to bottom, var(--accent), var(--accent-hover)); border-radius:2px;"></div>
    <h3 style="color:var(--fg); margin:0; font-weight:700; font-size:1.125rem;">Subtitle Upload</h3>
  </div>
  <p style="color:var(--fg-soft); font-size:0.875rem; margin:0 0 1.25rem 0; line-height:1.6;">Upload subtitle files in <strong style="color:var(--accent);">.vtt</strong> or <strong style="color:var(--accent);">.srt</strong> format</p>
  <input type="file" accept=".vtt,.srt" onchange={handleSubtitleUpload} style="display:none;" id="subtitle-upload" />
  <label for="subtitle-upload" style="display:flex; align-items:center; gap:0.75rem; background:var(--bg); color:var(--fg); padding:0.875rem 1.5rem; border-radius:var(--radius-md); cursor:pointer; font-size:0.875rem; font-weight:500; border:2px dashed var(--bg-hover); transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1); width:100%;" onmouseenter={(e) => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.background='var(--bg-soft)'; e.currentTarget.style.boxShadow='var(--shadow-glow)'; }} onmouseleave={(e) => { e.currentTarget.style.borderColor='var(--bg-hover)'; e.currentTarget.style.background='var(--bg)'; e.currentTarget.style.boxShadow='none'; }}>
    <span style="font-size:1.25rem;">📄</span>
    <span>Select Subtitle File</span>
  </label>
  {#if videoStore.subtitleName}
    <div style="margin-top:1rem; padding:0.875rem 1.25rem; background:linear-gradient(135deg, rgba(250, 189, 47, 0.1), rgba(254, 128, 25, 0.1)); border-radius:var(--radius-md); border:1px solid rgba(250, 189, 47, 0.2); display:flex; align-items:center; gap:0.75rem;">
      <span style="color:var(--accent); font-size:1.25rem;">✓</span>
      <div>
        <p style="color:var(--accent); font-size:0.75rem; margin:0 0 0.25rem 0; font-weight:600; text-transform:uppercase; letter-spacing:0.5px;">Loaded</p>
        <p style="color:var(--fg); font-size:0.875rem; margin:0; font-weight:500;">{videoStore.subtitleName}</p>
      </div>
    </div>
  {/if}
  {#if subtitleReady}
    <p style="color:var(--accent); font-size:0.8125rem; margin-top:0.75rem; padding:0.5rem 0.75rem; background:rgba(250, 189, 47, 0.08); border-radius:var(--radius-sm); border-left:3px solid var(--accent);">
      💡 Subtitle loaded! Click the <strong>CC button</strong> in the player controls to enable captions.
    </p>
  {/if}
</div>
